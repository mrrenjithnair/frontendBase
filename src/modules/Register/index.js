import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialButton from '../../components/SocialButton'
import BottomNavBar from '../../components/BottomNavBar'
import HeaderNavBar from '../../components/HeaderNavBar'
import { Route, Link, Routes } from "react-router-dom";

import { onRegister, onChangeValueRegister } from './actions';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import { faSortNumericUpAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
export class Register extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            id: null,
            isEditing: false,
            errorMessage: '',
            username: '',
            password: ""
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onRegister()
    }
    handleSocialRegister = (user) => {
        console.log(user);
        localStorage.setItem("userRegister", JSON.stringify(user._profile));

    };

    handleSocialRegisterFailure = (err) => {
        console.error(err);
        alert('login fail')
    };

    render() {
        console.log(this.props.count)
        return (
            <main id="main">
              <div class="inner-page">
                <div class="">
                  <section class="sign-in ">
                    <div class="container">
                       <a href="index.html" class="logo me-auto display-flex-center d-none "><img src="assets/img/logo1.png" alt="" width="50%"/></a>
                      <div class="signup-content">
                        <div class="signup-form">
                          <h2 class="form-title">Sign up</h2>
                          <form >
                            <div class="form-group">
                              <label htmlFor="Fname"><i class="zmdi zmdi-account fa fa-user"></i></label>
                              <input type="text" name="name" id="Fname" placeholder="First Name"
                              onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'firstName', value: e.target.value } })}}  />
                            </div>
                            <div class="form-group">
                              <label htmlFor="Lname"><i class="fa fa-lock"></i></label>
                              <input type="text" name="name" id="Lname" placeholder="Last Name"
                              onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'lastName', value: e.target.value } })}}  />
                            </div>
                            <div class="form-group">
                              <label htmlFor="datepicker"><i class="zmdi zmdi-account fa fa-calendar" autocomplete="off"></i></label>
                              <input type="date" name="name" utocomplete="off" placeholder="Select Date" 
                                onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'dob', value: e.target.value } })}} />
                            </div>
                            <div class="form-group">
                              <label htmlFor="file" class="sr-only">File</label>
                              <div class="input-group">
                                <input type="text" name="filename" class="form-control" placeholder="No file selected" readonly/>
                                <span class="input-group-btn">
                                  <div class="btn btn-default  custom-file-uploader">
                                    <input type="file" name="file"
                                      onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'profilePicture', value: e.target.value } })}}  />
                                    Select a file
                                  </div>
                                </span>
                              </div>
                            </div>
                            <div class="form-group drops">
                              <label htmlFor="Lname"><i class="zmdi zmdi-account fa fa-chevron-circle-down"></i></label>
                              <select class="form-control form-control-sm">
                                    onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'sportsType', value: e.target.value } })}} >
                                        <option value={1}>Cricket</option>
                                    </select>
                            </div>
        
                            <div class="form-group drops">
                              <label htmlFor="Lname"><i class="zmdi zmdi-account fa fa-chevron-circle-down"></i></label>
                               <select class="form-control form-control-sm">
                                    onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'playerType', value: e.target.value } })}} >
                                       <option value='null'>Player Type</option>
                                        <option value={'all-rounder'}>all-rounder</option>
                                        <option value={'batsman'}>batsman</option>
                                        <option value={'bowler'}>bowler</option>
                                        <option value={'wicket-keeper'}>wicket-keeper</option>
                                    </select>
                            </div>
        
                            <div class="form-group drops">
                              <label htmlFor="Lname"><i class="zmdi zmdi-account fa fa-chevron-circle-down"></i></label>
                       <select class="form-control form-control-sm">
                                    onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'category', value: e.target.value } })}} >
                                        <option value='null'>Player Category</option>
                                        <option value={'A'}>A</option>
                                        <option value={'B'}>B</option>
                                        <option value={'A'}>C</option>
                                    </select>
                            </div>
                            <div class="form-group">
                            <label htmlFor="location"><i class="zmdi fa fa-map-marker"></i></label>
                            <input type="text" name="location" id="location" placeholder="location"
                             onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'location', value: e.target.value } })}} />
                          </div>
                            <div class="form-group">
                              <label htmlFor="mobile"><i class="zmdi fa fa-mobile"></i></label>
                              <input type="text" name="mobile" id="mobile" placeholder="Mobile Number"
                               onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'mobile', value: e.target.value } })}} />
                            </div>
                            <div class="form-group">
                              <label htmlFor="email"><i class="zmdi fa fa-envelope"></i></label>
                              <input type="email" name="email" id="email" placeholder="Your Email" 
                               onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'emailId', value: e.target.value } })}}/>
                            </div>
                            <div class="form-group">
                              <label htmlFor="pass"><i class="zmdi fa fa-lock"></i></label>
                              <input type="password" name="pass" id="pass" placeholder="Password" 
                               onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'password', value: e.target.value } })}}/>
                            </div>
                            <div class="form-group form-button">
                              <input onClick={this.handleSubmit} type="submit" name="signup" id="signup" class="form-submit" value="Register" />
                            </div>
                          </form>
                        </div>
                        <div class="signup-image">
                          <figure class="d-none d-md-block"><img src="assets/img/signup-image.jpg" alt="sing up image"/></figure>
                          <a href="/login" class="signin-image-link">I am already member</a>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
        
        
            </main>
        );
    }
}

Register.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    console.log('state', state)
    return {
        count: state.register.count,
        dob: state.register.dob,
        firstName: state.register.firstName,
        lastName: state.register.lastName,
        username: state.register.username,
        emailId: state.register.emailId,
        password: state.register.password,
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onRegister: (data) => dispatch(onRegister(data)),
        onChangeValueRegister: (data) => dispatch(onChangeValueRegister(data)),
        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
