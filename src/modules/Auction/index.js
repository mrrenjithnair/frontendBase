import React from 'react';
import { connect } from 'react-redux';

import BottomNavBar from '../../components/BottomNavBar'
import HeaderNavBar from '../../components/HeaderNavBar'
import history from "../utils/history";
import { formatDate } from '../utils/commonUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Team from './team';
import AuctionModal from '../../components/AuctionModal'

import { getTournamentList, onChangeValueGlobal, getAuctionPlayer, addPlayerToTeam,setToast, resetToast,createAuction } from '../Global/actions';
import PropTypes from 'prop-types';
import './style.css';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { iteratee } from 'lodash';
import EditModal from '../../components/EditModal'
import { getTournamentDetails } from './actions';
import team from '../../images/team.jpg'

export class Auction extends React.PureComponent {
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
        this.props.getTournamentList()
        window.scrollTo(0, 0)
    }
    next(){
        this.props.getAuctionPlayer()
    }
    addPlayerToTeam(){
        let error = false
        this.props.resetToast()
        if (!this.props.auctionTournamentTeamId) {
            error = true
            this.props.setToast(false, 'Please select team')
        } else if (!this.props.auctionTournamentPlayerBindAmount) {
            error = true
            this.props.setToast(false, 'Please enter bind amount')
        }

        if(!error){
            this.props.addPlayerToTeam()
        }
    }
    auctionSubmit(){
        // let obj ={
        //     venue: this.props.auctionVenue,
        //     date: this.props.auctionDate,
        //     type: this.props.auctionType,
        //     teamPoint: this.props.auctionTeamPoint,
        // }
        // if (this.props.auctionType == 'category') {
        //     obj.pointJson = [{ min: this.props.auctionMinPoint, max: this.props.auctionMaxPoint }]
        // } else if (this.props.auctionType == 'noCategory') {
        //     obj.pointJson = [
        //         { category: 'A', min: this.props.auctionCategoryAMinPoint, max: this.props.auctionCategoryAMaxPoint },
        //         { category: 'B', min: this.props.auctionCategoryBMinPoint, max: this.props.auctionCategoryBMaxPoint },
        //         { category: 'C', min: this.props.auctionCategoryCMinPoint, max: this.props.auctionCategoryCMaxPoint },
        //     ]
        // }
        let error = false
        if (!this.props.auctionVenue) {
            error = true
            this.props.setToast(false, 'Please enter venue')
        } else if (!this.props.auctionDate) {
            error = true
            this.props.setToast(false, 'Please enter auction date')
        } else if (!this.props.auctionType) {
            error = true
            this.props.setToast(false, 'Please select auction type')
        } else if (!this.props.auctionTeamPoint) {
            error = true
            this.props.setToast(false, 'Please enter team point')
        }
        if (this.props.auctionType == 'category') {
            if (!this.props.auctionMinPoint) {
                error = true
                this.props.setToast(false, 'Please enter min point')
            }
            if (!this.props.auctionMaxPoint) {
                error = true
                this.props.setToast(false, 'Please enter max point')
            }
        }
        if (this.props.auctionType == 'noCategory') {
            if (!this.props.auctionCategoryAMinPoint) {
                error = true
                this.props.setToast(false, 'Please enter category A min point')
            }
            if (!this.props.auctionCategoryAMaxPoint) {
                error = true
                this.props.setToast(false, 'Please enter category A max point')
            } if (!this.props.auctionCategoryBMinPoint) {
                error = true
                this.props.setToast(false, 'Please enter category B min point')
            }
            if (!this.props.auctionCategoryBMaxPoint) {
                error = true
                this.props.setToast(false, 'Please enter category B max point')
            } if (!this.props.auctionCategoryCMinPoint) {
                error = true
                this.props.setToast(false, 'Please enter category C min point')
            }
            if (!this.props.auctionCategoryCMaxPoint) {
                error = true
                this.props.setToast(false, 'Please enter category C max point')
            }
        }
        if(!error){
            console.log('rrr')
            this.props.createAuction()
            this.setState({ showModal: false })
        }
       
    }

    render() {
        let tournamentListGlobal = this.props.tournamentListGlobal && this.props.tournamentListGlobal.length > 0 ? this.props.tournamentListGlobal : []
        let tournamentListGlobalArray = []
        if (tournamentListGlobal && tournamentListGlobal.length > 0) {
            tournamentListGlobal.map((item) => {
                tournamentListGlobalArray.push({
                    value: item.id,
                    label: item.name,
                })
            })
        }

        let playerList = this.props.auctionPlayer
        var player = playerList[Math.floor(Math.random() * playerList.length)];
        return (


            <section className="compMain">
                <div id="root">
                    <div className='container'>
                        <div className='auctionBox'>
                            <div className='detailBox'>

                                <div className='tournamentDetailBoxAuction'>
                                    <label className="flabel capitalize" htmlFor="form3Example3"> Please select auction which is created already </label>
                                   
                                    <div style={{display:'flex'}}>
                                        <select className="form-control"
                                            onChange={(e) => {
                                                this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentId', value: e.target.value } })
                                                this.props.getTournamentList()
                                                this.props.getAuctionPlayer()
                                            }} >
                                            <option value=""> Select Tournament</option>
                                            {tournamentListGlobalArray && tournamentListGlobalArray.length > 0 && tournamentListGlobalArray.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}

                                        </select>
                                        <Button variant="primary" onClick={() => this.setState({ showModal: true })}>
                                           Create Auction
                                        </Button>
                                    </div>
                                    <br />
                                    {!this.props.tournamentDetailGlobal &&  <div className='noTournamentDetail'>No tournament detail</div> }
                                    {this.props.tournamentDetailGlobal && <div>
                                        <div className='tournamentName'>       {this.props.tournamentDetailGlobal.name}</div>
                                    </div>}
                                    <div>
                                        {this.props.tournamentDetailGlobal && <div className='tableBox'>
                                            <div className='tableBoxRow'>
                                                <div className="cardView">
                                                    <div className="item">
                                                        <h5> Team Total </h5>
                                                    </div>
                                                    <div className="name">
                                                        <h3>
                                                            {this.props.tournamentDetailGlobal.teamTotal}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div className="cardView">
                                                    <div className="item">
                                                        <h5>  Member Total </h5>
                                                    </div>
                                                    <div className="name">
                                                        <h3>
                                                            {this.props.tournamentDetailGlobal.memberTotal}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>}
                                        {this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams && <div>
                                            <div className='tournamentName'> team List</div>
                                        </div>}
                                        {this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams && <div className='tableBox'>
                                            <div className='tableBoxRow'>
                                                {this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams.map((item) => (<Card  key={item.teamId}>
                                                    {item.teamLogo ? <Card.Img variant="top" src={item.teamLogo} />
                                                        : <Card.Img variant="top" src={team} />}
                                                    <Card.Body>
                                                        <Card.Title> {item.teamName}</Card.Title>
                                                    </Card.Body>
                                                    <Card.Footer>
                                                        <Card.Text>
                                                            <b>Owner:</b>  {item.ownerName}
                                                        </Card.Text>
                                                    </Card.Footer>
                                                </Card>
                                                ))}
                                            </div>

                                        </div>}

                                        <hr />

                                    </div>
                                </div>
                            </div>
                            <div className='tournamentDetailBoxAuctionTeam'>
                                <Team player={player}
                                tournamentDetailGlobal={this.props.tournamentDetailGlobal}
                                onChangeValueGlobal={this.props.onChangeValueGlobal}
                                addPlayerToTeam={()=>this.addPlayerToTeam()}
                                next={()=>this.next()}/>
                            </div>
                        </div>


                    </div>
                </div>
                <br />
                <br />
                <br />

                <AuctionModal
                 title="Add Auction"
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                    onSubmit={() => this.auctionSubmit()}
                    onChangeInput={(evt) => this.props.onChangeValueGlobal(evt)}
                    auctionType={this.props.auctionType}
                    tournamentListGlobalArray={tournamentListGlobalArray}
                />

            </section>
        );
    }
}

