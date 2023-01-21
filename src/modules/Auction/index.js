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
import CongratulationsModal from './CongratulationsModal'

import profile from '../../images/profile.jpg'

import { getTournamentList, onChangeValueAuction, onChangeValueGlobal, getUserList, getAuctionPlayer, getTournamentDetailOfAuction, addPlayerToTeam, setToast, resetToast, createAuction, resetAuction, unSoldPlayer, editPlayerToTeam, getUnsoldPlayer } from '../Global/actions';
import PropTypes from 'prop-types';
import './style.css';
import { faArrowAltCircleRight, faBalanceScale, faCalendarDay, faMoneyBill, faUsers } from '@fortawesome/free-solid-svg-icons';
import { iteratee } from 'lodash';
import EditModal from '../../components/EditModal'
import { getTournamentDetails } from './actions';
import team from '../../images/team.jpg'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// let MyPromise = require('bluebird');
import confetti from 'canvas-confetti';
// confetti.Promise = MyPromise;
export class Auction extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedItem: false,
            editModal: false,
            typing: false,
            click: 0,
            showCongratulationsModal: false,
            showCongCalled: false
        }
        this.sortingIcon = this.sortingIcon.bind(this);
    }
    getPrice(cat, min, costAnalytics) {
        let type = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.type ? this.props.tournamentDetailGlobal.type : ''
        let pointJson = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.pointJson ? this.props.tournamentDetailGlobal.pointJson : []
        let basePriceMin
        let basePriceMax
        if (pointJson && pointJson.length > 0)
        pointJson.sort((a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0))

        if (type == 'category') {
            pointJson.map((item) => {
                if (item.category == cat) {
                    basePriceMin = item.min
                    basePriceMax = item.max
                }
                if (costAnalytics) {
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
        this.props.getUnsoldPlayer()
        window.scrollTo(0, 0)
    }
    componentDidUpdate(){
        if(!this.state.showCongCalled && this.state.showCongratulationsModal){
                this.showCong()
                this.setState({showCongCalled: true})
        }
    }
    next() {
        this.props.getAuctionPlayer()
    }
    unSoldPlayer() {
        this.props.unSoldPlayer()
    }
    showCong() {
        console.log('my-canvas')
        var end = Date.now() + (15 * 1000);
        var duration = 15 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        
        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }
        
        var interval = setInterval(function() {
          var timeLeft = animationEnd - Date.now();
        
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
          var canvas = document.getElementById('myCanvas');
          console.log('my-canvas',canvas)
          document.getElementById('myCanvas').style.zIndex = 10000;  
          // you should  only initialize a canvas once, so save this function
          // we'll save it to the canvas itself for the purpose of this demo
          canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true });
          var particleCount = 50 * (timeLeft / duration);
          // since particles fall down, start a bit higher than random
          let val1 = Math.random() * (0.3 - 0.1) + 0.1; 
          let val2 = Math.random() * (0.9 - 0.7) + 0.7; 
          canvas.confetti(Object.assign({}, defaults, { particleCount, origin: { x: val1, y: Math.random() - 0.2 } }));
          canvas.confetti(Object.assign({}, defaults, { particleCount, origin: { x: val2, y: Math.random() - 0.2 } }));
        }, 250);
        // go Buckeyes!
        var colors = ['#bb0000', '#ffffff'];
    
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
          });
        
   
    }
    addPlayerToTeam(playerType) {
        let teamList = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams && this.props.tournamentDetailGlobal.teams.length > 0 ? this.props.tournamentDetailGlobal.teams : []
        let totalAmount = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teamPoint ? this.props.tournamentDetailGlobal.teamPoint : 0
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
        } else if (this.props.auctionTournamentTeamId) {
            if (teamList && teamList.length > 0) {
                teamList.map((item) => {
                    if (item.teamId == this.props.auctionTournamentTeamId) {
                        let spentAmount = item.totalSpend ? item.totalSpend : 0
                        let remainingAmount = totalAmount - spentAmount
                        if (parseInt(this.props.auctionTournamentPlayerBindAmount) > parseInt(remainingAmount)) {
                            this.props.setToast(false, 'Please enter bind amount less then team remaining amount ie. ' + parseInt(remainingAmount))
                        }
                    }
                })
            }
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
    componentWillReceiveProps(nextprops){
        if (nextprops.showCongratulationsModal && !this.state.showCongratulationsModal) {
            this.setState({ showCongratulationsModal: true })
            this.props.onChangeValueGlobal({ target: { id: 'showCongratulationsModal', value: false } })
        }
    }
    showCostAnalytics(item, spentAmount, remainingAmount, totalAmount) {
        let basePrice = this.getPrice(this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.type ? this.props.tournamentDetailGlobal.type : 'noCategory', true, true)
        let pointJson = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.pointJson ? this.props.tournamentDetailGlobal.pointJson : []
        let clubId = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.clubId ? this.props.tournamentDetailGlobal.clubId : null
        item.basePrice = basePrice ? basePrice : 0
        item.pointJson = pointJson
        console.log("clubId====", clubId)
        this.props.onChangeValueGlobal({ target: { id: 'globalSelectedTeamId', value: item.teamId } })
        this.props.onChangeValueGlobal({ target: { id: 'globalSelectedPlayerClubId', value: clubId } })
        this.props.getUserList()
        this.setState({ costAnalytics: true, selectedTeam: item, spentAmount, remainingAmount, totalAmount })
    }
    editBid(item) {
        let teamList = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams && this.props.tournamentDetailGlobal.teams.length > 0 ? this.props.tournamentDetailGlobal.teams : []
        let teamListArray = []
        if (teamList && teamList.length > 0) {
            teamList.map((item) => {
                teamListArray.push({
                    value: item.teamId,
                    label: item.teamName,
                    totalSpend: item.totalSpend
                })
            })
        }
        let data = [{
            key: 'name',
            label: 'name',
            type: 'text',
            value: item.playerName
        },
        {
            key: 'teamId',
            label: 'Team',
            type: 'select',
            value: item.teamId,
            data: teamListArray,
            required: true
        },
        {
            key: 'bidAmount',
            label: 'Bid Amount',
            type: 'text',
            value: item.bidAmount,
            required: true
        },
        {
            key: 'playerUserId',
            value: item.playerId,
        },

        {
            key: 'tournamentId',
            value: item.tournamentId,
        },

        {
            key: 'prevTeamId',
            value: item.teamId,
        },
        {
            key: 'requestId',
            value: item.requestId,
        },


        ]
        this.props.onChangeValueGlobal({ target: { id: 'seletedBidEdit', value: data } })

        this.setState({ editModal: true, seletedBidEdit: data })

    }
    onChangeValueAuction(evt) {
        console.log(evt)
        this.setState({ typing: !this.state.typing })
        this.props.onChangeValueAuction(evt)
    }
    editBidSubmit() {
        this.setState({ typing: !this.state.typing })
        this.props.editPlayerToTeam()
        this.setState({ editModal: false })
    }
    onSorting(key, sortBy) {
        if (sortBy == 0) {
            this.setState({ click: 1, sort: key })
        } else if (sortBy == 1) {
            this.setState({ click: 2, sort: key })
        } else if (sortBy == 2) {
            this.setState({ click: 0, sort: key })
        }
    }
    sortingIcon() {
        if (this.state.click == 1) {
            return <i class="bi bi-sort-up"></i>
        } else if (this.state.click == 2) {
            return <i class="bi bi-sort-down"></i>
        } else {
            return ''
        }
    }
    renderUiSoldPlayer(soldPlayerList) {
        return (<div>
            <div style={{ 'paddingLeft': '50px'}}>
                <h2 className='product-title'>Sold Players</h2>
                <Button variant="primary" onClick={() => this.props.getTournamentDetailOfAuction()} >Refresh</Button>
            </div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="main-box clearfix">
                                <div class="table-responsive">
                                    <table class="table user-list">
                                        <thead>
                                            <tr>
                                                <th className='mouse' onClick={() => this.onSorting('#', this.state.click)}><span>#</span></th>
                                                <th className='mouse' onClick={() => this.onSorting('playerName', this.state.click)}><span>Player Name{this.state.sort == 'playerName' && this.state.click > 0 ? this.sortingIcon() : ''} </span></th>
                                                <th className='mouse' onClick={() => this.onSorting('name', this.state.click)}><span>Team Name{this.state.sort == 'name' && this.state.click > 0 ? this.sortingIcon() : ''}  </span></th>
                                                <th className='mouse' onClick={() => { this.onSorting('bidAmount', this.state.click) }}><span>Sold At {this.state.sort == 'bidAmount' && this.state.click > 0 ? this.sortingIcon() : ''}  </span></th>
                                                {this.props.loggedInRoleId == 2 && <th><span>Edit</span></th>}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {soldPlayerList && soldPlayerList.length > 0 && soldPlayerList.map((item, index) => <tr key={index}>
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
                                                {this.props.loggedInRoleId == 2 && <td>
                                                    <a href="#" onClick={() => this.editBid(item)} className='btn btn-warning'>Edit</a>

                                                </td>}

                                            </tr>)}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>)
    }
    renderUiUnSoldPlayer(soldPlayerList) {
        return (<div>
            <div style={{ 'paddingLeft': '50px'}}>
                <h2 className='product-title'>Un Sold Players</h2>
                <Button variant="primary" onClick={() => this.props.getUnsoldPlayer()()} >Refresh</Button>
            </div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="main-box clearfix">
                                <div class="table-responsive">
                                    <table class="table user-list">
                                        <thead>
                                            <tr>
                                                <th className='mouse' onClick={() => this.onSorting('#', this.state.click)}><span>#</span></th>
                                                <th className='mouse' onClick={() => this.onSorting('playerName', this.state.click)}><span>Player Name{this.state.sort == 'playerName' && this.state.click > 0 ? this.sortingIcon() : ''} </span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {soldPlayerList && soldPlayerList.length > 0 && soldPlayerList.map((item, index) => <tr key={index}>
                                                <td>
                                                    {index + 1}
                                                </td><td>
                                                    {item.profilePictureUrl ? <img src={item.profilePictureUrl} alt="" /> : <img src={profile} alt="" />}
                                                    <span class="user-link">{item.playerName}</span>
                                                    <span class="user-subhead">{item.category}</span>
                                                </td>
                                            </tr>)}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>)
    }
    render() {
        let tournamentListGlobal = this.props.tournamentListGlobal && this.props.tournamentListGlobal.length > 0 ? this.props.tournamentListGlobal : []
        let tournamentListGlobalArray = []
        let teamList = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams && this.props.tournamentDetailGlobal.teams.length > 0 ? this.props.tournamentDetailGlobal.teams : []
        let teamIndex = teamList.findIndex((i)=>i.teamId == this.props.auctionSoldToTeam)
        let selectedTeam  = teamIndex >= 0 ? teamList[teamIndex] : false
        if (tournamentListGlobal && tournamentListGlobal.length > 0) {
            tournamentListGlobal.map((item) => {
                tournamentListGlobalArray.push({
                    value: item.id,
                    label: item.name,
                })
            })
        }

        let playerList = this.props.auctionPlayer
        let unSoldPlayerList =  this.props.auctionUnSoldPlayerList
        var player = playerList[Math.floor(Math.random() * playerList.length)];
        let soldPlayerCount = this.props.auctionDetailList ? this.props.auctionDetailList.length : 0;
        let soldPlayerList = this.props.auctionDetailList
        if (this.state.sort && this.state.click) {
            if (this.state.sort == 'bidAmount') {
                if (this.state.click == 1)
                    soldPlayerList.sort((a, b) => parseFloat(a[this.state.sort]) - parseFloat(b[this.state.sort]));
                if (this.state.click == 2)
                    soldPlayerList.sort((a, b) => parseFloat(b[this.state.sort]) - parseFloat(a[this.state.sort]));
            } else {
                if (this.state.click == 1)
                    soldPlayerList.sort((a, b) => { if (a[this.state.sort] < b[this.state.sort]) { return -1; } if (a[this.state.sort] > b[this.state.sort]) { return 1; } return 0; })
                if (this.state.click == 2)
                    soldPlayerList.sort((a, b) => { if (a[this.state.sort] > b[this.state.sort]) { return -1; } if (a[this.state.sort] < b[this.state.sort]) { return 1; } return 0; })
            }
        }
        if (this.state.sort && this.state.click) {
            if (this.state.click == 1)
                unSoldPlayerList.sort((a, b) => { if (a[this.state.sort] < b[this.state.sort]) { return -1; } if (a[this.state.sort] > b[this.state.sort]) { return 1; } return 0; })
            if (this.state.click == 2)
                unSoldPlayerList.sort((a, b) => { if (a[this.state.sort] > b[this.state.sort]) { return -1; } if (a[this.state.sort] < b[this.state.sort]) { return 1; } return 0; })
        }
        return (


            <section className="compMain">
                <div id="root">
                    <div className='container-fluid'>
                        {this.props.tournamentDetailGlobal && <div className='auctionHeader'>

                            <div className='auctionName'>       {this.props.tournamentDetailGlobal.name}</div>
                            <div className='auctionName'>       Total Team:  {this.props.tournamentDetailGlobal.teamTotal}</div>
                            <div className='auctionName'>       Total Member:  {this.props.tournamentDetailGlobal.memberTotal}</div>
                            <div className='auctionName'>       Sold Player:  {soldPlayerCount}</div>
                            <div className='auctionName'>       Un-Sold Player:  {this.props.tournamentDetailGlobal.memberTotal - soldPlayerCount}</div>
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
                                    unSoldPlayer={() => this.unSoldPlayer()}
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
                                                        <div style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
                                                            <div className="profile-box-auction">
                                                                {item.logoUrl ? <img src={item.logoUrl} alt="profile pic" /> :
                                                                    <img src={team} alt="profile pic" />}
                                                                <div className='profile-box-textBox'>
                                                                    <div className='teamNameAuction'>{item.teamName}</div>
                                                                    <span>{item.ownerName}</span><br />
                                                                </div>
                                                            </div>
                                                            <div className='arrowBox'>
                                                                <FontAwesomeIcon icon={faArrowAltCircleRight} size="2x" style={{ color: '#FC8471' }} onClick={() => this.showCostAnalytics(item, spentAmount, remainingAmount, totalAmount)} />
                                                            </div>
                                                        </div>
                                                        <div className='auctionList'>
                                                            <div className='auctionListCol'>
                                                                <div className='auctionListLabel'>  Auction Spent</div>
                                                                <div> {spentAmount}</div>
                                                            </div>
                                                            <div className='auctionListCol'>
                                                                <div className='auctionListLabel'>Purse Left</div>
                                                                <div>{remainingAmount}</div>
                                                            </div>
                                                            <div className='auctionListCol'>
                                                                <div className='auctionListLabel'>Players</div>
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
                    <Tabs defaultActiveKey="soldPlayer" id="uncontrolled-tab-example" className="mb-3 tabDiv">
                        <Tab eventKey="soldPlayer" title="Sold Players">
                          {this.renderUiSoldPlayer(soldPlayerList)}
                        </Tab>
                        <Tab eventKey="unSoldPlayer" title="Un-Sold Players">
                          {this.renderUiUnSoldPlayer(unSoldPlayerList)}
                        </Tab>
                    </Tabs>
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
                    title={this.state.selectedTeam && this.state.selectedTeam.teamName ? this.state.selectedTeam.teamName : 'Team Name'}
                    show={this.state.costAnalytics}
                    onHide={() => this.setState({ costAnalytics: false })}
                    onSubmit={() => this.setState({ costAnalytics: !this.state.costAnalytics })}
                    onChangeInput={(evt) => this.props.onChangeValueGlobal(evt)}
                    selectedTeam={this.state.selectedTeam}
                    remainingAmount={this.state.remainingAmount}
                    totalAmount={this.state.totalAmount}
                    spentAmount={this.state.spentAmount}
                    teamPlayerList={this.props.teamPlayerList}
                    pointJson = {this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.pointJson ? this.props.tournamentDetailGlobal.pointJson : []}
                />
                <CongratulationsModal
                    title={'CONGRATULATIONS'}
                    show={this.state.showCongratulationsModal}
                    onHide={() => {
                        this.props.onChangeValueGlobal({ target: { id: 'auctionSoldPlayer', value:false } })
                        this.props.onChangeValueGlobal({ target: { id: 'auctionSoldToTeam', value: false } })   
                        this.setState({ showCongratulationsModal: false, showCongCalled: false })}}
                    onChangeInput={(evt) => this.props.onChangeValueGlobal(evt)}
                    showCongCalled={this.state.showCongCalled}
                    showCong={()=>this.showCong}
                    player={this.props.auctionSoldPlayer}
                    team={selectedTeam}

                />
                
                <EditModal
                    title={"Edit Auction"}
                    show={this.state.editModal}
                    onHide={() => this.setState({ editModal: false })}
                    onSubmit={() => this.editBidSubmit()}
                    feildObj={this.props.seletedBidEdit}
                    uploadPhoto={this.props.uploadPhoto}
                    onChangeInput={(evt) => this.onChangeValueAuction(evt)}
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
        auctionUnSoldPlayerList: state.global.auctionUnSoldPlayerList,
        seletedBidEdit: state.global.seletedBidEdit,
        auctionSoldPlayer: state.global.auctionSoldPlayer,
        auctionSoldToTeam: state.global.auctionSoldToTeam,
        showCongratulationsModal: state.global.showCongratulationsModal,

        


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
        unSoldPlayer: (evt) => dispatch(unSoldPlayer(evt)),
        onChangeValueAuction: (evt) => dispatch(onChangeValueAuction(evt)),
        editPlayerToTeam: (evt) => dispatch(editPlayerToTeam(evt)),
        getUnsoldPlayer: (evt) => dispatch(getUnsoldPlayer(evt)),
        


    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Auction);
