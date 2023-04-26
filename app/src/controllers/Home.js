import React, {Component} from 'react';
import {Button,ButtonGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from '../assets/img/admin.png';
import "../assets/css/Home.css";

export class Home extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h3>FiuFit</h3>
                    <p> Administration Mode</p>
                    <ButtonGroup>
                        <Button variant="primary"  as={Link} to="/login"> Login</Button>
                        <Button variant="success"  as={Link} to="/signup"> Signup</Button>
                    </ButtonGroup>
                </header>
            </div>
        )
    }
}