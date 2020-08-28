import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "../../styles/chat-contact-panel.scss";

import testLogo from "../../images/conversation-img.jpg";

import ChatCard from "./chat-card";

function ChatContactPanel(props) {
  return (
    <div id="chat-contact-panel" className="chat-option-panel-container">
      <div className="main-color-panel">
        <div className="main-panel-header">
          <i className="fa fa-arrow-left" onClick={props.closeContacts}></i>
          <p>New chat</p>
        </div>
      </div>

      <div id="search-conversation-bar">
        <div>
          <i className="fa fa-search"></i>
          <input type="text" placeholder="Search contacts"/>
        </div>
      </div>

      <div id="new-group-container" onClick={props.openGroup}>
        <div>
          <i className="fa fa-group"></i>
        </div>
        <p>New Group</p>
      </div>
    </div>
  );
}

export default ChatContactPanel;
