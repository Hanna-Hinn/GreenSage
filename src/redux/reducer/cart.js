/* eslint-disable import/no-anonymous-default-export */
import * as Types from "../constants/actionTypes";

export default (state = [], action) => {

  switch (action.type) {
    case Types.INIT_LOCALSTORAGE:
      return [...action.payload.cart];

    case Types.ADD_TO_CART:
      return action.payload;

    case Types.DELETE_FROM_CART:
      return action.payload;

    case Types.INCREASE_QUANTITY:
      return action.payload;

    case Types.DECREASE_QUANTITY:
      return action.payload;

    case Types.CLEAR_CART:
      return [];

    default:
      return state;
  }
};
