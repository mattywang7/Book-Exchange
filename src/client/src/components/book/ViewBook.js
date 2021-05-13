import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import Score from "../layout/Score";
import {requestBookAction, viewOneBookAction} from "../../actions/bookAction";

const ViewBook = ({match, history}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(viewOneBookAction(match.params.id))
    }, [dispatch])

    const {book, error} = useSelector(state => state.viewOneBookState)

    const requestBookClick = () => {
        dispatch(requestBookAction(match.params.id))
        history.push('/')
    }

    return (
        <>
            <Link to={'/'} className={'btn btn-dark my-3'}>Go Back</Link>
            <>
                <Row>
                    {/*<Col md={4}>*/}
                    {/*    <Image src={book.image} alt={book.title} fluid />*/}
                    {/*</Col>*/}
                    <Col md={4}>
                        <ListGroup variant={'flush'}>
                            <ListGroup.Item>
                                <h3>{book.title}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Author: {book.author}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Category: {book.category}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Condition: {book.condition}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Score value={book.score} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: £{book.price}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>${book.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{book.sold ? 'Unavailable - Sold' : 'Available'}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button className={'btn-block'}
                                            type={'button'}
                                            onClick={requestBookClick}
                                            disabled={book.sold}>
                                        Request it
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
        </>
    )
}

export default ViewBook
