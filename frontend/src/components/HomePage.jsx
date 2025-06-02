import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

export default function HomePage() {
  return (
    <div
      className="flex sm:h-[450px] md:h-[500px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter 
    backdrop-blur-lg bg-opacity-0
    border border-gray-700 border-2 shadow-2xl"
    >
      <Sidebar />
      <MessageContainer />
    </div>
  );
}
