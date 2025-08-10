import { useState } from "react";
import "./App.css";
import Routing from "./utils/Routing";
import { Analytics } from "@vercel/analytics/react";
function App() {
  return (
    <div className="w-full h-screen from-[#0A0A0B] to-[#141415]">
      <Routing />
      <Analytics />
    </div>
  );
}

export default App;
