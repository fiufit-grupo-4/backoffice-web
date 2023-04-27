import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useState} from 'react'
import { Form, Button ,InputGroup} from 'react-bootstrap';
import logo from "../assets/img/admin.png";
import {IoEyeOutline, IoEyeOffOutline,IoMailOutline } from "react-icons/io5";

function Signup() {

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const repeat_password = event.target.repeat_password.value;

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Repeated Password:', repeat_password);
    navigate('/');
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <img src={logo} style={{ width: '300px' }} />
        <Form style={{ width: '300px'}} onSubmit={handleSubmit} >
            
            <h2 className="mb-3">Admin SignUp</h2>

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
            
            <Form.Group controlId="formBasicRepeatedPassword">
                <Form.Label>Repeat your Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text onClick={toggleShowPassword}>
                      {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </InputGroup.Text>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Repeat your Password"
                    name = "repeat_password"
                  />
                </InputGroup>

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