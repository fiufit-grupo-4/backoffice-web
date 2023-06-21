import React, { useState, useEffect } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import Sidebar from '../utils/SideBar';

import { API_GATEWAY, TOKEN } from '../../utils/constants';
import { BarChart, Bar,LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export default function UserMetrics() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [usersAuth, setUsersAuth] = useState({});
    const [blockedUsers, setBlockedUsers] = useState({});
    const [usersByLocation, setUsersByLocation] = useState({});

    function generateUsersAuth(data) {
      const transformedData = Object.entries(data).map(([endpoint, amount]) => ({
        endpoint,
        amount,
      }));
      setUsersAuth(transformedData)
    }

    function generateUsersByLoaction(data) {
      const transformedData = Object.entries(data).map(([ value,amount]) => ({
        country: value  === '' ?  'Unknown' : value,
        amount 
      }));
      setUsersByLocation(transformedData)
    }

    function generateBlockedUsers(data) {
      const transformedData = Object.entries(data).map(([date, amount]) => ({
        date,
        amount,
      }));
     
      setBlockedUsers(transformedData)
    }


    async function getUsersHistory(url,accessToken,setResponse) {
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
      getUsersHistory(url + 'users_auth',accessToken,generateUsersAuth);
      getUsersHistory(url + 'blocked_users',accessToken,generateBlockedUsers);
      getUsersHistory(url + 'users_by_location',accessToken,generateUsersByLoaction);
      setLoading(false)  
    }, []) 

    return (
        <div>
          <Sidebar title={"User Metrics"} />
          {loading 
              ? <div className="d-flex justify-content-center align-items-center" style={{ marginTop: 70 }}>
                  <Spinner animation="border" role="status"  style={{ width: "4rem", height: "4rem" }}>
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
               
              : <div>
                   <Card style = {{width:"90%",margin:"auto",padding:10}}>
                      
                      <Card.Body>
                        <Card.Title style = {{marginBottom:20}} >Users Auth Information</Card.Title>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={usersAuth} >
                          <CartesianGrid stroke="#ccc"  />
                            <XAxis dataKey="endpoint" tick={{ fill: 'white' }}   />
                            <YAxis tick={{ fill: 'white' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#00bc8c"  />
                          </BarChart>
                        </ResponsiveContainer>
                        <Card.Title style = {{marginBottom:20}} >Users By Location</Card.Title>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={usersByLocation} >
                            <CartesianGrid stroke="#ccc"  />
                              <XAxis dataKey="country" tick={{ fill: 'white' }}   />
                              <YAxis tick={{ fill: 'white' }} />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="amount" fill="#fd7e14"  />
                            </BarChart>
                        </ResponsiveContainer>
                        <Card.Title style = {{marginBottom:20}} >Blocked Users</Card.Title>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={blockedUsers}>
                          <CartesianGrid stroke="#ccc"  />
                            <XAxis dataKey="date" tick={{ fill: 'white' }}   />
                            <YAxis tick={{ fill: 'white' }} />
                            <Tooltip />
                            <Legend />
                            <Line dataKey="amount" fill="#6f42c1" />
                          
                          </LineChart>
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