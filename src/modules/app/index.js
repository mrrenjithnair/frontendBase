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
import Loading from '../../components/Loading'


import { logout,onChangeValueGlobal } from '../Global/actions';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';

export class APP extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

   
    render() {

        return (

        <div className='mainBox'>
               {this.props.loading && <Loading/>}
                <HeaderNavBar logout={()=>this.props.logout} sessionToken={this.props.sessionToken}
                onChangeValueGlobal={this.props.onChangeValueGlobal}
                loggedInRoleId={this.props.loggedInRoleId}
                ></HeaderNavBar>

        </div>
        );
    }
}

APP.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    return {
        sessionToken: state.global.sessionToken,
        loading: state.global.loading,
        loggedInRoleId: state.global.loggedInRoleId
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),      
        logout: (evt) => dispatch(logout(evt)),        
        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(APP);
