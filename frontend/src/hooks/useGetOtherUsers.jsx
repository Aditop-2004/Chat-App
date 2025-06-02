import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
export default function useGetOtherUsers() {
  const dispatch = useDispatch();
//   console.log("bye");
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/user", {
          withCredentials: true,
        });
        console.log(res);
        if (res.data.success) {
          dispatch(setOtherUsers(res.data.otherUsers));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, []);
}
