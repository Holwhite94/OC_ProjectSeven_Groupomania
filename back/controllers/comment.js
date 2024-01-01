// import auth middleware
const authMiddleware = require('../middleware/auth');
// import comment controller
const {Comment}= require('../models/models');
  


  // create comment 

  exports.createComment = [
    authMiddleware, 

    (req,res,next) => {

    const userId = req.auth.userId;
    if (!userId) {
        return res.status(401).json({ error: 'User ID not found in request' });
      }
  

    const comment = new Comment({
        text: req.body.text, 
        createdDate:new Date(), 
        postId: req.body.postId,
        creator: userId,
    });

    console.log(comment);
    
    comment.save().then(
        () => {
            res.status(201).json({
              message: "Comment created successfully"
            });
          },
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
    }]


// delete comment 
exports.deleteComment = [
  authMiddleware,
  async (req, res, next) => {
    try {
      const userId = req.auth.userId;
      if (!userId) {
        return res.status(401).json({ error: 'User ID not found in request' });
      }

      const { id } = req.params;
      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      if (comment.creator !== userId) {
        return res.status(403).json({ error: 'User cannot delete this comment' });
      }

      await comment.destroy();

      return res.status(200).json({ message: 'Comment deleted!' });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }
];