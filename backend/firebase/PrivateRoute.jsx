import React from "react";
import { useAuth } from "../firebase/AuthContect";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;
