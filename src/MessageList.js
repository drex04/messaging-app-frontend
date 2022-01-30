import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMessages } from "./utils/data.js";
import EditMessage from "./EditMessage.js";

export default function MessageList({
  messages,
  setMessages,
  subject,
  body,
  onSubjectChange,
  onBodyChange,
  onSubmit,
  userEmail,
}) {
  const navigate = useNavigate();

  // Handling changes & submissions of "add new post" form
  function handleSubjectChange(event) {
    onSubjectChange(event.target.value);
  }
  function handleBodyChange(event) {
    onBodyChange(event.target.value);
  }
  function handleSubmit(event) {
    onSubmit(event);
  }

  useEffect(() => {
    // Check if user is logged in and reroute to login page if not
    let authToken = localStorage.getItem("Auth Token");
    if (authToken) {
      navigate("/messages");
    }
    if (!authToken) {
      navigate("/");
    }

    let mounted = true; // to prevent memory leaks

    // Get all existing messages
    getAllMessages(setMessages, mounted);

    return () => {
      mounted = false; // to prevent memory leaks
    };
  }, [setMessages, navigate]);

  // Sort messages by post date (descending)
  var sortable = [];
  for (var message in messages) {
    sortable.push([message, messages[message]]);
  }
  sortable.sort(function (a, b) {
    return new Date(b[1].dateCreated) - new Date(a[1].dateCreated);
  });

  // Generate message JSX elements using array sorted by post date (desc)
  let messageComponentsArray = sortable.map(messageComponentGenerator);

  function messageComponentGenerator(value, index, array) {
    let messageKey = value[0];
    let messageContents = value[1];
    return (
      <div key={messageKey} className="message-container">
        <h3>{messageContents.subject}</h3>
        <p>{messageContents.body}</p>
        <h5>Submitted by: {messageContents.userEmail}</h5>
        <p className="date">Last updated: {messageContents.dateUpdated}</p>
        <p className="date">Posted on: {messageContents.dateCreated}</p>
        <EditMessage
          value={value}
          setMessages={setMessages}
          userEmail={userEmail}
        />
      </div>
    );
  }

  return (
    <div className="message-page">
      <div className="new-message-form">
        <form onSubmit={handleSubmit}>
          <label>
            Add new post:
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={handleSubjectChange}
            />
            <textarea
              placeholder="Body"
              value={body}
              onChange={handleBodyChange}
            />
            <input type="submit" value="Submit" />
          </label>
        </form>
      </div>
      <div className="message-list">{messageComponentsArray}</div>
    </div>
  );
}
