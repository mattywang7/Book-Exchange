import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Score from "../layout/Score";

const Book = ({ book }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/book/${book._id}`}>
                <Card.Img src={book.image} variant={'top'} />
            </Link>
            <Card.Body>
                <Link to={`/book/${book._id}`}>
                    <Card.Title as="div">
                        <strong>{book.title}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    {book.author}
                </Card.Text>
                <Card.Text as="div">
                    {book.category}
                </Card.Text>
                <Card.Text as={'div'}>
                    {book.condition}
                </Card.Text>
                <Card.Text as={'h6'}>
                    <Score value={book.score} />
                </Card.Text>
                <Card.Text as="h3">
                    ${book.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Book;
