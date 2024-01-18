/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

export default function Invoice() {
  const { id } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    fetchData();
  }, [id]);

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
      <div class="invoice invoice-content invoice-1">
        <div class="back-top-home hover-up mt-30 ml-30">
          <a class="hover-up" href="/">
            <i class="fi-rs-home mr-5"></i> Homepage
          </a>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="invoice-inner">
                <div class="invoice-info" id="invoice_wrapper">
                  <div class="invoice-header">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="invoice-name">
                          <div class="logo">
                            <a href="/">
                              <img
                                src="/assets/imgs/theme/logo.svg"
                                alt="logo"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="invoice-numb">
                          <h6 class="text-end mb-10 mt-20">
                            Date: {order && formatDate(order.date)}
                          </h6>
                          <h6 class="text-end invoice-header-1">
                            Invoice No: #{order && order["_id"]}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="invoice-top">
                    <div class="row">
                      <div class="col-lg-9 col-md-6">
                        <div class="invoice-number">
                          <h4 class="invoice-title-1 mb-10">User Details</h4>
                          <p class="invoice-addr-1">
                            <strong>{order && order.userName}</strong> <br />
                            {/* {order && order.userEmail} <br />
                            {order && order.userMobile} */}
                            Alaa@example.com <br />
                            +112312312
                          </p>
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-6">
                        <div class="invoice-number">
                          <h4 class="invoice-title-1 mb-10">Address</h4>
                          <p class="invoice-addr-1">
                            {order && order.userAddress.street} <br />
                            {order &&
                              `${order.userAddress.city}, ${order.userAddress.postalCode}, ${order.userAddress.state}`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-2">
                      <div class="col-lg-9 col-md-6">
                        <h4 class="invoice-title-1 mb-10">Status:</h4>
                        <p class="invoice-from-1">
                          {order && order.shipmentStatus}
                        </p>
                      </div>
                      <div class="col-lg-3 col-md-6">
                        <h4 class="invoice-title-1 mb-10">Payment Method</h4>
                        <p class="invoice-from-1">
                          {order && order.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="invoice-center">
                    <div class="table-responsive">
                      <table class="table table-striped invoice-table">
                        <thead class="bg-active">
                          <tr>
                            <th>Item name</th>
                            <th class="text-center">Unit Price</th>
                            <th class="text-center">Quantity</th>
                            <th class="text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order &&
                            order.cartItems.map((item) => {
                              return (
                                <tr key={item["_id"]}>
                                  <td>
                                    <div class="item-desc-1">
                                      <span>
                                        {item.productName}
                                        Field Roast Chao Cheese Creamy Original
                                      </span>
                                      <small>{item.ownerName}</small>
                                    </div>
                                  </td>
                                  <td class="text-center">
                                    ${item.price["$numberDecimal"]}
                                  </td>
                                  <td class="text-center">{item.quantity}</td>
                                  <td class="text-right">
                                    ${item.itemTotalPrice}
                                  </td>
                                </tr>
                              );
                            })}

                          <tr>
                            <td colspan="3" class="text-end f-w-600">
                              SubTotal
                            </td>
                            <td class="text-right">
                              ${order && order.totalPrice}
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3" class="text-end f-w-600">
                              Delivery Fee
                            </td>
                            <td class="text-right">
                              ${order && order.deliveryFee}
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3" class="text-end f-w-600">
                              Grand Total
                            </td>
                            <td class="text-right f-w-600">
                              ${order && order.totalPrice + order.deliveryFee}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="invoice-bottom">
                    <div class="row">
                      <div class="col-sm-6">
                        <div>
                          <h3 class="invoice-title-1">Important Note</h3>
                          <ul class="important-notes-list-1">
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
                      <div class="col-sm-6 col-offsite">
                        <div class="text-end">
                          <p class="mb-0 text-13">
                            Thank you for your business
                          </p>
                          <p>
                            <strong>GreenSage</strong>
                          </p>
                          <div class="mobile-social-icon mt-50 print-hide">
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
                <div class="invoice-btn-section clearfix d-print-none">
                  <a
                    href="javascript:window.print()"
                    class="btn btn-lg btn-custom btn-print hover-up"
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
