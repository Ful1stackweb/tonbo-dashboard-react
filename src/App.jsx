import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TopNav from "./components/TopNav";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <TopNav />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}

export default App;
