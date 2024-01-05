// react
import React, { useState, useEffect } from 'react';
// bootstrap
import Card from 'react-bootstrap/Card';
// functions
import CreateComment from '../comment/createcomment';
import deletePost from './deletepost';
import deleteComment from '../comment/deletecomment';
import getAllPosts from '../post/getallposts';



// display posts 
function PostCards({ refreshPosts }) {
  const [posts, setPosts] = useState([]);

  // get the posts
  useEffect(() => {
    getAllPosts()
      .then(data => {
        
        const sortedPosts = data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
        setPosts(sortedPosts);
      })
      .catch(error => {
        console.error('There was a problem fetching the posts:', error);
      });
  }, [refreshPosts]);


 // handle post delete 
  const handleDelete = async (postId, userId) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      const token = localStorage.getItem('token');
      await deletePost(postId, token);
      // Refresh posts after delete
      await refreshPosts();
    }
  };


  // render delete button based on user id
  const renderDeleteButton = (post) => {
    const userId = localStorage.getItem('userId'); 
    if (String(userId) === String(post.creator)) {
      return (
        <button id="delete-button" onClick={() => handleDelete(post.id, userId)}>Delete</button>
      );
    }
    return null;
  };

   // handle comment delete
  const handleDeleteComment = async (commentId, userId) => {
    const confirmed = window.confirm('Are you sure you want to delete this comment?');
    if (confirmed) {
      const token = localStorage.getItem('token');
      await deleteComment(commentId, token);
      // Refresh comments after delete
      await refreshPosts();
    }
  };

  const renderCommentDeleteButton = (comment) => {
    const userId = localStorage.getItem('userId'); 
    if (String(userId) === String(comment.creator)) {
      return (
        <button id="delete-button" onClick={() => handleDeleteComment(comment.id, userId)}>Delete</button>
      );
    }
    return null;
  };

  useEffect(() => {
    console.log('PostCards component re-rendered'); 
  }, [posts, refreshPosts]);


  return (
    <div className="post-container">
      <div className="card-container">
        {posts.map((post, index) => (
          <Card key={index} className="post-card">
            {post.imageUrl && <Card.Img variant="top" src={post.imageUrl} />}
            <Card.Body>
              <Card.Title>{post.text}</Card.Title>
              <Card.Text>Created on: {new Date(post.createdDate).toLocaleDateString()}</Card.Text>
              <Card.Text id="created-by">Created by: {post.postCreator && post.postCreator.firstName} {renderDeleteButton(post)}</Card.Text>
              <div className="btn-container">
                <CreateComment postId={post.id} refreshPosts={refreshPosts} />
              </div>
              <div id="comment-container">
              <h4>Comments:</h4>
              <ul id="comment-list">
                {post.Comments && post.Comments.map((comment, commentIndex) => (
                  <li key={commentIndex}> <p id="creator">{comment.commentCreator && comment.commentCreator.firstName}:</p> {comment.text} {renderCommentDeleteButton(comment)}</li>
                
                ))}
              </ul>
            </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default PostCards;

