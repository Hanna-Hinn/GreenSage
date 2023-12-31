import { combineReducers } from "redux";
import products from "./product";
import cart from "./cart";
import wishlist from "./wishlist";
import quickView from "./quickView";
import authReducer from "./auth";
import productFilters from "./productFilters";

const rootReducer = combineReducers({
  products,
  cart,
  wishlist,
  quickView,
  authReducer,
  productFilters,
});

export default rootReducer;
