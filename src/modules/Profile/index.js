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

import { onChangeValueGlobal, getUserDetail, getPlayerTeamList } from '../Global/actions';
import { getTournamentList } from '../TournamentList/actions';
import { getClubList } from '../ClubList/actions';

import profile from '../../images/profile.jpg'
import team from '../../images/team.jpg'


import 'react-toastify/dist/ReactToastify.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

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
        this.props.getPlayerTeamList()
        this.props.getClubList()
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

    teamUi(item) {
        return (<div className="mainBoxProfile">
            <div className="profileRow">
                <div className="profileDetailBox">
                    <div className="profileImgBox"><img src={team} className="profileImage" /></div>
                    <div className="profiledetailBox">
                    {item.teamName&&<h5 className="profileh5">{item.teamName}</h5>}
                    {item.name&& <h5 className="profileh5">{item.name}</h5>}
                    {item.bidAmount&& <p className="profilep"><b>Bid Anount: </b>{item.bidAmount}</p>}
                    </div>
                </div>
            </div>
        </div>)
    }
    render() {
        console.log(this.props.count)
        let showTabs = this.props.userProfile.roleId == 3 ? true : false
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
                                            {this.props.userProfile.profilePicture ? <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
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
                            </div>
                            {showTabs ? <Tabs
                                defaultActiveKey="profile"
                                id="justify-tab-example"
                                className="mb-3"
                                justify
                                onSelect={(key) => {
                                    console.log(key)
                                    if(key == 'Teams'){
                                        this.props.getPlayerTeamList()
                                    }else if(key == 'Tournement'){
                                        this.props.onChangeValueGlobal({ target: { id: 'nearByTournament', value: false } })
                                        this.props.getTournamentList()
                                    }else if(key == 'clubList'){
                                        this.props.onChangeValueGlobal({ target: { id: 'nearByClub', value: false } })
                                        this.props.getClubList()
                                    }
                                }}
                            >
                                <Tab eventKey="clubList" title="Leagues">
                                {this.props.clubList && this.props.clubList.length > 0 &&
                                        this.props.clubList.map((item) => {
                                            return this.teamUi(item)
                                        })}
                                </Tab>
                                <Tab eventKey="Tournement" title="Tournament">
                                        {this.props.tournamentList && this.props.tournamentList.length > 0 &&
                                        this.props.tournamentList.map((item) => {
                                            return this.teamUi(item)
                                        })}
                                </Tab>
                                <Tab eventKey="Teams" title="Teams">
                                    {this.props.playerTeamList && this.props.playerTeamList.length > 0 &&
                                        this.props.playerTeamList.map((item) => {
                                            return this.teamUi(item)
                                        })}
                                    <div />
                                </Tab>
                            </Tabs> : <div />}
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
        playerTeamList: state.global.playerTeamList,
        tournamentList: state.tournament.tournamentList,
        clubList: state.clubs.clubList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        getUserDetail: (evt) => dispatch(getUserDetail(evt)),
        getPlayerTeamList: (evt) => dispatch(getPlayerTeamList(evt)),
        getTournamentList: () => dispatch(getTournamentList()),
        getClubList: () => dispatch(getClubList()),

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
