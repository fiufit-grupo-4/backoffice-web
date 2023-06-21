import React, { useState, useEffect } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import Sidebar from '../utils/SideBar';

import { API_GATEWAY, TOKEN } from '../../utils/constants';
import { BarChart, Bar,LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export default function UserMetrics() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [trainingRequest, setTrainingRequest] = useState({});
    const [newTrainings, setNewTrainings] = useState({});
    const [trainingsPerType, setTrainingsPerType] = useState({});
    const [favoritesByLocation, setFavoritesByLocation] = useState({});
    const [favoritesByUser, setFavoritesByUser] = useState({});
    
    function generateTrainingRequest(data) {
      const transformedData = Object.entries(data).map(([endpoint, amount]) => ({
        endpoint,
        amount,
      }));
      setTrainingRequest(transformedData)
    }

    function generateNewTrainings(data) {
      const transformedData = Object.entries(data).map(([month, amount]) => ({
        month,
        amount,
      }));
      setNewTrainings(transformedData)
    }

    function generateTrainingType(data) {  
      const transformedData = Object.entries(data).map(([type, amount]) => ({
        type,
        amount,
      }))

      setTrainingsPerType(transformedData)
    }

    function generateFavoriteByLocation(data) {
      const transformedData = Object.entries(data).map(([ value,amount]) => ({
        country: value  === '' ?  'Unknown' : value,
        amount 
      }));

      setFavoritesByLocation(transformedData)
    }

    function  generateFavoriteByUser(data) {
      const transformedData = Object.entries(data).map(([user_id, amount]) => ({
        user_id,
        amount,
      }));

      setFavoritesByUser(transformedData)
    }





    async function getTrainingHistory(url,accessToken,setResponse) {
     
      let response =  await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken,    
        }
      })
      if (!response.ok) {
        setError(true)
        if(response.status == 401) setErrorMessage("Unhautorized, not valid access token")
        else setErrorMessage("Failed to connect with server")
      } else {
        let data = await response.json()
        setResponse(data);  
      }
      
    }

    useEffect(() => {
      const url = API_GATEWAY + 'history/'
      const accessToken = localStorage.getItem(TOKEN)
      setLoading(true)
      getTrainingHistory(url + 'trainings_requests_count',accessToken,generateTrainingRequest);
      getTrainingHistory(url + 'trainings_per_type',accessToken,generateTrainingType);
      getTrainingHistory(url + 'new_trainings_per_month',accessToken,generateNewTrainings);
      getTrainingHistory(url + 'favorite_trainings_per_location',accessToken,generateFavoriteByLocation);
      getTrainingHistory(url + 'favorite_trainings_by_user',accessToken,generateFavoriteByUser);
      setLoading(false)  
    }, []) 

    return (
        <div>
          <Sidebar title={"Training Metrics"} />
          {loading 
              ? <div className="d-flex justify-content-center align-items-center" style={{ marginTop: 70 }}>
                  <Spinner animation="border" role="status"  style={{ width: "4rem", height: "4rem" }}>
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
               
              : <div>
                   <Card style = {{width:"90%",margin:"auto",padding:10}}>
                      
                      <Card.Body>
                         
                        <Card.Title style = {{marginBottom:20}} >Training Request Information</Card.Title>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={trainingRequest} >
                          <CartesianGrid stroke="#ccc"  />
                            <XAxis dataKey="endpoint" tick={{ fill: 'white' }}   />
                            <YAxis tick={{ fill: 'white' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#00bc8c"  />
                          </BarChart>
                        </ResponsiveContainer>

                        <Card.Title style = {{marginBottom:20}} > Trainings Per Type</Card.Title>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={trainingsPerType} >
                            <CartesianGrid stroke="#ccc"  />
                              <XAxis dataKey="type" tick={{ fill: 'white' }}   />
                              <YAxis tick={{ fill: 'white' }} />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="amount" fill="#fd7e14"  />
                            </BarChart>
                        </ResponsiveContainer>

                        <Card.Title style = {{marginBottom:20}} >New Trainings Per Month</Card.Title>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={newTrainings}>
                          <CartesianGrid stroke="#ccc"  />
                            <XAxis dataKey="month" tick={{ fill: 'white' }}   />
                            <YAxis tick={{ fill: 'white' }} />
                            <Tooltip />
                            <Legend />
                            <Line dataKey="amount" fill="#00bc8c" />
                          
                          </LineChart>
                        </ResponsiveContainer>


                        <Card.Title style = {{marginBottom:20}} > Favorite Trainings Per Location</Card.Title>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={favoritesByLocation} >
                            <CartesianGrid stroke="#ccc"  />
                              <XAxis dataKey="country" tick={{ fill: 'white' }}   />
                              <YAxis tick={{ fill: 'white' }} />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="amount" fill="#375a7f"  />
                            </BarChart>
                        </ResponsiveContainer>


                        <Card.Title style = {{marginBottom:20}} > Favorite Trainings By User</Card.Title>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={favoritesByUser} >
                            <CartesianGrid stroke="#ccc"  />
                              <XAxis dataKey="user_id" tick={{ fill: 'white' }}   />
                              <YAxis tick={{ fill: 'white' }} />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="amount" fill="#6f42c1"  />
                            </BarChart>
                        </ResponsiveContainer>

                        
                      </Card.Body>
                    </Card>
                  {error && (
                    <div className="d-flex justify-content-center align-items-center" style={{ marginTop: 10 }}>
                      <p style = {{fontSize:18,color : "crimson",padding:5}}> {errorMessage} </p>
                    </div>  
                  )}
                </div>
          }
        </div>
    )
}