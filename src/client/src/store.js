/**
 * createStore() creates a Redux store that holds the complete state tree of the app.
 * There should only be a single store in the app.
 */

import thunk from "redux-thunk";
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from './reducers'

const initialState = {}

const middleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store
