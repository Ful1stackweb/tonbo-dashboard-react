import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TopNav from "./components/TopNav";
import LoginBoxes from "./components/LoginBoxes";
import MultipleLogin from "./pages/MultipleLogin";
import Footer from "./components/Footer";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TopNav />
      <MultipleLogin />
      <Footer/>
      
    </>
  );
}

export default App;
