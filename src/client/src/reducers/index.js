import {combineReducers} from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import {
    addNewBookReducer, deleteBookReducer,
    guestBookReducer,
    myBookReducer,
    requestBookReducer,
    viewOneBookReducer
} from "./bookReducer";

export default combineReducers({
    auth: authReducers,
    errors: errorReducers,
    // addBook: addBookReducer,
    myBookState: myBookReducer,
    guestBookState: guestBookReducer,
    viewOneBookState: viewOneBookReducer,
    requestBookState: requestBookReducer,
    addNewBookState: addNewBookReducer,
    deleteBookState: deleteBookReducer
})

