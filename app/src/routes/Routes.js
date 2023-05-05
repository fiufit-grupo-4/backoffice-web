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
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function Router() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PublicRoute Component={<Index/>}/>} />
          <Route exact path="/login" element={<PublicRoute Component={<Login/>}/>} />
           <Route exact path='/register' element={<PrivateRoute Component={<Register/>}/>}/>
          <Route exact path="/home" element={<PrivateRoute Component={<Home/>}/>} />
         
          <Route exact path="/users" element={<PrivateRoute Component={<Users/>}/>} />
          <Route exact path="/users/:id" element={<PrivateRoute Component={<UserProfile/>}/>} />
          <Route exact path="/trainings" element={<PrivateRoute Component={<Trainings/>}/>} />
          <Route exact path="/trainings/:id" element={<PrivateRoute Component={<TrainingProfile/>}/>} />
         
        </Routes>
      </BrowserRouter>
    );
  }

export default Router;