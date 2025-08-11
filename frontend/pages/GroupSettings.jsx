import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setgroupdetail } from "../features/groupdetails";
import axios from "axios";

const GroupSettings = ({ socketRef }) => {
  const groupdetail = useSelector((state) => state.groupdetail.value);
  const userdetail = useSelector((state) => state.userdetail.value);
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  console.log(groupdetail);
  function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }
  async function handleexitgroup() {
    try {
      const data = await axios.post(
        "http://localhost:4444/api/groups/exitgroup",
        {
          groupid: groupdetail.id,
          username: userdetail.username,
          userid: userdetail.id,
        }
      );
      console.log(data);
      setprevmessages(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="bg-gray-700 text-cyan-50 text-center p-3 mt-8">
        GroupSettings
      </div>
      <div className="bg-gray-900 p-4 mt-8">
        {""}
        <div className="bg-black text-cyan-50 flex p-4 items-center gap-6 rounded-xl">
          <div>
            <img
              src={groupdetail.grouppicture}
              alt=""
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="ml-4">
            <div className="text-6xl">{groupdetail.name}</div>
            <div>{groupdetail.public ? "Public" : "Private"}</div>
            <div>Create Date: {formatDate(groupdetail.createdate)}</div>
          </div>
        </div>

        <div className="bg-black text-cyan-50 flex flex-col p-4 items-center gap-6 rounded-xl mt-4">
          <div className="text-4xl self-start">Group Description</div>
          <div>{groupdetail.groupdesciption}</div>
        </div>
        <btn
          className="bg-red-700 text-2xl text-cyan-50 flex flex-col p-2 items-center gap-6 rounded-xl mt-4"
          onClick={() => {
            handleexitgroup();
            dispatch(setgroupdetail({}));
            socketRef.current.disconnect();
            navigate("/dashboard");
          }}
        >
          Exit Group
        </btn>
        {""}
      </div>
    </>
  );
};

export default GroupSettings;
