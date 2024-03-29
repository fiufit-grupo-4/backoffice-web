import React, { Component } from 'react';
import {Button,Container,Form,Nav,Navbar,NavDropdown,Offcanvas,Card} from 'react-bootstrap';
import logo from "../../assets/img/fiticon.png";
import {useNavigate } from 'react-router-dom';
import { TOKEN } from '../../utils/constants';
import { NavLink } from "react-router-dom"

function Sidebar({title}) {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem(TOKEN)
        navigate('/');
      };

    return (
        <>
        {[false].map((expand) => (
          <Navbar key={expand} bg="primary" expand={expand} className="mb-3">
            <Container fluid>
              <Navbar.Toggle variant ={"warning"} aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <h2 style={{ color: 'white',margin:"auto" }}>{title}</h2>
              <NavLink to="/home" className= "ml-auto">
                <h4 style={{ color: 'white' }}>
                <img src={logo} style={{ width: '100px',margin:"auto" }} />
                </h4>
              </NavLink>
              
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
                    <NavLink to="/home" activeClassName="active" className="nav-link">Home</NavLink>
                    <NavLink to="/users" activeClassName="active" className="nav-link">Users</NavLink>
                    <NavLink to="/trainings" activeClassName="active" className="nav-link">Trainings</NavLink>
                    <NavLink to="/register" activeClassName="active" className="nav-link">Register New Admin</NavLink>
                    <NavLink to="/certify" activeClassName="active" className="nav-link">Certify Trainer</NavLink>

                    <NavDropdown
                      title="Metrics"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item href="#userMetrics">
                        <NavLink to="/stats/user" activeClassName="active" className="nav-link" style = {{height:28,padding:2,alignContent:"center"}}>Users</NavLink>
                      </NavDropdown.Item>
                      
                      <NavDropdown.Item href="#trainingMetrics">
                        <NavLink to="/stats/training" activeClassName="active" className="nav-link" style = {{height:28,padding:2,alignContent:"center"}}>Trainings</NavLink>
                      </NavDropdown.Item>
                    
                      <NavDropdown.Item href="#contentMetrics">
                        <NavLink to="/stats/content" activeClassName="active" className="nav-link" style = {{height:28,padding:2,alignContent:"center"}}>Content</NavLink>
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