import React, { useState, useEffect } from 'react';
import { Card, Form,Table, Container,Row, Col } from 'react-bootstrap';
import Sidebar from './SideBar';
import { Link } from 'react-router-dom';

export default function Users() {
    //const [users, setUsers] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');

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

    // Esta función se llamará cada vez que se cambie el valor del filtro de nombre
    function handleNameFilterChange(event) {
      setNameFilter(event.target.value);
    }

    // Esta función se llamará cada vez que se cambie el valor del filtro de rol
    function handleRoleFilterChange(event) {
      setRoleFilter(event.target.value);
    }

    // Esta función devuelve los datos de los usuarios filtrados según los valores de los filtros
    function getFilteredUsers() {
      return users.filter((user) => {
        const nameMatches = user.name.toLowerCase().includes(nameFilter.toLowerCase());
        const roleMatches = user.rol.toLowerCase().includes(roleFilter.toLowerCase());
        return nameMatches && roleMatches;
      });
    }

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

        <div className="card mt-3" style = {{justifyContent:"center",margin: "auto",width:"60%",alignSelf:"center" }}>
          <div style = {{justifyContent:"center",margin: "auto",width:"80%",textAlign:"center" }} >
            <br></br>
            <h5> Users Filter  </h5>
          </div>
          <div className="card-body">
            <Form>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" value={nameFilter} onChange={handleNameFilterChange} />
              </Form.Group>
              <Form.Group controlId="rol">
                <Form.Label>Rol:</Form.Label>
                <Form.Select defaultValue="" onChange={handleRoleFilterChange}>
                  <option value="admin">Admin</option>
                  <option value="athlete">Atleta</option>
                  <option value="trainer">Trainer</option>
                  <option value="">No filter</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </div>
        </div>
        <br></br>
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
            {getFilteredUsers().map(user => (
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




      <Card>
      <Card.Body>
        <Row>
          <Col md={3}>
            <h3>Filtros:</h3>
            <Form.Group>
              <Form.Label>Rol:</Form.Label>
              <Form.Control
                as="select"
                value={roleFilter}
                onChange={handleRoleFilterChange}
              >
                <option value="">Todos</option>
                <option value="Admin">Admin</option>
                <option value="Atleta">Atleta</option>
                <option value="Trainer">Trainer</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={9}>
            <h3>Usuarios:</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredUsers().map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.rol}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card.Body>
    </Card>      
      </div>
    );
  };


  /*
import React, { useState } from "react";
import { Card, Col, Row, Form, Table } from "react-bootstrap";

const UserList = ({ users }) => {
  const [filterRole, setFilterRole] = useState("");

  // Filtrar usuarios por rol
  const filteredUsers = filterRole
    ? users.filter((user) => user.role === filterRole)
    : users;

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={3}>
            <h3>Filtros:</h3>
            <Form.Group>
              <Form.Label>Rol:</Form.Label>
              <Form.Control
                as="select"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="Admin">Admin</option>
                <option value="Atleta">Atleta</option>
                <option value="Trainer">Trainer</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={9}>
            <h3>Usuarios:</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserList;
  
  */