import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import io from "socket.io-client";
import { setgroupdetail } from "../features/groupdetails";

const GroupChat = () => {
  const [prevmessages, setprevmessages] = useState([]);
  const messageref = useRef("");
  const groupdetail = useSelector((state) => state.groupdetail.value);
  const userdetail = useSelector((state) => state.userdetail.value);
  console.log(groupdetail);
  const socketRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate("");

  async function handleprevmessages() {
    try {
      const data = await axios.post(
        "https://cosmic-chat-fqrq.onrender.com/api/groups/prevmessages",
        {
          groupid: groupdetail.id,
        }
      );
      console.log(data);
      setprevmessages(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlesendingmessage() {
    socketRef.current.emit("sendmessage", {
      message: messageref.current.value,
      groupid: groupdetail.id,
      userid: userdetail.id,
    });
    messageref.current.value = "";
  }

  useEffect(() => {
    console.log("connecting to socket");
    socketRef.current = io("https://cosmic-chat-fqrq.onrender.com", {
      extraHeaders: {
        groupid: groupdetail.id,
        userid: userdetail.id,
      },
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected");
    });

    socketRef.current.on("message", (message) => {
      console.log(message);
      setprevmessages((prevdata) => {
        return [...prevdata, message];
      });
    });
    socketRef.current.on("joinmessage", (message) => {
      console.log("prev message:", message);
      setprevmessages((prevdata) => {
        return [...prevdata, message];
      });
    });
    socketRef.current.on("onlinemessage", (message) => {
      console.log("prev message:", message);
    });
    socketRef.current.on("groupdataupdate", (message) => {
      console.log("update:", message);
      dispatch(setgroupdetail(message));
    });
    socketRef.current.on("kicked", (message) => {
      console.log(message);
      if (userdetail.id == message) {
        dispatch(setgroupdetail({}));
        socketRef.current.disconnect();
        navigate("/dashboard");
      }
    });
  }, []);

  useEffect(() => {
    handleprevmessages();
  }, []);
  return (
    <>
      <div className="bg-gray-800 text-cyan-100 flex justify-between p-4">
        <div>GroupChat</div>
        <div className="flex gap-16">
          <button
            className="text-red-600"
            onClick={() => {
              socketRef.current.emit("setoffline", {});
              dispatch(setgroupdetail({}));
              socketRef.current.disconnect();
              navigate("/dashboard");
            }}
          >
            Go Back To Dashboard
          </button>
          <button
            onClick={() => {
              socketRef.current.disconnect();
              navigate("/groupoverview");
            }}
          >
            See Group Details
          </button>
        </div>
      </div>
      <div className="bg-gray-900 text-cyan-50 text-center p-3 mt-8">
        <div>
          <ul className="flex flex-col gap-4 mt-4 ">
            {prevmessages.map((v) => {
              console.log("MESSAGE Is", v);
              if (v.serversent) {
                return (
                  <li
                    key={v.id}
                    className="bg-gray-700 flex items-center justify-center w-[65vw] m-auto rounded-xl p-2"
                  >
                    <div className="text-center w-full">{v.message}</div>
                  </li>
                );
              } else if (userdetail.id == v.user.id) {
                return (
                  <li
                    key={v.id}
                    className="bg-black flex align-baseline w-[65vw] m-auto rounded-xl items-center p-4 flex-row-reverse"
                  >
                    <div className="flex flex-row-reverse gap-4">
                      <img
                        src={v.user ? v.user.profilepicture : null}
                        alt={v.user ? v.user.username : null}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          border: "2px solid #ddd",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        }}
                      />
                      <div>
                        <div className="text-right">
                          {v.user ? v.user.username : null}
                        </div>
                        <div className="text-right">{v.message}</div>
                      </div>
                    </div>
                  </li>
                );
              }
              return (
                <li
                  key={v.id}
                  className="bg-gray-800 gap-8 flex align-baseline w-[65vw] m-auto rounded-xl items-center p-4 "
                >
                  <div className="flex gap-4">
                    <img
                      src={v.user ? v.user.profilepicture : null}
                      alt={v.user ? v.user.username : null}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "2px solid #ddd",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      }}
                    />
                    <div>
                      <div className="text-left">
                        {v.user ? v.user.username : null}
                      </div>
                      <div className="text-left">{v.message}</div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="bg-black flex align-baseline w-[65vw] m-auto rounded-xl items-center p-2 mt-4 gap-2">
          <input
            type="text"
            placeholder="Enter Message ..."
            ref={messageref}
            className="w-[95%] bg-gray-900 rounded-xl"
          />
          <button
            className="w-[5%] bg-blue-600 rounded-xl"
            onClick={() => {
              handlesendingmessage();
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default GroupChat;
