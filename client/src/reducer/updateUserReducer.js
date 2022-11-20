import * as actionType from '../constants/actionTypes';
import {
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,

  } from "../constants/actionTypes";
  

export const UpdateUserReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_USER_SUCCESS:
        return { loading: true, userInfo: action.payload };
      case UPDATE_USER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };