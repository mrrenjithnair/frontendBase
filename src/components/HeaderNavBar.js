
import React from "react";

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Logo from '../images/Logo.png'
import { useNavigate } from "react-router-dom";
import history from "../modules/utils/history";

class HeaderNavBar extends React.Component {
    logout(){
        console.log('logiut')
        localStorage.clear();
        history.push('/login');

    }
    render() {
        const isAuthenticated = localStorage.getItem("isAuthenticated");

        return (
            <>
                <Navbar className="bgPrimary" variant="dark "fixed="top" >
                    <Container>
                        <Navbar.Brand href="/home">
                            <img
                                alt=""
                                src={Logo}
                                width="50"
                                className="d-inline-block align-top"
                            />{' '}
                           sportzMitra
                        </Navbar.Brand>
                        {isAuthenticated  &&<NavDropdown title=
                       {<div className="pull-left">
                          <Image roundedCircle={true} className="thumbnail-image" src={'https://media-exp1.licdn.com/dms/image/C4E03AQGXXVyqvNASeg/profile-displayphoto-shrink_200_200/0/1610128592245?e=1647475200&v=beta&t=6khuQdLq0JYzXuIsF2YuhflCnH9ACGcrTBfOAO4ayDg'} alt="user pic"/>
                            Renjith Nair
                          {/* {user.username} */}
                      </div>} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item 
                            onClick={e => this.logout(e)}>Logout</NavDropdown.Item>
                        </NavDropdown>}
                    </Container>
                </Navbar>
            </>

        );
    }
}

export default HeaderNavBar;



