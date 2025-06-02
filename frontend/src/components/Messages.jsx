import React from "react";
import Message from "./Message.jsx";
import useGetMessages from "../hooks/useGetMessages.jsx";
import { useSelector } from "react-redux";

export default function Messages() {
  useGetMessages();
  const { messages } = useSelector((state) => state.message);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages?.map((message) => {
        return <Message key={message._id} message={message} />;
      })}
    </div>
  );
}
