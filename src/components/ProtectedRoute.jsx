import React from "react";
import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

export default function ProtectedRoute({ rolesPermitidos, children }) {
  const usuario = getUserFromToken();
  if (!usuario) return <Navigate to="/login" replace />;
  if (!rolesPermitidos.includes(usuario.rol)) return <Navigate to="/" replace />;
  return children;
}
