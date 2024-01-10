import React, { useEffect, useState } from "react";
import ProductDetails from "../components/ecommerce/ProductDetails";
import Layout from "../components/layout/Layout";
import { BACKEND_URL } from "../config/index";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductId = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`${BACKEND_URL}/products/${id}`);
      const data = response.data.data.product;
      const relatedProducts = response.data.data.relatedProducts;
      setProduct(data);
      setRelatedProducts(relatedProducts);
    };
    fetchProduct().catch((e) => {
      console.log(e);
      navigate("/page-not-found");
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Layout parent="Home" sub="Shop" subChild={product.name}>
        <div className="container">
          <ProductDetails product={product} relatedProducts={relatedProducts} />
        </div>
      </Layout>
    </>
  );
};

export default ProductId;
