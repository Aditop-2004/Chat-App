import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Signup() {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const submitHandler = async (e) => {
    console.log(user);
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    setUser({
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  const handleCheckBox = (e) => {
    setUser({ ...user, gender: e.target.value });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-200 bg-clip-padding backdrop:filter backdrop-blur-md bg-opacity-10 border border-yellow-100 text-white">
        <h1 className="text-3xl font-bold text-center text-white">Signup</h1>
        <form action="" className="flex flex-col gap-1 mt-2">
          <div>
            <label className="label p-2">
              <span className="text-base  text-white">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base  text-white">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="Username"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base  text-white">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="*********"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base  text-white">Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              type="password"
              placeholder="*********"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-2">
              <p>Male:</p>
              <input
                type="checkbox"
                value="male"
                checked={user.gender === "male"}
                onChange={handleCheckBox}
                className="checkbox"
              />
            </div>
            <div className="flex items-center gap-2">
              <p>Female:</p>
              <input
                type="checkbox"
                value="female"
                checked={user.gender === "female"}
                onChange={handleCheckBox}
                className="checkbox"
              />
            </div>
          </div>
          <Link to="/login">Already have an account?</Link>
          <div className="text-center">
            <button
              className="btn btn-neutral mt-3 w-20 text-1xl bg-gray-600"
              type="submit"
              onClick={submitHandler}
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
