import * as actionTypes from '../Constants/StorefrontConstants'
import api from '../../Apis/api'

export const getFooterDetails = () => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_FOOTER_REQUEST})
        const {data: {data}} = await api.post('/storefront/get', {selectArray: ["Footer", "Menus", "SocialLinks"]})
        dispatch({
            type: actionTypes.GET_FOOTER_SUCCESS,
            payload: data[0],
        })
    }catch(error){
        dispatch({
            type: actionTypes.GET_FOOTER_FAIL,
            payload: "something went wrong"
        })
    }
}
export const getProductTabs = () => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_PRODUCT_TABS_REQUEST})
        const {data: {data}} = await api.post('/storefront/get', {selectArray: ["Products"]})
        
        dispatch({
            type: actionTypes.GET_PRODUCT_TABS_SUCCESS,
            payload: data[0].Products,
        })
    }catch(error){
        dispatch({
            type: actionTypes.GET_PRODUCT_TABS_FAIL,
            payload: "something went wrong"
        })
    }
}
export const getFeaturedCategoriesTabs = () => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_FEATURED_CATEGORIES_REQUEST})
        const {data: {data}} = await api.post('/storefront/get', {selectArray: ["FeaturedCategories"]})
        dispatch({
            type: actionTypes.GET_FEATURED_CATEGORIES_SUCCESS,
            payload: data[0].FeaturedCategories,
        })
    }catch(error){
        dispatch({
            type: actionTypes.GET_FEATURED_CATEGORIES_FAIL,
            payload: "something went wrong"
        })
    }
}
export const getFeatures = () => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_FEATURES_REQUEST})
        const {data: {data}} = await api.post('/storefront/get', {selectArray: ["Features"]})
        
        dispatch({
            type: actionTypes.GET_FEATURES_SUCCESS,
            payload: data[0]
        })
    }catch(error){
        dispatch({
            type: actionTypes.GET_FEATURES_FAIL,
            payload: "something went wrong"
        })
    }
}

export const getLogos = () => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_LOGO_REQUEST})
        const {data: {data}} = await api.post('/storefront/get', {selectArray: ["Logo"]})
        
        dispatch({
            type: actionTypes.GET_LOGO_SUCCESS,
            payload: data[0]
        })
    }catch(error){
        dispatch({
            type: actionTypes.GET_LOGO_FAIL,
            payload: "something went wrong"
        })
    }
}

export const getBanners = () => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_BANNERS_REQUEST})
        const {data: {data}} = await api.post('/storefront/get', {selectArray: ["Banners"]})
        
        dispatch({
            type: actionTypes.GET_BANNERS_SUCCESS,
            payload: data[0]
        })
    }catch(error){
        dispatch({
            type: actionTypes.GET_BANNERS_FAIL,
            payload: "something went wrong"
        })
    }
}

export const getBrands = () => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_BRANDS_REQUEST})
        const {data: {data}} = await api.post('/brand/get',{sortBy: "-name", skipNumber: 0, limitNumber: 0})
        
        dispatch({
            type: actionTypes.GET_BRANDS_SUCCESS,
            payload: data.filter(brand=>brand.status)
        })
    }catch(error){
        dispatch({
            type: actionTypes.GET_BRANDS_FAIL,
            payload: "something went wrong"
        })
    }
}

export const getTopBrands = () => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_TOP_BRANDS_REQUEST})
        const {data: {data}} = await api.post('/storefront/get', {selectArray: ["TopBrands"]})
        
        dispatch({
            type: actionTypes.GET_TOP_BRANDS_SUCCESS,
            payload: data[0]
        })
    }catch(error){
        dispatch({
            type: actionTypes.GET_TOP_BRANDS_FAIL,
            payload: "something went wrong"
        })
    }
}
export const getGeneral = () => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_GENERAL_REQUEST})
        const {data: {data}} = await api.post('/storefront/get', {selectArray: ["General"]})
        
        dispatch({
            type: actionTypes.GET_GENERAL_SUCCESS,
            payload: data[0].General
        })

    }catch(error){
        dispatch({
            type: actionTypes.GET_GENERAL_FAIL,
            payload: "something went wrong"
        })
    }
}

export const getTopCategories = () => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_TOP_CATEGORIES_REQUEST})
        const {data: {data}} = await api.post('/storefront/get', {selectArray: ["TopCategories"]})
        
        dispatch({
            type: actionTypes.GET_TOP_CATEGORIES_SUCCESS,
            payload: data[0]
        })
    }catch(error){
        dispatch({
            type: actionTypes.GET_TOP_CATEGORIES_FAIL,
            payload: "something went wrong"
        })
    }
}

export const getClientReviews = () => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_CLIENT_REVIEW_REQUEST})
        const {data: {data}} = await api.post('/banner/get')
        dispatch({
            type: actionTypes.GET_CLIENT_REVIEW_SUCCESS,
            payload: data[0]
        })
    }catch(error){
        dispatch({
            type: actionTypes.GET_CLIENT_REVIEW_FAIL,
            payload: "something went wrong"
        })
    }
}
