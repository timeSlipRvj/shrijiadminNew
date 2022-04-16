import * as actionTypes from '../Constants/UserConstants'
import {getUserDetails} from '../../Utils/Local'

export const loginUser = (state = { }, action) => {
    switch(action.type){
        case actionTypes.GET_LOGIN_REQUEST:
            return{
                loading: true,
            }
        case actionTypes.GET_LOGIN_SUCCESS:
            return {
                loading: false,
            }
        case actionTypes.GET_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.GET_LOGOUT_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.GET_LOGOUT_SUCCESS:
            return {
                loading: false,
            }
        case actionTypes.GET_LOGOUT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
export const getUserDetailsReducer = (state = { user: {}}, action) => {
    switch(action.type){
        case actionTypes.GET_USER_DETAILS_REQUEST:
            return{
                loading: true,
                user: {}
            }
        case actionTypes.GET_USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case actionTypes.GET_USER_DETAILS_FAIL:
            return {
                loading: false,
                user: {},
                error: action.payload
            }
        case actionTypes.REMOVE_USER_DETAILS_SUCCESS:{
            return {
                loading: false,
                user: {}
            }
        }
        case actionTypes.EDIT_USER_DETAILS_SUCCESS:
            return {
                updating: false,
                user: action.payload
            }
        default:
            return state;
    }
}
export const editUserDetailsReducer = (state = { }, action) => {
    switch(action.type){
        case actionTypes.EDIT_USER_DETAILS_REQUEST:
            return{
                updating: true,
            }
        case actionTypes.EDIT_USER_DETAILS_SUCCESS:
            return {
                updating: false,
                user: action.payload
            }
        case actionTypes.EDIT_USER_DETAILS_FAIL:
            return {
                updating: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const userOrdersReducers = (state = { orders: []}, action) => {
    switch(action.type){
        case actionTypes.GET_USER_ORDERS_REQUEST:
            return{
                loading: true,
                orders: []
            }
        case actionTypes.GET_USER_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case actionTypes.GET_USER_ORDERS_FAIL:
            return {
                loading: false,
                orders: [],
                error: action.payload
            }
        default:
            return state;
    }
}
