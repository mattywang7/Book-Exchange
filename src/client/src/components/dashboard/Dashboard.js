import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import Spinner from "./Spinner";
import {Link} from "react-router-dom";
import {myBookAction} from "../../actions/bookAction";
import MyBooks from "./MyBooks";

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

    render() {
        const {user} = this.props.auth
        const {books} = this.props.myBookState

        let dashboardContent

        if (books.length === 0) {
            dashboardContent = (
                <div className={'row'}>
                    <div className={'col s12 center-align'}>
                        <h4>
                            <b>Welcome,</b> {user.firstName} {user.lastName}!
                        </h4>
                        <p className={'flow-text grey-text text-darken-1'}>
                            You have no books now. You can add one for sale below.
                        </p>
                        <div className={'col s12'} style={{paddingLeft: '11.250px'}}>
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
                    </div>
                </div>
            )
        } else if (books.length > 0) {
            dashboardContent = <MyBooks user={user} />
        }

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
