import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useState} from 'react'
import { Form, Button ,InputGroup,Spinner} from 'react-bootstrap';
import logo from "../../assets/img/admin.png";
import {IoEyeOutline, IoEyeOffOutline,IoMailOutline } from "react-icons/io5";
import Sidebar from '../utils/SideBar';
import { API_GATEWAY,TOKEN,ADMIN } from '../../utils/constants';


function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    var url = API_GATEWAY + 'signup/';
    setLoading(true)
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const accessToken = localStorage.getItem(TOKEN)
    if (password !== confirmPassword) {
      setErrorMessage("Passwords Missmatch");
    } else {
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Repeated Password:', confirmPassword);

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify({
          "mail": email,
          "password": password,
          "role": ADMIN,
        })
      })
      .then(response => {
        setLoading(false)
        if (!response.ok) {
          console.log(response.status)
          setError(true)
          if(response.status == 401){
            setErrorMessage("Not Authorized")
          } else {
            setErrorMessage("Failed to connect with server")
          }
        } else {
          navigate('/home');
        }
      })
      .catch(error => {
        setError(true)
        setErrorMessage(error)
      })
      
    }


  };

  return (
    <>
    <Sidebar title={"Admin Registration"}/>
    <div className="d-flex justify-content-center align-items-center" style={{ display:'flex',margin:"auto"}}>
       <img src={logo} style={{ width: '300px',marginRight:20 }} />
        <Form style={{ width: '300px'}} onSubmit={handleSubmit} >
            
            <br></br>
            <br></br>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text >
                    <IoMailOutline />
                  </InputGroup.Text>
                  <Form.Control required type="email" placeholder="Enter email" name = "email"/>
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
                
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text onClick={toggleShowPassword}>
                      {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </InputGroup.Text>
                  <Form.Control
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name = "password"
                    onChange={() =>setErrorMessage("")}
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
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Repeat your Password"
                    name = "confirmPassword"
                    onChange={() =>setErrorMessage("")}
                  />
                </InputGroup>

            </Form.Group>

            {errorMessage && (
              <div className="text-danger mb-3">{errorMessage}</div>
            )}

            <Form.Group className="mt-3 ">
              <Form.Check
                required
                label={<p>Agree to <Link to="/login">Terms & Conditions</Link> </p>}
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>

            {loading 
              ? <div className="d-flex justify-content-center align-items-center" style={{ marginTop: 10 }}>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
               
              : <>
                <Button variant="primary" type="submit" className="w-100 mt-3 mb-3" >
                  Sign Up
                </Button>
                
                
                </>
            }    
        </Form>
    </div> 
    </>
  );
}

export default Register;


/*




*/