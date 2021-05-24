import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {addNewReviewAction} from "../../actions/orderActions";
import {withRouter} from "react-router-dom";
import classNames from "classnames";

class AddNewReview extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            text: '',
            score: '',
            errors: {}
        }
    }

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
        const newReview = {
            title: this.state.title,
            text: this.state.text,
            score: this.state.score
        }

        this.props.addNewReviewAction(newReview, this.props.history, this.props.match.params.id)
    }

    render() {
        const {errors} = this.props

        return (
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col s8 offset-2'}>
                        <div className={'col s12'} style={{paddingLeft: '11.250px'}}>
                            <h4>
                                <b>Add</b> new review below
                            </h4>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className={'input-field col s12'}>
                                <input onChange={this.onChange}
                                       value={this.state.title}
                                       error={errors.title}
                                       id={'title'}
                                       type={'text'}
                                       className={classNames('', {invalid: errors.title})} />
                                <label htmlFor={'title'}>Title</label>
                                <span className={'red-text'}>{errors.title}</span>
                            </div>
                            <div className={'input-field col s12'}>
                                <input onChange={this.onChange}
                                       value={this.state.text}
                                       error={errors.text}
                                       id={'text'}
                                       type={'text'}
                                       className={classNames('', {invalid: errors.title})} />
                                <label htmlFor={'text'}>Text</label>
                                <span className={'red-text'}>{errors.text}</span>
                            </div>
                            <div className={'input-field col s12'}>
                                <input onChange={this.onChange}
                                       value={this.state.score}
                                       error={errors.score}
                                       id={'score'}
                                       type={'number'}
                                       className={classNames('', {invalid: errors.score || errors.scoreNotValid})} />
                                <label htmlFor={'score'}>Score</label>
                                <span className={'red-text'}>{errors.score}</span>
                                <span className={'red-text'}>{errors.scoreNotValid}</span>
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
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

AddNewReview.propTypes = {
    addNewReviewAction: PropTypes.func.isRequired,

    auth: PropTypes.object.isRequired,
    addNewReviewState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    addNewReviewState: state.addNewReviewState,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    {addNewReviewAction}
)(withRouter(AddNewReview))
