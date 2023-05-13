import React, { useState, useEffect } from 'react';
import { Card, Form,Table, Container,Row, Col, Spinner } from 'react-bootstrap';
import Sidebar from '../utils/SideBar';
import { Link } from 'react-router-dom';
import { API_GATEWAY, TOKEN } from '../../utils/constants';

export default function Trainings() {
    const [trainings, setTrainings] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [userNameFilter, setUserNameFilter] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    /*
    const trainings = [
        {   id:"1",
            trainer_name:"Juan",
            trainer_id:"1",
            difficulty:"Easy",
            type:"Dolor",
            description:"Lorem ipsum dolor sit amet",
            title: "Fuerza de brazos"
        },
        {
            id:"2",
            trainer_name:"Pepito Boxeador",
            trainer_id:"6",
            difficulty:"Medium",
            type:"Cardio",
            description:"Lorem ipsum cardio sit amet",
            title: "Sentadillas"
        },
        {
            id:"3",
            trainer_name:"Juan",
            trainer_id:"1",
            difficulty:"Easy",
            type:"Masa",
            description:"Lorem ipsum masa sit amet",
            title: "Abdominales"
        },{
            id:"4",
            trainer_name:"Pepito boxeador",
            trainer_id:"1",
            difficulty:"Hard",
            type:"Dolor",
            description:"Lorem ipsum dolor sit amet",
            title: "Fuerza de piernas"
        },{
          id:"5",
          trainer_name:"Roberto conduccion",
          trainer_id:"13",
          difficulty:"Hard",
          type:"Fortalecimiento",
          description:"Lorem ipsum malianteo sit amet",
          title: "Espinales"
      }

    ]*/

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

    function handleUndefined(value){
      return value ? value : "undefined"

    }


    // Esta función devuelve los datos de los usuarios filtrados según los valores de los filtros
    function getFilteredTrainings() {
      return trainings.filter((training) => {
        const nameMatches = training.title.toLowerCase().includes(nameFilter.toLowerCase());
        const difficultyMatches = training.difficulty.toString().includes(difficultyFilter.toLowerCase());     
        const trainerNameMatches = handleUndefined(training.trainer_name).toLowerCase().includes(userNameFilter.toLowerCase())  ;
        const typeMatches = training.type.toLowerCase().includes(typeFilter.toLowerCase());   
        return nameMatches && difficultyMatches  && typeMatches && trainerNameMatches;
      });
    }

    
    useEffect(() => {
      const url = API_GATEWAY + 'trainings/'
      const accessToken = localStorage.getItem(TOKEN)
      async function getTrainings() {
        setLoading(true)
        fetch(url, {
          method: 'GET',
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
              setTrainings(data);
            })
            
          }
        })
        .catch(error => {
          setError(true)
          setErrorMessage(error)
        })
      }
      getTrainings();
    }, []); 

    return (
      <div>
        <Sidebar title={"Trainings"} />

        {loading 
          ? <div className="d-flex justify-content-center align-items-center" style={{ marginTop: 70 }}>
              <Spinner animation="border" role="status"  style={{ width: "4rem", height: "4rem" }}>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
            
          : <>
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
                        <td>{training.title}</td>
                        <td>{training.type}</td>
                        <td>{training.difficulty}</td>
                        <td>{training.trainer_name ? training.trainer_name : "Undefined" }</td>
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
          {error && (
            <div className="d-flex justify-content-center align-items-center" style={{ marginTop: 10 }}>
              <p style = {{fontSize:18,color : "crimson",padding:5}}> {errorMessage} </p>
            </div>  
          )}
          </>

        }
      </div>
    );
  };