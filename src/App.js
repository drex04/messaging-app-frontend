import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import MessageList from "./MessageList.js";
import { createMessage, getAllMessages } from "./utils/data.js";
import { getUserEmail } from "./utils/auth.js";

function App() {
  // initialize state variables
  let [messages, setMessages] = useState([]);
  let [subject, setSubject] = useState("");
  const [userEmail, setUserEmail] = useState("");
  let [body, setBody] = useState("");
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
      navigate("/messages");
    });
  }

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const email = user.email;
      setUserEmail(email);
      // ...
    } else {
      // User is signed out
      console.log("User is not signed in");
    }
  });

  // Handling changes & submissions of "add new post" form
  function handleSubjectChange(value) {
    setSubject(value);
  }
  function handleBodyChange(value) {
    setBody(value);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (subject && body) {
      let userEmail = getUserEmail();
      let authToken = localStorage.getItem("Auth Token");
      const currentDate = new Date();
      await createMessage(userEmail, subject, body, currentDate, authToken);
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
  }, [navigate]);

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
              userEmail={userEmail}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
