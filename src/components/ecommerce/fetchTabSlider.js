import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { fetchByCategory } from "../../redux/action/product";
import { BACKEND_URL } from "../../config/index";
import FeaturedSlider from "../sliders/Featured";
import NewArrivalTabSlider from "../sliders/NewArrivalTab";
import TrendingSlider from "../sliders/Trending";
import axios from "axios";

function FetchTabSlider() {
  const [active, setActive] = useState("1");
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [newArrival, setNewArrival] = useState([]);

  const featuredProduct = async () => {
    const request = await axios.get(`${BACKEND_URL}/products/v1/filter/v1/query?featured=true&pageNumber=1`);
    const allProducts = await request.data.data.productsWithDetails;

    setFeatured(allProducts);
    setActive("1");
  };

  const trendingProduct = async () => {
    const request = await axios.get(`${BACKEND_URL}/products/v1/filter/v1/query?popular=true&pageNumber=1`);
    const products = await request.data.data.productsWithDetails;
    setTrending(products);
    setActive("2");
  };
  const newArrivalProduct = async () => {
    const request = await axios.get(`${BACKEND_URL}/products/v1/filter/v1/query?newAdded=true&pageNumber=1`);
    const products = await request.data.data.productsWithDetails;

    setNewArrival(products);
    setActive("3");
  };

  useEffect(() => {
    featuredProduct();
  }, []);

  return (
    <>
      <div className="section-title wow animate__animated animate__fadeIn">
        <h3 className="">Daily Best Sells</h3>

        <ul className="nav nav-tabs links" id="myTab-1" role="tablist">
          <li className="nav-item" role="presentation">
            <button className={active === "1" ? "nav-link active" : "nav-link"} onClick={featuredProduct}>
              Featured
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={active === "2" ? "nav-link active" : "nav-link"} onClick={trendingProduct}>
              Popular
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={active === "3" ? "nav-link active" : "nav-link"} onClick={newArrivalProduct}>
              New added
            </button>
          </li>
        </ul>
      </div>

      <div className="row">
        <div className="col-lg-3 d-none d-lg-flex wow animate__animated animate__fadeIn">
          <div className="banner-img style-2">
            <div className="banner-text">
              <h2 className="mb-100">Bring nature into your home</h2>

              <Link to="/products" className="btn btn-xs">
                Shop Now <i className="fi-rs-arrow-small-right"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-12">
          <div className="tab-content wow fadeIn animated" id="myTabContent">
            <div className={active === "1" ? "tab-pane fade show active" : "tab-pane fade"}>
              <div className="carausel-4-columns-cover card-product-small arrow-center position-relative">
                <FeaturedSlider products={featured} />
              </div>
            </div>

            <div className={active === "2" ? "tab-pane fade show active" : "tab-pane fade"}>
              <div className="carausel-4-columns-cover card-product-small arrow-center position-relative">
                <TrendingSlider products={trending} />
              </div>
            </div>
            <div className={active === "3" ? "tab-pane fade show active" : "tab-pane fade"}>
              <div className="carausel-4-columns-cover card-product-small arrow-center position-relative">
                <NewArrivalTabSlider products={newArrival} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default FetchTabSlider;
