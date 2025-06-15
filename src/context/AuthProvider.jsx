import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { toast } from "react-toastify";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // console.log(user);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // signIn user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // signOutUser
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // profile Update
  const profileUpdate = () => {
    return updateProfile(auth.currentUser, {
      displayName: "Jane Q. User",
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);
  const userInfo = {
    user,
    loading,
    setLoading,
    createUser,
    googleLogIn,
    signInUser,
    signOutUser,
    profileUpdate,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
