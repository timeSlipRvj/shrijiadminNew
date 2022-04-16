import * as actionTypes from '../Constants/SettingsConstants'

export const getSettingsReducer = (state = { settings: {PaymentMethods: {}, ShippingMethods:{}}}, action) => {
    switch(action.type){
        case actionTypes.GET_SETTINGS_REQUEST:
            return{
                loading: true,
                settings: {PaymentMethods: {},ShippingMethods:{}}
            }
        case actionTypes.GET_SETTINGS_SUCCESS:
            return {
                loading: false,
                settings: action.payload
            }
        case actionTypes.GET_SETTINGS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
