import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Index} from "../controllers/Index";
import Login from "../controllers/register/Login";
import Register from "../controllers/register/Register";
import Home from "../controllers/Home";
import Users from "../controllers/user/Users";
import UserProfile from '../controllers/user/UserProfile';
import Trainings from '../controllers/training/Trainings';
import TrainingProfile from '../controllers/training/TrainingProfile';
import Certify from '../controllers/certify/Certify';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function Router() {
    return (
        <Routes>
          <Route exact path="/" element={<PublicRoute Component={<Index/>}/>} />
          <Route path="/login" element={<PublicRoute Component={<Login/>}/>} />
          <Route path='/register' element={<PrivateRoute Component={<Register/>}/>}/>
          <Route path="/home" element={<PrivateRoute Component={<Home/>}/>} />
         
          <Route path="/users" element={<PrivateRoute Component={<Users/>}/>} />
          <Route path="/users/:id" element={<PrivateRoute Component={<UserProfile/>}/>} />
          <Route path="/trainings" element={<PrivateRoute Component={<Trainings/>}/>} />
          <Route path="/trainings/:id" element={<PrivateRoute Component={<TrainingProfile/>}/>} />
          <Route path="/certify" element={<PrivateRoute Component={< Certify/>}/>} />
        </Routes>
    );
  }

export default Router;