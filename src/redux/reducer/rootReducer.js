import { combineReducers } from "redux";
import products from "./product";
import cart from "./cart";
import wishlist from "./wishlist";
import auth from "./auth";
import productFilters from "./productFilters";

const rootReducer = combineReducers({
  products,
  cart,
  wishlist,
  auth,
  productFilters,
});

export default rootReducer;
