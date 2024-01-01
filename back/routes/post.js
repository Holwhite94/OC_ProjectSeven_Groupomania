// imports 
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

//routes 
router.post('/createPost', multer, postCtrl.createPost);
router.get('/posts/all', postCtrl.getPostsWithComments);
router.delete('/posts/:id', postCtrl.deletePost);

// export the router 
module.exports = router; 