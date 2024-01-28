import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/action/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [securityCode, setSecurityCode] = useState("");
  const [formData, setFormData] = useState({});
  const [validError, setValidError] = useState({});
  const userLogin = useSelector((state) => state.auth);
  const { error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/page-account");
    }
  }, [userInfo]);

  const handleSubmit = async () => {
    const isValid = validateInputs();
    if (!isValid) {
      return;
    }

    dispatch(login(formData.email, formData.password));
  };

  const validateInputs = () => {
    const email = formData["email"];
    const password = formData["password"];
    const confirmCode = formData["securityCode"];

    if (!email || email.trim() === "" || !validateEmail(email)) {
      setValidError({ ...validError, email: "Entered Email not Valid!!!" });
      return false;
    }
    if (!password || password.trim() === "" || password.length < 8) {
      setValidError({
        ...validError,
        password: "Password Length Must be more than 8 characters!!!",
      });
      return false;
    }
    if (confirmCode !== securityCode) {
      setValidError({
        ...validError,
        securityCode: "Security Code does not Match!!!",
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
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div className="form-group">
                            <input
                              type="text"
                              required=""
                              name="email"
                              placeholder="Email..."
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                });
                                setValidError((curr) => {
                                  const { email, ...rest } = curr;
                                  return rest;
                                });
                              }}
                            />
                            {validError.email && (
                              <>
                                <br />
                                <span style={{ color: "red" }}>
                                  {validError.email}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="form-group">
                            <input
                              required=""
                              type="password"
                              name="password"
                              placeholder="Your password..."
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  password: e.target.value,
                                });
                                setValidError((curr) => {
                                  const { password, ...rest } = curr;
                                  return rest;
                                });
                              }}
                            />
                          </div>
                          {validError.password && (
                            <>
                              <br />
                              <span style={{ color: "red" }}>
                                {validError.password}
                              </span>
                            </>
                          )}
                          <div className="login_footer form-group">
                            <div className="chek-form">
                              <input
                                type="text"
                                required=""
                                name="email"
                                placeholder="Security code..."
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    securityCode: e.target.value,
                                  });
                                  setValidError((curr) => {
                                    const { securityCode, ...rest } = curr;
                                    return rest;
                                  });
                                }}
                              />
                            </div>
                            {validError.securityCode && (
                              <>
                                <br />
                                <span style={{ color: "red" }}>
                                  {validError.securityCode}
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

                          <div className="form-group">
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <button
                              // type="submit"
                              className="btn btn-heading btn-block hover-up"
                              name="login"
                              onClick={handleSubmit}
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
