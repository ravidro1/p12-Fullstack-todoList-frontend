import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

export default function CheckLoggedRoute() {
  const { token, verifyToken } = useContext(AuthContext);

  useEffect(() => {
    verifyToken();
  }, []);

  return token ? <Navigate to={"/Home"} /> : <Outlet />;
}
