import storage from "../../util/localStorage";
import * as Types from "../constants/actionTypes";
import axios from "axios";
import { BACKEND_URL } from "../../config/index";

export const addToCart =
  (product, quantity = 1) =>
  (dispatch) => {
    const user = storage.get("userInfo");
    if (user) {
      let url;
      if (product.productId) {
        url = `${BACKEND_URL}/carts/${user.id}/items/${product.productId}`;
      } else {
        url = `${BACKEND_URL}/carts/${user.id}/items/${product["_id"]}`;
      }
      axios
        .post(url, {
          quantity,
        })
        .then(async ({ data }) => {
          const { data: cartData } = await axios.get(
            `${BACKEND_URL}/carts/${user.id}`
          );
          const cartItems = cartData.data.cartItems;

          dispatch({
            type: Types.ADD_TO_CART,
            payload: cartItems,
          });
        })
        .catch((e) => {
          console.log(e);
          dispatch({ type: Types.ADD_TO_CART, error: e });
        });
    } else {
      dispatch({
        type: Types.ADD_TO_CART,
        error: "User Not Logged In!",
      });
    }
  };

export const deleteFromCart = (productId) => (dispatch) => {
  const user = storage.get("userInfo");
  if (user) {
    axios
      .delete(`${BACKEND_URL}/carts/${user.id}/products/${productId}`)
      .then(async ({ data }) => {
        const { data: cartData } = await axios.get(
          `${BACKEND_URL}/carts/${user.id}`
        );
        const cartItems = cartData.data.cartItems;
        dispatch({
          type: Types.DELETE_FROM_CART,
          payload: cartItems,
        });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: Types.DELETE_FROM_CART, error: e });
      });
  } else {
    dispatch({
      type: Types.DELETE_FROM_CART,
      error: "User Not Logged In!",
    });
  }
  // dispatch({
  //   type: Types.DELETE_FROM_CART,
  //   payload: { productId },
  // });
};

export const increaseQuantity = (productId) => (dispatch) => {
  const user = storage.get("userInfo");
  if (user) {
    axios
      .post(`${BACKEND_URL}/carts/${user.id}/items/${productId}`, {
        quantity: 1,
      })
      .then(async ({ data }) => {
        console.log(data);
        const { data: cartData } = await axios.get(
          `${BACKEND_URL}/carts/${user.id}`
        );
        const cartItems = cartData.data.cartItems;

        dispatch({
          type: Types.INCREASE_QUANTITY,
          payload: cartItems,
        });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: Types.INCREASE_QUANTITY, error: e });
      });
  } else {
    dispatch({
      type: Types.INCREASE_QUANTITY,
      error: "User Not Logged In!",
    });
  }
  // dispatch({
  //   type: Types.INCREASE_QUANTITY,
  //   payload: { productId },
  // });
};

export const decreaseQuantity = (productId) => (dispatch) => {
  const user = storage.get("userInfo");
  if (user) {
    axios
      .delete(`${BACKEND_URL}/carts/${user.id}/items/${productId}`)
      .then(async ({ data }) => {
        const { data: cartData } = await axios.get(
          `${BACKEND_URL}/carts/${user.id}`
        );
        const cartItems = cartData.data.cartItems;

        dispatch({
          type: Types.DECREASE_QUANTITY,
          payload: cartItems,
        });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: Types.DECREASE_QUANTITY, error: e });
      });
  } else {
    dispatch({
      type: Types.DECREASE_QUANTITY,
      error: "User Not Logged In!",
    });
  }
  // dispatch({
  //   type: Types.DECREASE_QUANTITY,
  //   payload: { productId },
  // });
};

export const clearCart = () => (dispatch) => {
  const user = storage.get("userInfo");
  if (user) {
    axios
      .delete(`${BACKEND_URL}/carts/${user.id}`)
      .then(async ({ data }) => {
        await axios.get(`${BACKEND_URL}/carts/${user.id}`);
        dispatch({
          type: Types.CLEAR_CART,
        });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: Types.CLEAR_CART, error: e });
      });
  } else {
    dispatch({
      type: Types.CLEAR_CART,
      error: "User Not Logged In!",
    });
  }
  // dispatch({
  //   type: Types.CLEAR_CART,
  // });
};
