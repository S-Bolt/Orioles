const router = require('express').Router();
const {User, Comments, BlogPosts } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateToken, authorizeAdmin } = require('../../middleware/auth');
const multer = require('multer');
const path = require('path');
const upload = require('../../uploads/upload')
const { DeleteObjectCommand, S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');


const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Get all users
router.get('/', authenticateToken, async (req, res) => {
  try{
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role']});
    res.status(200).json(users)
  } catch (error){
    console.error( {error: 'Error fetching users', })
  }
})
// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //Check if user exist
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });

    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create User
    const user = await User.create({ username, email, password: hashedPassword });

    //Create token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' });
    res.status(201).json({ message: 'User created', token });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user', details: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    //Find user by email
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ error: 'User not found' });

    //validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid password' });

    //Generate token
    const token = jwt.sign(
      { id: user.id, 
        username: user.username, 
        email: user.email, 
        profilePictureUrl: user.profilePictureUrl, 
        role: user.role 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' });

    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(500).json({ error: 'Login error', details: error.message });
  }
});

// Update user profile (username, password)
router.post('/update', authenticateToken, async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Update username and hashed password
    user.username = username || user.username;
    user.email = email || user.email;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

    await user.save();

    //Generate new JWT token for updated credential
    const token = jwt.sign(
      { id: user.id, username: username, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h'}
    );

    res.status(200).json({ message: 'Profile updated successfully', token });
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile', details: error.message });
  }
});

//Delete account
router.delete('/delete', authenticateToken, async (req, res) => {
  try{
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found'});

    //Delete user
    await user.destroy();
   
    res.status(200).json({ message: 'Account Deleted'});


  } catch (error){
    res.status(500).json({ error: 'Error deleting account', details: error.message})
  }
})

//Route to assing roles(admin only)
router.put('/assign-role/:userId', authenticateToken, authorizeAdmin, async (req, res) => {
  const { role } = req.body;

  try {
    const user = await User.findByPk(req.params.userId);

    if (!user){
      return res.status(404).json({ error: 'User not found'});
    }

    if (!['admin', 'writer', 'user'].includes(role)){
      return res.status(404).json({ error: 'Invalid role'})
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: `Role updated to ${role}` });
  } catch (error){
    res.status(500).json({ error: "Error assigning role", details: error.message})
  }
})

//Profile picture upload route
router.post('/upload-profile', authenticateToken, upload.single('profilePicture'), async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if(!user){
      return res.status(404).json({ error: 'User not found'})
    }
    //Already has pic then delete it
    if(user.profilePictureUrl) {
      try {
        const url = new URL(user.profilePictureUrl);
        const key = decodeURIComponent(url.pathname.substring(1));

        await s3Client.send(new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: key,
        }));
      } catch (Error) {
        console.error('Error deleting old profile picture:', Error);
      }  
    }

    // Upload new profile picture to S3
    const fileName = `profilePictures/${Date.now()}-${req.file.originalname}`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    // Update user's profile picture URL in the database
    const newProfilePictureUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    user.profilePictureUrl = newProfilePictureUrl;
    await user.save();

     // Generate a new token with the updated user data
     const token = jwt.sign(
      { id: user.id, 
        username: user.username, 
        email: user.email, 
        profilePictureUrl: user.profilePictureUrl, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Profile picture uploaded successfully', path: req.file.path, token})
  } catch (error){
    res.status(500).json({ error: 'Error uploading profile picture', details: error.message })
  }
})

//Get User's recent comments
router.get('/:userId/comments', authenticateToken, async (req, res) => {
  const { userId } = req.params;

    // Log the incoming request data for debugging
    console.log('Received userId:', userId);
    console.log('Authenticated user:', req.user);
    console.log('Authorization header:', req.headers.authorization);
    console.log('Full request URL:', req.originalUrl); // Log the request URL
  console.log('Route params:', req.params); // Log all route params
  try {
    const recentComments = await Comments.findAll({
      where: { userId },
      include: [{
        model: BlogPosts,
        attributes: ['title', 'id'],
        as: 'post'
      }],
      order: [[ 'createdAt', 'DESC']],
      limit: 5,
    });

    res.status(200).json(recentComments)
  } catch (error){
    res.status(500).json({ error: "Error fetching user comments", details: error.message})
  }
})

module.exports = router;
