import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //SignIn

  const signin = async (email, password) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.log("Error", error);
    }
  };

  //Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, signin, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
