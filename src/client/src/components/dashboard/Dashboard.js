import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import Spinner from "./Spinner";
import {Link} from "react-router-dom";
import {myBookAction} from "../../actions/bookAction";
import {Col} from "react-bootstrap";
import Book from "../layout/Book";
import Message from "../layout/Message";

class Dashboard extends Component {

    componentDidMount() {
        this.props.myBookAction()
    }

    // log out
    onLogoutClick = e => {
        e.preventDefault()
        this.props.logoutUser()
    }

    onAddBookClick = () => {
        this.props.history.push('/add-for-sale')
    }

    onViewBoughtOrdersClick = () => {
        this.props.history.push('/orders/bought')
    }

    onViewSoldOrdersClick = () => {
        this.props.history.push('/orders/sold')
    }

    onViewForSaleBooksClick = () => {
        this.props.history.push('/books-for-sale')
    }

    render() {
        const {user} = this.props.auth
        const {books} = this.props.myBookState

        let dashboardContent

        dashboardContent = (
            <div className={'row'}>
                <div className={'col s12'}>
                    <button onClick={this.onLogoutClick}
                            className={'btn-flat waves-effect'}>
                        <i className={'material-icons left'}>keyboard_backspace</i> Log Out
                    </button>
                </div>
                <div className={'col s12 center-align'}>
                    <h4>
                        <b>Welcome,</b> {user.firstName} {user.lastName}
                    </h4>
                    {books.length === 0 && <p className={'grey-text text-darken-1'}>
                        You have no books now. You can add one for sale below.
                    </p> }
                    <div className={'col s3'}>
                        <button style={{
                            width: '150px',
                            borderRadius: '3px',
                            letterSpacing: '1.5px',
                            marginTop: '1rem'
                        }}
                                onClick={this.onAddBookClick}
                                className={'btn btn-large waves-effect waves-light hoverable blue accent-3'}>
                            Add One
                        </button>
                    </div>
                    <div className={'col s3'}>
                        <button style={{
                            width: '150px',
                            borderRadius: '3px',
                            letterSpacing: '1.5px',
                            marginTop: '1rem'
                        }}
                                onClick={this.onViewBoughtOrdersClick}
                                className={'btn btn-large waves-effect waves-light hoverable blue accent-3'}>
                            Bought
                        </button>
                    </div>
                    <div className={'col s3'}>
                        <button style={{
                            width: '150px',
                            borderRadius: '3px',
                            letterSpacing: '1.5px',
                            marginTop: '1rem'
                        }}
                                onClick={this.onViewSoldOrdersClick}
                                className={'btn btn-large waves-effect waves-light hoverable blue accent-3'}>
                            Sold
                        </button>
                    </div>
                    <div className={'col s3'}>
                        <button style={{
                            width: '150px',
                            borderRadius: '3px',
                            letterSpacing: '1.5px',
                            marginTop: '1rem'
                        }}
                                onClick={this.onViewForSaleBooksClick}
                                className={'btn btn-large waves-effect waves-light hoverable blue accent-3'}>
                            ForSale
                        </button>
                    </div>
                    <br />
                    <div>
                        <p className={'grey-text text-darken-1'}>
                            The books you own are listed below
                        </p>
                        {books.map(book => (
                            <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                                <Book book={book} />
                            </Col>
                        ))}
                    </div>
                </div>
            </div>
        )

        return <div className={'container'}>{dashboardContent}</div>
    }

}

Dashboard.propTypes = {
    // actions
    logoutUser: PropTypes.func.isRequired,
    myBookAction: PropTypes.func.isRequired,

    auth: PropTypes.object.isRequired,
    myBookState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    myBookState: state.myBookState
})

export default connect(
    mapStateToProps,
    {logoutUser, myBookAction}
)(Dashboard)
