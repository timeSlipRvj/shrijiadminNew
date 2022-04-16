import * as actionTypes from '../Constants/ShopConstants'

export const cartReducer = (state = { cart: []}, action) => {
    switch(action.type){
        case actionTypes.GET_CART_REQUEST:
            return{
                loading: true,
                cart: []
            }
        case actionTypes.GET_CART_SUCCESS:
            return {
                loading: false,
                cart: action.payload
            }
        case actionTypes.GET_CART_FAIL:
            return {
                loading: false,
                cart: [],
                error: action.payload
            }
            case actionTypes.ADD_CART_REQUEST:
                return{
                    loading: true,
                    cart: []
                }
            case actionTypes.ADD_CART_SUCCESS:
                return {
                    loading: false,
                    cart: action.payload
                }
            case actionTypes.ADD_CART_FAIL:
                return {
                    loading: false,
                    cart:action.oldCart,
                    error: action.payload
                }
                case actionTypes.DELETE_CART_REQUEST:
                    return{
                        loading: true,
                        cart: []
                    }
                case actionTypes.DELETE_CART_SUCCESS:
                    return {
                        loading: false,
                        cart: action.payload
                    }
                case actionTypes.DELETE_CART_FAIL:
                    return {
                        loading: false,
                        cart:action.oldCart,
                        error: action.payload
                    }
                    case actionTypes.EMPTY_CART_SUCCESS:
                        return {
                            loading: false,
                            cart: []
                        }
                    
        default:
            return state;
    }
}


