import {combineReducers} from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import {addBookReducer} from "./bookReducers";
import bookReducer from "./bookReducer";

export default combineReducers({
    auth: authReducers,
    errors: errorReducers,
    // addBook: addBookReducer,
    bookState: bookReducer
})

