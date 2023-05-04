import React, { useState, useEffect } from 'react';
import { Card, Form,Table, Container,Row, Col } from 'react-bootstrap';
import Sidebar from '../utils/SideBar';
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
    



      <Card style= {{width:"90%",margin:"auto"}}>
      <Card.Body>
        <Row>
          <Col md={3}>
            <h3>Filters:</h3>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={nameFilter} onChange={handleNameFilterChange} />
              </Form.Group>
              <Form.Group controlId="rol">
                <Form.Label>Rol:</Form.Label>
                <Form.Select defaultValue="" onChange={handleRoleFilterChange}>
                  <option value="">All</option>
                  <option value="admin">Admin</option>
                  <option value="athlete">Athlete</option>
                  <option value="trainer">Trainer</option> 
                </Form.Select>
              </Form.Group>
            </Form>
            
          </Col>
          <Col md={9}>
            <h3>Users:</h3>
            <br></br>
            <Table striped bordered  hover   rowkey="Id">
            <thead>
                <tr style={{backgroundColor:"#375a7f"}}>
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
          </Col>
        </Row>
      </Card.Body>
    </Card>      
      </div>
    );
  };


  