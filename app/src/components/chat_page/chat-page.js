import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "../../styles/chat-page.scss";

import ChatProfilePanel from "./chat-profile-panel";
import ChatGroupPanel from "./chat-group-panel";
import ChatContactPanel from "./chat-contact-panel";
import ChatConversationView from "./chat-conversation";
import ChatCard from "./chat-card";

import conversationImage from "../../images/conversation-img.jpg";

const APIRequests = require('../../utilities/api-requests');

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

function ChatPage(props) {
  const accessData = props.location.state;
  const [userData, setUserData] = useState({});
  
  const [displayMenu, setDisplayMenu] = useState("none");
  const [selectedItem, setSelectedItem] = useState("transparent");
  const [displayProfile, setDisplayProfile] = useState((accessData && accessData.displayProfile) || false);
  const [displayGroup, setDisplayGroup] = useState(false);
  const [displayContacts, setDisplayContacts] = useState(false);
  const [displayConversation, setDisplayConversation] = useState(false);

  const [conversationData, setConversationData] = useState({});

  const profileRef = React.createRef(null);
  const groupRef = React.createRef(null);
  const contactsRef = React.createRef(null);

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

  useEffect(() => {
    const getUserData = () => {
      APIRequests.getRequest(`http://localhost:9000/user/get-profile/${accessData.userID}`)
      .then(userData => setUserData(userData.user))
      .catch(err => alert(err));
    }
    getUserData();
  },[accessData]);

  return (
    <div id="chat-page-main-container" onClick={onMainContainerClick}>
      <CSSTransition nodeRef={profileRef} in={displayProfile} timeout={500} classNames="option-panel" unmountOnExit>
        <div ref={profileRef} className="option-panel"> 
          <ChatProfilePanel closeProfile={() => setDisplayProfile(false)} userID={accessData.userID}/>
        </div>
      </CSSTransition>

      <CSSTransition nodeRef={groupRef} in={displayGroup} timeout={500} classNames="option-panel" unmountOnExit>
        <div ref={groupRef} className="option-panel" style={{zIndex: '2'}}> 
          <ChatGroupPanel closeGroup={() => setDisplayGroup(false)}/>
        </div>
      </CSSTransition>

      <CSSTransition nodeRef={contactsRef} in={displayContacts} timeout={500} classNames="option-panel" unmountOnExit>
        <div ref={contactsRef} className="option-panel"> 
          <ChatContactPanel closeContacts={() => setDisplayContacts(false)} openGroup={() => setDisplayGroup(true)}/>
        </div>
      </CSSTransition>

      <div id="chat-main-menu-select" style={{ display: displayMenu }}>
        <ul className="list-group">
          <li className="list-group-item" onClick={() => setDisplayProfile(true)}>Profile</li>
          <li className="list-group-item" onClick={() => setDisplayGroup(true)}>Create new group</li>
          <li className="list-group-item">Log out</li>
        </ul>
      </div>

      <div id="chat-left-side-content">
        <div id="chat-main-menu">
          <img
            src={userData.image}
            alt="unavailable"
            onClick={() => setDisplayProfile(true)}
          />
          <div id="chat-main-menu-options">
            <div className="main-menu-options-icons">
              <i id="chat-add-user-icon" className="fa fa-user-plus"></i>
            </div>
            <div className="main-menu-options-icons">
              <i id="chat-comment-icon" className="fa fa-comments" onClick={() => setDisplayContacts(true)}></i>
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
            <ChatCard key={index} data={object} parent={"chat"} action={() => setDisplayConversation(true)}
              edit={setConversationData}/>
          ))}
        </div>
      </div>

      <div id="chat-right-side-content">
        <div id="splash-screen-container" style={{display: displayConversation ? "none" : null}}>
          <div id="conversation-splash-screen">
            <img src={conversationImage} alt="unavailable" />
            <h3>Welcome to tellit chat page!</h3>
            <p>
              You can search for a contact or a conversation on the left menu.
            </p>
          </div>
        </div>

        <ChatConversationView display={displayConversation} data={conversationData}/>
      </div>
    </div>
  );
}

export default withRouter(ChatPage);
