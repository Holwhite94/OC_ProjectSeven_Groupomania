// react
import React, { useState } from 'react';
// bootstrap
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// create post WITH refreshPosts passed down
function CreatePostForm({ refreshPosts }) {
  // for created post
  const [post, setPost] = useState({
    text: '',
    image: null,
    created: false,
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'imageUrl') {
      setPost({
        ...post,
        image: files[0], 
      });
    } else {
      setPost({
        ...post,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('text', post.text);

    if (post.image) {
      formData.append('image', post.image);
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/createpost', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`, 
        }
      });

      if (response.ok) {
        setPost({ ...post, created: true });

        await refreshPosts()

      } else {
        console.error('Post creation failed');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };



  return (
    <Container id="createPostContainer">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <h2 className="text-center mb-4">Create a post...</h2>
          {post.created ? (
            <p className="text-center">Post created successfully!</p>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="text">
                <Form.Label></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Write something here..."
                  name="text"
                  value={post.text}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="image" className="mb-3">
                <Form.Label>Add an image?</Form.Label>
                <Form.Control type="file" name="imageUrl" onChange={handleChange} />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Create Post
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePostForm;