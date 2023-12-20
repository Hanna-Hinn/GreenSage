import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="main">
        <section className="newsletter mb-15  wow animate__animated animate__fadeIn">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="position-relative newsletter-inner">
                  <div className="newsletter-content">
                    <h2 className="mb-20">
                      Stay home & get your daily <br />
                      needs from our shop
                    </h2>
                    <p className="mb-45">
                      Start You'r Daily Shopping with{" "}
                      <span className="text-brand">GreenSage</span>
                    </p>
                  </div>
                  <img
                    src="/assets/imgs/banner/banner-9.png"
                    alt="newsletter"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="featured  section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 mb-md-4 mb-xl-0">
                <div
                  className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                  data-wow-delay="0"
                >
                  <div className="banner-icon">
                    <img src="/assets/imgs/theme/icons/icon-1.svg" alt="nest" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Best prices & offers</h3>
                    <p>Orders $50 or more</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <div
                  className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                  data-wow-delay=".1s"
                >
                  <div className="banner-icon">
                    <img src="/assets/imgs/theme/icons/icon-2.svg" alt="nest" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Free delivery</h3>
                    <p>24/7 amazing services</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <div
                  className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                  data-wow-delay=".2s"
                >
                  <div className="banner-icon">
                    <img src="/assets/imgs/theme/icons/icon-3.svg" alt="nest" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Great daily deal</h3>
                    <p>When you sign up</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <div
                  className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                  data-wow-delay=".3s"
                >
                  <div className="banner-icon">
                    <img src="/assets/imgs/theme/icons/icon-4.svg" alt="nest" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Wide assortment</h3>
                    <p>Mega Discounts</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
                <div
                  className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                  data-wow-delay=".4s"
                >
                  <div className="banner-icon">
                    <img src="/assets/imgs/theme/icons/icon-5.svg" alt="nest" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Easy returns</h3>
                    <p>Within 30 days</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 d-xl-none">
                <div
                  className="banner-left-icon d-flex align-items-center  wow animate__animated animate__fadeInUp"
                  data-wow-delay=".5s"
                >
                  <div className="banner-icon">
                    <img src="/assets/imgs/theme/icons/icon-6.svg" alt="nest" />
                  </div>
                  <div className="banner-text">
                    <h3 className="icon-box-title">Safe delivery</h3>
                    <p>Within 30 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-padding footer-mid">
          <div className="container pt-15 pb-20">
            <div className="row">
              <div className="col">
                <div
                  className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0  wow animate__animated animate__fadeInUp"
                  data-wow-delay="0"
                >
                  <div className="logo  mb-30">
                    <Link to="/" className="mb-15">
                      <img src="/assets/imgs/theme/logo.svg" alt="logo" />
                    </Link>
                    <p className="font-lg text-heading">
                      We Care about your health!
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="footer-link-widget col  wow animate__animated animate__fadeInUp"
                data-wow-delay=".1s"
              >
                <h4 className="widget-title">Company</h4>
                <ul className="footer-list  mb-sm-5 mb-md-0">
                  <li>
                    <a href="/page-about">About Us</a>
                  </li>
                  <li>
                    <a href="/page-account">Delivery Information</a>
                  </li>
                  <li>
                    <a href="/page-contact">Contact Us</a>
                  </li>
                </ul>
              </div>
              <div
                className="footer-link-widget col  wow animate__animated animate__fadeInUp"
                data-wow-delay=".2s"
              >
                <h4 className="widget-title ">Account</h4>
                <ul className="footer-list  mb-sm-5 mb-md-0">
                  <li>
                    <a href="/page-login">Sign In</a>
                  </li>
                  <li>
                    <a href="/shop-cart">View Cart</a>
                  </li>
                  <li>
                    <a href="/shop-wishlist">My Wishlist</a>
                  </li>
                  <li>
                    <a href="/page-account">Track My Order</a>
                  </li>
                  <li>
                    <a href="/page-contact">Help Ticket</a>
                  </li>
                  <li>
                    <a href="/page-account">Shipping Details</a>
                  </li>
                </ul>
              </div>
              <div
                className="footer-link-widget col  wow animate__animated animate__fadeInUp"
                data-wow-delay=".3s"
              >
                <h4 className="widget-title ">Corporate</h4>
                <ul className="footer-list  mb-sm-5 mb-md-0">
                  <li>
                    <a href="/page-register">Become a Vendor</a>
                  </li>
                  <li>
                    <a href="/vendors-list">Our Vendors</a>
                  </li>
                </ul>
              </div>
              <div
                className="footer-link-widget col  wow animate__animated animate__fadeInUp"
                data-wow-delay=".4s"
              >
                <h4 className="widget-title ">Popular</h4>
                <ul className="footer-list  mb-sm-5 mb-md-0">
                  <li>
                    <a href="/products">Milk & Flavoured Milk</a>
                  </li>
                  <li>
                    <a href="/products">Butter and Margarine</a>
                  </li>
                  <li>
                    <a href="/products">Eggs Substitutes</a>
                  </li>
                  <li>
                    <a href="/products">Marmalades</a>
                  </li>
                  <li>
                    <a href="/products">Sour Cream and Dips</a>
                  </li>
                  <li>
                    <a href="/products">Tea & Kombucha</a>
                  </li>
                  <li>
                    <a href="/products">Cheese</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div
          className="container pb-30  wow animate__animated animate__fadeInUp"
          data-wow-delay="0"
        >
          <div className="row align-items-center">
            <div className="col-12 mb-30">
              <div className="footer-bottom"></div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <p className="font-sm mb-0">
                &copy; 2024, <strong className="text-brand">GreenSage</strong>
                <br />
                All rights reserved
              </p>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-6 text-end d-none d-md-block">
              <div className="mobile-social-icon">
                <h6>Follow Us</h6>
                <a href="https://www.facebook.com">
                  <img
                    src="/assets/imgs/theme/icons/icon-facebook-white.svg"
                    alt="facebook icon"
                  />
                </a>
                <a href="https://www.twitter.com">
                  <img
                    src="/assets/imgs/theme/icons/icon-twitter-white.svg"
                    alt="twitter icon"
                  />
                </a>
                <a href="https://www.instagram.com">
                  <img
                    src="/assets/imgs/theme/icons/icon-instagram-white.svg"
                    alt="instagram icon"
                  />
                </a>
                <a href="https://www.pinterest.com/">
                  <img
                    src="/assets/imgs/theme/icons/icon-pinterest-white.svg"
                    alt="pinterest icon"
                  />
                </a>
                <a href="https://www.youtube.com/">
                  <img
                    src="/assets/imgs/theme/icons/icon-youtube-white.svg"
                    alt="youtube icon"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
