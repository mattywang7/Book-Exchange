import axios from "axios";
import {BOOK_ADD_FAIL, BOOK_ADD_SUCCESS} from "./types";

export const addBook = (book) => async (dispatch, getState) => {
    try {
        const {auth: {user}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {newBook} = await axios.post('/api/books/add-for-sale', book, config)
        dispatch({
            type: BOOK_ADD_SUCCESS,
            payload: newBook
        })
    } catch (error) {
        dispatch({
            type: BOOK_ADD_FAIL,
            payload: error.response.data.message
        })
    }
}
