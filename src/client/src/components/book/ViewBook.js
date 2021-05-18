import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { deleteBookAction, viewOneBookAction } from "../../actions/bookAction";
import Book from "../layout/Book";

const ViewBook = ({ match, history }) => {
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)

    const { book, error } = useSelector(state => state.viewOneBookState)

    const { success } = useSelector(state => state.deleteBookState)

    const requestBookClick = () => {
        history.push(`/orders/new/${match.params.id}`)
    }

    const loginBeforeRequestClick = () => {
        history.push('/login')
    }

    const onDeleteBookClick = () => {
        dispatch(deleteBookAction(match.params.id, history))
    }

    useEffect(() => {
        dispatch(viewOneBookAction(match.params.id))
    }, [dispatch, match.params.id])

    return (
        <div className={'container'}>
            <div className={'col s12 center-align'}>
                <Book book={book} />
            </div>
            <div className={'col s6'}>
                {user === null ? (
                    <Button className={'btn-block'}
                        type={'button'}
                        onClick={loginBeforeRequestClick}>
                        Login in to request
                    </Button>
                ) : user._id === book.userId ? (
                    <>
                    </>
                ) : (
                    <Button className={'btn-block'}
                            type={'button'}
                            onClick={requestBookClick}
                            disabled={book.sold}>
                        Request it
                    </Button>
                )}
            </div>
            <div className={'col s6'}>
                {user !== null && book !== null && user._id === book.userId ? (
                    <button style={{
                        width: '150px',
                        borderRadius: '3px',
                        letterSpacing: '1.5px',
                        marginTop: '1rem'
                    }}
                        type={'submit'}
                        className={'btn btn-large waves-effect waves-light hoberable red accent-3'}
                        onClick={onDeleteBookClick}>
                        Delete
                    </button>
                ) : (
                    <br />
                )}
            </div>
        </div>
    )
}

export default ViewBook
