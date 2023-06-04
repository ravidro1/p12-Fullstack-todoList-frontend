import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./animation.css";
import { createContext } from "react";
import ContextData from "./context/ContextData";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import AuthContextProvider from "./context/AuthContextProvider";
import PrivateRoute from "./Utils/PrivateRoute";
import CheckLoggedRoute from "./Utils/CheckLoggedRoute";

export const Context = createContext();

function App() {
  const value = ContextData();

  return (
    <AuthContextProvider>
      <div role="q" className="w-[100vw] h-[100vh] bg-[#274f4f] font-BebasNeue">
        <Context.Provider value={value}>
          <Routes>
            <Route element={<CheckLoggedRoute />}>
              <Route path="/" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/Home" element={<Home />} />
            </Route>
          </Routes>
        </Context.Provider>
      </div>
    </AuthContextProvider>
  );
}

export default App;
