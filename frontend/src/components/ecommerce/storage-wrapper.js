import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as Types from "../../redux/constants/actionTypes";
import storage from "../../util/localStorage";

const saveStoredItems = (storedItems) => (dispatch) => {
  dispatch({
    type: Types.INIT_LOCALSTORAGE,
    payload: { ...storedItems },
  });
};

const StorageWrapper = (props) => {
  useEffect(() => {
    const cart = storage.get("dokani_cart") || [];
    const wishlist = storage.get("dokani_wishlist") || [];

    props.saveStoredItems({ cart, wishlist });
  }, []);

  return <>{props.children}</>;
};

export default connect(null, { saveStoredItems })(StorageWrapper);
