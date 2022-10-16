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
import CustomModal from './CustomModal'

import profile from '../../images/profile.jpg'

import { getTournamentList, onChangeValueGlobal, getUserList, getAuctionPlayer, getTournamentDetailOfAuction, addPlayerToTeam, setToast, resetToast, createAuction, resetAuction } from '../Global/actions';
import PropTypes from 'prop-types';
import './style.css';
import { faArrowAltCircleRight, faBalanceScale, faCalendarDay, faMoneyBill, faUsers } from '@fortawesome/free-solid-svg-icons';
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
    getPrice(cat, min,costAnalytics) {
        console.log('cat',cat)
        console.log('min',min)
        let type = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.type ? this.props.tournamentDetailGlobal.type : ''
        console.log('type',type)
        
        let pointJson = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.pointJson ? this.props.tournamentDetailGlobal.pointJson : []
        let basePriceMin
        let basePriceMax
        if (type == 'category') {
        console.log('type',type)
            pointJson.map((item) => {
                if (item.category == cat) {
                    basePriceMin = item.min
                    basePriceMax = item.max
                } 
                if(costAnalytics) {
                    basePriceMin = item.min
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
        this.props.getTournamentDetailOfAuction()
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
        else if (parseInt(this.props.auctionTournamentPlayerBindAmount) < this.getPrice(playerType, true)) {
            error = true
            this.props.setToast(false, 'Please enter bind amount more then minimum price')
        }
        else if (parseInt(this.props.auctionTournamentPlayerBindAmount) > this.getPrice(playerType, false)) {
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
        //     obj.pointJson = [{ min: this.props.auctionMinPoint, max: this.props.auctionIncreasePoint }]
        // } else if (this.props.auctionType == 'noCategory') {
        //     obj.pointJson = [
        //         { category: 'A', min: this.props.auctionCategoryAMinPoint, max: this.props.auctionCategoryAIncreasePoint },
        //         { category: 'B', min: this.props.auctionCategoryBMinPoint, max: this.props.auctionCategoryBIncreasePoint },
        //         { category: 'C', min: this.props.auctionCategoryCMinPoint, max: this.props.auctionCategoryCIncreasePoint },
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
            if (!this.props.auctionIncreasePoint) {
                error = true
                this.props.setToast(false, 'Please enter max point')
            }
        }
        if (this.props.auctionType == 'category') {
            if (!this.props.auctionCategoryAMinPoint) {
                error = true
                this.props.setToast(false, 'Please enter category A min point')
            }
            if (!this.props.auctionCategoryAIncreasePoint) {
                error = true
                this.props.setToast(false, 'Please enter category A max point')
            } if (!this.props.auctionCategoryBMinPoint) {
                error = true
                this.props.setToast(false, 'Please enter category B min point')
            }
            if (!this.props.auctionCategoryBIncreasePoint) {
                error = true
                this.props.setToast(false, 'Please enter category B max point')
            } if (!this.props.auctionCategoryCMinPoint) {
                error = true
                this.props.setToast(false, 'Please enter category C min point')
            }
            if (!this.props.auctionCategoryCIncreasePoint) {
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
    showCostAnalytics(item,spentAmount ,remainingAmount,totalAmount){
        let basePrice = this.getPrice(this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.type ? this.props.tournamentDetailGlobal.type : 'noCategory', true, true)
        item.basePrice = basePrice ? basePrice :0
        this.props.onChangeValueGlobal({ target: { id: 'globalSelectedTeamId', value: item.teamId } })
        this.props.getUserList()
        this.setState({ costAnalytics: true, selectedTeam: item, spentAmount ,remainingAmount,totalAmount })
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
                            {this.props.loggedInRoleId == 2 && <div className='tournamentDetailBoxAuctionTeam'>
                                <Team player={player}
                                    tournamentDetailGlobal={this.props.tournamentDetailGlobal}
                                    auctionTournamentTeamId={this.props.auctionTournamentTeamId}
                                    auctionTournamentPlayerBindAmount={this.props.auctionTournamentPlayerBindAmount}
                                    onChangeValueGlobal={this.props.onChangeValueGlobal}
                                    addPlayerToTeam={() => this.addPlayerToTeam()}
                                    setToast={this.props.setToast}
                                    next={() => this.next()} />
                            </div>}
                            <div className='detailBox'>
                                <div className='tournamentDetailBoxAuction'>
                                    <div>
                                        {this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams && <div>
                                            <div className='auctionName'> team List</div>
                                        </div>}

                                        <div className="page-wrapper-auction">
                                            {this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams && this.props.tournamentDetailGlobal.teams.length > 0 &&
                                                this.props.tournamentDetailGlobal.teams.map((item) => {
                                                    let totalAmount = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teamPoint ? this.props.tournamentDetailGlobal.teamPoint : 0
                                                    let spentAmount = item.totalSpend ? item.totalSpend : 0
                                                    let remainingAmount = totalAmount - spentAmount
                                                    return (<div className="profile-main-box-auction">
                                                        <div style={{    'display': 'flex', 'justifyContent': 'space-between'}}>
                                                        <div className="profile-box-auction">
                                                            {item.logoUrl ? <img src={item.logoUrl} alt="profile pic" /> :
                                                                <img src={team} alt="profile pic" />}
                                                            <div className='profile-box-textBox'>
                                                                <div className='teamNameAuction'>{item.teamName}</div>
                                                                <span>{item.ownerName}</span><br />
                                                            </div>
                                                            </div>
                                                            <div className='arrowBox'>
                                                            <FontAwesomeIcon icon={faArrowAltCircleRight} size="2x" style={{ color: '#FC8471' }} onClick={() =>  this.showCostAnalytics(item,spentAmount ,remainingAmount,totalAmount)} />
                                                                </div>
                                                        </div>
                                                        <div className='auctionList'>
                                                            <div className='auctionListCol'>
                                                                <div className='auctionListLabel'>  Auction Spent</div>
                                                                <div> {spentAmount}</div>
                                                            </div>
                                                            <div className='auctionListCol'>
                                                                <div  className='auctionListLabel'>Purse Left</div>
                                                                <div>{remainingAmount}</div>
                                                            </div>
                                                            <div className='auctionListCol'>
                                                                <div  className='auctionListLabel'>Players</div>
                                                                <div>{item.totalPlayer ? item.totalPlayer 
                                                                : 0}/{item.teamTotalMember}</div>
                                                            </div>
                                                        </div>
                                                        {/* <div className='profile-detail-auction'>
                                                            <div className='profile-detail-auction-text' title='Total player'><span>Purchased Palyer: </span>{item.totalPlayer}</div>
                                                            <div className='profile-detail-auction-text' title='Spend Point'><span>Spent Point:</span> {spentAmount}</div>
                                                            <div className='profile-detail-auction-text' title='Pending Point'><span>Pending Point:</span> {remainingAmount}</div>
                                                            <div className='profile-detail-auction-text' title='Pending Point'><span>Total Point:</span> {totalAmount}</div>
                                                            <div style={{'display':'flex','justifyContent':'center','padding':'10px'}}> <Button variant="primary" onClick={() => this.showCostAnalytics(item,spentAmount ,remainingAmount,totalAmount)}>Cost analytics</Button></div>

                                                        </div> */}
                                                    </div>
                                                    )
                                                })}
                                        </div>

                                        <hr />

                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <br />
                <br />
                <br />
                <div>
                    <div style={{ 'paddingLeft': '50px' }}>
                        <h2 className='product-title'>Sold Players</h2>
                    </div>
                    <div>
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="main-box clearfix">
                                        <div class="table-responsive">
                                            <table class="table user-list">
                                                <thead>
                                                    <tr>
                                                        <th><span>#</span></th>
                                                        <th><span>Player Name</span></th>
                                                        <th><span>Team Name</span></th>
                                                        <th><span>Sold At</span></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.auctionDetailList && this.props.auctionDetailList.length > 0 && this.props.auctionDetailList.map((item, index) => <tr key={index}>

                                                        <td>
                                                            {index + 1}
                                                        </td><td>
                                                            {item.profilePictureUrl ? <img src={item.profilePictureUrl} alt="" /> : <img src={profile} alt="" />}
                                                            <span class="user-link">{item.playerName}</span>
                                                            <span class="user-subhead">{item.category}</span>
                                                        </td>
                                                        <td>
                                                            {item.logoUrl ? <img src={item.logoUrl} alt="" /> : <img src={team} alt="" />}
                                                            <span class="user-link">{item.name}</span>

                                                        </td>
                                                        <td>
                                                            {item.bidAmount}
                                                        </td>

                                                    </tr>)}

                                                </tbody>
                                            </table>
                                        </div>
                                        <ul class="pagination pull-right">

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AuctionModal
                    title="Add Auction"
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                    onSubmit={() => this.auctionSubmit()}
                    onChangeInput={(evt) => this.props.onChangeValueGlobal(evt)}
                    auctionType={this.props.auctionType}
                    tournamentListGlobalArray={tournamentListGlobalArray}
                />
                <CustomModal
                    title= {this.state.selectedTeam && this.state.selectedTeam.teamName ? this.state.selectedTeam.teamName :'Team Name'}
                    show={this.state.costAnalytics}
                    onHide={() => this.setState({ costAnalytics: false })}
                    onSubmit={() => this.setState({ costAnalytics: !this.state.costAnalytics })}
                    onChangeInput={(evt) => this.props.onChangeValueGlobal(evt)}
                    selectedTeam={this.state.selectedTeam}
                    remainingAmount={this.state.remainingAmount}
                    totalAmount={this.state.totalAmount}
                    spentAmount={this.state.spentAmount}
                    teamPlayerList={this.props.teamPlayerList}
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
        auctionIncreasePoint: state.global.auctionIncreasePoint,
        auctionCategoryAMinPoint: state.global.auctionCategoryAMinPoint,
        auctionCategoryAIncreasePoint: state.global.auctionCategoryAIncreasePoint,
        auctionCategoryBMinPoint: state.global.auctionCategoryBMinPoint,
        auctionCategoryBIncreasePoint: state.global.auctionCategoryBIncreasePoint,
        auctionCategoryCMinPoint: state.global.auctionCategoryCMinPoint,
        auctionCategoryCIncreasePoint: state.global.auctionCategoryCIncreasePoint,
        auctionDetailList: state.global.auctionDetailList,
        teamPlayerList: state.global.teamPlayerList,



    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTournamentList: () => dispatch(getTournamentList()),
        getTournamentDetails: () => dispatch(getTournamentDetails()),
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        getUserList: (evt) => dispatch(getUserList(evt)),
        getAuctionPlayer: (evt) => dispatch(getAuctionPlayer(evt)),
        getTournamentDetailOfAuction: (evt) => dispatch(getTournamentDetailOfAuction(evt)),

        addPlayerToTeam: (evt) => dispatch(addPlayerToTeam(evt)),
        setToast: (success, message) => dispatch(setToast(success, message)),
        resetToast: (evt) => dispatch(resetToast(evt)),
        createAuction: (evt) => dispatch(createAuction(evt)),
        resetAuction: (evt) => dispatch(resetAuction(evt)),


    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Auction);
