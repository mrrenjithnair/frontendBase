import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';



import { handleDecrementClick, handleIncrementClick } from './actions';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
export class Counter extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            isEditing: false,
        }
    }

    componentDidMount() {
        const { match: { params: { id } } } = this.props;
        if (id) {
            this.props.getBookDetail(id);
            this.setState({ id: id, isEditing: true });
        }
    }



    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Hello world Redux Saga! {this.props.count}</h1>
                        <Button onClick={this.props.handleIncrementClick} variant="outline-success">Increment</Button>{' '}

                        <Button onClick={this.props.handleDecrementClick} variant="outline-danger">Decrement</Button>{' '}
                    </div>
                </div>
            </div>
        );
    }
}

Counter.propTypes = {
    onSubmitForm: PropTypes.func,
    errors: PropTypes.object
};

function mapStateToProps(state) {
    return {
        errors: state.books.manage_book.errors,
        selectedBook: state.books.list_book.selectedBook
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleIncrementClick: (id) => dispatch(handleIncrementClick(id)),
        handleDecrementClick: (id) => dispatch(handleDecrementClick(id)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
