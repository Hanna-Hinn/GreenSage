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
import Home from "./pages/Home";
import About from "./pages/About";
import VendorList from "./pages/VendorList";
import Contact from "./pages/Contact";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import SingleProductPage from "./pages/SingleProductPage";

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
                <Route path="/vendors-list" element={<VendorList />} />
                <Route path="/page-contact" element={<Contact />} />
                <Route path="/shop-wishlist" element={<WishList />} />
                <Route path="/shop-cart" element={<Cart />} />
                <Route path="/products" element={<Products />} />
                <Route
                  path="/products/:slug"
                  element={<SingleProductPage />}
                />
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
