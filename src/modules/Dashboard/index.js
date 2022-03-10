import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialButton from '../../components/SocialButton'
import BottomNavBar from '../../components/BottomNavBar'
import HeaderNavBar from '../../components/HeaderNavBar'
import history from "../utils/history";


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

    render() {
        console.log(this.props.count)
        return (
            <section className="vh-100">
                <HeaderNavBar/>
                <div id="root">
                    <div className="container pt-5">
                        <div className="row align-items-stretch">
                            <div className="c-dashboardInfo col-lg-3 col-md-6 pointer" onClick={() => {
                                history.push('/clubList')
                            }}>
                                <div className="wrap">
                                     <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"> <FontAwesomeIcon icon={faHotel} size="2x" style = {{color: '#FC8471'}} /> </h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count ">My Clubs</span>
                                </div>
                            </div>
                            <div className="c-dashboardInfo col-lg-3 col-md-6"onClick={()=>{
                                
                            }}>
                                <div className="wrap">
                                     <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"> <FontAwesomeIcon icon={faHotel} size="2x" style = {{color: '#FC8471'}} /> </h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Clubs NearBy</span>
                                </div>
                            </div>
                            <div className="c-dashboardInfo col-lg-3 col-md-6">
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faGamepad} size="2x" style = {{color: '#FC8471'}} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Player List</span>
                                </div>
                            </div>
                            <div className="c-dashboardInfo col-lg-3 col-md-6">
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faUserFriends} size="2x" style = {{color: '#FC8471'}} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Club Admin List</span>
                                </div>
                            </div>
                            <div className="c-dashboardInfo col-lg-3 col-md-6">
                                <div className="wrap">
                                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><FontAwesomeIcon icon={faTrophy} size="2x" style = {{color: '#FC8471'}} /></h4>
                                    <span className="hind-font caption-12 c-dashboardInfo__count pointer">Tournement</span>
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
