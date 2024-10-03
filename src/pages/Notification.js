import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "./../config";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      fetchData();
    }
  }, [userInfo]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/products/${userInfo.id}/notifications`);
      if (data.success) {
        setNotifications(data.data);
      } else {
        setNotifications([]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Layout parent="Home" sub="Shop" subChild="Notifications">
        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                {notifications.length > 0 ? (
                  <div className="table-responsive shopping-summery" style={{ marginLeft: "5%" }}>
                    <h2>Notifications: </h2>
                    <ul style={{ marginTop: "5%" }}>
                      {notifications.map((notification) => (
                        <li key={notification.notificationId} className="notification">
                          <Link
                            to={
                              notification.type === "Status updated"
                                ? `/orders/${notification.status.orderId}`
                                : `/products/${notification.productDetails["_id"]}`
                            }
                          >
                            {notification.msg}{" "}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <h4 className="mb-0">No Products</h4>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
