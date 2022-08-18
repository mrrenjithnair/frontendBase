import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialButton from '../../components/SocialButton'
import BottomNavBar from '../../components/BottomNavBar'

import history from "../utils/history";

import { login, onChangeValueLogin } from './actions';
import { setToast, resetToast } from '../Global/actions';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './style.css';
import { faSortNumericUpAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import SportzMitra from '../../images/SportzMitra.png'
import 'react-toastify/dist/ReactToastify.css';
import Carousel from 'react-bootstrap/Carousel';


const REDIRECT_URI = 'http://localhost:3000/account/login'

export class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }


    render() {

        return (
            <div >
                <main id="main">
                <Carousel id='home'>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="assets/img/cricket.jpeg"
                            alt="Register"
                        />
                        <Carousel.Caption >
                            <div className='slidercontainer'>
                                  <h4 style={{"color":"#ffffff"}}>Register yourself to join leagues</h4>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="assets/img/league.png"
                            alt="Second slide"
                        />

                        <Carousel.Caption >
                            <div className='slidercontainer'>
                            <h4 style={{"color":"#ffffff"}}>Manage your Leagues</h4>
                                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p> */}
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="assets/img/bid-back.png"
                            alt="Third slide"
                        />

                        <Carousel.Caption >
                            <div className='slidercontainer'>
                            <h4 style={{"color":"#ffffff"}}>Bid your team players</h4>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                    <section id="about" className="about">
                        <div className="container" data-aos="fade-up">

                            <div className="section-title">
                                <h2>About Us</h2>
                                <p>Sportzmitra, founded by friends have always been cricket fanatics! We would love to play in our gully and end up fighting over who performed the best, who swung the ball most and who could have taken more wickets! Amateurs as we were, we made our own rules and scorekeeping! As we grew out of our gully’s what remained itched in our hearts was our passion for this sport and thus was born the idea of <b>Sportzmitra!</b></p>
                                <p><b>Sportzmitra</b> is one stop destination for sports fans who wish to participate in local competitions and tournaments. Sportzmitra is the perfect spot for you to expand your play zone! We can help you set a match against the next gully, neighbourhood or community!!</p>
                            </div>

                            <div className="row">
                                <div className="col-lg-6" data-aos="fade-right">
                                    <img src="assets/img/Allplayers.png" className="img-fluid" alt="" />
                                </div>
                                <div className="col-lg-6 pt-4 pt-lg-0 content" data-aos="fade-left">
                                    <h3>Discover your gully today at Sportzmitra.</h3>

                                    <ul>
                                        <li><i className="bi bi-check-circle"></i> Build your League , Organize and manage your monthly/quraterly/half/yearly seasonal tournaments and team online.</li>
                                        <li><i className="bi bi-check-circle"></i> Be a part of League, select players for league , play in different tournaments, make your own team in tournaments.</li>
                                        <li><i className="bi bi-check-circle"></i> Make your Auction Online , Bid registered players , build your team with Bidding process</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </section>

                    <section id="services" className="services services">
                        <div className="container" data-aos="fade-up">

                            <div className="section-title">
                                <h2>Features</h2>
                                <p>The plaform will provide centralized sports process like Player Registration , League Administration , Team Management, Auction Management.</p>
                            </div>

                            <div className="row">
                                <div className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="100">
                                    <div className="icon"><i className="fa fa-users"></i></div>
                                    <h4 className="title"><a href="">Player Registration</a></h4>
                                    <p className="description">Register with us through gmail, facebook,  or simply fill our registration form online.You need to be a part of at least one league (of your choice) to participate in any tournament.You can become a member of a league only once your league administrator has approved your entry.</p>
                                </div>
                                <div className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="200">
                                    <div className="icon"><i className="fa fa-trophy"></i></div>
                                    <h4 className="title"><a href="">League</a></h4>
                                    <p className="description">Register League by contacting us. The League administrator shall have the authority to manage seasonal tournaments, players for teams and Auction process. </p>
                                </div>
                                <div className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="300">
                                    <div className="icon"><i className="fa fa-gavel"></i></div>
                                    <h4 className="title"><a href="">Auction / Bid</a></h4>
                                    <p className="description">Manage auction process by creating Auction interface for tournaments.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="featured-services" class="featured-services">
                        <div class="section-title">
                            <h2>Products</h2>

                        </div>
                        <div class="container" data-aos="fade-up">
                            <div class="row">
                                <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                                    <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
                                        <div class="icon"><img src="assets/img/bat1.jpeg" class="img-fluid" alt="" /></div>
                                        <h4 class="title"><a href="">Box / Turf Tennis Cricket Bat</a></h4>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                                    <div class="icon-box" data-aos="fade-up" data-aos-delay="200">
                                        <div class="icon"><img src="assets/img/bat1.jpeg" class="img-fluid" alt="" /></div>
                                        <h4 class="title"><a href="">Hard Tennis Cricket Bat - Single Blade</a></h4>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                                    <div class="icon-box" data-aos="fade-up" data-aos-delay="300">
                                        <div class="icon"><img src="assets/img/bat1.jpeg" class="img-fluid" alt="" /></div>
                                        <h4 class="title"><a href="">Hard Tennis Cricket Bat - Double Blade</a></h4>

                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                                    <div class="icon-box" data-aos="fade-up" data-aos-delay="400">
                                        <div class="icon"><img src="assets/img/bat1.jpeg" class="img-fluid" alt="" /></div>
                                        <h4 class="title"><a href="">Hard Tennis Cricket Bat - Upper Blade</a></h4>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="pricing" class="pricing">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>License</h2>
          <p>To avail our features , we offers you following licenseing model</p>
        </div>

        <div class="row">

          <div class="col-lg-3 col-md-6">
            <div class="box" data-aos="fade-up" data-aos-delay="100">
              <h3>Free</h3>
              <h4><sup>INR</sup>0<span> / League</span></h4>
              <ul>
                <li>Player Registration</li>
                <li>Player Profile Management</li>
               
                <li class="na">League Management</li>
                <li class="na">Auction</li>
              </ul>
              <div class="btn-wrap">
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mt-4 mt-md-0">
            <div class="box featured" data-aos="fade-up" data-aos-delay="200">
              <h3>Plan 1</h3>
              <h4><sup>INR</sup>3000<span> / Year</span></h4>
              <ul>
                <li>Single League Management</li>
                <li>1 Auction Managment for 1 Tournament</li>                
                <li class="na">Unlimited</li>
              </ul>
              <div class="btn-wrap">
                <a href="#contact" class="btn-buy">Call Now</a>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mt-4 mt-lg-0">
            <div class="box featured" data-aos="fade-up" data-aos-delay="300">
              <h3>Plan 2</h3>
              <h4><sup>INR</sup>6000<span> / year</span></h4>
              <ul>
                  <li>Single League Management</li>
                  <li>1-3 Auction Managment for 1-3 Tournaments</li>
                  <li class="na">Unlimited</li>
              </ul>
              <div class="btn-wrap">
                <a href="#contact" class="btn-buy">Call Now</a>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mt-4 mt-lg-0">
            <div class="box" data-aos="fade-up" data-aos-delay="400">
              <span class="advanced">Advanced</span>
              <h3>Ultimate</h3>
              <h4><sup>INR</sup>9000<span> / year</span></h4>
              <ul>
                <li>Unlimited League Management</li>
                <li>Unlimited Auction Management</li>
                <li>Unlimited Tournament Management</li>
              
              </ul>
              <div class="btn-wrap">
                <a href="#contact" class="btn-buy">Call Now</a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

    <section id="contact" class="contact">
      <div class="container">

        <div class="section-title">
          <h2>Contact</h2>
          
        </div>

      </div>

      <div class="container">

        <div class="row mt-5">

          <div class="col-lg-12">

            <div class="row">
              <div class="col-md-12">
                <div class="info-box">
                  <i class="bx bx-map"></i>
                  <h3>Our Address</h3>
                  <p><b>Ashok Enterprises </b>,<br/>B2 Doshi Industrial Estate, Opp.Shilpa Hotel , Navghar Road, <br/> Bhayander East</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="info-box mt-4">
                  <i class="bx bx-envelope"></i>
                  <h3>Email Us</h3>
                  <p>sportzmitra@gmail.com</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="info-box mt-4">
                  <i class="bx bx-phone-call"></i>
                  <h3>Call Us</h3>
                  <p>+91-8097538306<br/></p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>

                </main>
            </div>

        );
    }
}

Home.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    console.log('state', state)
    return {
        count: state.login.count,
        password: state.login.password,
        username: state.login.username,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClickLogin: (id) => dispatch(login(id)),
        onChangeValueLogin: (evt) => dispatch(onChangeValueLogin(evt)),
        setToast: (success, message) => dispatch(setToast(success, message)),
        resetToast: (evt) => dispatch(resetToast(evt)),

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
