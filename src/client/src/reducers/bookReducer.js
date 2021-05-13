import {
    BOOK_GUEST_SEARCH_FAILURE,
    BOOK_GUEST_SEARCH_SUCCESS,
    BOOK_MY_BOOKS_FAILURE,
    BOOK_MY_BOOKS_SUCCESS, BOOK_REQUEST_FAILURE, BOOK_REQUEST_SUCCESS, BOOK_VIEW_ONE_FAILURE, BOOK_VIEW_ONE_SUCCESS
} from "../actions/types";



export const myBookReducer = (state = {books: []}, action) => {
    switch (action.type) {
        case BOOK_MY_BOOKS_SUCCESS:
            return {
                books: action.payload
            }
        case BOOK_MY_BOOKS_FAILURE:
            return {
                error: action.payload
            }
        default:
            return state
    }
}

export const guestBookReducer = (state = {books: []}, action) => {
    switch (action.type) {
        case BOOK_GUEST_SEARCH_SUCCESS:
            return {
                books: action.payload
            }
        case BOOK_GUEST_SEARCH_FAILURE:
            return {
                error: action.payload
            }
        default:
            return state
    }
}

export const viewOneBookReducer = (state = {book: {}}, action) => {
    switch (action.type) {
        case BOOK_VIEW_ONE_SUCCESS:
            return {
                book: action.payload
            }
        case BOOK_VIEW_ONE_FAILURE:
            return {
                error: action.payload
            }
        default:
            return state
    }
}

export const requestBookReducer = (state = {book: {}}, action) => {
    switch (action.type) {
        case BOOK_REQUEST_SUCCESS:
            return {
                book: action.payload
            }
        case BOOK_REQUEST_FAILURE:
            return {
                error: action.payload
            }
        default:
            return state
    }
}
