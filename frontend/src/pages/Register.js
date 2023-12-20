import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";

function Register() {
  // Needs to handle the Event of the Form

  const [securityCode, setSecurityCode] = useState("");

  useEffect(() => {
    const generateCode = () => {
      const randomDigits = Array(4)
        .fill()
        .map(() => Math.floor(Math.random() * 10)); // Generate 4 random digits
      setSecurityCode(randomDigits.join("")); // Join digits into a string
    };

    generateCode(); // Generate code on initial render
  }, []);

  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="Privacy">
        <div className="page-content pt-150 pb-150">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                <div className="row">
                  <div className="col-lg-6 col-md-8">
                    <div className="login_wrap widget-taber-content background-white">
                      <div className="padding_eight_all bg-white">
                        <div className="heading_s1 mb-50">
                          <h1 className="mb-5">Create an Account</h1>
                          <p>
                            Already have an account?{" "}
                            <Link to="/page-login">Log in instead!</Link>
                          </p>
                        </div>
                        <form method="post">
                          <div className="form-group">
                            <input
                              type="text"
                              required=""
                              name="username"
                              placeholder="Username"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              required=""
                              name="email"
                              placeholder="Email"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              required=""
                              type="password"
                              name="password"
                              placeholder="Password"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              required=""
                              type="password"
                              name="password"
                              placeholder="Confirm password"
                            />
                          </div>
                          <div className="login_footer form-group">
                            <div className="chek-form">
                              <input
                                type="text"
                                required=""
                                name="email"
                                placeholder="Security code *"
                              />
                            </div>
                            <span className="security-code">
                              {securityCode.split("").map((digit, index) => (
                                <b
                                  key={index}
                                  className={`text-${
                                    ["new", "hot", "sale", "best"][index]
                                  }`}
                                >
                                  {digit}
                                </b>
                              ))}
                            </span>
                          </div>
                          <div className="payment_option mb-50">
                            <div className="custome-radio">
                              <input
                                className="form-check-input"
                                required=""
                                type="radio"
                                name="payment_option"
                                id="exampleRadios3"
                                defaultChecked=""
                              />
                              <label
                                className="form-check-label"
                                htmlFor="exampleRadios3"
                                data-bs-toggle="collapse"
                                data-target="#bankTranfer"
                                aria-controls="bankTranfer"
                              >
                                I am a customer
                              </label>
                            </div>
                            <div className="custome-radio">
                              <input
                                className="form-check-input"
                                required=""
                                type="radio"
                                name="payment_option"
                                id="exampleRadios4"
                                defaultChecked=""
                              />
                              <label
                                className="form-check-label"
                                htmlFor="exampleRadios4"
                                data-bs-toggle="collapse"
                                data-target="#checkPayment"
                                aria-controls="checkPayment"
                              >
                                I am a vendor
                              </label>
                            </div>
                          </div>
                          <div className="login_footer form-group mb-50">
                            <div className="chek-form">
                              <div className="custome-checkbox">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="checkbox"
                                  id="exampleCheckbox12"
                                  value=""
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleCheckbox12"
                                >
                                  <span>I agree to terms &amp; Policy.</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="form-group mb-30">
                            <button
                              type="submit"
                              className="btn btn-fill-out btn-block hover-up font-weight-bold"
                              name="login"
                            >
                              Submit &amp; Register
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

export default Register;
