const router = require('express').Router();
const { authenticateToken } = require('../../middleware/auth')
const Comments = require('../../models/comment')
const User = require('../../models/user')

//Add comment to a blogPost
router.post('/:postId', authenticateToken, async (req, res) => {
    const { content } = req.body;
    const { postId } = req.params;
    const  userId  = req.user.id
    try {
        const newComment = await Comments.create({
            content,
            userId,
            postId,
        });

        //Fetch comment along with user details so upon submitting comment component has username and profile picture to display
        const commentWithUser = await Comments.findOne({
            where: {id: newComment.id },
            include: [{ 
                model: User,
                attributes: [
                    'username',
                    'profilePicture'
                ]
            }],
        });
        res.status(200).json(commentWithUser)
    } catch (error){
        res.status(500).json({ error: 'Error creating comment', details: error.message })
    }
});

//Get comment on specific blogPost
router.get('/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comments.findAll({ 
            where: { postId},
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'profilePicture'], 
                },
            ],
            raw: true, // This ensures data is returned as plain objects
            nest: true, // This ensures nested objects are returned properly
           
        });
        
        res.status(200).json(comments);
    } catch (error){
        res.status(500).json({ error: 'Error fetching comments', details: error.message })
    }
});

//Delete a comment(user poster and admin)
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comments.findByPk(id);

        if(!comment){
            return res.status(404).json({ error: 'No comment found'})
        }

        if(comment.userId !== req.user.id && req.user.role !== 'admin'){
            return res.status(403).json({ error: 'Permission denied'});
        }

        await comment.destroy();
        res.status(200).json({ message: 'Comment destroyed'})
    } catch (error){
        res.status(500).json({ error: 'Error deleting comment', details: error.message })
    }
});

// Search Comments query
router.get('/search', async (req, res) => {
    const { query, user, postId } = req.query;
  
    try {
      const comments = await Comment.findAll({
        where: {
          [Op.and]: [
            query ? { content: { [Op.iLike]: `%${query}%` } } : {},
            user ? { '$User.username$': { [Op.iLike]: `%${user}%` } } : {},
            postId ? { postId } : {}
          ]
        },
        include: [
          { model: User, attributes: ['username'] },
          { model: BlogPost, attributes: ['title'] }
        ]
      });
  
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Error searching comments', details: error.message });
    }
  });
  

module.exports = router;