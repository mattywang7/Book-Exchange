import axios from "axios";
import {BOOK_ADD_FAIL, BOOK_ADD_SUCCESS, BOOK_DELETE_SUCCESS, BOOK_FOR_SALE_GET} from "./types";

export const addBook = bookData => dispatch => {
    const books = bookData.books
    axios.post('/api/books/add-for-sale', bookData)
        .then(res => {
            dispatch({
                type: BOOK_ADD_SUCCESS,
                payload: res.data  // return the newly created book data
            })
        })
        .catch(err => console.log(err))
}

// get all books-for-sale for specific user
export const getBooks = () => dispatch => {
    axios.get('/api/books/books-for-sale')
        .then(res => {
            dispatch({
                type: BOOK_FOR_SALE_GET,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: BOOK_FOR_SALE_GET,
                payload: null
            })
        })
}

// delete one book
export const deleteBook = bookData => dispatch => {
    if (window.confirm('Are you sure to delete this book?')) {
        const id = bookData.id
        axios.delete(`/api/books/${id}`)
            .then(res => {
                dispatch({
                    type: BOOK_DELETE_SUCCESS,
                    payload: id
                })
            })
            .catch(err => console.log(err))
    }
}
