import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGOUT,
} from "../constants/actionTypes";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { jwtDecode } from "jwt-decode";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const loginData = { email, password };
    const { data } = await axios.post(
      `${BACKEND_URL}/login`,
      loginData,
      config
    );
    const decodedToken = jwtDecode(data.data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: decodedToken,
    });

    localStorage.setItem(
      "userInfo",
      JSON.stringify(decodedToken),
      decodedToken.exp
    );
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});
