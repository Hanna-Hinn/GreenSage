import { Link } from "react-router-dom";
import { useState } from "react";
import useClickOutside from "../../util/outsideClick";

const MobileMenu = ({ isToggled, toggleClick }) => {
  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
  });

  const handleToggle = (key) => {
    if (isActive.key === key) {
      setIsActive({
        status: false,
      });
    } else {
      setIsActive({
        status: true,
        key,
      });
    }
  };

  let domNode = useClickOutside(() => {
    setIsActive({
      status: false,
    });
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    console.log("Click");
    console.log("Before " + isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
    console.log("After " + isMenuOpen);
  };
  return (
    <>
      <div
        className={
          isToggled
            ? "mobile-header-active mobile-header-wrapper-style sidebar-visible"
            : "mobile-header-active mobile-header-wrapper-style"
        }
      >
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-top">
            <div className="mobile-header-logo">
              <Link to="/">
                <img src="/assets/imgs/theme/logo.svg" alt="logo" />
              </Link>
            </div>
            <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
              <button
                className="close-style search-close"
                onClick={toggleClick}
              >
                <i className="icon-top"></i>
                <i className="icon-bottom"></i>
              </button>
            </div>
          </div>
          <div className="mobile-header-content-area">
            <div className="mobile-search search-style-3 mobile-header-border">
              <form action="#">
                <input type="text" placeholder="Search for items…" />
                <button type="submit">
                  <i className="fi-rs-search"></i>
                </button>
              </form>
            </div>
            <div className="mobile-menu-wrap mobile-header-border">
              <div className="main-categori-wrap mobile-header-border">
                <button
                  className="categori-button-active-2"
                  onClick={handleToggleMenu}
                >
                  <span className="fi-rs-apps"></span> Browse Categories
                </button>
                <div
                  className={`categori-dropdown-wrap categori-dropdown-active-small ${
                    isMenuOpen ? "active" : ""
                  }`}
                >
                  <ul>
                    <li>
                      <Link to="/shop-grid-right">
                        <i className="evara-font-dress"></i>
                        Women's Clothing
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-grid-right">
                        <i className="evara-font-tshirt"></i>
                        Men's Clothing
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <Link to="/shop-grid-right">
                        <i className="evara-font-smartphone"></i> Cellphones
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-grid-right">
                        <i className="evara-font-desktop"></i>
                        Computer & Office
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-grid-right">
                        <i className="evara-font-cpu"></i>
                        Consumer Electronics
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-grid-right">
                        <i className="evara-font-home"></i>
                        Home & Garden
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-grid-right">
                        <i className="evara-font-high-heels"></i>
                        Shoes
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-grid-right">
                        <i className="evara-font-teddy-bear"></i>
                        Mother & Kids
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-grid-right">
                        <i className="evara-font-kite"></i>
                        Outdoor fun
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <nav>
                <ul className="mobile-menu" ref={domNode}>
                  <li
                    className={
                      isActive.key === 1
                        ? "menu-item-has-children active"
                        : "menu-item-has-children"
                    }
                  >
                    <span
                      className="menu-expand"
                      onClick={() => handleToggle(1)}
                    ></span>
                    <Link to="/">Home</Link>
                  </li>
                  <li
                    className={
                      isActive.key === 1
                        ? "menu-item-has-children active"
                        : "menu-item-has-children"
                    }
                  >
                    <span
                      className="menu-expand"
                      onClick={() => handleToggle(1)}
                    ></span>
                    <Link to="/page-about">About Us</Link>
                  </li>
                  <li
                    className={
                      isActive.key === 1
                        ? "menu-item-has-children active"
                        : "menu-item-has-children"
                    }
                  >
                    <span
                      className="menu-expand"
                      onClick={() => handleToggle(1)}
                    ></span>
                    <Link to="/vendors-list">Vendors</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="mobile-header-info-wrap mobile-header-border">
              <div className="single-mobile-header-info mt-30">
                <Link to="/page-contact">Contact</Link>
              </div>
              <div className="single-mobile-header-info">
                <Link to="/page-register">Sign Up</Link>
              </div>
              <div className="single-mobile-header-info">
                <Link to="/page-login">Log In</Link>
              </div>
            </div>
            <div className="mobile-social-icon">
              <h5 className="mb-15 text-grey-4">Follow Us</h5>
              <Link to="#">
                <img
                  src="/assets/imgs/theme/icons/icon-facebook.svg"
                  alt="nest"
                />
              </Link>
              <Link to="#">
                <img
                  src="/assets/imgs/theme/icons/icon-twitter.svg"
                  alt="nest"
                />
              </Link>
              <Link to="#">
                <img
                  src="/assets/imgs/theme/icons/icon-instagram.svg"
                  alt="nest"
                />
              </Link>
              <Link to="#">
                <img
                  src="/assets/imgs/theme/icons/icon-pinterest.svg"
                  alt="nest"
                />
              </Link>
              <Link to="#">
                <img
                  src="/assets/imgs/theme/icons/icon-youtube.svg"
                  alt="nest"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
