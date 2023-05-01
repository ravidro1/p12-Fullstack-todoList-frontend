import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./animation.css";
import AnimatedRoutes from "./Components/AnimatedRoutes";
import { useEffect } from "react";
import { createContext } from "react";
import ContextData from "./ContextData";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";

export const Context = createContext();

function App() {
  const value = ContextData();

  return (
    <div role="q" className="w-[100vw] h-[100vh] bg-[#274f4f] font-BebasNeue">
      
      <Context.Provider value={value}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
