import React from 'react';
import { connect } from 'react-redux';


import { getPlayerTeamList } from '../Global/actions';
import PropTypes from 'prop-types';
import './style.css';
import history from "../utils/history";

import team from '../../images/team.jpg'
import profile from '../../images/profile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export class TeamDetails extends React.PureComponent {
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
        let data = this.props.auctionTeamDetail
        let soldPlayer = data.playerList.soldPlayer
        let unSoldPlayer = data.playerList.unSoldPlayer
        let remainingAmount = data.totalAmount - parseInt(data.totalSpend)
        let nextPlayerAmount = 0
        if (data && data.playerList && data.playerList.nextPlayerAmount) { nextPlayerAmount = parseInt(data.playerList.nextPlayerAmount); }

        console.log('totalAmount after', remainingAmount)

        return (
            <section className="teamCompMain">
                <div id="root" className='teamBoxExpand'>
                    <div className='teamSection'>
                    <div className="team-boxed">
                        <div className="col-12 item" key={data.id}>

                            <div className="box">
                                {data.logoUrl ? <img className="rounded-circle" src={data.logoUrl} alt={data.teamName} data-letters="MN" />
                                    : <img className="rounded-circle" src={profile} alt={data.teamName} />}

                                <h3 className="name">{data.teamName}</h3>
                                <div className="text-left"><span className="font-weight-bolder">Owner :</span> <span className="team-text">  {data.ownerName}</span></div>
                                <div className="text-left"><span className="font-weight-bolder">Pending Amoun:</span> <span className="team-text"> {remainingAmount}</span></div>
                                {nextPlayerAmount > 0 &&  <div className="text-left"><span className="font-weight-bolder"> Next Player Max Bid Amount: </span> <span className="team-text">  {nextPlayerAmount}</span></div>}
                            </div>

                        </div>
                        <a href="#" onClick={() => history.push('/auction')} className="back-top d-flex align-items-center justify-content-center active"><i
                            className="bi bi-arrow-left-short"></i></a>
                    </div>
                    </div>
                    <div className='soldUnsoldSection'>

                        <div className='cardPlayerBox'>
                            {soldPlayer && soldPlayer.length > 0 && soldPlayer.map((player) => {
                                return <div class="card cardPlayer">
                                    <div class="img-container">
                                        <div class="skewed">
                                            <img id="img" src={player.profilePictureUrl} />
                                        </div>
                                    </div>
                                    <div class="contentImg">
                                        <h2>{player.playerName}</h2>
                                        <p>{player.bidAmount}</p>
                                    </div>
                                </div>
                            })}
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

TeamDetails.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    console.log(state)
    return {
        playerTeamList: state.global.playerTeamList,
        auctionTeamDetail: state.global.auctionTeamDetail,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPlayerTeamList: (evt) => dispatch(getPlayerTeamList(evt)),

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TeamDetails);
