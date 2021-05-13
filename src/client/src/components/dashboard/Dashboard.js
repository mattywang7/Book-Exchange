import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import Spinner from "./Spinner";
import {Link} from "react-router-dom";
import {myBookAction} from "../../actions/bookAction";

class Dashboard extends Component {

    componentDidMount() {
        this.props.myBookAction()
    }

    render() {
        const {user} = this.props.auth
        const {books} = this.props.myBookState

        let book = {}

        if (books.length > 0) {
            book = books[0]
        }


        return (
            <div className={'col s12'} style={{paddingLeft: '11.250px'}}>
                <h4>
                    <b>Welcome,</b> {user.lastName}
                </h4>

                <h4>
                    <b>{book.title}</b>
                </h4>
            </div>
        )
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
