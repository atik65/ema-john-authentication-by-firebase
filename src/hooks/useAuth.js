import React from "react";
import { useContext } from "react";
import { AuthProvider } from "../Contexts/AuthContext";

const useAuth = () => {
  return useContext(AuthProvider);
};

export default useAuth;
