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


import { getUserList, onChangeValueClub, addClub } from './actions';
import { onChangeValueGlobal, getClubDetail } from '../Global/actions';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';

export class UserList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.getUserList()
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
                    <p className="card-text"><b>clubs</b>{item.clubList.map((item)=>
                        <p>{item.name}</p>
                    )} </p>
                </div>
            </div>
        )
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

               {item.logo ? <img className="userDp" src={item.logo} alt={item.name} data-letters="MN"/>
                     : <div className='letterCircleUser'>{initials}</div>}

                <div className="card-body">
                    <h5 className="card-title"><b>Name:</b> {item.firstName} {item.lastName}</h5>
                    <p className="card-text"><b>Category:</b> {item.category}</p>
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
    addClub() {
        console.log('addClub')
        this.props.addClub()
        this.setState({ showModal: false })
    }
    render() {
        console.log(this.props)
        let addClubObj = [{
            key: 'name',
            label: 'name',
            type: 'text'
        },
        {
            key: 'location',
            label: 'location',
            type: 'text'
        },
        {
            key: 'address',
            label: 'address',
            type: 'text'
        },
        {
            key: 'description',
            label: 'description',
            type: 'textarea'
        },
        {
            key: ' logo',
            label: 'logo',
            type: 'file'
        },{
            key: ' banner',
            label: 'banner',
            type: 'file'
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
                 title="Add Club"
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                    onSubmit={() => this.addClub()}
                    feildObj={addClubObj}
                    onChangeInput={(evt) => this.props.onChangeValueClub(evt)}
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
    console.log(state)
    return {
        userList: state.userList.userList,
        adminList: state.global.adminList,
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUserList: () => dispatch(getUserList()),
        addClub: () => dispatch(addClub()),
        onChangeValueClub: (evt) => dispatch(onChangeValueClub(evt)),
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        getClubDetail: (evt) => dispatch(getClubDetail(evt)),
        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
