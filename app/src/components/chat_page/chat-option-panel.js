import React, { useState } from "react";
import "../../styles/chat-option-panel.scss";

import testLogo from "../../images/conversation-img.jpg";

function ChatProfilePanel(props) {
  const [nameReadOnly, setNameReadOnly] = useState(true);
  const [name, setName] = useState("Abraham Arreola");
  var nameInputRef;

  const [statusReadOnly, setStatusRedOnly] = useState(true);
  const [status, setStatus] = useState("Good");
  var statusInputRef;

  return (
    <div id="chat-option-panel-container">
      <div className="main-color-panel">
        <div className="main-panel-header">
          <i className="fa fa-arrow-left" onClick={props.closeProfile}></i>
          <p>Profile</p>
        </div>
      </div>

      <div className="secondary-color-panel">
        <img src={testLogo} alt="unavailable" />
      </div>

      <div className="information-panel">
        <p>Your name</p>
        <div
          style={!nameReadOnly ? { borderBottom: "solid 3px #64B0F0" } : null}
        >
          <input
            ref={(input) => (nameInputRef = input)}
            type="text"
            value={name}
            readOnly={nameReadOnly}
            onChange={(e) => setName(e.target.value)}
          />
          <i
            className={nameReadOnly ? "fa fa-pencil" : "fa fa-check"}
            onClick={() => {
              setNameReadOnly(!nameReadOnly);
              nameInputRef.focus();
            }}
          ></i>
        </div>
      </div>

      <div className="information-panel">
        <p>Status</p>
        <div
          style={!statusReadOnly ? { borderBottom: "solid 3px #64B0F0" } : null}
        >
          <input
            ref={(input) => (statusInputRef = input)}
            type="text"
            value={status}
            readOnly={statusReadOnly}
            onChange={(e) => setStatus(e.target.value)}
          />
          <i
            className={statusReadOnly ? "fa fa-pencil" : "fa fa-check"}
            onClick={() => {
              setStatusRedOnly(!statusReadOnly);
              statusInputRef.focus();
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

function ChatGroupPanel(props) {
  return (
    <div id="chat-option-panel-container">
      <div className="main-color-panel">
        <div className="main-panel-header">
          <i className="fa fa-arrow-left" onClick={props.closeGroup}></i>
          <p>Add participants</p>
        </div>
      </div>
    </div>
  );
}

export { ChatProfilePanel, ChatGroupPanel };
