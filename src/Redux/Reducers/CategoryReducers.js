import * as actionTypes from '../Constants/CategoryConstants'

export const getAllCategoriesReducer = (state = { categories: []}, action) => {
    switch(action.type){
        case actionTypes.GET_CATEGORIES_REQUEST:
            return{
                loading: true,
                categories: []
            }
        case actionTypes.GET_CATEGORIES_SUCCESS:
            return {
                loading: false,
                categories: action.payload
            }
        case actionTypes.GET_CATEGORIES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const getSectionProductsReducer = (state = { categoryProducts: []}, action) => {
    switch(action.type){
        case actionTypes.GET_CATEGORY_PRODUCTS_REQUEST:
            return{
                loading: true,
                categoryProducts: []
            }
        case actionTypes.GET_CATEGORY_PRODUCTS_SUCCESS:
            return {
                loading: false,
                categoryProducts: action.payload
            }
        case actionTypes.GET_CATEGORY_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}