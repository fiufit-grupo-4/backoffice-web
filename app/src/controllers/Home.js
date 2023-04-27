import React, {Component} from 'react';
import { Container } from 'react-bootstrap';
import Sidebar from './SideBar';

export default function Home() {
    return (
      <div>
        <Sidebar title={"Home"} />
        <Container style = {{justifyContent:"center",display:'flex', alignItems: 'center' }}>
        <h1>Bienvenido a la página de inicio</h1>
        </Container>
        
      </div>
    );
  };