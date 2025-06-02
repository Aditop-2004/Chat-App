import axios from "axios";
import React, { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoSend } from "react-icons/io5";
import { setMessages } from "../redux/messageSlice";
export default function SendInput() {
  const [input, setInput] = useState("");
  const activeuserID = useSelector((state) => state.user.selectedUser._id);
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input === "") return;
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${activeuserID}`,
        { message: input },
        { withCredentials: true }
      );
      console.log(res.data.newMessage.message);
      if (res.data.success) {
        setInput("");
        if (messages) dispatch(setMessages([...messages, res.data.newMessage]));
        else dispatch(setMessages([res.data.newMessage]));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="px-4 my-3 ">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Type a message ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border text-sm p-3 border-zinc-500 rounded-lg block w-full text-white bg-gray-500"
        />
        <button
          className="absolute flex items-center inset-y-0 end-0 pr-4"
          type="submit"
          onClick={handleSubmit}
        >
          <IoSend></IoSend>
        </button>
      </div>
    </form>
  );
}
