
import React from 'react';

// import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';

import PrivateRoute from "./PrivateRoute";
import Page1 from "../page1"
import APP from "./index"

import Dashboard from "../Dashboard"
import ClubList from "../ClubList"
import ClubDetails from "../ClubDetails"
import UserList from "../UserList"

import history from "../utils/history";

import Page2 from "../page2"
import Login from '../Login'
import Register from '../Register'
import { setDataFromLocal } from '../Global/actions';

const NavigateSetter = () => {
  history.navigate = useNavigate();
  return null;
};

// Lazy loading of all the modules.
// const Counter = lazy(() => import('../Counter'));
// Root routes

export class AppRoutes extends React.PureComponent {

  render() {
    this.props.setDataFromLocal()

    return (<div>
      <APP />
      <BrowserRouter forceRefresh={true} >
        <NavigateSetter />
        <Routes>
          <Route path="/home" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route exact path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/clubList" element={<PrivateRoute><ClubList /></PrivateRoute>} />
          <Route exact path="/clubDetails" element={<PrivateRoute><ClubDetails /></PrivateRoute>} />
          <Route exact path="/userList" element={<PrivateRoute><UserList /></PrivateRoute>} />
          
        </Routes>
      </BrowserRouter>
    </div>)
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {


  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDataFromLocal: (evt) => dispatch(setDataFromLocal(evt)),
  };
}
// export default AppRoutes;
export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);

