import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { BACKEND_URL } from "../config";
import axios from "axios";

const VendorList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log("Error fetching Vendors", error);
      });
  }, []);

  const getData = async () => {
    const response = await axios.get(`${BACKEND_URL}/owners`);
    console.log(response.data.data);
    return response.data.data;
  };

  return (
    <>
      <Layout parent="Home" sub="Vendors" subChild="list">
        <div className="page-content pt-50">
          <div className="container">
            <div className="archive-header-2 text-center">
              <h1 className="display-2 mb-50">Vendors List</h1>
            </div>
            <div className="row vendor-grid">
              {data &&
                data.map((item, i) => (
                  <div
                    className="col-lg-6 col-md-6 col-12 col-sm-6 mb-50"
                    key={i}
                  >
                    <div className="vendor-wrap mb-40  style-2">
                      <div className="vendor-img-action-wrap">
                        <div className="vendor-img">
                          <Link to={`/vendors-list/vendor/${item["_id"]}`}>
                            <img
                              className="default-img"
                              src={item.imageUrl}
                              alt={`${item.firstName} ${item.lastName}`}
                            />
                          </Link>
                        </div>

                        <div className="mt-10">
                          <span className="font-small total-product">
                            {item.productCount}
                          </span>
                        </div>
                      </div>
                      <div className="vendor-content-wrap">
                        <div className="mb-30">
                          <h4 className="mb-5">
                            <Link to={`/vendors-list/vendor/${item["_id"]}`}>
                              {`${item.firstName} ${item.lastName}`}
                            </Link>
                          </h4>

                          <div className="vendor-info d-flex justify-content-between align-items-end mt-30">
                            <ul className="contact-infor text-muted">
                              <li>
                                <img
                                  src="/assets/imgs/theme/icons/icon-location.svg"
                                  alt="location"
                                />
                                <strong>Address: </strong>{" "}
                                <span>
                                  {`${item.addresses[0].street}, ${item.addresses[0].city} ${item.addresses[0].postalCode}, ${item.addresses[0].state}  `}
                                </span>
                              </li>
                              <li>
                                <img
                                  src="/assets/imgs/theme/icons/icon-contact.svg"
                                  alt="contact"
                                />
                                <strong>Call Us:</strong>
                                <span>{`${item.mobile}`}</span>
                              </li>
                            </ul>
                            <Link
                              to={`/vendors-list/vendor/${item["_id"]}`}
                              className="btn btn-xs"
                            >
                              Visit Store{" "}
                              <i className="fi-rs-arrow-small-right"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default VendorList;
