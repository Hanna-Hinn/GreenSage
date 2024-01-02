/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

const ProductTab = ({ desc, vendor, ratingCount, reviews }) => {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleOnClick = (index) => {
    setActiveIndex(index);
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
              {/* <img src={vendor.imageUrl} alt={vendor.name} /> */}
              <div className="vendor-name ml-15">
                <h6>
                  <a href="vendor-details-2.html">{vendor.name}</a>
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
                {/* <span>
                  {`${vendor.addresses[0].street}, ${vendor.addresses[0].city} ${vendor.addresses[0].postalCode}, ${vendor.addresses[0].state}  `}
                </span> */}
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

            {/* <p>{vendor.description}</p> */}
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
                    <div className="single-comment justify-content-between d-flex">
                      <div className="user justify-content-between d-flex">
                        <div className="thumb text-center">
                          <img
                            src="/assets/imgs/blog/author-2.png"
                            alt="nest"
                          />
                          <h6>
                            <a href="#">Jacky Chan</a>
                          </h6>
                        </div>
                        <div className="desc">
                          <div className="product-rate d-inline-block">
                            <div
                              className="product-rating"
                              style={{
                                width: "90%",
                              }}
                            ></div>
                          </div>
                          <p>
                            Thank you very fast shipping from Poland only 3days.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="single-comment justify-content-between d-flex">
                      <div className="user justify-content-between d-flex">
                        <div className="thumb text-center">
                          <img
                            src="/assets/imgs/blog/author-3.png"
                            alt="nest"
                          />
                          <h6>
                            <a href="#">Ana Rosie</a>
                          </h6>
                          <p className="font-xxs">Since 2008</p>
                        </div>
                        <div className="desc">
                          <div className="product-rate d-inline-block">
                            <div
                              className="product-rating"
                              style={{
                                width: "90%",
                              }}
                            ></div>
                          </div>
                          <p>Great low price and works well.</p>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <p className="font-xs mr-30">
                                December 4, 2020 at 3:12 pm
                              </p>
                              <a href="#" className="text-brand btn-reply">
                                Reply
                                <i className="fi-rs-arrow-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="single-comment justify-content-between d-flex">
                      <div className="user justify-content-between d-flex">
                        <div className="thumb text-center">
                          <img
                            src="/assets/imgs/blog/author-4.png"
                            alt="nest"
                          />
                          <h6>
                            <a href="#">Steven Keny</a>
                          </h6>
                          <p className="font-xxs">Since 2010</p>
                        </div>
                        <div className="desc">
                          <div className="product-rate d-inline-block">
                            <div
                              className="product-rating"
                              style={{
                                width: "90%",
                              }}
                            ></div>
                          </div>
                          <p>
                            Authentic and Beautiful, Love these way more than
                            ever expected They are Great earphones
                          </p>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <p className="font-xs mr-30">
                                December 4, 2020 at 3:12 pm
                              </p>
                              <a href="#" className="text-brand btn-reply">
                                Reply
                                <i className="fi-rs-arrow-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="comment-form">
              <h4 className="mb-15">Add a review</h4>
              <div className="product-rate d-inline-block mb-30"></div>
              <div className="row">
                <div className="col-lg-8 col-md-12">
                  <form
                    className="form-contact comment_form"
                    action="#"
                    id="commentForm"
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
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input
                            className="form-control"
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input
                            className="form-control"
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <input
                            className="form-control"
                            name="website"
                            id="website"
                            type="text"
                            placeholder="Website"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="button button-contactForm"
                      >
                        Submit Review
                      </button>
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
