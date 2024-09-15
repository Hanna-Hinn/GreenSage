/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToWishlist } from "../../redux/action/wishlistAction";

const SingleProduct = ({
  userInfo,
  wishList,
  product,
  addToCart,
  addToWishlist,
}) => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (typeof Number(product.averageRating) === "number") {
      setAverageRating(product.averageRating);
    } else {
      setAverageRating(product.averageRating["$numberDecimal"]);
    }
  }, [averageRating]);

  const handleCart = (product) => {
    if (userInfo) {
      addToCart({ ...product });
      toast("Product added to Cart !");
    } else {
      toast("Please Login to continue !");
    }
  };

  const handleWishlist = (product) => {
    if (userInfo) {
      if (wishList.length === 0) {
        addToWishlist(product);
        toast("Added to Wishlist !");
      } else if (!wishList.find((item) => item.productId === product["_id"])) {
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
              onClick={(e) => {
                handleWishlist(product);
              }}
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
                      currentRating <=
                      Math.round(
                        typeof product.averageRating === "object"
                          ? product.averageRating["$numberDecimal"]
                          : product.averageRating
                      )
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
              (
              {Math.round(
                (typeof product.averageRating === "object"
                  ? product.averageRating["$numberDecimal"]
                  : product.averageRating) * 10
              ) / 10}
              )
            </span>
          </div>

          <div>
            <span className="font-small text-muted">By {product.owner}</span>
          </div>

          <div className="product-card-bottom">
            <div className="product-price">
              <span>$ {product.price["$numberDecimal"]} </span>
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

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  wishList: state.wishlist,
});

const mapDispatchToProps = {
  addToCart,
  addToWishlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
