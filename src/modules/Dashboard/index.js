import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialButton from '../../components/SocialButton'
import BottomNavBar from '../../components/BottomNavBar'
import HeaderNavBar from '../../components/HeaderNavBar'


import { login, onChangeValueLogin } from './actions';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import { faHotel, faSortNumericUpAlt, faTrophy, faUserFriends, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';

export class Dashboard extends React.PureComponent {
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
                <HeaderNavBar/>
                <div id="root">
                    <div class="container pt-5">
                        <div class="row align-items-stretch">
                            <div class="c-dashboardInfo col-lg-3 col-md-6">
                                <div class="wrap">
                                     <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"> <FontAwesomeIcon icon={faHotel} size="2x" style = {{color: '#FC8471'}} /> </h4>
                                    <span class="hind-font caption-12 c-dashboardInfo__count pointer">Clubs</span>
                                </div>
                            </div>
                            <div class="c-dashboardInfo col-lg-3 col-md-6">
                                <div class="wrap">
                                    <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faGamepad} size="2x" style = {{color: '#FC8471'}} /></h4>
                                    <span class="hind-font caption-12 c-dashboardInfo__count pointer">Player List</span>
                                </div>
                            </div>
                            <div class="c-dashboardInfo col-lg-3 col-md-6">
                                <div class="wrap">
                                    <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faUserFriends} size="2x" style = {{color: '#FC8471'}} /></h4>
                                    <span class="hind-font caption-12 c-dashboardInfo__count pointer">User List</span>
                                </div>
                            </div>
                            <div class="c-dashboardInfo col-lg-3 col-md-6">
                                <div class="wrap">
                                    <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faTrophy} size="2x" style = {{color: '#FC8471'}} /></h4>
                                    <span class="hind-font caption-12 c-dashboardInfo__count pointer">Tournement</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BottomNavBar />

            </section>
        );
    }
}

Dashboard.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
