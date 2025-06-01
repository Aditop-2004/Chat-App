import React from "react";
import SendInput from "./SendInput.jsx";
import Messages from "./Messages.jsx";

export default function MessageContainer() {
  return (
    <div className="md:min-w-[550px] flex-col ">
      <div className="flex items-center gap-2 bg-zinc-800">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx7sLJbdmCKh3Ko5fv9ahJsMGSZnIiRbz9Qg&s"
              alt="userprofile"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between gap-2 flex-1">
            <p className="font-normal text-white">Username</p>
          </div>
        </div>
      </div>
      <Messages />
      <SendInput />
    </div>
  );
}
