import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Modal,Table,ButtonGroup, Container } from 'react-bootstrap';
import Sidebar from './SideBar';
import { Link } from 'react-router-dom';

export default function Users() {
    //const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [userToBlock, setUserToBlock] = useState(null);

    const users = [
        {   id:"1",
            name:"Juan",
            rol:"Trainer"
        },
        {
            id:"2",
            name:"Domingo",
            rol:"Atleta"
        },
        {
            id:"3",
            name:"Perón",
            rol:"Trainer"
        },

    ]

    /*
    useEffect(() => {
        async function getUsers() {
          const response = await fetch('https://api.example.com/users');
          const data = await response.json();
          setUsers(data);
        }
        getUsers();
    }, []);*/


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

    return (
      <div>
        <Sidebar title={"Users"} />
        <Container style = {{justifyContent:"center",margin: "auto",alignItems: 'center',width:"80%",alignSelf:"center",textAlign:"center" }}>


        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Rol</th>
                <th>Options</th>
                <th>Options</th>
                </tr>
            </thead>
            <tbody>
            {users.map(user => (
                <>
                <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.rol}</td>
                <td>    
                    <Link to={`/users/${user.id}`}>Ver Perfil</Link>
                </td>
                <td>
                    <ButtonGroup>       
                        <Button variant="danger" onClick={() => handleBlockUser(user)}>
                        Bloquear Usuario
                        </Button>
                    </ButtonGroup> 
                    </td>
                </tr>
                </>
            ))}
            </tbody>
        </Table>
        <Modal show={showModal} onHide={handleCancelBlockUser}>
            <Modal.Header closeButton>
            <Modal.Title>Confirmación de Bloqueo de Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            ¿Estás seguro que quieres bloquear al usuario {userToBlock && userToBlock.name}?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelBlockUser}>
                Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmBlockUser}>
                Bloquear
            </Button>
            </Modal.Footer>
        </Modal>
      </Container>       
      </div>
    );
  };


  /*
  import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToBlock, setUserToBlock] = useState(null);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch('https://api.example.com/users');
      const data = await response.json();
      setUsers(data);
    }

    getUsers();
  }, []);

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

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      {users.map(user => (
        <Card key={user.id} style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Link to={`/users/${user.id}`}>Ver Perfil</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="danger" onClick={() => handleBlockUser(user)}>
                  Bloquear Usuario
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
      <Modal show={showModal} onHide={handleCancelBlockUser}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de Bloqueo de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que quieres bloquear al usuario {userToBlock && userToBlock.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelBlockUser}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmBlockUser}>
            Bloquear
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
  
  
  */