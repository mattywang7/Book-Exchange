import {BOOK_ADD_FAIL, BOOK_ADD_SUCCESS} from "../actions/types";

export const addBookReducer = (state = {}, action) => {
    switch (action.type) {
        case BOOK_ADD_SUCCESS:
            return {
                success: true,
                newBook: action.payload
            }
        case BOOK_ADD_FAIL:
            return {
                error: action.payload
            }
        default:
            return state
    }
}
