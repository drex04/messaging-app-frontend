import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Returns the signed-in user's display name.
export function getUserEmail() {
  return getAuth().currentUser.email;
}
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User

    const uid = user.uid;
    const userEmail = user.email;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
