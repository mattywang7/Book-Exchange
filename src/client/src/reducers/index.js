import {combineReducers} from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import {searchBookReducer} from "./bookReducer";

export default combineReducers({
    auth: authReducers,
    errors: errorReducers,
    searchBook: searchBookReducer
})
