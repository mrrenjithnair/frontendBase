import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import team from '../../images/team.jpg'

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'


class AuctionFullScreen extends React.Component {
    render() {
        return (
            <div style={{ height: '100%' }}>
                <div style={{ height: '15%',display: 'flex', justifyContent: 'space-between', }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '20%' }}>
                        <div><h1>100</h1></div>
                        <div><h1>40</h1></div>
                        <div><h1>60</h1></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '60%' }}>
                        <h1>Big match championship</h1>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '20%' }}></div>
                </div>
                <div style={{ height: '80%' }}></div>
                <div></div>

            </div>
        )
    }
}


export default AuctionFullScreen;