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

import { getTournamentList, onChangeValueGlobal, getAuctionPlayer, addPlayerToTeam, setToast, resetToast, createAuction, resetAuction } from '../Global/actions';
import PropTypes from 'prop-types';
import './style.css';
import { faBalanceScale, faCalendarDay, faMoneyBill, faUsers } from '@fortawesome/free-solid-svg-icons';
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
    getPrice(cat, min) {
        let type = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.type ? this.props.tournamentDetailGlobal.type : ''
        let pointJson = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.pointJson ? this.props.tournamentDetailGlobal.pointJson : []
        let basePriceMin
        let basePriceMax
        if (type == 'category') {
            pointJson.map((item) => {
                if (item.category == cat) {
                    basePriceMin = item.min
                    basePriceMax = item.max
                }
            })
        } else {
            if (pointJson && pointJson.length > 0) {
                basePriceMin = pointJson[0].min
                basePriceMax = pointJson[0].max
            }
        }
        if (min) {
            return parseInt(basePriceMin)
        } else {
            return parseInt(basePriceMax)
        }
    }
    componentDidMount() {
        // this.props.resetAuction()
        // this.props.onChangeValueGlobal({ target: { id: 'auctionPending', value: false } })
        // this.props.getTournamentList()
        window.scrollTo(0, 0)
    }
    next() {
        this.props.getAuctionPlayer()
    }
    addPlayerToTeam(playerType) {
        let error = false
        this.props.resetToast()
        if (!this.props.auctionTournamentTeamId) {
            error = true
            this.props.setToast(false, 'Please select team')
        } else if (!this.props.auctionTournamentPlayerBindAmount) {
            error = true
            this.props.setToast(false, 'Please enter bind amount')
        }
        else if (parseInt(this.props.auctionTournamentPlayerBindAmount) < this.getPrice(playerType,true)) {
            error = true
            this.props.setToast(false, 'Please enter bind amount more then minimum price')
        }
        else if (parseInt(this.props.auctionTournamentPlayerBindAmount) > this.getPrice(playerType,false)) {
            error = true
            this.props.setToast(false, 'Please enter bind amount less then maximum price')
        }

        if (!error) {
            this.props.addPlayerToTeam()
        }
    }
    auctionSubmit() {
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
        if (this.props.auctionType == 'noCategory') {
            if (!this.props.auctionMinPoint) {
                error = true
                this.props.setToast(false, 'Please enter min point')
            }
            if (!this.props.auctionMaxPoint) {
                error = true
                this.props.setToast(false, 'Please enter max point')
            }
        }
        if (this.props.auctionType == 'category') {
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
        if (!error) {
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
                    <div className='container-fluid'>
                    {this.props.tournamentDetailGlobal && <div className='auctionHeader'>

                                        <div className='auctionName'>       {this.props.tournamentDetailGlobal.name}</div>
                                        <div className='auctionName'>       Total Team:  {this.props.tournamentDetailGlobal.teamTotal}</div>
                                        <div className='auctionName'>       Member Team:  {this.props.tournamentDetailGlobal.memberTotal}</div>
                                    </div>}
                        <div className='auctionBox'>
                            <div className='detailBox'>
                                <div className='tournamentDetailBoxAuction'>
                                    <div>
                                        {this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams && <div>
                                            <div className='auctionName'> team List</div>
                                        </div>}

                                        <div className="page-wrapper-auction">
                                            {this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams && this.props.tournamentDetailGlobal.teams.length > 0 &&
                                                this.props.tournamentDetailGlobal.teams.map((item) => (
                                                    <div className="profile-main-box-auction">
                                                        <div className="profile-box-auction">
                                                        {item.logoUrl ? <img src={item.logoUrl} alt="profile pic" /> :
                                                            <img src={team} alt="profile pic" />}
                                                        <div className='profile-box-textBox'>
                                                            <div className='teamNameAuction'>{item.teamName}</div>
                                                            <span>{item.ownerName}</span><br />
                                                        </div>
                                                        </div>
                                                        <div className='profile-detail-auction'>
                                                        <div className='profile-detail-auction-text' title='Total player'><FontAwesomeIcon icon={faUsers} size="1x" style={{ color: '#2c3e50' }} /> : {item.totalPlayer}</div>
                                                        <div className='profile-detail-auction-text' title='Spend money'><FontAwesomeIcon icon={faMoneyBill} size="1x" style={{ color: '#2c3e50' }} /> : {item.totalPlayer}</div>
                                                        <div className='profile-detail-auction-text' title='Pending money'><FontAwesomeIcon icon={faBalanceScale} size="1x" style={{ color: '#2c3e50' }} /> : {item.totalPlayer}</div>

                                                        </div>
                                                    </div>
                                                ))}
                                        </div>

                                        <hr />

                                    </div>
                                </div>
                            </div>
                            <div className='tournamentDetailBoxAuctionTeam'>
                                <Team player={player}
                                    tournamentDetailGlobal={this.props.tournamentDetailGlobal}
                                    auctionTournamentTeamId={this.props.auctionTournamentTeamId}
                                    auctionTournamentPlayerBindAmount={this.props.auctionTournamentPlayerBindAmount}
                                    onChangeValueGlobal={this.props.onChangeValueGlobal}
                                    addPlayerToTeam={() => this.addPlayerToTeam()}
                                    next={() => this.next()} />
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
        resetAuction: (evt) => dispatch(resetAuction(evt)),
        

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Auction);
