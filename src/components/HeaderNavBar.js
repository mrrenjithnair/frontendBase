
import React from "react";

import { connect } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Logo from '../images/Logo.png'
import SportzMitra from '../images/SportzMitra.png'
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom";
import history from "../modules/utils/history";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import roleInfo from '../modules/utils/roleInfo';

export class HeaderNavBar extends React.PureComponent {
    logout() {
        localStorage.clear();
        this.props.logout()
        history.push('/login');
        window.location.reload(false);

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
                <Navbar bg="light" className="bgPrimary" variant="dark " fixed="top" expand="lg">
                    <Container>
                        <Navbar.Brand onClick={() => { history.push('/home'); }}><img
                            alt=""
                            src={SportzMitra}
                            width="150"
                            className="d-inline-block align-top"
                        />{' '}</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {this.props.sessionToken && <Nav.Link className="navLink" onClick={() => { history.push('/home'); }}>Home</Nav.Link>}
                                {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.myClub && <Nav.Link className="navLink" onClick={() => { history.push('/home'); }} >Leagues</Nav.Link>}
                                {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.tournement && <Nav.Link className="navLink" onClick={() => { history.push('/tournamentList'); }} href="#tournamentList">My Tournament</Nav.Link>}
                                {/* {this.props.sessionToken && <Nav.Link className="navLink" onClick={() => { history.push('/home'); }} >Teams</Nav.Link>} */}
                                {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.auction && <Nav.Link className="navLink" onClick={() => { history.push('/auction'); }}>Auction</Nav.Link>}
                                {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.playerList && <Nav.Link className="navLink" onClick={() => { history.push('/userList'); }}>Players</Nav.Link>}
                            </Nav>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            {this.props.sessionToken && <NavDropdown title=
                                {<div className="pull-left">


                                    {userDetails && userDetails.profilePictureUrl ?
                                        <img className="thumbnail-image" src={userDetails.profilePictureUrl} alt={userDetails.firstName} data-letters={initials} />
                                        : <div className='profileLetter'>{initials}</div>}
                                </div>} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => { history.push('/profile'); }}>Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    onClick={e => this.logout(e)}>Logout</NavDropdown.Item>
                            </NavDropdown>}
                        </Navbar.Collapse>
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

