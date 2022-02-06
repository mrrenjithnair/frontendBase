
import React, { Suspense, lazy } from 'react';

import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";

import Page1 from "../page1"
import Page2 from "../page2"
import Page3 from "../page3"
// Lazy loading of all the modules.
const Counter = lazy(() => import('../Counter'));


// Root routes
const AppRoutes = () => (
  <Router>
  <Routes>
    <Route exact path="/" element={<h1>Home Page</h1>} />
    <Route exact path="page1" element={<Page1 />} />
    <Route exact path="page2" element={<Page2 />} />
    <Route exact path="page3" element={<Page3 />} />
  </Routes>
</Router>)

export default AppRoutes;

