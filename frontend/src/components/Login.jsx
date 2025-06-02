import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log(user);
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setAuthUser(res.data.user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setUser({
      username: "",
      password: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-200 bg-clip-padding backdrop:filter backdrop-blur-md bg-opacity-10 border border-yellow-100 text-white">
        <h1 className="text-3xl font-bold text-center text-white">Login</h1>
        <form action="" className="flex flex-col gap-1 mt-2">
          <div>
            <label className="label p-2">
              <span className="text-base  text-white">Username</span>
            </label>
            <input
              type="text"
              value={user.username}
              placeholder="Username"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base  text-white">Password</span>
            </label>
            <input
              type="password"
              value={user.password}
              placeholder="*********"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <Link to="/signup">Don't have an account?</Link>
          <div className="text-center">
            <button
              className="btn btn-neutral mt-3 w-20 text-1xl bg-gray-600"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
