import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

import ChatMessageCard from "./chat-message-card";

import "../../styles/chat-conversation.scss";

import defaultWallpaper from "../../images/default-wallpaper.jpg";

function ChatConversationView(props) {
  const [messages, setMessages] = useState([
    {
      message: "Hello, i'm Abraham, how are you?",
      myCard: true,
    },
    {
      message: "Hello Abraham, i'm fine",
      myCard: false,
    },
    {
      message:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      myCard: false,
    },
    {
      message: "Oh, thanks god",
      myCard: true,
    },
    {
      message: "Hello, i'm Abraham, how are you?",
      myCard: true,
    },
    {
      message: "Hello Abraham, i'm fine",
      myCard: false,
    },
    {
      message:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      myCard: false,
    },
    {
      message: "Oh, thanks god",
      myCard: true,
    },
  ]);

  const [textAreaValue, setTextAreaValue] = useState("");
  var scrollBottom = React.createRef(null);
  var textAreaRef = React.createRef(null);

  const sendMessage = () => {
    if (textAreaValue !== "") {
      const newMessage = {
        message: textAreaValue,
        myCard: true,
      };

      setMessages([...messages, newMessage]);
      scrollBottom.scrollIntoView({ behavior: "smooth" });
      setTextAreaValue("");
    }
  };

  const keyPress = (e) => {
    if(e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      sendMessage();
    }
  }

  useEffect(() => {
    textAreaRef.focus();
    scrollBottom.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div
      id="chat-conversation-view"
      style={{ display: props.display ? null : "none" }}
    >
      <div id="header-contact-information">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/e8/The_Joker_at_Wax_Museum_Plus.jpg"
          alt="unavailable"
        />
        <p>{props.data.name}</p>
      </div>

      <div
        id="chat-conversation-messages"
        style={{ backgroundImage: `url(${defaultWallpaper})` }}
      >
        {messages.map((object, index) => (
          <ChatMessageCard key={index} data={object} />
        ))}
        <div ref={(e) => (scrollBottom = e)}></div>
      </div>

      <div id="chat-message-bar">
        <i className="fa fa-paperclip"></i>
        <TextareaAutosize
          ref={(textArea) => textAreaRef = textArea}
          placeholder="Type a message"
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
          onKeyPress={(e) => keyPress(e)}
        />
        <i className="fa fa-paper-plane" onClick={sendMessage}></i>
      </div>
    </div>
  );
}

export default ChatConversationView;
