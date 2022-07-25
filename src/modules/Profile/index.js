import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialButton from '../../components/SocialButton'
import BottomNavBar from '../../components/BottomNavBar'

import HeaderNavBar from '../../components/HeaderNavBar'

// import { login, onChangeValueLogin } from './actions';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import { faSortNumericUpAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import history from "../utils/history";

import { onChangeValueGlobal, getUserDetail } from '../Global/actions';
import profile from '../../images/profile.jpg'

import 'react-toastify/dist/ReactToastify.css';
export class Profile extends React.PureComponent {
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
        this.props.getUserDetail()
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
    listRender(item) {
        let request = item.approved == 0 && item.playerId
        let name = item.name
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        let initials = [...name.matchAll(rgx)] || [];
        initials = (
            (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();

        return (
            <div className="card clubItem" style={{ width: '18rem' }} key={item.id}>
                    <div className='locationBox'>
                        <div className='locationText'>{item.location}</div> </div>

               {item.logo ? <img className="clubLogo" src={item.logo} alt={item.name} data-letters="MN"/>
                     : <div className='letterCircleClub'>{initials}</div>}

                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text"><b>Address:</b> {item.Address}</p>
                    {/* <a href="#" className= "btn btn-primary"onClick={()=>{
                        this.props.onChangeValueGlobal({ target: { id: 'selectedClub', value: item.id } }) 
                        this.props.getClubDetail()
                        history.push('/clubDetails',{clubDetails:item})
                        }}> Detail</a> */}
                </div>
            </div>
        )
    }
    handleSocialLoginFailure = (err) => {
        console.error(err);
    };

    render() {
        console.log(this.props.count)

        return (
            <section className="vh-100">
                <HeaderNavBar />
                <div className="container">
                    <div className="main-body">

                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                        {this.props.userProfile. profilePicture ? <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                          : <img src={profile} alt="Admin" className="rounded-circle" width="150" />}
                                            
                                            <div className="mt-3">
                                                <h4>  {this.props.userProfile.firstName}   {this.props.userProfile.lastName}</h4>
                                                <p className="text-secondary mb-1">  {this.props.userProfile.category}</p>
                                                <p className="text-muted font-size-sm"> {this.props.userProfile.location}</p>
                                                {/* <button className="btn btn-primary">Follow</button>
                                                <button className="btn btn-outline-primary">Message</button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">First Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                               {this.props.userProfile.firstName}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Last Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                               {this.props.userProfile.lastName}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                            {this.props.userProfile.emailId}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Mobile</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                            {this.props.userProfile.mobile}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">location</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                            {this.props.userProfile.location}
                                            </div>
                                        </div>
                                        <hr />
                                        {/* <div className="row">
                                            <div className="col-sm-12">
                                                <a className="btn btn-info " target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="card mb-3">
                                    <div className="card-body">
                                    <h4> Club List</h4>

                                        <div className="row">
                                            {this.props.userProfile && this.props.userProfile.club && this.props.userProfile.club.length != 0 &&
                                                this.props.userProfile.club.map((item) => {
                                                    return this.listRender(item)
                                                }
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        );
    }
}

Profile.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    console.log('state', state)
    return {
        count: state.login.count,
        password: state.login.password,
        username: state.login.username,
        userProfile: state.global.userProfile,
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        getUserDetail: (evt) => dispatch(getUserDetail(evt)),

        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
