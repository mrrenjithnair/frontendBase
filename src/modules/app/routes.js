
import React, { Suspense, lazy } from 'react';

// import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Page1 from "../page1"
import Page2 from "../page2"
import Page3 from "../page3"
import Login from '../Login'
import Register from '../Register'

// Lazy loading of all the modules.
const Counter = lazy(() => import('../Counter'));


// Root routes
const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/Page1" element={<PrivateRoute><Page1 /></PrivateRoute>}/>
      <Route path="/" element={<Page2 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  </BrowserRouter>

)

export default AppRoutes;

