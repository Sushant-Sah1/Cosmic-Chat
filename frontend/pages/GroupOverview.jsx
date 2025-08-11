import React, { useEffect, useRef, useState } from "react";
import GroupSettings from "./GroupSettings";
import GroupSettingsEdit from "./GroupSettingsEdit";
import Members from "./Members";
import { useNavigate } from "react-router";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setgroupdetail } from "../features/groupdetails";
import axios from "axios";
import { setisadmin } from "../features/isadmin";
import { setismember } from "../features/ismember";
import { setisowner } from "../features/isowner";

const GroupOverview = () => {
  const dispatch = useDispatch();
  const [tab, settab] = useState("GroupSettings");
  const socketRef = useRef(null);
  const groupdetail = useSelector((state) => state.groupdetail.value);
  const ismember = useSelector((state) => state.ismember.value);
  const userdetail = useSelector((state) => state.userdetail.value);
  const [members, setmembers] = useState([]);
  const navigate = useNavigate("");

  async function getmembers() {
    try {
      const data = await axios.post(
        "https://cosmic-chat-fqrq.onrender.com/api/member/getmembers",
        {
          groupid: groupdetail.id,
        }
      );
      console.log(data);
      setmembers(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getmembers();
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

    socketRef.current.on("groupdataupdate", (message) => {
      console.log("update:", message);
      dispatch(setgroupdetail(message));
    });

    socketRef.current.on("setonline", (message) => {
      console.log("ONLINE GUY IS ", message);
      console.log("old members", members);
      let arr = members.map((v) => {});
      setmembers((prevmembers) => {
        return prevmembers.map((v) => {
          if (v.userid == message) {
            return {
              ...v,
              online: true,
            };
          }
          return v;
        });
      });
    });
    socketRef.current.on("setoffline", (message) => {
      console.log("ONLINE GUY IS ", message);
      console.log("old members", members);
      setmembers((prevmembers) => {
        return prevmembers.map((v) => {
          if (v.userid == message) {
            return {
              ...v,
              online: false,
            };
          }
          return v;
        });
      });
    });

    socketRef.current.on("newmember", (message) => {
      console.log("NEW MEMBER IS HERE BRO");
      setmembers((prevmembers) => [...prevmembers, message]);
    });

    socketRef.current.on("kicked", (message) => {
      console.log(message);
      if (userdetail.id == message) {
        dispatch(setgroupdetail({}));
        socketRef.current.disconnect({ reason: "kicked" });
        navigate("/dashboard");
      }
      setmembers((prev) => {
        return prev.filter((v) => v.userid != message);
      });
    });
    socketRef.current.on("mademember", (message) => {
      console.log(message);
      if (userdetail.id == message) {
        settab("GroupSettings");
        dispatch(setisadmin(false));
        dispatch(setismember(true));
      }
      setmembers((prev) => {
        return prev.map((v) => {
          if (v.userid == message) {
            return { ...v, admin: false, member: true };
          }
          return v;
        });
      });
    });

    socketRef.current.on("madeadmin", (message) => {
      console.log(message);
      if (userdetail.id == message) {
        settab("GroupSettings");
        dispatch(setisadmin(true));
        dispatch(setismember(false));
      }
      setmembers((prev) => {
        return prev.map((v) => {
          if (v.userid == message) {
            return { ...v, admin: true, member: false };
          }
          return v;
        });
      });
    });

    socketRef.current.on("madeowner", (message) => {
      console.log(message);
      if (userdetail.id == message) {
        settab("GroupSettings");
        dispatch(setisadmin(false));
        dispatch(setisowner(true));
      }
      setmembers((prev) => {
        return prev.map((v) => {
          if (v.userid == message) {
            return { ...v, admin: false, owner: true };
          }
          return v;
        });
      });
    });
  }, []);
  return (
    <>
      <div className="bg-gray-800 text-cyan-100 flex justify-between p-4">
        <div>GroupOverview</div>
        <div className="flex gap-16">
          <button
            className="text-red-600"
            onClick={() => {
              navigate("/groupchat");
            }}
          >
            Back To Chat
          </button>
          <button
            onClick={() => {
              settab("GroupSettings");
            }}
          >
            GroupSettings
          </button>
          {!ismember && (
            <>
              <button
                onClick={() => {
                  settab("GroupSettingsEdit");
                }}
              >
                GroupSettingsEdit
              </button>
            </>
          )}
          <button
            onClick={() => {
              settab("Members");
            }}
          >
            Members
          </button>
        </div>
      </div>

      <div>
        {tab == "GroupSettings" && <GroupSettings socketRef={socketRef} />}
        {tab == "GroupSettingsEdit" && (
          <GroupSettingsEdit socketRef={socketRef} />
        )}
        {tab == "Members" && (
          <Members socketRef={socketRef} members={members} />
        )}
      </div>
    </>
  );
};

export default GroupOverview;
