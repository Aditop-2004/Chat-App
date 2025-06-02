import React from "react";
import OtherUser from "./OtherUser.jsx";
import useGetOtherUsers from "../hooks/useGetOtherUsers.jsx";
import { useSelector } from "react-redux";

export default function OtherUsers() {
  // console.log("hi");
  useGetOtherUsers();
  const { otherUsers } = useSelector((state) => state.user);

  if (!otherUsers) return; //early return in react(imp for interviews)

  return (
    <div className="overflow-y-auto flex-1">
      {otherUsers.map((user) => {
        return <OtherUser key={user._id} user={user} />;
      })}
    </div>
  );
}
