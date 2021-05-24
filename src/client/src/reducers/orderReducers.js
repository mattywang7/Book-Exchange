import {
    ORDER_ADD_NEW_FAILURE,
    ORDER_ADD_NEW_SUCCESS,
    ORDER_ADD_REVIEW_SUCCESS, ORDER_GET_REVIEWS_FAILURE,
    ORDER_GET_REVIEWS_SUCCESS,
    ORDER_MARK_EXCHANGED_FAILURE,
    ORDER_MARK_EXCHANGED_SUCCESS,
    ORDER_MY_ORDERS_FAILURE,
    ORDER_MY_ORDERS_SUCCESS,
    ORDER_MY_SOLD_ORDERS_FAILURE,
    ORDER_MY_SOLD_ORDERS_SUCCESS
} from "../actions/types";

export const addOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_ADD_NEW_SUCCESS:
            return {
                success: true,
                order: action.payload
            }
        case ORDER_ADD_NEW_FAILURE:
            return {
                error: action.payload
            }
        default:
            return state
    }
}

export const myOrdersReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ORDER_MY_ORDERS_SUCCESS:
            return {
                orders: action.payload
            }
        case ORDER_MY_ORDERS_FAILURE:
            return {
                error: action.payload
            }
        default:
            return state
    }
}

export const mySoldOrdersReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ORDER_MY_SOLD_ORDERS_SUCCESS:
            return {
                orders: action.payload
            }
        case ORDER_MY_SOLD_ORDERS_FAILURE:
            return {
                error: action.payload
            }
        default:
            return state
    }
}

export const markExchangedReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_MARK_EXCHANGED_SUCCESS:
            return {
                order: action.payload
            }
        case ORDER_MARK_EXCHANGED_FAILURE:
            return {
                error: action.payload
            }
        default:
            return state
    }
}

export const addNewReviewReducer = (state = {review: {}}, action) => {
    switch (action.type) {
        case ORDER_ADD_REVIEW_SUCCESS:
            return {
                review: action.payload
            }
        default:
            return state
    }
}

export const getReviewReducer = (state = {review: {}}, action) => {
    switch (action.type) {
        case ORDER_GET_REVIEWS_SUCCESS:
            return {
                review: action.payload
            }
        case ORDER_GET_REVIEWS_FAILURE:
            return {
                error: action.payload
            }
        default:
            return state
    }
}
