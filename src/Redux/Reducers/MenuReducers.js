import * as actionTypes from '../Constants/MenuConstants'

export const getMenuReducer = (state = { menus: {PrimaryMenu: {menuItems:[]}}}, action) => {
    switch(action.type){
        case actionTypes.GET_MENUS_REQUEST:
            return{
                loading: true,
                menus: []
            }
        case actionTypes.GET_MENUS_SUCCESS:
            return {
                loading: false,
                menus: action.payload
            }
        case actionTypes.GET_MENUS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
