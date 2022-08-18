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

import { getClubList, onChangeValueClub, addClub, joinClub } from './actions';
import { onChangeValueGlobal, getClubDetail, uploadPhoto } from '../Global/actions';
import { formatDate } from '../../modules/utils/commonUtils';
import nodata from '../../images/nodata1.jpg'

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';

export class ClubList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.getClubList()
        window.scrollTo(0, 0)
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
                    <div className="col-sm-5" style={{"background": "#868e96;"}}>
                    {item.logo ?<img src={item.logo} className="card-img-top boxImageSize" alt="..." />:
                        <div className='letterCircleClubBox'>{initials}</div>}
                    </div>
                    <div className="col-sm-7">
                        <div className="card-body">
                            <div className="text-left"><span className="team-text itemName"> {item.name}</span></div>
                            <div className="text-left"><span className="font-weight-bolder">Location :</span> <span className="team-text"> {item.location}</span></div>
                            <div className="text-left"><span className="font-weight-bolder">Address :</span> <span className="team-text"> {item.Address}</span></div>
                            <div className="btn-wrap">
                                {roleInfo && roleInfo.privileges && roleInfo.privileges.club && roleInfo.privileges.club.requested && <spam>
                                    {item.approved != 1 && <a href="#" className={request ? "btn-detail-disable" : "btn-join"}
                                        onClick={() => {
                                            this.props.onChangeValueGlobal({ target: { id: 'selectedClub', value: item.id } })
                                           if(!request) this.props.joinClub()
                                        }}> {request ? "Requested" : "Join"}</a>}&nbsp;</spam>}
                                <a href="#" className="btn-detail" onClick={() => {
                                    this.props.onChangeValueGlobal({ target: { id: 'selectedClub', value: item.id } })
                                    this.props.getClubDetail()
                                    history.push('/clubDetails', { clubDetails: item })
                                }}> Detail</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            // <div className="card clubItem" style={{ width: '18rem' }} key={item.id}>
            //     <div className='locationBox'>
            //         <div className='locationText'>{item.location}</div> </div>

            //     {item.logo ? <img className="clubLogo" src={item.logo} alt={item.name} data-letters="MN" />
            //         : <div className='letterCircleClub'>{initials}</div>}

            //     <div className="card-body">
            //         <h5 className="card-title">{item.name}</h5>
            //         <p className="card-text"><b>Address:</b> {item.Address}</p>
            //         {roleInfo && roleInfo.privileges && roleInfo.privileges.club && roleInfo.privileges.club.requested && <spam>
            //             {item.approved != 1 && <a href="#" className={request ? "btn btn-secondary" : "btn btn-primary"}
            //                 onClick={() => {
            //                     this.props.onChangeValueGlobal({ target: { id: 'selectedClub', value: item.id } })
            //                     this.props.joinClub()
            //                 }}> {request ? "Requested" : "Join"}</a>}&nbsp;</spam>}
            //         <a href="#" className="btn btn-primary" onClick={() => {
            //             this.props.onChangeValueGlobal({ target: { id: 'selectedClub', value: item.id } })
            //             this.props.getClubDetail()
            //             history.push('/clubDetails', { clubDetails: item })
            //         }}> Detail</a>
            //     </div>
            // </div>
        )
    }
    addClub() {
        this.props.addClub()
        this.setState({ showModal: false })
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
        }, {
            key: 'banner',
            label: 'banner',
            type: 'file'
        },]
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
                                    Add Club
                                </Button></div>}
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
                    title="Add Club"
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                    onSubmit={() => this.addClub()}
                    feildObj={addClubObj}
                    uploadPhoto={this.props.uploadPhoto}
                    onChangeInput={(evt) => this.props.onChangeValueClub(evt)}
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
        nearByClub: state.global.nearByClub,
        clubListPage: state.global.clubListPage,

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
        uploadPhoto: (data, fileId, key) => dispatch(uploadPhoto(data, fileId, key)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ClubList);
