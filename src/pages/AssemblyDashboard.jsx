import React from "react";
import SideMenu from "../components/SideMenu";
import NewAssembledDetector from "../sections/Assembly/NewAssembledDetector";
import InspectAndSensitivityTest from "../sections/Assembly/InspectAndSensitivityTest";
import SensorReplacement from "../sections/Assembly/SensorReplacement";
import DustSensor from "../sections/Assembly/DustSensor";
import OverallAssembled from "../sections/Assembly/OverallAssembled";
import Update from "../sections/Assembly/Update";
import TonboDetector from "../sections/Assembly/TonboDetector";
import { Route, Routes } from "react-router-dom";

const AssemblyDashboard = () => {
  return (
    <div className="flex">
      <div>
        <SideMenu />
      </div>
      <div className="w-3/4 p-4">
        <Routes>
          <Route
            path="new-assembled-detector"
            element={<NewAssembledDetector />}
          />
          <Route
            path="inspect-sensitivity"
            element={<InspectAndSensitivityTest />}
          />
          <Route path="sensor-replacement" element={<SensorReplacement />} />
          <Route path="dust-sensor" element={<DustSensor />} />
          <Route path="overall-assembled" element={<OverallAssembled />} />
          <Route path="update" element={<Update />} />
          <Route path="tonbo-detector" element={<TonboDetector />} />
        </Routes>
      </div>
    </div>
  );
};

export default AssemblyDashboard;
