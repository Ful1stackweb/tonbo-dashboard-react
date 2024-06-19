import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TopNav from "./components/TopNav";
import LoginBoxes from "./components/LoginBoxes";
import MultipleLogin from "./pages/MultipleLogin";
import Login from "./pages/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import AssemblyDashboard from "./pages/AssemblyDashboard";
import NewAssembledDetector from "./sections/Assembly/NewAssembledDetector";

function App() {
  return (
    <>
      <TopNav />
      <Router>
        <Routes>
          <Route path="/" element={<MultipleLogin />} />
          <Route
            path="/login/assembly"
            element={<Login title={"Assembly"} />}
          />
          <Route
            path="/login/calibration"
            element={<Login title={"Calibration"} />}
          />
          <Route
            path="/login/post-calibration"
            element={<Login title={"Post Calibration"} />}
          />
          <Route
            path="/login/detector-testing"
            element={<Login title={"Detector Testing"} />}
          />
          <Route
            path="/login/rejection-rma"
            element={<Login title={"Rejection & RMA"} />}
          />
          <Route path="/assembly-dashboard" element={<AssemblyDashboard />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
