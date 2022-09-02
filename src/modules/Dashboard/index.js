import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialButton from '../../components/SocialButton'
import BottomNavBar from '../../components/BottomNavBar'
import HeaderNavBar from '../../components/HeaderNavBar'
import history from "../utils/history";
import { onChangeValueGlobal, getClubDetail, resetDashboard, setToast, resetToast } from '../Global/actions';
import roleInfo from '../utils/roleInfo';
import { formatDate } from '../../modules/utils/commonUtils';

import profile from '../../images/profile.jpg'

import { login, onChangeValueLogin } from './actions';
import { getMyTournamentList, getTournamentList } from '../TournamentList/actions';
import { getClubList } from '../ClubList/actions';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import { faHotel, faPeopleCarry, faTrophy, faUserFriends, faGamepad, faBook, faPoll, screen, faCircle } from '@fortawesome/free-solid-svg-icons';

export class Dashboard extends React.PureComponent {
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
        this.props.resetDashboard()
        // if (this.props.loggedInRoleId == 3) {
        //     this.props.getClubList()
        // } else {
        //     this.props.getTournamentList()
        // }
        window.scrollTo(0, 0)
    }

    render() {
    let club = this.props.myDetails && this.props.myDetails.club && this.props.myDetails.club.length >0 ? this.props.myDetails.club[0] :[]
        return (
            <section className="compMain">
                <div id="root">
                    <div className="dashboard container pt-5">
                    {this.props.loggedInRoleId == 2 ?  <article className="postcard light red">
                            <a className="postcard__img_link" href="#">
                                <img className="postcard__img" src={club.logoUrl} alt="Image Title" />
                            </a>
                            <div className="postcard__text t-dark">
                                <h1 className="postcard__title red"><a href="#">{club.name}</a></h1>
                                <div className="postcard__subtitle small">
                                    <time datetime="2020-05-25 12:00:00">
                                        <i className="fas fa-calendar-alt mr-2"></i>{formatDate(club.createdAt)}
                                    </time>
                                </div>
                                <div className="postcard__bar"></div>
                                <div className="postcard__preview-txt" style={{ whiteSpace: 'pre-line',textAlign: 'left'}}>{club.description}</div>
                            </div>
                        </article>:
                        <div className="dashProfileBox">
                            <div className='dashImgBox'>
                                <div className='imgMain'>
                                {this.props.myDetails.profilePictureUrl ? <img src={this.props.myDetails.profilePictureUrl} />:<img src={profile} />}
                                </div>
                                <div className='dashNameBox'>
                                <div className='dashName'>{this.props.myDetails.firstName + ' ' + this.props.myDetails.lastName}</div>
                                {this.props.myDetails.category &&<div  className='dashType'><b>Type : </b>{this.props.myDetails.category}</div>}
                                {this.props.myDetails.playerType &&<div  className='dashType'><b>catergory : </b> {this.props.myDetails.playerType}</div>}
                                {this.props.myDetails.roleId == 2 &&<div  className='dashType'><b>Club : </b>{this.props.myDetails.club.map((item)=>(<p>{item.name}</p>))}</div>}
                                </div>
                            </div>
                             </div>}
                        <div className="col row align-items-stretch">
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.myClub && <div className="c-dashboardInfo col-lg-3 col-md-6 pointer"
                                onClick={() => {
                                    this.props.onChangeValueGlobal({ target: { id: 'nearByClub', value: false } })
                                    history.push('/clubList')
                                }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"> <FontAwesomeIcon icon={faHotel} size="2x" style={{ color: '#FC8471' }} /> </h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count ">My Leagues</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.clubNearBy && <div className="c-dashboardInfo col-lg-3 col-md-6" onClick={() => {
                                this.props.onChangeValueGlobal({ target: { id: 'nearByClub', value: true } })

                                history.push('/clubList')
                            }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"> <FontAwesomeIcon icon={faHotel} size="2x" style={{ color: '#FC8471' }} /> </h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Leagues Near By</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.playerList && <div className="c-dashboardInfo col-lg-3 col-md-6" onClick={() => {
                                this.props.onChangeValueGlobal({ target: { id: 'adminList', value: false } })

                                history.push('/userList')
                            }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faGamepad} size="2x" style={{ color: '#FC8471' }} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">League Request</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.clubAdminList && <div className="c-dashboardInfo col-lg-3 col-md-6"
                                onClick={() => {
                                    this.props.onChangeValueGlobal({ target: { id: 'adminList', value: true } })
                                    history.push('/userList')
                                }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faUserFriends} size="2x" style={{ color: '#FC8471' }} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Club Admin List</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.club && roleInfo.privileges.club.clubList && <div className="c-dashboardInfo col-lg-3 col-md-6"
                                onClick={() => {
                                    this.props.onChangeValueGlobal({ target: { id: 'clubListPage', value: true } })
                                    history.push('/clubList')
                                }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"> <FontAwesomeIcon icon={faHotel} size="2x" style={{ color: '#FC8471' }} /> </h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Leagues List</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.tournament && <div className="c-dashboardInfo col-lg-3 col-md-6"
                                onClick={() => {
                                    this.props.onChangeValueGlobal({ target: { id: 'nearByTournament', value: false } })
                                    history.push('/tournamentList')
                                }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faTrophy} size="2x" style={{ color: '#FC8471' }} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">My Tournament</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.tournamentList && <div className="c-dashboardInfo col-lg-3 col-md-6"
                                onClick={() => {
                                    this.props.onChangeValueGlobal({ target: { id: 'tournamentListPage', value: true } })
                                    this.props.onChangeValueGlobal({ target: { id: 'nearByTournament', value: false } })
                                    history.push('/tournamentList')
                                }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faTrophy} size="2x" style={{ color: '#FC8471' }} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Tournament List</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.tournament && <div className="c-dashboardInfo col-lg-3 col-md-6"
                                onClick={() => {
                                    this.props.onChangeValueGlobal({ target: { id: 'nearByTournament', value: true } })
                                    this.props.onChangeValueGlobal({ target: { id: 'tournamentListPage', value: false } })

                                    history.push('/tournamentList')
                                }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faTrophy} size="2x" style={{ color: '#FC8471' }} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Tournements</span>
                                </div>
                            </div>}
                            {this.props.loggedInRoleId == 3 && <div className="c-dashboardInfo col-lg-3 col-md-6"
                                onClick={() => {
                                    history.push('/team')
                                }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faCircle} size="2x" style={{ color: '#FC8471' }} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Team</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.request && <div className="c-dashboardInfo col-lg-3 col-md-6"
                                onClick={() => {
                                    history.push('/request')
                                }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faBook} size="2x" style={{ color: '#FC8471' }} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Tournament Request</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.auction && <div className="c-dashboardInfo col-lg-3 col-md-6"
                                onClick={() => {
                                    this.props.onChangeValueGlobal({ target: { id: 'auction', value: true } })

                                    history.push('/auctionList')
                                }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faPoll} size="2x" style={{ color: '#FC8471' }} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Auction</span>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
            </section>
        );
    }
}

Dashboard.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    return {
        count: state.login.count,
        password: state.login.password,
        username: state.login.username,
        myDetails: state.global.myDetails,
        loggedInRoleId: state.global.loggedInRoleId,
        tournamentList: state.tournament.tournamentList,
        clubList: state.clubs.clubList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClickLogin: (id) => dispatch(login(id)),
        onChangeValueLogin: (evt) => dispatch(onChangeValueLogin(evt)),
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        resetDashboard: (evt) => dispatch(resetDashboard(evt)),
        getTournamentList: (evt) => dispatch(getTournamentList(evt)),
        getMyTournamentList: (evt) => dispatch(getMyTournamentList(evt)),
        setToast: (success, message) => dispatch(setToast(success, message)),
        resetToast: (evt) => dispatch(resetToast(evt)),
        getClubList: (evt) => dispatch(getClubList(evt)),
        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
