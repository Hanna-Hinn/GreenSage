import ChatBox from "../components/elements/ChatBox";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { SOCKET_URL } from "../config";
import { useSelector } from "react-redux";

const socket = io(SOCKET_URL);

function Contact() {
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;
  const [formData, setFormData] = useState({
    messages: [],
  });
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("sageToken");

  useEffect(() => {
    socket.emit("join", token);

    socket.on("private message", (message) => {
      console.log(message);
      setFormData({ ...formData, messages: [...formData.messages, message] });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    // console.log(formData.messages);
  }, [formData.messages]);

  const handleSubmit = () => {
    socket.emit("private message", {
      to: formData.to,
      message: formData.message,
      senderData: { id: userInfo.id, firstName: userInfo.firstName },
    });
    setFormData({ ...formData, message: "", to: "" });
  };

  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="Contact">
        <div className="container">
          <div className="col-lg-7" style={{ width: "100%" }}>
            <ChatBox />
          </div>
        </div>

        {/* <div className="page-content pt-50">
          <div className="container">
            <div className="row">
             
              <div className="col-xl-10 col-lg-12 m-auto">
                <section className="mb-50">
                  <div className="row">
                    <div className="col-xl-8"></div>

                    <div className="col-xl-8">
                      <div className="contact-from-area padding-20-row-col">
                        <h5 className="text-brand mb-10">Chat</h5>
                        <h2 className="mb-10">Chat Now!</h2>
                        <form
                          className="contact-form-style mt-30"
                          id="contact-form"
                          onSubmit={(e) => e.preventDefault()}
                        >
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <div className="input-style mb-20">
                                <input
                                  name="email"
                                  placeholder="Enter Email..."
                                  type="email"
                                  value={formData.to}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      to: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                              <div className="textarea-style mb-30">
                                <textarea
                                  name="message"
                                  placeholder="Message"
                                  value={formData.message}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      message: e.target.value,
                                    });
                                  }}
                                ></textarea>
                              </div>
                              <button
                                className="submit submit-auto-width"
                                type="submit"
                                onClick={handleSubmit}
                              >
                                Send message
                              </button>
                            </div>
                          </div>
                        </form>
                        <p className="form-messege"></p>
                      </div>
                    </div>
                    <div className="col-lg-4 pl-50 d-lg-block d-none">
                      <img
                        className="border-radius-15 mt-50"
                        src="assets/imgs/page/contact-2.png"
                        alt="contact"
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div> */}
      </Layout>
    </>
  );
}

export default Contact;
