import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Index} from "../controllers/Index";
import Login from "../controllers/Login";
import Register from "../controllers/Register";
import Home from "../controllers/Home";
import Users from "../controllers/Users";
import UserProfile from '../controllers/UserProfile';

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
        </Routes>
      </BrowserRouter>
    );
  }

export default Router;