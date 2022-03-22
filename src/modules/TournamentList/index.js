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

import { getTournamentList, onChangeValueClub, addClub, joinClub } from './actions';
import { onChangeValueGlobal, getClubDetail } from '../Global/actions';

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

    render() {
        console.log(this.props)

        return (


            <section className="vh-100">
                <HeaderNavBar />
                <div id="root">
                    <div className='headerRow'>
                        <div className='headerCol'>
                       {this.props.tournamentListPage ? <h2>TOURNAMENT LIST</h2> : <h2> {this.props.nearByTournament ? "NEAR-BY TOURNAMENT LIST": "MY TOURNAMENT LIST"}</h2>}
                            
                        </div>
                        <div className='addCol'>
                        {roleInfo && roleInfo.privileges && roleInfo.privileges.club && roleInfo.privileges.club.addClub &&   <Button variant="primary" onClick={() => this.setState({ showModal: true })}>
                            Add Club
                        </Button>}
                        </div>
                    </div>
        
                <div className='container'>
                </div>
                </div>
                <br/>
                <br/>
                <br/>
                <BottomNavBar />

                {/* <AddModal
                 title="Add Club"
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                    onSubmit={() => this.addClub()}
                    feildObj={addClubObj}
                    onChangeInput={(evt) => this.props.onChangeValueClub(evt)}
                /> */}
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
        addClub: () => dispatch(addClub()),
        onChangeValueClub: (evt) => dispatch(onChangeValueClub(evt)),
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        getClubDetail: (evt) => dispatch(getClubDetail(evt)),
        joinClub: (evt) => dispatch(joinClub(evt)),
        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TournamentList);
