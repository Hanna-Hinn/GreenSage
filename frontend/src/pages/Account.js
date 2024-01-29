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
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({});
  const mineralsArray = [
    "vitaminD",
    "iron",
    "vitaminB12",
    "calcium",
    "omega3",
    "iodine",
    "vitaminC",
    "folate",
    "magnesium",
    "zinc",
  ];
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
    setFormData(userData.data);
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

  const handleMineralChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        healthStatus: { ...prev.healthStatus, [value]: checked },
      };
    });
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
      toast("Something Went Wrong !");
    }
  };

  const handleSubmit = async () => {
    const isValid = validateInputs();

    if (!isValid) {
      return;
    }

    setFormData(delete formData.confirmPassword);

    if (userInfo.userType === "owner") {
      setFormData(delete formData.healthStatus);
    }

    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/users/${userInfo.id}`,
        formData
      );

      if (data.success) {
        toast("User Updates Successfully");
        const updateStorage = {
          ...userInfo,
          email: formData.email,
        };
        localStorage.setItem("userInfo", updateStorage);
      }
    } catch (e) {
      console.log(e);
      toast(e.message ? e.message : "Something went wrong !");
    }
  };

  const validateInputs = () => {
    const firstName = formData["firstName"];
    const lastName = formData["lastName"];
    const email = formData["email"];
    const mobile = formData["mobile"];
    const imageUrl = formData["imageUrl"];
    const password = formData["password"];
    const confirmPassword = formData["confirmPassword"];

    if (!firstName || firstName.trim() === "") {
      setError({ ...error, firstName: "First name is required!!!" });
      return false;
    }
    if (!lastName || lastName.trim() === "") {
      setError({ ...error, lastName: "Last name is required!!!" });
      return false;
    }
    if (!email || email.trim() === "" || !validateEmail(email)) {
      setError({ ...error, email: "Entered Email not Valid!!!" });
      return false;
    }
    if (!mobile || mobile.trim() === "" || !validateMobile(mobile)) {
      setError({ ...error, mobile: "Entered Mobile number not Valid!!!" });
      return false;
    }
    if (!imageUrl || imageUrl.trim() === "" || !validateImageUrl(imageUrl)) {
      setError({ ...error, imageUrl: "Entered Image URL not Valid!!!" });
      return false;
    }
    if (!password || password.trim() === "" || password.length < 8) {
      setError({
        ...error,
        password: "Password Length Must be more than 8 characters!!!",
      });
      return false;
    }
    if (confirmPassword !== password) {
      setError({
        ...error,
        confirmPassword: "Confirm Password Does not Match!!!",
      });
      return false;
    }
    return true;
  };

  function validateEmail(email) {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(String(email).toLowerCase());
  }

  function validateMobile(mobile) {
    const mobileRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
    return mobileRegex.test(mobile);
  }

  function validateImageUrl(url) {
    const imageUrlRegex = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg)$/i;
    return imageUrlRegex.test(url);
  }

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
                                            <td>
                                              <Link
                                                to={`/orders/${order["_id"]}`}
                                              >
                                                {index + 1}
                                              </Link>
                                            </td>
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
                                          <td>
                                            {product.averageRating[
                                              "$numberDecimal"
                                            ]
                                              ? Math.round(
                                                  product.averageRating[
                                                    "$numberDecimal"
                                                  ] * 10
                                                ) / 10
                                              : 0}
                                          </td>
                                          <td>{product.categoryName}</td>
                                          <td
                                            style={{
                                              display: "flex",
                                              gap: "10px",
                                            }}
                                          >
                                            <a
                                              href={`/add-product?productId=${product["_id"]}`}
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
                            <form onSubmit={(e) => e.preventDefault()}>
                              <div style={{ display: "flex", gap: "10px" }}>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    required
                                    name="firstName"
                                    placeholder="First Name..."
                                    value={formData.firstName}
                                    onChange={(e) => {
                                      setFormData({
                                        ...formData,
                                        firstName: e.target.value,
                                      });
                                      setError((curr) => {
                                        const { firstName, ...rest } = curr;
                                        return rest;
                                      });
                                    }}
                                  />
                                </div>
                                {error.firstName && (
                                  <>
                                    <br />
                                    <span style={{ color: "red" }}>
                                      {error.firstName}
                                    </span>
                                  </>
                                )}
                                <div className="form-group">
                                  <input
                                    type="text"
                                    required
                                    name="lastName"
                                    placeholder="Last Name..."
                                    value={formData.lastName}
                                    onChange={(e) => {
                                      setFormData({
                                        ...formData,
                                        lastName: e.target.value,
                                      });
                                      setError((curr) => {
                                        const { lastName, ...rest } = curr;
                                        return rest;
                                      });
                                    }}
                                  />
                                </div>
                                {error.lastName && (
                                  <>
                                    <br />
                                    <span style={{ color: "red" }}>
                                      {error.lastName}
                                    </span>
                                  </>
                                )}
                              </div>

                              <div className="form-group">
                                <input
                                  type="text"
                                  required
                                  name="email"
                                  placeholder="Email..."
                                  value={formData.email}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      email: e.target.value,
                                    });
                                    setError((curr) => {
                                      const { email, ...rest } = curr;
                                      return rest;
                                    });
                                  }}
                                />
                                {error.email && (
                                  <>
                                    <br />
                                    <span style={{ color: "red" }}>
                                      {error.email}
                                    </span>
                                  </>
                                )}
                              </div>

                              <div className="form-group">
                                <input
                                  type="tel"
                                  required
                                  name="mobile"
                                  placeholder="Mobile Number..."
                                  value={formData.mobile}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      mobile: e.target.value,
                                    });
                                    setError((curr) => {
                                      const { mobile, ...rest } = curr;
                                      return rest;
                                    });
                                  }}
                                />
                                {error.mobile && (
                                  <>
                                    <br />
                                    <span style={{ color: "red" }}>
                                      {error.mobile}
                                    </span>
                                  </>
                                )}
                              </div>

                              <div className="form-group">
                                <input
                                  type="url"
                                  required
                                  name="imageUrl"
                                  placeholder="Profile Image Url..."
                                  value={formData.imageUrl}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      imageUrl: e.target.value,
                                    });
                                    setError((curr) => {
                                      const { imageUrl, ...rest } = curr;
                                      return rest;
                                    });
                                  }}
                                />
                                {error.imageUrl && (
                                  <>
                                    <br />
                                    <span style={{ color: "red" }}>
                                      {error.imageUrl}
                                    </span>
                                  </>
                                )}
                              </div>

                              <div className="form-group">
                                <input
                                  required
                                  type="password"
                                  name="password"
                                  placeholder="Password"
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      password: e.target.value,
                                    });
                                    setError((curr) => {
                                      const { password, ...rest } = curr;
                                      return rest;
                                    });
                                  }}
                                />
                                {error.password && (
                                  <>
                                    <br />
                                    <span style={{ color: "red" }}>
                                      {error.password}
                                    </span>
                                  </>
                                )}
                              </div>

                              <div className="form-group">
                                <input
                                  required
                                  type="password"
                                  name="confirmPassword"
                                  placeholder="Confirm password"
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      confirmPassword: e.target.value,
                                    });
                                    setError((curr) => {
                                      const { confirmPassword, ...rest } = curr;
                                      return rest;
                                    });
                                  }}
                                />
                                {error.confirmPassword && (
                                  <>
                                    <br />
                                    <span style={{ color: "red" }}>
                                      {error.confirmPassword}
                                    </span>
                                  </>
                                )}
                              </div>
                              {userInfo && userInfo.userType === "owner" && (
                                <div className="form-group">
                                  <textarea
                                    type="text"
                                    required
                                    name="Description"
                                    placeholder="Vendor Description"
                                    value={formData.description}
                                    onChange={(e) => {
                                      setFormData({
                                        ...formData,
                                        description: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                              )}

                              {userInfo && userInfo.userType !== "owner" && (
                                <div className="payment_option mb-50">
                                  <label>
                                    Please Check the Preferred Minerals:
                                  </label>
                                  <br />
                                  {mineralsArray.map((key) => {
                                    return (
                                      <div key={key}>
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          name={key}
                                          value={key}
                                          id={key}
                                          checked={
                                            formData &&
                                            formData.healthStatus &&
                                            formData.healthStatus[key]
                                              ? formData.healthStatus[key]
                                              : false
                                          }
                                          onChange={(e) =>
                                            handleMineralChange(e)
                                          }
                                        />
                                        <label
                                          style={{ paddingLeft: "5px" }}
                                          className="form-check-label"
                                          htmlFor={key}
                                        >
                                          {key}
                                        </label>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}

                              <div className="form-group mb-30">
                                <button
                                  // type="submit"
                                  className="btn btn-fill-out btn-block font-weight-bold"
                                  onClick={handleSubmit}
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                            {!error.responseError && (
                              <p style={{ color: "red" }}>
                                {error.responseError}
                              </p>
                            )}
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
