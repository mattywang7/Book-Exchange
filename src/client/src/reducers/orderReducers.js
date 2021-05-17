import {ORDER_ADD_NEW_FAILURE, ORDER_ADD_NEW_SUCCESS, ORDER_MY_ORDERS_FAILURE, ORDER_MY_ORDERS_SUCCESS} from "../actions/types";

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
