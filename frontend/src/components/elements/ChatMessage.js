import React from "react";

function ChatMessage({ message }) {
  return (
    <div
      style={{
        fontSize: "16px",
        marginBottom: "10px",
      }}
    >
      <p>
        {message.user}: {message.text}
      </p>
    </div>
  );
}

export default ChatMessage;
