import { useEffect, useState } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import "swiper/css";
import "swiper/css/navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import StorageWrapper from "./components/ecommerce/storage-wrapper";
import store from "./redux/store";
import Preloader from "./components/elements/Preloader";
import {
  Home,
  About,
  VendorList,
  Contact,
  WishList,
  Cart,
  Products,
  SingleProductPage,
  Register,
  Login,
  PageNotFound,
  Account,
  SingleVendor,
  Invoice,
  AddAddress,
  AddProduct,
  Notification,
  Checkout,
} from "./pages/index";
import Payment from "./pages/Payment";

function App() {
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <>
      {!loading ? (
        <Provider store={store}>
          <StorageWrapper>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/page-about" element={<About />} />

                <Route path="/page-contact" element={<Contact />} />
                <Route path="/shop-wishlist" element={<WishList />} />
                <Route path="//shop-notification" element={<Notification />} />
                <Route path="/shop-cart" element={<Cart />} />
                <Route path="/shop-checkout" element={<Payment />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<SingleProductPage />} />
                <Route path="/page-register" element={<Register />} />
                <Route path="/page-login" element={<Login />} />
                <Route path="/page-account" element={<Account />} />
                <Route path="/add-address" element={<AddAddress />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/orders/:id" element={<Invoice />} />

                <Route path="/vendors-list" element={<VendorList />} />
                <Route
                  path="/vendors-list/vendor/:id"
                  element={<SingleVendor />}
                />

                <Route path="*" element={<PageNotFound />} />
              </Routes>
              <ToastContainer />
            </BrowserRouter>
          </StorageWrapper>
        </Provider>
      ) : (
        <Preloader />
      )}
    </>
  );
}

export default App;
