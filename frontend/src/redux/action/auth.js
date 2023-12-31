import { REGISTER_SUCCESS, LOGIN_SUCCESS } from "../constants/actionTypes";

export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});
