// components/Messages/MessageItem.jsx
import React from "react";
import { ListItem, ListItemText, Typography } from "@mui/material";

const MessageItems = ({ message }) => {
  return (
    <ListItem>
      <ListItemText
        primary={message.subject}
        secondary={
          <>
            <Typography component="span" variant="body2" color="textPrimary">
              {message.senderName}
            </Typography>
            {` - ${message.message}`}
          </>
        }
      />
    </ListItem>
  );
};

export default MessageItems;
