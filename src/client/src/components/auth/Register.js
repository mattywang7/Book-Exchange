import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {registerAction, registerUser} from "../../actions/authActions";
import {PropTypes} from 'prop-types'
import classNames from "classnames";

class Register extends Component {
    constructor() {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            rePassword: "",
            errors: {}
        }
    }

    // if the user already logged in, they should be redirect to dashboard
    // componentDidMount() {
    //     if (this.props.auth.isAuthenticated) {
    //         this.props.history.push('/dashboard')
    //     }
    // }
    //
    componentWillReceiveProps(nextProps, nextContext) {
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

        // const newUser = {
        //     firstName: this.state.firstName,
        //     lastName: this.state.lastName,
        //     email: this.state.email,
        //     password: this.state.password,
        //     rePassword: this.state.rePassword
        // }
        const inputFirstName = this.state.firstName
        const inputLastName = this.state.lastName
        const inputEmail = this.state.email
        const inputPassword = this.state.password
        const inputRePassword = this.state.rePassword

        this.props.registerAction(inputFirstName, inputLastName, inputEmail, inputPassword, inputRePassword, this.props.history)
    }

    render() {
        const {errors} = this.state

        return (
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col s8 offset-2'}>
                        <Link to={'/'} className={'btn-flat waves-effect'}>
                            <i className={'material-icons left'}>keyboard_backspace</i>
                            Back to home
                        </Link>
                        <div className={'col s12'} style={{paddingLeft: '11.250px'}}>
                            <h4>
                                <b>Register</b> below
                            </h4>
                            <p className={'grey-text text-darken-1'}>
                                Already have an account? <Link to={'/login'}>Login</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className={'input-field col s12'}>
                                <input onChange={this.onChange}
                                       value={this.state.firstName}
                                       error={errors.firstName}
                                       id={'firstName'}
                                       type={'text'}
                                       className={classNames("", {invalid: errors.firstName})} />
                                <label htmlFor={'firstName'}>First Name</label>
                                <span className={'red-text'}>{errors.firstName}</span>
                            </div>
                            <div className={'input-field col s12'}>
                                <input onChange={this.onChange}
                                       value={this.state.lastName}
                                       error={errors.lastName}
                                       id={'lastName'}
                                       type={'text'}
                                       className={classNames("", {invalid: errors.lastName})} />
                                <label htmlFor={'lastName'}>Last Name</label>
                                <span className={'red-text'}>{errors.lastName}</span>
                            </div>
                            <div className={'input-field col s12'}>
                                <input onChange={this.onChange}
                                       value={this.state.email}
                                       error={errors.email}
                                       id={'email'}
                                       type={'email'}
                                       className={classNames("", {invalid: errors.email})} />
                                <label htmlFor={'email'}>Email</label>
                                <span className={'red-text'}>{errors.email}</span>
                            </div>
                            <div className={'input-field col s12'}>
                                <input onChange={this.onChange}
                                       value={this.state.password}
                                       error={errors.password}
                                       id={'password'}
                                       type={'password'}
                                       className={classNames("", {invalid: errors.password})} />
                                <label htmlFor={'password'}>Password</label>
                                <span className={'red-text'}>{errors.password}</span>
                            </div>
                            <div className={'input-field col s12'}>
                                <input onChange={this.onChange}
                                       value={this.state.rePassword}
                                       error={errors.rePassword}
                                       id={'rePassword'}
                                       type={'password'}
                                       className={classNames("", {invalid: errors.rePassword})} />
                                <label htmlFor={'rePassword'}>Confirm Password</label>
                                <span className={'red-text'}>{errors.rePassword}</span>
                            </div>
                            <div className={'col s12'} style={{paddingLeft: '11.250px'}}>
                                <button style={{
                                    width: '150px',
                                    borderRadius: '3px',
                                    letterSpacing: '1.5px',
                                    marginTop: '1rem'
                                }}
                                        type={'submit'}
                                        className={'btn btn-large waves-effect waves-light hoverable blue accent-3'}>
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

// cannot define types in constructor, thus define them using 'prop-types'
Register.propTypes = {
    registerAction: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired

}

// get state from Redux and map it to props
// then we can call this.props.auth and this.props.errors within Register component
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

// to redirect within an action
export default connect(
    mapStateToProps,
    {registerAction}
)(withRouter(Register))
