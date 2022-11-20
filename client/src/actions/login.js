import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
  } from "../constants/actionTypes";
import axios from "axios";  

export const login = (email, password) => async (dispatch) => {
    try {
      // dispatch({ type: USER_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:5000/login",
        { email, password },
        config
      );
  console.log(data)

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem('profile', JSON.stringify({ data }));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // export const logout = () => async (dispatch) => {
  //   console.log('aa')
  //   localStorage.clear('profile');
  //   dispatch({ type: USER_LOGOUT });
  // };
