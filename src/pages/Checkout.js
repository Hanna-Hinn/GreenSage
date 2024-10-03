import { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { clearCart, decreaseQuantity, deleteFromCart, increaseQuantity } from "../redux/action/cart";
import { PaymentElement } from "@stripe/react-stripe-js";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useStripe, useElements } from "@stripe/react-stripe-js";

const Cart = ({ cartItems }) => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;
  const shippingCost = 10;
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!userInfo) {
      navigate("/page-login");
    }
  }, [userInfo]);

  const price = () => {
    let price = 0;
    cartItems.forEach((item) => (price += item.price["$numberDecimal"] * item.quantity));

    return parseFloat((price + shippingCost).toFixed(2));
  };

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);
    const { data: orderData } = await axios.post(`${BACKEND_URL}/orders/${userInfo.id}`, { shipmentStatus: "pending" });

    const orderId = orderData.data["_id"];

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orders/${orderId}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <>
      <Layout parent="Home" sub="Shop" subChild="Checkout">
        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mb-40">
                <h1 className="heading-2 mb-10">Checkout</h1>
                <div className="d-flex justify-content-between">
                  <h6 className="text-body">Carefully check the information before checkout</h6>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-7">
                <div className="mb-25">
                  <h4>Billing Details</h4>
                </div>
                <form id="payment-form" onSubmit={handleSubmit}>
                  <PaymentElement id="payment-element" />
                  <button type="submit" className="btn btn-fill-out btn-block mt-30">
                    <span id="button-text">{isProcessing ? "Processing ... " : "Pay now"}</span>
                  </button>

                  {message && <div id="payment-message">{message}</div>}
                </form>
              </div>
              <div className="col-lg-5">
                <div className="border p-40 cart-totals ml-30 mb-50">
                  <div className="d-flex align-items-end justify-content-between mb-30">
                    <h4>Your Order</h4>
                    <h6 className="text-muted">Subtotal</h6>
                  </div>
                  <div className="divider-2 mb-30"></div>
                  <div className="table-responsive order_table">
                    {cartItems.length <= 0 && "No Products"}
                    <table className={cartItems.length > 0 ? "table no-border" : "d-none"}>
                      <tbody>
                        {cartItems.map((item, i) => (
                          <tr key={i}>
                            <td className="image product-thumbnail">
                              <img src={item.productImage} alt={item.productName} />
                            </td>
                            <td>
                              <h6 className="w-160 mb-5">
                                <a href={`/products/${item.productId}`}>{item.productName}</a>
                                <div className="product-rate-cover">
                                  {[...Array(5)].map((star, index) => {
                                    const currentRating = index + 1;

                                    return (
                                      <span
                                        key={index}
                                        style={{
                                          color:
                                            currentRating <= Math.round(item.averageRating) ? "#ffc107" : "#e4e5e9",
                                          fontSize: "1rem",
                                          margin: "1px",
                                        }}
                                      >
                                        &#9733;
                                      </span>
                                    );
                                  })}
                                  <span className="font-small ml-5 text-muted">
                                    {" "}
                                    ({Math.round(item.averageRating * 10) / 10})
                                  </span>
                                </div>
                              </h6>{" "}
                            </td>
                            <td>
                              <h6 className="text-muted pl-20 pr-20">x {item.quantity}</h6>
                            </td>
                            <td>
                              <h4 className="text-brand">${item.quantity * item.price["$numberDecimal"]}</h4>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mb-30">
                    <h4>Total Price</h4>
                    <h4 className="text-brand">${price()}</h4>
                  </div>

                  <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                  <div className="payment_method">
                    <div className="payment_option" style={{ marginBottom: "30px" }}>
                      <div className="payment-logo d-flex">
                        <img className="mr-15" src="assets/imgs/theme/icons/payment-paypal.svg" alt="paypal" />
                        <img className="mr-15" src="assets/imgs/theme/icons/payment-visa.svg" alt="visa" />
                        <img className="mr-15" src="assets/imgs/theme/icons/payment-master.svg" alt="masterCard" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart,
  activeCart: state.counter,
});

const mapDispatchToProps = {
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
  clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
