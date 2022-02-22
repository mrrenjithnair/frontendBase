import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialButton from '../../components/SocialButton'
import BottomNavBar from '../../components/BottomNavBar'
import { Route, Link, Routes } from "react-router-dom";

import { handleDecrementClick, handleIncrementClick } from './actions';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import { faSortNumericUpAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

export class Register extends React.PureComponent {
    constructor(props) {
        super(props);
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
        //if username or password field is empty, return error message
        // if (this.state.username === "" || this.state.password === "") {
        // this.setState({ errorMessage: "Empty username/password field" })
        // } else if (this.state.username == "admin" && this.state.password == "123456") {
        //Signin Success
        localStorage.setItem("isAuthenticated", "true");
        window.location.pathname = "/";
        // } else {
        // this.setState({ errorMessage: "Invalid username/password" })

        // }
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
                                    <input type="email" id="form3Example3"
                                        onChange={(e) => this.setState({ firstName: e })} className="form-control form-control-lg"
                                        placeholder="Enter a first name" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Last Name</label>
                                    <input type="email" id="form3Example3"
                                        onChange={(e) => this.setState({ lastName: e })} className="form-control form-control-lg"
                                        placeholder="Enter a last name" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Profile Piture</label>
                                    <input type="file" id="form3Example3"
                                        onChange={(e) => this.setState({ lastName: e })} className="form-control form-control-lg"
                                        placeholder="Enter a last name" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Sports</label>
                                    <select className="form-control form-control-lg">
                                        <option>Cricket</option>
                                        <option>FootBall</option>
                                        <option>Chess</option>
                                    </select>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Categoury</label>
                                    <select className="form-control form-control-lg">
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                    </select>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                    <input type="email" id="form3Example3"
                                        onChange={(e) => this.setState({ username: e })} className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" />
                                </div>


                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                    <input type="password" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Enter password" onChange={(e) => this.setState({ username: e })} />
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
                <BottomNavBar />

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
        count: state.register.count
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleIncrementClick: (id) => dispatch(handleIncrementClick(id)),
        handleDecrementClick: (id) => dispatch(handleDecrementClick(id)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
