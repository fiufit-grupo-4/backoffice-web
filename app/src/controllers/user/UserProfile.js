import React, { useState, useEffect } from 'react';
import Sidebar from '../utils/SideBar';
import { Card, ListGroup, ListGroupItem, Badge, Button,Modal, Container } from "react-bootstrap";
import { Link, useParams,useLocation } from "react-router-dom";


export default function UserProfile() {
    const location = useLocation()
    const user = location.state.user

    const [showModal, setShowModal] = useState(false);
    const [userToBlock, setUserToBlock] = useState(null);

    //const { userId } = useParams();
    //const [user, setUser] = useState(null);

    function handleBlockUser(user) {
      setUserToBlock(user);
      setShowModal(true);
    }

    function handleConfirmBlockUser() {
        // hacer petición para bloquear usuario
        console.log(`Usuario ${userToBlock.name} bloqueado`);
        setShowModal(false);
    }

    function handleCancelBlockUser() {
        setUserToBlock(null);
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
        <Sidebar title={"User Profile"}></Sidebar>
        
        <Card style = {{width:"80%",margin:"auto"}}>
          <Card.Body>
            <Card.Title>{user.name + user.lastName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {user.id}
            </Card.Subtitle>
            <ListGroup className="mb-3">
              <ListGroupItem>
                <b>email:</b> {user.mail }
              </ListGroupItem>
              <ListGroupItem>
                <b>Age:</b> {user.age ? user.age : " undefined"}
              </ListGroupItem>
              
            </ListGroup>
            <div>
              <Container style = {{margin:"auto",textAlign:"center"}} >
                
                <Button variant="danger" onClick={() => handleBlockUser(user)}>
                      Block User
                </Button>
              </Container>
            </div>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCancelBlockUser} style = {{marginTop:175}}>
            <Modal.Header closeButton>
            <Modal.Title>User Block Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Are you sure you want to block the user {userToBlock && userToBlock.name}?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelBlockUser}>
                Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmBlockUser}>
                Block
            </Button>
            </Modal.Footer>
        </Modal>
        <Container style = {{textAlign:"center",width:"80%",marginTop:10}}>
          <Link to="/users">Back to Users</Link>
        </Container>
      </div>
    );


}