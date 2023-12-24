// import user state
import React, { useState } from 'react';

import { Link, Navigate } from 'react-router-dom';

//bootstrap react imports

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// use container, row, col to adjust placement and sizing using bootstrap grid 
// https://react-bootstrap.github.io/docs/forms/layout
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// set user state for sign up
function SignUpForm() {
  const [signUp, updateSignUp] = useState({
    firstName: '',
    secondName: '',
    email: '',
    password: '',
  });


// set state to follow sign up
  const [signedUp, setSignedUp] = useState(false); 

  // handle submit post request 
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/api/auth/signup", {
            method: 'POST',
            body: JSON.stringify(signUp),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
          if (response.ok) {
            setSignedUp(true); 
          } else {
            console.log('Sign up failed')
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    
  };

  // add section for change with update sign up 
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateSignUp({ ...signUp, [name]: value });
  };

  // return html 
  return (
    <Container id="signup">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
        {signedUp && <Navigate to="/login" />} 
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter your first name..."
                value={signUp.firstName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="secondName">
              <Form.Label>Second Name:</Form.Label>
              <Form.Control
                type="text"
                name="secondName"
                placeholder="Enter your second name..."
                value={signUp.secondName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={signUp.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password..."
                value={signUp.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Sign Up
            </Button>
            <Link to="/login">Already have an account? Log in here</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpForm;