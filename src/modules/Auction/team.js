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
        let basePriceMax
        if (type == 'category') {
            pointJson.map((item) => {
                if (item.category == cat) {
                    basePriceMin = item.min
                    basePriceMax = item.max
                }
            })
        } else {
            if (pointJson && pointJson.length > 0) {
                basePriceMin = pointJson[0].min
                basePriceMax = pointJson[0].max
            }
        }
        if (min) {
            return basePriceMin
        } else {
            return basePriceMax
        }
    }
    render() {
        let player = this.props.player
        let teamList = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams  && this.props.tournamentDetailGlobal.teams.length > 0 ? this.props.tournamentDetailGlobal.teams : []
        let pointJson = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.pointJson ? this.props.tournamentDetailGlobal.pointJson : []
        let teamPoint = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teamPoint ? this.props.tournamentDetailGlobal.teamPoint : ''
        let type = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.type ? this.props.tournamentDetailGlobal.type : ''

        let teamListArray = []
        if (teamList && teamList.length > 0) {
            teamList.map((item) => {
                teamListArray.push({
                    value: item.teamId,
                    label: item.teamName,
                })
            })
        }
        return (
            player ? <div className="blogSlider">
                {/* <div className='buttonBox'>
                    <Button className="buttonPrimary" onClick={() => this.props.next('item')}>Next Player</Button>
                    <Button className="buttonPrimary" onClick={() => this.editTournament('item')}>Complete Auction</Button>
                </div> */}
                <br />
                <br />
                <div className='teamBox'>
                    <div className='imgBox'>
                        <img src={profile} />
                    </div>
                    <div className='playerDetailBox'>
                        {player.playerName && <p>
                            <b>Name</b> :    {player.playerName}
                        </p>} 
                        {player.category && <p>
                            <b>Type</b> :    {player.category}
                        </p>} 
                        {player.playerType && <p>
                            <b>Category</b> :    {player.playerType}
                        </p>}
                        {player.bio && <p>
                            <b>About</b>:    {player.bio}
                        </p>}
                    </div>
                    <br />
                    <br />
                    <div style={{padding:'10px', width:'100%'}}>
                        <h4 className='basePrice'>Base Price</h4>
                        <div className='bidBox'>
                            <b>Min Price</b> {this.getPrice(player.playerType, true)}
                            <b>Max Price</b> {this.getPrice(player.playerType, false)}
                        </div>
                    </div>

                </div>
                <div className='inputMainBox'>
                    <div>
                        <div className='inputBox'>
                            <label className="flabel capitalize" htmlFor="form3Example3"> Select the Team </label>
                            <select className="form-control"
                                onChange={(e) => {
                                    this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentTeamId', value: e.target.value } })
                                    this.props.onChangeValueGlobal({ target: { id: 'auctionPlayerId', value: player.playerId } })
                                    this.props.onChangeValueGlobal({ target: { id: 'auctionRequestId', value: player.id } })
                                    this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentId', value: player.tournamentId } })
                                }} >
                                <option value=""> Select Team</option>
                                {teamListArray && teamListArray.length > 0 && teamListArray.map(item => <option value={item.value}>{item.label}</option>)}

                            </select>
                        </div>
                        <div className='inputBox'>
                            <label className="flabel capitalize" htmlFor="form3Example3"> Select enter the bid amount </label>
                            <input type='text' id="form3Example3"
                                onChange={(e) => { this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentPlayerBindAmount', value: e.target.value } })
                            }}
                                className="form-control form-control-lg"
                                placeholder="please bid amount" />
                        </div>
                    </div>
                    <div className='buttonBox'>
                        <Button className="buttonPrimary" onClick={() => this.props.addPlayerToTeam()}>Submit</Button>
                    </div>
                </div>

            </div> : <div className="blogSlider"> 
                    
                    <div className='noTournamentDetail'>
                    <div className='imgBox'>
                        <img src={nodata} />
                    </div><b>No Player detail</b></div> </div>

        )
    }
}


export default Team;