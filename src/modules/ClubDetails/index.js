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
        let clubDetails = this.props.clubDetails && this.props.clubDetails.length > 0 ? this.props.clubDetails[0] : []
        console.log('this.props.', this.props)
        console.log('clubDetails', clubDetails)

        return (
            <section className="vh-100">
                <HeaderNavBar />
                <div id="root">
                    <div className='padding'>

                        <div className="card"> <img className="card-img-top" src="https://i.imgur.com/K7A78We.jpg" alt="Card image cap" />
                            <div className="card-body little-profile text-center">
                                <div className="pro-img"><img src={clubDetails.logo} alt="user" /></div>
                                <h3 className="m-b-0">{clubDetails.name}</h3>
                                {clubDetails.ownerName && <h3 className="m-b-5"> <b>Owner Name : {clubDetails.ownerName}</b></h3>}
                                <p>{clubDetails.Address}</p>
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

                                {clubDetails.description&&    <p><b>Description :</b> {clubDetails.description}</p>}
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

function mapStateToProps(state) {
    console.log('state', state)
    return {
        clubDetails: state.global.clubDetails,

    };
}

function mapDispatchToProps(dispatch) {
    return {


    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ClubDetails);