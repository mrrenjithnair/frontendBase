
import React from 'react';

// import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';

import PrivateRoute from "./PrivateRoute";
import APP from "./index"

import Dashboard from "../Dashboard"
import ClubList from "../ClubList"
import ClubDetails from "../ClubDetails"
import UserList from "../UserList"
import TournamentList from "../TournamentList"
import Request from "../Request"
import TournamentDetails from "../TournamentDetails"
import Profile from "../Profile"

import Auction from "../Auction"


import history from "../utils/history";

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
    // this.props.setDataFromLocal()

    return (<div>
      <APP />
      <BrowserRouter forceRefresh={true} >
        <NavigateSetter />
        <Routes>
          <Route path="/home" element={<PrivateRoute ><Dashboard sessionToken={this.props.sessionToken} /></PrivateRoute>} />
          <Route exact path="/" element={<PrivateRoute ><Dashboard sessionToken={this.props.sessionToken} /></PrivateRoute>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/clubList" element={<PrivateRoute ><ClubList sessionToken={this.props.sessionToken} /></PrivateRoute>} />
          <Route exact path="/profile" element={<PrivateRoute ><Profile sessionToken={this.props.sessionToken} /></PrivateRoute>} />
          <Route exact path="/clubDetails" element={<PrivateRoute ><ClubDetails sessionToken={this.props.sessionToken} /></PrivateRoute>} />
          <Route exact path="/userList" element={<PrivateRoute ><UserList sessionToken={this.props.sessionToken} /></PrivateRoute>} />
          <Route exact path="/tournamentList" element={<PrivateRoute ><TournamentList sessionToken={this.props.sessionToken} /></PrivateRoute>} />
          <Route exact path="/request" element={<PrivateRoute ><Request sessionToken={this.props.sessionToken} /></PrivateRoute>} />
          <Route exact path="/tournamentDetail" element={<PrivateRoute ><TournamentDetails sessionToken={this.props.sessionToken} /></PrivateRoute>} />
          <Route exact path="/auction" element={<PrivateRoute ><Auction sessionToken={this.props.sessionToken} /></PrivateRoute>} />
          
        </Routes>
      </BrowserRouter>
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    sessionToken: state.global.sessionToken
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDataFromLocal: (evt) => dispatch(setDataFromLocal(evt)),
  };
}
// export default AppRoutes;
export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);

