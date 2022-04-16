import * as actionTypes from '../Constants/PageConstants'
import api from '../../Apis/api'

export const getPage = (url) => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_PAGE_REQUEST})
        let URL = 'page/url/'+url
        const {data} = await api.get(URL)
        dispatch({
            type: actionTypes.GET_PAGE_SUCCESS,
            payload: data.data
        })
    }catch(error){
        dispatch({
            type: actionTypes.GET_PAGE_FAIL,
            payload: "something went wrong"
        })
    }
}
