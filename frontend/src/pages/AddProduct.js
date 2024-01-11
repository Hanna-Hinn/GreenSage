import Layout from "../components/layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { useFormik } from "formik";

export default function AddProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;
  const token = localStorage.getItem("sageToken");
  const urlParams = new URLSearchParams(location.search);
  const productId = urlParams.get("productId");
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      availableInStock: product?.availableInStock || 0,
      imageUrl: product?.imageUrl || "",
      categoryId: product?.categoryId || "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (!userInfo || userInfo.userType !== "owner") {
      navigate("/page-not-found");
    } else {
      fetchData();
    }
  }, [userInfo]);

  const fetchData = async () => {
    try {
      if (productId) {
        const { data: productData } = await axios.get(
          `${BACKEND_URL}/products/${productId}`
        );
        setProduct(productData.data.product);
      }

      const { data: categoriesData } = await axios.get(
        `${BACKEND_URL}/categories`
      );

      setCategories(categoriesData.data);
    } catch (e) {
      console.log(e);
      toast(e.message ? e.message : "Something Went Wrong !");
    }
  };

  return (
    <>
      <Layout parent="Home" sub="Account" subChild="Add Product">
        <div className="page-content pt-150 pb-150">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                <div className="row">
                  <div className="col-lg-6 col-md-8">
                    <div className="login_wrap widget-taber-content background-white">
                      <div className="padding_eight_all bg-white">
                        <form onSubmit={formik.handleSubmit}>
                          <div className="form-group">
                            <label htmlFor="name">Product Name:</label>
                            <input
                              type="text"
                              required
                              name="name"
                              id="name"
                              placeholder="Product Name ...."
                              onChange={formik.handleChange}
                              value={formik.values.name}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="description">
                              Product Description:
                            </label>
                            <textarea
                              type="text"
                              required
                              name="description"
                              id="description"
                              placeholder="Product Description ...."
                              onChange={formik.handleChange}
                              value={formik.values.description}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="price">Product price:</label>
                            <input
                              type="number"
                              required
                              name="price"
                              id="price"
                              placeholder="Product price ...."
                              onChange={formik.handleChange}
                              value={formik.values.price}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="availableInStock">
                              Product Stock:
                            </label>
                            <input
                              type="number"
                              required
                              name="availableInStock"
                              id="availableInStock"
                              placeholder="Product availableInStock ...."
                              onChange={formik.handleChange}
                              value={formik.values.availableInStock}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="imageUrl">Product imageUrl:</label>
                            <input
                              type="url"
                              required
                              name="imageUrl"
                              id="imageUrl"
                              placeholder="Product imageUrl ...."
                              onChange={formik.handleChange}
                              value={formik.values.imageUrl}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="category">
                              Please Select Category:
                            </label>
                            <select
                              id="category"
                              name="categoryId"
                              onChange={formik.handleChange}
                              // value={formik.values.categoryId}
                            >
                              <option>Select One of the below:</option>
                              {categories &&
                                categories.map((cat) => {
                                  return (
                                    <option key={cat["_id"]} value={cat["_id"]}>
                                      {cat.name}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                          <div className="form-group">
                            <button type="submit">Save</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
