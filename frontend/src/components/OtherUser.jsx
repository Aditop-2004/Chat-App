import React from "react";

export default function OtherUser() {
  return (
    <div>
      <div className="flex items-center gap-2 hover:bg-zinc-300 rounded p-2 cursor-pointer">
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
            <p className="font-semibold text-black">Username</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </div>
  );
}
