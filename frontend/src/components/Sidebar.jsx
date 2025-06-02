import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers.jsx";
import axios from "axios";
import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import { setMessages } from "../redux/messageSlice.js";
import { useSelector, useDispatch } from "react-redux";
// import toast from "react-hot-toast";
export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const allOtherUsers = await axios.get(
          "http://localhost:8080/api/v1/user",
          {
            withCredentials: true,
          }
        );
        if (allOtherUsers.data.success) {
          setAllUsers(allOtherUsers.data.otherUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  });

  const [input, setInput] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    // navigate(`/search/${input}`);
    const filteredUsers = allUsers.filter((user) =>
      user.fullName.toLowerCase().includes(input.toLowerCase())
    );
    if (filteredUsers) {
      dispatch(setOtherUsers(filteredUsers));
    } else {
      dispatch(setOtherUsers([]));
      toast.error("No user found");
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/logout");
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setAuthUser(null));
        dispatch(setOtherUsers(null));
        dispatch(setSelectedUser(null));
        dispatch(setMessages(null));
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form action="" className="flex items-center gap-2">
        <input
          className="input input-bordered rounded-md"
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="btn  bg-slate-500 text-white"
          onClick={handleClick}
        >
          <BiSearchAlt2 className="w-6 h-6 outline-none" />
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers />
      <div className="mt-2">
        <button
          className="btn btn-sm
       "
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
