import * as actionTypes from '../Constants/BlogConstants'
import api from '../../Apis/api'

export const getBlogs = (sortBy, skipNumber, limitNumber) => async(dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_BLOG_REQUEST})
        
        const {data} = await api.post('blog/get', {sortBy, skipNumber, limitNumber})
        dispatch({
            type: actionTypes.GET_BLOG_SUCCESS,
            payload: data.data
        })
    }catch(error){
        dispatch({
            type: actionTypes.GET_BLOG_FAIL,
            payload: "something went wrong"
        })
    }
}
