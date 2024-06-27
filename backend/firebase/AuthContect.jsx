import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  //SignIn

  const signin = async (email, password) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      setCurrentUser(user);
      navigate("/assembly-dashboard");
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

      // Only fetch user data if user is authenticated
      if (user) {
        fetchUserData(user.uid); // Pass user.uid to fetchUserData
      }
    });

    const fetchUserData = async (uid) => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${uid}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    return unsubscribe;
  }, []);

  const value = { currentUser, userData, signin, logout };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
