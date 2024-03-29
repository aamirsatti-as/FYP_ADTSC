import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    if(data.token){
      dispatch({ type: AUTH, data });
      navigate('/admin');  
    }
    if(!data.token){
      window.alert('result.message');
    }
  } catch (error) {
   
  }
};

export const changePassword = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(formData);

    // dispatch({ type: AUTH, data });
    navigate('/admin');
  } catch (error) {
  }
};