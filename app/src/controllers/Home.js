import React, {Component} from 'react';
import { Container,Card } from 'react-bootstrap';
import Sidebar from './SideBar';

export default function Home() {
    return (
      <div>
        <Sidebar title={"Home"} />
        <Card style = {{justifyContent:"center",margin: "auto",alignItems: 'center',width:"80%",alignSelf:"center" }}>
    
        <h1>Bienvenido a la página de inicio</h1>
        </Card>
        <Container style = {{justifyContent:"center",display:'flex', alignItems: 'center' }}>
        <h1>Bienvenido a la página de inicio</h1>
        </Container>
        
      </div>
    );
  };