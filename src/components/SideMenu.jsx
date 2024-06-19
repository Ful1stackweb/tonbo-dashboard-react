import React, { useState } from "react";

const SideMenu = () => {
  return (
    <div className="border px-10">
      <div className="min-h-screen">
        <h2 className="text-[22px] font-bold text-red-500 mb-5 mt-4">
          Features
        </h2>
        <span className="mb-5">TI Detector</span>
        <ul className="text-black mb-5">
          <a href="">
            <li className="text-[16px] text-[#78c987] mb-2 mt-2">
              New Assembled Detector
            </li>
          </a>
          <a href="">
            <li className="text-[16px] text-[#78c987]">
              Inspect & Sensitivity Test
            </li>
          </a>
        </ul>
        <span className="mb-5">Assembled History</span>
        <ul className="text-black mb-5">
          <a href="">
            <li className="text-[16px] text-[#78c987] mb-2 mt-2">
              Sensor Replacement
            </li>
          </a>
          <a href="">
            <li className="text-[16px] text-[#78c987]">Dust Sensor</li>
          </a>
        </ul>
        <span className="mb-5">Rejections</span>
        <ul className="text-black mb-5">
          <a href="">
            <li className="text-[16px] text-[#78c987] mb-2 mt-2">
              Date-wise Assembled
            </li>
          </a>
          <a href="">
            <li className="text-[16px] text-[#78c987]">Overall Assembled</li>
          </a>
        </ul>
        <span className="mb-5">ODDO Status</span>
        <ul className="text-black mb-5">
          <a href="">
            <li className="text-[16px] text-[#78c987] mb-2 mt-2">Update</li>
          </a>
        </ul>
        <span className="mb-5">Detector History</span>
        <ul className="text-black ">
          <a href="">
            <li className="text-[16px] text-[#78c987] mb-2 mt-2">
              Tonbo Detector
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
