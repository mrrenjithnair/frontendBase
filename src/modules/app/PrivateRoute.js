import React from "react";
import { Navigate, Route,Routes } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;