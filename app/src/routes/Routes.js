import React, {Component} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Index} from "../controllers/Index";
import {Profile} from "../controllers/Profile";
import Login from "../controllers/Login";
import Register from "../controllers/Register";
import Home from "../controllers/Home";

function Router() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Index/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    );
  }

export default Router;