import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";

class MyBooks extends Component {

    onLogoutClick = e => {
        e.preventDefault()
        this.props.logoutUser()
    }

    render() {

        const {user} = this.props

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
                        Hey there, {user.firstName} {user.lastName}
                    </p>
                </div>
            </div>
        )
    }
}

MyBooks.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,

    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    {logoutUser}
)(MyBooks)

