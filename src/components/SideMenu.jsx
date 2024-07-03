import React from "react";
import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdSettings,
  MdHistory,
  MdBuild,
  MdSensors,
  MdFlashOn,
} from "react-icons/md"; // Added MdFlashOn for Dust Sensor

const SideMenu = () => {
  return (
    <div className="border-r border-gray-300 px-8 bg-gradient-to-br from-white to-gray-100 shadow-xl">
      <div className="min-h-screen py-8">
        <h2 className="text-2xl font-extrabold text-blue-700 mb-6">Features</h2>

        <div className="mb-6">
          <span className="block text-lg font-semibold text-gray-800 mb-3">
            TI Detector
          </span>
          <ul className="space-y-2">
            <li>
              <Link to="new-assembled-detector" className="flex items-center text-base text-blue-600 hover:text-blue-800 transition duration-300 transform hover:scale-105">
                <MdDashboard className="mr-3 text-lg" /> New Assembled Detector
              </Link>
            </li>
            <li>
              <Link to="inspect-sensitivity" className="flex items-center text-base text-blue-600 hover:text-blue-800 transition duration-300 transform hover:scale-105">
                <MdBuild className="mr-3 text-lg" /> Inspect & Sensitivity Test
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <span className="block text-lg font-semibold text-gray-800 mb-3">
            Rejections
          </span>
          <ul className="space-y-2">
            <li>
              <Link to="sensor-replacement" className="flex items-center text-base text-blue-600 hover:text-blue-800 transition duration-300 transform hover:scale-105">
                <MdSensors className="mr-3 text-lg" /> Sensor Replacement
              </Link>
            </li>
            <li>
              <Link to="dust-sensor" className="flex items-center text-base text-blue-600 hover:text-blue-800 transition duration-300 transform hover:scale-105">
                <MdFlashOn className="mr-3 text-lg" /> Dust Sensor
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <span className="block text-lg font-semibold text-gray-800 mb-3">
            Assembled History
          </span>
          <ul className="space-y-2">
            <li>
              <Link to="overall-assembled" className="flex items-center text-base text-blue-600 hover:text-blue-800 transition duration-300 transform hover:scale-105">
                <MdHistory className="mr-3 text-lg" /> Overall Assembled
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <span className="block text-lg font-semibold text-gray-800 mb-3">
            ODOO Status
          </span>
          <ul className="space-y-2">
            <li>
              <Link to="update" className="flex items-center text-base text-blue-600 hover:text-blue-800 transition duration-300 transform hover:scale-105">
                <MdSettings className="mr-3 text-lg" /> Update
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <span className="block text-lg font-semibold text-gray-800 mb-3">
            Detector History
          </span>
          <ul className="space-y-2">
            <li>
              <Link to="tonbo-detector" className="flex items-center text-base text-blue-600 hover:text-blue-800 transition duration-300 transform hover:scale-105">
                <MdDashboard className="mr-3 text-lg" /> Tonbo Detector
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
