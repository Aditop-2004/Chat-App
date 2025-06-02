import React, { use, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function Message({ message }) {
  const handleTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const { authUser } = useSelector((state) => state.user);
  return (
    <div ref={scroll}>
      <div
        className={`chat ${
          message.senderId === authUser?._id ||
          message.senderId?._id === authUser?._id
            ? "chat-end"
            : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={message?.senderId?.profilephoto}
            />
          </div>
        </div>
        <div className="chat-header text-black">
          {message?.senderId?.username}
          <time className="text-xs opacity-50">
            {handleTime(message?.createdAt)}
          </time>
        </div>
        <div className="chat-bubble">{message?.message}</div>
        <div className="chat-footer opacity-50 text-black">Delivered</div>
      </div>
    </div>
  );
}
