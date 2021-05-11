import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER, USER_LOADING} from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwtDecode from "jwt-decode";

// register user
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))  // redirect to login after register successfully
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// login, get user token
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // save to localStorage
            // set token to localStorage
            const {token} = res.data
            localStorage.setItem('jwtToken', token)
            localStorage.setItem('user', JSON.stringify(res.data))
            // set token to auth header
            setAuthToken(token)
            // decode token to get user data
            const decoded = jwtDecode(token)
            // set current user
            dispatch(setCurrentUser(decoded))
            alert('User logged in!')  // display for dev only
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// user logging
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}

// log user out
export const logoutUser = () => dispatch => {
    // remove token from local storage
    localStorage.removeItem('jwtToken')
    // remove auth header for future requests
    setAuthToken(false)
    // set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}
