import React, {Component} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Index} from "../controllers/Index";
import {Profile} from "../controllers/Profile";
import Login from "../controllers/Login";
import Signup from "../controllers/Signup";

function Router() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Index/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    );
  }

export default Router;