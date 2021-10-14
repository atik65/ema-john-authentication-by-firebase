import React, { useState, useEffect } from "react";
import initializeAuthentication from "../firebase/firebaseInit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

// firebase initialization function call

initializeAuthentication();
const auth = getAuth();
// createing  proivder  for google sign in

// useFirebase function

const useFirbase = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // function for  sign in with google

  const goooelSignIn = () => {
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  // create user with email and password function
  const createNewUserWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in with email and password function
  const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   function for sign out

  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .then((result) => {
        setLoading(false);
        setError("");
        setUser({});
      })
      .catch((error) => {
        setLoading(false);
        setError("Log Out Failed");
      });
  };

  //   on auth state change function

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setError("");
      } else {
        setError("");
      }

      setLoading(false);
    });
    return () => unsubscribed;
  }, []);

  return {
    user,
    error,
    loading,
    goooelSignIn,
    signInWithEmail,
    createNewUserWithEmail,
    logOut,
  };
};

export default useFirbase;
