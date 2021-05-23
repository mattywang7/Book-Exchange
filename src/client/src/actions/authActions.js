import axios from "axios";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS, USER_REGISTER_SUCCESS,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwtDecode from "jwt-decode";



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
export const logoutUser = (history) => dispatch => {
    // remove token from local storage
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('userInfo')
    // remove auth header for future requests
    setAuthToken(false)
    // set current user to empty object {} which will set isAuthenticated to false
    dispatch({
        type: USER_LOGOUT_SUCCESS,
        payload: {}
    })
    history.push('/login')
}

export const registerAction = (userData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/users/register', userData, config)
        // dispatch({
        //     type: USER_REGISTER_SUCCESS,
        //     payload: data
        // })
        // localStorage.setItem('userInfo', JSON.stringify(data))

        // no dispatch, redirect to login
        history.push('/login')
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const loginAction = (userData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/users/login', userData, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('jwtToken', data.token)
        setAuthToken(data.token)
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}
