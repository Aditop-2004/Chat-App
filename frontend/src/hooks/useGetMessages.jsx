import axios from "axios";
import React, { useEffect } from "react";
import { setMessages } from "../redux/messageSlice";
import { useDispatch, useSelector } from "react-redux";
const useGetMessages = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/message/${selectedUser?._id}`,
          {
            withCredentials: true,
          }
        );
        console.log(res);
        if (res.data.success) {
          console.log(res.data.conversation.messages);
          dispatch(setMessages(res.data.conversation.messages));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [selectedUser, dispatch]);
};

export default useGetMessages;
