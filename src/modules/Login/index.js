import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';



import { handleDecrementClick, handleIncrementClick } from './actions';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
export class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            isEditing: false,
            errorMessage: '',
            username: '',
            password: ""
        }
    }

    componentDidMount() {
    }
    handleSubmit(e) {
        e.preventDefault();
        //if username or password field is empty, return error message
        // if (this.state.username === "" || this.state.password === "") {
            // this.setState({ errorMessage: "Empty username/password field" })
        // } else if (this.state.username == "admin" && this.state.password == "123456") {
            //Signin Success
            localStorage.setItem("isAuthenticated", "true");
            window.location.pathname = "/";
        // } else {
            // this.setState({ errorMessage: "Invalid username/password" })

        // }
    }


    render() {
        console.log(this.props.count)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Hello world Redux Saga! {this.props.count}</h1>
                        <Button onClick={this.props.handleIncrementClick} variant="outline-success">Increment</Button>{' '}

                        <Button onClick={this.props.handleDecrementClick} variant="outline-danger">Decrement</Button>{' '}
                    </div>
                </div>
                <div className="text-center">
                    <h1>Signin User</h1>
                    <form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                className="form-control"
                                type="text"
                                name="username"
                                onChange={(e) => this.setState({ username: e })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                onChange={(e) => this.setState({ username: e })}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </button>
                        {this.state.errorMessage && (
                            <p className="text-danger"> {this.state.errorMessage} </p>
                        )}

                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    console.log('state', state)
    return {
        count: state.login.count
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleIncrementClick: (id) => dispatch(handleIncrementClick(id)),
        handleDecrementClick: (id) => dispatch(handleDecrementClick(id)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
