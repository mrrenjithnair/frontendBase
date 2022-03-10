import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialButton from '../../components/SocialButton'
import BottomNavBar from '../../components/BottomNavBar'
import HeaderNavBar from '../../components/HeaderNavBar'
import history from "../utils/history";



import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import { faHotel, faSortNumericUpAlt, faTrophy, faUserFriends, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
export class ClubDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        let clubDetails = this.props.clubDetails 
        console.log('this.props.',this.props)
        return (
            <section className="vh-100">
                <HeaderNavBar />
                <div id="root">
                        <div className='padding'>

                            <div className="card"> <img className="card-img-top" src="https://i.imgur.com/K7A78We.jpg" alt="Card image cap" />
                                <div className="card-body little-profile text-center">
                                    <div className="pro-img"><img src="https://i.pinimg.com/originals/28/5a/83/285a83d59750c49d59d726c9490828eb.jpg" alt="user" /></div>
                                    <h3 className="m-b-0">{clubDetails && clubDetails.name ? clubDetails.name :''}</h3>
                                    <p>656V+PVX, Housing Board Colony, Ambernath, Maharashtra 421505</p>
                                    <div className="row text-center m-t-20">
                                        <div className="col-lg-4 col-md-4 m-t-20">
                                            <h3 className="m-b-0 font-light">10</h3><small>Players</small>
                                        </div>
                                        <div className="col-lg-4 col-md-4 m-t-20">
                                            <h3 className="m-b-0 font-light">10</h3><small>Active Tournemets</small>
                                        </div>
                                        <div className="col-lg-4 col-md-4 m-t-20">
                                            <h3 className="m-b-0 font-light">50</h3><small>Total Tournemets</small>
                                        </div>
                                    </div>
                                    <div className="row m-t-20">
                                    
                                    <p><b>Description :</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
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

ClubDetails.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

export default ClubDetails;
