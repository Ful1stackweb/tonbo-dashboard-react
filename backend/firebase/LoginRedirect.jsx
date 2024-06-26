import React from "react";
import { useAuth } from "../firebase/AuthContect";
import { Navigate } from "react-router-dom";

const LoginRedirect = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Navigate to="/assembly-dashboard" /> : children;
};

export default LoginRedirect;
