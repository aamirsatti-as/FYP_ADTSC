import * as actionType from '../constants/actionTypes';
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
  

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true };
      case USER_LOGIN_SUCCESS:
        return { loading: true, userInfo: action.payload };
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  };

// const authReducer = (state = { authData: null }, action) => {
//   switch (action.type) {
//     case actionType.AUTH:
//       localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

//       return { ...state, authData: action.data, loading: false, errors: null };
//     case actionType.LOGOUT:
//       localStorage.clear();

//       return { ...state, authData: null, loading: false, errors: null };
//     default:
//       return state;
//   }
// };

// export default authReducer;
