import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialButton from '../../components/SocialButton'
import BottomNavBar from '../../components/BottomNavBar'
import HeaderNavBar from '../../components/HeaderNavBar'
import Image from 'react-bootstrap/Image'


import { getClubList, onChangeValueLogin } from './actions';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import { faHotel, faSortNumericUpAlt, faTrophy, faUserFriends, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';


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
        return (
            <div className="card clubItem" style={{ width: '18rem' }} key={item.id}>
                <img className="clubLogo" src={item.logo} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text"><b>Address:</b> {item.Address}</p>
                    <a href="#" className={request ? "btn btn-secondary": "btn btn-primary"}> { request ? "Requested":"Join" }</a>
                </div>
            </div>
        )
    }

    render() {
        console.log(this.props.clubList)
        return (


            <section className="vh-100">
                <HeaderNavBar />
                <div id="root">

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
                <BottomNavBar />

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

    };
}

function mapDispatchToProps(dispatch) {
    return {
        getClubList: () => dispatch(getClubList()),
        onChangeValueLogin: (evt) => dispatch(onChangeValueLogin(evt)),

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ClubList);
