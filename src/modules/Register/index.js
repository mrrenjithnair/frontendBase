import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialButton from '../../components/SocialButton'
import BottomNavBar from '../../components/BottomNavBar'
import HeaderNavBar from '../../components/HeaderNavBar'
import { Route, Link, Routes } from "react-router-dom";

import { onRegister, onChangeValueRegister } from './actions';
import { setToast, resetToast } from '../Global/actions';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import DatePicker from "react-datepicker";
import { dobValidation, mobileValidation, emailValidation, passwordValidation } from '../../modules/utils/commonUtils';

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
        var emailRegx = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        var mobileRegx = /^[1-9]{1}[0-9]{9}$/;
        var passwordRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/igm;
        let error = false
        this.props.resetToast()
        if (!this.props.firstName) {
            error = true
            this.props.setToast(false, 'Please enter first name.')
        } else if (!this.props.lastName) {
          error = true
          this.props.setToast(false, 'Please enter last name.')
        } else if (!this.props.dob) {
          error = true
          this.props.setToast(false, 'Please enter date of birth.')
        } else if (! dobValidation(this.props.dob)) {
          error = true
          this.props.setToast(false, 'Minimum age is 14.')
        } 
       
        else if (!this.props.profilePicture) {
          error = true
          this.props.setToast(false, 'Please select profile picture')
        }
         else if (!this.props.sportsType) {
          error = true
          this.props.setToast(false, 'Please select sports type.')
        } else if (!this.props.playerType) {
          error = true
          this.props.setToast(false, 'Please select player type.')
        } else if (!this.props.category) {
          error = true
          this.props.setToast(false, 'Please select category.')
        } else if (!this.props.location) {
          error = true
          this.props.setToast(false, 'Please enter location.')
        } else if (!this.props.mobile) {
          error = true
          this.props.setToast(false, 'Please enter mobile.')
        } else if (!mobileRegx.test(this.props.mobile)) {
          error = true
          this.props.setToast(false, 'Please enter valid mobile.')
        }  else if (! mobileValidation(this.props.mobile)) {
          error = true
          this.props.setToast(false, 'Mobile Number is not valid.')
        } else if (!this.props.emailId) {
          error = true
          this.props.setToast(false, 'Please enter emailId.')
        }  else if (!emailValidation(this.props.email)) {
          error = true
          this.props.setToast(false, 'EmailId is not valid.')
        } else if (!this.props.password) {
          error = true
          this.props.setToast(false, 'Please enter password.')
        } else if (!passwordRegx.test(this.props.password)) {
          error = true
          this.props.setToast(false, "Password should have minimum eight characters, at least one uppercase letter, one special character and one number.")
        } else if (this.props.password != this.props.confirmPassword ) {
          error = true
          this.props.setToast(false, 'Password and confirm password does not match.')
        }
        
        if(!error)
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
              <div className="inner-page">
                <div className="">
                  <section className="sign-in home">
                    <div className="container">
                       <a href="index.html" className="logo me-auto display-flex-center d-none "><img src="assets/img/logo1.png" alt="" width="50%"/></a>
                      <div className="signup-content">
                        <div className="signup-form">
                          <h2 className="form-title">Sign up</h2>
                          <form >
                            <div className="form-group">
                              <label htmlFor="Fname"><i className="zmdi zmdi-account fa fa-user"></i></label>
                              <input type="text" name="name" id="Fname" placeholder="Please enter first Name" className={this.props.firstName && (this.props.firstName.length> 3) ? 'input':'inputError'}
                              required={true}
                              onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'firstName', value: e.target.value } })}}  />
                            </div>
                            {!this.props.firstName &&<div className='errorMsgRegister'>* First name is required</div>}
                            {this.props.firstName && !(this.props.firstName.length> 3) && <div className='errorMsgRegister'>* Minimum 3 letter is required.</div>}

                            <div className="form-group">
                              <label htmlFor="Lname"><i className="fa fa-lock"></i></label>
                              <input type="text" name="name" id="Lname" placeholder="Please enter last Name" className={this.props.lastName && (this.props.lastName.length> 3) ? 'input':'inputError'}
                              onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'lastName', value: e.target.value } })}}  />
                            </div>
                            {!this.props.lastName &&<div className='errorMsgRegister'>* Last name is required</div>}
                            {this.props.lastName && !(this.props.lastName.length> 3) && <div className='errorMsgRegister'>* Minimum 3 letter is required.</div>}

                            <div className="form-group">
                              <label htmlFor="datepicker"><i className="zmdi zmdi-account fa fa-calendar" ></i></label>
                              <input type="date" name="name" utocomplete="off" placeholder="Select Date" className={this.props.dob ? 'input':'inputError'}
                                onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'dob', value: e.target.value } })}} />
                            </div>
                            {!this.props.dob &&<div className='errorMsgRegister'>* Date of birth is required</div>}
                            {this.props.dob && !(dobValidation(this.props.dob)) && <div className='errorMsgRegister'>* Minimum age is 14.</div>}

                            {/* <div className="form-group">
                              <label htmlFor="file" className="sr-only">Profile Pic</label>
                              <div className="input-group">
                                <input type="text" name="filename" className="form-control" placeholder="No file selected" readonly/>
                                <span className="input-group-btn">
                                  <div className="btn btn-default  custom-file-uploader">
                                    <input type="file" name="file"
                                      onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'profilePicture', value: e.target.value } })}}  />
                                    Select a file
                                  </div>
                                </span>
                              </div>
                            </div> */}
                            <div className="form-group drops">
                              <label htmlFor="Lname"><i className="zmdi zmdi-account fa fa-chevron-circle-down"></i></label>
                              <select className="form-control form-control-sm">
                                    onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'sportsType', value: e.target.value } })}}
                                        <option value={1}>Cricket</option>
                                    </select>
                            </div>
        
                            <div className="form-group drops">
                              <label htmlFor="Lname"><i className="zmdi zmdi-account fa fa-chevron-circle-down"></i></label>
                               <select className="form-control form-control-sm">
                                    onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'playerType', value: e.target.value } })}}
                                        <option value={'all-rounder'}>all-rounder</option>
                                        <option value={'batsman'}>batsman</option>
                                        <option value={'bowler'}>bowler</option>
                                        <option value={'wicket-keeper'}>wicket-keeper</option>
                                    </select>
                            </div>
        
                            <div className="form-group drops">
                              <label htmlFor="Lname"><i className="zmdi zmdi-account fa fa-chevron-circle-down"></i></label>
                       <select className="form-control form-control-sm">
                                    onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'category', value: e.target.value } })}}
                                        <option value={'A'}>A</option>
                                        <option value={'B'}>B</option>
                                        <option value={'A'}>C</option>
                                    </select>
                            </div>
                            <div className="form-group">
                            <label htmlFor="location"><i className="zmdi fa fa-map-marker"></i></label>
                            <input type="text" name="location" id="location" placeholder="Please enter location" className={this.props.location && (this.props.location.length> 3) ? 'input':'inputError'}
                             onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'location', value: e.target.value } })}} />
                          </div>
                          {!this.props.location &&<div className='errorMsgRegister'>* Location is required</div>}
                          {this.props.location && !(this.props.location.length> 3) && <div className='errorMsgRegister'>* Minimum 3 letter is required.</div>}

                          <div className="form-group">
                            <label htmlFor="bio"></label>
                            <textarea type="text" name="bio" id="bio" placeholder="Please enter about you" className={this.props.bio && (this.props.bio.length> 3) ? 'input':'inputError'}
                             onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'bio', value: e.target.value } })}} />
                          </div>
                          {!this.props.bio &&<div className='errorMsgRegister'>* About You is required</div>}
                          {this.props.bio && !(this.props.bio.length> 3) && <div className='errorMsgRegister'>* Minimum 3 letter is required.</div>}

                            <div className="form-group">
                              <label htmlFor="mobile"><i className="zmdi fa fa-mobile"></i></label>
                              <input type="text" maxLength="10" name="mobile" id="mobile" placeholder="Please enter mobile number"className={this.props.mobile && (mobileValidation(this.props.mobile)) ? 'input':'inputError'}
                               onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'mobile', value: e.target.value } })}} />
                            </div>
                            {!this.props.mobile &&<div className='errorMsgRegister'>* Mobile number is required</div>}
                            {this.props.mobile && !(mobileValidation(this.props.mobile)) && <div className='errorMsgRegister'>* Mobile number is not valid</div>}

                            <div className="form-group">
                              <label htmlFor="email"><i className="zmdi fa fa-envelope"></i></label>
                              <input type="email" name="email" id="email" placeholder="Please enter your emailid" className={this.props.emailId && (emailValidation(this.props.emailId)) ? 'input':'inputError'}
                               onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'emailId', value: e.target.value } })}}/>
                            </div>
                            {!this.props.emailId &&<div className='errorMsgRegister'>* EmailId is required</div>}
                            {this.props.emailId && !(emailValidation(this.props.emailId)) && <div className='errorMsgRegister'>* EmailId is not valid</div>}

                            <div className="form-group">
                              <label htmlFor="pass"><i className="zmdi fa fa-lock"></i></label>
                              <input type="password" name="pass" id="pass" placeholder="Please enter password" className={this.props.password && (this.props.password.length> 3) ? 'input':'inputError'}
                               onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'password', value: e.target.value } })}}/>
                            </div>
                            {!this.props.password &&<div className='errorMsgRegister'>* Password is required</div>}
                            {this.props.password && !(passwordValidation(this.props.password)) && <div className='errorMsgRegister'>* Password should have minimum eight characters, at least one uppercase letter, one special character and one number.</div>}

                            <div className="form-group">
                              <label htmlFor="confirmPassword"><i className="zmdi fa fa-lock"></i></label>
                              <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Please enter confirm password" className={this.props.confirmPassword && (this.props.confirmPassword.length> 3) ? 'input':'inputError'}
                               onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'confirmPassword', value: e.target.value } })}}/>
                            </div>
                            {this.props.password  && !(this.props.password == this.props.confirmPassword) &&<div className='errorMsgRegister'>* Password and confirm password does not match'</div>}
                            <div className="form-group form-button">
                              <input onClick={this.handleSubmit} type="submit" name="signup" id="signup" className="form-submit" value="Register" />
                            </div>
                          </form>
                        </div>
                        <div className="signup-image">
                          <figure className="d-none d-md-block"><img src="assets/img/signup-image.jpg" alt="sing up image"/></figure>
                          <a href="/login" className="signin-image-link">I am already member</a>
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
        confirmPassword: state.register.confirmPassword,
        sportsType: state.register.sportsType,
        playerType: state.register.playerType,
        category: state.register.category,
        location: state.register.location,
        mobile: state.register.mobile,
        bio: state.register.bio,
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onRegister: (data) => dispatch(onRegister(data)),
        onChangeValueRegister: (data) => dispatch(onChangeValueRegister(data)),        
        setToast: (success, message) => dispatch(setToast(success, message)),
        resetToast: (evt) => dispatch(resetToast(evt)),
        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
