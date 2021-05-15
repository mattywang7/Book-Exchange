import React, {Component} from "react";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Button, Card} from "react-bootstrap";

class OneBook extends Component {

    onViewBookClick = () => {
        this.props.history.push(`/books/`)
    }

    render() {
        const {book} = this.props.book

        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                        Author: {book.author}
                    </Card.Text>
                    <Card.Text>
                        Category: {book.category}
                    </Card.Text>
                    <Card.Text>
                        Condition: {book.condition}
                    </Card.Text>
                    <Card.Text>

                    </Card.Text>
                    <Button variant={'primary'}
                            onClick={this.onViewBookClick}>
                        View Book Detail
                    </Button>
                </Card.Body>
            </Card>
        )
    }
}

OneBook.propTypes = {
    book: PropTypes.object.isRequired
}

export default OneBook
