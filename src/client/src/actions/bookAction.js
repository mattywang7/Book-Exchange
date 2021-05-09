import axios from "axios";
import {ADD_BOOK_FOR_SALE} from "./types";

export const addBookForSale = bookInfo => dispatch => {
    axios.post('/api/books/add-for-sale', bookInfo)
        .then(res => {
            dispatch({
                type: ADD_BOOK_FOR_SALE,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}
