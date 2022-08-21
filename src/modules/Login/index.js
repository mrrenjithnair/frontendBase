import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialButton from '../../components/SocialButton'
import BottomNavBar from '../../components/BottomNavBar'

import history from "../utils/history";

import { login, onChangeValueLogin } from './actions';
import { setToast, resetToast } from '../Global/actions';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import { faSortNumericUpAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { passwordValidation } from '../../modules/utils/commonUtils';

import { ToastContainer, toast } from 'react-toastify';
import SportzMitra from '../../images/SportzMitra.png'
import 'react-toastify/dist/ReactToastify.css';
import {
    LoginSocialGoogle,
    LoginSocialAmazon,
    LoginSocialFacebook,
    LoginSocialGithub,
    LoginSocialInstagram,
    LoginSocialLinkedin,
    LoginSocialMicrosoft,
    LoginSocialPinterest,
    LoginSocialTwitter,
    IResolveParams,
} from 'reactjs-social-login'

const REDIRECT_URI = 'http://localhost:3000/account/login'

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
        window.scrollTo(0, 0)
    }
    validate(data) {
        let valid = false
        let errMsg = false
        let regex
        if (data && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                console.log(data[i])
                if (data[i].type == 'text') {
                    regex = new RegExp(/[0-9a-zA-Z]{3,}/);
                    valid = regex.test(data[i].value)
                    if (!valid) {
                        errMsg = "  " + data[i].label + " need to be atleast 3 characters"
                        break;
                    }

                }
            }
        }
        return errMsg
    }
    handleSubmit(e) {
        this.props.onChangeValueLogin({ target: { id: 'socialLogin', value: false } })
        let error = false
        let data = [
            {
                key: 'username',
                type: 'text',
                label: 'username',
                value: this.props.username,
            },
            {
                key: 'password',
                type: 'text',
                value: this.props.password,
                label: 'password',
            }
        ]
        error = this.validate(data)
        if (error)
            this.props.setToast(false, error)
        if (error == false) {
            console.log(error)
            this.props.onClickLogin()
        }
    }
    setNodeRef(provider, node) {
        if (node) {
            this.nodes[provider] = node
        }
    }
    handleSocialLogin = (result) => {
        this.props.onChangeValueLogin({ target: { id: 'socialLogin', value: true } })
        this.props.onChangeValueLogin({ target: { id: 'socialLoginData', value: result.data } })
        this.props.onChangeValueLogin({ target: { id: 'socialLoginType', value: result.provider } })
        this.props.onClickLogin()
        localStorage.setItem("userLogin", JSON.stringify(result.data));

    };

    handleSocialLoginFailure = (err) => {
        console.error(err);
    };

    render() {
        console.log(this.props.count)

        return (
            <section id="login"className="sign-in home">
                <div className="container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure className="d-none d-md-block"><img src="assets/img/sport.webp" alt="sing up image" /></figure>
                            <a onClick={() => { history.push('/Register') }} className="signup-image-link">Don't have an account? Register</a>
                        </div>

                        <div className="signin-form">
                            <h2 className="form-title">Sign In</h2>
                            <div className="register-form" id="login-form">
                                <div className="form-group">
                                    <label htmlFor="username"><i className="fa fa-envelope"></i></label>
                                    <input type="text" name="username" id="username" placeholder="Your Email" 
                                      onChange={(e) => {this.props.onChangeValueLogin({ target: { id: 'username', value: e.target.value } })}} 
                                      />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="your_pass"><i className="fa fa-lock"></i></label>
                                    <input type="password" name="your_pass" id="your_pass" placeholder="Password" 
                                     onChange={(e) => {this.props.onChangeValueLogin({ target: { id: 'password', value: e.target.value } })}} />
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                                </div>

                                <div className="form-group form-button">
                                    <input onClick={this.handleSubmit} type="submit" name="signin" id="signin" className="form-submit" value="Log in" />
                                </div>
                            </div>
                            <div className="social-login">
                                <span className="social-label">Or Sign in with</span>
                                <ul className="socials">
                                    <LoginSocialFacebook
                                        appId={5522832564472310}
                                        onResolve={(provider, data) => {
                                            console.log(provider, data)
                                            this.handleSocialLogin(provider, data)
                                        }}
                                        onReject={(err) => {
                                            console.log(err)
                                        }}
                                    >
                                        <li><a href="#"><i className="display-flex-center   fab fa-facebook-f" aria-hidden="true"></i></a></li>

                                    </LoginSocialFacebook>
                                    <LoginSocialGoogle
                                        client_id={'174987584924-3bt94g2sm65ift53mubbvisqiui1ckal.apps.googleusercontent.com'}
                                        onResolve={(provider, data) => {
                                            console.log(provider, data)
                                            this.handleSocialLogin(provider, data)
                                        }}
                                        scope='email profile'
                                        onReject={(err) => {
                                            console.log(err)
                                        }}
                                    >
                                        <li><a href="#"><i className="display-flex-center fab fa-google"></i></a></li>

                                    </LoginSocialGoogle>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    theme='colored'
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
        setToast: (success, message) => dispatch(setToast(success, message)),
        resetToast: (evt) => dispatch(resetToast(evt)),

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
