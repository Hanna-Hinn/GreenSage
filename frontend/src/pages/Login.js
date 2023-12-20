import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";

function Login() {
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
      <Layout parent="Home" sub="Pages" subChild="Login & Register">
        <div className="page-content pt-150 pb-150">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                <div className="row">
                  <div className="col-lg-6 pr-30 d-none d-lg-block">
                    <img
                      className="border-radius-15"
                      src="assets/imgs/page/login-1.png"
                      alt="nest"
                    />
                  </div>
                  <div className="col-lg-6 col-md-8">
                    <div className="login_wrap widget-taber-content background-white">
                      <div className="padding_eight_all bg-white">
                        <div className="heading_s1">
                          <h1 className="mb-5">Login</h1>
                          <p className="mb-30">
                            Don't have an account?{" "}
                            <Link to="/page-register">Create here</Link>
                          </p>
                        </div>
                        <form method="post">
                          <div className="form-group">
                            <input
                              type="text"
                              required=""
                              name="email"
                              placeholder="Username or Email *"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              required=""
                              type="password"
                              name="password"
                              placeholder="Your password *"
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
                          <div className="login_footer form-group mb-50">
                            <div className="chek-form">
                              <div className="custome-checkbox">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="checkbox"
                                  id="exampleCheckbox1"
                                  value=""
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleCheckbox1"
                                >
                                  <span>Remember me</span>
                                </label>
                              </div>
                            </div>
                            <a
                              className="text-muted"
                              href="/page-forgot-password"
                            >
                              Forgot password?
                            </a>
                          </div>
                          <div className="form-group">
                            <button
                              type="submit"
                              className="btn btn-heading btn-block hover-up"
                              name="login"
                            >
                              Log in
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

export default Login;
