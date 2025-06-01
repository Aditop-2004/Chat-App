import React from "react";
import { IoSend } from "react-icons/io5";
export default function SendInput() {
  return (
    <form className="px-4 my-3 ">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Type a message ..."
          className="border text-sm p-3 border-zinc-500 rounded-lg block w-full text-white bg-gray-500"
        />
        <button className="absolute flex items-center inset-y-0 end-0 pr-4">
          <IoSend></IoSend>
        </button>
      </div>
    </form>
  );
}
