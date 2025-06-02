import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";


export default function OtherUser({ user }) {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);
  const handleSelect = () => {
    console.log(user);
    dispatch(setSelectedUser(user));
   
  };
  return (
    <>
      <div
        className={`${
          selectedUser?._id === user._id ? "bg-zinc-100" : ""
        } flex items-center gap-2 hover:bg-zinc-300 rounded p-2 cursor-pointer`}
        onClick={handleSelect}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full ">
            <img src={user?.profilephoto} alt="userprofile" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between gap-2 flex-1">
            <p className="font-semibold text-orange-800">{`${user.username} (${user.fullName})`}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
}
