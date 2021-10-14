import React from "react";
import { createContext } from "react";
import useFirbase from "../hooks/useFirbase";

// creating context for use firebse data transfer to all components

export const AuthProvider = createContext();

const AuthContext = ({ children }) => {
  return (
    <AuthProvider.Provider value={useFirbase()}>
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthContext;
