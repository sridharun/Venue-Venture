import * as AT from "./userTypes";
import axios from 'axios';
export const registerUser = (userObject) => async (dispatch) => {
  dispatch({
    type: AT.USER_REQUEST,
  });
  try {
    const response = await axios.post('http://localhost:8081/user/register', userObject);
    dispatch(userSavedSuccess(response.data));
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(userFailure(error.message));
    return Promise.reject(error);
  }
};
export const authenticateUser = (email, password)  => async (dispatch)=>{
  const credentials = {
    email:email,
    password:password
  };
  dispatch( {
    type: AT.USER_REQUEST
  });
  try {
    const response = await axios.post('http://localhost:8081/user/authenticate',credentials);
    localStorage.setItem("jwtToken", response.data.token);
    dispatch(success(true,credentials.email));
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(failure());
    return Promise.reject(error);
  }

  /* return dispatch=>{
      
      axios.post('http://localhost:8081/user/authenticate',credentials)
        .then(response=>{
          
          dispatch(success(true,credentials.email));
          localStorage.setItem("jwtToken", response.data.token);
        })
        .catch(error=>{
          dispatch(failure());
        });
  }; */
};
export const logoutUser=()=>{
  return dispatch=>{
    dispatch({
      type: AT.LOGOUT_REQUEST
    });
    localStorage.removeItem("jwtToken");
    dispatch(success(false,"vk"));
  };
};
export const keepUserLoggedin=(email)=>{
  return dispatch=>{
    console.log("dispatch");
    dispatch( {
      type: AT.USER_REQUEST
    });
    dispatch(success(true,email));
  };
};
const success = (isLoggedIn,email) => {
    return {
      type: AT.USER_SUCCESS,
      payload: [isLoggedIn,email],
    };
};
const userSavedSuccess = (user) => {
  return {
    type: AT.USER_SAVED_SUCCESS,
    payload: user,
  };
};
const failure = () => {
  return {
    type: AT.USER_FAILURE,
    payload: [false,"vk"],
  };
};
const userFailure = (error) => {
  return {
    type: AT.USER_FAILURE,
    payload: [false,"vk"],
  };
};