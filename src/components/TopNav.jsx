import React from "react";

const TopNav = () => {
  return (
    <div className="flex justify-between items-center bg-[#007bff] p-2">
      <img src="./Tonbologo.png" alt="tonbo-logo" className="h-12" />
      <h1 className="text-white text-3xl font-medium">
        TI Sensor Data & Tracking
      </h1>
      <button className="px-4 py-2 bg-[#78c987] text-white rounded-[25px] font-medium">
        Admin Login
      </button>
    </div>
  );
};

export default TopNav;
