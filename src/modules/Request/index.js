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
import nodata from '../../images/nodata1.jpg'

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
        window.scrollTo(0, 0)
        this.props.getClubRequest()
    }
    requestAction(type, tournamentId, clubId, id, status) {
        if (status == 'accept' && type =='team') {
            this.setState({ showModal: true, teamDetail :{type, tournamentId, clubId, id, status} })
        } else {
            this.props.requestAction(type, tournamentId, clubId, id, status)

        }
    }
    submitDetail(){
        let data = this.state.teamDetail
        this.props.requestAction(data.type, data.tournamentId, data.clubId, data.id, data.status) 
        this.setState({ showModal: false, teamDetail :false})
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
                        <a href="#" disabled={row.approved == 1 } onClick={() => row.approved == 1 ? '' : this.requestAction(row.type, row.tournamentId, row.clubId,row.id, 'accept')} className= { row.approved == 1 ? 'tableButtonDisable' :'tableButtonPrimary'}>Accept</a>
                        <a href="#"disabled={row.approved == 0 } onClick={() => row.approved == 0 ? '' : this.requestAction(row.type, row.tournamentId, row.clubId,row.id, 'reject')} className={row.approved == 0 ? 'tableButtonDisable' : 'tableButtonDanger'}>Reject</a>
                </div>,
            },
        ];
        let addClubObj = [{
            key: 'teamName',
            label: 'Team Name',
            type: 'text'
        },
        {
            key: 'logo',
            label: 'teamLogo',
            type: 'file'
        }
    ]
        return (


            <section className="compMain">
                <div id="root">
                <div className="team-boxed">
                        <div className="container">
                            <div className="intro">
                                <h2 className="text-center">Tournament Request</h2>
                            </div>
                            <div className="row people">
                            {this.props.requestList && this.props.requestList.length >0 ? <Table className='tableCs' columns={columns} data={this.props.requestList} /> :
                                    <div className="blogSlider">
                                        <div className='noDataFound'>
                                            <div className='imgBox'>
                                                <img src={nodata} />
                                            </div><b>
                                            No Tournament Request Found                  </b>
                                        </div>
                                    </div>}

                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <AddModal
                 title="Add Team Details"
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                    onSubmit={() => this.submitDetail()}
                    feildObj={addClubObj}
                    onChangeInput={(evt) => this.props.onChangeValueClub(evt)}
                />
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
        requestAction: (type, tournamentId, clubId, requestId, status) => dispatch(requestAction(type, tournamentId, clubId,requestId, status)),


    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Request);
