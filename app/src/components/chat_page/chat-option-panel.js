import React from "react";
import "../../styles/chat-option-panel.scss";

import testLogo from "../../images/conversation-img.jpg";

function ChatProfilePanel(props) {
  return (
    <div id="chat-option-panel-container">
      <div className="main-color-panel">
        <div className="main-panel-header">
          <i className="fa fa-arrow-left"></i>
          <p>Profile</p>
        </div>
      </div>

      <div className="secondary-color-panel">
        <img src={testLogo} alt="unavailable" />
      </div>

      <div className="information-panel">
        <p>Your name</p>
        <div>
          <input type="text" value="Abraham Arreola" readOnly={true} />
          <i className="fa fa-pencil"></i>
        </div>
      </div>

      <div className="information-panel">
        <p>Status</p>
        <div>
          <input type="text" value="Good" readOnly={true} />
          <i className="fa fa-pencil"></i>
        </div>
      </div>
    </div>
  );
}

function ChatContactPanel() {
  return (
    <div id="chat-option-panel-container">
      <div></div>
    </div>
  );
}

export { ChatProfilePanel, ChatContactPanel };
