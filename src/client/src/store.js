/**
 * createStore() creates a Redux store that holds the complete state tree of the app.
 * There should only be a single store in the app.
 */

import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import rootReducer from './reducers'
import {composeWithDevTools} from "redux-devtools-extension";

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    auth: {
        user: userInfoFromLocalStorage
    }
}

const middleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
