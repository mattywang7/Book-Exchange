import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {guestBookAction} from "../../actions/bookAction";
import {withRouter} from "react-router-dom";
import {Col} from "react-bootstrap";
import Book from "../layout/Book";
import OneBook from "../layout/OneBook";

class SearchedBooks extends Component {
    componentDidMount() {
        const type = this.props.match.params.type
        const keyword = this.props.match.params.keyword
        this.props.guestBookAction(type, keyword)
    }

    render() {
        const {books} = this.props.guestBookState

        return (
            <div className={'container'}>
                <div className={'col s12 center-align'}>
                    <h2>Here are the books you searched.</h2>
                    {books.map(book => (
                        <Col key={book._id} sm={6} md={6} lg={4} xl={3}>
                            <Book book={book} />
                        </Col>
                    ))}
                </div>
            </div>
        )
    }
}

SearchedBooks.propTypes = {
    guestBookAction: PropTypes.func.isRequired,

    guestBookState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    guestBookState: state.guestBookState
})

export default connect(
    mapStateToProps,
    {guestBookAction}
)(withRouter(SearchedBooks))
