import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CategoryProduct2 from "../ecommerce/Filter/CategoryProduct2";
import CategoryProduct3 from "../ecommerce/Filter/CategoryProduct3";
import Search from "../ecommerce/Search";

const Header = ({
  totalCartItems,
  totalCompareItems,
  toggleClick,
  totalWishlistItems,
}) => {
  const [isToggled, setToggled] = useState(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY >= 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  });

  const handleToggle = () => setToggled(!isToggled);

  return (
    <>
      <header className="header-area header-style-1 header-height-2">
        <div className="mobile-promotion">
          <span>
            Grand opening, <strong>up to 15%</strong> off all items. Only{" "}
            <strong>3 days</strong> left
          </span>
        </div>
        <div className="header-top header-top-ptb-1 d-none d-lg-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-4">
                <div className="header-info">
                  <ul>
                    <li>
                      <Link to="/page-about">About Us</Link>
                    </li>
                    <li>
                      <Link to="/page-account">My Account</Link>
                    </li>
                    <li>
                      <Link to="/shop-wishlist">Wishlist</Link>
                    </li>
                    <li>
                      <Link to="/page-account">Order Tracking</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-6 col-lg-4">
                <div className="text-center">
                  <div id="news-flash" className="d-inline-block">
                    <ul>
                      <li>
                        Get great devices up to 50% off
                        <Link to="/shop-grid-right">View details</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4">
                <div className="header-info header-info-right">
                  <ul>
                    <li>
                      Need help? Call Us:{" "}
                      <strong className="text-brand"> + 1800 900</strong>
                    </li>
                    <li>
                      <Link to="/#" className="language-dropdown-active">
                        <i className="fi-rs-world"></i>
                        English
                        <i className="fi-rs-angle-small-down"></i>
                      </Link>
                      <ul className="language-dropdown">
                        <li>
                          <Link to="/#">
                            <img
                              src="/assets/imgs/theme/flag-fr.png"
                              alt="nest"
                            />
                            Français
                          </Link>
                        </li>
                        <li>
                          <Link to="/#">
                            <img
                              src="/assets/imgs/theme/flag-dt.png"
                              alt="nest"
                            />
                            Deutsch
                          </Link>
                        </li>
                        <li>
                          <Link to="/#">
                            <img
                              src="/assets/imgs/theme/flag-ru.png"
                              alt="nest"
                            />
                            Pусский
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="language-dropdown-active" href="#">
                        USD <i className="fi-rs-angle-small-down"></i>
                      </a>
                      <ul className="language-dropdown">
                        <li>
                          <a to="#">
                            <img
                              src="/assets/imgs/theme/flag-fr.png"
                              alt="nest"
                            />
                            INR
                          </a>
                        </li>
                        <li>
                          <a to="#">
                            <img
                              src="/assets/imgs/theme/flag-dt.png"
                              alt="nest"
                            />
                            MBP
                          </a>
                        </li>
                        <li>
                          <a to="#">
                            <img
                              src="/assets/imgs/theme/flag-ru.png"
                              alt="nest"
                            />
                            EU
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
          <div className="container">
            <div className="header-wrap">
              <div className="logo logo-width-1">
                <Link to="/">
                  <img src="/assets/imgs/theme/logo.svg" alt="logo" />
                </Link>
              </div>
              <div className="header-right">
                <div className="search-style-2">
                  <Search />
                </div>
                <div className="header-action-right">
                  <div className="header-action-2">
                    <div className="search-location">
                      <form action="#">
                        <select className="select-active">
                          <option>Your Location</option>
                          <option>Alabama</option>
                          <option>Alaska</option>
                          <option>Arizona</option>
                          <option>Delaware</option>
                          <option>Florida</option>
                          <option>Georgia</option>
                          <option>Hawaii</option>
                          <option>Indiana</option>
                          <option>Maryland</option>
                          <option>Nevada</option>
                          <option>New Jersey</option>
                          <option>New Mexico</option>
                          <option>New York</option>
                        </select>
                      </form>
                    </div>
                    <div className="header-action-icon-2">
                      <Link to="/shop-compare">
                        <img
                          className="svgInject"
                          alt="Evara"
                          src="/assets/imgs/theme/icons/icon-compare.svg"
                        />
                        <span className="pro-count blue">
                          {totalCompareItems}
                        </span>
                      </Link>
                      <Link to="/shop-compare">
                        <span className="lable ml-0">Compare</span>
                      </Link>
                    </div>
                    <div className="header-action-icon-2">
                      <Link to="/shop-wishlist">
                        <img
                          className="svgInject"
                          alt="Evara"
                          src="/assets/imgs/theme/icons/icon-heart.svg"
                        />
                        <span className="pro-count blue">
                          {totalWishlistItems}
                        </span>
                      </Link>
                      <Link to="/shop-wishlist">
                        <span className="lable">Wishlist</span>
                      </Link>
                    </div>
                    <div className="header-action-icon-2">
                      <Link to="/shop-cart" className="mini-cart-icon">
                        <img
                          alt="Evara"
                          src="/assets/imgs/theme/icons/icon-cart.svg"
                        />
                        <span className="pro-count blue">{totalCartItems}</span>
                      </Link>
                      <Link to="/shop-cart">
                        <span className="lable">Cart</span>
                      </Link>
                    </div>

                    <div className="header-action-icon-2">
                      <Link to="/page-account">
                        <img
                          className="svgInject"
                          alt="Nest"
                          src="/assets/imgs/theme/icons/icon-user.svg"
                        />
                      </Link>
                      <Link to="/page-account">
                        <span className="lable ml-0">Account</span>
                      </Link>
                      <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                        <ul>
                          <li>
                            <Link to="/page-account">
                              <i className="fi fi-rs-user mr-10"></i>
                              My Account
                            </Link>
                          </li>
                          <li>
                            <Link to="/page-account">
                              <i className="fi fi-rs-location-alt mr-10"></i>
                              Order Tracking
                            </Link>
                          </li>
                          <li>
                            <Link to="/page-account">
                              <i className="fi fi-rs-label mr-10"></i>
                              My Voucher
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-wishlist">
                              <i className="fi fi-rs-heart mr-10"></i>
                              My Wishlist
                            </Link>
                          </li>
                          <li>
                            <Link to="/page-account">
                              <i className="fi fi-rs-settings-sliders mr-10"></i>
                              Setting
                            </Link>
                          </li>
                          <li>
                            <Link to="/page-login">
                              <i className="fi fi-rs-sign-out mr-10"></i>
                              Sign out
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            scroll
              ? "header-bottom header-bottom-bg-color sticky-bar stick"
              : "header-bottom header-bottom-bg-color sticky-bar"
          }
        >
          <div className="container">
            <div className="header-wrap header-space-between position-relative">
              <div className="logo logo-width-1 d-block d-lg-none">
                <Link to="/">
                  <img src="/assets/imgs/theme/logo.svg" alt="logo" />
                </Link>
              </div>
              <div className="header-nav d-none d-lg-flex">
                <div className="main-categori-wrap d-none d-lg-block">
                  <a
                    className="categories-button-active"
                    onClick={handleToggle}
                  >
                    <span className="fi-rs-apps"></span>
                    <span className="et">Browse</span> All Categories
                    <i className="fi-rs-angle-down"></i>
                  </a>

                  <div
                    className={
                      isToggled
                        ? "categories-dropdown-wrap categories-dropdown-active-large font-heading open"
                        : "categories-dropdown-wrap categories-dropdown-active-large font-heading"
                    }
                  >
                    <div className="d-flex categori-dropdown-inner">
                      <CategoryProduct2 />
                      <CategoryProduct3 />
                    </div>
                    <div
                      className="more_slide_open"
                      style={{ display: "none" }}
                    >
                      <div className="d-flex categori-dropdown-inner">
                        <ul>
                          <li>
                            <Link to="/products">
                              <img
                                src="/assets/imgs/theme/icons/icon-1.svg"
                                alt="nest"
                              />
                              Milks and Dairies
                            </Link>
                          </li>
                          <li>
                            <Link to="/products">
                              <img
                                src="/assets/imgs/theme/icons/icon-2.svg"
                                alt="nest"
                              />
                              Clothing & beauty
                            </Link>
                          </li>
                        </ul>
                        <ul className="end">
                          <li>
                            <Link to="/products">
                              <img
                                src="/assets/imgs/theme/icons/icon-3.svg"
                                alt="nest"
                              />
                              Wines & Drinks
                            </Link>
                          </li>
                          <li>
                            <Link to="/products">
                              <img
                                src="/assets/imgs/theme/icons/icon-4.svg"
                                alt="nest"
                              />
                              Fresh Seafood
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block  font-heading">
                  <nav>
                    <ul>
                      <li className="hot-deals">
                        <img
                          src="/assets/imgs/theme/icons/icon-hot.svg"
                          alt="hot deals"
                        />
                        <Link to="/products">Hot Deals</Link>
                      </li>
                      <li>
                        <Link to="/" className="active">
                          Home
                          <i className="fi-rs-angle-down"></i>
                        </Link>
                        <ul className="sub-menu">
                          <li>
                            <Link to="/">Home 1</Link>
                          </li>
                          <li>
                            <Link to="/index-2">Home 2</Link>
                          </li>
                          <li>
                            <Link to="/index-3">Home 3</Link>
                          </li>
                          <li>
                            <Link to="/index-4">Home 4</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link to="/page-about">About</Link>
                      </li>
                      <li>
                        <Link to="/shop-grid-right">
                          Shop
                          <i className="fi-rs-angle-down"></i>
                        </Link>
                        <ul className="sub-menu">
                          <li>
                            <Link to="/shop-grid-right">
                              Shop Grid – Right Sidebar
                            </Link>
                          </li>
                          <li>
                            <Link to="/products">Shop Grid – Left Sidebar</Link>
                          </li>
                          <li>
                            <Link to="/shop-list-right">
                              Shop List – Right Sidebar
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-list-left">
                              Shop List – Left Sidebar
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop-fullwidth">Shop - Wide</Link>
                          </li>
                          <li>
                            <Link to="/shop-filter">Shop - Filter</Link>
                          </li>
                          <li>
                            <Link to="/shop-wishlist">Shop – Wishlist</Link>
                          </li>
                          <li>
                            <Link to="/shop-cart">Shop – Cart</Link>
                          </li>
                          <li>
                            <Link to="/shop-checkout">Shop – Checkout</Link>
                          </li>
                          <li>
                            <Link to="/shop-compare">Shop – Compare</Link>
                          </li>
                        </ul>
                      </li>

                      <li>
                        <a href="#">
                          Vendors <i className="fi-rs-angle-down"></i>
                        </a>
                        <ul className="sub-menu">
                          <li>
                            <Link to="/vendors">Vendors Grid</Link>
                          </li>
                          <li>
                            <Link to="/vendors-list">Vendors List</Link>
                          </li>
                          <li>
                            <Link to="/vendor-dashboard">Vendor Dashboard</Link>
                          </li>
                          <li>
                            <Link to="/vendor-guide">Vendor Guide</Link>
                          </li>
                        </ul>
                      </li>

                      <li className="position-static">
                        <Link to="/#">
                          Mega menu
                          <i className="fi-rs-angle-down"></i>
                        </Link>
                        <ul className="mega-menu">
                          <li className="sub-mega-menu sub-mega-menu-width-22">
                            <a className="menu-title" href="#">
                              Fruit & Vegetables
                            </a>
                            <ul>
                              <li>
                                <a href="#">Meat & Poultry</a>
                              </li>
                              <li>
                                <a href="#">Fresh Vegetables</a>
                              </li>
                              <li>
                                <a href="#">Herbs & Seasonings</a>
                              </li>
                              <li>
                                <a href="#">Cuts & Sprouts</a>
                              </li>
                              <li>
                                <a href="#">Exotic Fruits & Veggies</a>
                              </li>
                              <li>
                                <a href="#">Packaged Produce</a>
                              </li>
                            </ul>
                          </li>
                          <li className="sub-mega-menu sub-mega-menu-width-22">
                            <a className="menu-title" href="#">
                              Breakfast & Dairy
                            </a>
                            <ul>
                              <li>
                                <a href="#">Milk & Flavoured Milk</a>
                              </li>
                              <li>
                                <a href="#">Butter and Margarine</a>
                              </li>
                              <li>
                                <a href="#">Eggs Substitutes</a>
                              </li>
                              <li>
                                <a href="#">Marmalades</a>
                              </li>
                              <li>
                                <a href="#">Sour Cream</a>
                              </li>
                              <li>
                                <a href="#">Cheese</a>
                              </li>
                            </ul>
                          </li>
                          <li className="sub-mega-menu sub-mega-menu-width-22">
                            <a className="menu-title" href="#">
                              Meat & Seafood
                            </a>
                            <ul>
                              <li>
                                <a href="#">Breakfast Sausage</a>
                              </li>
                              <li>
                                <a href="#">Dinner Sausage</a>
                              </li>
                              <li>
                                <a href="#">Chicken</a>
                              </li>
                              <li>
                                <a href="#">Sliced Deli Meat</a>
                              </li>
                              <li>
                                <a href="#">Wild Caught Fillets</a>
                              </li>
                              <li>
                                <a href="#">Crab and Shellfish</a>
                              </li>
                            </ul>
                          </li>
                          <li className="sub-mega-menu sub-mega-menu-width-34">
                            <div className="menu-banner-wrap">
                              <a href="#">
                                <img
                                  src="/assets/imgs/banner/banner-menu.png"
                                  alt="Nest"
                                />
                              </a>
                              <div className="menu-banner-content">
                                <h4>Hot deals</h4>
                                <h3>
                                  Don't miss
                                  <br />
                                  Trending
                                </h3>
                                <div className="menu-banner-price">
                                  <span className="new-price text-success">
                                    Save to 50%
                                  </span>
                                </div>
                                <div className="menu-banner-btn">
                                  <a href="#">Shop now</a>
                                </div>
                              </div>
                              <div className="menu-banner-discount">
                                <h3>
                                  <span>25%</span>
                                  off
                                </h3>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link to="/blog-category-grid">
                          Blog
                          <i className="fi-rs-angle-down"></i>
                        </Link>
                        <ul className="sub-menu">
                          <li>
                            <Link to="/blog-category-grid">
                              Blog Category Grid
                            </Link>
                          </li>
                          <li>
                            <Link to="/blog-category-list">
                              Blog Category List
                            </Link>
                          </li>
                          <li>
                            <Link to="/blog-category-big">
                              Blog Category Big
                            </Link>
                          </li>
                          <li>
                            <Link to="/blog-category-fullwidth">
                              Blog Category Wide
                            </Link>
                          </li>
                          <li>
                            <Link to="/#">
                              Single Post
                              <i className="fi-rs-angle-right"></i>
                            </Link>
                            <ul className="level-menu level-menu-modify">
                              <li>
                                <Link to="/blog-post-left">Left Sidebar</Link>
                              </li>
                              <li>
                                <Link to="/blog-post-right">Right Sidebar</Link>
                              </li>
                              <li>
                                <Link to="/blog-post-fullwidth">
                                  No Sidebar
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link to="/#">
                          Pages
                          <i className="fi-rs-angle-down"></i>
                        </Link>
                        <ul className="sub-menu">
                          <li>
                            <Link to="/page-about">About Us</Link>
                          </li>
                          <li>
                            <Link to="/page-contact">Contact</Link>
                          </li>
                          <li>
                            <Link to="/page-account">My Account</Link>
                          </li>
                          <li>
                            <Link to="/page-login">Login</Link>
                          </li>
                          <li>
                            <Link to="/page-register">Register</Link>
                          </li>
                          <li>
                            <Link to="/page-purchase-guide">
                              Purchase Guide
                            </Link>
                          </li>
                          <li>
                            <Link to="/page-privacy-policy">
                              Privacy Policy
                            </Link>
                          </li>
                          <li>
                            <Link to="/page-terms">Terms of Service</Link>
                          </li>
                          <li>
                            <Link to="/page-404">404 Page</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link to="/page-contact">Contact</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="hotline d-none d-lg-flex">
                <img
                  src="/assets/imgs/theme/icons/icon-headphone.svg"
                  alt="hotline"
                />

                <p>
                  1900 - 888<span>24/7 Support Center</span>
                </p>
              </div>

              <div className="header-action-icon-2 d-block d-lg-none">
                <div
                  className="burger-icon burger-icon-white"
                  onClick={toggleClick}
                >
                  <span className="burger-icon-top"></span>
                  <span className="burger-icon-mid"></span>
                  <span className="burger-icon-bottom"></span>
                </div>
              </div>

              <div className="header-action-right d-block d-lg-none">
                <div className="header-action-2">
                  <div className="header-action-icon-2">
                    <Link to="/shop-wishlist">
                      <img
                        alt="Evara"
                        src="/assets/imgs/theme/icons/icon-heart.svg"
                      />
                      <span className="pro-count white">
                        {totalWishlistItems}
                      </span>
                    </Link>
                  </div>
                  <div className="header-action-icon-2">
                    <Link to="/shop-cart" className="mini-cart-icon">
                      <img
                        alt="Evara"
                        src="/assets/imgs/theme/icons/icon-cart.svg"
                      />
                      <span className="pro-count white">{totalCartItems}</span>
                    </Link>
                    <div className="cart-dropdown-wrap cart-dropdown-hm2">
                      <ul>
                        <li>
                          <div className="shopping-cart-img">
                            <Link to="/shop-grid-right">
                              <img
                                alt="Evara"
                                src="/assets/imgs/shop/thumbnail-3.jpg"
                              />
                            </Link>
                          </div>
                          <div className="shopping-cart-title">
                            <h4>
                              <Link to="/shop-grid-right">
                                Plain Striola Shirts
                              </Link>
                            </h4>
                            <h3>
                              <span>1 × </span>
                              $800.00
                            </h3>
                          </div>
                          <div className="shopping-cart-delete">
                            <Link to="/#">
                              <i className="fi-rs-cross-small"></i>
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="shopping-cart-img">
                            <Link to="/shop-grid-right">
                              <img
                                alt="Evara"
                                src="/assets/imgs/shop/thumbnail-4.jpg"
                              />
                            </Link>
                          </div>
                          <div className="shopping-cart-title">
                            <h4>
                              <Link to="/shop-grid-right">
                                Macbook Pro 2024
                              </Link>
                            </h4>
                            <h3>
                              <span>1 × </span>
                              $3500.00
                            </h3>
                          </div>
                          <div className="shopping-cart-delete">
                            <Link to="/#">
                              <i className="fi-rs-cross-small"></i>
                            </Link>
                          </div>
                        </li>
                      </ul>
                      <div className="shopping-cart-footer">
                        <div className="shopping-cart-total">
                          <h4>
                            Total
                            <span>$383.00</span>
                          </h4>
                        </div>
                        <div className="shopping-cart-button">
                          <Link to="/shop-cart">View cart</Link>
                          <Link to="/shop-checkout">Checkout</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

const mapStateToProps = (state) => ({
  totalCartItems: state.cart.length,
  totalCompareItems: state.compare.items.length,
  totalWishlistItems: state.wishlist.items.length,
});

export default connect(mapStateToProps, null)(Header);
