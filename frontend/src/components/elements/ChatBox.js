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
  const [unReadMessages, setUnReadMessages] = useState();

  useEffect(() => {
    fetchData();
    socket.emit("join", token);

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);

  useEffect(() => {
    if (!isSupport) {
      socket.on("private message", (message) => {
        if (message.from === "Green" || message.from === sender) {
          setFormData({
            ...formData,
            messages: [...formData.messages, message],
          });
        }
      });
    } else {
      socket.on("private message", (message) => {
        if (
          (active && active.firstName === message.from) ||
          message.from === sender
        ) {
          console.log("msg", message.from, active.firstName);
          setFormData({
            ...formData,
            messages: [...formData.messages, message],
          });
        } else {
          setUnReadMessages({ from: message.from });
        }
      });
    }
    console.log(formData.messages);
  }, [formData.messages]);

  const fetchData = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/users/${userInfo.id}`);
    const { data: usersData } = await axios.get(`${BACKEND_URL}/users`);
    let names;
    if (isSupport) {
      names = usersData.data.map((user) => ({
        firstName: user.firstName,
        name: `${user.firstName} ${user.lastName}`,
        id: user["_id"],
        email: user.email,
      }));
    } else {
      names = [
        {
          firstName: "Green",
          name: `GreenSage Support`,
          email: "greenSage@support.com",
        },
      ];
    }
    setRooms(names);
    setSender(data.data.firstName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("private message", {
      to: formData.to,
      message: formData.message,
      senderData: { id: userInfo.id },
    });
    setFormData({
      ...formData,
      message: "",
    });
  };

  const handleRoomSelect = (room) => {
    setFormData({ to: room.email, messages: [] });
    setActive({ ...room });
    setUnReadMessages(false);
  };

  return (
    <div className="window">
      <aside className="conv-list-view">
        <ul className="conv-list">
          {rooms &&
            rooms.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`conv-element ${
                    active && active.id === item.id ? "selected" : ""
                  }`}
                  onClick={() => handleRoomSelect(item)}
                >
                  <div className="status">
                    {unReadMessages &&
                      unReadMessages.from === item.firstName && (
                        <i class="status__indicator--unread-message"></i>
                      )}
                    <div className="meta">
                      <p>{`${item.name}`}</p>
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
                <div className="meta__name">{active && active.name}</div>
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
                value={formData.message}
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    to: isSupport ? active.email : "greenSage@support.com",
                    message: e.target.value,
                  });
                }}
              />
              <button
                type="submit"
                style={{
                  position: "absolute",
                  right: "0",
                  width: "20%",
                  height: "100%",
                  bottom: "0",
                  padding: "0",
                }}
              >
                Send
              </button>
            </form>
          </div>
        </footer>
      </section>
    </div>
  );
}
