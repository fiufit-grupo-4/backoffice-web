import React, { useState, useEffect } from 'react';
import Sidebar from '../utils/SideBar';
import { Card, ListGroup, ListGroupItem, Accordion, Table, Button,Modal, Container } from "react-bootstrap";
import { Link, useParams,useLocation } from "react-router-dom";
import { API_GATEWAY,TOKEN } from '../../utils/constants';
import TrainingMediaCarousel from './TrainingMediaCarousel';

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
        console.log(training)
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
            <Card.Body className="d-flex justify-content-between">
              <div className="d-flex flex-column">
                <Card.Title>{training.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {isBlocked 
                      ?<p style = {{color:"crimson"}}>Blocked</p> 
                      :<p style = {{color:"#20c997"}}>Available</p> 
                    }      
                </Card.Subtitle> 
              </div>
              <div>
                <Container style = {{margin:"auto",textAlign:"center"}} >
                  <Button variant="danger" onClick={() => handleBlockTraining(training)}>
                      {isBlocked ? "Unblock Training" : "Block Training" }
                  </Button>
                </Container>
              </div>
            </Card.Body>

            <TrainingMediaCarousel media = { training.media}/>

            <ListGroup className="mb-3" style = {{marginLeft:20,marginRight:20}}>

              <ListGroupItem style = {{backgroundColor:"orange"}}>
                <b>Information</b> 
              </ListGroupItem>
              <ListGroupItem >
                <b>Description:</b> {training.description}
              </ListGroupItem>

              <ListGroupItem >
                <b>Type:</b> {training.type}
              </ListGroupItem>

              <ListGroupItem >
                <b>Difficulty:</b> {training.difficulty}
              </ListGroupItem>

              <ListGroupItem >
                <b>Author:</b> {training.trainer.name + " " + training.trainer.lastname}
              </ListGroupItem>

              <ListGroupItem  >
                <b>Trainer Id:</b> {training.trainer.id}
              </ListGroupItem>

              <ListGroupItem >
                <b>Training Id:</b> {training.id}
              </ListGroupItem>
              
            </ListGroup>

            <Accordion style = {{marginLeft:20,marginRight:20,marginBottom:10}}>
              <Accordion.Item eventKey="1" >
                <Accordion.Header >Scores</Accordion.Header>
                <Accordion.Body>
                <Table striped bordered>
                  <thead style = {{backgroundColor: "#20c997"}}>
                    <tr>
                      <th>User</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {training.scores.map((score, index) => (
                      <tr key={index}>
                        <td>{score.user.name + " " + score.user.lastname}</td>
                        <td>{score.qualification}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>


            <Accordion style = {{marginLeft:20,marginRight:20}}>
              <Accordion.Item eventKey="0">
                <Accordion.Header >Comments</Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered>
                    <thead style = {{backgroundColor: "#3498db"}} >
                      <tr>
                        <th>User</th>
                        <th>Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {training.comments.map((comment, index) => (
                        <tr key={index}>
                          <td>{comment.user.name + " " + comment.user.lastname}</td>
                          <td>{comment.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            

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
        <Container style = {{textAlign:"center",width:"80%",marginTop:10,marginBottom:20}}>
          <Link to="/trainings">Back to Trainings</Link>
        </Container>
      </div>
    );


}



/*


import React from 'react';
import { Accordion, Card, Table, Button } from 'react-bootstrap';

const Post = ({ post }) => {
  const renderScores = () => {
    return (
      <Table striped bordered>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Puntuación</th>
          </tr>
        </thead>
        <tbody>
          {post.score.map((score, index) => (
            <tr key={index}>
              <td>{score.nombre}</td>
              <td>{score.puntuacion}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const renderComments = () => {
    return (
      <Table striped bordered>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Comentario</th>
          </tr>
        </thead>
        <tbody>
          {post.comment.map((comment, index) => (
            <tr key={index}>
              <td>{comment.usuario}</td>
              <td>{comment.comentario}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <div>
      <h1>Título del post</h1>
      
    </div>
  );
};

export default Post;



*/