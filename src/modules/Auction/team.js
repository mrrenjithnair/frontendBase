import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import profile from '../../images/profile.jpg'
import nodata from '../../images/nodata.jpg'

class Team extends React.Component {
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
            player ? <div className="blogSlider">
                <div style={{ 'display': 'flex' }}>
                    <div class="card-wrapper">
                        <div class="card">

                            <div class="product-imgs">
                                <div class="img-display">
                                    <div class="img-showcase">
                                        {player.profilePictureUrl ? <img src={player.profilePictureUrl} alt="shoe image" /> : <img src={profile} />}
                                    </div>
                                </div>
                                <div style={{ 'display': 'flex' }}>
                                    <div className='bidBox'>
                                        <b>Base Price</b> {this.getPrice(player.playerType, true)}
                                    </div>
                                </div>
                            </div>

                            <div class="product-content">
                                <h2 class="product-title">{player.playerName}</h2>
                                <a href="#" class="product-link">{player.category}</a>
                                <div class="product-detail">
                                <h2>about Player: </h2>
                                    <p className='aboutUs'> {player.bio}</p>
                                    <ul>
                                        <li>Type: <span>{player.playerType}</span></li>
                                        <li>Category: <span>{player.category}</span></li>
                                        <li>Total Matches: <span>{player.totalMatches ? player.totalMatches : 0 }</span></li>
                                        <li>Last Bid Price: <span>{player.lastBidAmount ? player.lastBidAmount : 0}</span></li>
                                        <li>Location: <span>{player.location}</span></li>
                                        { player.url && <a href={player.url} target='blank' className="btn btn-primary">View Crichero Profile</a>    }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='inputMainBox'>
                    <div>
                        <div className='inputBox'>
                            <label className="flabel capitalize" htmlFor="form3Example3"> Select the Team </label>
                            <select className="form-control"
                              value ={this.props.auctionTournamentTeamId}
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
                        <div className='inputBox'>
                            <label className="flabel capitalize" htmlFor="form3Example3"> Select enter the bid amount </label>
                           <div className='input-group'>
                            <input type='text' id="form3Example3"
                            disabled={true}
                                value ={this.props.auctionTournamentPlayerBindAmount}
                                onChange={(e) => {
                                    this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentPlayerBindAmount', value: e.target.value } })
                                }}
                                className="form-control form-control-lg"
                                placeholder="please bid amount" />
                                <div className='inputGroupBox'>
                                <a  onClick={()=>{this.increaseBid(this.getPrice(player.playerType, false))}} target='blank' className="btn btn-warning">Increase Bid</a>
                                </div>   
                                <div className='inputGroupBoxDanger'>
                                <a  onClick={()=>{this.decreaseBid(this.getPrice(player.playerType, false))}} target='blank' className="btn btn-danger">Decrease Bid</a>
                                </div> 

                                </div>
                        </div>
                    </div>
                    <div className='buttonBox'>
                        <Button className="buttonPrimary" onClick={() => {
                            this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentTeamId', value: this.props.auctionTournamentTeamId } })
                            this.props.onChangeValueGlobal({ target: { id: 'auctionPlayerId', value: player.playerId } })
                            this.props.onChangeValueGlobal({ target: { id: 'auctionRequestId', value: player.id } })
                            this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentId', value: player.tournamentId } })
                            this.props.addPlayerToTeam(player.playerType)
                        }}>Submit</Button>
                               <Button className="buttonPrimary" onClick={() => {
                            this.props.next()
                        }}>Next Player</Button>
                          <Button className="buttonDanger" onClick={() => {
                            this.props.onChangeValueGlobal({ target: { id: 'auctionPlayerId', value: player.playerId } })
                            this.props.unSoldPlayer()
                        }}>Un-Sold</Button>
                    </div>
                </div>
            </div> : <div className="blogSlider">

                <div className='noDataFound'>
                    <div className='imgBox'>
                        <img src={nodata} />
                    </div><b>No Player detail</b></div> </div>

        )
    }
}


export default Team;