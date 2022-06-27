import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialButton from '../../components/SocialButton'
import BottomNavBar from '../../components/BottomNavBar'


import { login, onChangeValueLogin } from './actions';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import { faSortNumericUpAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSocialLogin = this.handleSocialLogin.bind(this)
        this.handleSocialLoginFailure = this.handleSocialLogin.bind(this)
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
        this.props.onClickLogin()

        e.preventDefault();
        //if username or password field is empty, return error message
        // if (this.state.username === "" || this.state.password === "") {
        // this.setState({ errorMessage: "Empty username/password field" })
        // } else if (this.state.username == "admin" && this.state.password == "123456") {
        //Signin Success
        // localStorage.setItem("isAuthenticated", "true");
        // window.location.pathname = "/";
        // } else {
        // this.setState({ errorMessage: "Invalid username/password" })

        // }
    }
    handleSocialLogin = (user) => {
        console.log(user);
        localStorage.setItem("userLogin", JSON.stringify(user._profile));

    };

    handleSocialLoginFailure = (err) => {
        console.error(err);
    };

    render() {
        console.log(this.props.count)

        return (


            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>

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
                                    <input type="email" id="form3Example3"
                                        onChange={(e) => {this.props.onChangeValueLogin({ target: { id: 'username', value: e.target.value } })}} 
                                            className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" />
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                </div>


                                <div className="form-outline mb-3">
                                    <input type="password" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Enter password"
                                        onChange={(e) => {this.props.onChangeValueLogin({ target: { id: 'password', value: e.target.value } })}} />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">

                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">Forgot password?</a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <Button variant="primary" className="btn btn-primary btn-lg bgPrimary"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} onClick={this.handleSubmit}>Login</Button>{' '}
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
                                        <Link className="link-danger" to='/Register'>Register</Link>

                                    </p>
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
                <ToastContainer position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />
            </section>
        );
    }
}

Login.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    console.log('state', state)
    return {
        count: state.login.count,
        password: state.login.password,
        username: state.login.username,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClickLogin: (id) => dispatch(login(id)),
        onChangeValueLogin: (evt) => dispatch(onChangeValueLogin(evt)),

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
