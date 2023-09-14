import * as AT from "./userTypes";

const initialState = {
    isLoggedIn: "",
    userEmail:"",
    users: [],
    error: "",
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case AT.USER_REQUEST:
      case AT.LOGOUT_REQUEST:
        return {
          ...state,
      };
      case AT.USER_SUCCESS:
      case AT.USER_FAILURE:
        return {
          isLoggedIn: action.payload[0],
          userEmail: action.payload[1]
        };
      case AT.USER_SAVED_SUCCESS:
        return {
          message: action.payload,
          error: "",
        };
      default:
        return state;
    }
  };
  
  export default reducer;