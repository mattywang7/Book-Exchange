import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {myBookAction} from "../../actions/bookAction";
import {logoutUser} from "../../actions/authActions";
import {Col} from "react-bootstrap";
import Book from "../layout/Book";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard2 = ({history}) => {
    const dispatch = useDispatch()

    const {user} = useSelector(state => state.auth)

    const {books} = useSelector(state => state.myBookState)

    useEffect(() => {
        if (user === null) {
            history.push('/login')
        } else {
            dispatch(myBookAction())
            const selectedBook = books.filter(oneBook => {
                if (oneBook.sold === true) {
                    notify(selectedBook)
                    return oneBook
                }
            })
        }
    }, [dispatch, books, user])

    const notify = (selectedBook) => {
        toast(`${selectedBook.title} is chosen, please check in your SOLD orders`)
    }

    const onLogoutClick = e => {
        e.preventDefault()
        dispatch(logoutUser(history))
    }

    const onAddBookClick = () => {
        history.push('/add-for-sale')
    }

    const onViewBoughtOrdersClick = () => {
        history.push('/orders/bought')
    }

    const onViewSoldOrdersClick = () => {
        history.push('/orders/sold')
    }

    const onViewForSaleBooksClick = () => {
        history.push('/books-for-sale')
    }

    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col s12'}>
                    <button onClick={onLogoutClick}
                            className={'btn-flat waves-effect'}>
                        <i className={'material-icons left'}>keyboard_backspace</i> Log Out
                    </button>
                </div>
                <div className={'col s12 center-align'}>
                    {user === null ? (
                        <></>
                    ) : (
                        <h4>
                            <b>Welcome,</b> {user.firstName} {user.lastName}
                        </h4>
                    )}
                    {books.length === 0 && <p className={'grey-text text-darken-1'}>
                        You have no books now. You can add one for sale below.
                    </p> }
                    <div className={'col s3'}>
                        <button style={{
                            width: '150px',
                            borderRadius: '3px',
                            letterSpacing: '1.5px',
                            marginTop: '1rem'
                        }}
                                onClick={onAddBookClick}
                                className={'btn btn-large waves-effect waves-light hoverable blue accent-3'}>
                            Add One
                        </button>
                    </div>
                    <div className={'col s3'}>
                        <button style={{
                            width: '150px',
                            borderRadius: '3px',
                            letterSpacing: '1.5px',
                            marginTop: '1rem'
                        }}
                                onClick={onViewBoughtOrdersClick}
                                className={'btn btn-large waves-effect waves-light hoverable blue accent-3'}>
                            Bought
                        </button>
                    </div>
                    <div className={'col s3'}>
                        <button style={{
                            width: '150px',
                            borderRadius: '3px',
                            letterSpacing: '1.5px',
                            marginTop: '1rem'
                        }}
                                onClick={onViewSoldOrdersClick}
                                className={'btn btn-large waves-effect waves-light hoverable blue accent-3'}>
                            Sold
                        </button>
                    </div>
                    <div className={'col s3'}>
                        <button style={{
                            width: '150px',
                            borderRadius: '3px',
                            letterSpacing: '1.5px',
                            marginTop: '1rem'
                        }}
                                onClick={onViewForSaleBooksClick}
                                className={'btn btn-large waves-effect waves-light hoverable blue accent-3'}>
                            ForSale
                        </button>
                    </div>
                    <br />
                    <div>
                        <p className={'grey-text text-darken-1'}>
                            The books you own are listed below
                        </p>
                        {books.map(book => (
                            <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                                <Book book={book} />
                            </Col>
                        ))}
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard2
