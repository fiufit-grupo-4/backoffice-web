import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Modal,Table,ButtonGroup, Container } from 'react-bootstrap';
import Sidebar from './SideBar';
import { Link } from 'react-router-dom';

export default function Users() {
    //const [users, setUsers] = useState([]);

    const users = [
        {   id:"1",
            name:"Juan",
            email:"juan@gmail.com",
            rol:"Trainer",
            phone:8003333,
            address:"Calle 1234",
            company: "CGT"
        },
        {
            id:"2",
            name:"Domingo",
            email:"domingo17o@gmail.com",
            rol:"Athlete",
            phone:8003333,
            address:"Calle 1234",
            company: "CGT"
        },
        {
            id:"3",
            name:"Perón",
            email:"peron@gmail.com",
            rol:"Trainer",
            phone:8003333,
            address:"Calle 1234",
            company: "CGT"
        },{
          id:"4",
          name:"Jesus",
          email:"jesus@gmail.com",
          rol:"Admin",
          phone:8003333,
          address:"Calle 1234",
          company: "Jesus SA"
        }

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

    return (
      <div>
        <Sidebar title={"Users"} />
        <Container style = {{justifyContent:"center",margin: "auto",alignItems: 'center',width:"80%",alignSelf:"center",textAlign:"center" }}>

        <Table striped bordered  hover   rowkey="Id">
            <thead>
                <tr style={{backgroundColor:"#fd7e14"}}>
                  <th >Id</th>
                  <th >Name</th>
                  <th >Rol</th>
                  <th >Options</th>
                </tr>
            </thead>
            <tbody>
            {users.map(user => (
                <tr key = {user.id} variant="danger">
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.rol}</td>
                  <td>    
                      <Link 
                        to= { `/users/${user.id}`}
                        state={{user: user}}>
                        See Profile
                      </Link>
                  </td>
                </tr>
            ))}
            </tbody>
        </Table>
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