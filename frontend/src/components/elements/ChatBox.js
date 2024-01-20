import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { SOCKET_URL } from "../../config";
import { useSelector } from "react-redux";

const socket = io(SOCKET_URL);

export default function ChatBox({ owners }) {
  const [active, setActive] = useState(owners && owners[0]);
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;
  const token = localStorage.getItem("sageToken");
  const [formData, setFormData] = useState({
    messages: [],
  });

  useEffect(() => {
    socket.emit("join", token);

    socket.on("private message", (message) => {
      console.log(message);
      setFormData({ ...formData, messages: [...formData.messages, message] });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, [formData.messages]);

  const handleOnClick = (item) => {
    setActive({ ...item });
  };

  const handleSubmit = () => {
    socket.emit("private message", {
      to: formData.to,
      message: formData.message,
      senderData: { id: userInfo.id, firstName: userInfo.firstName },
    });
    setFormData({ ...formData, message: "", to: "" });
  };

  return (
    <div className="window">
      <aside className="conv-list-view">
        <ul className="conv-list">
          {owners &&
            owners.map((item) => {
              return (
                <li
                  key={item["_id"]}
                  className={`conv-element ${
                    active && active["_id"] === item["_id"] ? "selected" : ""
                  }`}
                  onClick={() => handleOnClick(item)}
                >
                  <div className="status">
                    <div className="meta">
                      <p>{`${item.firstName} ${item.lastName}`}</p>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </aside>
      <section className="chat-view">
        <header className="chat-view__header">
          <div className="cf">
            <div className="status">
              <div className="meta">
                <div className="meta__name">
                  {active && `${active.firstName} ${active.lastName}`}
                </div>
              </div>
            </div>
          </div>
        </header>
        <section className="message-view">
          <div className="message--send">
            <div className="message__bubble--send">Hi Tim!</div>
            <span className="message__avatar">Hanna</span>
          </div>
          <div className="cf"></div>
          <div className="message">
            <span className="message__avatar">Tim</span>
            <div className="message__bubble">Hi</div>
          </div>
          <div className="cf"></div>
          <div className="message--send">
            <div className="message__bubble--send">How are you?</div>
            <span className="message__avatar">Hanna</span>
          </div>
        </section>
        <footer className="chat-view__input">
          <div className="chat-input">
            <input />
            <span className="input__emoticon"></span>
          </div>
        </footer>
      </section>
    </div>
  );
}
