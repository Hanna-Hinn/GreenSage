import React from "react";
import { useLocation } from "react-router-dom";

export default function Aside() {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <aside class="navbar-aside" id="offcanvas_aside">
      <div class="aside-top">
        <a href="/" class="brand-wrap">
          <img
            src="/assets/imgs/theme/logo.svg"
            class="logo"
            alt="GreenSage Vendor Dashboard"
          />
        </a>
        <div>
          <button class="btn btn-icon btn-aside-minimize">
            <i class="text-muted material-icons md-menu_open"></i>
          </button>
        </div>
      </div>
      <nav>
        <ul class="menu-aside">
          <li
            class={
              "menu-item" + pathName === "/" || pathName === "" ? "active" : ""
            }
          >
            <a class="menu-link" href="/vendor/">
              <i class="icon material-icons md-home"></i>
              <span class="text">Dashboard</span>
            </a>
          </li>
          <li
            class={
              "menu-item " + pathName === "/page-products-list" ? "active" : ""
            }
          >
            <a class="menu-link" href="/page-products-list">
              <i class="icon material-icons md-shopping_bag"></i>
              <span class="text">Products</span>
            </a>
          </li>
          <li
            class={"menu-item " + pathName === "/page-orders" ? "active" : ""}
          >
            <a class="menu-link" href="/page-orders">
              <i class="icon material-icons md-shopping_cart"></i>
              <span class="text">Orders</span>
            </a>
          </li>
          <li
            class={
              "menu-item " + pathName === "/page-form-product" ? "active" : ""
            }
          >
            <a class="menu-link" href="/page-form-product">
              <i class="icon material-icons md-add_box"></i>
              <span class="text">Add product</span>
            </a>
          </li>
          <li
            class={
              "menu-item " + pathName === "/page-transactions" ? "active" : ""
            }
          >
            <a class="menu-link" href="/page-transactions">
              <i class="icon material-icons md-monetization_on"></i>
              <span class="text">Transactions</span>
            </a>
          </li>
          <li
            class={"menu-item " + pathName === "/page-reviews" ? "active" : ""}
          >
            <a class="menu-link" href="/page-reviews">
              <i class="icon material-icons md-comment"></i>
              <span class="text">Reviews</span>
            </a>
          </li>
          <li
            class={"menu-item " + pathName === "/page-brands" ? "active" : ""}
          >
            <a class="menu-link" href="/page-brands">
              <i class="icon material-icons md-stars"></i>
              <span class="text">Brands</span>
            </a>
          </li>
        </ul>
        <hr />
        <ul class="menu-aside">
          <li class="menu-item">
            <a class="menu-link" href="page-settings.html">
              <i class="icon material-icons md-settings"></i>
              <span class="text">Settings</span>
            </a>
          </li>
        </ul>
        <br />
        <br />
      </nav>
    </aside>
  );
}
