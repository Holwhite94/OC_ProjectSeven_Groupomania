import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function LoginForm({ loggedIn, setLoggedIn }) {

  
  const [login, updateLogin] = useState({
    email: '',
    password: '',
  });



  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
      });

      if (response.ok) {
        const data = await response.json();
        const { userId, token } = data;

        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);

        setLoggedIn(true);
        
      } else {
        console.error('Login failed');
      }
    } catch (error) { 
      console.error('Error:', error);
      setLoggedIn(false);
    }
  };



  const handleChange = (event) => {
    const { name, value } = event.target;
    updateLogin({ ...login, [name]: value });
  };

  console.log('loggedIn value at submit:', loggedIn);
  return (
    <Container id="login">
      {loggedIn ? <Navigate to="/homepage" /> : null}
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={login.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password..."
                value={login.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>

            <Form.Text className="text-muted mt-2">
              <Link to="/signup">Don't have an account? Sign up here</Link>
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;