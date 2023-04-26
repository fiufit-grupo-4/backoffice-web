import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import logo from "../assets/img/admin.png";

function Signup() {

  const onSubmit = (data) => {
    console.log(data);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const username = event.target.username.value;
    console.log('Password:', password);
    console.log('Email:', email);
    console.log('Password:', password);
    navigate('/');
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <img src={logo} style={{ width: '300px' }} />
        <Form style={{ width: '300px'}} onSubmit={handleSubmit} >
            
            <h2 className="mb-3">Admin SignUp</h2>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name = "email"/>
            </Form.Group>

            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="input" placeholder="Enter username" name = "username"/>
            </Form.Group>

            

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name = "password"/>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3 mb-3" >
                Sign Up
            </Button>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </Form>
    </div> 
  );
}

export default Signup;