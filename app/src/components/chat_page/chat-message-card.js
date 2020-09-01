import React from "react";
import "../../styles/chat-message-card.scss";

function ChatMessageCard(props) {
  return (
    <div id="message-card-container">
      <div
        className={`message-card ${
          props.data.myCard ? "my-message-card" : "contact-message-card"
        }`}
      >
        <p>{props.data.message}</p>
      </div>
    </div>
  );
}

export default ChatMessageCard;
