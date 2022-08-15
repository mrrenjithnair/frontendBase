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

import { getTournamentList, getMyTournamentList, onChangeValueClub, onChangeValueEditClub, addTournament,editTournament, requestJoin } from './actions';
import { onChangeValueGlobal, getClubDetail, uploadPhoto } from '../Global/actions';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import { actions } from 'react-table';

export class TournamentList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showModal:false,
            selectedItem: false,
            editModal: false,
            typing:false
        }
    }

    componentDidMount() {
           window.scrollTo(0, 0)
           if(this.props.nearByTournament){
            this.props.getTournamentList()
           }else{
            this.props.getMyTournamentList()
           }
    }
    addTournament() {
        console.log('addClub')
        this.props.addTournament()
        this.setState({ showModal: false })
    }
    editTournamentSubmit() {
        console.log('addClub')
        this.props.editTournament()
        this.setState({ editModal: false })
    }
    
    editTournament(item){
        console.log(item)
        let data= [{
            key: 'name',
            label: 'name',
            type: 'text',
            required:true,
            value: item.name,
        },
        {
            key: 'startDate',
            label: 'startDate',
            type: 'date',
            required:true,
            value: item.startDate,
        },
        {
            key: 'endDate',
            label: 'endDate',
            type: 'date',
            required:true,
            value: item.endDate,
        },
        {
            key: 'teamTotal',
            label: 'team Total',
            required:true,
            type: 'number',
            value: item.teamTotal,
        },
        {
            key: 'memberTotal',
            label: 'member Total',
            required:true,
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
        this.setState({ editModal:true, selectedItem: data })
    }

    detailTournament(item){
        this.props.onChangeValueGlobal({ target: { id: 'selectedTournament', value: item } })
        history.push('/tournamentDetail')
    }
    listRender(item) {
        return this.userUi(item)
    }
    onChangeValueEditClub(evt){
        this.setState({typing: !this.state.typing})
        this.props.onChangeValueEditClub(evt)
    }
    userUi(item) {
        let requestedTeam = item.requestedTeam == 1 || item.requestedTournament == 1
        let requestedTournament = item.requestedTournament == 1 || item.requestedTeam == 1
        let name = item.name
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        let initials = [...name.matchAll(rgx)] || [];
        initials = (
            (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();
        return (
            <div className="card userItem" style={{ width: '18rem' }} key={item.id}>
                {item.bannerUrl &&<img className="card-img-top" src={item.bannerUrl} alt="Card image cap"></img>}
                {item.logoUrl ? <img className="userDp" src={item.logoUrl} alt={item.name} data-letters="MN" />
                    : <div className='letterCircleUser'>{initials}</div>}

                <div className="card-body">
                    <p  className="card-title"><b>Name: </b> {item.name} </p >
                    <p className="card-text"><b>Team Total: </b> {item.teamTotal}</p>
                    <p className="card-text"><b>Member Total: </b> {item.memberTotal}</p>
                    <p className="card-text"><b>Start Date: </b>  <Moment format="YYYY/MM/DD">{item.startDate}</Moment></p>
                    <p className="card-text"><b>End Date: </b>  <Moment format="YYYY/MM/DD">{item.endDate}</Moment></p>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', borderWidth: 2, borderColor: '#e4e4e4' }}>
                        {this.props.loggedInRoleId == 3 && this.props.nearByTournament && <div>
                            <Button disabled={requestedTournament} className={requestedTournament ? "btn btn-secondary" : "btn btn-warning"} onClick={() => this.props.requestJoin('tournament', item.id, item.clubId)}> {requestedTournament ? 'Requested for join' : 'Request for join'}</Button><br /><br />
                            <Button disabled={requestedTeam} className={requestedTeam ? "btn btn-secondary" : "btn btn-warning"} onClick={() => this.props.requestJoin('team', item.id, item.clubId)}>{requestedTeam ? 'Requested for Team' : 'Request for Team'}</Button>
                        </div>}
                        <div style={{display:'flex','justifyContent':'space-around'}}>

                        {this.props.loggedInRoleId ==  2 && <Button className="buttonPrimary" onClick={() => this.editTournament(item)}>Edit</Button>}
                        {this.props.loggedInRoleId ==  2 && <Button className="buttonPrimary"  onClick={() => this.detailTournament(item)}>Details</Button>}
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
            required:true,
            type: 'text'
        },
        {
            key: 'startDate',
            label: 'startDate',
            required:true,
            type: 'date'
        },
        {
            key: 'endDate',
            label: 'endDate',
            required:true,
            type: 'date'
        },
        {
            key: 'tournamentLogo',
            label: 'logo',
            type: 'file',
            value:this.props.tournamentLogo

        },
        {
            key: 'tournamentBanner',
            label: 'banner',
            type: 'file',
            value:this.props.tournamentBanner
        },
        {
            key: 'teamTotal',
            label: 'team Total',
            required:true,
            type: 'number'
        },
        {
            key: 'memberTotal',
            label: 'member Total',
            required:true,
            type: 'number'
        }]
        return (


            <section className="compMain">
                <div id="root">
                    <div className='headerRow'>
                        <div className='headerCol'>
                            {this.props.tournamentListPage ? <h2>TOURNAMENT LIST</h2> : <h2> {this.props.nearByTournament ? "NEAR-BY TOURNAMENT LIST" : "MY TOURNAMENT LIST"}</h2>}

                        </div>
                        <div className='addCol'>
                            {roleInfo && roleInfo.privileges && roleInfo.privileges.club && roleInfo.privileges.club.addTournament && this.props.tournamentListPage && <Button className="buttonPrimary" variant="primary" onClick={() => this.setState({ showModal: true })}>
                                Add Tournament
                            </Button>}
                        </div>
                    </div>

                    <div className='container'>
                        <div className='userList'>
                            {this.props.tournamentList && this.props.tournamentList.length > 0 &&
                                this.props.tournamentList.map((item) => {
                                    return this.listRender(item)
                                }
                                )}
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
                    onSubmit={() => this.addTournament()}
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
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTournamentList: () => dispatch(getTournamentList()),
        getMyTournamentList: () => dispatch(getMyTournamentList()),
        addTournament: () => dispatch(addTournament()),
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
