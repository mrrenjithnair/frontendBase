import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Table from 'rc-table';
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
import { onChangeValueGlobal, getClubDetail,uploadPhoto } from '../Global/actions';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import _ from 'lodash';
import nodata from '../../images/nodata1.jpg'

import Table from './TableReact.js'
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
            if (status == 'accept') {
                this.setState({ playerModal: true, })
            }
            this.setState({ teamDetail :{type, tournamentId, clubId, id, status} })
            // this.props.requestAction(type, tournamentId, clubId, id, status)

        }
    }
            
    submitDetail(){
        let data = this.state.teamDetail
        this.props.requestAction(data.type, data.tournamentId, data.clubId, data.id, data.status) 
        this.setState({ showModal: false, teamDetail: false, playerModal: false })
    }      
    submiPlayerModaltDetail(){
        let data = this.state.teamDetail
        this.props.requestAction(data.type, data.tournamentId, data.clubId, data.id, data.status) 
        this.setState({ showModal: false, teamDetail: false, playerModal: false })
    }

    render() {
        let auditLogs = []
        console.log(this.props.requestList,'requestList')
        // const columns = [
        //     {
        //         title: 'Player Name',
        //         dataIndex: 'playerName',
        //         key: 'clubName',
        //     },
        //     {
        //         title: 'Player Mobile',
        //         dataIndex: 'playerMobile',
        //         key: 'playerMobile',
        //     },
        //     {
        //         title: 'Player Email',
        //         dataIndex: 'playerEmail',
        //         key: 'playerEmail',
        //     },
        //     {
        //         title: 'Requested',
        //         dataIndex: 'type',
        //         key: 'age',
        //     },
        //     {
        //         title: 'Tournament Name',
        //         dataIndex: 'tournamentName',
        //         key: 'address',
        //     },
        //     {
        //         title: 'Date',
        //         dataIndex: 'createdAt',
        //         key: 'createdAt',
        //         render: (value) => formatDate(value),

                
        //     },
        //     {
        //         title: 'Status',
        //         dataIndex: 'approved',
        //         key: 'approved',
        //         render: (value) => <span>{value == 1 ? 'Approved' : value == 0 ? '' :'' }</span>,

                
        //     },
        //     {
        //         title: 'Action',
        //         dataIndex: 'id',
        //         key: 'id',
        //         render: (value, row, index) =>
        //         <div>
        //                 <a href="#" disabled={row.approved == 1 } onClick={() => row.approved == 1 ? '' : this.requestAction(row.type, row.tournamentId, row.clubId,row.id, 'accept')} className= { row.approved == 1 ? 'tableButtonDisable' :'tableButtonPrimary'}>Accept</a>
        //                 <a href="#"disabled={row.approved == 0 } onClick={() => row.approved == 0 ? '' : this.requestAction(row.type, row.tournamentId, row.clubId,row.id, 'reject')} className={row.approved == 0 ? 'tableButtonDisable' : 'tableButtonDanger'}>Reject</a>
        //         </div>,
        //     },
        // ];
        const columns1 = [
            {
                Header: 'Player Name',
                accessor: 'playerName',
            },
            {
                Header: 'Player Mobile',
                accessor: 'playerMobile',
            },
            {
                Header: 'Player Email',
                accessor: 'playerEmail',
            },
            {
                Header: 'Requested',
                accessor: 'type',
            },
            {
                Header: 'Tournament Name',
                accessor: 'tournamentName',
            },
            {
                Header: 'Date',
                accessor: 'createdAt',
                Cell: (props) => formatDate(props.value),
            },
            {
                Header: 'Status',
                accessor: 'approved',
                maxWidth: 70,
                minWidth: 70,
                Cell: (props) => <span>{props.value == 1 ? 'Approved' : props.value == 0 ? '' :'' }</span>,
            },
            {
                Header: 'Action',
                accessor: 'id',
                Cell: (props) =>{ console.log(props.row);
               return <div>
                        <a href="#" disabled={props.row.values.approved == 1 } onClick={() => props.row.values.approved == 1 ? '' : this.requestAction(props.row.original.type, props.row.original.tournamentId, props.row.original.clubId,props.row.original.id, 'accept')} className= { props.row.values.approved == 1 ? 'tableButtonDisable' :'tableButtonPrimary'}>Accept</a>
                        <a href="#"disabled={props.row.values.approved == 0 } onClick={() => props.row.values.approved == 0 ? '' : this.requestAction(props.row.original.type, props.row.original.tournamentId, props.row.original.clubId,props.row.original.id, 'reject')} className={props.row.values.approved == 0 ? 'tableButtonDisable' : 'tableButtonDanger'}>Reject</a>
                </div>},
            },
        ];
        let addClubObj = [{
            key: 'teamName',
            label: 'Team Name',
            type: 'text'
        },
        {
            key: 'teamLogo',
            label: 'team Logo',
            type: 'file'
        },
        {
            key: 'teamTopUpAmount',
            label: 'Top-up Amount',
            type: 'number'
        }
        ]
        let addPlayerObj = [{
            key: 'category',
            label: 'Category',
            type: 'text'
        },
        {
            key: 'luckyDrawNumber',
            label: 'lucky Draw Number',
            type: 'text'
        }
    ]
        return (


            <section className="compMain">
                <div id="root">
                <div className="team-boxed">
                        <div className="container">
                            <div className="intro">
                                <h2>Tournament Request</h2>
                            </div>
                            <div className="row people">
                            {this.props.requestList && this.props.requestList.length >0 ? 
                            <Table className='tableCs' columns={columns1} 
                            data={this.props.requestList}/>
                             :
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
                    uploadPhoto={this.props.uploadPhoto}
                    onChangeInput={(evt) => this.props.onChangeValueClub(evt)}
                />
                <AddModal
                 title="Add Player Details"
                    show={this.state.playerModal}
                    onHide={() => this.setState({ playerModal: false })}
                    onSubmit={() => this.submiPlayerModaltDetail()}
                    feildObj={addPlayerObj}
                    uploadPhoto={this.props.uploadPhoto}
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
        uploadPhoto: (data, fileId, key) => dispatch(uploadPhoto(data, fileId, key)),

        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        getClubDetail: (evt) => dispatch(getClubDetail(evt)),
        requestAction: (type, tournamentId, clubId, requestId, status) => dispatch(requestAction(type, tournamentId, clubId,requestId, status)),


    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Request);
