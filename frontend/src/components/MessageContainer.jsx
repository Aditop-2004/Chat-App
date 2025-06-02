import React from "react";
import SendInput from "./SendInput.jsx";
import Messages from "./Messages.jsx";
import { useDispatch, useSelector } from "react-redux";

export default function MessageContainer() {
  const { selectedUser } = useSelector((state) => state.user);
  return (
    <>
      {selectedUser && (
        <div className="md:min-w-[550px] flex-col flex">
          <div className="flex items-center gap-2 bg-zinc-800 p-2">
            <div className="avatar online">
              <div className="w-10 rounded-full">
                <img src={selectedUser?.profilephoto} alt="userprofile" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between gap-2 flex-1">
                <p className="font-normal text-white">{`${selectedUser?.username} (${selectedUser?.fullName})`}</p>
              </div>
            </div>
          </div>
          <Messages />
          <SendInput />
        </div>
      )}
    </>
  );
}
