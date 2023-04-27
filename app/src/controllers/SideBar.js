import React, { Component } from 'react';
import {Button,Container,Form,Nav,Navbar,NavDropdown,Offcanvas,Card} from 'react-bootstrap';
import logo from "../assets/img/fiticon.png";
import {useNavigate } from 'react-router-dom';

function Sidebar({title}) {
    const navigate = useNavigate();

    const handleLogOut = () => {
        navigate('/');
      };

    return (
        <>
        {[false].map((expand) => (
          <Navbar key={expand} bg="primary" expand={expand} className="mb-3">
            <Container fluid>

              <Navbar.Toggle variant ={"warning"} aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <h2 style={{ color: 'white' }}>{title}</h2>
              <Navbar.Brand href="/home" className= "ml-auto">
                <h4 style={{ color: 'white' }}>
                <img src={logo} style={{ width: '100px' }} />
                </h4>
              </Navbar.Brand>
              
              <Navbar.Offcanvas 
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
              >
                <Offcanvas.Header closeButton> 
                 <Container style={{ textAlign:"center" }} >
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} style={{ color: '#f39c12' }} >
                    FiuFit - Administration Mode
                  </Offcanvas.Title>
                  </Container>
                </Offcanvas.Header>

                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3" style={{alignItems:"center"}}>
                  <Container>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="primary">Search</Button>
                  </Form>
                    <br></br>
                    <Container>
                    <Nav.Link href="/home" >  
                        Home
                    </Nav.Link>
                    <Nav.Link href="/register">Register New Admin</Nav.Link>
                    <Nav.Link href="/users">Users</Nav.Link>
                    <Nav.Link href="/trainings">Trainings</Nav.Link>
                    <NavDropdown
                      title="Settings"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>
                    
                    </Container>
                    <Button variant="secondary" className="mt-3" style={{width:"100%"}}  onClick={handleLogOut}  >Log Out</Button>
                    </Container>
                    
                  </Nav>
                  
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
    );
}

export default Sidebar;