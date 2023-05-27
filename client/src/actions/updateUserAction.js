import {
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS
} from "../constants/actionTypes";
import axios from "axios";

export const UpdateNotifier = (formData) => async (dispatch) => {
    try {



        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const { data } = await axios.post(
            "http://localhost:5000/updateUser",
            formData ,
            config
        ).then((data)=>{
            dispatch({ type: UPDATE_USER_SUCCESS, payload: data });    
        })
    }
    catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }

};
