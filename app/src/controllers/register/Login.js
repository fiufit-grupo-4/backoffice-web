import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useState} from 'react';
import { Form, Button, InputGroup, Spinner} from 'react-bootstrap';
import logo from "../../assets/img/admin.png";
import {IoEyeOutline, IoEyeOffOutline,IoMailOutline } from "react-icons/io5";
import { API_GATEWAY,ADMIN,TOKEN } from '../../utils/constants';


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const url = API_GATEWAY + 'login/'
    setLoading(true)

    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log('Email:', email);
    console.log('Password:', password);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "mail": "username@mail.com",
        "password": "secure",
        "role":3,
      })
    })
    .then(response => {
      setLoading(false)
      
      
      if (!response.ok) {
        setError(true)
        if(response.status == 401){
          setErrorMessage("Invalid username or password")
        } else {
          setErrorMessage("Failed to connect with server")
        }
      } else {
        response.json().then(json => {
          const accesToken = json.access_token
          console.log(json.access_token)
          localStorage.setItem(TOKEN,accesToken);
          //localStorage.setItem("accesToken","true");
          navigate('/home');
        })
        
      }
    })
    .catch(error => {
      setError(true)
      setErrorMessage(error)
    })
  };


  return (
 
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh',margin:"auto" }}>
        <img src={logo} style={{ width: '300px',marginRight:15 }} />
        <Form style={{ width: '300px'}} onSubmit={handleSubmit} >
            
            <h2 className="mb-3">Admin Login</h2>
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
                  />
                </InputGroup>

            </Form.Group>

            {loading 
              ? <div className="d-flex justify-content-center align-items-center" style={{ marginTop: 10 }}>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
               
              : <>
                <Button variant="primary" type="submit" className="w-100 mt-3 mb-3" >
                    Submit
                </Button>
                
                {error && (
                  <p style = {{fontSize:15,color : "crimson",padding:5}}> {errorMessage} </p>
                )}
                </>

            }
            
        </Form>
    </div> 

  );
}

export default Login;