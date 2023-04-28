import React from 'react';
import { Container,Card,Carousel,Button} from 'react-bootstrap';
import Sidebar from './SideBar';
import logo from "../assets/img/admin.png";

export default function Home() {
    return (
      <div>
        <Sidebar title={"Home"} />
        <Container className='jumbotron' style = {{marginTop:50,width:"70%"}}>
          <h1>Welcome back !</h1>
          <p>
            You have logged in FiuFit administrator mode
          </p>
          <p>
            <Button>Learn more</Button>
          </p>
        </Container>;
      </div>
    );
  };