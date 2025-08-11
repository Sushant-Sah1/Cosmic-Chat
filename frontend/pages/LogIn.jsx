import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setuserdetail } from "../features/userdetails";
import { useRef } from "react";
import axios from "axios";

const LogIn = () => {
  const emailref = useRef("");
  const passwordref = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handlelogin() {
    try {
      const data = await axios.post("https://cosmic-chat-backend.onrender.com/api/auth/login", {
        email: emailref.current.value,
        password: passwordref.current.value,
      });
      dispatch(setuserdetail(data.data));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="bg-gray-800 text-cyan-100 flex justify-between p-4">
        <button onClick={() => navigate("/")}>Cosmic Chat</button>
      </div>

      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div
          className="
            bg-black text-cyan-100 rounded-lg 
            p-10
            flex flex-col items-center
            w-full max-w-md
            sm:max-w-lg
            md:max-w-xl
            lg:max-w-2xl
            min-h-[375px]
          "
        >
          <div className="flex flex-col gap-5 w-full">
            <input
              type="text"
              placeholder="Enter Email ..."
              ref={emailref}
              className="p-3 rounded bg-gray-900 text-cyan-100   "
            />
            <input
              type="text"
              placeholder="Enter Password ..."
              ref={passwordref}
              className="p-3 rounded bg-gray-900 text-cyan-100  "
            />
            <button
              className="
                mt-4 py-3 px-8 bg-cyan-600 
                rounded text-black 
              "
              onClick={handlelogin}
            >
              Log In
            </button>
          </div>
          <div className="flex gap-2 mt-7 items-center text-base">
            <span>Don't Have an Account?</span>
            <button
              onClick={() => navigate("/signup")}
              className="text-cyan-100 "
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
