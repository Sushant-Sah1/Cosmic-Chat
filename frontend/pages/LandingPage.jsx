import React from "react";
import { useNavigate } from "react-router";
import Spline from "@splinetool/react-spline";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray-800 text-cyan-100 flex justify-between p-4">
        <div>Cosmic Chat</div>
        <div className="flex gap-16">
          <button onClick={() => navigate("/login")}>LogIn</button>
          <button onClick={() => navigate("/signup")}>SignUp</button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)] ">
        {/* Left Side Text */}
        <div
          className="
            flex flex-col justify-center w-full max-w-xl p-10
            text-cyan-100 rounded-lg min-h-[375px]
          "
        >
          <div className="flex flex-col gap-5 w-full">
            <h2 className="text-cyan-100 text-4xl font-bold mb-4">
              Welcome To Cosmic Chat
            </h2>
            <h2 className="text-xl font-bold mb-4">
              Connect to the Universe of Conversations
            </h2>
            <p className="mb-6 text-cyan-100 text-3xl">
              Join Cosmic Chat and experience real-time conversations with
              people across the galaxy. Fast, secure, and fun.
            </p>
          </div>
        </div>

        {/* Right Side Spline */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full max-w-[900px] max-h-[700px]">
            {/* <Spline
              scene="https://prod.spline.design/EYMlBvIq9dBZ8jU7/scene.splinecode"
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
              onLoad={(spline) => spline.setZoom(1)}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
