import React, { useState } from "react";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import Header from "./Header";
import MobileMenu from "./MobileMenu";

const Layout = ({ children, parent, sub, subChild, noBreadcrumb, headerStyle }) => {
  const [isToggled, setToggled] = useState(false);
  const toggleClick = () => {
    setToggled(!isToggled);
    isToggled
      ? document.querySelector("body").classList.remove("mobile-menu-active")
      : document.querySelector("body").classList.add("mobile-menu-active");
  };

  return (
    <>
      {isToggled && <div className="body-overlay-1" onClick={toggleClick}></div>}

      <Header headerStyle={headerStyle} isToggled={isToggled} toggleClick={toggleClick} />
      <MobileMenu isToggled={isToggled} toggleClick={toggleClick} />
      <main className="main">
        <Breadcrumb parent={parent} sub={sub} subChild={subChild} noBreadcrumb={noBreadcrumb} />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
