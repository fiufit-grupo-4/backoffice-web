import React, { useState, useEffect } from 'react';
import { Card, Form,Table, Container,Row,Spinner, Col } from 'react-bootstrap';
import Sidebar from '../utils/SideBar';
import { Link } from 'react-router-dom';
import { API_GATEWAY,TOKEN } from '../../utils/constants';

export default function Certify() {
   //const [users, setUsers] = useState([]);
   const [nameFilter, setNameFilter] = useState('');
   const [certificates, setCertificates] = useState([]);
   const [stateFilter, setStateFilter] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");

   // Esta función se llamará cada vez que se cambie el valor del filtro de nombre
   function handleNameFilterChange(event) {
     setNameFilter(event.target.value);
   }

   // Esta función se llamará cada vez que se cambie el valor del filtro de rol
   function handleStateFilterChange(event) {
    setStateFilter(event.target.value);
   }

   // Esta función devuelve los datos de los usuarios filtrados según los valores de los filtros
   function getFilteredCertificates() {
     return certificates.filter((certificate) => {
       const nameMatches = certificate.mail.toLowerCase().includes(nameFilter.toLowerCase());
       const stateMatches  = getState(certificate.verification.verified).toLowerCase().includes(stateFilter.toLowerCase());
       return nameMatches && stateMatches;
     });
   }

   
   useEffect(() => {
    const url = API_GATEWAY + 'users/verification'
    const accessToken = localStorage.getItem(TOKEN)
    async function getCertificates() {
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
            setCertificates(data);
          })   
        }
      })
      .catch(error => {
        setError(true)
        setErrorMessage(error)
      })
    }
    getCertificates();
  }, []); 

  const getState = (state) => {
    if (state) {
      return "approved"
    } else if (state == false) {
      return "rejected"
    } else {
      return "pending"
    }

  }

   return (
     <div>
       <Sidebar title={"Certify"} />
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
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" value={nameFilter} onChange={handleNameFilterChange} />
                      </Form.Group>
          
                      <Form.Group controlId="state">
                          <Form.Label>State:</Form.Label>
                          <Form.Select defaultValue="" onChange={handleStateFilterChange}>
                            <option value="">All</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="pending">Pending</option>
                          </Form.Select>
                      </Form.Group>

                    </Form>
                    
                  </Col>
                  <Col md={9}>
                    <h3>Certificate Requests:</h3>
                    <br></br>
                    <Table striped bordered  hover   rowkey="Id">
                    <thead>
                        <tr style={{backgroundColor:"#00bc8c"}}>
                          
                          <th >Email</th>
                          <th >State</th>

                          <th >Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    {getFilteredCertificates().map(certificate => (
                        <tr key = {certificate.id} variant="danger">
                          
                          <td>{certificate.mail}</td>
                          <td>{certificate.verification.verified
                            ? <p style = {{ color:"#3498db"}}>Approved</p> 
                            : certificate.verification.verified == false
                            ? <p style = {{color:"crimson"}}>Rejected</p>
                            : <p>Pending</p> 
                          }</td>
                
                          <td>    
                              <Link 
                                to= { `/certify/${certificate.id}`}
                                state={{certificate:certificate}}
                                style= {{color:"#20c997"}}>
                                  
                                See More
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