import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import { Card, ListGroup, ListGroupItem, Badge, Button,Modal, Container } from "react-bootstrap";
import { Link, useParams,useLocation } from "react-router-dom";


export default function TrainingProfile() {
    const location = useLocation()
    const training = location.state.training

    const [showModal, setShowModal] = useState(false);
    const [trainingToBlock, setTrainingToBlock] = useState(null);

    //const { userId } = useParams();
    //const [user, setUser] = useState(null);

    function handleBlockTraining(training) {
      setTrainingToBlock(training);
      setShowModal(true);
    }

    function handleConfirmBlockTraining() {
        // hacer petición para bloquear usuario
        console.log(`Entrenamiento ${trainingToBlock.title} bloqueado`);
        setShowModal(false);
    }

    function handleCancelBlockTraining() {
        setTrainingToBlock(null);
        setShowModal(false);
    }  


    /*
    useEffect(() => {
      const fetchUser = async () => {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      };
      fetchUser();
    }, [userId]);
  
    if (!user) {
      return <div>Loading...</div>;
    }*/
  
    return (
      <div>
        <Sidebar title={"Training: "+training.title}></Sidebar>
        
        <Card style = {{width:"80%",margin:"auto"}}>
          <Card.Body>
            <Card.Title>{training.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
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
                <b>Trainer:</b> {training.trainer_name}
              </ListGroupItem>
              <ListGroupItem>
                <b>Trainer Id:</b> {training.trainer_id}
              </ListGroupItem>
              
            </ListGroup>
            <div>
              <Container style = {{margin:"auto",textAlign:"center"}} >
                <Button variant="primary"  >Edit Training</Button>{" "}
                <Button variant="danger" onClick={() => handleBlockTraining(training)}>
                      Block Training
                </Button>
              </Container>
            </div>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCancelBlockTraining} style = {{marginTop:175}}>
            <Modal.Header closeButton>
            <Modal.Title>Training Block Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Are you sure you want to block the training {trainingToBlock && trainingToBlock.title}?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelBlockTraining}>
                Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmBlockTraining}>
                Block
            </Button>
            </Modal.Footer>
        </Modal>
        <Container style = {{textAlign:"center",width:"80%",marginTop:10}}>
          <Link to="/trainings">Back to Trainings</Link>
        </Container>
      </div>
    );


}