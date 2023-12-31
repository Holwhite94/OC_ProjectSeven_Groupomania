const express = require('express');

const router = express.Router();



const commentCtrl = require('../controllers/comment');

//routes 

router.post('/createComment', commentCtrl.createComment);
router.delete('/comments/:id', commentCtrl.deleteComment);


// export the router 
module.exports = router; 