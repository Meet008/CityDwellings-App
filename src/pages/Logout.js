// src/components/Logout.js
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { logout } from "../auth/authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;