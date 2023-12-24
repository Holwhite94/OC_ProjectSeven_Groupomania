import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

function CreateCommentForm({postId}) {
  const [comment, setComment] = useState({
    text: '', 
    created: false,
  });

  const handleChange = (e) => {
    setComment({ ...comment, text: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    const commentBody = {
        text: comment.text,
        postId: postId,
      };
    

    try {
      const response = await fetch('http://localhost:5000/api/auth/createcomment', {
        method: 'POST',
        body: JSON.stringify(commentBody),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setComment({ ...comment, created: true });
      } else {
        console.error('Comment creation failed');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  //didnt work
//   const handlePostId = (e) => {
//     const postId = e.target.closest('.post').getAttribute('data-post-id');
//     setComment({ ...comment, postId });
//   };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label id="comment-label">Comment...</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="text"
          value={comment.text}
          onChange={handleChange}
        />
      </Form.Group>
      <button id="comment-button" type="submit">
        Submit Comment
      </button>
    </Form>
  );
}

export default CreateCommentForm;