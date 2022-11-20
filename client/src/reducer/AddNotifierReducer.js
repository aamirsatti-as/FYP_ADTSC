import * as actionType from '../constants/actionTypes';
import {
    ADD_NOTIFIER_FAIL,
    ADD_NOTIFIER_SUCCESS,
    UPDATE_NOTIFIER_FAIL,
    UPDATE_NOTIFIER_SUCCESS

  } from "../constants/actionTypes";
  

export const AddNotifierReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_NOTIFIER_SUCCESS:
        return { loading: true, userInfo: action.payload };
      case ADD_NOTIFIER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const UpdateNotifierReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_NOTIFIER_SUCCESS:
        return { loading: true, userInfo: action.payload };
      case UPDATE_NOTIFIER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
