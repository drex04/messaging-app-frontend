import React, { useState } from "react";
import { getAllMessages, updateMessage } from "./utils/data.js";

export default function EditMessage({
  value: [messageKey, messageContents],
  setMessages,
  userEmail,
}) {
  const [tempSubject, setTempSubject] = useState(messageContents.subject);
  const [tempBody, setTempBody] = useState(messageContents.body);
  let [editStatus, setEditStatus] = useState(false);
  const authToken = localStorage.getItem("Auth Token");

  // Handling changes & submissions of "update post" form
  function handleTempSubjectChange({ target: { value } }) {
    setTempSubject(value);
  }
  function handleTempBodyChange({ target: { value } }) {
    setTempBody(value);
  }
  async function handleEditSubmit(event) {
    // event.preventDefault();
    const currentDate = new Date();
    console.log(currentDate);
    if (tempSubject && tempBody) {
      await updateMessage({
        messageId: messageKey,
        body: tempBody,
        currentDate: currentDate,
        dateCreated: messageContents.dateCreated,
        subject: tempSubject,
        userEmail: userEmail,
        authToken: authToken,
      });
      let mounted = true;
      await getAllMessages(setMessages, mounted);
      mounted = false;
    }
  }

  const RenderEditForm = () => {
    return (
      <div className="edit-message-form">
        <form onSubmit={handleEditSubmit}>
          <label>
            Message ID:
            <input type="text" value={messageKey} readOnly />
          </label>
          <label>
            Subject:
            <input
              type="text"
              placeholder="Subject"
              value={tempSubject}
              onChange={handleTempSubjectChange}
            />
          </label>
          <label>
            Body:
            <textarea
              placeholder="Body"
              value={tempBody}
              onChange={handleTempBodyChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  };

  const handleClick = () => {
    setEditStatus(true);
  };

  return (
    <div>
      {messageContents.userEmail === userEmail ? (
        <button onClick={handleClick}>Edit</button>
      ) : null}
      {editStatus ? RenderEditForm() : null}
    </div>
  );
}
