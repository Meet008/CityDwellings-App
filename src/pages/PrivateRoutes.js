// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ element, allowedRoles, ...rest }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.userType) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.userType)) {
    return user.userType === "buyer" ? (
      <Navigate to="/" />
    ) : (
      <Navigate to="/profile/dashboard" />
    );
  }
  return element;
};

export default PrivateRoutes;
