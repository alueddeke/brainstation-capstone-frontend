import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  //whenever user logs in, user info gets set here
  const [currentUser, setCurrentUser] = useState(null);
  //if user log in userLoggedin will be true
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  //whenever authentication state changes - login/out
  useEffect(() => {
    //initializeUser called whenever user info received
    //unsubscribe is for cleanup
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  //when users have successful login, info will be user
  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }
  const value = {
    currentUser,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}