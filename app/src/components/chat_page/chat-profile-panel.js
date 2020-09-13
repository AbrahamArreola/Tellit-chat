import React, { useEffect, useState } from "react";
import "../../styles/chat-profile-panel.scss";

const APIRequests = require('../../utilities/api-requests');

function ChatProfilePanel(props) {
  const userID = props.userID;
  
  const [nameReadOnly, setNameReadOnly] = useState(true);
  const [name, setName] = useState("");
  var nameInputRef;

  const [statusReadOnly, setStatusRedOnly] = useState(true);
  const [status, setStatus] = useState("");
  var statusInputRef;

  const [profileImg, setProfileImg] = useState(null);

  const [changePhotoMsg, setChangePhotoMsg] = useState(false);
  var fileDialog;

  const updateUserProfile = async (newData) => {
    try{
      await APIRequests.putRequest(`http://localhost:9000/user/update/${userID}`, newData);
    } catch(err){
      alert(err);
    }
  }

  useEffect(() => {
    const getUserData = () => {
      APIRequests.getRequest(`http://localhost:9000/user/get-profile/${userID}`)
      .then(userData => {
        setName(userData.user.name);
        setStatus(userData.user.statusComment);
        setProfileImg(userData.user.image);
      })
      .catch(err => alert(err));
    }
    getUserData();
  },[userID]);

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
          src={profileImg}
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
            maxLength={25}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => {
              if(e.key === "Enter"){
                setNameReadOnly(!nameReadOnly);
                !nameReadOnly && updateUserProfile({name});
                nameInputRef.focus();
              }
            }}
          />
          <i
            className={nameReadOnly ? "fa fa-pencil" : "fa fa-check"}
            onClick={(e) => {
              setNameReadOnly(!nameReadOnly);
              !nameReadOnly && updateUserProfile({name});
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
            maxLength={40}
            onChange={(e) => setStatus(e.target.value)}
            onKeyPress={(e) => {
              if(e.key === "Enter"){
                setStatusRedOnly(!statusReadOnly);
                !statusReadOnly && updateUserProfile({statusComment: status});
                statusInputRef.focus();
              }
            }}
          />
          <i
            className={statusReadOnly ? "fa fa-pencil" : "fa fa-check"}
            onClick={() => {
              setStatusRedOnly(!statusReadOnly);
              !statusReadOnly && updateUserProfile({statusComment: status});
              statusInputRef.focus();
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default ChatProfilePanel;
