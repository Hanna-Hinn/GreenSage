/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToWishlist } from "../../redux/action/wishlistAction";

const SingleProduct2 = ({
  userInfo,
  wishList,
  product,
  addToCart,
  addToWishlist,
  openQuickView,
}) => {
  // const soldItems = Math.floor(
  //   Math.random() * (product.availableInStock - 5 - 5) + 5
  // );
  const soldItems = 10;
  const handleCart = (product) => {
    if (userInfo) {
      addToCart(product);
      toast("Product added to Cart !");
    } else {
      toast("Please Login to continue !");
    }
  };

  const handleWishlist = (product) => {
    if (userInfo) {
      if (!wishList.find((item) => item.productId === product["_id"])) {
        addToWishlist(product);
        toast("Added to Wishlist !");
      } else {
        toast("Already Added To WishList !");
      }
    } else {
      toast("Please Login to continue !");
    }
  };

  return (
    <>
      <div className="product-cart-wrap mb-30">
        <div className="product-img-action-wrap">
          <div className="product-img product-img-zoom">
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
          <div className="product-category">
            <Link to="/products">{product.categoryName}</Link>
          </div>
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
                  key={index}
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

          <div className="product-price mt-10">
            <span>$ {product.price["$numberDecimal"]} </span>
          </div>
          <div className="sold mt-15 mb-15">
            <div className="progress mb-5">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "50%" }}
              ></div>
            </div>
            <span className="font-xs text-heading">{`Sold: ${soldItems}/${product.availableInStock}`}</span>
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

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  wishList: state.wishlist,
});

const mapDispatchToProps = {
  addToCart,
  addToWishlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct2);
