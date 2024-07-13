import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Auth/authSlice";
import { resetUserState } from "../Profile/userSlice";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Logout = ({ onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(resetUserState());
    navigate("/"); // Redirect to the home page after logout
    if (onClick) onClick();
  }, [dispatch, navigate, onClick]);

  // Check if isAuthenticated and user are defined before accessing user.userType
  if (!isAuthenticated || !user || !user.userType) {
    return null; // Or handle the case where user or userType is not defined
  }

  return (
    <>
      {user.userType === "seller" ? (
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Signout" />
        </ListItem>
      ) : (
        <div onClick={handleLogout} style={{ cursor: "pointer" }}>
          Signout
        </div>
      )}
    </>
  );
};

export default Logout;
