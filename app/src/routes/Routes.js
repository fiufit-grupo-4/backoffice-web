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

function Router() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Index/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/users" element={<Users/>} />
          <Route exact path="/users/:id" element={<UserProfile/>} />
          <Route exact path="/trainings" element={<Trainings/>} />
          <Route exact path="/trainings/:id" element={<TrainingProfile/>} />
        </Routes>
      </BrowserRouter>
    );
  }

export default Router;