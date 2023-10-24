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
import TeamFull from './teamFull';
import nodata from '../../images/nodata.jpg'

import AuctionModal from '../../components/AuctionModal'
import CustomModal from './CustomModal'
import CongratulationsModal from './CongratulationsModal'
import Modal from 'react-bootstrap/Modal'

import profile from '../../images/profile.jpg'
import adImagae from '../../images/1229.png'

import { getTournamentList, onChangeValueAuction, onChangeValueGlobal, getUserList, getAuctionPlayer, getTournamentDetailOfAuction, addPlayerToTeam, setToast, resetToast, createAuction, resetAuction, unSoldPlayer, editPlayerToTeam, getUnsoldPlayer } from '../Global/actions';
import PropTypes from 'prop-types';
import './style.css';
import './glitch.css';
import { faArrowAltCircleRight, faExpand, faCompress, faArrowLeft, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import SportzMitra from '../../images/SportzMitra.png'
import sponsor from '../../images/sponsor.png'

import { head, iteratee } from 'lodash';
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
            showFilter: false,
            showCongCalled: false,
            filterType: false,
            showTabs: this.props.auctionTeamList ? this.props.auctionTeamList : false
        }
        this.sortingIcon = this.sortingIcon.bind(this);
    }
    getPrice(cat, min, costAnalytics) {
        let type = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.type ? this.props.tournamentDetailGlobal.type : ''
        let pointJson = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.pointJson ? this.props.tournamentDetailGlobal.pointJson : []
        let basePriceMin
        let basePriceMax
        if (pointJson && pointJson.length > 0)
            pointJson.sort((a, b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0))

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
    componentDidUpdate() {
        if (!this.state.showCongCalled && this.state.showCongratulationsModal) {
            this.showCong()
            this.setState({ showCongCalled: true })
        }
    }
    next() {
        this.props.getAuctionPlayer()
        this.props.getUnsoldPlayer()
        this.props.getTournamentDetailOfAuction()
    }
    unSoldPlayer() {
        this.props.unSoldPlayer()
        this.props.getTournamentDetailOfAuction()
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

        var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            var canvas = document.getElementById('myCanvas');
            console.log('my-canvas', canvas)
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
                        totalAmount = item.topUpAmount ? parseInt(totalAmount) + parseInt(item.topUpAmount) : 0
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
    componentWillReceiveProps(nextprops) {
        if (nextprops.showCongratulationsModal && !this.state.showCongratulationsModal) {
            this.setState({ showCongratulationsModal: true })
            this.props.onChangeValueGlobal({ target: { id: 'showCongratulationsModal', value: false } })
        }
    }
    componentWillUnmount() {
        // this.props.onChangeValueGlobal({ target: { id: 'auctionFullScreen', value: false } })

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
    resetButton() {
        this.props.onChangeValueGlobal({ target: { id: 'auctionPlayerSearch', value: false } });
        this.props.onChangeValueGlobal({ target: { id: 'auctionPlayerFilterType', value: false } });
        this.props.onChangeValueGlobal({ target: { id: 'auctionPlayerFilterCategory', value: false } });
        this.setState({ showFilter: false, filterType: false })
        this.props.getAuctionPlayer();
    }
    teamDetails(item, spentAmount, remainingAmount, totalAmount) {
        console.log(item, spentAmount, remainingAmount, totalAmount)
        this.props.onChangeValueGlobal({ target: { id: 'auctionTeamDetail', value: item } });
        this.props.onChangeValueGlobal({ target: { id: 'auctionFullScreen', value: true } });
        
        history.push('/teamDetails')

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
    renderTeamList() {
        return (
            <div className='detailBox'>
                <div className='tournamentDetailBoxAuction'>
                    <div>
                        {this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams && <div style={{
                            display: 'flex', justi
                                : 'center', alignItems: 'center'
                        }}>
                            <div className='auctionName'> team List</div>
                            <div style={{ marginLeft: 10 }}><Button variant="primary" onClick={() => { this.props.getTournamentList() }} >Refresh</Button></div>
                        </div>}

                        <div className="page-wrapper-auction">
                            {this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams && this.props.tournamentDetailGlobal.teams.length > 0 &&
                                this.props.tournamentDetailGlobal.teams.map((item) => {
                                    let totalAmount = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teamPoint ? this.props.tournamentDetailGlobal.teamPoint : 0
                                    let spentAmount = item.totalSpend ? item.totalSpend : 0
                                    console.log('totalAmount before', totalAmount)
                                    console.log('item.topUpAmount', item)

                                    totalAmount = item.topUpAmount ? totalAmount + item.topUpAmount : totalAmount
                                    console.log('totalAmount after', totalAmount)

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
                                                <FontAwesomeIcon icon={faExpand} size="2x" style={{ color: '#FC8471' }} onClick={() => this.teamDetails(item, spentAmount, remainingAmount, totalAmount)} />
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
        )
    }
    renderUiSoldPlayer(soldPlayerList) {
        return (<div>
            <div style={{ 'paddingLeft': '50px', paddingLeft: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <h2 className='product-title'>Sold Players</h2>
                <Button variant="primary" onClick={() => this.props.getTournamentDetailOfAuction()} >Refresh</Button>
            </div>
            <div class="container tableBox">
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
    toggleFullSceen = (fullscreen) => {

        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };
    renderUiUnSoldPlayer(soldPlayerList) {
        return (<div>
            <div style={{ 'paddingLeft': '50px', paddingLeft: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <h2 className='product-title'>Un Sold Players</h2>
                <Button variant="primary" onClick={() => this.props.getUnsoldPlayer()()} >Refresh</Button>
            </div>
            <div class="container tableBox">
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
        console.log(this.props,'this.props.===')

        let tournamentListGlobal = this.props.tournamentListGlobal && this.props.tournamentListGlobal.length > 0 ? this.props.tournamentListGlobal : []
        let tournamentListGlobalArray = []
        let teamList = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams && this.props.tournamentDetailGlobal.teams.length > 0 ? this.props.tournamentDetailGlobal.teams : []
        let teamIndex = teamList.findIndex((i) => i.teamId == this.props.auctionSoldToTeam)
        let selectedTeam = teamIndex >= 0 ? teamList[teamIndex] : false
        if (tournamentListGlobal && tournamentListGlobal.length > 0) {
            tournamentListGlobal.map((item) => {
                tournamentListGlobalArray.push({
                    value: item.id,
                    label: item.name,
                })
            })
        }

        let playerList = this.props.auctionPlayer
        let unSoldPlayerList = this.props.auctionUnSoldPlayerList
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
        console.log('this.props.auctionFullScreen ', this.props.auctionFullScreen)
        var w = window.innerWidth;
        var h = window.innerHeight;
        let team = '';
        if (teamList && teamList.length > 0) {
            teamList.map((item) => {
                if (this.props.auctionTournamentTeamId == item.teamId) team = item
            })
        }
        return (


            <section className="compMain1">
                <div id="root">
                    <div className='container-fluid'>
                        <div style={{height:'10%'}}>

        
                        {this.props.tournamentDetailGlobal && <div className='auctionHeader'>
                            <Button variant="secondary" onClick={() => this.setState({ showFilter: !this.state.showFilter })}>
                                <i className="fa fa-search"></i>
                            </Button>
                            <div className='auctionName'>       Total Team:  {this.props.tournamentDetailGlobal.teamTotal}</div>
                            <div className='auctionName'>       Total Member:  {this.props.tournamentDetailGlobal.memberTotal}</div>
                            <div className='auctionName'>       Sold Player:  {soldPlayerCount}</div>
                            <div className='auctionName'>       Un-Sold Player:  {this.props.tournamentDetailGlobal.memberTotal - soldPlayerCount}</div>
                        </div>}
                        <div className='auctionLogoName'>       {this.props.tournamentDetailGlobal.name}</div>
                        </div>
                        {this.props.auctionFullScreen && !this.state.showTabs && <div>
                            <div className="two">
                                <ul class="circles">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                {player && <div className='auctionDetailBox'>
                                    <div style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
                                        <div className='playerProfileImgBoxFullScreen'>
                                            <div className='playerImgBoxFullscreen'>
                                                <div>
                                                    {/* {player.profilePictureUrl ? <img src={player.profilePictureUrl} alt="shoe image" /> : <img src={profile} />} */}
                                                    <figure>
                                                        {player.profilePictureUrl ? <img src={player.profilePictureUrl} alt="shoe image" className='profilePic'/> : <img src={profile} />}
                                                    </figure>
                                                </div>
                                            </div>
                                            <div className='playerNameBox'>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <div className='auctionPlayerName'>
                                                        Base Point  {this.getPrice(player.playerType, true)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='playerProfileStats'>
                                        <div class="product-content">
                                            <div class="product-detail">
                                                <div>
                                                    <div className='auctionPlayerNameFullscreen'>
                                                        {player.playerName} <br />
                                                    </div>

                                                </div>
                                                <ul>
                                                    <li>Type: <span>{player.playerType}</span></li>
                                                    <li>Category: <span>{player.category}</span></li>
                                                    <li>Total Matches: <span>{player.totalMatches ? player.totalMatches : 0}</span></li>
                                                    <li>Last Bid Price: <span>{player.lastBidAmount ? player.lastBidAmount : 0}</span></li>
                                                    <li>Location: <span>{player.location}</span></li>
                                                    {player.url && <a href={player.url} target='blank' className="btn btn-primary">View Crichero Profile</a>}
                                                </ul>
                                                <h2>about Player: </h2>
                                                {player.bio && <p className='aboutUs'> {player.bio}</p>}
                                            </div>
                                        </div>
                                        <div>
                                            <div className='auctionTeamNameFullscreen'>
                                                {team && team.teamName ? team.teamName : "Bid Amount"} : {this.props.auctionTournamentPlayerBindAmount}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ height: 500, width: 300, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                        {this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.sponsorUrl ? <img src={this.props.tournamentDetailGlobal.sponsorUrl} alt="profile pic" style={{ height: '100%', width: 'auto' }} /> :
                                            <img src={sponsor} alt="profile pic" style={{ height: '100%', width: 'auto' }} />}
                                    </div>
                                </div>}
                                {!this.state.showTabs && !player &&<div className="blogSlider">

                                    <div className='noDataFound'>
                                        <div className='imgBox'>
                                            <img src={nodata} />
                                        </div><b>NO NEW PLAYER</b></div> </div>}

                            </div>
                            <div className="three">
                                <TeamFull player={player}
                                    tournamentDetailGlobal={this.props.tournamentDetailGlobal}
                                    auctionTournamentTeamId={this.props.auctionTournamentTeamId}
                                    auctionTournamentPlayerBindAmount={this.props.auctionTournamentPlayerBindAmount}
                                    onChangeValueGlobal={this.props.onChangeValueGlobal}
                                    addPlayerToTeam={() => this.addPlayerToTeam()}
                                    toggleFullSceen={() => this.toggleFullSceen(this.props.auctionFullScreen)}
                                    auctionFullScreen={this.props.auctionFullScreen}
                                    setToast={this.props.setToast}
                                    unSoldPlayer={() => this.unSoldPlayer()}
                                    showTabs={() =>{ this.setState({ showTabs: true })
                                    this.props.onChangeValueGlobal({ target: { id: 'auctionTeamList', value: true } })
                                
                                }}
                                    next={() => this.next()} />
                            </div>
                        </div>}
                    </div>
                </div>
                {this.state.showTabs && <div>
                    <div style={{
                        padding: 10, backgroundColor: '#50ac00', cursor: 'pointer', zIndex: 2, position: 'fixed', borderRadius: '4px', top:'24%', left: 5, height: 25, width: 25,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} onClick={() => {
                        this.props.onChangeValueGlobal({ target: { id: 'auctionTeamList', value: false } })
                        this.setState({ showTabs: false })
                    }}>
                        <FontAwesomeIcon icon={faArrowLeft} style={{ color: '#FFFFFF', cursor: 'pointer' }} />
                    </div>
                    <br />
                    <Tabs defaultActiveKey="teamList" id="uncontrolled-tab-example" className="mb-3 tabDiv">
                        <Tab eventKey="teamList" title="Team List">
                            {this.renderTeamList(soldPlayerList)}
                        </Tab><Tab eventKey="soldPlayer" title="Sold Players">
                            {this.renderUiSoldPlayer(soldPlayerList)}
                        </Tab>
                        <Tab eventKey="unSoldPlayer" title="Un-Sold Players">
                            {this.renderUiUnSoldPlayer(unSoldPlayerList)}
                        </Tab>
                    </Tabs>
                </div>}
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
                    pointJson={this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.pointJson ? this.props.tournamentDetailGlobal.pointJson : []}
                    type={this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.type ? this.props.tournamentDetailGlobal.type : 'category'}
                />
                <CongratulationsModal
                    title={'CONGRATULATIONS'}
                    show={this.state.showCongratulationsModal}
                    onHide={() => {
                        this.props.onChangeValueGlobal({ target: { id: 'auctionSoldPlayer', value: false } })
                        this.props.onChangeValueGlobal({ target: { id: 'auctionSoldToTeam', value: false } })
                        this.setState({ showCongratulationsModal: false, showCongCalled: false })
                    }}
                    onChangeInput={(evt) => this.props.onChangeValueGlobal(evt)}
                    showCongCalled={this.state.showCongCalled}
                    showCong={() => this.showCong}
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
                <Modal
                    show={this.state.showFilter}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Filter
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="form-outline mb-4">
                                <label className="form-label capitalize" htmlFor="form3Example3">Search</label>
                                <input type="text" id="Search"
                                    value={this.props.clubSearch}
                                    onChange={(e) => { this.props.onChangeValueGlobal({ target: { id: 'auctionPlayerSearch', value: e.target.value } }) }}
                                    className='form-control form-control-lg'
                                    placeholder={"Search..."} />
                            </div>
                            {this.props.tournamentDetailGlobal && <div className="form-outline mb-4">
                                <label className="form-label capitalize" htmlFor="form3Example3">Select category</label>
                                <select className="form-control"
                                    value={this.props.auctionPlayerFilterCategory}
                                    onChange={(e) => {
                                        this.props.onChangeValueGlobal({ target: { id: 'auctionPlayerFilterCategory', value: e.target.value } })
                                    }}>
                                    <option value={false}>Select Category</option>
                                    {this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.pointJson.map((item) => <option value={item.category}>{item.category}</option>)}
                                </select>
                            </div>}
                            <div className="form-outline mb-4">
                                <label className="form-label capitalize" htmlFor="form3Example3">Select Type</label>
                                <div style={{ display: 'flex', marginTop: 10, justifyContent: 'space-evenly' }}>
                                    <div>
                                        <a target='blank' className={this.props.auctionPlayerFilterType == "sold" ? "btn btn-primary" : "btn-disable"} onClick={() => { this.props.onChangeValueGlobal({ target: { id: 'auctionPlayerFilterType', value: 'sold' } }) }}>Sold</a>
                                    </div>
                                    <div>
                                        <a target='blank' className={this.props.auctionPlayerFilterType == "unSold" ? "btn btn-primary" : "btn-disable"} onClick={() => { this.props.onChangeValueGlobal({ target: { id: 'auctionPlayerFilterType', value: 'unSold' } }); }}>Un-Sold</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { this.props.getAuctionPlayer(); this.setState({ showFilter: false }) }}>Submit</Button>
                        <Button className="btn-danger" onClick={() => { this.resetButton() }}>Reset</Button>
                        <Button onClick={() => this.setState({ showFilter: false })}>Close</Button>
                    </Modal.Footer>
                </Modal>
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
        auctionPlayerFilterType: state.global.auctionPlayerFilterType,
        auctionPlayerFilterCategory: state.global.auctionPlayerFilterCategory,
        auctionFullScreen: state.global.auctionFullScreen,
        auctionTeamList: state.global.auctionTeamList,
        


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
