import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useState} from 'react';
import { Form, Button, InputGroup} from 'react-bootstrap';
import logo from "../assets/img/admin.png";
import {IoEyeOutline, IoEyeOffOutline,IoMailOutline } from "react-icons/io5";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log('Email:', email);
    console.log('Password:', password);
    navigate('/');
  };


  return (
 
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <img src={logo} style={{ width: '300px' }} />
        <Form style={{ width: '300px'}} onSubmit={handleSubmit} >
            
            <h2 className="mb-3">Admin Login</h2>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <InputGroup>
                  <InputGroup.Text >
                    <IoMailOutline />
                  </InputGroup.Text>
                  <Form.Control type="email" placeholder="Enter email" name = "email"/>
                </InputGroup>
                
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text onClick={toggleShowPassword}>
                      {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </InputGroup.Text>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name = "password"
                  />
                </InputGroup>

            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3 mb-3" >
                Submit
            </Button>
            <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </Form>
    </div> 

  );
}

export default Login;