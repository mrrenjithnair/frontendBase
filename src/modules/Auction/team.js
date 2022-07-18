import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
class Team extends React.Component {
    render() {
        return (
            <div className="blogSlider">
                <div className='buttonBox'>
                    <Button className="buttonPrimary" onClick={() => this.editTournament('item')}>Next Player</Button>
                    <Button className="buttonPrimary" onClick={() => this.editTournament('item')}>Complete Auction</Button>
                </div>
                <br />
                <br />
                <div className='teamBox'>
                    <div className='imgBox'>
                        <img src='https://pbs.twimg.com/profile_images/1146479956798480384/aCCC7qb8_400x400.png' />
                    </div>
                    <div className='detailBox'>
                        <h1>Renjith Nair</h1>
                        <h4>All-Rounder</h4>
                        <p>
                            <b>About</b>:    hello hello, I'm angela, artist and developer 🌼 student at stanford; intern at zynga 🌱 happy to be here! 🌿 let's code the best we can!
                        </p>
                    </div>
                    <br/>
                    <div className='bidBox'>
                        <b>Base Price</b> 20000
                    </div>

                </div>
                <div className='inputMainBox'>
                    <div>
                        <div className='inputBox'>
                            <label className="flabel capitalize" htmlFor="form3Example3"> Select the Team </label>
                            <input type='text' id="form3Example3"
                                onChange={(e) => { console.log(e) }}
                                className="form-control form-control-lg"
                                placeholder="please bid amount" />
                        </div>
                        <div className='inputBox'>
                            <label className="flabel capitalize" htmlFor="form3Example3"> Select enter the bid amount </label>
                            <input type='text' id="form3Example3"
                                onChange={(e) => { console.log(e) }}
                                className="form-control form-control-lg"
                                placeholder="please bid amount" />
                        </div>
                    </div>
                    <div className='buttonBox'>
                        <Button className="buttonPrimary" onClick={() => this.editTournament('item')}>Submit</Button>
                    </div>
                </div>

            </div>
        )
    }
}


export default Team;