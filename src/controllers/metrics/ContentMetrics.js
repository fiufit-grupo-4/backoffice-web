import React, { useState, useEffect } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import Sidebar from '../utils/SideBar';

import { API_GATEWAY, TOKEN } from '../../utils/constants';
import { BarChart, Bar,LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export default function UserMetrics() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [contents, setContents] = useState([]);


    function generateContent(data) {
      const transformedData = Object.entries(data).map(([user_id, amount]) => ({
        user_id,
        amount,
      }));
      setContents(transformedData)
    }




    async function getUsersContent() {
      const url = API_GATEWAY + 'history/trainings_uploads_by_user'
      const accessToken = localStorage.getItem(TOKEN)
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
        console.log(data)
        generateContent(data);  
      }
      
    }

    useEffect(() => {
      async function getHistory(){
        setLoading(true)
        await getUsersContent();
     
        setLoading(false)  
      }
      getHistory()
    }, []) 

    return (
        <div>
          <Sidebar title={"Content Metrics"} />
          {loading 
              ? <div className="d-flex justify-content-center align-items-center" style={{ marginTop: 70 }}>
                  <Spinner animation="border" role="status"  style={{ width: "4rem", height: "4rem" }}>
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
               
              : <div>
                   <Card style = {{width:"90%",margin:"auto",padding:10}}>
                      
                      <Card.Body>
                        <Card.Title style = {{marginBottom:20}} >Content Uploaded By Users</Card.Title>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={contents} >
                          <CartesianGrid stroke="#ccc"  />
                            <XAxis dataKey="user_id" tick={{ fill: 'white' }}   />
                            <YAxis tick={{ fill: 'white' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#00bc8c"  />
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