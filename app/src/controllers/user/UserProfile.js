import React, { useState, useEffect } from 'react';
import Sidebar from '../utils/SideBar';
import { Card, ListGroup, ListGroupItem, Button,Modal, Container } from "react-bootstrap";
import { Link, useParams,useLocation } from "react-router-dom";
import { API_GATEWAY, TOKEN,ADMIN,ATHLETE,TRAINER } from '../../utils/constants';

export default function UserProfile() {
    const location = useLocation()
    const user = location.state.user
    const [isBlocked,setBlocked] = useState(user.blocked) 
    const [showModal, setShowModal] = useState(false);
    const [userToBlock, setUserToBlock] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    function handleBlockUser(user) {
      setUserToBlock(user);
      setShowModal(true);
    }

    function handleConfirmBlockUser() {
        // hacer petición para bloquear usuario
        console.log(userToBlock.id)
        let endpoint = API_GATEWAY + 'users/' + userToBlock.id.toString()
        const url = isBlocked ? endpoint + '/unblock ' : endpoint + '/block' 
        const accessToken = localStorage.getItem(TOKEN)
        console.log(accessToken)
        setLoading(true)
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

    function handleCancelBlockUser() {
        setUserToBlock(null);
        setShowModal(false);
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
  
    return (
      <div>
        <Sidebar title={"User Profile"}></Sidebar>
        
        <Card style = {{width:"80%",margin:"auto"}}>
          <Card.Body>
            <Card.Title>{user.name}  {user.lastname}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {isBlocked 
                ?<p style = {{color:"crimson"}}>Blocked</p> 
                :<p style = {{color:"#20c997"}}>Available</p> 
              }
            </Card.Subtitle>
            <ListGroup className="mb-3">
              

              <ListGroupItem>
                <b>id:</b> {user.id }
              </ListGroupItem>

              <ListGroupItem>
                <b>email:</b> {user.mail }
              </ListGroupItem>

              <ListGroupItem>
                <b>phone:</b> {user.phone_number }
              </ListGroupItem>

              <ListGroupItem>
                <b>role:</b> {getRole(user.role) }
              </ListGroupItem>

              <ListGroupItem>
              <b>Age:</b> {user.age }
              </ListGroupItem>
              
              
            </ListGroup>
            <div>
              <Container style = {{margin:"auto",textAlign:"center"}} >
                <Button variant="danger" onClick={() => handleBlockUser(user)}>
                    {isBlocked ? "Unblock User" : "Block User" }
                </Button>
                
              </Container>
            </div>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCancelBlockUser} style = {{marginTop:175}}>
            <Modal.Header closeButton>
            <Modal.Title>User {isBlocked ? "Unblock " : "Block" } Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Are you sure you want to {isBlocked ? "unblock" : "block" } the user {userToBlock && userToBlock.name}?
            {error && (
                  <p style = {{fontSize:15,color : "crimson",padding:5}}> {errorMessage} </p>
            )}
            </Modal.Body>

            
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelBlockUser}>
                Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmBlockUser}>
                {isBlocked ? "Unblock " : "Block" }
            </Button>
            </Modal.Footer>
        </Modal>
        <Container style = {{textAlign:"center",width:"80%",marginTop:10}}>
          <Link to="/users">Back to Users</Link>
        </Container>


      </div>
    );


}