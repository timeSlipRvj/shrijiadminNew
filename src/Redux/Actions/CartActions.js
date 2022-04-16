import * as actionTypes from '../Constants/ShopConstants'
import api from '../../Apis/api'
import {getUser} from '../../Utils/Local'
import { toast } from "react-toastify";

export const getCart = () => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_CART_REQUEST})
        let url = "/users/get/"+getUser()
        const {data} = await api.get(url)
        data.data.Cart = data.data.Cart.filter(item=>item.product != null)
         data.data.Cart.forEach(item=>{
            item.couponDiscount = 0;
            item.totalPrice =item.product.options&&item.product.options.length>0?item.stock.price*item.qty: item.product.specialPrice
            ? item.product.specialPriceType == "Fixed"
              ? item.product.specialPrice * item.qty
              : (item.product.price.toString() -
                (item.product.specialPrice.toString() / 100) *
                item.product.price) * 
              item.qty.toString()
            : item.product.price * item.qty;
            
        })
        // console.log("cart",cart)
        dispatch({
            type: actionTypes.GET_CART_SUCCESS,
            payload: data.data.Cart
        })
    }catch(err){
        toast.error(
            `${
              err.response?.data?.message
                ? err.response.data.message
                : "Could not fetch cart."
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
            type: actionTypes.GET_CART_FAIL,
            payload: "something went wrong"
        })
    }
}

export const addToCart = (productId,qty,stockId, oldCart) => async(dispatch) => {
    try{ 
        dispatch({ type: actionTypes.ADD_CART_REQUEST})
        const {data} = await api.put('/customer/cart', {productId, qty,stockId})
        data.data.Cart = data.data.Cart.filter(item=>item.product != null)
        data.data.Cart.forEach(item=>{
            item.couponDiscount = 0;
            item.totalPrice = item.product.specialPrice
            ? item.product.specialPriceType == "Fixed"
              ? item.product.specialPrice * item.qty
              : (item.product.price.toString() -
                (item.product.specialPrice.toString() / 100) *
                item.product.price) *
              item.qty.toString()
            : item.product.price * item.qty
        })
        dispatch({
            type: actionTypes.ADD_CART_SUCCESS,
            payload: data.data.Cart
        })
        toast.success(`Product added to cart.`, {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }catch(err){
      console.log(err)
        toast.error(
            `${
              err.response?.data?.message
                ? err.response.data.message
                : "Something went wrong."
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
            type: actionTypes.ADD_CART_FAIL,
            oldCart,
            payload: "something went wrong"
        })
    }
}
export const updateCartQty = (productId, qty, stockId, oldCart) => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.ADD_CART_REQUEST})
        const {data} = await api.put('/customer/cart/increase', {productId, qty, stockId})
        data.data.Cart = data.data.Cart.filter(item=>item.product != null)
        data.data.Cart.forEach(item=>{
            item.couponDiscount = 0;
            item.totalPrice = item.product.specialPrice
            ? item.product.specialPriceType == "Fixed"
              ? item.product.specialPrice * item.qty
              : (item.product.price.toString() -
                (item.product.specialPrice.toString() / 100) *
                item.product.price) *
              item.qty.toString()
            : item.product.price * item.qty
        })
        dispatch({
            type: actionTypes.ADD_CART_SUCCESS,
            payload: data.data.Cart
        })
        toast.success(`Cart updated.`, {
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
                : "Something went wrong."
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
            type: actionTypes.ADD_CART_FAIL,
            oldCart,
            payload: "something went wrong"
        })
    }
}
export const deleteFromCart = (productId, stockId, oldCart) => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.DELETE_CART_REQUEST})
        const {data} = await api.delete('/customer/cart', {data:{productId,stockId}})
        data.data.Cart = data.data.Cart.filter(item=>item.product != null)
        data.data.Cart.forEach(item=>{
            item.couponDiscount = 0;
            item.totalPrice = item.product.specialPrice
            ? item.product.specialPriceType == "Fixed"
              ? item.product.specialPrice * item.qty
              : (item.product.price.toString() -
                (item.product.specialPrice.toString() / 100) *
                item.product.price) *
              item.qty.toString()
            : item.product.price * item.qty
        })
        dispatch({
            type: actionTypes.DELETE_CART_SUCCESS,
            payload: data.data.Cart
        })
        toast.success(`Removed from cart.`, {
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }catch(err){
      console.log(err)
        toast.error(
            `${
              err.response?.data?.message
                ? err.response.data.message
                : "Something went wrong."
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
            type: actionTypes.DELETE_CART_FAIL,
            oldCart,
            payload: "something went wrong"
        })
    }
}

export const emptyCart = () => async(dispatch) => {
    dispatch({
        type: actionTypes.EMPTY_CART_SUCCESS,
        payload: ""
    })
}
