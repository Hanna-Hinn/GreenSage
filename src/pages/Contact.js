import ChatBox from "../components/elements/ChatBox";
import Layout from "../components/layout/Layout";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";

function Contact() {
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      // fetchData();
    } else {
      toast("Please Login to use Chat!");
    }
  }, []);

  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="Contact">
        <div className="container">
          <div className="col-lg-7" style={{ width: "100%" }}>
            {userInfo && <ChatBox />}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Contact;
