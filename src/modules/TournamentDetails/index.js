import React from 'react';
import { connect } from 'react-redux';

import BottomNavBar from '../../components/BottomNavBar'
import HeaderNavBar from '../../components/HeaderNavBar'
import history from "../utils/history";
import { formatDate } from '../utils/commonUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

import { getTournamentDetails } from './actions';
import PropTypes from 'prop-types';
import './style.css';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { iteratee } from 'lodash';

export class TournamentDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedItem: false,
            editModal: false,
            typing: false
        }
    }

    componentDidMount() {
        this.props.getTournamentDetails()
        var current = new Date().valueOf()
        var startDate = this.props.tournamentDetails && this.props.tournamentDetails.startDate ? new Date(this.props.tournamentDetails.startDate).valueOf() : new Date().valueOf()
        var show = current > startDate ? false : true
        if (this.props.tournamentDetails && this.props.tournamentDetails.startDate) {
            this.countdown()
        }
    }



    onChangeValueEditClub(evt) {
        this.setState({ typing: !this.state.typing })
        this.props.onChangeValueEditClub(evt)
    }
    countdown() {
        let myTimeout
        clearTimeout(myTimeout);
        let newYears = this.props.tournamentDetails && this.props.tournamentDetails.startDate ? this.props.tournamentDetails.startDate : new Date()
        let newYearsDate = new Date(newYears);
        let currentDate = new Date();
        let totalSeconds = (newYearsDate - currentDate) / 1000;
        let days = Math.floor(totalSeconds / 3600 / 24);
        let hours = Math.floor(totalSeconds / 3600) % 24;
        let mins = Math.floor(totalSeconds / 60) % 60;
        let seconds = Math.floor(totalSeconds) % 60;
        let ampm = "AM";

        if (hours > 12) {
            hours = hours - 12;
            ampm = "PM";
        }
        this.setState({ days, hours, mins, seconds, ampm })
        myTimeout = setTimeout(() => {
            this.countdown();
        }, 1000);
    }




    render() {
        var current = new Date().valueOf()
        var startDate = this.props.tournamentDetails && this.props.tournamentDetails.startDate ? new Date(this.props.tournamentDetails.startDate).valueOf() : new Date().valueOf()
        var show = current > startDate ? false : true
        return (


            <section className="vh-100">
                <HeaderNavBar />
                <div id="root">
                    <div className='container'>
                        <div className='detailBoxMain'>
                            <div className='detailBox'>
                                {this.props.tournamentDetails && <div className='tournamentDetailBox'>
                                    <div>
                                        <div className='tournamentName'>{this.props.tournamentDetails.name}</div>
                                    </div>
                                    <div>
                                        <div className='tableBox'>
                                            <div className='tableBoxRow'>
                                                <div class="cardView">
                                                    <div class="item">
                                                        <h5>  Start Date </h5>
                                                    </div>
                                                    <div class="name">
                                                        <h3>
                                                            {formatDate(this.props.tournamentDetails.startDate)}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div class="cardView">
                                                    <div class="item">
                                                        <h5>  End Date </h5>
                                                    </div>
                                                    <div class="name">
                                                        <h3>
                                                            {formatDate(this.props.tournamentDetails.endDate)}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='tableBoxRow'>
                                                <div class="cardView">
                                                    <div class="item">
                                                        <h5> Team Total </h5>
                                                    </div>
                                                    <div class="name">
                                                        <h3>
                                                            {this.props.tournamentDetails.teamTotal}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div class="cardView">
                                                    <div class="item">
                                                        <h5>  Member Total </h5>
                                                    </div>
                                                    <div class="name">
                                                        <h3>
                                                            {this.props.tournamentDetails.memberTotal}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <hr />
                                        {show ? <div>
                                            <div className='startIn'>Tournament start In</div>
                                            <div class="clock">
                                                <div>
                                                    <span id="hour">{this.state.days}</span>
                                                    <span class="text">Days</span>
                                                </div>
                                                <div>
                                                    <span id="hour">{this.state.hours}</span>
                                                    <span class="text">Hours</span>
                                                </div>
                                                <div>
                                                    <span id="minutes">{this.state.mins}</span>
                                                    <span class="text">Minutes</span>
                                                </div>
                                                <div>
                                                    <span id="seconds">{this.state.seconds}</span>
                                                    <span class="text">Seconds</span>
                                                </div>
                                            </div>
                                        </div> : <div className='startIn'>Tournament Ended</div>}
                                    </div>
                                </div>}
                            </div>
                            <div className='teamBox'>
                            <div className='teamList'> Team List</div>
                                <div class="page-wrapper">
                                    {this.props.tournamentDetails && this.props.tournamentDetails.teams && this.props.tournamentDetails.teams.length > 0 &&
                                        this.props.tournamentDetails.teams.map((item) => (
                                            <div class="profile-box">
                                                <img src={item.teamLogo} alt="profile pic" />
                                                <h3>{item.teamName}</h3>
                                                <h4>{item.ownerName}</h4>
                                                <div class="btn-container">
                                                    <span class="profile-btn" id="view"><i class="far fa-eye"></i>View</span>
                                                    <span class="profile-btn" id="view"><i class="far fa-eye"></i>Edit</span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <br />
                <br />
                <br />
                <BottomNavBar />

            </section>
        );
    }
}

TournamentDetails.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    console.log(state)
    return {
        tournamentDetails: state.tournamentDetail.tournamentDetails,
        nearByTournament: state.global.nearByTournament,
        TournamentDetailsPage: state.global.TournamentDetailsPage,
        loggedInRoleId: state.global.loggedInRoleId,
        selectedTournament: state.tournament.selectedTournament
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTournamentDetails: () => dispatch(getTournamentDetails()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TournamentDetails);
