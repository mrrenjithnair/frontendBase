
import React from "react";

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import 'react-toastify/dist/ReactToastify.css';
class CustomModal extends React.Component {
    renderCostAnalytics(props) {
        let selectedTeam = this.props.selectedTeam
        let pointJson = this.props.pointJson
        let teamTotalMember = selectedTeam && selectedTeam.teamTotalMember ? selectedTeam.teamTotalMember : 0
        let teamObj = []
        let afterPredicationAmount= 0
        let teamPlayerList = this.props.teamPlayerList
        pointJson.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))

    
        if(teamPlayerList && teamPlayerList.length>0)
        teamPlayerList.sort((a,b) => (a.playerType > b.playerType) ? 1 : ((b.playerType > a.playerType) ? -1 : 0))

            let count = 0
            pointJson.forEach((it, i) => {
                for (let index = 0; index < it.count; index++) {
                    count = count + 1
                    teamObj.push({ name: 'player ' + (count), bidAmount: parseInt(it.min), status: 'unSold', srNo: count, playerType: it.category })
                }
            })
            let afterTotal = teamTotalMember - teamObj.length;
            if(teamObj && teamObj.length != teamTotalMember){
                count = teamObj.length
                for (let index = 0; index < afterTotal; index++) {
                    count = count + 1
                    teamObj.push({ name: 'player ' + (count), bidAmount: selectedTeam && selectedTeam.basePrice ? selectedTeam.basePrice : 0, status: 'unSold', srNo: count, playerType: null })
                }
            }
        for (var i = 0; i < teamObj.length; i++) {
            if (teamPlayerList && teamPlayerList.length > 0) {
                for (var j = 0; j < teamPlayerList.length; j++) {
                    let index = teamObj.findIndex((i) => i.id == teamPlayerList[j].id)
                    let assigned  = index >= 0 ? true : false
                    if (teamObj[i].playerType == teamPlayerList[j].playerType && !assigned) {
                        teamPlayerList[j].srNo = (j + 1)
                        teamPlayerList[j].status = 'Sold'
                        teamObj[i] = teamPlayerList[j]
                    }

                }
            }
            afterPredicationAmount = afterPredicationAmount + teamObj[i].bidAmount
        }
        // teamObj.sort((a,b) => (a.playerType > b.playerType) ? 1 : ((b.playerType > a.playerType) ? -1 : 0))
        if(selectedTeam && selectedTeam.basePrice && teamObj && teamObj.length>0 && teamPlayerList){
            if(teamObj.length != teamPlayerList.length &&   teamObj[teamPlayerList.length] && teamObj[teamPlayerList.length].bidAmount)
            teamObj[teamPlayerList.length].bidAmount = (this.props.totalAmount - afterPredicationAmount + selectedTeam.basePrice)

        }
        return (<div>
  <div class="row">
                                <div class="col-lg-12">
                                    <div class="main-box clearfix">
                                        <div class="table-responsive">
                                            <table class="table user-list">
                                                <thead>
                                                    <tr>
                                                        <th><span>#</span></th>
                                                        <th><span>Player Name</span></th>
                                                        <th><span>Bid Amount</span></th>
                                                        <th><span>Status</span></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {teamObj && teamObj.length > 0 && teamObj.map((item, index) => <tr key={index}>

                                                        <td>
                                                            {index + 1}
                                                        </td><td>
                                                            {item.profilePictureUrl && <img src={item.profilePictureUrl}></img>}
                                                            <span class="user-link">{item.firstName ? item.firstName : item.name}</span>
                                                            <span class="user-subhead">{item.category}{item.playerType ? '('+ item.playerType+ ')':''}</span>
                                                        </td>
                                                        <td>
                                                            {item.bidAmount}
                                                        </td>
                                                        <td>
                                                        {item.status =='Sold' ? <span class="badge bg-success text-uppercase">{item.status}</span> : <span class="badge bg-danger text-uppercase">{item.status}</span>}
                                                        </td>

                                                    </tr>)}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
             <div className='profile-detail-auction'>
                <div className='profile-detail-auction-text' title='Pending Point'><span>Total Point:</span> {this.props.totalAmount}</div>
                <div className='profile-detail-auction-text' title='Spend Point'><span>Spent Point:</span> {this.props.spentAmount}</div>
                <div className='profile-detail-auction-text' title='Pending Point'><span>Pending Point:</span> {this.props.remainingAmount}</div>
            </div>
        </div>
        )
    }
    render() {
        console.log(this.props.teamPlayerList)
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{
                    this.renderCostAnalytics()
                }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onSubmit}>Submit</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CustomModal;


