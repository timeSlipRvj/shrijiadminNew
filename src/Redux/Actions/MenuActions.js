import * as actionTypes from '../Constants/MenuConstants'
import api from '../../Apis/api'

export const getMenus = () => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_MENUS_REQUEST})
        const {data: {data}} = await api.post('/storefront/get', {selectArray: ["Menus"]})
        dispatch({
            type: actionTypes.GET_MENUS_SUCCESS,
            payload: data[0].Menus
        })
    }catch(error){
        dispatch({
            type: actionTypes.GET_MENUS_FAIL,
            payload: "something went wrong"
        })
    }
}