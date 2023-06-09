import React, { useState, useEffect } from 'react';
import { Card, Form,Table, Container,Row, Col, Spinner } from 'react-bootstrap';
import Sidebar from '../utils/SideBar';
import { Link } from 'react-router-dom';
import { API_GATEWAY, TOKEN, ADMIN, ATHLETE, TRAINER } from '../../utils/constants';

export default function TrainingMetrics() {
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


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