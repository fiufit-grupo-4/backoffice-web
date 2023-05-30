import React, { useState, useEffect } from 'react';
import Sidebar from '../utils/SideBar';
import { Card, ListGroup, ListGroupItem, Accordion, Table, Button,Modal, Container } from "react-bootstrap";
import { Link, useParams,useLocation,useNavigate } from "react-router-dom";
import { API_GATEWAY,TOKEN } from '../../utils/constants';
import ReactPlayer from 'react-player';

export default function CertifyProfile() {
    const location = useLocation()
    const certificate = location.state.certificate
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [certifyToApprove, setCertifyToApprove] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isBlocked,setBlocked] = useState(false) 
    const [state,setState] = useState(certificate.verification.verified) 

    function handleApproveCertificate(certificate) {     
      setCertifyToApprove(certificate);
      setShowModal(true);
    }

    function handleApproveCertificate(certificate) {     
        setCertifyToApprove(certificate);
        setShowModal(true);
    }
  
    function handleCancelApproveCertificate() {
        setCertifyToApprove(null);
        setShowModal(false);
    }  

    function handleConfirmApproveCertificate() {

        console.log(certificate)
        let url = API_GATEWAY + 'users/' + certifyToApprove.id.toString() + "/verification/approve"
        //const url = state ? endpoint + '/reject ' : endpoint + '/approve' 
        const accessToken = localStorage.getItem(TOKEN)
        console.log(accessToken)
        setLoading(true)
        setError(false)
        fetch(url, {
          method: 'PATCH',
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
              setState(true)
              navigate('/certify');     
            })  
          }
        })
        .catch(error => {
          setError(true)
          setErrorMessage(error)
        })     
        setShowModal(false);
    }


    

  
    return (
      <div>
        <Sidebar title={"Certificate Trainer"}></Sidebar>

        <Card style = {{width:"80%",margin:"auto"}}>
          <Card.Body>
            <Card.Body className="d-flex justify-content-between">
              <div className="d-flex flex-column">
                <Card.Title>{certificate.name + " " + certificate.lastname}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {state == true
                        ? <p style = {{ color:"#3498db"}}>Approved</p> 
                        : state == false
                        ? <p style = {{color:"crimson"}}>Rejected</p>
                        : <p>Pending</p>
                    }      
                </Card.Subtitle> 
              </div>
              <div>
                <Container style = {{textAlign:"center"}} >  
                    <Button variant="primary" onClick={() => handleApproveCertificate(certificate)}>
                        Approve
                    </Button>   
                </Container>
              </div>
            
            </Card.Body>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40vh',
              }}>
            <ReactPlayer url={certificate.verification.video} controls width="80%" height="100%"  />
            </div>

            <ListGroup className="mb-3" style = {{marginLeft:20,marginRight:20,marginTop:20}}>

              <ListGroupItem style = {{backgroundColor:"#375a7f"}}>
                <b>Information</b> 
              </ListGroupItem>

              <ListGroupItem>
                <b>email: </b> {certificate.mail }
              </ListGroupItem>

              <ListGroupItem>
                <b>phone: </b> {certificate.phone_number }
              </ListGroupItem>

              <ListGroupItem>
                <b>age: </b> {certificate.age }
              </ListGroupItem>

              <ListGroupItem>
                <b>state:  {certificate.blocked
                ?<b style = {{color:"crimson"}}> Blocked</b> 
                :<b style = {{color:"#20c997"}}> Available</b> 
              } </b>
              </ListGroupItem>
            
              
            </ListGroup>

            

            {error && (
            <div className="d-flex justify-content-center align-items-center" style={{ marginTop: 10 }}>
              <p style = {{fontSize:18,color : "crimson",padding:5}}> {errorMessage} </p>
            </div>  
          )}
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCancelApproveCertificate} style = {{marginTop:175}}>
            <Modal.Header closeButton>
                <Modal.Title> Certificate Approve Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to approve the trainer {certifyToApprove && certifyToApprove.name} certificate´s?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelApproveCertificate}>
                Cancel
            </Button>
              
                <Button variant="primary" onClick={handleConfirmApproveCertificate}>
                    Approve
                </Button>  
             
            </Modal.Footer>
        </Modal>

        
        <Container style = {{textAlign:"center",width:"80%",marginTop:10,marginBottom:20}}>
          <Link to="/certify">Back to Certify Trainers</Link>
        </Container>
      </div>
    );


}