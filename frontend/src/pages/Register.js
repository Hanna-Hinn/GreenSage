import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";

function Register() {
  // Needs to handle the Event of the Form

  const [securityCode, setSecurityCode] = useState("");
  const [isCustomer, setIsCustomer] = useState(true);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState({
    type: "",
    message: "",
  });
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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    imageUrl: "",
    healthStatus: { ...minerals },
  });

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

  useEffect(() => {
    console.log(isCustomer);
  }, [isCustomer]);

  const handleCheckboxChange = (event) => {
    setAgree(!agree);
    setError({
      type: "check",
      message: "Please Agree to Terms and Policy to Register!",
    });
    if (!agree) {
      setError({});
    }
  };

  const handleConfirmPasswordChange = (event) => {
    if (event.target.value !== formData.password) {
      setError({
        type: "password",
        message: "Password Does not Match!",
      });
    } else {
      setError({});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agree) {
      setError({
        type: "check",
        message: "Please Agree to Terms and Policy to Register!",
      });
    } else {
      setError({});
      console.log("username: " + e.target.firstName.value);
    }
  };

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
                        <form onSubmit={handleSubmit}>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <div className="form-group">
                              <input
                                type="text"
                                required=""
                                name="firstName"
                                placeholder="First Name..."
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                required=""
                                name="lastName"
                                placeholder="Last Name..."
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <input
                              type="text"
                              required=""
                              name="email"
                              placeholder="Email..."
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="tel"
                              required=""
                              name="mobile"
                              placeholder="Mobile Number..."
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="url"
                              required=""
                              name="imageUrl"
                              placeholder="Profile Image Url..."
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
                            {}
                            <input
                              required=""
                              type="password"
                              name="password"
                              placeholder="Confirm password"
                              onChange={handleConfirmPasswordChange}
                            />
                            {error.type === "password" && (
                              <>
                                <br />
                                <span style={{ color: "red" }}>
                                  {error.message}
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
                                  <div className="custome-radio">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name={key}
                                      id={key}
                                      value="true"
                                      checked={value}
                                      onClick={handleMineralsRadio}
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
                                required=""
                                name="securityCode"
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
                                name="customer"
                                id="exampleRadios3"
                                defaultChecked
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
                                {error.type === "check" && (
                                  <>
                                    <br />
                                    <span style={{ color: "red" }}>
                                      {error.message}
                                    </span>
                                  </>
                                )}
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
