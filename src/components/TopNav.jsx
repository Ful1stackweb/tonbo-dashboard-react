import React from "react";
import { useAuth } from "../../backend/firebase/AuthContect";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const { currentUser, userData, logout } = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="flex top-0 sticky justify-between items-center bg-[#5cabff] p-2">
      <a href="/">
        <img src="/Tonbologo.png" alt="tonbo-logo" className="h-12" />
      </a>

      <h1 className="text-white text-3xl font-medium">
        TI Detector Data & Tracking
      </h1>

      {currentUser ? (
        <div className="flex items-center space-x-7">
          <p className="text-white text-xl">Welcome, {userData.username}</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#78c987] text-white rounded-[25px] font-medium"
          >
            Logout
          </button>
        </div>
      ) : (
        <button className="px-4 py-2 bg-[#78c987] text-white rounded-[25px] font-medium">
          Admin Login
        </button>
      )}
    </div>
  );
};

export default TopNav;
