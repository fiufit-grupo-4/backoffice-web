import React, {Component} from 'react';
import {Button,ButtonGroup,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from '../assets/img/admin.png';
import "../assets/css/Home.css";

export class Index extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h3>FiuFit</h3>
                    <p> Administration Mode</p>
                    <ButtonGroup>
                        <Button variant="success"  as={Link} to="/login"> Login</Button>
                    </ButtonGroup>                    
                </header>
            </div>
        )
    }
}