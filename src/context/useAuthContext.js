import React, { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";

export default function useAuthContext() {
  return useContext(AuthContext);
}
