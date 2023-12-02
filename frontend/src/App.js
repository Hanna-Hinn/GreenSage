import { useEffect, useState } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import "swiper/css";
import "swiper/css/navigation";
import StorageWrapper from "./components/ecommerce/storage-wrapper";
// import "./public/assets/css/main.css";
import store from "./redux/store";
import Preloader from "./components/elements/Preloader";
import Home from "./pages/Home";

function App() {
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);
  return (
    <>
      <Provider store={store}>
        {/* <StorageWrapper> */}
          <Home />
          {/* <ToastContainer /> */}
        {/* </StorageWrapper> */}
      </Provider>
    </>
  );
}

export default App;
