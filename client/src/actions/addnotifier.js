import {
    ADD_NOTIFIER_FAIL,
    ADD_NOTIFIER_SUCCESS,
    UPDATE_NOTIFIER_FAIL,
    UPDATE_NOTIFIER_SUCCESS,
    UPDATE_USER_SUCCESS
} from "../constants/actionTypes";
import axios from "axios";

export const AddNotifier = (formData) => async (dispatch) => {
    try {



        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        console.log(formData)

        const UserName = formData.UserName, Email = formData.Email, FirstName = formData.FirstName, LastName = formData.LastName, Phone = formData.Phone;
        console.log(UserName)
        const { data } = await axios.post(
            "http://localhost:5000/addNotifier",
            formData ,
            config
        );
        console.log(data)
        dispatch({ type: ADD_NOTIFIER_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: ADD_NOTIFIER_FAIL,
            payload:
                error
        });
    }

};

export const UpdateNotifier = (modalData,editId) => async (dispatch) => {
    try {

        const UserName=modalData.UserName
        const Phone=modalData.Phone
        const FirstName=modalData.FirstName
        const LastName=modalData.LastName
        const Email=modalData.Email
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        
        const {data}=await axios.put('http://localhost:5000/updateNotifier',{UserName,Email,Phone,FirstName,LastName,editId},config)
        
        console.log(data)

        dispatch({ type: UPDATE_NOTIFIER_SUCCESS, payload: data });

    }
    catch (error) {
        dispatch({
            type: UPDATE_NOTIFIER_FAIL,
            payload:
                error
        });
    }
}
