const router = require('express').Router();
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../../middleware/auth');
const multer = require('multer');
const path = require('path');
const upload = require('../../uploads/upload')




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
      { id: user.id, username: user.username, email: user.email, profilePicture: user.profilePicture, role: user.role }, 
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

// --- Multer file uploading ---


//Profile picture upload route
router.post('/upload-profile', authenticateToken, upload.single('profilePicture'), async (req, res) => {
  try {
    console.log('Received file:', req.file); // Check if the file is received
    console.log('Upload Path:', req.file.path); // Verify the saved path
    const user = await User.findByPk(req.user.id);
    if(!user){
      return res.status(404).json({ error: 'User not found'})
    }
    //Sav file path to user
    user.profilePicture = `uploads/${req.file.filename}`
    await user.save();

     // Generate a new token with the updated user data
     const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, profilePicture: user.profilePicture, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Profile picture uploaded successfully', path: req.file.path, token})
  } catch (error){
    res.status(500).json({ error: 'Error uploading profile picture', details: error.message })
  }
})

module.exports = router;
