import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../services/GlobalContext";

export const ProtectedRoute = ({ children }) => {
  const { state } = useContext(GlobalContext);

  return state.isLoggedIn ? children : <Navigate to="/login" />;
};
