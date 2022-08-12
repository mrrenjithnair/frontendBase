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
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="assets/img/2.png"
                            alt="First slide"
                        />
                        <Carousel.Caption >
                            <div className='slidercontainer'>
                                <h2>Player registration</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
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
                                <h2>Auction /Bid</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="assets/img/league.png"
                            alt="Third slide"
                        />

                        <Carousel.Caption >
                            <div className='slidercontainer'>
                                <h2>League</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <main id="main">

                    <section id="about" className="about">
                        <div className="container" data-aos="fade-up">

                            <div className="section-title">
                                <h2>About Us</h2>
                                <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                            </div>

                            <div className="row">
                                <div className="col-lg-6" data-aos="fade-right">
                                    <img src="assets/img/94.webp" className="img-fluid" alt="" />
                                </div>
                                <div className="col-lg-6 pt-4 pt-lg-0 content" data-aos="fade-left">
                                    <h3>Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.</h3>
                                    <p className="fst-italic">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua.
                                    </p>
                                    <ul>
                                        <li><i className="bi bi-check-circle"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                                        <li><i className="bi bi-check-circle"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                                        <li><i className="bi bi-check-circle"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
                                    </ul>
                                    <p>
                                        Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum
                                    </p>
                                </div>
                            </div>

                        </div>
                    </section>

                    <section id="services" className="services services">
                        <div className="container" data-aos="fade-up">

                            <div className="section-title">
                                <h2>Features</h2>
                                <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                            </div>

                            <div className="row">
                                <div className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="100">
                                    <div className="icon"><i className="fas fa-heartbeat"></i></div>
                                    <h4 className="title"><a href="">Lorem Ipsum</a></h4>
                                    <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                                </div>
                                <div className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="200">
                                    <div className="icon"><i className="fas fa-pills"></i></div>
                                    <h4 className="title"><a href="">Dolor Sitema</a></h4>
                                    <p className="description">Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</p>
                                </div>
                                <div className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="300">
                                    <div className="icon"><i className="fas fa-hospital-user"></i></div>
                                    <h4 className="title"><a href="">Sed ut perspiciatis</a></h4>
                                    <p className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
                                </div>
                            </div>

                        </div>
                    </section>

                    <section id="league" className="league section-bg d-none">
                        <div className="container" data-aos="fade-up">

                            <div className="section-title">
                                <h2>League</h2>
                                <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                            </div>

                            <form action="forms/league.php" method="post" role="form" className="php-email-form" data-aos="fade-up" data-aos-delay="100">
                                <div className="row">
                                    <div className="col-md-4 form-group">
                                        <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                                    </div>
                                    <div className="col-md-4 form-group mt-3 mt-md-0">
                                        <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                                    </div>
                                    <div className="col-md-4 form-group mt-3 mt-md-0">
                                        <input type="tel" className="form-control" name="phone" id="phone" placeholder="Your Phone" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 form-group mt-3">
                                        <input type="datetime" name="date" className="form-control datepicker" id="date" placeholder="league Date" required />
                                    </div>
                                    <div className="col-md-4 form-group mt-3">
                                        <select name="department" id="department" className="form-select">
                                            <option value="">Select Department</option>
                                            <option value="Department 1">Department 1</option>
                                            <option value="Department 2">Department 2</option>
                                            <option value="Department 3">Department 3</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 form-group mt-3">
                                        <select name="doctor" id="doctor" className="form-select">
                                            <option value="">Select Doctor</option>
                                            <option value="Doctor 1">Doctor 1</option>
                                            <option value="Doctor 2">Doctor 2</option>
                                            <option value="Doctor 3">Doctor 3</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group mt-3">
                                    <textarea className="form-control" name="message" rows="5" placeholder="Message (Optional)"></textarea>
                                </div>
                                <div className="my-3">
                                    <div className="loading">Loading</div>
                                    <div className="error-message"></div>
                                    <div className="sent-message">Your league request has been sent successfully. Thank you!</div>
                                </div>
                                <div className="text-center"><button type="submit">Make an league</button></div>
                            </form>

                        </div>
                    </section>
                    <section id="departments" className="departments">
                        <div className="container" data-aos="fade-up">

                            <div className="section-title">
                                <h2>Leagues</h2>
                                <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                            </div>

                            <div className="row" data-aos="fade-up" data-aos-delay="100">
                                <div className="col-lg-4 mb-5 mb-lg-0">
                                    <ul className="nav nav-tabs flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link active show" data-bs-toggle="tab" data-bs-target="#tab-1">
                                                <h4>Leagues</h4>
                                                <p>Quis excepturi porro totam sint earum quo nulla perspiciatis eius.</p>
                                            </a>
                                        </li>
                                        <li className="nav-item mt-2">
                                            <a className="nav-link" data-bs-toggle="tab" data-bs-target="#tab-2">
                                                <h4>Tournament</h4>
                                                <p>Voluptas vel esse repudiandae quo excepturi.</p>
                                            </a>
                                        </li>
                                        <li className="nav-item mt-2">
                                            <a className="nav-link" data-bs-toggle="tab" data-bs-target="#tab-3">
                                                <h4>Auction</h4>
                                                <p>Velit veniam ipsa sit nihil blanditiis mollitia natus.</p>
                                            </a>
                                        </li>
                                        <li className="nav-item mt-2">
                                            <a className="nav-link" data-bs-toggle="tab" data-bs-target="#tab-4">
                                                <h4>Team</h4>
                                                <p>Ratione hic sapiente nostrum doloremque illum nulla praesentium id</p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-8">
                                    <div className="tab-content">
                                        <div className="tab-pane active show" id="tab-1">
                                            <h3>Leagues</h3>
                                            <p className="fst-italic">Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka</p>
                                            <img src="assets/img/96.webp" alt="" className="img-fluid" />
                                            <p>Et nobis maiores eius. Voluptatibus ut enim blanditiis atque harum sint. Laborum eos ipsum ipsa odit magni. Incidunt hic ut molestiae aut qui. Est repellat minima eveniet eius et quis magni nihil. Consequatur dolorem quaerat quos qui similique accusamus nostrum rem vero</p>
                                        </div>
                                        <div className="tab-pane" id="tab-2">
                                            <h3>Tournament</h3>
                                            <p className="fst-italic">Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka</p>
                                            <img src="assets/img/96.webp" alt="" className="img-fluid" />
                                            <p>Et nobis maiores eius. Voluptatibus ut enim blanditiis atque harum sint. Laborum eos ipsum ipsa odit magni. Incidunt hic ut molestiae aut qui. Est repellat minima eveniet eius et quis magni nihil. Consequatur dolorem quaerat quos qui similique accusamus nostrum rem vero</p>
                                        </div>
                                        <div className="tab-pane" id="tab-3">
                                            <h3>Auction</h3>
                                            <p className="fst-italic">Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka</p>
                                            <img src="assets/img/94.webp" alt="" className="img-fluid" />
                                            <p>Et nobis maiores eius. Voluptatibus ut enim blanditiis atque harum sint. Laborum eos ipsum ipsa odit magni. Incidunt hic ut molestiae aut qui. Est repellat minima eveniet eius et quis magni nihil. Consequatur dolorem quaerat quos qui similique accusamus nostrum rem vero</p>
                                        </div>
                                        <div className="tab-pane" id="tab-4">
                                            <h3>Team</h3>
                                            <p className="fst-italic">Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka</p>
                                            <img src="assets/img/923.webp" alt="" className="img-fluid" />
                                            <p>Et nobis maiores eius. Voluptatibus ut enim blanditiis atque harum sint. Laborum eos ipsum ipsa odit magni. Incidunt hic ut molestiae aut qui. Est repellat minima eveniet eius et quis magni nihil. Consequatur dolorem quaerat quos qui similique accusamus nostrum rem vero</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                    <section id="featured-services" className="featured-services">
                        <div className="section-title">
                            <h2>Products</h2>

                        </div>
                        <div className="container" data-aos="fade-up">
                            <div className="row">
                                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                                    <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
                                        <div className="icon"><img src="assets/img/90.webp" className="img-fluid" alt="" /></div>
                                        <h4 className="title"><a href="">Lorem Ipsum</a></h4>
                                        <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                                    <div className="icon-box" data-aos="fade-up" data-aos-delay="200">
                                        <div className="icon"><img src="assets/img/94.webp" className="img-fluid" alt="" /></div>
                                        <h4 className="title"><a href="">Sed ut perspiciatis</a></h4>
                                        <p className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                                    <div className="icon-box" data-aos="fade-up" data-aos-delay="300">
                                        <div className="icon"><img src="assets/img/97.webp" className="img-fluid" alt="" /></div>
                                        <h4 className="title"><a href="">Magni Dolores</a></h4>
                                        <p className="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                                    <div className="icon-box" data-aos="fade-up" data-aos-delay="400">
                                        <div className="icon"><img src="assets/img/94.webp" className="img-fluid" alt="" /></div>
                                        <h4 className="title"><a href="">Nemo Enim</a></h4>
                                        <p className="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="pricing" className="pricing">
                        <div className="container" data-aos="fade-up">

                            <div className="section-title">
                                <h2>Pricing</h2>
                                <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                            </div>

                            <div className="row">

                                <div className="col-lg-3 col-md-6">
                                    <div className="box" data-aos="fade-up" data-aos-delay="100">
                                        <h3>Free</h3>
                                        <h4><sup>$</sup>0<span> / month</span></h4>
                                        <ul>
                                            <li>Aida dere</li>
                                            <li>Nec feugiat nisl</li>
                                            <li>Nulla at volutpat dola</li>
                                            <li className="na">Pharetra massa</li>
                                            <li className="na">Massa ultricies mi</li>
                                        </ul>
                                        <div className="btn-wrap">
                                            <a href="#" className="btn-buy">Buy Now</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
                                    <div className="box featured" data-aos="fade-up" data-aos-delay="200">
                                        <h3>Business</h3>
                                        <h4><sup>$</sup>19<span> / month</span></h4>
                                        <ul>
                                            <li>Aida dere</li>
                                            <li>Nec feugiat nisl</li>
                                            <li>Nulla at volutpat dola</li>
                                            <li>Pharetra massa</li>
                                            <li className="na">Massa ultricies mi</li>
                                        </ul>
                                        <div className="btn-wrap">
                                            <a href="#" className="btn-buy">Buy Now</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
                                    <div className="box" data-aos="fade-up" data-aos-delay="300">
                                        <h3>Developer</h3>
                                        <h4><sup>$</sup>29<span> / month</span></h4>
                                        <ul>
                                            <li>Aida dere</li>
                                            <li>Nec feugiat nisl</li>
                                            <li>Nulla at volutpat dola</li>
                                            <li>Pharetra massa</li>
                                            <li>Massa ultricies mi</li>
                                        </ul>
                                        <div className="btn-wrap">
                                            <a href="#" className="btn-buy">Buy Now</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
                                    <div className="box" data-aos="fade-up" data-aos-delay="400">
                                        <span className="advanced">Advanced</span>
                                        <h3>Ultimate</h3>
                                        <h4><sup>$</sup>49<span> / month</span></h4>
                                        <ul>
                                            <li>Aida dere</li>
                                            <li>Nec feugiat nisl</li>
                                            <li>Nulla at volutpat dola</li>
                                            <li>Pharetra massa</li>
                                            <li>Massa ultricies mi</li>
                                        </ul>
                                        <div className="btn-wrap">
                                            <a href="#" className="btn-buy">Buy Now</a>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </section>

                    <section id="contact" className="contact">
                        <div className="container">

                            <div className="section-title">
                                <h2>Contact</h2>

                            </div>

                        </div>

                        <div className="container">

                            <div className="row mt-5">

                                <div className="col-lg-12">

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="info-box">
                                                <i className="bx bx-map"></i>
                                                <h3>Our Address</h3>
                                                <p>ABC XYZ 1020 Easte North Mumbai</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="info-box mt-4">
                                                <i className="bx bx-envelope"></i>
                                                <h3>Email Us</h3>
                                                <p>info@example.com<br />contact@example.com</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="info-box mt-4">
                                                <i className="bx bx-phone-call"></i>
                                                <h3>Call Us</h3>
                                                <p>+1 5589 55488 55<br />+1 6678 254445 41</p>
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
