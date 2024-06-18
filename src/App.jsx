import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TopNav from "./components/TopNav";
import LoginBoxes from "./components/LoginBoxes";
import MultipleLogin from "./pages/MultipleLogin";
function App() {
  return (
    <>
      <TopNav />
      <MultipleLogin />
    </>
  );
}

export default App;
