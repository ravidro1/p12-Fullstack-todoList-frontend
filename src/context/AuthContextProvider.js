import axios from "axios";
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const value = AuthContextData();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const AuthContextData = () => {
  const [token, setToken] = useState(false);

  const verifyToken = async () => {
    axios
      .post("/api/user/refresh-token")
      .then((res) => {
        setToken(res.data.token);
      })
      .catch((e) => {
        console.log(e);
        setToken(null);
      });
  };

  return { token, setToken, verifyToken };
};
