import * as actionTypes from '../Constants/ShopConstants'
import api from '../../Apis/api'
import {getUser} from '../../Utils/Local'
import { toast } from "react-toastify";

export const getWishlist = () => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_WISHLIST_REQUEST})
        let url = "/users/get/"+getUser()
        const {data} = await api.get(url)
        dispatch({
            type: actionTypes.GET_WISHLIST_SUCCESS,
            payload: data.data.Wishlist
        })
    }catch(err){
        toast.error(
            `${
              err.response?.data?.message
                ? err.response.data.message
                : "Could not fetch wishlist."
            }`,
            {
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        dispatch({
            type: actionTypes.GET_WISHLIST_FAIL,
            payload: "something went wrong"
        })
    }
}

export const addToWishlist = (productId) => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.ADD_WISHLIST_REQUEST})
        const {data} = await api.put('/customer/wishlist', {productId})
        dispatch({
            type: actionTypes.ADD_WISHLIST_SUCCESS,
            payload: data.data.Wishlist
        })
        toast.success(`Product added to wishlist.`, {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }catch(err){
        toast.error(
            `${
              err.response?.data?.message
                ? err.response.data.message
                : "Could not add to wishlist."
            }`,
            {
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        dispatch({
            type: actionTypes.ADD_WISHLIST_FAIL,
            payload: "something went wrong"
        })
    }
}

export const deleteFromWishlist = (productId) => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.DELETE_WISHLIST_REQUEST})
        const {data} = await api.delete('/customer/wishlist', {data:{productId}})
        dispatch({
            type: actionTypes.DELETE_WISHLIST_SUCCESS,
            payload: data.data.Wishlist
        })
        toast.success(`Product removed from wishlist.`, {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }catch(err){
        toast.error(
            `${
              err.response?.data?.message
                ? err.response.data.message
                : "Could not remove from wishlist."
            }`,
            {
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        dispatch({
            type: actionTypes.DELETE_WISHLIST_FAIL,
            payload: "something went wrong"
        })
    }
}

