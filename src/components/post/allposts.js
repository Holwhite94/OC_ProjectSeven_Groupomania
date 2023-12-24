import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

import CreateComment from '../createcomment';
import deletePost from './deletepost';

// get posts 
function getAllPosts() {
  return fetch("http://localhost:5000/api/auth/posts/all")
    .then(response => response.json())
    .catch(error => {
      console.error('There was a problem fetching the posts:', error);
      return [];
    });
}


// display posts 
function PostCards() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts()
      .then(data => setPosts(data))
      .catch(error => {
        console.error('There was a problem fetching the posts:', error);
      });
  }, []);

  // handle delete 
  const handleDelete = async (postId, userId) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      const token = localStorage.getItem('token');
      await deletePost(postId, token);
      // Refresh posts after delete
      getAllPosts()
        .then(data => setPosts(data))
        .catch(error => {
          console.error('There was a problem fetching the posts:', error);
        });
    }
  };


  // render delete button based on user id
  const renderDeleteButton = (post) => {
    const userId = localStorage.getItem('userId'); 
    console.log(userId);
    console.log(post.creator);
    if (String(userId) === String(post.creator)) {
      return (
        <button id="delete-button" onClick={() => handleDelete(post.id, userId)}>Delete</button>
      );
    }
    return null;
  };

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
                <CreateComment postId={post.id} />
              </div>
              <div id="comment-container">
              <h4>Comments:</h4>
              <ul id="comment-list">
                {post.Comments && post.Comments.map((comment, commentIndex) => (
                  <li key={commentIndex}> <p id="creator">{comment.commentCreator && comment.commentCreator.firstName}:</p> {comment.text}</li>
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

