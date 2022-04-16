import * as actionTypes from '../Constants/PageConstants'

export const getPageReducer = (state = { page: {}}, action) => {
    switch(action.type){
        case actionTypes.GET_PAGE_REQUEST:
            return{
                loading: true,
                page: {}
            }
        case actionTypes.GET_PAGE_SUCCESS:
            return {
                loading: false,
                page: action.payload
            }
        case actionTypes.GET_PAGE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
