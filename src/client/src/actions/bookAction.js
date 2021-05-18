import axios from "axios";
import {
    BOOK_ADD_NEW_FAILURE,
    BOOK_ADD_NEW_SUCCESS, BOOK_DELETE_FAILURE, BOOK_DELETE_SUCCESS,
    BOOK_GUEST_SEARCH_FAILURE,
    BOOK_GUEST_SEARCH_SUCCESS,
    BOOK_MY_BOOKS_FAILURE, BOOK_MY_BOOKS_FOR_SALE_FAILURE, BOOK_MY_BOOKS_FOR_SALE_SUCCESS,
    BOOK_MY_BOOKS_SUCCESS,
    BOOK_REQUEST_FAILURE,
    BOOK_REQUEST_SUCCESS,
    BOOK_VIEW_ONE_FAILURE,
    BOOK_VIEW_ONE_SUCCESS,
    GET_ERRORS
} from "./types";

// get all books for a specific user
export const myBookAction = () => async (dispatch, getState) => {
    try {
        const {auth : {user}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.get('/api/books/mybooks', config)
        dispatch({
            type: BOOK_MY_BOOKS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BOOK_MY_BOOKS_FAILURE,
            payload: error.response.data
        })
    }
}

export const myBooksForSaleAction = () => async (dispatch, getState) => {
    try {
        const {auth: {user}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.get('/api/books/books-for-sale', config)
        dispatch({
            type: BOOK_MY_BOOKS_FOR_SALE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BOOK_MY_BOOKS_FOR_SALE_FAILURE,
            payload: error.response.data
        })
    }
}

// index page for guests to view all the for-sale books
export const guestBookAction = (type = '', keyword = '') => async (dispatch) => {
    try {
        const {data} = await axios.get(`/api/books/search?type=${type}&keyword=${keyword}`)
        dispatch({
            type: BOOK_GUEST_SEARCH_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BOOK_GUEST_SEARCH_FAILURE,
            payload: error.response.data
        })
    }
}

export const viewOneBookAction = id => async (dispatch) => {
    try {
        const {data} = await axios.get(`/api/books/${id}`)
        dispatch({
            type: BOOK_VIEW_ONE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BOOK_VIEW_ONE_FAILURE,
            payload: error.response.data
        })
    }
}

export const requestBookAction = (id) => async (dispatch) => {
    try {
        const {data} = await axios.put(`/api/books/sold/${id}`)
        dispatch({
            type: BOOK_REQUEST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BOOK_REQUEST_FAILURE,
            payload: error.response.data
        })
    }
}

export const addNewBookAction = (newBook, history) => async (dispatch, getState) => {
    try {
        const {auth: {user}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.post('/api/books/add-for-sale', newBook, config)
        dispatch({
            type: BOOK_ADD_NEW_SUCCESS,
            payload: data
        })
        history.push('/dashboard')
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const deleteBookAction = (id, history) => async (dispatch, getState) => {
    try {
        const {auth: {user}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        await axios.delete(`/api/books/${id}`, config)
        dispatch({
            type: BOOK_DELETE_SUCCESS,
        })
        history.push('/dashboard')
    } catch (error) {
        dispatch({
            type: BOOK_DELETE_FAILURE,
            payload: error.response.data
        })
    }
}
