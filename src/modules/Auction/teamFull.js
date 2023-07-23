import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import profile from '../../images/profile.jpg'
import nodata from '../../images/nodata.jpg'
import history from "../../modules/utils/history";
import SportzMitra from '../../images/SportzMitra.png'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faMinus, faPeopleArrows, faPlus} from '@fortawesome/free-solid-svg-icons';
class TeamFull extends React.Component {
    getPrice(cat, min) {
        let type = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.type ? this.props.tournamentDetailGlobal.type : ''
        let pointJson = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.pointJson ? this.props.tournamentDetailGlobal.pointJson : []
        let basePriceMin
        let increasePrice
        if (type == 'category') {
            for (var i = 0; i < pointJson.length; i++) {
                console.log(pointJson[i])
                if (pointJson[i].category == cat) {
                    basePriceMin = pointJson[i].min
                    increasePrice = pointJson[i].increase
                    console.log(cat, min,'cat, min')
                    console.log(basePriceMin, increasePrice,'increasePrice, min')
                    break;
                }
            }
        } else {
            if (pointJson && pointJson.length > 0) {
                basePriceMin = pointJson[0].min
                increasePrice = pointJson[0].increase
            }
        }
        if (min) {
            return basePriceMin
        } else {
            return increasePrice
        }
    }
    increaseBid(amount){
        let teamPoint = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teamPoint ? this.props.tournamentDetailGlobal.teamPoint : ''
        let error = false
        let lastAmount = this.props.auctionTournamentPlayerBindAmount ? this.props.auctionTournamentPlayerBindAmount : 0
        let current = parseInt(lastAmount) + parseInt(amount)
        if(current> teamPoint){
            error = true
            this.props.setToast(false, 'Amount cannot be more then team total Point.')
        }
        if(!error)
        this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentPlayerBindAmount', value: current } })
        
    }
    decreaseBid(amount){
        let teamPoint = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teamPoint ? this.props.tournamentDetailGlobal.teamPoint : ''
        let error = false
        let lastAmount = this.props.auctionTournamentPlayerBindAmount ? this.props.auctionTournamentPlayerBindAmount : 0
        let current = parseInt(lastAmount) - parseInt(amount)
        if(current> teamPoint){
            error = true
            this.props.setToast(false, 'Amount cannot be more then team total Point.')
        }
        if(!error)
        this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentPlayerBindAmount', value: current } })
        
    }
    render() {  
     
        let player = this.props.player
        let teamList = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams && this.props.tournamentDetailGlobal.teams.length > 0 ? this.props.tournamentDetailGlobal.teams : []
        let pointJson = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.pointJson ? this.props.tournamentDetailGlobal.pointJson : []
        let teamPoint = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teamPoint ? this.props.tournamentDetailGlobal.teamPoint : ''
        let type = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.type ? this.props.tournamentDetailGlobal.type : ''

        let teamListArray = []
        if (teamList && teamList.length > 0) {
            teamList.map((item) => {
                teamListArray.push({
                    value: item.teamId,
                    label: item.teamName,
                    totalSpend:item.totalSpend
                })
            })
        }
        if(player && (!this.props.auctionTournamentPlayerBindAmount || this.props.auctionTournamentPlayerBindAmount == 0 )){
            this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentPlayerBindAmount', value:  this.getPrice(player.playerType, true) } })
        }
        return (
            player ? <div style={{display:'flex', alignItems:'center',width:'100%',justifyContent:'space-between'}} >
                <div className='inputMainBoxFullScreen'>
                    <div style={{ padding: 10, backgroundColor: '#2c3e50', cursor: 'pointer',  zIndex: 2 }} onClick={() => {
                         this.props.toggleFullSceen(this.props.auctionFullScreen );
                        this.props.onChangeValueGlobal({ target: { id: 'auctionFullScreen', value: false } })
                        history.push(-1)
                    }}>
                        <FontAwesomeIcon icon={faArrowLeft} size="2x" style={{ color: '#FFFFFF', cursor: 'pointer' }} onClick={() => {
                             this.props.toggleFullSceen(this.props.auctionFullScreen );
                            this.props.onChangeValueGlobal({ target: { id: 'auctionFullScreen', value: false } })
                            history.push(-1)
                        }} />
                    </div>
                        <div className='inputBox'>
                        <div className='input-group'>
                            <select className="form-control form-control-lg"
                              value ={this.props.auctionTournamentTeamId}
                              style={{    width: '15rem'}}
                                onChange={(e) => {
                                    this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentTeamId', value: e.target.value } })
                                    this.props.onChangeValueGlobal({ target: { id: 'auctionPlayerId', value: player.playerId } })
                                    this.props.onChangeValueGlobal({ target: { id: 'auctionRequestId', value: player.id } })
                                    this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentId', value: player.tournamentId } })                                    
                                }} >
                                <option value=""> Select Team</option>
                                {teamListArray && teamListArray.length > 0 && teamListArray.map(item => <option value={item.value} totalSpend={item.totalSpend}>{item.label}</option>)}

                            </select>
                        </div>
                        </div>
                        <div className='inputBox'>
                           <div className='input-group'>
                            <input type='text' id="form3Example3"
                            disabled={true}
                                value ={this.props.auctionTournamentPlayerBindAmount}
                                onChange={(e) => {
                                    this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentPlayerBindAmount', value: e.target.value } })
                                }}
                                className="form-control form-control-lg"
                                placeholder="please bid amount" />
                                <div className='inputGroupBox' style={{padding:10}}>
                                <FontAwesomeIcon icon={faPlus} size="2x" style={{ color: '#FFFFFF' }} onClick={() =>this.increaseBid(this.getPrice(player.playerType, false))} />
                                </div>   
                                <div className='inputGroupBoxDanger' style={{padding:10}}>
                                <FontAwesomeIcon icon={faMinus} size="2x" style={{ color: '#FFFFFF' }} onClick={() =>this.decreaseBid(this.getPrice(player.playerType, false))} />
                                </div> 

                                </div>
                        </div>
                    </div>
                    <div className='buttonBoxFullScreen'>
                        <a className="btn buttonPrimary" onClick={() => {
                            this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentTeamId', value: this.props.auctionTournamentTeamId } })
                            this.props.onChangeValueGlobal({ target: { id: 'auctionPlayerId', value: player.playerId } })
                            this.props.onChangeValueGlobal({ target: { id: 'auctionRequestId', value: player.id } })
                            this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentId', value: player.tournamentId } })
                            this.props.onChangeValueGlobal({ target: { id: 'soldPlayer', value: player.tournamentId } })
                            this.props.onChangeValueGlobal({ target: { id: 'auctionSoldPlayer', value: player } })
                            player.bidAmount = this.props.auctionTournamentPlayerBindAmount
                            this.props.onChangeValueGlobal({ target: { id: 'auctionSoldToTeam', value: this.props.auctionTournamentTeamId } })
                            this.props.addPlayerToTeam(player.playerType)
                        }}>Sold</a>
                          <a className="btn buttonDanger" onClick={() => {
                            this.props.onChangeValueGlobal({ target: { id: 'auctionPlayerId', value: player.playerId } })
                            this.props.unSoldPlayer()
                        }}>Un-Sold</a>
                    <a className="btn btn-primary" onClick={() => {
                      this.props.showTabs()
                    }}>
                                                        <FontAwesomeIcon icon={faPeopleArrows} size="2x" style={{ color: '#FFFFFF' }} onClick={() =>this.increaseBid(this.getPrice(player.playerType, false))} />
                        </a>
                    </div>
                    <img
                                alt=""
                                src={SportzMitra}
                                className="auctionLogo"
                            />
            </div> : <div className="blogSlider">

                <div className='noDataFound'>
                    <div className='imgBox'>
                        <img src={nodata} />
                    </div><b>No Player detail</b></div> </div>

        )
    }
}


export default TeamFull;