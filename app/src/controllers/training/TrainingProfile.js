import React, { useState, useEffect } from 'react';
import Sidebar from '../utils/SideBar';
import { Card, ListGroup, ListGroupItem, Badge, Button,Modal, Container } from "react-bootstrap";
import { Link, useParams,useLocation } from "react-router-dom";
import { API_GATEWAY,TOKEN } from '../../utils/constants';

export default function TrainingProfile() {
    const location = useLocation()
    const training = location.state.training

    const [showModal, setShowModal] = useState(false);
    const [trainingToBlock, setTrainingToBlock] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isBlocked,setBlocked] = useState(training.blocked) 

    function handleBlockTraining(training) {
      setTrainingToBlock(training);
      setShowModal(true);
    }

    function handleConfirmBlockTraining() {
        // hacer petición para bloquear usuario
        console.log(trainingToBlock.id)
        let endpoint = API_GATEWAY + 'trainings/' + trainingToBlock.id.toString()
        const url = isBlocked ? endpoint + '/unblock ' : endpoint + '/block' 
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
              setBlocked(!isBlocked)     
            })  
          }
        })
        .catch(error => {
          setError(true)
          setErrorMessage(error)
        })     
        setShowModal(false);
    }

    function handleCancelBlockTraining() {
        setTrainingToBlock(null);
        setShowModal(false);
    }  

  
    return (
      <div>
        <Sidebar title={"Training: "+training.title}></Sidebar>
        
        <Card style = {{width:"80%",margin:"auto"}}>
          <Card.Body>
            <Card.Title>{training.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {isBlocked 
                ?<p style = {{color:"crimson"}}>Blocked</p> 
                :<p style = {{color:"#20c997"}}>Available</p> 
              }
              {training.description}      
            </Card.Subtitle>
            <ListGroup className="mb-3">
              <ListGroupItem>
                <b>Type:</b> {training.type}
              </ListGroupItem>
              <ListGroupItem>
                <b>Difficulty:</b> {training.difficulty}
              </ListGroupItem>

              <ListGroupItem>
                <b>Trainer Id:</b> {training.id_trainer}
              </ListGroupItem>
              
            </ListGroup>
            <div>
              <Container style = {{margin:"auto",textAlign:"center"}} >
                <Button variant="danger" onClick={() => handleBlockTraining(training)}>
                    {isBlocked ? "Unblock Training" : "Block Training" }
                </Button>
              </Container>
            </div>

            {error && (
            <div className="d-flex justify-content-center align-items-center" style={{ marginTop: 10 }}>
              <p style = {{fontSize:18,color : "crimson",padding:5}}> {errorMessage} </p>
            </div>  
          )}
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCancelBlockTraining} style = {{marginTop:175}}>
            <Modal.Header closeButton>
            <Modal.Title>Training {isBlocked ? "Unblock " : "Block" } Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Are you sure you want to {isBlocked ? "unblock" : "block" } the training {trainingToBlock && trainingToBlock.title}?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelBlockTraining}>
                Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmBlockTraining}>
              {isBlocked ? "Unblock " : "Block" }
            </Button>
            </Modal.Footer>
        </Modal>
        <Container style = {{textAlign:"center",width:"80%",marginTop:10}}>
          <Link to="/trainings">Back to Trainings</Link>
        </Container>
      </div>
    );


}