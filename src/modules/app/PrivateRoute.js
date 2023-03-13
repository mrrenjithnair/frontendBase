import React from "react";
import { Navigate, Route,Routes } from "react-router-dom";

function PrivateRoute({ children }) {

  const isAuthenticated = children && children.props && children.props.sessionToken ? true : false
  return isAuthenticated ? children : <Navigate to="/socialLogin" />;
}

export default PrivateRoute;