import * as actionTypes from '../Constants/SettingsConstants'
import api from '../../Apis/api'

export const getSettings = () => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_SETTINGS_REQUEST})
        const {data} = await api.get('/settings/get/hidden')
        dispatch({
            type: actionTypes.GET_SETTINGS_SUCCESS,
            payload: data.data[0]
        })
    }catch(error){
        dispatch({
            type: actionTypes.GET_SETTINGS_FAIL,
            payload: "something went wrong"
        })
    }
}
