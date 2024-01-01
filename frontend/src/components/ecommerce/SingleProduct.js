/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";

const SingleProduct = ({ product, addToCart, addToWishlist, fixWidth }) => {
  const handleCart = (product) => {
    addToCart(product);
    toast("Product added to Cart !");
  };

  const handleWishlist = (product) => {
    addToWishlist(product);
    toast("Added to Wishlist !");
  };

  return (
    <>
      <div className="product-cart-wrap mb-30">
        <div className="product-img-action-wrap">
          <div
            className="product-img product-img-zoom"
            style={{ height: "250px" }}
          >
            <Link to={`/products/${product["_id"]}`}>
              <img
                className="default-img"
                src={product.imageUrl}
                height="250px"
                alt={`${product.name}`}
              />
            </Link>
          </div>
          <div className="product-action-1">
            <a
              aria-label="Add To Wishlist"
              className="action-btn hover-up"
              onClick={(e) => handleWishlist(product)}
            >
              <i className="fi-rs-heart"></i>
            </a>
          </div>
        </div>
        <div className="product-content-wrap">
          <h2>
            <Link to={`/products/${product["_id"]}`}>
              {product.title ? product.title : product.name}
            </Link>
          </h2>

          <div className="product-rate-cover">
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;

              return (
                <span
                  style={{
                    color:
                      currentRating <= Math.round(product.averageRating)
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
              ({product.averageRating})
            </span>
          </div>

          <div>
            <span className="font-small text-muted">By {product.owner}</span>
          </div>

          <div className="product-card-bottom">
            <div className="product-price">
              <span>$ {product.price["$numberDecimal"]} </span>
              {/* <span className="old-price">
                {product.price["$numberDecimal"] &&
                  "$ " + product.price[`$numberDecimal`]}
              </span> */}
            </div>
            <div className="add-cart">
              <a className="add" onClick={(e) => handleCart(product)}>
                <i className="fi-rs-shopping-cart mr-5"></i> Add
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  addToCart,
  addToWishlist,
  openQuickView,
};

export default connect(null, mapDispatchToProps)(SingleProduct);
