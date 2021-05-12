import {BOOK_ADD_SUCCESS, BOOK_DELETE_SUCCESS, BOOK_FOR_SALE_GET} from "../actions/types";

const initialState = {
    books: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case BOOK_FOR_SALE_GET:
            return {
                ...state,
                books: action.payload
            }
        case BOOK_DELETE_SUCCESS:
            return {
                ...state,
                books: state.books.filter(
                    book => book._id !== action.payload
                )
            }
        case BOOK_ADD_SUCCESS:
            return {
                ...state,
                books: [action.payload, ...state.books]
            }
        default:
            return state
    }
}
