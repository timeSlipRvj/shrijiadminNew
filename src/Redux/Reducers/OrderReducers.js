import * as actionTypes from '../Constants/ShopConstants'

export const saveOrderReducer = (state = { orderDetails: {}}, action) => {
    switch(action.type){
        case actionTypes.ORDER_PROGRESS_REQUEST:
            return{
                loading: true,
                orderDetails: {}
            }
        case actionTypes.ORDER_PROGRESS_SUCCESS:
            return {
                loading: false,
                orderDetails: action.payload
            }
        case actionTypes.ORDER_PROGRESS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
