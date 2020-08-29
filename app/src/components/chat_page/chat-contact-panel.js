import React, { useState } from "react";
import "../../styles/chat-contact-panel.scss";

import ChatCard from "./chat-card";

function ChatContactPanel(props) {

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
      name: "joaquin Emiliano",
      message: "Hello V",
    },
    {
      id: 4,
      name: "Sofía Franco",
      message: "Hello A",
    },
    {
      id: 5,
      name: "Juan López",
      message: "Hello A",
    },
  ]);

  const sortContacts = () => {
    const expression = /[A-Za-z]/;
    var contactsGrouped = {};
    
    //Groups contacts by its initial name's letter
    contacts.forEach(contact => {
      var letter = expression.exec(contact.name.toUpperCase())[0];

      if(!contactsGrouped[letter]) contactsGrouped[letter] = [];
      contactsGrouped[letter].push(contact);
    });

    //Converts dictionary to array to use this one properties
    var contactsArray = Object.keys(contactsGrouped).map(key => {
      return [key, contactsGrouped[key]];
    });

    //Sorts the array alphabetically
    var contactsSorted = contactsArray.sort((a, b) => {
      if(a[0] < b[0]) return -1;
      if(a[0] > b[0]) return 1;
      return 0;
    });

    return contactsSorted;
  }

  const sortedContacts = sortContacts();

  const ContactsSection = (props) => {
    return(
      <div id="contact-section">
        <p>{props.data.letter}</p>
        {
          props.data.contacts.map((object, index) => (
            <ChatCard key={index} data={{name: object.name, message: object.message}}/>
          ))
        }
      </div>
    )
  }

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

      <div id="contact-section-container">
        {
          sortedContacts.map((object, index) => (
            <ContactsSection key={index} data={{letter: object[0], contacts: object[1]}}/>
          ))
        }
      </div>

    </div>
  );
}

export default ChatContactPanel;
