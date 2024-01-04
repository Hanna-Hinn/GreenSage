/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../../config";

const ProductTab = ({
  productDetails,
  userId,
  desc,
  vendor,
  ratingCount,
  reviews,
}) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [hover, setHover] = useState(null);
  const [success, setSuccess] = useState({ status: false, msg: "" });
  const [formData, setFormData] = useState({
    title: productDetails.name,
    productId: productDetails.id,
    userId: "6591c9101193d526b0f1f958",
    rating: 0,
  });

  const handleOnClick = (index) => {
    setActiveIndex(index);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/ratings`, formData);
      setSuccess({
        status: response.data.success,
        msg: response.data.msg ? response.data.msg : response.data.message,
      });
      window.location.reload(false);
    } catch (e) {
      console.log(e);
      setSuccess({
        status: false,
        msg: e.message ? e.message : "Something Went Wrong!!!",
      });
    }
  };

  return (
    <div className="product-info">
      <div className="tab-style3">
        <ul className="nav nav-tabs text-uppercase">
          <li className="nav-item">
            <a
              className={activeIndex === 1 ? "nav-link active" : "nav-link"}
              id="Description-tab"
              data-bs-toggle="tab"
              onClick={() => handleOnClick(1)}
            >
              Description
            </a>
          </li>
          <li className="nav-item">
            <a
              className={activeIndex === 3 ? "nav-link active" : "nav-link"}
              id="Reviews-tab"
              data-bs-toggle="tab"
              onClick={() => handleOnClick(3)}
            >
              Vendor
            </a>
          </li>
          <li className="nav-item">
            <a
              className={activeIndex === 4 ? "nav-link active" : "nav-link"}
              id="Reviews-tab"
              data-bs-toggle="tab"
              onClick={() => handleOnClick(4)}
            >
              Reviews ({`${ratingCount}`})
            </a>
          </li>
        </ul>
        <div className="tab-content shop_info_tab entry-main-content">
          <div
            className={
              activeIndex === 1 ? "tab-pane fade show active" : "tab-pane fade"
            }
            id="Description"
          >
            <div>
              <p>{desc}</p>
            </div>
          </div>
          <div
            className={
              activeIndex === 3 ? "tab-pane fade show active" : "tab-pane fade"
            }
            id="vendors"
          >
            <div className="vendor-logo d-flex mb-30">
              <img
                src={vendor.imageUrl}
                alt={`${vendor.firstName} ${vendor.lastName}`}
              />
              <div className="vendor-name ml-15">
                <h6>
                  <a
                    href={`/vendor-list/vendors/${vendor["_id"]}`}
                  >{`${vendor.firstName} ${vendor.lastName}`}</a>
                </h6>
              </div>
            </div>
            <ul className="contact-infor mb-50">
              <li>
                <img
                  src="/assets/imgs/theme/icons/icon-location.svg"
                  alt="location"
                />
                <strong>Address: </strong>{" "}
                <span>
                  {`${vendor.addresses[0].street}, ${vendor.addresses[0].city} ${vendor.addresses[0].postalCode}, ${vendor.addresses[0].state}  `}
                </span>
              </li>
              <li>
                <img
                  src="/assets/imgs/theme/icons/icon-contact.svg"
                  alt="contact"
                />
                <strong>Contact Seller:</strong>
                <span>{vendor.mobile}</span>
              </li>
            </ul>

            <p>{vendor.description}</p>
          </div>
          <div
            className={
              activeIndex === 4 ? "tab-pane fade show active" : "tab-pane fade"
            }
            id="Reviews"
          >
            <div className="comments-area">
              <div className="row">
                <div className="col-lg-8">
                  <div className="comment-list">
                    {reviews.map((item, index) => {
                      const rating = item.rating;
                      return (
                        <div
                          className="single-comment justify-content-between d-flex"
                          key={index}
                        >
                          <div className="user justify-content-between d-flex">
                            <div className="thumb text-center">
                              <img
                                src={`${rating.userImage}`}
                                alt={`${rating.userName}`}
                              />
                              <h6
                                style={{ color: "#3bb77e" }}
                              >{`${rating.userName}`}</h6>
                            </div>
                            <div className="desc">
                              <div className="product-rate-cover d-inline-block">
                                {[...Array(5)].map((star, index) => {
                                  const currentRating = index + 1;

                                  return (
                                    <span
                                      key={index}
                                      style={{
                                        color:
                                          currentRating <=
                                          Math.round(
                                            rating.rating["$numberDecimal"]
                                          )
                                            ? "#ffc107"
                                            : "grey",
                                        fontSize: "1rem",
                                      }}
                                    >
                                      &#9733;
                                    </span>
                                  );
                                })}
                              </div>

                              <p>{rating.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="comment-form">
              <h4 className="mb-15">Add a review</h4>
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;

                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={currentRating}
                      style={{ display: "none" }}
                      onChange={() =>
                        setFormData({ ...formData, rating: currentRating })
                      }
                    />
                    <span
                      className="star"
                      style={{
                        color:
                          currentRating <= (hover || formData.rating)
                            ? "#ffc107"
                            : "#e4e5e9",
                        cursor: "pointer",
                        fontSize: "2rem",
                        margin: "5px",
                      }}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                    >
                      &#9733;
                    </span>
                  </label>
                );
              })}
              <div className="row">
                <div className="col-lg-8 col-md-12">
                  <form
                    className="form-contact comment_form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <textarea
                            className="form-control w-100"
                            name="comment"
                            id="comment"
                            cols="30"
                            rows="9"
                            placeholder="Write Comment"
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              });
                            }}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        // type="submit"
                        onClick={handleSubmit}
                        className="button button-contactForm"
                      >
                        Submit Review
                      </button>
                      <p
                        style={{
                          marginTop: "5px",
                          color: success ? "red" : "green",
                        }}
                      >
                        {success.msg}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTab;
