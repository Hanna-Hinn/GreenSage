import React, { useEffect, useState } from "react";
import ProductDetails from "../components/ecommerce/ProductDetails";
import Layout from "../components/layout/Layout";
import { findProductIndex } from "../util/util";
import { server } from "../config/index";
import { useParams } from "react-router-dom";

const ProductId = () => {
  const [product, setProduct] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`${server}/static/product.json`);
      const data = await response.json();

      const index = findProductIndex(data, slug);
      setProduct(data[index]);
    };
    fetchProduct();
  }, [slug]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Layout parent="Home" sub="Shop" subChild={product.title}>
        <div className="container">
          <ProductDetails product={product} />
        </div>
      </Layout>
    </>
  );
};

export default ProductId;
