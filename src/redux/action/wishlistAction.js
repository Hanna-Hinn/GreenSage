import * as Types from "../constants/actionTypes";
import axios from "axios";
import { BACKEND_URL } from "../../config/index";
import storage from "../../util/localStorage";

export const addToWishlist = (product) => (dispatch) => {
  const user = storage.get("userInfo");
  if (user) {
    axios
      .post(`${BACKEND_URL}/favorites/${user.id}/items/${product["_id"]}`)
      .then(async () => {
        const { data: wishListData } = await axios.get(`${BACKEND_URL}/favorites/${user.id}`);

        const items = wishListData.data.items;

        dispatch({
          type: Types.ADD_TO_WISHLIST,
          payload: items,
        });
      })
      .catch((e) => {
        console.log(e);
        if (!e.response.data.success) {
          dispatch({
            type: Types.ERROR_ADD_TO_WISHLIST,
            payload: { exists: true },
          });
        }
      });
  } else {
    dispatch({
      type: Types.ADD_TO_WISHLIST,
      error: "User Not Logged In!",
    });
  }
};

export const deleteFromWishlist = (productId) => (dispatch) => {
  const user = storage.get("userInfo");
  if (user) {
    axios
      .delete(`${BACKEND_URL}/favorites/${user.id}/items/${productId}`)
      .then(async () => {
        const { data: wishListData } = await axios.get(`${BACKEND_URL}/favorites/${user.id}`);
        const items = wishListData.data.items;

        dispatch({
          type: Types.DELETE_FROM_WISHLIST,
          payload: items,
        });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: Types.DELETE_FROM_WISHLIST, error: e });
      });
  } else {
    dispatch({
      type: Types.DELETE_FROM_WISHLIST,
      error: "User Not Logged In!",
    });
  }
};

export const clearWishlist = () => (dispatch) => {
  const user = storage.get("userInfo");
  if (user) {
    axios
      .delete(`${BACKEND_URL}/favorites/${user.id}`)
      .then(async () => {
        await axios.get(`${BACKEND_URL}/favorites/${user.id}`);
        dispatch({
          type: Types.CLEAR_WISHLIST,
        });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: Types.CLEAR_WISHLIST, error: e });
      });
  } else {
    dispatch({
      type: Types.CLEAR_WISHLIST,
      error: "User Not Logged In!",
    });
  }
};
