
import React from "react";

import { connect } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Logo from '../images/Logo.png'
import { useNavigate } from "react-router-dom";
import history from "../modules/utils/history";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class HeaderNavBar extends React.PureComponent {
    logout() {
        localStorage.clear();
        history.push('/login');

    }
    render() {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        let userDetails = this.props.userDetails;
        let name = userDetails ? userDetails.firstName + " " + userDetails.lastName : ''
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        let initials = [...name.matchAll(rgx)] || [];
        initials = (
            (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();
        return (
            <>
                <Navbar className="bgPrimary" variant="dark " fixed="top" >
                    <Container>
                        <Navbar.Brand onClick={()=>{history.push('/home');}}>
                            <img
                                alt=""
                                src={Logo}
                                width="50"
                                className="d-inline-block align-top"
                            />{' '}
                            sportzMitra
                        </Navbar.Brand>
                        {isAuthenticated && <NavDropdown title=
                            {<div className="pull-left">


                                {userDetails && userDetails.profilePicture ? 
                                 <img className="thumbnail-image" src={userDetails.profilePicture} alt={userDetails.firstName} data-letters={initials}/>
                                    : <div className='profileLetter'>{initials}</div>}
                            </div>} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item
                                onClick={e => this.logout(e)}>Logout</NavDropdown.Item>
                        </NavDropdown>}
                    </Container>
                    <ToastContainer position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />
                </Navbar>
            </>

        );
    }
}


function mapStateToProps(state) {
    return {
        userDetails: state.global.myDetails
    };
}

function mapDispatchToProps(dispatch) {
    return {


    };
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderNavBar);

