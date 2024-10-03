import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchTopSelling } from "../../redux/action/product";
import { BACKEND_URL } from "../../config";

const BestSellerSlider = () => {
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const allProducts = await fetchTopSelling(
      `${BACKEND_URL}/products/v1/filter/v1/query?topSelling=true&pageNumber=1`,
    );

    setBestSeller(allProducts);
  };

  return (
    <>
      {bestSeller &&
        bestSeller.slice(0, 3).map((product, i) => (
          <article className="row align-items-center hover-up" key={i}>
            <figure className="col-md-4 mb-0">
              <Link to={`/products/${product["_id"]}`}>
                <img className="default-img" src={product.imageUrl} alt={`${product.name}`} />
              </Link>
            </figure>
            <div className="col-md-8 mb-0">
              <h6>
                <Link to={`/products/${product["_id"]}`}>{product.name}</Link>
              </h6>
              <div className="product-rate-cover">
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1;

                  return (
                    <span
                      key={index}
                      style={{
                        color: currentRating <= Math.round(product.averageRating) ? "#ffc107" : "#e4e5e9",
                        fontSize: "1rem",
                        margin: "1px",
                      }}
                    >
                      &#9733;
                    </span>
                  );
                })}
                <span className="font-small ml-5 text-muted"> ({Math.round(product.averageRating * 10) / 10})</span>
              </div>
              <div className="product-price">
                <span>$ {product.price["$numberDecimal"]} </span>
              </div>
            </div>
          </article>
        ))}
    </>
  );
};

export default BestSellerSlider;
