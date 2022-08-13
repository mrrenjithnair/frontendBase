import React, { Component } from 'react';
import { connect } from 'react-redux';
import BottomNavBar from '../../components/BottomNavBar'
import HeaderNavBar from '../../components/HeaderNavBar'
import history from "../utils/history";

import { onChangeValueGlobal, getClubAdmins, logout } from '../Global/actions';


import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
export class ClubDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.getClubAdmins()
        window.scrollTo(0, 0)
    }

    render() {
        let clubDetails = this.props.clubDetails && this.props.clubDetails.length > 0 ? this.props.clubDetails[0] : []
        let clubAdminList =  this.props.clubAdminList && this.props.clubAdminList.length > 0 ? this.props.clubAdminList : []
        let clubAdminListArray =[]
        if(clubAdminList && clubAdminList.length> 0){
            clubAdminList.map((item)=>{
                clubAdminListArray.push({
                    value: item.id,
                    label: item.firstName + ' ' + item.lastName,
                  })  
            })
        }
        let name = clubDetails.name
        let initials
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        if (name) {
            initials = [...name.matchAll(rgx)] || [];
            initials = (
                (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
            ).toUpperCase();
        }


        return (
            <section className="compMain">
                <div id="root">
                    <div className='padding'>

                        <div className="card"> 
                        <img className="card-img-top" src={ clubDetails.banner? clubDetails.banner:"https://i.imgur.com/K7A78We.jpg"} alt="Card image cap" />
                            <div className="card-body little-profile text-center">
                                <div className="pro-img">
                                    {/* <img src={clubDetails.logo} alt="user" /> */}
                                    {clubDetails.logo ? <img className='detailImg' src={clubDetails.logo} alt={clubDetails.name} />
                                        : <div className='letterCircleClubDetail'>{initials}</div>}
                                </div>
                                <h3 className="m-b-0">{clubDetails.name}</h3>
                                {clubDetails.ownerName && <h3 className="m-b-5"> <b>Owner Name : {clubDetails.ownerName}</b></h3>}
                                {/* {!clubDetails.ownerName &&  <div className='selectBox'>
                                <label className="form-label capitalize" >Please select owner </label>

                                <div className="input-group mb-3">
                                    <select className="form-control"
                                        onChange={(e) => { this.props.onChangeValueGlobal({ target: { id: 'clubAdminSelected', value: e.target.value } }) }} >
                                        <option value=""> Select Type</option>
                                            {clubAdminListArray && clubAdminListArray.length > 0 && clubAdminListArray.map(item =>  <option value={item.value}>{item.label}</option>) }

                                    </select>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button">Submit</button>
                                    </div>
                                </div>
                                </div>} */}
                            
                                <p>{clubDetails.Address}</p>
                                {/* <div className="row text-center m-t-20">
                                    <div className="col-lg-4 col-md-4 m-t-20">
                                        <h3 className="m-b-0 font-light">10</h3><small>Players</small>
                                    </div>
                                    <div className="col-lg-4 col-md-4 m-t-20">
                                        <h3 className="m-b-0 font-light">10</h3><small>Active Tournemets</small>
                                    </div>
                                    <div className="col-lg-4 col-md-4 m-t-20">
                                        <h3 className="m-b-0 font-light">50</h3><small>Total Tournemets</small>
                                    </div>
                                </div> */}
                                <div className="row m-t-20">

                                    {clubDetails.description && <p><b>Description :</b> {clubDetails.description}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        );
    }
}

ClubDetails.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    return {
        clubDetails: state.global.clubDetails,
        clubAdminList: state.global.clubAdminList,
        clubAdminSelected: state.global.clubAdminSelected,
        selectedClub: state.global.selectedClub,
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getClubAdmins: () => dispatch(getClubAdmins()),
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ClubDetails);