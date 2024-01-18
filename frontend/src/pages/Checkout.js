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
  const [addresses, setAddresses] = useState([
    { id: 1, name: "John Doe", address: "123 Main St, Cityville, State 12345" },
    {
      id: 2,
      name: "Jane Smith",
      address: "456 Oak St, Townsville, State 67890",
    },
    // Add more addresses as needed
  ]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddressSelection = (addressId) => {
    const selected = addresses.find((address) => address.id === addressId);
    setSelectedAddress(selected);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/page-login");
    }
    console.log(cartItems);
  }, [userInfo]);

  const price = () => {
    let price = 0;
    cartItems.forEach(
      (item) => (price += item.price["$numberDecimal"] * item.quantity)
    );

    return parseFloat((price + shippingCost).toFixed(2));
  };

  const handlePlaceOrder = (e) => {
    navigate("/page-invoice", { state: orderID });
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
                <form method="post">
                  <div className="form-group">
                    <label for="fullName">Full Name:</label>
                    <input
                      id="fullName"
                      type="text"
                      required=""
                      name="fullName"
                      placeholder="John M. Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label for="email">Email:</label>
                    <input
                      id="email"
                      required=""
                      type="email"
                      name="email"
                      placeholder="john@exmaple.com"
                    />
                  </div>

                  <div className="form-group">
                    <label for="phone">Phone:</label>
                    <input
                      required=""
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="+1 (555) 555-1234"
                    />
                  </div>

                  <div className="form-group">
                    <label for="address">Select Shipping Address:</label>
                  </div>

                  <div className="form-group">
                    <label for="address">Billing Address:</label>
                  </div>

                  <div className="form-group mb-30">
                    <textarea rows="5" placeholder="Order notes"></textarea>
                  </div>
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
                    <div className="payment_option">
                      <div className="custome-radio">
                        <input
                          className="form-check-input"
                          required=""
                          type="radio"
                          name="payment_option"
                          id="exampleRadios3"
                          defaultChecked={true}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleRadios3"
                          data-bs-toggle="collapse"
                          data-target="#bankTranfer"
                          aria-controls="bankTranfer"
                        >
                          Direct Bank Transfer
                        </label>
                      </div>
                      <div className="custome-radio">
                        <input
                          className="form-check-input"
                          required=""
                          type="radio"
                          name="payment_option"
                          id="exampleRadios4"
                          defaultChecked={true}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleRadios4"
                          data-bs-toggle="collapse"
                          data-target="#checkPayment"
                          aria-controls="checkPayment"
                        >
                          Cash
                        </label>
                      </div>
                      <div className="custome-radio">
                        <input
                          className="form-check-input"
                          required=""
                          type="radio"
                          name="payment_option"
                          id="exampleRadios5"
                          defaultChecked={true}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleRadios5"
                          data-bs-toggle="collapse"
                          data-target="#paypal"
                          aria-controls="paypal"
                        >
                          Paypal
                        </label>
                      </div>
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
