import {
    ADD_NOTIFIER_FAIL,
    ADD_NOTIFIER_SUCCESS,
    UPDATE_NOTIFIER_FAIL,
    UPDATE_NOTIFIER_SUCCESS,
    UPDATE_USER_SUCCESS
} from "../constants/actionTypes";
import axios from "axios";
import * as actionTypes from '../constants/actionTypes'
import { CountUnpaired} from "../reducer/userRedux";

import { 
    AddNotifierReducer,
    UpdateNotifierReducer
}
from '../reducer/AddNotifierReducer'
export const AddNotifier = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };


        const UserName = formData.UserName, Email = formData.Email, FirstName = formData.FirstName, LastName = formData.LastName, Phone = formData.Phone;
        const { data } = await axios.post(
            "http://localhost:5000/addNotifier",
            formData ,
            config
        );
        // dispatch({ type: actionTypes.ADD_NOTIFIER_SUCCESS, payload: {
        //     Email:data.Email,
        //     isFetching:1
        // } });
        dispatch(CountUnpaired(data));
    }
    catch (error) {
        
          return dispatch({
            type: actionTypes.ADD_NOTIFIER_FAIL,
            payload:{error,isFetching:2}
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

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      payload: id,
    });
    // localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };
  