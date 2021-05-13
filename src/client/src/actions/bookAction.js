import axios from "axios";
import {
    BOOK_GUEST_SEARCH_FAILURE,
    BOOK_GUEST_SEARCH_SUCCESS,
    BOOK_MY_BOOKS_FAILURE,
    BOOK_MY_BOOKS_SUCCESS
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

//
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
