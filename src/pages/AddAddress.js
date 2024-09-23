import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddAddress() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState({});
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/page-login");
    }
  }, []);

  const handleSubmit = async () => {
    try {
      // const response = await axios.post(
      //   `${BACKEND_URL}/Addresses/${userInfo.id}`,
      //   addresses
      // );
      setSuccess("Address Submitted Successfully");
      navigate("/page-account");
    } catch (e) {
      setError(e.message ? e.message : "Something Went Wrong!!!");
    }
  };

  return (
    <>
      <Layout parent="Home" sub="Account" subChild="Add Address">
        <div className="page-content pt-150 pb-150">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                <div className="row">
                  <div className="col-lg-6 col-md-8">
                    <div className="login_wrap widget-taber-content background-white">
                      <div className="padding_eight_all bg-white">
                        <form onSubmit={(e) => e.preventDefault()}>
                          <label style={{ marginBottom: 10 }}>
                            Please Enter your address Info:
                          </label>
                          <div>
                            <div className="form-group">
                              <input
                                type="text"
                                required
                                name="street"
                                placeholder="Street..."
                                onChange={(e) => {
                                  setAddresses({
                                    ...addresses,
                                    street: e.target.value,
                                  });
                                }}
                              />
                            </div>

                            <div className="form-group">
                              <input
                                type="text"
                                required
                                name="postalCode"
                                placeholder="postalCode..."
                                onChange={(e) => {
                                  setAddresses({
                                    ...addresses,
                                    postalCode: e.target.value,
                                  });
                                }}
                              />
                            </div>

                            <div className="form-group">
                              <input
                                type="text"
                                required
                                name="state"
                                placeholder="State..."
                                onChange={(e) => {
                                  setAddresses({
                                    ...addresses,
                                    state: e.target.value,
                                  });
                                }}
                              />
                            </div>

                            <div className="form-group">
                              <input
                                type="text"
                                required
                                name="city"
                                placeholder="City..."
                                onChange={(e) => {
                                  setAddresses({
                                    ...addresses,
                                    city: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <button
                              className="btn submit"
                              onClick={handleSubmit}
                            >
                              Add Address
                            </button>
                          </div>
                          {error && <p style={{ color: "red" }}>{error}</p>}
                          {success && (
                            <p style={{ color: "green" }}>{success}</p>
                          )}
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
