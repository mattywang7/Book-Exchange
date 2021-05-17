import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {addNewBookAction} from "../../actions/bookAction";
import {Link, withRouter} from "react-router-dom";
import classNames from "classnames";
import axios from "axios";

class AddNewBook extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            author: '',
            category: '',
            condition: '',
            price: '',
            // image: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login')
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

    // onUploadImage = async (e) => {
    //     const file = e.target.files[0]
    //     const formData = new FormData()
    //     formData.append('image', file)
    //     try {
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         }
    //         const {data} = await axios.post('/api/upload', formData, config)
    //         this.onChange(e)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    onSubmit = e => {
        e.preventDefault()

        const newBook = {
            title: this.state.title,
            author: this.state.author,
            category: this.state.category,
            condition: this.state.condition,
            price: this.state.price
        }

        this.props.addNewBookAction(newBook, this.props.history)
    }

    render() {
        const {errors} = this.state

        return (
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col s8 offset-2'}>
                        <div className={'col s12'} style={{paddingLeft: '11.250px'}}>
                            <h4>
                                <b>Add</b> new book below
                            </h4>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className={'input-field col s12'}>
                                <input onChange={this.onChange}
                                       value={this.state.title}
                                       error={errors.title}
                                       id={'title'}
                                       type={'text'}
                                       className={classNames("", {invalid: errors.title})} />
                                <label htmlFor={'title'}>Title</label>
                                <span className={'red-text'}>{errors.title}</span>
                            </div>
                            <div className={'input-field col s12'}>
                                <input onChange={this.onChange}
                                       value={this.state.author}
                                       error={errors.author}
                                       id={'author'}
                                       type={'text'}
                                       className={classNames("", {invalid: errors.author})} />
                                <label htmlFor={'author'}>Author</label>
                                <span className={'red-text'}>{errors.author}</span>
                            </div>
                            <div className={'input-field col s12'}>
                                <input onChange={this.onChange}
                                       value={this.state.category}
                                       error={errors.category}
                                       id={'category'}
                                       type={'text'}
                                       className={classNames("", {invalid: errors.category})} />
                                <label htmlFor={'category'}>Category</label>
                                <span className={'red-text'}>{errors.category}</span>
                            </div>
                            <div className={'input-field col s12'}>
                                <input onChange={this.onChange}
                                       value={this.state.condition}
                                       error={errors.condition}
                                       id={'condition'}
                                       type={'number'}
                                       className={classNames("", {invalid: errors.condition || errors.conditionNotValid})} />
                                <label htmlFor={'condition'}>Condition</label>
                                <span className={'red-text'}>
                                    {errors.condition}
                                    {errors.conditionNotValid}
                                </span>
                            </div>
                            <div className={'input-field col s12'}>
                                <input onChange={this.onChange}
                                       value={this.state.price}
                                       error={errors.price}
                                       id={'price'}
                                       type={'number'}
                                       className={classNames("", {invalid: errors.price || errors.priceNotValid})} />
                                <label htmlFor={'price'}>Price</label>
                                <span className={'red-text'}>
                                    {errors.price}
                                    {errors.priceNotValid}
                                </span>
                            </div>
                            {/*<div className={'input-field col s12'}>*/}
                            {/*    <input onChange={this.onChange}*/}
                            {/*           value={this.state.image}*/}
                            {/*           id={'image'}*/}
                            {/*           type={'file'} />*/}
                            {/*    <label htmlFor={'image'}>Image</label>*/}
                            {/*</div>*/}
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

AddNewBook.propTypes = {
    addNewBookAction: PropTypes.func.isRequired,

    auth: PropTypes.object.isRequired,
    addNewBookState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    addNewBookState: state.addNewBookState,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    {addNewBookAction}
)(withRouter(AddNewBook))