Auction.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    console.log(state)
    return {
        tournamentDetailGlobal: state.global.tournamentDetailGlobal,
        nearByTournament: state.global.nearByTournament,
        TournamentDetailsPage: state.global.TournamentDetailsPage,
        loggedInRoleId: state.global.loggedInRoleId,
        selectedTeam: state.tournamentDetail.selectedTeam,
        tournamentListGlobal: state.global.tournamentListGlobal,
        auctionTournamentId: state.global.auctionTournamentId,
        auctionPlayer: state.global.auctionPlayer,
        auctionPlayerId: state.global.auctionPlayerId,
        auctionTournamentTeamId: state.global.auctionTournamentTeamId,
        auctionTournamentId: state.global.auctionTournamentId,
        auctionRequestId: state.global.auctionRequestId,
        auctionTournamentPlayerBindAmount: state.global.auctionTournamentPlayerBindAmount,
        auctionType: state.global.auctionType,
        auctionDate: state.global.auctionDate,
        auctionVenue: state.global.auctionVenue,
        auctionTeamPoint: state.global.auctionTeamPoint,
        auctionMinPoint: state.global.auctionMinPoint,
        auctionMaxPoint: state.global.auctionMaxPoint,
        auctionCategoryAMinPoint: state.global.auctionCategoryAMinPoint,
        auctionCategoryAMaxPoint: state.global.auctionCategoryAMaxPoint,
        auctionCategoryBMinPoint: state.global.auctionCategoryBMinPoint,
        auctionCategoryBMaxPoint: state.global.auctionCategoryBMaxPoint,
        auctionCategoryCMinPoint: state.global.auctionCategoryCMinPoint,
        auctionCategoryCMaxPoint: state.global.auctionCategoryCMaxPoint,
        
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTournamentList: () => dispatch(getTournamentList()),
        getTournamentDetails: () => dispatch(getTournamentDetails()),
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        getAuctionPlayer: (evt) => dispatch(getAuctionPlayer(evt)),
        addPlayerToTeam: (evt) => dispatch(addPlayerToTeam(evt)),
        setToast: (success, message) => dispatch(setToast(success, message)),
        resetToast: (evt) => dispatch(resetToast(evt)),
        createAuction: (evt) => dispatch(createAuction(evt)),
        
        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Auction);
