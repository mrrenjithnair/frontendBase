import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialButton from '../../components/SocialButton'
import BottomNavBar from '../../components/BottomNavBar'
import HeaderNavBar from '../../components/HeaderNavBar'
import Image from 'react-bootstrap/Image'
import AddModal from '../../components/AddModal'
import EditModal from '../../components/EditModal'

import history from "../utils/history";
import roleInfo from '../utils/roleInfo';

import { getTournamentList, getMyTournamentList, onChangeValueClub, onChangeValueEditClub, addTournamentData, editTournament, requestJoin } from './actions';
import { onChangeValueGlobal, getClubDetail, uploadPhoto } from '../Global/actions';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import { actions } from 'react-table';
import nodata from '../../images/nodata1.jpg'

export class TournamentList extends React.PureComponent {
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
        window.scrollTo(0, 0)
        if (this.props.nearByTournament) {
            this.props.getTournamentList()
        } else {
            if (this.props.loggedInRoleId == 3) {
                this.props.getMyTournamentList()
            } else {
                this.props.getTournamentList()
            }
        }
    }
    addTournamentData() {
        console.log('addClub')
        this.props.addTournamentData()
        this.setState({ showModal: false })
    }
    editTournamentSubmit() {
        console.log('addClub')
        this.props.editTournament()
        this.setState({ editModal: false })
    }

    editTournament(item) {
        console.log(item)
        let data = [{
            key: 'name',
            label: 'name',
            type: 'text',
            required: true,
            value: item.name,
        },
        {
            key: 'startDate',
            label: 'startDate',
            type: 'date',
            required: true,
            value: item.startDate,
        },
        {
            key: 'endDate',
            label: 'endDate',
            type: 'date',
            required: true,
            value: item.endDate,
        },
        {
            key: 'teamTotal',
            label: 'team Total',
            required: true,
            type: 'number',
            value: item.teamTotal,
        },
        {
            key: 'memberTotal',
            label: 'member Total',
            required: true,
            type: 'number',
            value: item.memberTotal,
        },
        {
            key: 'logo',
            label: 'logo',
            type: 'file',
            value: item.logo,
            oldValue: item.logoUrl

        },
        {
            key: 'banner',
            label: 'banner',
            type: 'file',
            value: item.banner,
            oldValue: item.bannerUrl
        },
        {
            key: 'id',
            value: item.id,
        }]

        this.props.onChangeValueClub({ target: { id: 'selectedTournament', value: data } })
        this.setState({ editModal: true, selectedItem: data })
    }

    detailTournament(item) {
        this.props.onChangeValueGlobal({ target: { id: 'selectedTournament', value: item } })
        history.push('/tournamentDetail')
    }
    listRender(item) {
        return this.tournamentUi(item)
    }
    onChangeValueEditClub(evt) {
        this.setState({ typing: !this.state.typing })
        this.props.onChangeValueEditClub(evt)
    }
    tournamentUi(item) {
        let requestedTeam = item.requestedTeam == 1 || item.requestedTournament == 1
        let requestedTournament = item.requestedTournament == 1 || item.requestedTeam == 1
        let name = item.name
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        let initials = [...name.matchAll(rgx)] || [];
        initials = (
            (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();
        return (
            <div className="col-sm-6 mt-4" key={item.id}>
                <div className="card league">
                    <div className="row g-0">
                        <div className="col-sm-5" style={{ "background": "#868e96;" }}>
                            {item.logoUrl ? <img src={item.logoUrl} className="card-img-top boxImageSize" alt="..." /> :
                                <div className='letterCircleClubBox'>{initials}</div>}
                        </div>
                        <div className="col-sm-7">
                            <div className="card-body">
                                <div className="text-left"><span className="team-text itemName"> {item.name}</span></div>
                                <div className="text-left"><span className="font-weight-bolder">Team Total: </span> <span className="team-text"> {item.teamTotal}</span></div>
                                <div className="text-left"><span className="font-weight-bolder">Member Total: </span> <span className="team-text"> {item.memberTotal}</span></div>
                                <div className="text-left"><span className="font-weight-bolder">Start Date: </span> <span className="team-text"> <Moment format="YYYY/MM/DD">{item.startDate}</Moment></span></div>
                                <div className="text-left"><span className="font-weight-bolder">End Date: </span> <span className="team-text"> <Moment format="YYYY/MM/DD">{item.endDate}</Moment></span></div>     
                                    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', borderWidth: 2, borderColor: '#e4e4e4' }}>
                                        {this.props.loggedInRoleId == 3 && this.props.nearByTournament && <div style={{display:'flex',width:'100%',justifyContent:'space-around',marginTop:20}}>
                                            <a disabled={requestedTournament} className={requestedTournament ? "btn btn-secondary" : "btn btn-primary"} onClick={() => this.props.requestJoin('tournament', item.id, item.clubId)}> {requestedTournament ? 'Requested join' : 'Request join'}</a>
                                            <a disabled={requestedTeam} className={requestedTeam ? "btn btn-secondary" : "btn btn-primary"} onClick={() => this.props.requestJoin('team', item.id, item.clubId)}>{requestedTeam ? 'Requested Team' : 'Request Team'}</a>
                                        </div>}
                                       {this.props.loggedInRoleId == 2 && <div style={{display:'flex',width:'100%',justifyContent:'space-around',marginTop:20}}>
                                            {this.props.loggedInRoleId == 2 && <a className="btn-join" onClick={() => this.editTournament(item)}>Edit</a>}
                                            {this.props.loggedInRoleId == 2 && <a className="btn-detail" onClick={() => this.detailTournament(item)}>Details</a>}
                                        </div>}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        console.log(this.props)
        let addTournamentObj = [{
            key: 'name',
            label: 'name',
            required: true,
            type: 'text',
            value: this.props.name
        },
        {
            key: 'startDate',
            label: 'startDate',
            required: true,
            type: 'date',
            value: this.props.startDate
        },
        {
            key: 'endDate',
            label: 'endDate',
            required: true,
            type: 'date',
            value: this.props.date
        },
        {
            key: 'tournamentLogo',
            label: 'logo',
            type: 'file',
            value: this.props.tournamentLogo,

        },
        {
            key: 'teamTotal',
            label: 'team Total',
            required: true,
            type: 'number',
            value: this.props.teamTotal
        },
        {
            key: 'memberTotal',
            label: 'member Total',
            required: true,
            type: 'number',
            value: this.props.memberTotal
        }]
        return (


            <section className="compMain">
                <div id="root">
                    <div className="team-boxed">
                        <div className="container">
                            <div className="intro">
                                <h2 className="text-center">
                                    {this.props.tournamentListPage ? 'Tournament List' : this.props.nearByTournament ? "Near-by Tournament List" : "My Tournament List"}</h2>
                                {roleInfo && roleInfo.privileges && roleInfo.privileges.club && roleInfo.privileges.club.addTournament && this.props.tournamentListPage && <div className="text-center"> <Button variant="primary" onClick={() => this.setState({ showModal: true })}>
                                    Add Tournament
                                </Button></div>}
                            </div>
                            <div className="row people">
                                {this.props.tournamentList && this.props.tournamentList.length > 0 ?
                                    this.props.tournamentList.map((item) => {
                                        return this.listRender(item)
                                    }
                                    ) : <div className="blogSlider">

                                        <div className='noDataFound'>
                                            <div className='imgBox'>
                                                <img src={nodata} />
                                            </div><b>{this.props.tournamentListPage ? 'No Tournament Found' : this.props.nearByTournament ? "No Near-by Tournament Found" : "No Tournament Found"}</b></div> </div>}
                            </div>
                        </div>
                    </div>


                </div>
                <br />
                <br />
                <br />

                <AddModal
                    title="Add Tournament"
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                    onSubmit={() => this.addTournamentData()}
                    feildObj={addTournamentObj}
                    uploadPhoto={this.props.uploadPhoto}
                    onChangeInput={(evt) => this.props.onChangeValueClub(evt)}
                />
                <EditModal
                    title={"Edit Tournament"}
                    show={this.state.editModal}
                    onHide={() => this.setState({ editModal: false })}
                    onSubmit={() => this.editTournamentSubmit()}
                    feildObj={this.props.selectedTournament}
                    uploadPhoto={this.props.uploadPhoto}
                    onChangeInput={(evt) => this.onChangeValueEditClub(evt)}
                />
            </section>
        );
    }
}

TournamentList.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    console.log(state)
    return {
        tournamentList: state.tournament.tournamentList,
        nearByTournament: state.global.nearByTournament,
        tournamentListPage: state.global.tournamentListPage,
        loggedInRoleId: state.global.loggedInRoleId,
        selectedTournament: state.tournament.selectedTournament,
        tournamentLogo: state.tournament.tournamentLogo,
        tournamentBanner: state.tournament.tournamentBanner,
        memberTotal: state.tournament.memberTotal,
        teamTotal: state.tournament.teamTotal,
        name: state.tournament.name,
        startDate: state.tournament.startDate,
        endDate: state.tournament.endDate,


    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTournamentList: () => dispatch(getTournamentList()),
        getMyTournamentList: () => dispatch(getMyTournamentList()),
        addTournamentData: () => dispatch(addTournamentData()),
        editTournament: () => dispatch(editTournament()),
        onChangeValueClub: (evt) => dispatch(onChangeValueClub(evt)),
        onChangeValueEditClub: (evt) => dispatch(onChangeValueEditClub(evt)),

        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        getClubDetail: (evt) => dispatch(getClubDetail(evt)),
        requestJoin: (type, tournamentId, clubId) => dispatch(requestJoin(type, tournamentId, clubId)),

        uploadPhoto: (data, fileId, key) => dispatch(uploadPhoto(data, fileId, key)),


    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TournamentList);
