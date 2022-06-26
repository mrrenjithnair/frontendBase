import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'rc-table';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialButton from '../../components/SocialButton'
import BottomNavBar from '../../components/BottomNavBar'
import HeaderNavBar from '../../components/HeaderNavBar'
import Image from 'react-bootstrap/Image'
import { formatDate } from '../../modules/utils/commonUtils';

import AddModal from '../../components/AddModal'
import EditModal from '../../components/EditModal'

import history from "../utils/history";
import roleInfo from '../utils/roleInfo';

import { getClubRequest, onChangeValueClub, onChangeValueEditClub, addTournament, editTournament, requestAction } from './actions';
import { onChangeValueGlobal, getClubDetail } from '../Global/actions';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import _ from 'lodash';

export class Request extends React.PureComponent {
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
        this.props.getClubRequest()
    }

    render() {
        let auditLogs = []
        console.log(this.props.requestList,'requestList')
        const columns = [
            {
                title: 'Player Name',
                dataIndex: 'playerName',
                key: 'clubName',
            },
            {
                title: 'Requested',
                dataIndex: 'type',
                key: 'age',
            },
            {
                title: 'Tournament Name',
                dataIndex: 'tournamentName',
                key: 'address',
            },
            {
                title: 'Date',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (value) => formatDate(value),

                
            },
            {
                title: 'Status',
                dataIndex: 'approved',
                key: 'approved',
                render: (value) => <span>{value == 1 ? 'Approved' : value == 0 ? 'Reject' :'' }</span>,

                
            },
            {
                title: 'Action',
                dataIndex: 'id',
                key: 'id',
                render: (value, row, index) =>
                <div>
                        <a href="#" disabled={row.approved == 1 } onClick={() => row.approved == 1 ? '' : this.props.requestAction(row.type, row.id, row.clubId,row.id, 'accept')} className= { row.approved == 1 ? 'tableButtonDisable' :'tableButtonPrimary'}>Accept</a>
                        <a href="#"disabled={row.approved == 0 } onClick={() => row.approved == 0 ? '' : this.props.requestAction(row.type, row.id, row.clubId,row.id, 'reject')} className={row.approved == 0 ? 'tableButtonDisable' : 'tableButtonDanger'}>Reject</a>
                </div>,
            },
        ];

        return (


            <section className="vh-100">
                <HeaderNavBar />
                <div id="root">
                    <div className='headerRow'>
                        <div className='headerCol'>
                            <h2>Request LIST</h2>
                        </div>
                        <div className='addCol'></div>
                    </div>
                    <div className='container'>
                        <div >
                            <Table columns={columns} data={this.props.requestList} />,
                        </div>
                    </div>

                </div>
                <br />
                <br />
                <br />
                <BottomNavBar />
            </section>
        );
    }
}

Request.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    console.log(state)
    return {
        requestList: state.request.requestList,
        nearByTournament: state.global.nearByTournament,
        tournamentListPage: state.global.tournamentListPage,
        loggedInRoleId: state.global.loggedInRoleId,
        selectedTournament: state.tournament.selectedTournament
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getClubRequest: () => dispatch(getClubRequest()),
        addTournament: () => dispatch(addTournament()),
        editTournament: () => dispatch(editTournament()),
        onChangeValueClub: (evt) => dispatch(onChangeValueClub(evt)),
        onChangeValueEditClub: (evt) => dispatch(onChangeValueEditClub(evt)),

        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        getClubDetail: (evt) => dispatch(getClubDetail(evt)),
        requestAction: (type, tournamentId, clubId,requestId, status) => dispatch(requestAction(type, tournamentId, clubId,requestId, status)),


    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Request);
