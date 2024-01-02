import { useEffect, useState } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import "swiper/css";
import "swiper/css/navigation";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import StorageWrapper from "./components/ecommerce/storage-wrapper";
import store from "./redux/store";
import Preloader from "./components/elements/Preloader";
import Home from "./pages/Home";
import About from "./pages/About";
import VendorList from "./pages/VendorList";
import Contact from "./pages/Contact";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import SingleProductPage from "./pages/SingleProductPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import ForgotPassword from "./pages/ForgotPassword";
import Account from "./pages/Account";
import SingleVendor from "./pages/SingleVendor";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
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
                <Route path="/shop-cart" element={<Cart />} />
                <Route path="/shop-checkout" element={<Checkout />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<SingleProductPage />} />
                <Route path="/page-register" element={<Register />} />
                <Route path="/page-login" element={<Login />} />
                <Route
                  path="/page-forgot-password"
                  element={<ForgotPassword />}
                />
                <Route path="/page-account" element={<Account />} />
                <Route path="/page-invoice" element={<Invoice />} />

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
