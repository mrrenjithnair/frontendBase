
  import React from "react";

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import 'react-toastify/dist/ReactToastify.css';
class addModal extends React.Component {

  feildObj(item){
    return(
      <div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example3">{item.label}</label>
          <input type={item.type} id="form3Example3"
            onChange={(e) => { this.props.onChangeInput({ target: { id: item.key, value: e.target.value } }) }}
            className="form-control form-control-lg"
            placeholder={"please enter " + item.label} />
        </div>
      </div>

    )

  }
    render() {

        return  (
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
              this.props.feildObj &&  this.props.feildObj.length > 0 &&
              this.props.feildObj.map((item) => {
                return this.feildObj(item)
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

export default addModal;


