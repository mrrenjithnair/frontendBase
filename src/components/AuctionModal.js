
import React from "react";

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class auctionModal extends React.Component {

    feildObj(item) {
    let tournamentListGlobalArray = this.props.tournamentListGlobalArray
        return (
            <div>
            <div className="form-outline mb-4">
                <label className="form-label capitalize" htmlFor="form3Example3">Select Tournament</label>
                <select className="form-control"
        onChange={(e) => {
            this.props.onChangeInput({ target: { id: 'auctionCreateTournamentId', value: e.target.value } })
        }} >
        <option value=""> Select Tournament</option>
        {tournamentListGlobalArray && tournamentListGlobalArray.length > 0 && tournamentListGlobalArray.map(item => <option value={item.value}>{item.label}</option>)}

    </select>
            </div>
                <div className="form-outline mb-4">
                    <label className="form-label capitalize" htmlFor="form3Example3">Auction date</label>
                    <input type="date"
                        onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionDate', value: e.target.value } }) }}
                        className="form-control form-control-lg"
                        placeholder={"please enter auction date"} />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label capitalize" htmlFor="form3Example3">Venue</label>
                    <input type="text"
                        onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionVenue', value: e.target.value } }) }}
                        className="form-control form-control-lg"
                        placeholder={"please enter Venue"} />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label capitalize" htmlFor="form3Example3">Auction Type</label>
                    <select className="form-control"
                        onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionType', value: e.target.value } }) }} >
                        <option value=""> please select auction type</option>
                        <option value={'category'}>Category</option>
                        <option value={'noCategory'}>No Category</option>

                    </select>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label capitalize" htmlFor="form3Example3">Team Point</label>
                    <input type="number"
                        onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionTeamPoint', value: e.target.value } }) }}
                        className="form-control form-control-lg"
                        placeholder={"please enter Venue"} />
                </div>
               {this.props.auctionType == 'noCategory' && <div style={{ 'display': 'flex', 'justifyContent': 'space-around' }}>
                    <div className="form-outline mb-4">
                        <label className="form-label capitalize" htmlFor="form3Example3">Base Price for player</label>
                        <input type="number"
                            onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionMinPoint', value: e.target.value } }) }}
                            className="form-control form-control-lg"
                            placeholder={"please enter base Price for player"} />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label capitalize" htmlFor="form3Example3">Price Increase by</label>
                        <input type="number"
                            onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionIncreasePoint', value: e.target.value } }) }}
                            className="form-control form-control-lg"
                            placeholder={"please enter Price Increase by"} />
                    </div>
                </div>}
                {this.props.auctionType == 'category' && 
                <div>
                <div style={{ 'display': 'flex', 'justifyContent': 'space-around'}}>
                <div className="form-outline mb-4">
                    <label className="form-label capitalize" htmlFor="form3Example3" style={{'fontWeight':700}}>Category A</label>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label capitalize" htmlFor="form3Example3">Base Point For Player</label>
                        <input type="number"
                            onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionCategoryAMinPoint', value: e.target.value } }) }}
                            className="form-control form-control-lg"
                            placeholder={"please enter base Price for player"} />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label capitalize" htmlFor="form3Example3">Price Increase by</label>
                        <input type="number"
                            onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionCategoryAIncreasePoint', value: e.target.value } }) }}
                            className="form-control form-control-lg"
                            placeholder={"please enter price increase by"} />
                    </div>
                    </div>

                <div style={{ 'display': 'flex', 'justifyContent': 'space-around'}}>
                <div className="form-outline mb-4">
                    <label className="form-label capitalize" htmlFor="form3Example3" style={{'fontWeight':700}}>Category B</label>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label capitalize" htmlFor="form3Example3">Base Point For Player</label>
                        <input type="number"
                            onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionCategoryBMinPoint', value: e.target.value } }) }}
                            className="form-control form-control-lg"
                            placeholder={"please enter base Price for player"} />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label capitalize" htmlFor="form3Example3">Price Increase by</label>
                        <input type="number"
                            onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionCategoryBIncreasePoint', value: e.target.value } }) }}
                            className="form-control form-control-lg"
                            placeholder={"please enter price increase by"} />
                    </div>
                    </div>

                <div style={{ 'display': 'flex', 'justifyContent': 'space-around'}}>
                <div className="form-outline mb-4">
                    <label className="form-label capitalize" htmlFor="form3Example3" style={{'fontWeight':700}}>Category C</label>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label capitalize" htmlFor="form3Example3">Base Point For Player</label>
                        <input type="number"
                            onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionCategoryCMinPoint', value: e.target.value } }) }}
                            className="form-control form-control-lg"
                            placeholder={"please enter base Price for player"} />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label capitalize" htmlFor="form3Example3">Price Increase by</label>
                        <input type="number"
                            onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionCategoryCIncreasePoint', value: e.target.value } }) }}
                            className="form-control form-control-lg"
                            placeholder={"please enter price increase by"} />
                    </div>
                    </div>
                </div>
                
                }

            </div>

        )

    }
    render() {

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
                    this.feildObj()
                }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onSubmit}>Submit</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
                <ToastContainer position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        theme='colored'
                        draggable
                        pauseOnHover />
            </Modal>
        );
    }
}

export default auctionModal;


