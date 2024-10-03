import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config/index";
import Cat1Tab from "../elements/FeaturedTab";
import Cat2Tab from "../elements/NewArrivalTab";
import Cat3Tab from "../elements/TrendingTab";
import axios from "axios";
import { useSelector } from "react-redux";

function CategoryTab() {
  const [active, setActive] = useState("1");
  const [catAll, setCatAll] = useState([]);
  const [cat1, setCat1] = useState([]);
  const [cat2, setCat2] = useState([]);
  const [cat3, setCat3] = useState([]);
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;

  const catPAll = async () => {
    const url =
      userInfo && userInfo.userType !== "owner"
        ? `${BACKEND_URL}/products/users/${userInfo.id}/v1/query?pageNumber=1`
        : `${BACKEND_URL}/products/v1/query?pageNumber=1`;

    const request = await axios.get(url);
    const products =
      userInfo && userInfo.userType !== "owner" ? request.data.data.productsWithDetails : request.data.data.products;

    setCatAll(products);
    setActive("1");
  };
  const catP1 = async () => {
    const request = await axios.get(`${BACKEND_URL}/products/v1/filter/v1/query?featured=true&pageNumber=1`);
    const products = await request.data.data.productsWithDetails;
    setCat1(products);
    setActive("2");
  };

  const catP2 = async () => {
    const request = await axios.get(`${BACKEND_URL}/products/v1/filter/v1/query?popular=true&pageNumber=1`);
    const products = await request.data.data.productsWithDetails;

    setCat2(products);
    setActive("3");
  };
  const catP3 = async () => {
    const request = await axios.get(`${BACKEND_URL}/products/v1/filter/v1/query?newAdded=true&pageNumber=1`);
    const products = await request.data.data.productsWithDetails;

    setCat3(products);
    setActive("4");
  };

  useEffect(() => {
    catPAll();
  }, []);

  return (
    <>
      <div className="section-title style-2 wow animate__animated animate__fadeIn">
        <h3>Popular Products</h3>
        <ul className="nav nav-tabs links" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className={active === "1" ? "nav-link active" : "nav-link"} onClick={catPAll}>
              Recommended
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={active === "2" ? "nav-link active" : "nav-link"} onClick={catP1}>
              Featured
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={active === "3" ? "nav-link active" : "nav-link"} onClick={catP2}>
              Popular
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={active === "4" ? "nav-link active" : "nav-link"} onClick={catP3}>
              New added
            </button>
          </li>
        </ul>
      </div>

      <div className="tab-content wow fadeIn animated">
        <div className={active === "1" ? "tab-pane fade show active" : "tab-pane fade"}>
          <div className="product-grid-4 row">
            <Cat1Tab products={catAll} />
          </div>
        </div>

        <div className={active === "2" ? "tab-pane fade show active" : "tab-pane fade"}>
          <div className="product-grid-4 row">
            <Cat1Tab products={cat1} />
          </div>
        </div>

        <div className={active === "3" ? "tab-pane fade show active" : "tab-pane fade"}>
          <div className="product-grid-4 row">
            <Cat3Tab products={cat2} />
          </div>
        </div>
        <div className={active === "4" ? "tab-pane fade show active" : "tab-pane fade"}>
          <div className="product-grid-4 row">
            <Cat2Tab products={cat3} />
          </div>
        </div>
      </div>
    </>
  );
}
export default CategoryTab;
