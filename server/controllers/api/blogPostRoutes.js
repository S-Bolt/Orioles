const router = require('express').Router();
const  BlogPosts  = require('../../models/blogPosts');
const User = require('../../models/user')
const { 
  authenticateToken, 
  authorizeAdmin, 
  authorizeWriterOrAdmin,
  authorizePostEdit
 } = require('../../middleware/auth');
 const { Op } = require('sequelize');
 const upload = require('../../uploads/upload');
 const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

 // Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

  //Search Blog Post by query
  router.get('/search', async (req, res) => {
    const { query, author, startDate, endDate } = req.query;
  
    try {
      //Build out the conditions for search
      const conditions = {};
      //Search by title or content per query
      if(query){
        conditions[Op.or] = [
          { title: { [Op.iLike]: `%${query}%` } },
          { content: { [Op.iLike]: `%${query}%` } },
        ];
      }

      if(startDate && endDate) {
        conditions.createdAt = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        }
      }

      //Search for Author
      if (author) {
        conditions['$author.username$'] = { [Op.iLike]: `%${author}%` };
      }
  
      const posts = await BlogPosts.findAll({
        where: conditions,
        include: [{
          model: User,
          as: 'author', 
          attributes: ['id', 'username'],
        }],
        order: [['createdAt', 'DESC']],
      });
  
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error searching posts:', error);
      res.status(500).json({ error: 'Error searching posts', details: error.message });
    }
  });


// Get recent post
router.get('/recent', async (req, res) => {
  try {
    const recentPosts = await BlogPosts.findAll({
      include: {
        model: User,
        as: 'author',
        attributes: ['id', 'username'],
      },
      order: [['createdAt', 'DESC']],
      limit: 3,
    });

    res.status(200).json(recentPosts)
  } catch (error) {
    console.error('Error fetching recent blog post', error)
    res.status(500).json({ error: 'Server error', details: error.message })
  }
})
// Get all blog posts
router.get('/', async (req, res) => {
    try {
      const posts = await BlogPosts.findAll({
        include: {
          model: User,
          as: 'author',
          attributes: ['id', 'username'],
        },
        order: [['createdAt', 'DESC']],
      });
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  });


  // Create a new blog post
  router.post('/', authenticateToken, authorizeWriterOrAdmin, upload.single('image'), async (req, res) => {
    const { title, content } = req.body;
    let imageUrl = null;
  
    try {
        //Handle image upload to S3
        if(req.file){
          const fileName = `blogImages/${Date.now()}-${req.file.originalname}`;

          const uploadParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
          };
    
          // Upload the file to S3
          await s3Client.send(new PutObjectCommand(uploadParams));
    
          // Construct the image URL
          imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        }
        
      const newPost = await BlogPosts.create({ 
        title, 
        content, 
        authorId: req.user.id, 
        imageUrl,
      });
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'Error creating blog post', details: error.message });
    }
  });

 //Get specific blog post
 router.get('/:id', async (req, res) => {
    
  try {
    const blogPost = await BlogPosts.findOne({
      where: { id: req.params.id },
      include: [{
        model: User,
        as: 'author',
        attributes: ['username']
      }],
    }); 
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Error fetching blog post', details: error.message });
  }
});

  // Edit post route (admin or auther)
  router.put('/:id', authenticateToken, authorizePostEdit, upload.single('image'), async (req, res) => {
    const { title, content , removeImage } = req.body;

    try {
      const post = req.post;
      if(!post){
        return res.status(404).json({ error: 'Blog post not found'})
      }
      //update title and content
      post.title = title || post.title;
      post.content = content || post.content;

      //handle image removal
      if (removeImage === 'true' && post.imageUrl) {
        console.log('Attempting to remove image:', post.imageUrl); // Logging
        // Extract the S3 object key from the imageUrl
        const url = new URL(req.post.imageUrl);
        const key = decodeURIComponent(url.pathname.substring(1)); 
  
        // Delete the old image from S3
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
          })
        );
  
        post.imageUrl = null;
        console.log('Image removed successfully.');
      }

          // Handle new image upload
        if (req.file) {
          // If there's an existing image, delete it
          console.log('Deleting existing image:', post.imageUrl); // Logging
          if (post.imageUrl) {
            const url = new URL(req.post.imageUrl);
            const key = decodeURIComponent(url.pathname.substring(1));

            await s3Client.send(
              new DeleteObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
              })
            );
          }
          console.log('Existing image deleted successfully.');

          // Upload the new image
          const fileName = `blogImages/${Date.now()}-${req.file.originalname}`;
          const uploadParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
          };

          await s3Client.send(new PutObjectCommand(uploadParams));
          // Construct the image URL
          const newImageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
          post.imageUrl = newImageUrl;
        }


      await req.post.save();
      res.status(200).json(req.post)
    } catch (error){
      res.status(500).json({ error: 'Error updating post', details: error.message})
    }
  });

  // Delete blog post (admin or author)
  router.delete('/:id', authenticateToken, authorizePostEdit, async (req, res) => {
    try {
      const post = await BlogPosts.findByPk(req.params.id);
      if (!post){
        return res.status(404).json({ error: 'Blog post not found'})
      }

      // If the post has an image, delete it from S3
    if (post.imageUrl) {
      const url = new URL(post.imageUrl);
      const key = decodeURIComponent(url.pathname.substring(1)); // Removes leading '/'

      try {
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
          })
        );
        console.log('Image deleted from S3 successfully.');
      } catch (error) {
        console.error('Error deleting image from S3:', error);
      }
    }

      await post.destroy();
      res.status(200).json({ message: 'Blog post deleted'})
    } catch (error){
      res.status(500).json({ error: 'Error deleting blog post', details: error.message })
    }
  });

  module.exports = router;