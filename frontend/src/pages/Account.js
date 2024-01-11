/* eslint-disable jsx-a11y/anchor-is-valid */
import Layout from "../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../redux/action/auth";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(1);
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;
  const token = localStorage.getItem("sageToken");
  const [user, setUser] = useState({});
  const [userOrders, setUserOrders] = useState([]);
  const [ownerProducts, setOwnerProducts] = useState([]);
  const [orderEdit, setOrderEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [orderStatus, setOrderStatus] = useState("pending");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (!userInfo) {
      navigate("/page-login");
    } else {
      fetchData();
    }
  }, [userInfo, refresh]);

  const fetchData = async () => {
    const { data: userData } = await axios.get(
      `${BACKEND_URL}/users/${userInfo.id}`
    );
    const { data: orderData } = await axios.get(
      userInfo.userType === "owner"
        ? `${BACKEND_URL}/owners/${userInfo.id}`
        : `${BACKEND_URL}/orders/${userInfo.id}`
    );

    if (userInfo.userType === "owner") {
      const { data: products } = await axios.get(
        `${BACKEND_URL}/products/v1/searchFilter/v1/query?ownerName=${userData.data.firstName} ${userData.data.lastName}&pageNumber=1`
      );
      setOwnerProducts(products.data.products);
    }

    setUser(userData.data);
    setUserOrders(
      userInfo.userType === "owner"
        ? orderData.data.matchingOrders
        : orderData.data
    );
  };

  const handleOnClick = (index) => {
    setActiveIndex(index);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const onStatusChangeHandler = (e) => {
    setOrderStatus("");
    setOrderStatus(e.target.value);
  };

  const handleOrderEdit = async (id) => {
    if (orderEdit) {
      try {
        await axios.put(
          `${BACKEND_URL}/orders/${id}`,
          {
            shipmentStatus: orderStatus,
            userId: userInfo.id,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { data: orderData } = await axios.get(
          `${BACKEND_URL}/owners/${userInfo.id}`
        );
        setUserOrders(orderData.data.matchingOrders);

        toast("Order Updated Successfully");
        setRefresh(!refresh);
      } catch (e) {
        console.log(e);
        toast(e.message ? e.message : "Something Went Wrong !");
      }
    }
    setOrderEdit(!orderEdit);
  };

  const addressDeleteHandler = async (addressId) => {
    try {
      const { data } = await axios.delete(
        `${BACKEND_URL}/addresses/${user["_id"]}/address/${addressId}`
      );
      if (data.success) {
        toast("Address Deleted Successfully !");
      } else {
        toast("Something Went Wrong !");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addAddressHandler = () => {
    navigate("/add-address");
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleOnDelete = async (productId) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      const { data } = await axios.delete(
        `${BACKEND_URL}/products/${productId}`,
        config
      );
      const { data: products } = await axios.get(
        `${BACKEND_URL}/products/v1/searchFilter/v1/query?ownerName=${user.firstName} ${user.lastName}&pageNumber=1`
      );
      setOwnerProducts(products.data.products);
      if (data.success) {
        toast("Product Deleted Successfully !");
        setRefresh(true);
      } else {
        toast("Something Went Wrong !");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="Account">
        <div className="page-content pt-150 pb-150">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 m-auto">
                <div className="row">
                  <div className="col-md-3">
                    <div className="dashboard-menu">
                      <ul className="nav flex-column" role="tablist">
                        <li className="nav-item">
                          <a
                            className={
                              activeIndex === 1 ? "nav-link active" : "nav-link"
                            }
                            onClick={() => handleOnClick(1)}
                          >
                            <i className="fi-rs-settings-sliders mr-10"></i>
                            Dashboard
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={
                              activeIndex === 2 ? "nav-link active" : "nav-link"
                            }
                            onClick={() => handleOnClick(2)}
                          >
                            <i className="fi-rs-shopping-bag mr-10"></i>Orders
                          </a>
                        </li>
                        {userInfo && userInfo.userType === "owner" && (
                          <li className="nav-item">
                            <a
                              className={
                                activeIndex === 3
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              onClick={() => handleOnClick(3)}
                            >
                              <i className="fi-rs-shopping-bag mr-10"></i>
                              Products
                            </a>
                          </li>
                        )}
                        <li className="nav-item">
                          <a
                            className={
                              activeIndex === 4 ? "nav-link active" : "nav-link"
                            }
                            onClick={() => handleOnClick(4)}
                          >
                            <i className="fi-rs-marker mr-10"></i>My Address
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={
                              activeIndex === 5 ? "nav-link active" : "nav-link"
                            }
                            onClick={() => handleOnClick(5)}
                          >
                            <i className="fi-rs-user mr-10"></i>Account details
                          </a>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/page-login"
                            onClick={logoutHandler}
                            className="nav-link"
                          >
                            <i className="fi-rs-sign-out mr-10"></i>Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="tab-content account dashboard-content pl-50">
                      <div
                        className={
                          activeIndex === 1
                            ? "tab-pane fade active show"
                            : "tab-pane fade "
                        }
                      >
                        <div className="card">
                          <div className="card-header">
                            <h3
                              className="mb-0"
                              style={{ textTransform: "capitalize" }}
                            >
                              Hello {user.firstName}!
                            </h3>
                          </div>
                          <div className="card-body">
                            <p>
                              Hey there, {`${user.firstName} ${user.lastName}`}!
                              Feeling empowered? Welcome back to your dashboard,
                              your personal command center.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          activeIndex === 2
                            ? "tab-pane fade active show"
                            : "tab-pane fade "
                        }
                      >
                        <div className="card">
                          <div className="card-header">
                            <h3 className="mb-0">Your Orders</h3>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              {userInfo && userInfo.userType !== "owner" ? (
                                <>
                                  {userOrders.length === 0 && (
                                    <h6>Your Orders Will be Displayed Here</h6>
                                  )}
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th>Order</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Total</th>
                                        <th>Address</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {userOrders.map((order, index) => {
                                        const date = new Date(order.date);

                                        const formattedDate =
                                          monthNames[date.getMonth()] +
                                          " " +
                                          date.getDate() +
                                          ", " +
                                          date.getFullYear();
                                        return (
                                          <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{formattedDate}</td>
                                            <td>{order.shipmentStatus}</td>
                                            <td>{`$${
                                              Math.round(
                                                order.totalPrice * 10
                                              ) / 10
                                            } for ${
                                              order.cartItems.length
                                            } item`}</td>
                                            <td>{`${order.userAddress.street}, ${order.userAddress.city} ${order.userAddress.state} ${order.userAddress.postalCode}`}</td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </>
                              ) : (
                                <>
                                  {userOrders.length === 0 && (
                                    <h6>Your Orders Will be Displayed Here</h6>
                                  )}
                                  <table className="table table-hover">
                                    <thead>
                                      <tr>
                                        <th>#ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {userOrders.map((order, index) => {
                                        const date = new Date(order.date);
                                        const formattedDate =
                                          monthNames[date.getMonth()] +
                                          " " +
                                          date.getDate() +
                                          ", " +
                                          date.getFullYear();
                                        return (
                                          <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{order.userName}</td>
                                            <td>{order.totalPrice} $</td>
                                            <td>
                                              {orderEdit ? (
                                                <>
                                                  <select
                                                    name="status"
                                                    id="status"
                                                    defaultValue="pending"
                                                    onChange={
                                                      onStatusChangeHandler
                                                    }
                                                  >
                                                    <option value="pending">
                                                      Select Status
                                                    </option>
                                                    <option value="pending">
                                                      Pending
                                                    </option>
                                                    <option value="delivered">
                                                      Delivered
                                                    </option>
                                                    <option value="shipped">
                                                      Shipped
                                                    </option>
                                                  </select>
                                                </>
                                              ) : (
                                                order.shipmentStatus
                                              )}
                                            </td>
                                            <td>{formattedDate}</td>
                                            <td>{`${order.userAddress.street}, ${order.userAddress.city} ${order.userAddress.state} ${order.userAddress.postalCode}`}</td>
                                            <td
                                              style={{
                                                display: "flex",
                                                gap: "10px",
                                              }}
                                            >
                                              <a
                                                onClick={() => {
                                                  handleOrderEdit(order["_id"]);
                                                }}
                                                className="btn btn-md rounded font-sm"
                                              >
                                                {orderEdit ? "Confirm" : "Edit"}
                                              </a>
                                              <a
                                                href={`/orders/${order["_id"]}`}
                                                className="btn btn-md rounded font-sm"
                                              >
                                                Detail
                                              </a>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {userInfo && userInfo.userType === "owner" && (
                        <div
                          className={
                            activeIndex === 3
                              ? "tab-pane fade active show"
                              : "tab-pane fade "
                          }
                        >
                          <div className="card">
                            <div className="card-header">
                              <h3 className="mb-0">Products List</h3>
                              <a
                                style={{ marginTop: "10px" }}
                                onClick={handleAddProduct}
                                className="btn btn-md rounded font-sm"
                              >
                                Add Product
                              </a>
                            </div>

                            <div className="card-body">
                              <div className="table-responsive">
                                {ownerProducts.length === 0 && (
                                  <h6>Your Products Will be Displayed Here</h6>
                                )}
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Product</th>
                                      <th>Name</th>
                                      <th>Price</th>
                                      <th>AvailableInStock</th>
                                      <th>Rating</th>
                                      <th>Category</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {ownerProducts.map((product, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>
                                            <a
                                              href={`/products/${product["_id"]}`}
                                            >
                                              {product.name}
                                            </a>
                                          </td>
                                          <td>
                                            {product.price["$numberDecimal"]}
                                          </td>
                                          <td>{product.availableInStock}</td>
                                          <td>{product.averageRating}</td>
                                          <td>{product.categoryName}</td>
                                          <td
                                            style={{
                                              display: "flex",
                                              gap: "10px",
                                            }}
                                          >
                                            <a
                                              href={`/add-product?productId=${product['_id']}`}
                                              className="btn btn-md rounded font-sm"
                                            >
                                              Edit
                                            </a>
                                            <a
                                              className="btn btn-md rounded font-sm"
                                              style={{
                                                backgroundColor: "#f44",
                                              }}
                                              onClick={() => {
                                                handleOnDelete(product["_id"]);
                                              }}
                                            >
                                              Delete
                                            </a>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div
                        className={
                          activeIndex === 4
                            ? "tab-pane fade active show"
                            : "tab-pane fade "
                        }
                      >
                        <div className="row">
                          {user.addresses &&
                            user.addresses.map((address, index) => {
                              return (
                                <React.Fragment key={index}>
                                  <div
                                    className="col-lg-6"
                                    style={{ marginBottom: "10px" }}
                                  >
                                    <div className="card mb-3 mb-lg-0">
                                      <div className="card-header">
                                        <h3 className="mb-0">{`Address ${
                                          index + 1
                                        }`}</h3>
                                      </div>
                                      <div className="card-body">
                                        <address>
                                          {address.street}
                                          <br />
                                          {address.state}, {address.postalCode}
                                        </address>
                                        <p>{address.city}</p>
                                        <a
                                          style={{ color: "red" }}
                                          className="btn-small"
                                          onClick={() => {
                                            addressDeleteHandler(
                                              address["_id"]
                                            );
                                          }}
                                        >
                                          Delete
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </React.Fragment>
                              );
                            })}
                        </div>

                        <div className="row">
                          <div
                            className="col-lg-6"
                            style={{ marginBottom: "5px" }}
                          >
                            <button
                              className="btn btn-fill-out submit font-weight-bold"
                              onClick={addAddressHandler}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          activeIndex === 5
                            ? "tab-pane fade active show"
                            : "tab-pane fade "
                        }
                      >
                        <div className="card">
                          <div className="card-header">
                            <h5>Account Details</h5>
                          </div>
                          <div className="card-body">
                            <form method="post" name="enq">
                              <div className="row">
                                <div className="form-group col-md-6">
                                  <label>
                                    First Name{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required=""
                                    className="form-control"
                                    value={user.firstName}
                                    name="name"
                                    type="text"
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <label>
                                    Last Name{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required=""
                                    value={user.lastName}
                                    className="form-control"
                                    name="phone"
                                  />
                                </div>
                                <div className="form-group col-md-12">
                                  <label>
                                    Email Address{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required=""
                                    className="form-control"
                                    value={user.email}
                                    name="email"
                                    type="email"
                                  />
                                </div>
                                <div className="form-group col-md-12">
                                  <label>
                                    Current Password{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required=""
                                    className="form-control"
                                    name="password"
                                    type="password"
                                  />
                                </div>
                                <div className="form-group col-md-12">
                                  <label>
                                    New Password{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required=""
                                    className="form-control"
                                    name="newPassword"
                                    type="password"
                                  />
                                </div>
                                <div className="form-group col-md-12">
                                  <label>
                                    Confirm Password{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required=""
                                    className="form-control"
                                    name="confirmPassword"
                                    type="password"
                                  />
                                </div>
                                <div className="col-md-12">
                                  <button
                                    type="submit"
                                    className="btn btn-fill-out submit font-weight-bold"
                                    name="submit"
                                    value="Submit"
                                  >
                                    Save Change
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Account;
