import { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import {
  clearCart,
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
} from "../redux/action/cart";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51ObC0HAxHg3ogfzdo6YqP0rSxPDRDno4gSmW5mrmWMoMkIVGpmXGNfLW4qVxK0LjtMj9UWlTohAnUdjtLseOacbf00E7nbSwK2"
);

const Cart = ({
  cartItems,
  activeCart,
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
  clearCart,
}) => {
  const [orderID, setOrderID] = useState("1");
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;
  const shippingCost = 10;
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!userInfo) {
      navigate("/page-login");
    }
  }, [userInfo]);

  const price = () => {
    let price = 0;
    cartItems.forEach(
      (item) => (price += item.price["$numberDecimal"] * item.quantity)
    );

    return parseFloat((price + shippingCost).toFixed(2));
  };

  const handlePlaceOrder = async (e) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/orders`,
        { ...formData, userId: userInfo.id }
      );

      if (data.clientSecret) {
        const { data: orderData } = await axios.post(
          `${BACKEND_URL}/orders/${userInfo.id}`,
          { shipmentStatus: "pending" }
        );

        if (orderData.success) {
          const orderId = orderData.data["_id"];
          navigate(`/orders/${orderId}`);
        }
      }
    } catch (e) {
      console.log(e);
      toast(e.message ? e.message : "Something Went Wrong !");
    }
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
                  <h6 className="text-body">
                    Carefully check the information before checkout
                  </h6>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-7">
                <div className="mb-25">
                  <h4>Billing Details</h4>
                </div>
                <form method="post" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <label for="fullName">Full Name:</label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      name="fullName"
                      placeholder="John M. Doe"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          fullName: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label for="email">Email:</label>
                    <input
                      id="email"
                      required
                      type="email"
                      name="email"
                      placeholder="john@exmaple.com"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label for="phone">Phone:</label>
                    <input
                      required
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="+1 (555) 555-1234"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        });
                      }}
                    />
                  </div>
                </form>
                <div className="form-group">
                  <label for="address">Enter Address:</label>
                  <input
                    id="street"
                    type="text"
                    required
                    name="street"
                    placeholder="Street..."
                    onChange={(e) => {
                      setFormData({
                        ...formData,

                        street: e.target.value,
                      });
                    }}
                  />
                  <input
                    id="postalCode"
                    type="text"
                    required
                    name="postalCode"
                    placeholder="postalCode..."
                    onChange={(e) => {
                      setFormData({
                        ...formData,

                        street: e.target.value,
                      });
                    }}
                  />
                  <input
                    id="city"
                    type="text"
                    required
                    name="city"
                    placeholder="City..."
                    onChange={(e) => {
                      setFormData({
                        ...formData,

                        ...formData.address,
                        city: e.target.value,
                      });
                    }}
                  />
                  <input
                    id="state"
                    type="text"
                    required
                    name="state"
                    placeholder="State..."
                    onChange={(e) => {
                      setFormData({
                        ...formData,

                        state: e.target.value,
                      });
                    }}
                  />
                  <input
                    id="country"
                    type="text"
                    required=""
                    name="country"
                    placeholder="Country..."
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        country: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="form-group mb-30">
                  <textarea rows="5" placeholder="Order notes"></textarea>
                </div>
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
                    <table
                      className={
                        cartItems.length > 0 ? "table no-border" : "d-none"
                      }
                    >
                      <tbody>
                        {cartItems.map((item, i) => (
                          <tr key={i}>
                            <td className="image product-thumbnail">
                              <img
                                src={item.productImage}
                                alt={item.productName}
                              />
                            </td>
                            <td>
                              <h6 className="w-160 mb-5">
                                <a href={`/products/${item.productId}`}>
                                  {item.productName}
                                </a>
                                <div className="product-rate-cover">
                                  {[...Array(5)].map((star, index) => {
                                    const currentRating = index + 1;

                                    return (
                                      <span
                                        key={index}
                                        style={{
                                          color:
                                            currentRating <=
                                            Math.round(item.averageRating)
                                              ? "#ffc107"
                                              : "#e4e5e9",
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
                              <h6 className="text-muted pl-20 pr-20">
                                x {item.quantity}
                              </h6>
                            </td>
                            <td>
                              <h4 className="text-brand">
                                ${item.quantity * item.price["$numberDecimal"]}
                              </h4>
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
                    <div className="mb-25">
                      <h5>Payment</h5>
                    </div>
                    <div
                      className="payment_option"
                      style={{ marginBottom: "30px" }}
                    >
                      <div className="payment-logo d-flex">
                        <img
                          className="mr-15"
                          src="assets/imgs/theme/icons/payment-paypal.svg"
                          alt="paypal"
                        />
                        <img
                          className="mr-15"
                          src="assets/imgs/theme/icons/payment-visa.svg"
                          alt="visa"
                        />
                        <img
                          className="mr-15"
                          src="assets/imgs/theme/icons/payment-master.svg"
                          alt="masterCard"
                        />
                      </div>
                    </div>
                    <Elements stripe={stripePromise}>
                      <CardElement />
                    </Elements>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="btn btn-fill-out btn-block mt-30"
                  >
                    Place Order
                  </button>
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
