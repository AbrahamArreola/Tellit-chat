import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { ChatProfilePanel } from "./chat-option-panel";
import "../../styles/chat-page.scss";

import conversationImage from "../../images/conversation-img.jpg";

import ChatCard from "./chat-card";

var data = [
  {
    name: "Jorge Abraham",
    message: "Hello A",
  },
  {
    name: "Jorge Abraham",
    message:
      "Hello world, this is a longer message to test de chat card, i hope this actually works",
  },
  {
    name: "Carlos V",
    message: "Hello V",
  },
  {
    name: "Jorge Abraham",
    message: "Hello A",
  },
  {
    name: "Jorge Abraham",
    message: "Hello A",
  },
  {
    name: "Jorge Abraham",
    message: "Hello A",
  },
  {
    name: "Jorge Abraham",
    message: "Hello A",
  },
  {
    name: "Jorge Abraham",
    message: "Hello A",
  },
  {
    name: "Jorge Abraham",
    message: "Hello A",
  },
  {
    name: "Jorge Abraham",
    message: "Hello A",
  },
  {
    name: "Jorge Abraham",
    message: "Hello A",
  },
  {
    name: "Jorge Abraham",
    message: "Hello A",
  },
  {
    name: "Jorge Abraham",
    message: "Hello A",
  },
  {
    name: "Jorge Abraham",
    message: "Hello A",
  },
  {
    name: "Jorge Abraham",
    message: "Hello A",
  },
];

function ChatPage() {
  const [displayMenu, setDisplayMenu] = useState("none");
  const [selectedItem, setSelectedItem] = useState("transparent");

  const onMainContainerClick = (e) => {
    if (e.target.id !== "chat-menu-icon") {
      setDisplayMenu("none");
      setSelectedItem("transparent");
    }
  };

  const onMenuIconClick = () => {
    displayMenu === "none" ? setDisplayMenu("block") : setDisplayMenu("none");
    selectedItem === "transparent"
      ? setSelectedItem("#bababa")
      : setSelectedItem("transparent");
  };

  return (
    <div id="chat-page-main-container" onClick={onMainContainerClick}>
      <ChatProfilePanel/>
      <div id="chat-main-menu-select" style={{ display: displayMenu }}>
        <ul className="list-group">
          <li className="list-group-item">Profile</li>
          <li className="list-group-item">Create new group</li>
          <li className="list-group-item">Log out</li>
        </ul>
      </div>

      <div id="chat-left-side-content">
        <div id="chat-main-menu">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e8/The_Joker_at_Wax_Museum_Plus.jpg"
            alt="unavailable"
          />
          <div id="chat-main-menu-options">
            <div className="main-menu-options-icons">
              <i id="chat-comment-icon" className="fa fa-comments"></i>
            </div>
            <div
              className="main-menu-options-icons"
              style={{ backgroundColor: selectedItem }}
            >
              <i
                id="chat-menu-icon"
                className="fa fa-bars"
                onClick={onMenuIconClick}
              ></i>
            </div>
          </div>
        </div>
        <div id="search-conversation-bar">
          <i className="fa fa-search"></i>
          <input type="text" placeholder="Search for a conversation" />
        </div>
        <div id="chats-component-container">
          {data.map((object, index) => (
            <ChatCard key={index} data={object} />
          ))}
        </div>
      </div>

      <div id="chat-right-side-content">
        <div id="conversation-splash-screen">
          <img src={conversationImage} alt="unavailable" />
          <h3>Welcome to tellit chat page!</h3>
          <p>
            You can search for a contact or a conversation on the left menu.
          </p>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ChatPage);
