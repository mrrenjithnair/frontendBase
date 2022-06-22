
import React from "react";

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import 'react-toastify/dist/ReactToastify.css';
import { formatDate } from '../modules/utils/commonUtils';
class editModal extends React.Component {

  feildObj(item, i) {
    return (
      <div>
        <div className="form-outline mb-4" key={i}>
          <label className="form-label capitalize" htmlFor="form3Example3">{item.label}</label>
          {(item.type == 'text' || item.type == 'number') && <input type={item.type} id="form3Example3"
            value={item.value}  onChange={(e) => { this.props.onChangeInput({ target: { id: item.key, value: e.target.value } }) }}
            className="form-control form-control-lg"
            placeholder={"please enter " + item.label} />}
          {item.type == 'file' && <input type={item.type} id="form3Example3"
            value={item.value}  onChange={(e) => { this.props.onChangeInput({ target: { id: item.key, value: e.target.value } }) }}
            className="form-control form-control-lg"
            placeholder={"please enter " + item.label} />}
          {item.type == 'textarea' && <textarea type={item.type} id="form3Example3"
            value={item.value}  onChange={(e) => { this.props.onChangeInput({ target: { id: item.key, value: e.target.value } }) }}
            className="form-control form-control-lg"
            placeholder={"please enter " + item.label} />}
          {item.type == 'date' && <input type={item.type} id="form3Example3"
            onChange={(e) => { console.log(formatDate(item.value), 'renjith'); this.props.onChangeInput({ target: { id: item.key, value: e.target.value } }) }}
            className="form-control form-control-lg" 
            value={formatDate(item.value)}
            placeholder={"please enter " + item.label} />}
          {item.type == 'select' &&
            <select className="form-control"
              onChange={(e) => { this.props.onChangeInput({ target: { id: item.key, value: e.target.value } }) }} >
              <option value=""> {item.label}</option>
              {item.data && item.data.length > 0 && item.data.map(item => <option value={item.value} >{item.label}</option>)}

            </select>}
        </div>
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
          this.props.feildObj && this.props.feildObj.length > 0 &&
          this.props.feildObj.map((item, i) => {
            return this.feildObj(item, i)
          })
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

export default editModal;


