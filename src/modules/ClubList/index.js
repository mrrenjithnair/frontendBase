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


import { getClubList, onChangeValueClub, addClub } from './actions';
import { onChangeValueGlobal, getClubDetail } from '../Global/actions';

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
            <div className="card clubItem" style={{ width: '18rem' }} key={item.id}>
                    <div className='locationBox'>
                        <div className='locationText'>{item.location}</div> </div>

               {item.logo ? <img className="clubLogo" src={item.logo} alt={item.name} data-letters="MN"/>
                     : <div className='letterCircle'>{initials}</div>}

                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text"><b>Address:</b> {item.Address}</p>
                    <a href="#" className={request ? "btn btn-secondary": "btn btn-primary"}> { request ? "Requested":"Join" }</a> &nbsp;
                    <a href="#" className= "btn btn-primary"onClick={()=>{
                        this.props.onChangeValueGlobal({ target: { id: 'selectedClub', value: item.id } }) 
                        this.props.getClubDetail()
                        history.push('/ClubDetails',{clubDetails:item})
                        }}> Detail</a>
                </div>
            </div>
        )
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
            type: 'Text'
        },
        {
            key: 'location',
            label: 'location',
            type: 'Text'
        },
        {
            key: 'address',
            label: 'address',
            type: 'Text'
        },{
            key: ' logo',
            label: 'logo',
            type: 'File'
        },{
            key: ' banner',
            label: 'banner',
            type: 'File'
        },]
        return (


            <section className="vh-100">
                <HeaderNavBar />
                <div id="root">
                    <div className='headerRow'>
                        <div className='headerCol'>
                        <h2> {this.props.nearByClub ? "NEAR-BY CLUB LIST": "MY CLUB LIST"}</h2>
                            
                        </div>
                        <div className='addCol'>
                        <Button variant="primary" onClick={() => this.setState({ showModal: true })}>
                            Add Club
                        </Button>
                        </div>
                    </div>
        
                <div className='container'>
                    <div className='clubList'>
                        {this.props.clubList && this.props.clubList.length != 0 &&
                            this.props.clubList.map((item) => {
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

ClubList.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    console.log(state)
    return {
        clubList: state.clubs.clubList,
        nearByClub: state.global.nearByClub,
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getClubList: () => dispatch(getClubList()),
        addClub: () => dispatch(addClub()),
        onChangeValueClub: (evt) => dispatch(onChangeValueClub(evt)),
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),
        getClubDetail: (evt) => dispatch(getClubDetail(evt)),
        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ClubList);
