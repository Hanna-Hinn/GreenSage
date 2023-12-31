import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";

const SingleProduct = ({ product, addToCart, addToWishlist }) => {
  const handleCart = (product) => {
    addToCart(product);
    toast("Product added to Cart !");
  };

  const handleWishlist = (product) => {
    addToWishlist(product);
    toast("Added to Wishlist !");
  };

  useEffect(() => {
    console.log(product);
  }, []);

  return (
    <>
      <div className="product-cart-wrap mb-30">
        <div className="product-img-action-wrap">
          <div className="product-img product-img-zoom">
            <Link to={`/products/${product["_id"]}`}>
              <img
                className="default-img"
                src={product.imageUrl}
                alt={`${product.name}`}
              />
              {/* <img
                className="hover-img"
                src={product.images[1].img}
                alt={`icon2`}
              /> */}
            </Link>
          </div>
          <div className="product-action-1">
            {/* <a
              aria-label="Quick view"
              className="action-btn hover-up"
              data-bs-toggle="modal"
              onClick={(e) => openQuickView(product)}
            >
              <i className="fi-rs-eye"></i>
            </a> */}
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
          {/* <div className="product-category">
            <Link to="/products">{product.brand}</Link>
          </div> */}
          <h2>
            <Link to={`/products/${product["_id"]}`}>
              {product.title ? product.title : product.name}
            </Link>
          </h2>

          <div className="product-rate-cover">
            <div className="product-rate d-inline-block">
              <div className="product-rating" style={{ width: "90%" }}></div>
            </div>
            <span className="font-small ml-5 text-muted">
              {" "}
              ({product.ratingScore})
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
