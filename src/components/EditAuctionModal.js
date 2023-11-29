
import React from "react";

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import { ToastContainer, toast } from 'react-toastify';
import { formatDate } from '../modules/utils/commonUtils';

import 'react-toastify/dist/ReactToastify.css';
class editAuctionModal extends React.Component {
    uiForcAtegoery() {
        console.log('rrrr', this.props)
        return (
            <div>
                {this.props.categoryJson && this.props.categoryJson.map((item) => {
                    return (<div style={{ border: '1px #000 solid', padding:5, marginBottom:5}}>
                        <div className="form-outline mb-4">
                            <label className="form-label capitalize" htmlFor="form3Example3">Category Name</label>
                            <input
                                value={item.category}
                                onChange={(e) => { this.props.onChangeCategory({ target: { id: 'category', value: e.target.value, name: item.id } }) }}
                                className="form-control form-control-lg"
                                placeholder={"please enter category name"} />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label capitalize" htmlFor="form3Example3">Base Price</label>
                            <input type="number"
                                value={item.min}
                                onChange={(e) => { this.props.onChangeCategory({ target: { id: 'min', value: e.target.value, name: item.id } }) }}
                                className="form-control form-control-lg"
                                placeholder={"please enter base amount"} />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label capitalize" htmlFor="form3Example3">Count</label>
                            <input type="number"
                                value={item.count}
                                onChange={(e) => { this.props.onChangeCategory({ target: { id: 'count', value: e.target.value, name: item.id } }) }}
                                className="form-control form-control-lg"
                                placeholder={"please enter Total count of player"} />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label capitalize" htmlFor="form3Example3">Price Increase by</label>
                            <input type="number"
                                value={item.increase}
                                onChange={(e) => { this.props.onChangeCategory({ target: { id: 'increase', value: e.target.value, name: item.id } }) }}
                                className="form-control form-control-lg"
                                placeholder={"please enter increase by "} />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label capitalize" htmlFor="form3Example3">Order</label>
                            <input type="number"
                                value={item.order}
                                onChange={(e) => { this.props.onChangeCategory({ target: { id: 'order', value: e.target.value, name: item.id } }) }}
                                className="form-control form-control-lg"
                                placeholder={"please enter order by "} />
                        </div>
                    </div>)
                })
                }
                  {this.props.auctionType == 'category' &&
                    <div>
                        <div style={{ 'display': 'flex', 'justifyContent': 'space-around', flexFlow: 'column' }}>

                            <div className="form-outline mb-4" 
                            style={{
                                "display": "flex",
                                "justifyContent": "center",
                                "alignItems": "center"
                            }}>
                                <input type="text"
                                    value={this.props.categoryName}
                                    onChange={(e) => { this.props.onChangeInput({ target: { id: 'categoryName', value: e.target.value } }) }}
                                    className="form-control form-control-lg"
                                    placeholder={"please enter category name "} />
                                <Button onClick={() => this.props.addCategory(this.props)}>ADD</Button>
                        </div>

                        </div>
                    </div>

                }
            </div>
        )

    }
    feildObj(item) {
    let tournamentListGlobalArray = this.props.tournamentListGlobalArray
        return (
            <div>
            <div className="form-outline mb-4">
                <label className="form-label capitalize" htmlFor="form3Example3">Select Tournament</label>
                <select className="form-control" value={this.props.auctionCreateTournamentId}
        onChange={(e) => {
            this.props.onChangeInput({ target: { id: 'auctionCreateTournamentId', value: e.target.value } })
        }} >
        <option value=""> Select Tournament</option>
        {tournamentListGlobalArray && tournamentListGlobalArray.length > 0 && tournamentListGlobalArray.map(item => <option value={item.value}>{item.label}</option>)}

    </select>
            </div>
                <div className="form-outline mb-4">
                    <label className="form-label capitalize" htmlFor="form3Example3">Auction date</label>
                    <input type="date" value={formatDate(this.props.auctionDate)}
                        onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionDate', value: e.target.value } }) }}
                        className="form-control form-control-lg"
                        placeholder={"please enter auction date"} />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label capitalize" htmlFor="form3Example3">Venue</label>
                    <input type="text" value={this.props.auctionVenue}
                        onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionVenue', value: e.target.value } }) }}
                        className="form-control form-control-lg"
                        placeholder={"please enter Venue"} />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label capitalize" htmlFor="form3Example3">Sponsor</label>
                    <input type='file' id="form3Example3"
                        accept="image/png, image/jpeg"
                        value={this.props.auctionSponsor}
                        onChange={(e) => {
                            const fileId = new Date().valueOf() + e.target.files[0].name
                            this.props.uploadPhoto(e.target.files[0], fileId, 'auctionSponsor')
                            this.props.onChangeInput({ target: { id: 'auctionSponsor', value: fileId } })
                        }}
                        className='form-control form-control-lg'
                        placeholder={"Please enter Sponsor"} />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label capitalize" htmlFor="form3Example3">Auction Type</label>
                    <select className="form-control" value={this.props.auctionType}
                        onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionType', value: e.target.value } }) }} >
                        <option value=""> please select auction type</option>
                        <option value={'category'}>Category</option>
                        <option value={'noCategory'}>No Category</option>

                    </select>
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label capitalize" htmlFor="form3Example3">Screen Type</label>
                    <select className="form-control" value={this.props.auctionScreenType}
                        onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionScreenType', value: e.target.value } }) }} >
                        <option value=""> please select screen type</option>
                        <option value={'teams'}>Teams</option>
                        <option value={'sponsor'}>Sponsor</option>

                    </select>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label capitalize" htmlFor="form3Example3">Team Point</label>
                    <input type="number" value={this.props.auctionTeamPoint}
                        onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionTeamPoint', value: e.target.value } }) }}
                        className="form-control form-control-lg"
                        placeholder={"please enter Venue"} />
                </div>
               {this.props.auctionType == 'noCategory' && <div style={{ 'display': 'flex', 'justifyContent': 'space-around' }}>
                    <div className="form-outline mb-4">
                        <label className="form-label capitalize" htmlFor="form3Example3">Base Price for player</label>
                        <input type="number" value={this.props.auctionMinPoint}
                            onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionMinPoint', value: e.target.value } }) }}
                            className="form-control form-control-lg"
                            placeholder={"please enter base Price for player"} />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label capitalize" htmlFor="form3Example3">Price Increase by</label>
                        <input type="number" value={this.props.auctionIncreasePoint}
                            onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionIncreasePoint', value: e.target.value } }) }}
                            className="form-control form-control-lg"
                            placeholder={"please enter Price Increase by"} />
                    </div>
                </div>}
                {this.props.auctionType == 'category' && this.uiForcAtegoery() }
                {/* {this.props.auctionType == 'category' && 
                <div>
                <div style={{ 'display': 'flex', 'justifyContent': 'space-around'}}>
                <div className="form-outline mb-4">
                    <label className="form-label capitalize" htmlFor="form3Example3" style={{'fontWeight':700}}>Category A</label>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label capitalize" htmlFor="form3Example3">Base Point For Player</label>
                        <input type="number"  value={this.props.auctionCategoryAMinPoint}
                            onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionCategoryAMinPoint', value: e.target.value } }) }}
                            className="form-control form-control-lg"
                            placeholder={"please enter base Price for player"} />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label capitalize" htmlFor="form3Example3">Price Increase by</label>
                        <input type="number" value={this.props.auctionCategoryAIncreasePoint}
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
                        <input type="number"  value={this.props.auctionCategoryBMinPoint}
                            onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionCategoryBMinPoint', value: e.target.value } }) }}
                            className="form-control form-control-lg"
                            placeholder={"please enter base Price for player"} />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label capitalize" htmlFor="form3Example3">Price Increase by</label>
                        <input type="number"  value={this.props.auctionCategoryBIncreasePoint}
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
                        <input type="number" value={this.props.auctionCategoryCMinPoint}
                            onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionCategoryCMinPoint', value: e.target.value } }) }}
                            className="form-control form-control-lg"
                            placeholder={"please enter base Price for player"} />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label capitalize" htmlFor="form3Example3">Price Increase by</label>
                        <input type="number" value={this.props.auctionCategoryCIncreasePoint}
                            onChange={(e) => { this.props.onChangeInput({ target: { id: 'auctionCategoryCIncreasePoint', value: e.target.value } }) }}
                            className="form-control form-control-lg"
                            placeholder={"please enter price increase by"} />
                    </div>
                    </div>
                </div>
                
                } */}

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

export default editAuctionModal;


