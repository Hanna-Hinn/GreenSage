import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import { BACKEND_URL } from '../config/index'
import { useDispatch, useSelector } from 'react-redux'
import { registerSuccess } from '../redux/action/auth'
import axios from 'axios'
import { toast } from 'react-toastify'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [securityCode, setSecurityCode] = useState('')
  const [isCustomer, setIsCustomer] = useState(true)
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState({})
  const [addresses, setAddresses] = useState()
  const mineralsArray = [
    'vitaminD',
    'iron',
    'vitaminB12',
    'calcium',
    'omega3',
    'iodine',
    'vitaminC',
    'folate',
    'magnesium',
    'zinc',
    'others',
  ]
  const [formData, setFormData] = useState({})
  const userLogin = useSelector((state) => state.auth)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate('/page-account')
    }
  }, [userInfo])

  const handleMineralChange = (e) => {
    const { value, checked } = e.target

    if (e.target.type === 'text') {
      setFormData((prev) => {
        return {
          ...prev,
          healthStatus: { ...prev.healthStatus, others: value },
        }
      })
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          healthStatus: { ...prev.healthStatus, [value]: checked },
        }
      })
    }
  }

  const handleRadioChange = () => {
    setIsCustomer(!isCustomer)
  }

  const handleCheckboxChange = () => {
    setAgree(!agree)
    setError((curr) => {
      const { ...rest } = curr
      return rest
    })
  }

  const handleSubmit = async () => {
    const isValid = validateInputs()
    if (!isValid) {
      return
    }

    if (!isCustomer) {
      setFormData(delete formData.healthStatus)
    }
    const user = formData

    let url = `${BACKEND_URL}/register`
    if (!isCustomer) {
      url = `${BACKEND_URL}/users`
    }
    try {
      const response = await axios.post(url, user)
      const data = response.data.data
      dispatch(registerSuccess(data))
      toast('Please Login to proceed !')
      navigate('/page-login')
    } catch (error) {
      setError({
        ...error,
        responseError: error.message
          ? error.message
          : 'Something Went Wrong!!!',
      })
    }
  }

  const validateInputs = () => {
    const firstName = formData['firstName']
    const lastName = formData['lastName']
    const email = formData['email']
    const mobile = formData['mobile']
    const imageUrl = formData['imageUrl']
    const password = formData['password']
    const confirmPassword = formData['confirmPassword']
    const confirmCode = formData['securityCode']

    if (!firstName || firstName.trim() === '') {
      setError({ ...error, firstName: 'First name is required!!!' })
      return false
    }
    if (!lastName || lastName.trim() === '') {
      setError({ ...error, lastName: 'Last name is required!!!' })
      return false
    }
    if (!email || email.trim() === '' || !validateEmail(email)) {
      setError({ ...error, email: 'Entered Email not Valid!!!' })
      return false
    }
    if (!mobile || mobile.trim() === '' || !validateMobile(mobile)) {
      setError({ ...error, mobile: 'Entered Mobile number not Valid!!!' })
      return false
    }
    if (!imageUrl || imageUrl.trim() === '' || !validateImageUrl(imageUrl)) {
      setError({ ...error, imageUrl: 'Entered Image URL not Valid!!!' })
      return false
    }
    if (!password || password.trim() === '' || password.length < 8) {
      setError({
        ...error,
        password: 'Password Length Must be more than 8 characters!!!',
      })
      return false
    }
    if (confirmPassword !== password) {
      setError({
        ...error,
        confirmPassword: 'Confirm Password Does not Match!!!',
      })
      return false
    }

    if (confirmCode !== securityCode) {
      setError({ ...error, securityCode: 'Security Code does not Match!!!' })
      return false
    }
    if (!agree) {
      setError({
        ...error,
        agree: 'Please Agree terms to Continue!!!',
      })
      return false
    }
    return true
  }

  function validateEmail(email) {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return emailRegex.test(String(email).toLowerCase())
  }

  function validateMobile(mobile) {
    const mobileRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/
    return mobileRegex.test(mobile)
  }

  function validateImageUrl(url) {
    const imageUrlRegex = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg)$/i
    return imageUrlRegex.test(url)
  }

  useEffect(() => {
    const generateCode = () => {
      const randomDigits = Array(4)
        .fill()
        .map(() => Math.floor(Math.random() * 10))
      setSecurityCode(randomDigits.join(''))
    }

    generateCode()
  }, [])

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
                            Already have an account?{' '}
                            <Link to="/page-login">Log in instead!</Link>
                          </p>
                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div style={{ display: 'flex', gap: '10px' }}>
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
                                  })
                                  setError((curr) => {
                                    const { ...rest } = curr
                                    return rest
                                  })
                                }}
                              />
                            </div>
                            {error.firstName && (
                              <>
                                <br />
                                <span style={{ color: 'red' }}>
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
                                  })
                                  setError((curr) => {
                                    const { ...rest } = curr
                                    return rest
                                  })
                                }}
                              />
                            </div>
                            {error.lastName && (
                              <>
                                <br />
                                <span style={{ color: 'red' }}>
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
                                })
                                setError((curr) => {
                                  const { ...rest } = curr
                                  return rest
                                })
                              }}
                            />
                            {error.email && (
                              <>
                                <br />
                                <span style={{ color: 'red' }}>
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
                                })
                                setError((curr) => {
                                  const { ...rest } = curr
                                  return rest
                                })
                              }}
                            />
                            {error.mobile && (
                              <>
                                <br />
                                <span style={{ color: 'red' }}>
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
                                })
                                setError((curr) => {
                                  const { ...rest } = curr
                                  return rest
                                })
                              }}
                            />
                            {error.imageUrl && (
                              <>
                                <br />
                                <span style={{ color: 'red' }}>
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
                                })
                                setError((curr) => {
                                  const { ...rest } = curr
                                  return rest
                                })
                              }}
                            />
                            {error.password && (
                              <>
                                <br />
                                <span style={{ color: 'red' }}>
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
                                })
                                setError((curr) => {
                                  const { ...rest } = curr
                                  return rest
                                })
                              }}
                            />
                            {error.confirmPassword && (
                              <>
                                <br />
                                <span style={{ color: 'red' }}>
                                  {error.confirmPassword}
                                </span>
                              </>
                            )}
                          </div>
                          {!isCustomer && (
                            <div className="form-group">
                              <textarea
                                type="text"
                                required
                                name="Description"
                                placeholder="Vendor Description"
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    description: e.target.value,
                                  })
                                }}
                              />
                            </div>
                          )}

                          <label style={{ marginBottom: 10 }}>
                            Please Enter your address Info:
                          </label>
                          <div
                            style={{
                              display: 'flex',
                              gap: '5px',
                              flexWrap: 'wrap',
                            }}
                          >
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
                                  })
                                  setFormData({
                                    ...formData,
                                    addresses: [{ ...addresses }],
                                  })
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
                                  })
                                  setFormData({
                                    ...formData,
                                    addresses: [{ ...addresses }],
                                  })
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
                                  })
                                  setFormData({
                                    ...formData,
                                    addresses: [{ ...addresses }],
                                  })
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
                                  })
                                  setFormData({
                                    ...formData,
                                    addresses: [{ ...addresses }],
                                  })
                                }}
                              />
                            </div>
                          </div>

                          {isCustomer && (
                            <div className="payment_option mb-50">
                              <label>
                                Please Check the Preferred Minerals:
                              </label>
                              <br />
                              {mineralsArray.map((key) => {
                                return (
                                  <div key={key}>
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name={key}
                                      value={key}
                                      id={key}
                                      onChange={(e) => handleMineralChange(e)}
                                    />
                                    <label
                                      style={{ paddingLeft: '5px' }}
                                      className="form-check-label"
                                      htmlFor={key}
                                    >
                                      {key}
                                    </label>
                                    {key === 'others' && (
                                      <>
                                        <br />
                                        <label
                                          style={{ paddingLeft: '5px' }}
                                          className="form-check-label"
                                          htmlFor={key}
                                        >
                                          Please Make sure it's the same
                                          structure in the example
                                        </label>
                                        <input
                                          type="text"
                                          name="others"
                                          placeholder="Ex: vitaminC,vitaminB12,...etc"
                                          onChange={(e) =>
                                            handleMineralChange(e)
                                          }
                                        />
                                      </>
                                    )}
                                  </div>
                                )
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
                                  })
                                  setError((curr) => {
                                    const { ...rest } = curr
                                    return rest
                                  })
                                }}
                              />
                            </div>
                            {error.securityCode && (
                              <>
                                <br />
                                <span style={{ color: 'red' }}>
                                  {error.securityCode}
                                </span>
                              </>
                            )}

                            <span className="security-code">
                              {securityCode.split('').map((digit, index) => (
                                <b
                                  key={index}
                                  className={`text-${
                                    ['new', 'hot', 'sale', 'best'][index]
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
                                    <span style={{ color: 'red' }}>
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
                        {!error.responseError && (
                          <p style={{ color: 'red' }}>{error.responseError}</p>
                        )}
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
  )
}

export default Register
