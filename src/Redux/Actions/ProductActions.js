import * as actionTypes from '../Constants/ProductConstants'
import api from '../../Apis/api'
import { toast } from "react-toastify";

export const getTags = () => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_TAGS_REQUEST})
        const {data} = await api.post('/tag/get', {sortBy: "name"})
        dispatch({
            type: actionTypes.GET_TAGS_SUCCESS,
            payload: data.data
        })
    }catch(error){
        dispatch({
            type: actionTypes.GET_TAGS_FAIL,
            payload: "something went wrong"
        })
    }
}
export const postReview = (review, productId) =>{
    try{
        const {data } = api.post('/review', {data:review, productId, requiredPermission: "Create Review"})
    }catch(err){
        console.log(err)
    }
}

export const modifyCompare = (products) => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.ADD_TO_COMPARE_REQUEST})
        
        dispatch({
            type: actionTypes.ADD_TO_COMPARE_SUCCESS,
            payload: products
        })
        toast.success(`Product added for compare.`, {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }catch(error){
        dispatch({
            type: actionTypes.ADD_TO_COMPARE_FAIL,
            payload: "something went wrong"
        })
    }
}
