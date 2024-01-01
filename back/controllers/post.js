// import all models as we need all three
const {Post, Comment, User }= require('../models/models');
// import auth middelware 
const authMiddleware = require('../middleware/auth');


// get all posts WITH comments AND associated users as 'creators'
exports.getPostsWithComments = async (req, res, next) => {
  try {
    const postsWithComments = await Post.findAll({
  
      include: [ {
        model: Comment,
        required: false,
        include: [
          {
            model: User,
            as: 'commentCreator',
            attributes: ['firstName'], 
          },
        ],
      },
      {
        model: User,
        as: 'postCreator',
        attributes: ['firstName'], 
      },
    ],
    });
    
    return res.status(200).json(postsWithComments);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// create post 
exports.createPost = [

authMiddleware,

 (req, res, next) => {

  const url = req.protocol + '://' + req.get('host');

  const userId = req.auth.userId; 

  if (!userId) {
    return res.status(401).json({ error: 'User ID not found in request' });
  }

  let imageUrl = ''; //imageUrl as an empty string

  // check fir image 
  if (req.file) {
    imageUrl = url + '/images/' + req.file.filename;
  }

  const post = new Post({
    text: req.body.text,
    imageUrl:imageUrl, // if image found added if not remains empty string
    creator: userId,
    createdDate: new Date(),
  });
  

  post.save().then(
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


// delete post WITH comments 

exports.deletePost = [
  authMiddleware,
  async (req, res, next) => {
    try {
      //get user id from token header
      const userId = req.auth.userId;
      
      if (!userId) {
        return res.status(401).json({ error: 'User ID not found in request' });
      }
      // get post id from req params and match to database by find by primary key 
      const { id } = req.params;
      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // checks if user id matches creator id so only users who created can delete
      if (post.creator !== userId) {
        return res.status(403).json({ error: 'User cannot delete this post' });
      }

      // delete the post and its comments
      await Comment.destroy({ where: { postId: post.id } });
      await post.destroy();

      return res.status(200).json({ message: 'Post and comments deleted!' });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }
];