import React from 'react';
import { connect } from 'react-redux';

import BottomNavBar from '../../components/BottomNavBar'
import HeaderNavBar from '../../components/HeaderNavBar'
import history from "../utils/history";
import { formatDate } from '../utils/commonUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, } from '@fortawesome/free-brands-svg-icons';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getTournamentDetails, onChangeValueEditTeam, onChangeValueTeam } from './actions';
import { getUserList, onChangeValueGlobal, uploadPhoto, getAuctionPlayer, insertOrUpdateTeam } from '../Global/actions';
import roleInfo from '../utils/roleInfo';
import { Button } from 'react-bootstrap';

import PropTypes from 'prop-types';
import './style.css';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { iteratee } from 'lodash';
import EditModal from '../../components/EditModal'
import AddModal from '../../components/AddModal'

import team from '../../images/team.jpg'
import profile from '../../images/profile.jpg'


export class TournamentDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedItem: false,
            editModal: false,
            addModal:false,
            typing: false
        }
    }

    componentDidMount() {
           window.scrollTo(0, 0)
        this.props.getTournamentDetails()
        var current = new Date().valueOf()
        var startDate = this.props.tournamentDetails && this.props.tournamentDetails.startDate ? new Date(this.props.tournamentDetails.startDate).valueOf() : new Date().valueOf()
        var show = current > startDate ? false : true
        if (this.props.tournamentDetails && this.props.tournamentDetails.startDate) {
            this.countdown()
        }
    }
    componentWillUnmount() {
        this.props.onChangeValueGlobal({ target: { id: 'globalSelectedTeamId', value: null } })
        this.props.onChangeValueGlobal({ target: { id: 'teamPlayerList', value: null } })

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


    editTournamentSubmit() {
        console.log('edit')
        this.props.insertOrUpdateTeam()
        this.setState({ editModal: false })
    }
    viewTeam(item){
        this.props.onChangeValueGlobal({ target: { id: 'globalSelectedTeamId', value: item.teamId } })
        this.props.getUserList()
    }
    
    editTeam(item){
        console.log(item)
        let data= [{
            key: 'teamName',
            label: 'Team Name',
            type: 'text',
            value: item.teamName
        },
        {
            key: 'teamLogo',
            label: 'Team Logo',
            type: 'file',
            value: ''//item.teamLogo
        },
        {
            key: 'id',
            value: item.teamId
        },
        {
            key: 'clubId',
            value: item.clubId
        },
        {
            key: 'tournamentId',
            value: item.tournamentId
        },
        {
            key: 'ownerId',
            value: item.ownerId
        },
    ]
        
        this.props.onChangeValueTeam({ target: { id: 'selectedTeam', value: data } })
        this.props.onChangeValueTeam({ target: { id: 'selectedItem', value: item } })
        this.setState({ editModal: true, selectedItem: data })
    }
     
    async addTeam() {
        var tournamentId = this.props.tournamentDetails && this.props.tournamentDetails.tournamentId ? this.props.tournamentDetails.tournamentId : null
        var clubId = this.props.tournamentDetails && this.props.tournamentDetails.clubId ? this.props.tournamentDetails.clubId : null
        this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentId', value: tournamentId } })
        await this.props.getAuctionPlayer()
        let data1=[]
        if(this.props.auctionPlayer){
            this.props.auctionPlayer.map((item)=>{
            data1.push({label:item.playerName, value:item.playerId})
            })
        }
        let data= [{
            key: 'teamName',
            label: 'Team Name',
            type: 'text',
        },
        {
            key: 'teamLogo',
            label: 'Team Logo',
            type: 'file',
            value: ''
        },
        {
            key: 'teamOwner',
            label: 'Team Owner',
            type: 'select',
            value: '',
            data:data1
        },
        {
            key: 'tournamentId',
            value: tournamentId
        },
        {
            key: 'clubId',
            value: clubId
        }]
        this.props.onChangeValueTeam({ target: { id: 'selectedTeam', value: data } })
        this.setState({ addModal: true, selectedItem: data })
    }
    onChangeValueEditTeam(evt){
        console.log(evt)
        this.setState({typing: !this.state.typing})
        this.props.onChangeValueEditTeam(evt)
    }
    render() {
        var current = new Date().valueOf()
        var startDate = this.props.tournamentDetails && this.props.tournamentDetails.startDate ? new Date(this.props.tournamentDetails.startDate).valueOf() : new Date().valueOf()
        var show = current > startDate ? false : true
        console.log(this.props.teamPlayerList)
        return (


            <section className="compMain">
                <div id="root">
                    <div className='container'>
                        <div className='detailBoxMain'>
                            <div className='detailBox'>
                                {this.props.tournamentDetails && <div className='tournamentDetailBox'>
                                {this.props.tournamentDetails.bannerUrl && <div>
                                    <img src={this.props.tournamentDetails.bannerUrl} className='tournamentBanner' alt="banner pic" />
                                    </div>}
                                    <div className='tournamentLogBox'>
                                    {this.props.tournamentDetails.logoUrl && <div>
                                    <img src={this.props.tournamentDetails.logoUrl} className='tournamentLogo' alt="banner pic" />
                                    </div>}  <div className='tournamentName'>{this.props.tournamentDetails.name}</div>
                                    </div>
                                    <div>
                                        <div className='tableBox'>
                                            <div className='tableBoxRow'>
                                                <div className="cardView">
                                                    <div className="item">
                                                        <h5>  Start Date </h5>
                                                    </div>
                                                    <div className="name">
                                                        <h3>
                                                            {formatDate(this.props.tournamentDetails.startDate)}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div className="cardView">
                                                    <div className="item">
                                                        <h5>  End Date </h5>
                                                    </div>
                                                    <div className="name">
                                                        <h3>
                                                            {formatDate(this.props.tournamentDetails.endDate)}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='tableBoxRow'>
                                                <div className="cardView">
                                                    <div className="item">
                                                        <h5> Team Total </h5>
                                                    </div>
                                                    <div className="name">
                                                        <h3>
                                                            {this.props.tournamentDetails.teamTotal}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div className="cardView">
                                                    <div className="item">
                                                        <h5>  Member Total </h5>
                                                    </div>
                                                    <div className="name">
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
                                            <div className="clock">
                                                <div>
                                                    <span id="hour">{this.state.days}</span>
                                                    <span className="text">Days</span>
                                                </div>
                                                <div>
                                                    <span id="hour">{this.state.hours}</span>
                                                    <span className="text">Hours</span>
                                                </div>
                                                <div>
                                                    <span id="minutes">{this.state.mins}</span>
                                                    <span className="text">Minutes</span>
                                                </div>
                                                <div>
                                                    <span id="seconds">{this.state.seconds}</span>
                                                    <span className="text">Seconds</span>
                                                </div>
                                            </div>
                                        </div> : <div className='startIn'>Tournament Ended</div>}
                                    </div>
                                </div>}
                            </div>
                          {this.props.globalSelectedTeamId ?<div className='teamBox'>
                        
                                <div className='teamList'>
                                    <div className='arrow'>
                                        <FontAwesomeIcon icon={faArrowLeft} onClick={() => {
                                            this.props.onChangeValueGlobal({ target: { id: 'globalSelectedTeamId', value: null } })
                                            this.props.onChangeValueGlobal({ target: { id: 'teamPlayerList', value: null } })

                                        }} />
                                    </div>
                                    <div>Player List</div></div>
                      
                                <div className="page-wrapper">
                                    {this.props.teamPlayerList && this.props.teamPlayerList.length > 0 ?
                                        this.props.teamPlayerList.map((item) => (
                                            <div className="profile-box">
                                               {item.profilePicture ? <img src={item.profilePicture} alt="profile pic" />:
                                                <img src={profile} alt="profile pic" />}
                                                <h3>{item.firstName} {item.lastName}</h3>
                                                <h4>{item.category}</h4>
                                                <h4>{item.location}</h4>
                                            </div>
                                        )):<div> No Player available</div>}
                                </div>
                            </div>:  <div className='teamBox'>
                            <div className='teamList'> Team List
                            
                            <div className="btn-wrap">
                              <a href="#" onClick={() => this.addTeam()} className="btn btn-primary">Add Team</a> &nbsp;
                            </div>
                            </div>
                                <div className="page-wrapper">
                                    {this.props.tournamentDetails && this.props.tournamentDetails.teams && this.props.tournamentDetails.teams.length > 0 &&
                                        this.props.tournamentDetails.teams.map((item) => (
                                            <div className="profile-box">
                                               {item.logoUrl ? <img src={item.logoUrl} alt="profile pic" />:
                                                <img src={team} alt="profile pic" />}
                                                <h3>{item.teamName}</h3>
                                                <h4>{item.ownerName}</h4>
                                                <div className="btn-container">
                                                    <span className="profile-btn" id="view" onClick={() => this.viewTeam(item)}><i className="far fa-eye"></i>View</span>
                                                    <span className="profile-btn" id="view" onClick={() => this.editTeam(item)}><i className="far fa-eye"></i>Edit</span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>}
                        </div>

                    </div>
                </div>
                <br />
                <br />
                <br />
                <EditModal
                 title={"Edit Tournament"}
                 show={this.state.editModal}
                 onHide={() => this.setState({ editModal: false })}
                 onSubmit={() => this.editTournamentSubmit()}
                 feildObj={this.props.selectedTeam}
                 uploadPhoto={this.props.uploadPhoto}
                 onChangeInput={(evt) => this.onChangeValueEditTeam(evt)}
                />
                <AddModal
                 title={"Add Team"}
                 show={this.state.addModal}
                 onHide={() => this.setState({ addModal: false })}
                 onSubmit={() => this.editTournamentSubmit()}
                 feildObj={this.props.selectedTeam}
                 uploadPhoto={this.props.uploadPhoto}
                 onChangeInput={(evt) => this.onChangeValueEditTeam(evt)}
                />

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
        selectedTeam: state.tournamentDetail.selectedTeam,
        globalSelectedTeamId: state.global.globalSelectedTeamId,
        teamPlayerList: state.global.teamPlayerList,
        auctionPlayer: state.global.auctionPlayer,
        
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTournamentDetails: () => dispatch(getTournamentDetails()),
        onChangeValueEditTeam: (evt) => dispatch(onChangeValueEditTeam(evt)),
        onChangeValueTeam: (evt) => dispatch(onChangeValueTeam(evt)),
        getAuctionPlayer: (evt) => dispatch(getAuctionPlayer(evt)),
        insertOrUpdateTeam: (evt) => dispatch(insertOrUpdateTeam(evt)),
        
        getUserList: (evt) => dispatch(getUserList(evt)),
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        uploadPhoto: (data, fileId, key) => dispatch(uploadPhoto(data, fileId, key)),
        
        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TournamentDetails);
