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

import { onChangeValueGlobal, getClubDetail } from '../Global/actions';
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
        this.props.getUserList()
        this.props.onChangeValueGlobal({ target: { id: 'nearByClub', value: true } }) 
        this.props.onChangeValueGlobal({ target: { id: 'clubListPage', value: false } }) 
        this.props.onChangeValueGlobal({ target: { id: 'assignedClub', value: true } }) 
        
        this.props.getClubList()
    }
    adminUi(item){
        let request = item.approved == 0 && item.playerId
        let name = item.firstName + " "+ item.lastName
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        let initials = [...name.matchAll(rgx)] || [];
        initials = (
            (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();
        return (
            <div className="card userItem" style={{ width: '18rem' }} key={item.id}>
                    {/* <div className='locationBox'><div className='locationText'>{item.sportName}</div> </div> */}

               {item.logo ? <img className="userDp" src={item.logo} alt={item.name} data-letters="MN"/>
                     : <div className='letterCircleUser'>{initials}</div>}

                <div className="card-body">
                    <h5 className="card-title"><b>Name:</b> {item.firstName} {item.lastName}</h5>
                    <h5 className="card-title"><b>Username:</b> {item.username}</h5>
                    <h5 className="card-title"><b>Email ID:</b> {item.emailId}</h5>
                    <h5 className="card-title"><b>Clubs</b>{item.clubList && item.clubList.map((item)=>
                        <p>{item.name}</p>
                    )} </h5>
                </div>
            </div>
        )
    }
    action(item,status){
        this.props.onChangeUserUpdate(item.id, 'approvedUpdate', true)
        this.props.onChangeUserUpdate(item.id, 'approved', status == 'accept' ? 1 : 0)
        this.props.userUpdate(item.id)
    }
    userUi(item){
        let request = item.approved == 0 && item.playerId
        let name = item.firstName + " "+ item.lastName
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        let initials = [...name.matchAll(rgx)] || [];
        initials = (
            (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();
        return (
            <div className="card userItem" style={{ width: '18rem' }} key={item.id}>
                    <div className='locationBox'>
                        <div className='locationText'>{item.sportName}</div> </div>
            <div className='userBox'>
               {item.logo ? <img className="userDp" src={item.logo} alt={item.name} data-letters="MN"/>
                     :  <img className="userDp" src={profile} alt={item.name}/>}

                <div className="card-body">
                    <h5 className="card-title"><b>Name:</b> {item.firstName} {item.lastName}</h5>
                    <p className="card-text"><b>Category:</b> {item.category}</p>
                    <p className="card-text"><b>Player type:</b> {item.playerType}</p>
                    <p className="card-text"><b>Location:</b> {item.location}</p>
                    {!item.approved ? <div>
                        <a  disabled={item.approved == 1 } onClick={() => item.approved == 1 ? '' : this.action(item,'accept')} className= { item.approved == 1 ? 'tableButtonDisable' :'tableButtonPrimary'}>Accept</a>
                        <a disabled={item.approved == 0 } onClick={() => item.approved == 0 ? '' : this.action(item, 'reject')} className={item.approved == 0 ? 'tableButtonDisable' : 'tableButtonDanger'}>Reject</a>
              
                    </div>:<div>
                    <p className="card-text"><b>Status:</b>Approved</p>
                        </div>}
                    </div>   
                </div>
            </div>
        )
    }

    listRender(item) {
        if(this.props.adminList){
           return this.adminUi(item) 
        }else{
            return this.userUi(item) 
        }
    }
    addUser() {
        this.props.addUser()
        this.setState({ showModal: false })
    }
    render() {
        let clubList =  this.props.clubList && this.props.clubList.length > 0 ? this.props.clubList : []
        let clubListArray =[]
        if(clubList && clubList.length> 0){
            clubList.map((item)=>{
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
        },{
            key: 'password',
            label: 'password',
            type: 'text'
        },{
            key: 'clubId',
            label: 'club',
            type: 'select',
            data:clubListArray
        },]
        return (


            <section className="vh-100">
                <HeaderNavBar />
                <div id="root">
                    <div className='headerRow'>
                        <div className='headerCol'>
                        <h2> {this.props.adminList ? "CLUB ADMIN LIST": "PLAYER LIST"}</h2>
                            
                        </div>
                        <div className='addCol'>
                        {roleInfo && roleInfo.privileges && roleInfo.privileges.user && roleInfo.privileges.user.addAdmin &&   <Button variant="primary" onClick={() => this.setState({ showModal: true })}>
                            Add Admin
                        </Button>}
                        </div>
                    </div>
        
                <div className='container'>
                    <div className='userList'>
                        {this.props.userList && this.props.userList.length > 0 &&
                            this.props.userList.map((item) => {
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
                 title="Add Admin"
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                    onSubmit={() => this.addUser()}
                    feildObj={addUserObj}
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
        onChangeUserUpdate: (id, key, value) => dispatch(onChangeUserUpdate(id ,key, value)),

        userUpdate: (id) => dispatch(userUpdate(id)),
        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
