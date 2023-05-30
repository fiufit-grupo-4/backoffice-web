import React, { useState, useEffect } from 'react';
import { Card, Form,Table, Container,Row, Col, Spinner } from 'react-bootstrap';
import Sidebar from '../utils/SideBar';
import { Link } from 'react-router-dom';
import { API_GATEWAY, TOKEN, ADMIN, ATHLETE, TRAINER } from '../../utils/constants';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [stateFilter, setStateFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    // Esta función se llamará cada vez que se cambie el valor del filtro de nombre
    function handleNameFilterChange(event) {
      setNameFilter(event.target.value);
    }

    // Esta función se llamará cada vez que se cambie el valor del filtro de rol
    function handleRoleFilterChange(event) {
      setRoleFilter(event.target.value);
    }
    
    function handleStateFilterChange(event) {
      setStateFilter(event.target.value);
    }

    // Esta función devuelve los datos de los usuarios filtrados según los valores de los filtros
    function getFilteredUsers() {
      return users.filter((user) => {
        const nameMatches = user.mail.toLowerCase().includes(nameFilter.toLowerCase());
        const roleMatches = getRole(user.role).toLowerCase().includes(roleFilter.toLowerCase());
        const stateMatches = isBlocked(user.blocked).toLowerCase().includes(stateFilter.toLowerCase());
        return nameMatches && roleMatches && stateMatches;
      });
    }

    function getRole(role){
      if (role == ADMIN){
        return "Admin"
      } else if (role == TRAINER){
        return "Trainer"
      } else if (role == ATHLETE){
        return "Athlete"
      } else {
        return "Undefined"
      }
    }
    function isBlocked(boolean){
      return boolean ? "Blocked" : "Available"
    }

    
    useEffect(() => {
        const url = API_GATEWAY + 'users'
        const accessToken = localStorage.getItem(TOKEN)
        async function getUsers() {
          setLoading(true)
          fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + accessToken,    
            }
          }).then(response => {
            setLoading(false)  
            if (!response.ok) {
              setError(true)
              if(response.status == 401){
                setErrorMessage("Unhautorized, not valid access token")
              } else {
                setErrorMessage("Failed to connect with server")
              }
            } else {
              response.json().then(data => {
                console.log(data)
                setUsers(data);
              })
              
            }
          })
          .catch(error => {
            setError(true)
            setErrorMessage(error)
          })
        }
        getUsers();
    }, [])  

    return (
      <div>
        <Sidebar title={"Users"} />
    
        {loading 
              ? <div className="d-flex justify-content-center align-items-center" style={{ marginTop: 70 }}>
                  <Spinner animation="border" role="status"  style={{ width: "4rem", height: "4rem" }}>
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
               
              : <>
               <Card style= {{width:"90%",margin:"auto"}}>
                <Card.Body>
                  <Row>
                    <Col md={3}>
                      <h3>Filters:</h3>
                      <Form>
                        <Form.Group>
                          <Form.Label>Name</Form.Label>
                          <Form.Control type="text" value={nameFilter} onChange={handleNameFilterChange} />
                        </Form.Group>
                        <Form.Group controlId="rol">
                          <Form.Label>Rol:</Form.Label>
                          <Form.Select defaultValue="" onChange={handleRoleFilterChange}>
                            <option value="">All</option>
                            <option value="admin">Admin</option>
                            <option value="athlete">Athlete</option>
                            <option value="trainer">Trainer</option> 
                          </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="state">
                          <Form.Label>State:</Form.Label>
                          <Form.Select defaultValue="" onChange={handleStateFilterChange}>
                            <option value="">All</option>
                            <option value="available">Available</option>
                            <option value="blocke">Blocked</option>
                          </Form.Select>
                        </Form.Group>
                      </Form>
                      
                    </Col>
                    <Col md={9}>
                      <h3>Users:</h3>
                      <br></br>
                      <Table striped bordered  hover   rowkey="Id">
                      <thead>
                          <tr style={{backgroundColor:"#375a7f"}}>

                            <th >Email</th>
                            <th >Rol</th>
                            <th >State</th>
                            <th >Options</th>
                          </tr>
                      </thead>
                      <tbody>
                      {getFilteredUsers().map(user => (
                          <tr key = {user.id} variant="danger">

                            <td>{user.mail}</td>
                            <td>{getRole(user.role)}</td>
                            <td>
                              {user.blocked
                                ?<p style = {{color:"crimson"}}>Blocked</p> 
                                :<p style = {{color:"#20c997"}}>Available</p>
                              }
                            </td>
                            <td>    
                                <Link 
                                  to= { `/users/${user.id}`}
                                  state={{user: user}}
                                  style={{color:"#3498db"}}
                                  >
                                  See Profile
                                </Link>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                  </Table>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
                
                
                {error && (
                  <div className="d-flex justify-content-center align-items-center" style={{ marginTop: 10 }}>
                    <p style = {{fontSize:18,color : "crimson",padding:5}}> {errorMessage} </p>
                  </div>  
                )}
                </>

            }
      
      </div>
    );
  };


  