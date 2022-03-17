import React from "react";
import { Navigate, Route,Routes } from "react-router-dom";

function PrivateRoute({ children }) {
  console.log("children", children);

  const isAuthenticated = children && children.props && children.props.sessionToken ? true : false
  console.log("this", isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;