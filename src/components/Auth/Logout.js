import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Auth/authSlice";
import { resetUserState } from "../Profile/userSlice";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Logout = ({ onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(resetUserState());
    navigate("/"); // Redirect to the home page after logout
    if (onClick) onClick();
  }, [dispatch, navigate]);

  return (
    <ListItem button onClick={handleLogout}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Signout" />
    </ListItem>
  );
};

export default Logout;
