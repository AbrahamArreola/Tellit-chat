import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "../../styles/chat-group-panel.scss";

import testLogo from "../../images/conversation-img.jpg";

import ChatCard from "./chat-card";

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
    {
      id: 4,
      name: "Sofía Franco",
      message: "Hello A",
    },
    {
      id: 4,
      name: "Sofía Franco",
      message: "Hello A",
    },
    {
      id: 4,
      name: "Sofía Franco",
      message: "Hello A",
    },
  ]);

  const [selectedContacts, setSelectedContacts] = useState([]);

  var scrollBottom = React.createRef(null);

  const [displayConfirmPanel, setDisplayConfirmPanel] = useState(false);

  const confirmPanelRef = React.createRef(null);

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
    };

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

  const CreateGroupPanel = () => {

    const [confirmButton, setConfirmButton] = useState(false);

    return (
      <div
        ref={confirmPanelRef}
        id="chat-create-group-panel"
        className="option-panel chat-option-panel-container"
      >
        <div className="main-color-panel">
          <div className="main-panel-header">
            <i
              className="fa fa-arrow-left"
              onClick={() => setDisplayConfirmPanel(false)}
            ></i>
            <p>New group</p>
          </div>
        </div>

        <div className="secondary-color-panel">
          <img src={testLogo} alt="Unavailable" />
        </div>

        <div id="group-information-panel" className="information-panel">
          <p>Group</p>
          <div>
            <input
              type="text"
              maxLength={25}
              placeholder="Enter group's name"
              onChange={(e) => setConfirmButton(e.target.value.length !== 0)}
            />
          </div>
        </div>

        <div className="panel-confirm-panel">
          <button
            type="button"
            className="btn btn-outline-primary fa fa-arrow-right"
            style={{
              display: confirmButton ? "block" : "none",
            }}
          ></button>
        </div>
      </div>
    );
  };

  return (
    <div id="chat-group-panel" className="chat-option-panel-container">
      <CSSTransition
        nodeRef={confirmPanelRef}
        in={displayConfirmPanel}
        timeout={500}
        classNames="option-panel"
        unmountOnExit
      >
        <CreateGroupPanel />
      </CSSTransition>
      
      <div className="main-color-panel">
        <div className="main-panel-header">
          <i className="fa fa-arrow-left" onClick={props.closeGroup}></i>
          <p>Add participants</p>
        </div>
      </div>

      <div id="contact-option-container">
        <div id="contact-added-container">
          {selectedContacts.map((object, index) => (
            <ContactAdded key={index} data={object} action={unselectContact} />
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
        {[]
          .concat(contacts)
          .sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          })
          .map((object, index) => (
            <ChatCard
              key={index}
              data={object}
              parent={"group"}
              action={selectContact}
            />
          ))}
      </div>

      <div className="panel-confirm-panel">
        <button
          type="button"
          className="btn btn-outline-primary fa fa-arrow-right"
          style={{ display: selectedContacts.length === 0 ? "none" : "block" }}
          onClick={() => setDisplayConfirmPanel(true)}
        ></button>
      </div>
    </div>
  );
}

export default ChatGroupPanel;
