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
import EditModal from '../../components/EditModal'

import { getClubList, onChangeValueClub, addClub, joinClub } from './actions';
import { onChangeValueGlobal, getClubDetail, uploadPhoto, editClub, onChangeGlobalValueClub } from '../Global/actions';
import { formatDate } from '../../modules/utils/commonUtils';
import nodata from '../../images/nodata1.jpg'

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';

export class ClubList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            editModal: false
        }
    }

    componentDidMount() {
        this.props.getClubList()
        window.scrollTo(0, 0)
    }
    editClub(item) {
        console.log(item)
        let clubedit = [{
            key: 'name',
            label: 'name',
            type: 'text',
            value: item.name
        },
        {
            key: 'location',
            label: 'location',
            type: 'text',
            value: item.location
        },
        {
            key: 'address',
            label: 'address',
            type: 'text',
            value: item.address
        },
        {
            key: 'description',
            label: 'description',
            type: 'textarea',
            value: item.description
        },
        {
            key: 'logo',
            label: 'logo',
            type: 'file',
            value: item.logo,
            oldValue:item.logoUrl
        },
        {
            key: 'id',
            value: item.id
        },
        {
            key: 'sportType',
            value: item.sportType
        },
    ]
        this.props.onChangeValueGlobal({ target: { id: 'seletedClubEdit', value: clubedit } })
        this.setState({ editModal: true })
    }
    listRender(item) {
        let request = item.approved == 0 && item.playerId
        let name = item.name
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        let initials = [...name.matchAll(rgx)] || [];
        initials = (
            (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();

        return (
            <div className="col-sm-6 mt-4">
                <div className="card league">
                    <div className="row g-0">
                        <div className="col-sm-5" style={{ "background": "#868e96;" }}>
                            {item.logoUrl ? <img src={item.logoUrl} className="card-img-top boxImageSize" alt="..." /> :
                                <div className='letterCircleClubBox'>{initials}</div>}
                        </div>
                        <div className="col-sm-7">
                            <div className="card-body">
                                <div className="text-left"><span className="team-text itemName"> {item.name}</span></div>
                                <div className="text-left"><span className="font-weight-bolder">Location :</span> <span className="team-text"> {item.location}</span></div>
                                <div className="text-left"><span className="font-weight-bolder">Address :</span> <span className="team-text"> {item.address}</span></div>
                                <div className="btn-wrap">
                                    {roleInfo && roleInfo.privileges && roleInfo.privileges.club && roleInfo.privileges.club.requested && <spam>
                                        {item.approved != 1 && <a href="#" className={request ? "btn-detail-disable" : "btn-join"}
                                            onClick={() => {
                                                this.props.onChangeValueGlobal({ target: { id: 'selectedClub', value: item.id } })
                                                if (!request) this.props.joinClub()
                                            }}> {request ? "Requested" : "Join"}</a>}&nbsp;</spam>}
                                    <a href="#" className="btn-detail" onClick={() => {
                                        this.props.onChangeValueGlobal({ target: { id: 'selectedClub', value: item.id } })
                                        this.props.getClubDetail()
                                        history.push('/clubDetails', { clubDetails: item })
                                    }}> Detail</a> &nbsp;
                                    {roleInfo && roleInfo.privileges && roleInfo.privileges.club && roleInfo.privileges.club.addClub && 
                                        <a href="#" onClick={() => this.editClub(item)} className="btn btn-reject">Edit</a>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    addClub() {
        this.props.addClub()
        this.setState({ showModal: false })
    }
    onChangeValueClub(evt){
        console.log(evt)
        this.setState({typing: !this.state.typing})
        this.props.onChangeGlobalValueClub(evt)
    }
        
    editClubSubmit() {
        this.props.editClub()
        this.setState({ editModal: false })
    }
    render() {
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
            key: 'logo',
            label: 'logo',
            type: 'file'
        }]
        console.log( this.props.clubList)
        return (


            <section className="compMain">
                <div id="root">
                    <div className="team-boxed">
                        <div className="container">
                            <div className="intro">
                                <h2 className="text-center">
                                    {this.props.clubListPage ? 'Leagues List' : this.props.nearByClub ? "Near-by Leagues" : "My Leagues"}
                                </h2>
                                {/* <p className="text-center">Nunc luctus in metus eget fringilla. Aliquam sed justo ligula. Vestibulum nibh erat, pellentesque ut laoreet vitae.</p> */}
                                {roleInfo && roleInfo.privileges && roleInfo.privileges.club && roleInfo.privileges.club.addClub && <div className="text-center"> <Button variant="primary" onClick={() => this.setState({ showModal: true })}>
                                    Add League
                                </Button></div>}
                                <div style={{display:'flex'}}>
                                <input type="text" id="Search"
                                    value={this.props.clubSearch}
                                    onChange={(e) => { this.props.onChangeValueClub({ target: { id: 'clubSearch', value: e.target.value } }) }}
                                    className='form-control form-control-lg'
                                    placeholder={"Search league"} />
                                <Button variant="primary" onClick={() => this.props.getClubList()}>
                                   Search
                                </Button>
                                </div>

                            </div>
                            <div className="row ">
                                {this.props.clubList && this.props.clubList.length >0  ?
                                    this.props.clubList.map((item) => {
                                        return this.listRender(item)
                                    }
                                    ) :
                                    <div className="blogSlider">

                                        <div className='noDataFound'>
                                            <div className='imgBox'>
                                                <img src={nodata} />
                                            </div><b>
                                            {this.props.clubListPage ? 'No Leagues Found' : this.props.nearByClub ? "No Near-by Leagues Found" : "No Leagues Found"}                                             </b></div> </div>}



                            </div>
                        </div>
                    </div>

                </div>
                <br />
                <br />
                <br />

                <AddModal
                    title="Add League"
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                    onSubmit={() => this.addClub()}
                    feildObj={addClubObj}
                    uploadPhoto={this.props.uploadPhoto}
                    onChangeInput={(evt) => this.props.onChangeValueClub(evt)}
                />  
                <EditModal
                title={"Edit Club"}
                show={this.state.editModal}
                onHide={() => this.setState({ editModal: false })}
                onSubmit={() => this.editClubSubmit()}
                feildObj={this.props.seletedClubEdit}
                uploadPhoto={this.props.uploadPhoto}
                onChangeInput={(evt) => this.onChangeValueClub(evt)}
               />
            </section>
        );
    }
}

ClubList.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    return {
        clubList: state.clubs.clubList,
        clubSearch: state.clubs.clubSearch,
        nearByClub: state.global.nearByClub,
        clubListPage: state.global.clubListPage,
        seletedClubEdit: state.global.seletedClubEdit,
        

    };
}

function mapDispatchToProps(dispatch) {
    return {
        getClubList: () => dispatch(getClubList()),
        addClub: () => dispatch(addClub()),
        onChangeValueClub: (evt) => dispatch(onChangeValueClub(evt)),
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        getClubDetail: (evt) => dispatch(getClubDetail(evt)),
        joinClub: (evt) => dispatch(joinClub(evt)),
        editClub: (evt) => dispatch(editClub(evt)),
        onChangeGlobalValueClub: (evt) => dispatch(onChangeGlobalValueClub(evt)),
        
        uploadPhoto: (data, fileId, key) => dispatch(uploadPhoto(data, fileId, key)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ClubList);
