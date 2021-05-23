import {
    SET_CURRENT_USER,
    USER_LOADING,
    USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS,
} from "../actions/types";

const empty = require('is-empty')

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !empty(action.payload),
                user: action.payload
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: !empty(action.payload),
                user: action.payload
            }
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: !empty(action.payload),
                user: action.payload
            }
        default:
            return state
    }
}
