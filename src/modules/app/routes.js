
import React from 'react';

// import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Page1 from "../page1"
import Dashboard from "../Dashboard"
import ClubList from "../ClubList"
import ClubDetails from "../ClubDetails"
import history from "../utils/history";

import Page2 from "../page2"
import Login from '../Login'
import Register from '../Register'

const NavigateSetter = () => {
  history.navigate = useNavigate();
  return null;
};

// Lazy loading of all the modules.
// const Counter = lazy(() => import('../Counter'));
// Root routes
const AppRoutes = () => (
  <BrowserRouter forceRefresh={true} >
     <NavigateSetter/>
    <Routes>
      <Route path="/home" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
      <Route exact path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/ClubList" element={<ClubList />} />
      <Route exact path="/ClubDetails" element={<ClubDetails />} />
      
    </Routes>
  </BrowserRouter>

)

export default AppRoutes;

