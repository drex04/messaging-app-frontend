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
import { addMessage } from './utils/data.js'


function App() {
  // initialize state variables
  let [messages, setMessages] = useState([]);
  let [subject, setSubject] = useState('');
  let [body, setBody] = useState('');
  let navigate = useNavigate();

  // Authentication functions adapted from GCP Code Lab
  // https://github.com/firebase/codelab-friendlychat-web
  // Sign in
  async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider).then((response) => {
      console.log(response);
      localStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
      localStorage.setItem("User Email", response.user.email);
    });
    navigate("/messages");
  }

  // Handle form changes and submissions
  function handleSubjectChange(value) {
    setSubject(value);
  }
  function handleBodyChange(value) {
    setBody(value);
  }
  function handleSubmit(event) {
    // event.preventDefault();
    if (subject && body) {
      let userEmail = localStorage.getItem("User Email");
      addMessage(userEmail, subject, body);
    }
  } 




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
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
