import React, { useState, useEffect } from 'react';
import { Card, Form,Table, Container,Row, Col } from 'react-bootstrap';
import Sidebar from './SideBar';
import { Link } from 'react-router-dom';

export default function Trainings() {
    //const [users, setUsers] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [userNameFilter, setUserNameFilter] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    const trainings = [
        {   id:"1",
            trainer_name:"Juan",
            trainer_id:"1",
            difficulty:"3",
            type:"Dolor",
            description:"Lorem ipsum dolor sit amet",
            title: "Fuerza de brazos"
        },
        {
            id:"2",
            trainer_name:"Pepito Boxeador",
            trainer_id:"6",
            difficulty:"4",
            type:"Cardio",
            description:"Lorem ipsum cardio sit amet",
            title: "Sentadillas"
        },
        {
            id:"3",
            trainer_name:"Juan",
            trainer_id:"1",
            difficulty:"2",
            type:"Masa",
            description:"Lorem ipsum masa sit amet",
            title: "Abdominales"
        },{
            id:"4",
            trainer_name:"Pepito boxeador",
            trainer_id:"1",
            difficulty:"5",
            type:"Dolor",
            description:"Lorem ipsum dolor sit amet",
            title: "Fuerza de piernas"
        }

    ]

    function handleNameFilterChange(event) {
      setNameFilter(event.target.value);
    }

    function handleTypeFilterChange(event) {
        setTypeFilter(event.target.value);
      }

    function handleUserNameFilterChange(event) {
        setUserNameFilter(event.target.value);
      }

    function handleDifficultyFilterChange(event) {
        setDifficultyFilter(event.target.value);
    }

    // Esta función devuelve los datos de los usuarios filtrados según los valores de los filtros
    function getFilteredTrainings() {
      return trainings.filter((training) => {
        const nameMatches = training.title.toLowerCase().includes(nameFilter.toLowerCase());
        const difficultyMatches = training.difficulty.toLowerCase().includes(difficultyFilter.toLowerCase());
        const trainerNameMatches = training.trainer_name.toLowerCase().includes(userNameFilter.toLowerCase());
        const typeMatches = training.type.toLowerCase().includes(typeFilter.toLowerCase());
        
        return nameMatches && difficultyMatches && trainerNameMatches && typeMatches;
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
        <Sidebar title={"Trainings"} />

      <Card style= {{width:"90%",margin:"auto"}}>
      <Card.Body>
        <Row>
          <Col md={3}>
            <h3>Filters:</h3>
            <Form>
              <Form.Group>
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text" value={nameFilter} onChange={handleNameFilterChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Trainer:</Form.Label>
                <Form.Control type="text" value={userNameFilter} onChange={handleUserNameFilterChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Type:</Form.Label>
                <Form.Control type="text" value={typeFilter} onChange={handleTypeFilterChange} />
              </Form.Group>
              <Form.Group controlId="rol">
                <Form.Label>Difficulty:</Form.Label>
                <Form.Select defaultValue="" onChange={handleDifficultyFilterChange}>
                  <option value="">All</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option> 
                  <option value="4">4</option> 
                  <option value="5">5</option> 
                </Form.Select>
              </Form.Group>
              
            </Form>
            
          </Col>
          <Col md={9}>
            <h3>Trainings:</h3>
            <br></br>
            <Table striped bordered  hover   rowkey="Id">
            <thead>
                <tr style={{backgroundColor:"#fd7e14"}}>
                  <th >Id</th>
                  <th >Title</th>
                  <th >Type</th>
                  <th >Difficulty</th>
                  <th >Trainer</th>
                  <th >Options</th>
                </tr>
            </thead>
            <tbody>
            {getFilteredTrainings().map(training => (
                <tr key = {training.id} variant="danger">
                  <td>{training.id}</td>
                  <td>{training.title}</td>
                  <td>{training.type}</td>
                  <td>{training.difficulty}</td>
                  <td>{training.trainer_name}</td>
                  <td>    
                      <Link 
                        to= { `/trainings/${training.id}`}
                        state={{training: training}}>
                        See More
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