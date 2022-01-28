import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import MessageList from './MessageList.js'
import { addMessage, getAllMessages, updateMessage } from './utils/data.js'
import { getUserEmail } from './utils/auth.js'


function App() {
  // initialize state variables
  let [messages, setMessages] = useState([]);
  let [subject, setSubject] = useState("");
  let [body, setBody] = useState("");
  let [editSubject, setEditSubject] = useState("");
  let [editBody, setEditBody] = useState("");
  let [editMessageId, setEditMessageId] = useState();
  let navigate = useNavigate();

  // Authentication functions adapted from GCP Code Lab
  // https://github.com/firebase/codelab-friendlychat-web
  // Sign in User
  async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider).then((response) => {
      console.log(response);
      localStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
    });
    navigate("/messages");
  }

  // Handling changes & submissions of "add new post" form
  function handleSubjectChange(value) {
    setSubject(value);
  }
  function handleBodyChange(value) {
    setBody(value);
  }
  async function handleSubmit(event) {
    // event.preventDefault();
    if (subject && body) {
      let userEmail = getUserEmail();
      let authToken = localStorage.getItem("Auth Token");
      const currentDate = new Date();
      await addMessage(userEmail, subject, body, currentDate, authToken);
      let mounted = true;
      await getAllMessages(setMessages, mounted);
      mounted = false;
    }
  }

  // Handling changes & submissions of "update post" form
  function handleEditSubjectChange(value) {
    setEditSubject(value);
  }
  function handleEditBodyChange(value) {
    setEditBody(value);
  }
  async function handleEditSubmit(event) {
    //event.preventDefault();
    if (editSubject && editBody) {
      const currentDate = new Date();
      await updateMessage(
        editMessageId.value[0],
        editSubject,
        editBody,
        currentDate
      );
      let mounted = true;
      await getAllMessages(setMessages, mounted);
      mounted = false;
    }
  }

  useEffect(() => {
    // Check if user is logged in and reroute to messages page if already logged in
    let authToken = localStorage.getItem("Auth Token");
    if (authToken) {
      navigate("/messages");
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<button onClick={signIn}>Log in with Google</button>}
        />
        <Route
          path="/messages"
          element={
            <MessageList
              messages={messages}
              setMessages={setMessages}
              onSubjectChange={handleSubjectChange}
              onBodyChange={handleBodyChange}
              onSubmit={handleSubmit}
              subject={subject}
              body={body}
              onEditSubjectChange={handleEditSubjectChange}
              onEditBodyChange={handleEditBodyChange}
              onEditSubmit={handleEditSubmit}
              editSubject={editSubject}
              editBody={editBody}
              editMessageId={editMessageId}
              setEditMessageId={setEditMessageId}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
