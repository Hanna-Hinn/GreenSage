import { useState } from "react";
import { connect } from "react-redux";
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
  const [orderID, setOrderID] = useState(1);
  const navigate = useNavigate();

  const price = () => {
    let price = 0;
    cartItems.forEach((item) => (price += item.price * item.quantity));

    return price;
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
                <div className="row mb-50">
                  <div className="col-lg-6 mb-sm-15 mb-lg-0 mb-md-3">
                    <div className="toggle_info">
                      <span>
                        <i className="fi-rs-user mr-10"></i>
                        <span className="text-muted font-lg">
                          Already have an account?
                        </span>{" "}
                        <a
                          href="#loginform"
                          data-bs-toggle="collapse"
                          className="collapsed font-lg"
                          aria-expanded="false"
                        >
                          Click here to login
                        </a>
                      </span>
                    </div>
                    <div
                      className="panel-collapse collapse login_form"
                      id="loginform"
                    >
                      <div className="panel-body">
                        <p className="mb-30 font-sm">
                          If you have shopped with us before, please enter your
                          details below. If you are a new customer, please
                          proceed to the Billing &amp; Shipping section.
                        </p>
                        <form method="post">
                          <div className="form-group">
                            <input
                              type="text"
                              name="email"
                              placeholder="Username Or Email"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              name="password"
                              placeholder="Password"
                            />
                          </div>
                          <div className="login_footer form-group">
                            <div className="chek-form">
                              <div className="custome-checkbox">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="checkbox"
                                  id="remember"
                                  value=""
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="remember"
                                >
                                  <span>Remember me</span>
                                </label>
                              </div>
                            </div>
                            <a href="/page-forgot-password">Forgot password?</a>
                          </div>
                          <div className="form-group">
                            <button className="btn btn-md" name="login">
                              Log in
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <form method="post" className="apply-coupon">
                      <input type="text" placeholder="Enter Coupon Code..." />
                      <button className="btn  btn-md" name="login">
                        Apply Coupon
                      </button>
                    </form>
                  </div>
                </div>
                <div className="mb-25">
                  <h4>Billing Details</h4>
                </div>
                <form method="post">
                  <div className="form-group">
                    <input
                      type="text"
                      required=""
                      name="fname"
                      placeholder="First name *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      required=""
                      name="lname"
                      placeholder="Last name *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required=""
                      type="text"
                      name="cname"
                      placeholder="Company Name"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="billing_address"
                      required=""
                      placeholder="Address *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="billing_address2"
                      required=""
                      placeholder="Address line2"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required=""
                      type="text"
                      name="city"
                      placeholder="City / Town *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required=""
                      type="text"
                      name="state"
                      placeholder="State / County *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required=""
                      type="text"
                      name="zipcode"
                      placeholder="Postcode / ZIP *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required=""
                      type="text"
                      name="phone"
                      placeholder="Phone *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required=""
                      type="text"
                      name="email"
                      placeholder="Email address *"
                    />
                  </div>
                  <div
                    id="collapsePassword"
                    className="form-group create-account collapse in"
                  >
                    <input
                      required=""
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                  </div>
                  <div className="form-group">
                    <div className="checkbox">
                      <div className="custome-checkbox">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="checkbox"
                          id="createaccount"
                        />
                        <label
                          className="form-check-label label_info"
                          data-bs-toggle="collapse"
                          href="#collapsePassword"
                          data-target="#collapsePassword"
                          aria-controls="collapsePassword"
                          htmlFor="createaccount"
                        >
                          <span>Create an account?</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="ship_detail">
                    <div className="form-group">
                      <div className="chek-form">
                        <div className="custome-checkbox">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="checkbox"
                            id="differentaddress"
                          />
                          <label
                            className="form-check-label label_info"
                            data-bs-toggle="collapse"
                            data-target="#collapseAddress"
                            href="#collapseAddress"
                            aria-controls="collapseAddress"
                            htmlFor="differentaddress"
                          >
                            <span>Ship to a different address?</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div
                      id="collapseAddress"
                      className="different_address collapse in"
                    >
                      <div className="form-group">
                        <input
                          type="text"
                          required=""
                          name="fname"
                          placeholder="First name *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          required=""
                          name="lname"
                          placeholder="Last name *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="cname"
                          placeholder="Company Name"
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          name="billing_address"
                          required=""
                          placeholder="Address *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="billing_address2"
                          required=""
                          placeholder="Address line2"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="city"
                          placeholder="City / Town *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="state"
                          placeholder="State / County *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="zipcode"
                          placeholder="Postcode / ZIP *"
                        />
                      </div>
                    </div>
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
                              <img src={item.images[0].img} alt="#" />
                            </td>
                            <td>
                              <h6 className="w-160 mb-5">
                                <a>{item.title}</a>
                                <div className="product-rate-cover">
                                  <div className="product-rate d-inline-block">
                                    <div
                                      className="product-rating"
                                      style={{
                                        width: "90%",
                                      }}
                                    ></div>
                                  </div>
                                  <span className="font-small ml-5 text-muted">
                                    {" "}
                                    (4.0)
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
                                ${item.quantity * item.price}
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
                        <div
                          className="form-group collapse in"
                          id="bankTranfer"
                        >
                          <p className="text-muted mt-5">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered
                            alteration.{" "}
                          </p>
                        </div>
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
                          Check Payment
                        </label>
                        <div
                          className="form-group collapse in"
                          id="checkPayment"
                        >
                          <p className="text-muted mt-5">
                            Please send your cheque to Store Name, Store Street,
                            Store Town, Store State / County, Store Postcode.{" "}
                          </p>
                        </div>
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
                      <div class="payment-logo d-flex">
                        <img
                          class="mr-15"
                          src="assets/imgs/theme/icons/payment-paypal.svg"
                          alt=""
                        />
                        <img
                          class="mr-15"
                          src="assets/imgs/theme/icons/payment-visa.svg"
                          alt=""
                        />
                        <img
                          class="mr-15"
                          src="assets/imgs/theme/icons/payment-master.svg"
                          alt=""
                        />
                        <img
                          src="assets/imgs/theme/icons/payment-zapper.svg"
                          alt=""
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
