import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from 'prop-types'
import {loginUser} from "../../actions/authActions";
import classNames from "classnames";
import {connect} from "react-redux";

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            errors: {}
        }
    }

    // push user to dashboard when they log in
    // '/dashboard' will be a private route that only logged in users can view it
    // componentDidMount() {
    //     if (this.props.auth.isAuthenticated) {
    //         this.props.history.push('/dashboard')
    //     }
    // }
    //
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }

    onSubmit = e => {
        e.preventDefault()

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData)
    }

    render() {
        const {errors} = this.state

        return (
            <div className={'container'}>
                <div style={{marginTop: '4rem'}} className={'row'} >
                    <div className={'col s8 offset-s2'}>
                        <Link to={'/'} className={'btn-flat waves-effect'}>
                            <i className={'material-icons left'}>keyboard_backspace</i> Back to home
                        </Link>
                        <div className={'col s12'} style={{paddingLeft: '11.250px'}}>
                            <h4>
                                <b>Login</b> below
                            </h4>
                            <p className={'grey-text text-darken-1'}>
                                Don't have an account? <Link to={'/register'}>Register</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className={'input-field col s12'}>
                                <input onChange={this.onChange}
                                       value={this.state.email}
                                       error={errors.email}
                                       id={'email'}
                                       type={'email'}
                                       className={classNames("", {invalid: errors.email || errors.userNotFound})} />
                                <label htmlFor={'email'}>Email</label>
                                <span className={'red-text'}>
                                    {errors.email}
                                    {errors.userNotFound}
                                </span>
                            </div>
                            <div className={'input-field col s12'}>
                                <input onChange={this.onChange}
                                       value={this.state.password}
                                       error={errors.password}
                                       id={'password'}
                                       type={'password'}
                                       className={classNames("", {invalid: errors.password || errors.passwordNotCorrect})} />
                                <label htmlFor={'password'}>Password</label>
                                <span className={'red-text'}>
                                    {errors.password}
                                    {errors.passwordNotCorrect}
                                </span>
                            </div>
                            <div className={'col s12'} style={{paddingLeft: '11.250px'}}>
                                <button style={{
                                    width: '150px',
                                    borderRadius: '3px',
                                    letterSpacing: '1.5px',
                                    marginTop: '1rem'
                                }}
                                        type={'submit'}
                                        className={'btn btn-large waves-effect waves-light hoberable blue accent-3'}>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    {loginUser}
)(withRouter(Login))
