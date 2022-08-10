
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
                <section>
                    <div id="topbar" className="d-flex align-items-center fixed-top">
                        <div className="container d-flex align-items-center justify-content-center justify-content-md-between">
                            <div className="align-items-center">
                                <i className="display-flex-center   fab fa-facebook-f" aria-hidden="true"></i>
                            </div>
                            <div className="d-flex align-items-center">
                                <i className="bi bi-phone"></i> Call us now +1 5589 55488 55
                            </div>
                        </div>
                    </div>
                    {/* <header id="header" className="fixed-top">
                        <div className="container d-flex align-items-center">

                            <a href="index.html" className="logo me-auto"><img src="assets/img/logo1.png" alt="" /></a>
                            <nav id="navbar" className="navbar order-last order-lg-0">
                                <ul>
                                    <li><a className="nav-link scrollto" href="#hero">Home</a></li>
                                    <li><a className="nav-link scrollto" href="#about">About</a></li>
                                    <li><a className="nav-link scrollto" href="#services">Features</a></li>
                                    <li><a className="nav-link scrollto" href="#departments">Leagues</a></li>
                                    <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
                                </ul>
                                <i className="bi bi-list mobile-nav-toggle"></i>
                            </nav>

                            <a href="login.html" className="league-btn -btn scrollto"><span className="">Login</span></a>
                            <a href="login.html" className="league-btn -btn scrollto"><span className="">Register</span></a>

                        </div>
                    </header> */}

                    <Navbar expand="lg" id="header" className="fixed-top">
                        <Container className="container d-flex align-items-center">
                            <Navbar.Brand  className="logo me-auto" onClick={() => { history.push('/home'); }}><img
                                alt=""
                                src={SportzMitra}
                                className="d-inline-block align-top"
                            />{' '}</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            {this.props.sessionToken?   <Nav id="navbar" className="navbar order-last order-lg-0">
                                    {this.props.sessionToken && <Nav.Link className="nav-link scrollto" onClick={() => { history.push('/home'); }}>Home</Nav.Link>}
                                    {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.myClub && <Nav.Link className="nav-link scrollto" onClick={() => { history.push('/home'); }} >Leagues</Nav.Link>}
                                    {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.tournement && <Nav.Link className="nav-link scrollto" onClick={() => { history.push('/tournamentList'); }} href="#tournamentList">My Tournament</Nav.Link>}
                                    {this.props.sessionToken && <Nav.Link className="nav-link scrollto" onClick={() => { history.push('/home'); }} >Teams</Nav.Link>}
                                    {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.auction && <Nav.Link className="nav-link scrollto" onClick={() => { history.push('/auction'); }}>Auction</Nav.Link>}
                                    {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.playerList && <Nav.Link className="nav-link scrollto" onClick={() => { history.push('/userList'); }}>Players</Nav.Link>}
                                    {this.props.sessionToken && <Nav.Link className="nav-link scrollto" onClick={() => { history.push('/profile'); }}>Profile</Nav.Link>}
                                </Nav>:
                                <Nav id="navbar" className="navbar order-last order-lg-0">
                                    <Nav.Link  href="#hero" className="nav-link scrollto">Home</Nav.Link>
                                    <Nav.Link  href="#about" className="nav-link scrollto">About</Nav.Link>
                                    <Nav.Link  href="#services" className="nav-link scrollto">Features</Nav.Link>
                                    <Nav.Link  href="#departments" className="nav-link scrollto">Leagues</Nav.Link>
                                    <Nav.Link  href="#contact" className="nav-link scrollto">Contact</Nav.Link>
                                </Nav>}
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            </Navbar.Collapse>
                            {this.props.sessionToken ? <div className="navButtonBox"><a className="league-btn -btn scrollto" onClick={e => this.logout(e)}><span className="">Logout</span></a></div> 
                                : <div className="navButtonBox">
                                    <a className="league-btn -btn scrollto" onClick={() => { history.push('/login'); }}><span className="">Login</span></a>
                                    <a className="league-btn -btn scrollto" onClick={() => { history.push('/register'); }}><span className="">Register</span></a>
                                </div>}

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
                </section>
            </>

        );
    }
}

{/* <Navbar id="header" className="fixed-top">
                        <Container className="container d-flex align-items-center">
                            <Navbar.Brand onClick={() => { history.push('/home'); }}><img
                                alt=""
                                src={SportzMitra}
                                width="150"
                                className="d-inline-block align-top"
                            />{' '}</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse >
                                <Nav className="me-auto">
                                    {this.props.sessionToken && <Nav.Link className="navLink" onClick={() => { history.push('/home'); }}>Home</Nav.Link>}
                                    {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.myClub && <Nav.Link className="nav-link scrollto" onClick={() => { history.push('/home'); }} >Leagues</Nav.Link>}
                                    {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.tournement && <Nav.Link className="nav-link scrollto" onClick={() => { history.push('/tournamentList'); }} href="#tournamentList">My Tournament</Nav.Link>}
                                    {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.auction && <Nav.Link className="nav-link scrollto" onClick={() => { history.push('/auction'); }}>Auction</Nav.Link>}
                                    {roleInfo && roleInfo.privileges && roleInfo.privileges.dashboard && roleInfo.privileges.dashboard.playerList && <Nav.Link className="nav-link scrollto" onClick={() => { history.push('/userList'); }}>Players</Nav.Link>}
                                    {this.props.sessionToken && <Nav.Link className="nav-link scrollto" onClick={() => { history.push('/Profile'); }}>Profile</Nav.Link>}
                                    {this.props.sessionToken && <Nav.Link className="nav-link scrollto" onClick={e => this.logout(e)}>Logout</Nav.Link>}

                                </Nav>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            </Navbar.Collapse>
                            <a href="login" className="league-btn -btn scrollto"><span className="">Login</span></a>
                            <a href="login" className="league-btn -btn scrollto"><span className="">Register</span></a>

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
                    </Navbar> */}
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

