import * as actionTypes from '../Constants/ShopConstants'
import api from '../../Apis/api'

export const saveOrderDetails = (order) => async(dispatch) => {
    try{
        dispatch({
            type: actionTypes.ORDER_PROGRESS_SUCCESS,
            payload: order
        })
    }catch(error){
        dispatch({
            type: actionTypes.ORDER_PROGRESS_FAIL,
            payload: "something went wrong"
        })
    }
}
