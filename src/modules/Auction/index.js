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
import Team from './team';

import { getTournamentList, onChangeValueGlobal } from '../Global/actions';
import PropTypes from 'prop-types';
import './style.css';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { iteratee } from 'lodash';
import EditModal from '../../components/EditModal'
import { getTournamentDetails } from './actions';

export class Auction extends React.PureComponent {
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
        this.props.getTournamentList()
    }

    render() {
        let tournamentListGlobal = this.props.tournamentListGlobal && this.props.tournamentListGlobal.length > 0 ? this.props.tournamentListGlobal : []
        let tournamentListGlobalArray = []
        if (tournamentListGlobal && tournamentListGlobal.length > 0) {
            tournamentListGlobal.map((item) => {
                tournamentListGlobalArray.push({
                    value: item.id,
                    label: item.name,
                })
            })
        }
        console.log(this.props.tournamentDetailGlobal, 'this.props.tournamentDetailGlobal')
        return (


            <section className="vh-100">
                <HeaderNavBar />
                <div id="root">
                    <div className='container'>
                        <div className='auctionBox'>
                            <div className='detailBox'>

                                <div className='tournamentDetailBox'>
                                    <label className="flabel capitalize" htmlFor="form3Example3"> Select tournament for auction </label>
                                    <select className="form-control"
                                        onChange={(e) => {
                                            this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentId', value: e.target.value } })
                                            this.props.getTournamentList()
                                        }} >
                                        <option value=""> Select Type</option>
                                        {tournamentListGlobalArray && tournamentListGlobalArray.length > 0 && tournamentListGlobalArray.map(item => <option value={item.value}>{item.label}</option>)}

                                    </select>
                                    <br />
                                    {this.props.tournamentDetailGlobal && <div>
                                        <div className='tournamentName'>       {this.props.tournamentDetailGlobal.name}</div>
                                    </div>}
                                    <div>
                                        {this.props.tournamentDetailGlobal && <div className='tableBox'>
                                            <div className='tableBoxRow'>
                                                <div class="cardView">
                                                    <div class="item">
                                                        <h5> Team Total </h5>
                                                    </div>
                                                    <div class="name">
                                                        <h3>
                                                            {this.props.tournamentDetailGlobal.teamTotal}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div class="cardView">
                                                    <div class="item">
                                                        <h5>  Member Total </h5>
                                                    </div>
                                                    <div class="name">
                                                        <h3>
                                                            {this.props.tournamentDetailGlobal.memberTotal}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>}
                                        {this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams && <div>
                                            <div className='tournamentName'> team List</div>
                                        </div>}
                                        {this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams && <div className='tableBox'>
                                            <div className='tableBoxRow'>
                                                {this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams.map((item) => (<Card >
                                                    {item.teamLogo && <Card.Img variant="top" src={item.teamLogo} />}
                                                    <Card.Body>
                                                        <Card.Title> {item.teamName}</Card.Title>
                                                    </Card.Body>
                                                    <Card.Footer>
                                                        <Card.Text>
                                                            <b>Owner:</b>  {item.ownerName}
                                                        </Card.Text>
                                                    </Card.Footer>
                                                </Card>
                                                ))}
                                            </div>

                                        </div>}

                                        <hr />

                                    </div>
                                </div>
                            </div>
                            <div classNameName='tournamentPlayer'>
                                <Team/>
                            </div>
                        </div>


                    </div>
                </div>
                <br />
                <br />
                <br />

                <BottomNavBar />

            </section>
        );
    }
}

Auction.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    console.log(state)
    return {
        tournamentDetailGlobal: state.global.tournamentDetailGlobal,
        nearByTournament: state.global.nearByTournament,
        TournamentDetailsPage: state.global.TournamentDetailsPage,
        loggedInRoleId: state.global.loggedInRoleId,
        selectedTeam: state.tournamentDetail.selectedTeam,
        tournamentListGlobal: state.global.tournamentListGlobal,
        auctionTournamentId: state.global.auctionTournamentId,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        getTournamentList: () => dispatch(getTournamentList()),
        getTournamentDetails: () => dispatch(getTournamentDetails()),
        onChangeValueGlobal: (evt) => dispatch(onChangeValueGlobal(evt)),

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Auction);
