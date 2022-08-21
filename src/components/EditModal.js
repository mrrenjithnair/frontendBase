
import React from "react";

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import 'react-toastify/dist/ReactToastify.css';
import { formatDate } from '../modules/utils/commonUtils';
import 'react-toastify/dist/ReactToastify.css';
import { dobValidation, mobileValidation, emailValidation, passwordValidation } from '../modules/utils/commonUtils';
import { ToastContainer, toast } from 'react-toastify';
class editModal extends React.Component {

  feildObj(item, i) {
    let cssInputClass =  "form-control form-control-lg"
    let regex = new RegExp("^[a-zA-Z]+$");
      if(item.required ){
        cssInputClass =  item.value ? "form-control form-control-lg" : "form-control form-control-lg is-invalid";
      }
      if(item.value && item.type == 'password'){
        cssInputClass =  passwordValidation(item.value) ?  "form-control form-control-lg" : "form-control form-control-lg is-invalid";
      }
      if(item.value && item.key == 'emailId'){
        cssInputClass =  emailValidation(item.value) ?  "form-control form-control-lg" : "form-control form-control-lg is-invalid";
      }
      if(item.value && item.key == 'mobile'){
        cssInputClass =  mobileValidation(item.value) ?  "form-control form-control-lg" : "form-control form-control-lg is-invalid";
      }
    return (
      <div>
        <div className="form-outline mb-4" key={i}>
          <label className="form-label capitalize" htmlFor="form3Example3">{item.label}</label>
          {(item.type === 'text' || item.type === 'number'|| item.type === 'password') && <input type={item.type} id="form3Example3"
            disabled ={item.disabled}
            value={item.value}  onChange={(e) => { this.props.onChangeInput({ target: { id: item.key, value: e.target.value } }) }}
            className={cssInputClass} 
            placeholder={"Please enter " + item.label} />}
            {item.value && item.type == 'password' && !(passwordValidation(item.value)) && <div className='errorMsg'>* Password should have minimum eight characters, at least one special character or number.</div>}
            {item.value && item.key == 'mobile' && !(mobileValidation(item.value)) && <div className='errorMsg'>* Mobile number is not valid.</div>}
            {! item.value && item.required && !(mobileValidation(item.value)) && <div className='errorMsg'>* {item.label} is required.</div>}

          {item.type == 'file' && 
          <div>
          {item.oldValue &&<img src={item.oldValue} style={{height:50,width:50,borderWidth:1}}/>}
          <input type={item.type} id="form3Example3"
          accept="image/png, image/jpeg"
           onChange={(e) => { 
              const fileId =  new Date().valueOf() + e.target.files[0].name 
              this.props.uploadPhoto(e.target.files[0], fileId, item.key)
              this.props.onChangeInput({ target: { id: item.key, value: fileId} })
             }}
            className={cssInputClass}
            placeholder={"Please enter " + item.label} /></div>}
          {item.type == 'textarea' && <textarea type={item.type} id="form3Example3"
            value={item.value}  onChange={(e) => { this.props.onChangeInput({ target: { id: item.key, value: e.target.value } }) }}
            className={cssInputClass}
            placeholder={"Please enter " + item.label} />}
          {item.type == 'date' && <input type={item.type} id="form3Example3"
            onChange={(e) => { console.log(formatDate(item.value), 'renjith'); this.props.onChangeInput({ target: { id: item.key, value: e.target.value } }) }}
            className={cssInputClass} 
            value={formatDate(item.value)}
            placeholder={"Please enter " + item.label} />}
          {item.type == 'select' &&
            <select className="form-control"
            value={item.value}
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

export default editModal;


