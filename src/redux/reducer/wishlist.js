/* eslint-disable import/no-anonymous-default-export */
import * as Types from "../constants/actionTypes";

const initialState = {
  modal: false,
  items: [],
};

export default (state = initialState, action) => {
  // let index = null;

  switch (action.type) {
    case Types.INIT_LOCALSTORAGE:
      return [...action.payload.wishlist];

    case Types.ADD_TO_WISHLIST:
      return action.payload;

    case Types.DELETE_FROM_WISHLIST:
      return action.payload;

    case Types.CLEAR_WISHLIST:
      return {
        ...state,
        items: [],
      };
    case Types.ERROR_ADD_TO_WISHLIST:
      return [...state];

    default:
      return state;
  }
};
