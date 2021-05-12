import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {addBook, deleteBook} from "../../actions/bookAction";
import Book from "./Book";

class Books extends Component {
    componentDidMount() {
        const {books} = this.props  // get the books array
        // alert(books.length)
    }

    handleOnSuccess = (token, metadata) => {
        const {books} = this.props
        const bookData = {
            public_token: token,
            metadata: metadata,
            books: books
        }

        this.props.addBook(bookData)
    }

    onDeleteClick = id => {
        const {books} = this.props
        const bookData = {
            id: id,
            books: books
        }
        this.props.deleteBook(bookData)
    }

    onLogoutClick = e => {
        e.preventDefault()
        this.props.logoutUser()
    }

    render() {
        const {user, books} = this.props

        let bookItems = books.map(book => (
            <li key={book._id} style={{margin: '1rem'}}>
                <button style={{marginRight: '1rem'}}
                        onClick={this.onDeleteClick.bind(this, book._id)}
                        className={'btn btn-small btn-floating waves-effect waves-light hoverable red accent-3'}>
                    <i className={'material-icons'}>delete</i>
                </button>
                <b>{book.title}</b>
            </li>
        ))

        return (
            <div className={'row'}>
                <div className={'col s12'}>
                    <button onClick={this.onLogoutClick}
                            className={'btn-flat waves-effect'}>
                        <i className={'material-icons left'}>keyboard_backspace</i> Log Out
                    </button>
                    <h4>
                        <b>Welcome!</b>
                    </h4>
                    <p className={'grey-text text-darken-1'}>
                        Hey there, {user.lastName}
                    </p>
                    <h5>
                        <b>All Books</b>
                    </h5>
                    <p className="grey-text text-darken-1">
                        Add or remove your books below
                    </p>
                    <ul>{bookItems}</ul>
                    <Book />
                </div>
            </div>
        )
    }
}

Books.propTypes = {
    // actions
    logoutUser: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,

    books: PropTypes.array.isRequired,

    // reducers
    user: PropTypes.object.isRequired,
    bookState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    bookState: state.bookState
})

export default connect(
    mapStateToProps,
    {logoutUser, addBook, deleteBook}
)(Books)
