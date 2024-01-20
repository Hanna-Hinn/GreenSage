import ChatBox from "../components/elements/ChatBox";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

import axios from "axios";

function Contact() {
  const [users, setUsers] = useState([]);
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      fetchData();
    } else {
      toast("Please Login to user Chat!");
    }
  }, []);

  const fetchData = async () => {
    if (userInfo.userType !== " owner") {
      const { data: userData } = await axios.get(`${BACKEND_URL}/owners`);
      setUsers(userData.data);
    }
  };

  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="Contact">
        <div className="container">
          <div className="col-lg-7" style={{ width: "100%" }}>
            <ChatBox owners={users && users} />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Contact;
