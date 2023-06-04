import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

export default function PrivateRoute() {
  const { token, verifyToken } = useContext(AuthContext);

  useEffect(() => {
    verifyToken();
  }, []);

  return token ? <Outlet /> : <Navigate to={"/"} />;
}
