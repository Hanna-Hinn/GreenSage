import { useEffect } from "react";
import { connect } from "react-redux";
import * as Types from "../../redux/constants/actionTypes";
import storage from "../../util/localStorage";
import axios from "axios";
import { BACKEND_URL } from "../../config/index";

const saveStoredItems = (storedItems) => (dispatch) => {
  dispatch({
    type: Types.INIT_LOCALSTORAGE,
    payload: { ...storedItems },
  });
};

const StorageWrapper = (props) => {
  const userInfo = storage.get("userInfo") || {};
  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo) {
        props.saveStoredItems({
          cart: [],
          wishlist: [],
          userInfo,
        });
      } else {
        try {
          const { data: cartData } = await axios.get(
            `${BACKEND_URL}/carts/${userInfo.id}`
          );
          const { data: wishListData } = await axios.get(
            `${BACKEND_URL}/favorites/${userInfo.id}`
          );

          props.saveStoredItems({
            cart: cartData.data.cartItems,
            wishlist: wishListData.data.items,
            userInfo,
          });
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    };

    fetchData();
  }, [userInfo]);

  return <>{props.children}</>;
};

export default connect(null, { saveStoredItems })(StorageWrapper);
