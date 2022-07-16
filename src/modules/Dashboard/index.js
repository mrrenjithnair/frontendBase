import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialButton from '../../components/SocialButton'
import BottomNavBar from '../../components/BottomNavBar'
import HeaderNavBar from '../../components/HeaderNavBar'
import history from "../utils/history";
import { onChangeValueGlobal, getClubDetail, resetDashboard } from '../Global/actions';
import roleInfo from '../utils/roleInfo';


import { login, onChangeValueLogin } from './actions';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import { faHotel, faSortNumericUpAlt, faTrophy, faUserFriends, faGamepad } from '@fortawesome/free-solid-svg-icons';

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
    }

    render() {
        console.log(this.props.count)
        return (
            <section className="vh-100">
                <HeaderNavBar/>
                <div id="root">
                    <div className="container pt-5">
                        <div className="row align-items-stretch">
                           {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.myClub &&<div className="c-dashboardInfo col-lg-3 col-md-6 pointer"
                            onClick={() => {
                                this.props.onChangeValueGlobal({ target: { id: 'nearByClub', value: false } }) 
                                history.push('/clubList')
                            }}>
                                <div className="wrap">
                                     <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"> <FontAwesomeIcon icon={faHotel} size="2x" style = {{color: '#FC8471'}} /> </h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count ">My Clubs</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.clubNearBy &&  <div className="c-dashboardInfo col-lg-3 col-md-6" onClick={()=>{
                                this.props.onChangeValueGlobal({ target: { id: 'nearByClub', value: true } }) 

                                 history.push('/clubList') 
                            }}>
                                <div className="wrap">
                                     <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"> <FontAwesomeIcon icon={faHotel} size="2x" style = {{color: '#FC8471'}} /> </h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Clubs Near By</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.playerList && <div className="c-dashboardInfo col-lg-3 col-md-6" onClick={()=>{
                                this.props.onChangeValueGlobal({ target: { id: 'adminList', value: false } }) 

                                 history.push('/userList') 
                            }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faGamepad} size="2x" style = {{color: '#FC8471'}} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Player List</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.clubAdminList && <div className="c-dashboardInfo col-lg-3 col-md-6"
                            onClick={()=>{
                                this.props.onChangeValueGlobal({ target: { id: 'adminList', value: true } }) 
                                 history.push('/userList') 
                            }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faUserFriends} size="2x" style = {{color: '#FC8471'}} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Club Admin List</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.club && roleInfo.privileges.club.clubList &&  <div className="c-dashboardInfo col-lg-3 col-md-6" 
                            onClick={()=>{
                                this.props.onChangeValueGlobal({ target: { id: 'clubListPage', value: true } }) 
                                 history.push('/clubList') 
                            }}>
                                <div className="wrap">
                                     <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"> <FontAwesomeIcon icon={faHotel} size="2x" style = {{color: '#FC8471'}} /> </h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Clubs List</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.tournement &&  <div className="c-dashboardInfo col-lg-3 col-md-6"
                              onClick={()=>{
                                this.props.onChangeValueGlobal({ target: { id: 'nearByTournament', value: false } }) 
                                 history.push('/tournamentList') 
                            }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faTrophy} size="2x" style = {{color: '#FC8471'}} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">My Tournement</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.tournamentList &&  <div className="c-dashboardInfo col-lg-3 col-md-6"
                              onClick={()=>{
                                this.props.onChangeValueGlobal({ target: { id: 'tournamentListPage', value: true } }) 
                                this.props.onChangeValueGlobal({ target: { id: 'nearByTournament', value: false } }) 
                                 history.push('/tournamentList') 
                            }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faTrophy} size="2x" style = {{color: '#FC8471'}} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Tournement List</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.tournement &&  <div className="c-dashboardInfo col-lg-3 col-md-6"
                              onClick={()=>{
                                this.props.onChangeValueGlobal({ target: { id: 'nearByTournament', value: true } }) 
                                this.props.onChangeValueGlobal({ target: { id: 'tournamentListPage', value: false } }) 

                                 history.push('/tournamentList') 
                            }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faTrophy} size="2x" style = {{color: '#FC8471'}} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Tournements</span>
                                </div>
                            </div>}
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.request &&  <div className="c-dashboardInfo col-lg-3 col-md-6"
                              onClick={()=>{
                                 history.push('/request') 
                            }}>
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faTrophy} size="2x" style = {{color: '#FC8471'}} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Request</span>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
                            <br/>
                            <br/>
                            <br/>
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
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        resetDashboard: (evt) => dispatch(resetDashboard(evt)),
        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
