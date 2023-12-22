import * as Types from "../constants/actionTypes";

export const addToCart = (product) => (dispatch) => {
  dispatch({
    type: Types.ADD_TO_CART,
    payload: { product },
  });
};

export const deleteFromCart = (productId) => (dispatch) => {
  dispatch({
    type: Types.DELETE_FROM_CART,
    payload: { productId },
  });
};

export const increaseQuantity = (productId) => (dispatch) => {
  dispatch({
    type: Types.INCREASE_QUANTITY,
    payload: { productId },
  });
};

export const decreaseQuantity = (productId) => (dispatch) => {
  dispatch({
    type: Types.DECREASE_QUANTITY,
    payload: { productId },
  });
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: Types.CLEAR_CART,
  });
};
