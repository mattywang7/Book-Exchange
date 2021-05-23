import axios from "axios";
import {
    ORDER_ADD_NEW_FAILURE,
    ORDER_ADD_NEW_SUCCESS, ORDER_MARK_EXCHANGED_FAILURE, ORDER_MARK_EXCHANGED_SUCCESS,
    ORDER_MY_ORDERS_FAILURE,
    ORDER_MY_ORDERS_SUCCESS, ORDER_MY_SOLD_ORDERS_FAILURE,
    ORDER_MY_SOLD_ORDERS_SUCCESS
} from "./types";

export const addOrderAction = (id, order, history) => async (dispatch, getState) => {
    try {
        const {auth: {user}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.post(`/api/orders/new/${id}`, order, config)
        dispatch({
            type: ORDER_ADD_NEW_SUCCESS,
            payload: data
        })
        history.push('/orders/bought')
    } catch (error) {
        dispatch({
            type: ORDER_ADD_NEW_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const myOrdersAction = () => async (dispatch, getState) => {
    try {
        const {auth: {user}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.get('/api/orders/my', config)
        dispatch({
            type: ORDER_MY_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_MY_ORDERS_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const mySoldOrdersAction = () => async (dispatch, getState) => {
    try {
        const {auth: {user}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.get('/api/orders/mysold', config)
        dispatch({
            type: ORDER_MY_SOLD_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_MY_SOLD_ORDERS_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const markExchangedAction = (id) => async (dispatch, getState) => {
    try {
        const {auth: {user}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.put(`/api/orders/mark-exchanged/${id}`, config)
        dispatch({
            type: ORDER_MARK_EXCHANGED_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_MARK_EXCHANGED_FAILURE,
            payload: error.response.data.message
        })
    }
}
