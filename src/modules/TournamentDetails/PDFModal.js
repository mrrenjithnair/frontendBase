
  import React from "react";

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserListPDF from './UserListPDF';

class PDFModal extends React.Component {
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
              <Modal.Body>
                <UserListPDF  {...this.props}/>
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

export default PDFModal;


