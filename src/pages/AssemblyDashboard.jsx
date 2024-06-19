import React from "react";
import SideMenu from "../components/SideMenu";
import NewAssembledDetector from "../sections/Assembly/NewAssembledDetector";
import InspectAndSensitivityTest from "../sections/Assembly/InspectAndSensitivityTest";

const AssemblyDashboard = () => {
  return (
    <div className="flex">
      <div>
        <SideMenu />
      </div>
      <div>
        {/* path=/assembly-dashboard */}
        {/* <NewAssembledDetector /> */}
        {/* <InspectAndSensitivityTest /> */}
      </div>
    </div>
  );
};

export default AssemblyDashboard;
