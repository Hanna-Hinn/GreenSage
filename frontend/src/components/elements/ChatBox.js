import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { BACKEND_URL, SOCKET_URL } from "../../config";
import { useSelector } from "react-redux";
import axios from "axios";

const socket = io(SOCKET_URL);

export default function ChatBox() {
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;
  const token = localStorage.getItem("sageToken");
  const [formData, setFormData] = useState({
    messages: [],
  });
  const isSupport = userInfo.email === "greenSage@support.com";
  const [sender, setSender] = useState();
  const [rooms, setRooms] = useState([]);
  const [active, setActive] = useState();

  useEffect(() => {
    fetchData();
    socket.emit("join", token);

    socket.on("private message", (message) => {
      console.log("message", message);
      // if (message.from === formData.to) {
      //   setFormData({ ...formData, messages: [...formData.messages, message] });
      // }
      setFormData({ ...formData, messages: [...formData.messages, message] });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    console.log(formData.messages);
  }, [formData.messages]);

  const fetchData = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/users/${userInfo.id}`);
    const { data: usersData } = await axios.get(`${BACKEND_URL}/users`);
    const names = usersData.data.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      id: user["_id"],
      email: user.email,
    }));
    setRooms(names);
    setSender(data.data.firstName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const sendMessage = {
    //   to: formData.to,
    //   message: formData.message,
    //   senderData: { id: userInfo.id },
    //   from: sender,
    // };
    socket.emit("private message", {
      to: formData.to,
      message: formData.message,
      senderData: { id: userInfo.id },
    });
    setFormData({
      ...formData,
      // messages: [...formData.messages, sendMessage],
      message: "",
      to: "",
    });
  };

  const handleRoomSelect = (room) => {
    setFormData({ ...formData, to: room.email, messages: [] });
    setActive({ ...room });
  };

  return (
    <div className="window">
      {isSupport ? (
        <aside className="conv-list-view">
          <ul className="conv-list">
            {rooms &&
              rooms.map((item) => {
                return (
                  <li
                    key={item.id}
                    className={`conv-element ${
                      active && active.id === item.id ? "selected" : ""
                    }`}
                    onClick={() => handleRoomSelect(item)}
                  >
                    <div className="status">
                      <div className="meta">
                        <p>{`${item.name}`}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </aside>
      ) : (
        <aside className="conv-list-view">
          <ul className="conv-list">
            <li className="conv-element selected">
              <div className="status">
                <div className="meta">GreenSage Support</div>
              </div>
            </li>
          </ul>
        </aside>
      )}

      <section className="chat-view">
        {/* <div className="room-selection">
          {rooms.map((room) => (
            <div key={room.id} onClick={() => handleRoomSelect(room.id)}>
              {room.name}
            </div>
          ))}
        </div> */}
        <header className="chat-view__header">
          <div className="cf">
            <div className="status">
              <div className="meta">
                <div className="meta__name">
                  {!isSupport ? `GreenSage Support` : active && active.name}
                </div>
              </div>
            </div>
          </div>
        </header>
        <section className="message-view">
          {formData.messages.map((message, index) => {
            return (
              <React.Fragment key={index}>
                <div
                  className={
                    sender && message.from === sender
                      ? "message--send"
                      : "message"
                  }
                >
                  <div
                    className={
                      sender && message.from === sender
                        ? "message__bubble--send"
                        : "message__bubble"
                    }
                  >
                    {message.message}
                  </div>
                  <span className="message__avatar">{message.from}</span>
                </div>
                <div className="cf"></div>
              </React.Fragment>
            );
          })}
        </section>
        <footer className="chat-view__input">
          <div className="chat-input">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    to: isSupport
                      ? "hanna.hinn@gmail.com"
                      : "greenSage@support.com",
                    message: e.target.value,
                  });
                }}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </footer>
      </section>
    </div>
  );
}
