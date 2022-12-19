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
import AuctionModal from '../../components/AuctionModal'
import EditAuctionModal from '../../components/EditAuctionModal'

import roleInfo from '../utils/roleInfo';
import nodata from '../../images/nodata1.jpg'
import profile from '../../images/profile.jpg'

import { getTournamentList, onChangeValueGlobal, getAuctionPlayer, addPlayerToTeam, setToast, resetToast, createAuction, resetAuction } from '../Global/actions';
import PropTypes from 'prop-types';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { iteratee } from 'lodash';
import EditModal from '../../components/EditModal'
import team from '../../images/team.jpg'

export class AuctionList extends React.PureComponent {
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
        this.props.resetAuction()
        this.props.onChangeValueGlobal({ target: { id: 'auctionPending', value: false } })
        this.props.getTournamentList()
        window.scrollTo(0, 0)
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
        } else if (new Date(this.props.auctionType).valueOf()  <= new Date().valueOf() ) {
            error = true
            this.props.setToast(false, 'Please enter future auction date')
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
                this.props.setToast(false, 'Please enter Base point')
            }
        }
        if (this.props.auctionType == 'category') {
            if (!this.props.auctionCategoryAMinPoint) {
                error = true
                this.props.setToast(false, 'Please enter category A Base point')
            }
           if (!this.props.auctionCategoryBMinPoint) {
                error = true
                this.props.setToast(false, 'Please enter category B Base point')
            }
             if (!this.props.auctionCategoryCMinPoint) {
                error = true
                this.props.setToast(false, 'Please enter category C Base point')
            }
        }
        if (!error) {
            console.log('rrr')
            this.props.createAuction()
            this.props.onChangeValueGlobal({ target: { id: 'auctionPending', value: false } })
            this.props.getTournamentList()
            this.setState({ showModal: false, editModal:false })
        }
    
    }

    auctionUi(item) {
        let request = item.approved == 0 && item.playerId
        let name = item.firstName + " " + item.lastName
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        let initials = [...name.matchAll(rgx)] || [];
        initials = (
            (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();
        return (
            <div className="col-md-6 col-lg-3 item league"  key={item.id}>

            <div className="box">
            {item.logoUrl ? <img className="rounded-circle" src={item.logoUrl} alt={item.name} data-letters="MN"/>
                : <img className="rounded-circle" src={profile} alt={item.name}/>}

                <h3 className="name">{item.firstName} {item.lastName}</h3>
                <div className="text-left"> <span className="font-weight-bolder">  {item.name}</span></div>
                <div className="text-left"><span className="font-weight-bolder">Member Total:</span> <span className="team-text"> {item.memberTotal}</span></div>
                <div className="text-left"><span className="font-weight-bolder">TeamTotal :</span> <span className="team-text"> {item.teamTotal}</span></div>
                <div className="text-left"><span className="font-weight-bolder">Venue :</span> <span className="team-text"> {item.venue}</span></div>
                
                <div className="text-left"><span className="font-weight-bolder">Auction Date :</span> <span className="team-text"> {formatDate(item.auctionDate)}</span></div>
                {/* <div className="text-left"><span className="font-weight-bolder">Start Date :</span> <span className="team-text"> {formatDate(item.startDate)}</span></div> */}
                {/* <div className="text-left"><span className="font-weight-bolder">EndDate :</span> <span className="team-text"> {formatDate(item.endDate)}</span></div> */}
                <div className="btn-wrap"><a className="btn-detail" onClick={() => this.detailAuction(item)}>Details</a></div>
                <div className="btn-wrap"><a className="btn-detail" onClick={() => this.actionAuction(item)}>Edit</a></div>
                
            </div>

        </div>
        )
    }
    detailAuction(item){
        this.props.resetAuction()
        this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentId', value: item.id } })
        this.props.getTournamentList()
        if(this.props.loggedInRoleId == 2){
            this.props.getAuctionPlayer()
        }
        history.push('/auction')
    }
    actionAuction(data){
        let tournamentList =[]
            tournamentList.push({
                value: data.id,
                label: data.name,
            })
            this.setState({tournamentList:tournamentList})
        this.props.onChangeValueGlobal({ target: { id: 'auctionCreateTournamentId', value: data.id } })
        this.props.onChangeValueGlobal({ target: { id: 'auctionDate', value: new Date(data.auctionDate) } })
        this.props.onChangeValueGlobal({ target: { id: 'auctionVenue', value: data.venue } })
        this.props.onChangeValueGlobal({ target: { id: 'auctionType', value: data.auctionType } })
        this.props.onChangeValueGlobal({ target: { id: 'auctionTeamPoint', value: data.auctionTeamPoint.toString()  } })
        this.props.onChangeValueGlobal({ target: { id: 'auctionId', value: data.auctionId } })
        
        let pointJson = data.pointJson ? JSON.stringify(data.pointJson) : null
         pointJson = pointJson ? JSON.parse(pointJson.replace(/\r?\n|\r|\t/g, '')) : null
        if (data.auctionType == 'noCategory') {
            if(pointJson && pointJson.length>0){
                this.props.onChangeValueGlobal({ target: { id: 'auctionMinPoint', value: pointJson[0].min } })
                this.props.onChangeValueGlobal({ target: { id: 'auctionIncreasePoint', value: pointJson[0].increase } })
           
            }
           } else {
            this.props.onChangeValueGlobal({ target: { id: 'auctionCategoryAMinPoint', value: data.auctionCategoryAMinPoint } })
            this.props.onChangeValueGlobal({ target: { id: 'auctionCategoryAIncreasePoint', value: data.auctionCategoryAIncreasePoint } })
            this.props.onChangeValueGlobal({ target: { id: 'auctionCategoryBMinPoint', value: data.auctionCategoryBMinPoint } })
            this.props.onChangeValueGlobal({ target: { id: 'auctionCategoryBIncreasePoint', value: data.auctionCategoryBIncreasePoint } })
            this.props.onChangeValueGlobal({ target: { id: 'auctionCategoryCMinPoint', value: data.auctionCategoryCMinPoint } })
            this.props.onChangeValueGlobal({ target: { id: 'auctionCategoryCIncreasePoint', value: data.auctionCategoryCIncreasePoint } })

        }
         this.setState({editModal:true})
    }


    render() {
        let tournamentPendingListGlobal = this.props.tournamentPendingListGlobal && this.props.tournamentPendingListGlobal.length > 0 ? this.props.tournamentPendingListGlobal : []
        let tournamentListGlobalArray = []
        if (tournamentPendingListGlobal && tournamentPendingListGlobal.length > 0) {
            tournamentPendingListGlobal.map((item) => {
                tournamentListGlobalArray.push({
                    value: item.id,
                    label: item.name,
                })
            })
        }

        return (

            <section className="compMain">
                <div id="root">
                    <div className="team-boxed">
                        <div className="container">
                            <div className="intro">
                                <h2> Auction List</h2>
                                {/* <p className="text-center">Nunc luctus in metus eget fringilla. Aliquam sed justo ligula. Vestibulum nibh erat, pellentesque ut laoreet vitae.</p> */}
                                {roleInfo && roleInfo.privileges && roleInfo.privileges.club && roleInfo.privileges.club.addTournament && <div > <Button variant="primary" 
                                onClick={() =>         {
                                    this.props.onChangeValueGlobal({ target: { id: 'auctionPending', value: true } })
                                    this.props.getTournamentList()
                                    this.setState({ showModal: true })}}>
                                    Add Auction
                                </Button></div>}
                            </div>
                            <div className="row people">
                                {this.props.tournamentListGlobal && this.props.tournamentListGlobal.length > 0 ?
                                    this.props.tournamentListGlobal.map((item) => {
                                        return this.auctionUi(item)
                                    }
                                    ) :
                                    <div className="blogSlider">
                                        <div className='noDataFound'>
                                            <div className='imgBox'>
                                                <img src={nodata} />
                                            </div><b>
                                               No Auction found                     </b>
                                        </div>
                                    </div>}

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
                <EditAuctionModal
                    {...this.props}
                    title="Edit Auction"
                    show={this.state.editModal}
                    onHide={() => this.setState({ editModal: false })}
                    onSubmit={() => this.auctionSubmit()}
                    onChangeInput={(evt) => this.props.onChangeValueGlobal(evt)}
                    tournamentListGlobalArray={this.state.tournamentList}
                />
            </section>
        );
    }
}

AuctionList.propTypes = {
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
        tournamentPendingListGlobal: state.global.tournamentPendingListGlobal,
        auctionCreateTournamentId: state.global.auctionCreateTournamentId,
        
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTournamentList: () => dispatch(getTournamentList()),
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        getAuctionPlayer: (evt) => dispatch(getAuctionPlayer(evt)),
        addPlayerToTeam: (evt) => dispatch(addPlayerToTeam(evt)),
        setToast: (success, message) => dispatch(setToast(success, message)),
        resetToast: (evt) => dispatch(resetToast(evt)),
        createAuction: (evt) => dispatch(createAuction(evt)),
        resetAuction: (evt) => dispatch(resetAuction(evt)),


    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AuctionList);
