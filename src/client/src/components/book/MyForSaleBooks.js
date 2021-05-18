import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {myBooksForSaleAction} from "../../actions/bookAction";
import {Col} from "react-bootstrap";
import Book from "../layout/Book";

const MyForSaleBooks = ({history}) => {
    const dispatch = useDispatch()

    const {user} = useSelector(state => state.auth)

    const {books} = useSelector(state => state.myBooksForSaleState)

    useEffect(() => {
        if (!user) {
            history.push('/login')
        } else {
            dispatch(myBooksForSaleAction())
        }
    }, [books])

    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col s12 center-align'}>
                    {(books == null || books.length === 0) && <p className={'grey-text text-darken-1'}>
                        You have no books now. You can add one for sale below.
                    </p> }
                    <div>
                        <p className={'grey-text text-darken-1'}>
                            The books you listed for sale are listed below
                        </p>
                        {books.length > 0 && books.map(book => (
                            <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                                <Book book={book} />
                            </Col>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyForSaleBooks
