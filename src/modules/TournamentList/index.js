import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialButton from '../../components/SocialButton'
import BottomNavBar from '../../components/BottomNavBar'
import HeaderNavBar from '../../components/HeaderNavBar'
import Image from 'react-bootstrap/Image'
import AddModal from '../../components/AddModal'
import history from "../utils/history";
import roleInfo from '../utils/roleInfo';

import { getTournamentList, onChangeValueClub, addTournament, requestJoin } from './actions';
import { onChangeValueGlobal, getClubDetail } from '../Global/actions';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';

export class TournamentList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.getTournamentList()
    }
    addTournament() {
        console.log('addClub')
        this.props.addTournament()
        this.setState({ showModal: false })
    }
    listRender(item) {
            return this.userUi(item) 
    }
    userUi(item){
        let request = item.approved == 0 && item.playerId
        let name = item.name
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        let initials = [...name.matchAll(rgx)] || [];
        initials = (
            (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();
        return (
            <div className="card userItem" style={{ width: '18rem' }} key={item.id}>

               {item.logo ? <img className="userDp" src={item.logo} alt={item.name} data-letters="MN"/>
                     : <div className='letterCircleUser'>{initials}</div>}

                <div className="card-body">
                    <h5 className="card-title"><b>Name:</b> {item.name} </h5>
                    <p className="card-text"><b>Team Total:</b> {item.teamTotal}</p>
                    <p className="card-text"><b>Member Total:</b> {item.teamTotal}</p>
                    <p className="card-text"><b>Start Date:</b>  <Moment format="YYYY/MM/DD">{item.startDate}</Moment></p>
                    <p className="card-text"><b>End Date:</b>  <Moment format="YYYY/MM/DD">{item.endDate}</Moment></p>
                    <div style={{display:'flex',justifyContent:'center',flexDirection:'column', borderWidth:2, borderColor:'#e4e4e4'}}>
                    <Button variant="warning" onClick={() => this.props.requestJoin('tournament', item.id, item.clubId)}>Request for Join</Button><br/><br/>
                    <Button variant="warning" onClick={() => this.props.requestJoin('team',item.id,item.clubId)}>Request for Team</Button>
    
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
                type: 'text'
            },
            {
                key: 'startDate',
                label: 'startDate',
                type: 'date'
            },
            {
                key: 'endDate',
                label: 'endDate',
                type: 'date'
            },
            {
                key: 'teamTotal',
                label: 'team Total',
                type: 'number'
            },
            {
                key: 'memberTotal',
                label: 'member Total',
                type: 'number'
            }]
        return (


            <section className="vh-100">
                <HeaderNavBar />
                <div id="root">
                    <div className='headerRow'>
                        <div className='headerCol'>
                       {this.props.tournamentListPage ? <h2>TOURNAMENT LIST</h2> : <h2> {this.props.nearByTournament ? "NEAR-BY TOURNAMENT LIST": "MY TOURNAMENT LIST"}</h2>}
                            
                        </div>
                        <div className='addCol'>
                        {roleInfo && roleInfo.privileges && roleInfo.privileges.club && roleInfo.privileges.club.addTournament && this.props.tournamentListPage &&   <Button variant="primary" onClick={() => this.setState({ showModal: true })}>
                            Add Club
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
                <br/>
                <br/>
                <br/>
                <BottomNavBar />

                <AddModal
                 title="Add Club"
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                    onSubmit={() => this.addTournament()}
                    feildObj={addTournamentObj}
                    onChangeInput={(evt) => this.props.onChangeValueClub(evt)}
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
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTournamentList: () => dispatch(getTournamentList()),
        addTournament: () => dispatch(addTournament()),
        onChangeValueClub: (evt) => dispatch(onChangeValueClub(evt)),
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        getClubDetail: (evt) => dispatch(getClubDetail(evt)),
        requestJoin: (type, tournamentId, clubId) => dispatch(requestJoin(type, tournamentId, clubId)),
        
        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TournamentList);
