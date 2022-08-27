import React from 'react';
import { connect } from 'react-redux';

import BottomNavBar from '../../components/BottomNavBar'
import HeaderNavBar from '../../components/HeaderNavBar'
import history from "../utils/history";
import { formatDate } from '../utils/commonUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import AuctionModal from '../../components/AuctionModal'

import { getPlayerTeamList } from '../Global/actions';
import PropTypes from 'prop-types';
import './style.css';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { iteratee } from 'lodash';
import EditModal from '../../components/EditModal'
import { getTournamentDetails } from './actions';
import team from '../../images/team.jpg'
import nodata from '../../images/nodata1.jpg'

export class Team extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedItem: false,
            editModal: false,
            typing: false
        }
    }

    componentDidMount() {
        this.props.getPlayerTeamList()
        window.scrollTo(0, 0)
    }



    render() {

        return (
            <section className="compMain">
                <div id="root">
                    <div className='container'>
                        <div id="root">
                            <div className="team-boxed">
                                <div className="container">
                                    <div className="intro">
                                        <h2 className="text-center"> My Team</h2>
                                    </div>
                                    <div className="row people">
                                        {this.props.playerTeamList && this.props.playerTeamList.length > 0 ?
                                            this.props.playerTeamList.map((item) => {
                                                return (
                                                    <div class="col-md-6 col-lg-3 item">

                                                        <div class="box">
                                                            <div class="label-top shadow-sm">
                                                                <a class="text-white" href="#">{item.tournamentName}</a>
                                                            </div>
                                                            {item.logoUrl ? <img class="rounded-circle" src={item.logoUrl} /> : <img class="rounded-circle" src={team} />}
                                                            <h3 class="name">{item.teamName}</h3>
                                                            <div class="text-left"><span class="font-weight-bolder">Bid Amount :</span> <span class="team-text"> {item.bidAmount}</span></div>
                                                            <div class="text-left"><span class="font-weight-bolder">Joined :</span> <span class="team-text"> {formatDate(item.joined)}</span></div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            ) : <div className="blogSlider">

                                                <div className='noDataFound'>
                                                    <div className='imgBox'>
                                                        <img src={nodata} />
                                                    </div><b> No Team Found</b></div> </div>}
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Team.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    console.log(state)
    return {
        playerTeamList: state.global.playerTeamList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPlayerTeamList: (evt) => dispatch(getPlayerTeamList(evt)),

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Team);
