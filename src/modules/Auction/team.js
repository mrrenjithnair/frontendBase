import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
class Team extends React.Component {
    render() {
        let player = this.props.player
        let teamList = this.props.tournamentDetailGlobal && this.props.tournamentDetailGlobal.teams  && this.props.tournamentDetailGlobal.teams.length > 0 ? this.props.tournamentDetailGlobal.teams : []
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
                <div className='buttonBox'>
                    <Button className="buttonPrimary" onClick={() => this.props.next('item')}>Next Player</Button>
                    <Button className="buttonPrimary" onClick={() => this.editTournament('item')}>Complete Auction</Button>
                </div>
                <br />
                <br />
                <div className='teamBox'>
                    <div className='imgBox'>
                        <img src='https://pbs.twimg.com/profile_images/1146479956798480384/aCCC7qb8_400x400.png' />
                    </div>
                    <div className='detailBox'>
                        <h1>{player.playerName}</h1>
                        <h4>{player.category}</h4>
                        {player.bio && <p>
                            <b>About</b>:    {player.bio}
                        </p>}
                    </div>
                    <br />
                    <div className='bidBox'>
                        <b>Base Price</b> 20000
                    </div>

                </div>
                <div className='inputMainBox'>
                    <div>
                        <div className='inputBox'>
                            <label className="flabel capitalize" htmlFor="form3Example3"> Select the Team </label>
                            <select className="form-control"
                                onChange={(e) => {
                                    this.props.onChangeValueGlobal({ target: { id: 'auctionTournamentTeamId', value: e.target.value } })
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
                        <Button className="buttonPrimary" onClick={() => this.editTournament('item')}>Submit</Button>
                    </div>
                </div>

            </div> : <div></div>
        )
    }
}


export default Team;