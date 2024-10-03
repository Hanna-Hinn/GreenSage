import { Link } from "react-router-dom";
import { useState } from "react";
import useClickOutside from "../../util/outsideClick";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action/auth";

const MobileMenu = ({ isToggled, toggleClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;

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
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    navigate(`/products?search=${searchTerm}`);
    setSearchTerm("");
  };

  const logoutHandler = () => {
    dispatch(logout());
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
              <button className="close-style search-close" onClick={toggleClick}>
                <i className="icon-top"></i>
                <i className="icon-bottom"></i>
              </button>
            </div>
          </div>
          <div className="mobile-header-content-area">
            <div className="mobile-search search-style-3 mobile-header-border">
              <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Search for items…" onChange={(e) => setSearchTerm(e.target.value)} />
                <button type="submit" onClick={handleSearch}>
                  <i className="fi-rs-search"></i>
                </button>
              </form>
            </div>
            <div className="mobile-menu-wrap mobile-header-border">
              <div className="main-categori-wrap mobile-header-border">
                <Link className="categori-button-active-2" onClick={handleToggleMenu}>
                  <span className="fi-rs-apps"></span> Browse Categories
                </Link>
                {isMenuOpen && (
                  <div>
                    <ul>
                      <li>
                        <Link to="/products">
                          <i className="evara-font-dress"></i>
                          Herbs
                        </Link>
                      </li>
                      <li>
                        <Link to="/products">
                          <i className="evara-font-dress"></i>
                          Vegetables
                        </Link>
                      </li>
                      <li>
                        <Link to="/products">
                          <i className="evara-font-dress"></i>
                          Fruits
                        </Link>
                      </li>
                      <li>
                        <Link to="/products">
                          <i className="evara-font-dress"></i>
                          Others
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <nav>
                <ul className="mobile-menu" ref={domNode}>
                  <li className={isActive.key === 1 ? "menu-item-has-children active" : "menu-item-has-children"}>
                    <span className="menu-expand" onClick={() => handleToggle(1)}></span>
                    <Link to="/">Home</Link>
                  </li>
                  <li className={isActive.key === 1 ? "menu-item-has-children active" : "menu-item-has-children"}>
                    <span className="menu-expand" onClick={() => handleToggle(1)}></span>
                    <Link to="/page-about">About Us</Link>
                  </li>
                  <li className={isActive.key === 1 ? "menu-item-has-children active" : "menu-item-has-children"}>
                    <span className="menu-expand" onClick={() => handleToggle(1)}></span>
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
                <Link to="/shop-notification">Notifications</Link>
              </div>
              {userInfo ? (
                <>
                  <div className="single-mobile-header-info">
                    <Link to="/page-account">My Account</Link>
                  </div>
                  <div className="single-mobile-header-info">
                    <Link onClick={logoutHandler} to="/page-login">
                      Logout
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="single-mobile-header-info">
                    <Link to="/page-register">Sign Up</Link>
                  </div>
                  <div className="single-mobile-header-info">
                    <Link to="/page-login">Log In</Link>
                  </div>
                </>
              )}
            </div>
            <div className="mobile-social-icon">
              <h5 className="mb-15 text-grey-4">Follow Us</h5>
              <Link to="www.facebook.com">
                <img src="/assets/imgs/theme/icons/icon-facebook.svg" alt="Facebook" />
              </Link>
              <Link to="www.twitter.com">
                <img src="/assets/imgs/theme/icons/icon-twitter.svg" alt="Twitter" />
              </Link>
              <Link to="www.instagram.com">
                <img src="/assets/imgs/theme/icons/icon-instagram.svg" alt="Instagram" />
              </Link>
              <Link to="www.pinterest.com">
                <img src="/assets/imgs/theme/icons/icon-pinterest.svg" alt="Pinterest" />
              </Link>
              <Link to="www.youtube.com">
                <img src="/assets/imgs/theme/icons/icon-youtube.svg" alt="Youtube" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
