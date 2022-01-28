import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserEmail } from "./utils/auth.js";

export default function EditMessage(props) {
  let messageKey = props.value[0];
  let messageContents = props.value[1];
  let editSubject = props.editSubject;
  let editBody = props.editBody;
  let [editStatus, setEditStatus] = useState(false);
  let editMessageId = props.editMessageId;
  let setEditMessageId = props.setEditMessageId;

  // Handling changes & submissions of update form
  function handleEditSubjectChange(event) {
    props.onEditSubjectChange(event.target.value);
  }
  function handleEditBodyChange(event) {
    props.onEditBodyChange(event.target.value);
  }
  function handleEditSubmit(event) {
    props.onEditSubmitEdit(event);
  }

  // let userEmail = getUserEmail(); // // This GCP API isn't working here for some reason

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
              value={editSubject}
              onChange={handleEditSubjectChange}
            />
          </label>
          <label>
            Body:
            <textarea
              placeholder="Body"
              value={editBody}
              onChange={handleEditBodyChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  };

  const handleClick = (messageKey) => {
    setEditStatus(true);
    setEditMessageId(messageKey);
  }

  // // Only render the Edit button option if the submitter matches the logged-in user
  // if (userEmail === messageContents.userEmail) {
  //   return <button onClick={editMessage}>Edit</button>;
  // } else {
  //   return null;
  // }

  return (
    <div>
    
      <button onClick={handleClick}>Edit</button>
      {editStatus ? RenderEditForm() : null}
    </div>
  );
}
