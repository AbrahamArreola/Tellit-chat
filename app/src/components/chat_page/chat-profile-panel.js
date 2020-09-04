import React, { useState } from "react";
import "../../styles/chat-profile-panel.scss";

function ChatProfilePanel(props) {
  const [nameReadOnly, setNameReadOnly] = useState(true);
  const [name, setName] = useState(props.userData.name);
  var nameInputRef;

  const [statusReadOnly, setStatusRedOnly] = useState(true);
  const [status, setStatus] = useState(props.userData.statusComment);
  var statusInputRef;

  const [changePhotoMsg, setChangePhotoMsg] = useState(false);
  var fileDialog;

  return (
    <div className="chat-option-panel-container">
      <div className="main-color-panel">
        <div className="main-panel-header">
          <i className="fa fa-arrow-left" onClick={props.closeProfile}></i>
          <p>Profile</p>
        </div>
      </div>

      <div className="secondary-color-panel">
        <img
          src={props.userData.image}
          alt="unavailable"
          onMouseOver={() => setChangePhotoMsg(true)}
          onMouseLeave={() => setChangePhotoMsg(false)}
          onClick={() => fileDialog.click()}
        />
        <div
          style={{ display: changePhotoMsg ? "block" : "none" }}
          className="change-photo-container"
        >
          <i className="fa fa-camera"></i>
          <p>Change Profile Photo</p>
        </div>
        <input
          type="file"
          style={{ display: "none" }}
          ref={(elementRef) => (fileDialog = elementRef)}
          accept={'.jpeg, .jpg, .png, .jfif'}
        />
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
            maxLength={25}
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
            maxLength={25}
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

export default ChatProfilePanel;
