import React from "react";
import "../../styles/chat-card.scss";

import testLogo from "../../images/conversation-img.jpg";

function ChatCard(props) {

  const onChatCardClick = () => {
    props.action(props.data);
  }

  return (
    <div className="chat-card-container" onClick={onChatCardClick}>
      <img src={testLogo} alt="Unavailable" />
      <div className="chat-card-information">
        <div className="chat-card-data">
          <h5>{props.data.name}</h5>
          <p>Date</p>
        </div>
        <p>{props.data.message}</p>
      </div>
    </div>
  );
}

export default ChatCard;
