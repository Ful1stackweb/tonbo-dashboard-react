import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TopNav from "./components/TopNav";
import Footer from './components/Footer';
import './index.css';
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white text-center p-4">
        {/* Your header content */}
        <h1>Welcome to Tonbo Imaging</h1>
      </header>
      <main className="flex-grow mb-12">
        {/* Your main content */}
        <div className="container mx-auto p-4">
          <p>Your main content goes here.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
