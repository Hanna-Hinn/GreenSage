import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGOUT,
} from "../constants/actionTypes";
import storage from "../../util/localStorage";

const initialState = {
  userInfo: storage.get("userInfo") || null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        loading: false,
        login: true,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default user;
