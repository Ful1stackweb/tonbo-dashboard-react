import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className="border px-10">
      <div className="min-h-screen">
        <h2 className="text-[22px] font-bold text-red-500 mb-5 mt-4">
          Features
        </h2>
        <span className="mb-5">TI Detector</span>
        <ul className="text-black mb-5">
          <Link to="new-assembled-detector">
            <li className="text-[16px] text-[#78c987] mb-2 mt-2">
              New Assembled Detector
            </li>
          </Link>
          <Link to="inspect-sensitivity">
            <li className="text-[16px] text-[#78c987]">
              Inspect & Sensitivity Test
            </li>
          </Link>
        </ul>
        <span className="mb-5">Rejections</span>
        <ul className="text-black mb-5">
          <Link to="sensor-replacement">
            <li className="text-[16px] text-[#78c987] mb-2 mt-2">
              Sensor Replacement
            </li>
          </Link>
          <Link to="dust-sensor">
            <li className="text-[16px] text-[#78c987]">Dust Sensor</li>
          </Link>
        </ul>
        <span className="mb-5">Assembled History</span>
        <ul className="text-black mb-5">
          <Link to="overall-assembled">
            <li className="text-[16px] text-[#78c987]">Overall Assembled</li>
          </Link>
        </ul>
        <span className="mb-5">ODDO Status</span>
        <ul className="text-black mb-5">
          <Link to="update">
            <li className="text-[16px] text-[#78c987] mb-2 mt-2">Update</li>
          </Link>
        </ul>
        <span className="mb-5">Detector History</span>
        <ul className="text-black ">
          <Link to="tonbo-detector">
            <li className="text-[16px] text-[#78c987] mb-2 mt-2">
              Tonbo Detector
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
