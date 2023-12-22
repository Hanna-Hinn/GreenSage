import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";

import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";

const SingleProduct2 = ({
  product,
  addToCart,
  addToWishlist,
  openQuickView,
}) => {
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
          <div className="product-img product-img-zoom">
            <Link to="/products/[slug]" as={`/products/${product.slug}`}>
              <img
                className="default-img"
                src={product.images[0].img}
                alt="nest"
              />
              <img
                className="hover-img"
                src={product.images[1].img}
                alt="nest"
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
          <div className="product-category">
            <Link to="/products">{product.brand}</Link>
          </div>
          <h2>
            <Link to="/products/[slug]" as={`/products/${product.slug}`}>
              {product.title}
            </Link>
          </h2>

          <div className="product-rate d-inline-block">
            <div className="product-rating" style={{ width: "90%" }}></div>
          </div>

          <div className="product-price mt-10">
            <span>${product.price} </span>
            <span className="old-price">
              {product.oldPrice && `$ ${product.oldPrice}`}
            </span>
          </div>
          <div className="sold mt-15 mb-15">
            <div className="progress mb-5">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "50%" }}
              ></div>
            </div>
            <span className="font-xs text-heading"> Sold: 90/120</span>
          </div>

          <a
            className="btn w-100 hover-up"
            onClick={(e) => handleCart(product)}
          >
            <i className="fi-rs-shopping-cart mr-5"></i> Add To Cart
          </a>
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

export default connect(null, mapDispatchToProps)(SingleProduct2);
