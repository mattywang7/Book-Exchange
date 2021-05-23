import React from 'react'
import {Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Score from "./Score";

const Book = ({ book, history }) => {

    const onViewBookClick = () => {
        history.push(`/books/${book._id}`)
    }

    return (
        <Card className="my-3 p-3 rounded">
            <Card.Body>
                <Link to={`/books/${book._id}`}>
                    <Card.Title as="div">
                        <strong>{book.title}</strong>
                    </Card.Title>
                </Link>
                <Card.Text>
                    <b>Author</b>: {book.author}
                </Card.Text>
                <Card.Text>
                    <b>Category</b>: {book.category}
                </Card.Text>
                <Card.Text>
                    <b>Condition</b>: {book.condition}
                </Card.Text>
                <Card.Text>
                    <b>Price</b>: £{book.price}
                </Card.Text>
                <Card.Text>
                    <b>Status</b>: {book.forSale ? ('For Sale') : ('Purchased')}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Book;
