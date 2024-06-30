import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Auth/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/"); // Redirect to the home page after logout
  }, [dispatch, navigate]);

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return null; // Return null since this component doesn't render anything
};

export default Logout;
