/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import CategoryProduct2 from '../ecommerce/Filter/CategoryProduct2'
import Search from '../ecommerce/Search'
import { logout } from '../../redux/action/auth'
import axios from 'axios'
import { BACKEND_URL } from '../../config'

const Header = ({ user, totalCartItems, toggleClick, totalWishlistItems }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const currentPathname = location.pathname
  const [isToggled, setToggled] = useState(false)
  const [scroll, setScroll] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const userLogin = useSelector((state) => state.auth)
  const { userInfo } = userLogin

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const scrollCheck = window.scrollY >= 100
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck)
      }
    })
    if (userInfo) {
      fetchData()
    }
  }, [userInfo])

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/products/${userInfo.id}/notifications`
      )
      if (data.success) {
        setNotifications(data.data)
      } else {
        setNotifications([])
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleToggle = () => {
    setToggled(!isToggled)
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  const toggleNotifications = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <header className="header-area header-style-1 header-height-2">
        <div className="header-top header-top-ptb-1 d-none d-lg-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-4">
                <div className="header-info">
                  <ul>
                    <li>
                      <Link to="/page-about">About Us</Link>
                    </li>
                    {user ? (
                      <>
                        <li>
                          <Link to="/page-account">My Account</Link>
                        </li>
                        {user.userType !== 'owner' && (
                          <>
                            <li>
                              <Link to="/shop-wishlist">Wishlist</Link>
                            </li>
                            <li>
                              <Link to="/shop-cart">My Cart</Link>
                            </li>
                          </>
                        )}
                      </>
                    ) : (
                      <li>
                        <Link to="/page-login">Sign In</Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-xl-6 col-lg-4">
                <div className="text-center">
                  <div id="news-flash" className="d-inline-block">
                    Fresh Picks! Unbeatable Prices. Shop Now! 🧅🛒 #FreshDeals
                    #GoGreen
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middle d-none d-lg-block">
          <div className="container">
            <div className="header-wrap">
              <div className="logo logo-width-1">
                <Link to="/">
                  <img src="/assets/imgs/theme/logo.svg" alt="logo" />
                </Link>
              </div>
              <div className="header-right">
                <div className="search-style-1">
                  <Search />
                </div>
                <div className="header-action-right">
                  <div className="header-action-2">
                    {user && user.userType !== 'owner' && (
                      <>
                        <div className="header-action-icon-2 notification-container">
                          <a
                            className="mini-cart-icon"
                            onClick={toggleNotifications}
                          >
                            <img
                              alt="notification"
                              src="/assets/imgs/theme/icons/notification-icon.png"
                            />
                            {notifications.length > 0 && (
                              <span className="pro-count blue"></span>
                            )}
                          </a>
                          <span className="lable">Notification</span>
                          {isOpen && (
                            <ul className="notifications-list">
                              {notifications.map((notification) => (
                                <li
                                  key={notification.notificationId}
                                  className="notification"
                                >
                                  <Link
                                    to={
                                      notification.type === 'Status updated'
                                        ? `/orders/${notification.status.orderId}`
                                        : `/products/${notification.productDetails['_id']}`
                                    }
                                  >
                                    {notification.msg}{' '}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="header-action-icon-2">
                          <Link to="/shop-wishlist">
                            <img
                              className="svgInject"
                              alt="wishlist"
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
                              alt="cart"
                              src="/assets/imgs/theme/icons/icon-cart.svg"
                            />
                            <span className="pro-count blue">
                              {totalCartItems}
                            </span>
                          </Link>
                          <Link to="/shop-cart">
                            <span className="lable">Cart</span>
                          </Link>
                        </div>
                      </>
                    )}

                    <div className="header-action-icon-2">
                      <Link to="/page-account">
                        <img
                          className="svgInject"
                          alt="user"
                          src="/assets/imgs/theme/icons/icon-user.svg"
                        />
                      </Link>
                      <Link to={!user ? '/page-login' : '/page-account'}>
                        <span className="lable ml-0">Account</span>
                      </Link>
                      <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                        {user ? (
                          <ul>
                            <li>
                              <Link to="/page-account">
                                <i className="fi fi-rs-user mr-10"></i>
                                My Account
                              </Link>
                            </li>
                            <li>
                              <Link onClick={logoutHandler} to="/">
                                <i className="fi fi-rs-sign-out mr-10"></i>
                                Sign out
                              </Link>
                            </li>
                          </ul>
                        ) : (
                          <ul>
                            <li>
                              <Link to="/page-register">
                                <i className="fi fi-rs-user mr-10"></i>
                                Register
                              </Link>
                            </li>
                            <li>
                              <Link to="/page-login">
                                <i className="fi fi-rs-user mr-10"></i>
                                Login
                              </Link>
                            </li>
                          </ul>
                        )}
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
              ? 'header-bottom header-bottom-bg-color sticky-bar stick'
              : 'header-bottom header-bottom-bg-color sticky-bar'
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
                        ? 'categories-dropdown-wrap categories-dropdown-active-large font-heading open'
                        : 'categories-dropdown-wrap categories-dropdown-active-large font-heading'
                    }
                  >
                    <div className="d-flex categori-dropdown-inner">
                      <CategoryProduct2 />
                    </div>
                  </div>
                </div>
                <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block  font-heading">
                  <nav>
                    <ul>
                      <li>
                        <Link
                          to="/"
                          className={currentPathname === '/' ? 'active' : ''}
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/page-about"
                          className={
                            currentPathname === '/page-about' ? 'active' : ''
                          }
                        >
                          About
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/vendors-list"
                          className={
                            currentPathname === '/vendors-list' ? 'active' : ''
                          }
                        >
                          Vendors
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/page-contact"
                          className={
                            currentPathname === '/page-contact' ? 'active' : ''
                          }
                        >
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
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
                  {user && user.userType !== 'owner' && (
                    <>
                      <div className="header-action-icon-2">
                        <Link to="/shop-wishlist">
                          <img
                            alt="wishlist"
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
                            alt="cart"
                            src="/assets/imgs/theme/icons/icon-cart.svg"
                          />
                          <span className="pro-count white">
                            {totalCartItems}
                          </span>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.userInfo,
  totalCartItems: state.cart.length,
  totalWishlistItems: state.wishlist.length,
})

export default connect(mapStateToProps, null)(Header)
