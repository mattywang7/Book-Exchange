import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {addBook, getBooks} from "../../actions/bookAction";
import Spinner from "./Spinner";
import {Link} from "react-router-dom";

class Dashboard extends Component {
    componentDidMount() {
        this.props.getBooks()
    }

    onLogoutClick = e => {
        e.preventDefault()
        this.props.logoutUser()
    }

    handleOnSuccess = (token, metadata) => {
        const bookData = {
            public_token: token,
            metadata: metadata
        }

        this.props.addBook(bookData)
    }

    render() {
        const {user} = this.props.auth

        return (
            <div className={'col s12'} style={{paddingLeft: '11.250px'}}>
                <h4>
                    <b>Welcome,</b> {user.lastName}
                </h4>
                <Link to={'/register'}>
                    <button style={{
                        width: '150px',
                        borderRadius: '3px',
                        letterSpacing: '1.5px',
                        marginTop: '1rem'
                    }}
                            type={'submit'}
                            className={'btn btn-large waves-effect waves-light hoberable blue accent-3'}
                            onClick={this.handleOnSuccess}
                    >
                        Login
                    </button>
                </Link>
            </div>
        )
    }
}

Dashboard.propTypes = {
    // actions
    logoutUser: PropTypes.func.isRequired,
    getBooks: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired,

    auth: PropTypes.object.isRequired,
    bookState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    bookState: state.bookState
})

export default connect(
    mapStateToProps,
    {logoutUser, getBooks, addBook}
)(Dashboard)
