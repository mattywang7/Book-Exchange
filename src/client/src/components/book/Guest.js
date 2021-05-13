import React, {Component, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {guestBookAction} from "../../actions/bookAction";
import {Col, Row} from "react-bootstrap";
import SearchBox from "../layout/SearchBox";
import Book from "../dashboard/Book";

const Guest = ({match}) => {
    const type = match.params.type
    const keyword = match.params.keyword

    const dispatch = useDispatch()

    const {books, error} = useSelector(state => state.guestBookState)

    useEffect(() => {
        dispatch(guestBookAction(type, keyword))
    }, [dispatch, type, keyword])

    return (
        <>
            <h1>Online Book Store</h1>
            <Row className={'mt-3'}>
                <Col md={4}>
                    <SearchBox type={'title'} />
                </Col>
                <Col md={4}>
                    <SearchBox type={'author'} />
                </Col>
                <Col md={4}>
                    <SearchBox type={'category'} />
                </Col>
                <Row className={'mt-3'}>
                    {books.map(book => (
                        <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                            <Book book={book} />
                        </Col>
                    ))}
                </Row>
            </Row>
        </>
    )
}

export default Guest
