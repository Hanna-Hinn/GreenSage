/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function Invoice() {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/page-login");
    } else {
      fetchData();
    }
  }, [id, userInfo]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/orders/${id}/order`);
      setOrder(data.data);
    } catch (e) {
      toast("Something Went Wrong !");
    }
  };

  const formatDate = (orderDate) => {
    const date = new Date(orderDate);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
    return formattedDate;
  };

  return (
    <>
      <div className="invoice invoice-content invoice-1">
        <div className="back-top-home hover-up mt-30 ml-30">
          <a className="hover-up" href="/">
            <i className="fi-rs-home mr-5"></i> Homepage
          </a>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="invoice-inner">
                <div className="invoice-info" id="invoice_wrapper">
                  <div className="invoice-header">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="invoice-name">
                          <div className="logo">
                            <a href="/">
                              <img
                                src="/assets/imgs/theme/logo.svg"
                                alt="logo"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="invoice-numb">
                          <h6 className="text-end mb-10 mt-20">
                            Date: {order && formatDate(order.date)}
                          </h6>
                          <h6 className="text-end invoice-header-1">
                            Order No: #{order && order["_id"]}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="invoice-top">
                    <div className="row">
                      <div className="col-lg-9 col-md-6">
                        <div className="invoice-number">
                          <h4 className="invoice-title-1 mb-10">
                            User Details
                          </h4>
                          <p className="invoice-addr-1">
                            <strong>{order && order.userName}</strong> <br />
                            {/* {order && order.userEmail} <br />
                            {order && order.userMobile} */}
                            {order && order.userEmail} <br />
                            {order && order.userMobile}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6">
                        <div className="invoice-number">
                          <h4 className="invoice-title-1 mb-10">Address</h4>
                          <p className="invoice-addr-1">
                            {order && order.userAddress.street} <br />
                            {order &&
                              `${order.userAddress.city}, ${order.userAddress.postalCode}, ${order.userAddress.state}`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-lg-9 col-md-6">
                        <h4 className="invoice-title-1 mb-10">Status:</h4>
                        <p className="invoice-from-1">
                          {order && order.shipmentStatus}
                        </p>
                      </div>
                      <div className="col-lg-3 col-md-6">
                        <h4 className="invoice-title-1 mb-10">
                          Payment Method
                        </h4>
                        <p className="invoice-from-1">Bank Card</p>
                      </div>
                    </div>
                  </div>
                  <div className="invoice-center">
                    <div className="table-responsive">
                      <table className="table table-striped invoice-table">
                        <thead className="bg-active">
                          <tr>
                            <th>Item name</th>
                            <th className="text-center">Unit Price</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order &&
                            order.cartItems.map((item) => {
                              return (
                                <tr key={item["_id"]}>
                                  <td>
                                    <div className="item-desc-1">
                                      <span>{item.productName}</span>
                                      <small>{item.ownerName}</small>
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    ${item.price["$numberDecimal"]}
                                  </td>
                                  <td className="text-center">
                                    {item.quantity}
                                  </td>
                                  <td className="text-right">
                                    ${item.itemTotalPrice}
                                  </td>
                                </tr>
                              );
                            })}

                          <tr>
                            <td colSpan="3" className="text-end f-w-600">
                              SubTotal
                            </td>
                            <td className="text-right">
                              ${order && order.totalPrice}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-end f-w-600">
                              Delivery Fee
                            </td>
                            <td className="text-right">
                              ${order && order.deliveryFee}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-end f-w-600">
                              Grand Total
                            </td>
                            <td className="text-right f-w-600">
                              ${order && order.totalPrice + order.deliveryFee}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="invoice-bottom">
                    <div className="row">
                      <div className="col-sm-6">
                        <div>
                          <h3 className="invoice-title-1">Important Note</h3>
                          <ul className="important-notes-list-1">
                            <li>
                              All amounts shown on this page are in US dollars
                            </li>
                            <li>
                              finance charge of 1.5% will be made on unpaid
                              balances after 30 days.
                            </li>
                            <li>Once order done, money can't refund</li>
                            <li>
                              Delivery might delay due to some external
                              dependency
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-sm-6 col-offsite">
                        <div className="text-end">
                          <p className="mb-0 text-13">
                            Thank you for your business
                          </p>
                          <p>
                            <strong>GreenSage</strong>
                          </p>
                          <div className="mobile-social-icon mt-50 print-hide">
                            <h6>Follow Us</h6>
                            <a href="https://www.facebook.com">
                              <img
                                src="/assets/imgs/theme/icons/icon-facebook-white.svg"
                                alt="facebook icon"
                              />
                            </a>
                            <a href="https://www.twitter.com">
                              <img
                                src="/assets/imgs/theme/icons/icon-twitter-white.svg"
                                alt="twitter icon"
                              />
                            </a>
                            <a href="https://www.instagram.com">
                              <img
                                src="/assets/imgs/theme/icons/icon-instagram-white.svg"
                                alt="instagram icon"
                              />
                            </a>
                            <a href="https://www.pinterest.com/">
                              <img
                                src="/assets/imgs/theme/icons/icon-pinterest-white.svg"
                                alt="pinterest icon"
                              />
                            </a>
                            <a href="https://www.youtube.com/">
                              <img
                                src="/assets/imgs/theme/icons/icon-youtube-white.svg"
                                alt="youtube icon"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="invoice-btn-section clearfix d-print-none">
                  <a
                    href="javascript:window.print()"
                    className="btn btn-lg btn-custom btn-print hover-up"
                  >
                    {" "}
                    <img
                      src="assets/imgs/theme/icons/icon-print.svg"
                      alt=""
                    />{" "}
                    Print{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
