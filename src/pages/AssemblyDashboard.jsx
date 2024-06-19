import React from "react";
import SideMenu from "../components/SideMenu";
import NewAssembledDetector from "../sections/Assembly/NewAssembledDetector";
import InspectAndSensitivityTest from "../sections/Assembly/InspectAndSensitivityTest";
import SensorReplacement from "../sections/Assembly/SensorReplacement";
import DustSensor from "../sections/Assembly/DustSensor";
import DateWiseAssembled from "../sections/Assembly/DateWiseAssembled";
import OverallAssembled from "../sections/Assembly/OverallAssembled";
import Update from "../sections/Assembly/Update";
import TonboDetector from "../sections/Assembly/TonboDetector";
const AssemblyDashboard = () => {
  return (
    <div className="flex">
      <div>
        <SideMenu />
      </div>
      <div>
        {/* path=/assembly-dashboard */}
        {/* <NewAssembledDetector/> */}
        {/* <InspectAndSensitivityTest /> */}
        {/* <SensorReplacement/> */}
        {/* <DustSensor /> */}
        {/* <DateWiseAssembled/> */}
         {/* <Update/> */}
        {/* <TonboDetector/> */}
       

      </div>
    </div>
  );
};

export default AssemblyDashboard;