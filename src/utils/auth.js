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
