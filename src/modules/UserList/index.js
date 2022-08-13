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
import { getUserList, onChangeValueUser, addUser, userUpdate, onChangeUserUpdate } from './actions';

import { onChangeValueGlobal, getClubDetail, uploadPhoto } from '../Global/actions';
import { getClubList } from '../ClubList/actions';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import profile from '../../images/profile.jpg'

export class UserList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.getUserList()
        this.props.onChangeValueGlobal({ target: { id: 'nearByClub', value: true } })
        this.props.onChangeValueGlobal({ target: { id: 'clubListPage', value: false } })
        this.props.onChangeValueGlobal({ target: { id: 'assignedClub', value: true } })

        this.props.getClubList()
    }
    adminUi(item) {
        let request = item.approved == 0 && item.playerId
        let name = item.firstName + " " + item.lastName
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        let initials = [...name.matchAll(rgx)] || [];
        initials = (
            (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();
        return (
            <div className="col-md-6 col-lg-3 item" key={item.id}>

            <div className="box">
 {item.profilePicture ? <img className="rounded-circle"  src={item.profilePicture} alt={item.name} data-letters="MN" />
                    : <div className="rounded-circle letterCircleUser" >{initials}</div>}
                <h3 className="name">{item.firstName} {item.lastName}</h3>
                <div className="text-left"><span className="font-weight-bolder">Username :</span> <span className="team-text"> {item.username}</span></div>
                <div className="text-left"><span className="font-weight-bolder">Player type:</span> <span className="team-text"> {item.playerType}</span></div>
                <div className="text-left"><span className="font-weight-bolder">Email ID :</span> <span className="team-text"> {item.emailId}</span></div>
                <div className="text-left"><span className="font-weight-bolder">Clubs :</span>
                 
                 {item.clubList && item.clubList.map((item) =>
                         <span className="team-text"> {item.name}</span>
                     )}
                 </div>

            </div>

        </div>
        )
    }
    action(item, status) {
        this.props.onChangeUserUpdate(item.id, 'approvedUpdate', true)
        this.props.onChangeUserUpdate(item.id, 'approved', status == 'accept' ? 1 : 0)
        this.props.userUpdate(item.id)
    }
    userUi(item) {
        let request = item.approved == 0 && item.playerId
        let name = item.firstName + " " + item.lastName
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        let initials = [...name.matchAll(rgx)] || [];
        initials = (
            (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();
        return (
            <div className="col-md-6 col-lg-3 item"  key={item.id}>

            <div className="box">
                <div className="label-top shadow-sm">
                    <a className="text-white" href="#">{item.sportName}</a>
                </div>
            {item.profilePictureUrl ? <img className="rounded-circle" src={item.profilePictureUrl} alt={item.name} data-letters="MN"/>
                : <img className="rounded-circle" src={profile} alt={item.name}/>}

                <h3 className="name">{item.firstName} {item.lastName}</h3>
                <div className="text-left"><span className="font-weight-bolder">Category :</span> <span className="team-text">  {item.category}</span></div>
                <div className="text-left"><span className="font-weight-bolder">Player type:</span> <span className="team-text"> {item.playerType}</span></div>
                <div className="text-left"><span className="font-weight-bolder">Location :</span> <span className="team-text"> {item.location}</span></div>
                {!item.approved ? <div className="btn-wrap">
                    <a href="#"  disabled={item.approved == 1 } onClick={() => item.approved == 1 ? '' : this.action(item,'accept')} className="btn-buy">Approved</a> &nbsp;
                    <a href="#" disabled={item.approved == 0 } onClick={() => item.approved == 0 ? '' : this.action(item, 'reject')} className="btn-reject">Reject</a>
                </div>:
                <div className="text-left"><span className="font-weight-bolder">Status :</span> <span className="team-text"> Approved</span></div>
        }
            </div>

        </div>
        )
    }

    listRender(item) {
        if (this.props.adminList) {
            return this.adminUi(item)
        } else {
            return this.userUi(item)
        }
    }
    addUser() {
        this.props.addUser()
        this.setState({ showModal: false })
    }
    render() {
        let clubList = this.props.clubList && this.props.clubList.length > 0 ? this.props.clubList : []
        let clubListArray = []
        if (clubList && clubList.length > 0) {
            clubList.map((item) => {
                clubListArray.push({
                    value: item.id,
                    label: item.name,
                })
            })
        }
        let addUserObj = [{
            key: 'firstName',
            label: 'first Name',
            type: 'text'
        },
        {
            key: 'lastName',
            label: 'last Name',
            type: 'text'
        },
        {
            key: 'emailId',
            label: 'email Id',
            type: 'text'
        },
        {
            key: 'dob',
            label: 'dob',
            type: 'date'
        },
        {
            key: 'username',
            label: 'username',
            type: 'text'
        }, {
            key: 'password',
            label: 'password',
            type: 'text'
        },
        {
            key: 'profilePicture',
            label: 'profile Picture',
            type: 'file'
        },
        {
            key: 'clubId',
            label: 'club',
            type: 'select',
            data: clubListArray
        },]
        return (


            <section className="compMain">
                <div id="root">
                    <div className="team-boxed">
                        <div className="container">
                            <div className="intro">
                                <h2 className="text-center">{this.props.adminList ? "Club Admin List" : "Player List"} </h2>
                                {/* <p className="text-center">Nunc luctus in metus eget fringilla. Aliquam sed justo ligula. Vestibulum nibh erat, pellentesque ut laoreet vitae.</p> */}
                                {roleInfo && roleInfo.privileges && roleInfo.privileges.user && roleInfo.privileges.user.addAdmin &&<div  className="text-center"> <Button variant="primary" onClick={() => this.setState({ showModal: true })}>
                                Add Admin
                            </Button></div>}
                            </div>
                            <div className="row people">
                            {this.props.userList && this.props.userList.length > 0 &&
                                this.props.userList.map((item) => {
                                    return this.listRender(item)
                                }
                                )}
                         


                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='userList'>
                    
                        </div>
                    </div>


                </div>
                <br />
                <br />
                <br />

                <AddModal
                    title="Add Admin"
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                    onSubmit={() => this.addUser()}
                    feildObj={addUserObj}
                    uploadPhoto={this.props.uploadPhoto}
                    onChangeInput={(evt) => this.props.onChangeValueUser(evt)}
                />
            </section>
        );
    }
}

UserList.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    return {
        userList: state.userList.userList,
        adminList: state.global.adminList,
        clubList: state.clubs.clubList,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUserList: () => dispatch(getUserList()),
        addUser: () => dispatch(addUser()),
        onChangeValueUser: (evt) => dispatch(onChangeValueUser(evt)),
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        getClubDetail: (evt) => dispatch(getClubDetail(evt)),
        getClubList: (evt) => dispatch(getClubList(evt)),
        onChangeUserUpdate: (id, key, value) => dispatch(onChangeUserUpdate(id, key, value)),
        uploadPhoto: (data, fileId, key) => dispatch(uploadPhoto(data, fileId, key)),
        userUpdate: (id) => dispatch(userUpdate(id)),

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
