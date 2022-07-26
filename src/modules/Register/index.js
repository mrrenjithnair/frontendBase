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


            <section className="vh-100">
                <HeaderNavBar/>

                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Register with</p>

                                    <SocialButton variant="primary" className="btn btn-default btn-circle mx-1 bgPrimary"
                                        scope="public_profile,email"
                                        provider="facebook"
                                        appId="1817456088401252"
                                        onLoginSuccess={() => this.handleSocialLogin}
                                        onLoginFailure={() => this.handleSocialLoginFailure}
                                    >
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </SocialButton>
                                    <Button variant="primary" className="btn btn-default btn-circle mx-1 bgPrimary">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </Button>
                                    <Button variant="primary" className="btn btn-default btn-circle mx-1 bgPrimary">
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </Button>

                                </div>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">First Name</label>
                                    <input type="firstName" id="form3Example3"
                                     onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'firstName', value: e.target.value } })}} 
                                     className="form-control form-control-lg"
                                     placeholder="Enter a first name" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Last Name</label>
                                    <input type="lastName" id="form3Example3"
                                     onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'lastName', value: e.target.value } })}} 
                                     className="form-control form-control-lg"
                                     placeholder="Enter a last name" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">DOB</label>
                        
                                     <DatePicker className="form-control form-control-lg" 
                                        selected={this.props.dob} 
                                     onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'dob', value: e } })}} 
                                            />  
                                </div>
                                
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Profile Piture</label>
                                    <input type="file" id="form3Example3"
                                         onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'profilePicture', value: e.target.value } })}} 
                                        className="form-control form-control-lg"
                                        placeholder="Enter a last name" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Sports</label>
                                    <select className="form-control form-control-lg"
                                    onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'sportsType', value: e.target.value } })}} >
                                        <option value={1}>Cricket</option>
                                    </select>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Type</label>
                                    <select className="form-control form-control-lg"
                                    onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'playerType', value: e.target.value } })}} >

                                        <option value={'all-rounder'}>all-rounder</option>
                                    </select>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Player Category</label>
                                    <select className="form-control form-control-lg"
                                    onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'category', value: e.target.value } })}} >

                                        <option value={'A'}>A</option>
                                        <option value={'B'}>B</option>
                                        <option value={'A'}>C</option>
                                    </select>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                    <input type="email" id="form3Example3"
                                     onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'emailId', value: e.target.value } })}}
                                    className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Mobile Number</label>
                                    <input type="username" id="form3Example3"
                                     onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'mobile', value: e.target.value } })}}
                                    className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Location</label>
                                    <input type="username" id="form3Example3"
                                     onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'location', value: e.target.value } })}}
                                    className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">User name</label>
                                    <input type="username" id="form3Example3"
                                     onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'username', value: e.target.value } })}}
                                    className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" />
                                </div>


                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                    <input type="password" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Enter password" 
                                        onChange={(e) => {this.props.onChangeValueRegister({ target: { id: 'password', value: e.target.value } })}}
                                        />
                                </div>


                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <Button variant="primary" className="btn btn-primary btn-lg bgPrimary"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} onClick={this.handleSubmit}>Register</Button>{' '}
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account?
                                        <Link className="link-danger" to='/login'>login</Link></p>
                                </div>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                            </form>
                        </div>
                    </div>
                </div>

            </section>
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
