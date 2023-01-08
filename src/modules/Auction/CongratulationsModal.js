
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import team from '../../images/team.jpg'

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import 'react-toastify/dist/ReactToastify.css';
import profile from '../../images/profile.jpg'

class CongratulationsModal extends React.Component {
    renderUi() {
        if (this.props.team && this.props.player)
        return (
            <div className="soldBox" >
                <div className="soldImageBox">
                    {this.props.player.profilePictureUrl ? <img className="soldImg" src={this.props.player.profilePictureUrl}alt=""/>:<img className="soldImg" src={profile}alt=""></img>}
                </div>
                <div className="soldMain">
                    <h1 className="soldName">{this.props.player.playerName} </h1>
                    <div style={{ display: 'flex' }}><a href="#" class="product-link">{this.props.player.category}</a>
                        <a href="#" class="product-link">({this.props.player.playerType})</a> </div>
                    <h1 className="soldNameSold">Sold to:</h1>
                    <div class="profile-box-auction">
                    {this.props.team.logoUrl ? <img src={this.props.team.logoUrl} alt="profile pic" /> :<img src={team} alt="profile pic" />}
                        <div class="profile-box-textBox"><div class="teamNameAuction">{this.props.team.teamName}</div><span>{this.props.team.ownerName}</span><br/></div></div>
                    <h1 className="soldNameSold">Sold At: {this.props.player.bidAmount}</h1>
                </div>
                <canvas id="myCanvas" class="custom-canvas" ></canvas>
            </div>)

    }
    render() {

        return (
            <Modal
                {...this.props}
                fullscreen={true}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                id='congratulationsModal'
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.renderUi()}

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CongratulationsModal;