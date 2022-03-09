
import React from 'react';

// import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Page1 from "../page1"
import Dashboard from "../Dashboard"
import ClubList from "../ClubList"

import Page2 from "../page2"
import Login from '../Login'
import Register from '../Register'

// Lazy loading of all the modules.
// const Counter = lazy(() => import('../Counter'));
// Root routes
const AppRoutes = () => (
  <BrowserRouter forceRefresh={true} >
    <Routes>
      <Route exact path="/home" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
      <Route exact path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/ClubList" element={<ClubList />} />


    </Routes>
  </BrowserRouter>

)

export default AppRoutes;

