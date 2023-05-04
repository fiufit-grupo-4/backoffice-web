import React from 'react';
import { Container,Card,Carousel,Button} from 'react-bootstrap';
import Sidebar from './utils/SideBar';
import logo from "../assets/img/admin.png";


export default function Home() {
    return (
      <div>
        <Sidebar title={"Home"} />

        <Card className="bg-dark mb-3 mt-5" style = {{width:"60%",flex:1,margin:"auto"}}>
          <Card.Body>
          <h1>Welcome back !</h1>
          <p>
          You have logged in FiuFit administrator mode. From here, you can manage all aspects of the app, including users, trainings, and services.
          </p>
          <p>
          <Button variant="primary" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">Learn More</Button>
          </p>
          </Card.Body>
        </Card>
      </div>
    );
  };