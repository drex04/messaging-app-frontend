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


function App() {
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

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<button onClick={signIn}>Log in with Google</button>}
        />
        <Route path="/messages" element={<MessageList />} />
      </Routes>
    </div>
  );
}

export default App;
