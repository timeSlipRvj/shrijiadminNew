import * as actionTypes from '../Constants/ProductConstants'



export const getTagsReducer = (state = {tags:[]}, action) => {
    switch(action.type){
        case actionTypes.GET_TAGS_REQUEST:
            return{
                loading: true,
                tags: []
            }
        case actionTypes.GET_TAGS_SUCCESS:
            return {
                loading: false,
                tags: action.payload
            }
        case actionTypes.GET_TAGS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export const compareProductsReducer = (state = {products:[]}, action) => {
    switch(action.type){
        case actionTypes.ADD_TO_COMPARE_REQUEST:
            return{
                loading: true,
                products: []
            }
        case actionTypes.ADD_TO_COMPARE_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case actionTypes.ADD_TO_COMPARE_FAIL:
            return {
                loading: false,
                products:[],
                error: action.payload
            }
        case actionTypes.REMOVE_FROM_COMPARE_REQUEST:
            return{
                loading: true,
                products: []
            }
        case actionTypes.REMOVE_FROM_COMPARE_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case actionTypes.REMOVE_FROM_COMPARE_FAIL:
            return {
                loading: false,
                products:[],
                error: action.payload
            }
        default:
            return state;
    }
}