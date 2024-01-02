import React, { useEffect, useState } from "react";
import ProductDetails from "../components/ecommerce/ProductDetails";
import Layout from "../components/layout/Layout";
import { BACKEND_URL } from "../config/index";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductId = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`${BACKEND_URL}/products/${id}`);
      const data = response.data.data.product;

      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Layout parent="Home" sub="Shop" subChild={product.name}>
        <div className="container">
          <ProductDetails product={product} />
        </div>
      </Layout>
    </>
  );
};

export default ProductId;
