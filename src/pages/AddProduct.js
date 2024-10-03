import Layout from "../components/layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

export default function AddProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;
  const token = localStorage.getItem("sageToken");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const urlParams = new URLSearchParams(location.search);
  const productId = urlParams.get("productId");
  const [error, setError] = useState({});
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});

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
        const { data: productData } = await axios.get(`${BACKEND_URL}/products/${productId}`);
        setFormData({
          name: productData.data.product.name,
          description: productData.data.product.description,
          price: productData.data.product.price["$numberDecimal"],
          availableInStock: productData.data.product.availableInStock,
          imageUrl: productData.data.product.imageUrl,
          categoryId: productData.data.product.categoryId,
        });
      }

      const { data: categoriesData } = await axios.get(`${BACKEND_URL}/categories`);

      setCategories(categoriesData.data);
    } catch (e) {
      console.log(e);
      toast(e.message ? e.message : "Something Went Wrong !");
    }
  };

  const handleSubmit = async () => {
    const isValid = validateInputs();
    if (!isValid) {
      return;
    }

    try {
      let response;
      if (!productId) {
        response = await axios.post(`${BACKEND_URL}/products`, formData, config);
      } else {
        response = await axios.put(`${BACKEND_URL}/products/${productId}`, formData, config);
      }

      if (response.data.success) {
        toast("Product Saved !");
        navigate("/page-account");
      }
    } catch (e) {
      console.log(e);
      toast(e?.message || "Something Went Wrong !");
    }
  };

  const validateInputs = () => {
    const name = formData.name ? formData.name : formData.title;
    const imageUrl = formData["imageUrl"];

    if (!name || name.trim() === "") {
      setError({ ...error, name: "Name is Required!!!" });
      return false;
    }

    if (!imageUrl || imageUrl.trim() === "" || !validateImageUrl(imageUrl)) {
      setError({ ...error, imageUrl: "Entered Image URL not Valid!!!" });
      return false;
    }
    return true;
  };

  function validateImageUrl(url) {
    const imageUrlRegex = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg)$/i;
    return imageUrlRegex.test(url);
  }

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
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div className="form-group">
                            <label htmlFor="name">Product Name:</label>
                            <input
                              type="text"
                              required
                              name="name"
                              id="name"
                              placeholder="Product Name ...."
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                });
                              }}
                              defaultValue={formData?.name || formData.title}
                            />
                            {error.name && (
                              <>
                                <br />
                                <span style={{ color: "red" }}>{error.name}</span>
                              </>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="description">Product Description:</label>
                            <textarea
                              type="text"
                              required
                              name="description"
                              id="description"
                              placeholder="Product Description ...."
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  description: e.target.value,
                                });
                              }}
                              defaultValue={formData.description}
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
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  price: e.target.value,
                                });
                              }}
                              defaultValue={formData.price}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="availableInStock">Product Stock:</label>
                            <input
                              type="number"
                              required
                              name="availableInStock"
                              id="availableInStock"
                              placeholder="Product availableInStock ...."
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  availableInStock: e.target.value,
                                });
                              }}
                              defaultValue={formData.availableInStock}
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
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  imageUrl: e.target.value,
                                });
                              }}
                              defaultValue={formData.imageUrl}
                            />
                            {error.imageUrl && (
                              <>
                                <br />
                                <span style={{ color: "red" }}>{error.imageUrl}</span>
                              </>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="category">Please Select Category:</label>
                            <select
                              id="category"
                              name="categoryId"
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  categoryId: e.target.value,
                                });
                              }}
                            >
                              <option value="other">Select One of the below:</option>
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
                            <button className="submit" onClick={handleSubmit}>
                              Save
                            </button>
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
