// components/Messages/MessageList.jsx
import React, { useEffect } from "react";
import { List, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
// import { fetchMessages } from "../../redux/messages/messagesSlice";
import MessageItems from "./MessageItems";

const Message = () => {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    // dispatch(fetchMessages());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  if (error) return <div>Error: {error}</div>;

  return (
    <List>
      {messages.map((message) => (
        <MessageItems key={message.id} message={message} />
      ))}
    </List>
  );
};

export default Message;
