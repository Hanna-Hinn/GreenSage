import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";

export default function ForgotPassword() {
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
        <div class="page-content pt-150 pb-150">
          <div class="container">
            <div class="row">
              <div class="col-xl-4 col-lg-6 col-md-12 m-auto">
                <div class="login_wrap widget-taber-content background-white">
                  <div class="padding_eight_all bg-white">
                    <div class="heading_s1">
                      <img
                        class="border-radius-15"
                        src="assets/imgs/page/forgot_password.svg"
                        alt=""
                      />
                      <h2 class="mb-15 mt-15">Forgot your password?</h2>
                      <p class="mb-30">
                        Not to worry, we got you! Let’s get you a new password.
                        Please enter your email address or your Username.
                      </p>
                    </div>
                    <form method="post">
                      <div class="form-group">
                        <input
                          type="text"
                          required=""
                          name="email"
                          placeholder="Username or Email *"
                        />
                      </div>

                      <div class="login_footer form-group">
                        <div class="chek-form">
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
                      <div class="login_footer form-group mb-50">
                        <div class="chek-form">
                          <div class="custome-checkbox">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox1"
                              value=""
                            />
                            <label
                              class="form-check-label"
                              for="exampleCheckbox1"
                            >
                              <span>I agree to terms & Policy.</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <button
                          type="submit"
                          class="btn btn-heading btn-block hover-up"
                          name="login"
                        >
                          Send Request
                        </button>
                      </div>
                    </form>
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
