
const authMiddleware = require('../middleware/auth');
const {Comment}= require('../models/models');
  

// get commets for post do I need this anymore?????
exports.getComments = (req, res, next) => {

    const match = {}
    if(req.query.postId){
        match.postId = req.query.postId
    }
    Comment.findAll({where:match})
    .then(
      (comments) => {
        return res.status(200).json(comments);
      }
    )
    .catch(
      (error) => {
        return res.status(400).json({
          error: error
        });
      }
    );
  };

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
              message: "Post created successfully"
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


 