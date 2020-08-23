import React, { useState } from "react";
import "../../styles/chat-option-panel.scss";

import testLogo from "../../images/conversation-img.jpg";

import ChatCard from "./chat-card";

function ChatProfilePanel(props) {
  const [nameReadOnly, setNameReadOnly] = useState(true);
  const [name, setName] = useState("Abraham Arreola");
  var nameInputRef;

  const [statusReadOnly, setStatusRedOnly] = useState(true);
  const [status, setStatus] = useState("Good");
  var statusInputRef;

  return (
    <div className="chat-option-panel-container">
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
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Jorge Abraham",
      message: "Hello A",
    },
    {
      id: 2,
      name: "Carlos Perez",
      message:
        "Hello world, this is a longer message to test de chat card, i hope this actually works",
    },
    {
      id: 3,
      name: "Joaquin Emiliano",
      message: "Hello V",
    },
    {
      id: 4,
      name: "Sofía Franco",
      message: "Hello A",
    },
  ]);

  const [selectedContacts, setSelectedContacts] = useState([]);

  var scrollBottom = React.createRef(null);

  const selectContact = (data) => {
    var arrayData = [...contacts];
    var index = arrayData.findIndex((contact) => contact.id === data.id);
    arrayData.splice(index, 1);
    setContacts(arrayData);

    setSelectedContacts([...selectedContacts, data]);
    scrollBottom.scrollIntoView({ behavior: "smooth" });
  };

  const unselectContact = (data) => {
    var arrayData = [...selectedContacts];
    var index = arrayData.findIndex((contact) => contact.id === data.id);
    arrayData.splice(index, 1);
    setSelectedContacts(arrayData);

    setContacts([...contacts, data]);
  };

  const ContactAdded = (props) => {

    const onCloseClick = () => {
      props.action(props.data);
    }

    return (
      <div>
        <div id="contact-added">
          <img src={testLogo} alt="unavailable" />
          <p>{props.data.name}</p>
          <i className="fa fa-close" onClick={onCloseClick}></i>
        </div>
      </div>
    );
  };

  return (
    <div id="chat-group-panel" className="chat-option-panel-container">
      <div className="main-color-panel">
        <div className="main-panel-header">
          <i className="fa fa-arrow-left" onClick={props.closeGroup}></i>
          <p>Add participants</p>
        </div>
      </div>

      <div id="contact-option-container">
        <div id="contact-added-container">
          {selectedContacts.map((object, index) => (
            <ContactAdded key={index} data={object} action={unselectContact}/>
          ))}
        </div>
        <input type="text" placeholder="Type the contact's name" />
        <div
          style={{ marginTop: "3em" }}
          ref={(e) => {
            scrollBottom = e;
          }}
        ></div>
      </div>

      <div id="chat-contacts-container">
        {contacts.map((object, index) => (
          <ChatCard
            key={index}
            data={object}
            parent={"group"}
            action={selectContact}
          />
        ))}
      </div>

      <div id="contact-confirm-panel"></div>
    </div>
  );
}

export { ChatProfilePanel, ChatGroupPanel };
