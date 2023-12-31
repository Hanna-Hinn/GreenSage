import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";

function Register() {
  const [securityCode, setSecurityCode] = useState("");
  const [isCustomer, setIsCustomer] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState({});
  const [minerals, setMinerals] = useState({
    vitaminD: false,
    iron: false,
    vitaminB12: false,
    calcium: false,
    omega3: false,
    iodine: false,
    vitaminC: false,
    folate: false,
    magnesium: false,
    zinc: false,
  });
  const [formData, setFormData] = useState({});

  const handleMineralsRadio = (event) => {
    const inputName = event.target.name;
    setMinerals((prevMinerals) => ({
      ...prevMinerals,
      [inputName]: !prevMinerals[inputName],
    }));
  };

  const handleRadioChange = () => {
    setIsCustomer(!isCustomer);
  };

  const handleCheckboxChange = (event) => {
    setAgree(!agree);
    setError((curr) => {
      const { agree, ...rest } = curr;
      return rest;
    });
  };

  const handleSubmit = () => {
    const isValid = validateInputs();
    if (!isValid) {
      return;
    }
    console.log("passed");

    if (isCustomer) {
      setFormData({ ...formData, healthStatus: minerals });
    }

    console.log(formData);

    setSubmitted(true);
  };

  const validateInputs = () => {
    const firstName = formData["firstName"];
    const lastName = formData["lastName"];
    const email = formData["email"];
    const mobile = formData["mobile"];
    const imageUrl = formData["imageUrl"];
    const password = formData["password"];
    const confirmPassword = formData["confirmPassword"];
    const confirmCode = formData["securityCode"];

    if (!firstName || firstName.trim() === "") {
      setError({ ...error, firstName: "First name is required!!!" });
      return false;
    }
    if (!lastName || lastName.trim() === "") {
      setError({ ...error, lastName: "Last name is required!!!" });
      return false;
    }
    if (!email || email.trim() === "" || !validateEmail(email)) {
      setError({ ...error, email: "Entered Email not Valid!!!" });
      return false;
    }
    if (!mobile || mobile.trim() === "" || !validateMobile(mobile)) {
      setError({ ...error, mobile: "Entered Mobile number not Valid!!!" });
      return false;
    }
    if (!imageUrl || imageUrl.trim() === "" || !validateImageUrl(imageUrl)) {
      setError({ ...error, imageUrl: "Entered Image URL not Valid!!!" });
      return false;
    }
    if (!password || password.trim() === "" || password.length < 8) {
      setError({
        ...error,
        password: "Password Length Must be more than 8 characters!!!",
      });
      return false;
    }
    if (confirmPassword !== password) {
      setError({
        ...error,
        confirmPassword: "Confirm Password Does not Match!!!",
      });
      return false;
    }

    if (confirmCode !== securityCode) {
      setError({ ...error, securityCode: "Security Code does not Match!!!" });
      return false;
    }
    if (!agree) {
      setError({
        ...error,
        agree: "Please Agree terms to Continue!!!",
      });
      return false;
    }
    return true;
  };

  function validateEmail(email) {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(String(email).toLowerCase());
  }

  function validateMobile(mobile) {
    const mobileRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
    return mobileRegex.test(mobile);
  }

  function validateImageUrl(url) {
    const imageUrlRegex = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg)$/i;
    return imageUrlRegex.test(url);
  }

  useEffect(() => {
    const generateCode = () => {
      const randomDigits = Array(4)
        .fill()
        .map(() => Math.floor(Math.random() * 10));
      setSecurityCode(randomDigits.join(""));
    };

    generateCode();
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
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <div className="form-group">
                              <input
                                type="text"
                                required
                                name="firstName"
                                placeholder="First Name..."
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    firstName: e.target.value,
                                  });
                                  setError((curr) => {
                                    const { firstName, ...rest } = curr;
                                    return rest;
                                  });
                                }}
                              />
                            </div>
                            {error.firstName && (
                              <>
                                <br />
                                <span style={{ color: "red" }}>
                                  {error.firstName}
                                </span>
                              </>
                            )}
                            <div className="form-group">
                              <input
                                type="text"
                                required
                                name="lastName"
                                placeholder="Last Name..."
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    lastName: e.target.value,
                                  });
                                  setError((curr) => {
                                    const { lastName, ...rest } = curr;
                                    return rest;
                                  });
                                }}
                              />
                            </div>
                            {error.lastName && (
                              <>
                                <br />
                                <span style={{ color: "red" }}>
                                  {error.lastName}
                                </span>
                              </>
                            )}
                          </div>

                          <div className="form-group">
                            <input
                              type="text"
                              required
                              name="email"
                              placeholder="Email..."
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                });
                                setError((curr) => {
                                  const { email, ...rest } = curr;
                                  return rest;
                                });
                              }}
                            />
                            {error.email && (
                              <>
                                <br />
                                <span style={{ color: "red" }}>
                                  {error.email}
                                </span>
                              </>
                            )}
                          </div>

                          <div className="form-group">
                            <input
                              type="tel"
                              required
                              name="mobile"
                              placeholder="Mobile Number..."
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  mobile: e.target.value,
                                });
                                setError((curr) => {
                                  const { mobile, ...rest } = curr;
                                  return rest;
                                });
                              }}
                            />
                            {error.mobile && (
                              <>
                                <br />
                                <span style={{ color: "red" }}>
                                  {error.mobile}
                                </span>
                              </>
                            )}
                          </div>

                          <div className="form-group">
                            <input
                              type="url"
                              required
                              name="imageUrl"
                              placeholder="Profile Image Url..."
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  imageUrl: e.target.value,
                                });
                                setError((curr) => {
                                  const { imageUrl, ...rest } = curr;
                                  return rest;
                                });
                              }}
                            />
                            {error.imageUrl && (
                              <>
                                <br />
                                <span style={{ color: "red" }}>
                                  {error.imageUrl}
                                </span>
                              </>
                            )}
                          </div>

                          <div className="form-group">
                            <input
                              required
                              type="password"
                              name="password"
                              placeholder="Password"
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  password: e.target.value,
                                });
                                setError((curr) => {
                                  const { password, ...rest } = curr;
                                  return rest;
                                });
                              }}
                            />
                            {error.password && (
                              <>
                                <br />
                                <span style={{ color: "red" }}>
                                  {error.password}
                                </span>
                              </>
                            )}
                          </div>

                          <div className="form-group">
                            <input
                              required
                              type="password"
                              name="confirmPassword"
                              placeholder="Confirm password"
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  confirmPassword: e.target.value,
                                });
                                setError((curr) => {
                                  const { confirmPassword, ...rest } = curr;
                                  return rest;
                                });
                              }}
                            />
                            {error.confirmPassword && (
                              <>
                                <br />
                                <span style={{ color: "red" }}>
                                  {error.confirmPassword}
                                </span>
                              </>
                            )}
                          </div>
                          {isCustomer && (
                            <div className="payment_option mb-50">
                              <label>
                                Please Check the Preferred Minerals:
                              </label>
                              <br />
                              {Object.entries(minerals).map(([key, value]) => {
                                return (
                                  <div className="custome-radio" key={key}>
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name={key}
                                      id={key}
                                      checked={value}
                                      onClick={handleMineralsRadio}
                                      // onChange={handleMineralsRadio}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={key}
                                    >
                                      {key}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          <div className="login_footer form-group">
                            <div className="chek-form">
                              <input
                                type="text"
                                required
                                name="securityCode"
                                placeholder="Security code *"
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    securityCode: e.target.value,
                                  });
                                  setError((curr) => {
                                    const { securityCode, ...rest } = curr;
                                    return rest;
                                  });
                                }}
                              />
                            </div>
                            {error.securityCode && (
                              <>
                                <br />
                                <span style={{ color: "red" }}>
                                  {error.securityCode}
                                </span>
                              </>
                            )}

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
                                name="customer"
                                id="exampleRadios3"
                                checked={isCustomer}
                                onChange={handleRadioChange}
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
                                name="vendor"
                                id="exampleRadios4"
                                checked={!isCustomer}
                                onChange={handleRadioChange}
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
                                  checked={agree}
                                  onChange={handleCheckboxChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleCheckbox12"
                                >
                                  <span>I agree to terms &amp; Policy.</span>
                                </label>
                                {error.agree && (
                                  <>
                                    <br />
                                    <span style={{ color: "red" }}>
                                      {error.agree}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="form-group mb-30">
                            <button
                              // type="submit"
                              className="btn btn-fill-out btn-block font-weight-bold"
                              onClick={handleSubmit}
                            >
                              Submit &amp; Register
                            </button>
                          </div>
                        </form>
                        {submitted && <p>Form submitted successfully!</p>}
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
