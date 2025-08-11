import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setgroupdetail } from "../features/groupdetails";
import axios from "axios";

const GroupSettingsEdit = ({ socketRef }) => {
  const groupdetails = useSelector((state) => state.groupdetail.value);
  const userdetail = useSelector((state) => state.userdetail.value);
  const dispatch = useDispatch();
  const [grouppicture, setgrouppicture] = useState(groupdetails.grouppicture);
  const [groupname, setgroupname] = useState(groupdetails.name);
  const [groupdesciption, setgroupdesciption] = useState(
    groupdetails.groupdesciption
  );
  const [groupstatus, setgroupstatus] = useState(groupdetails.public);
  async function handlesave(data) {
    try {
      const result = await axios.post(
        "https://cosmic-chat-fqrq.onrender.com/api/groups/updategroup",
        {
          data,
          groupid: groupdetails.id,
          username: userdetail.username,
        }
      );
      console.log(groupdetails);
      console.log("NEW GROUP DETAILS ", result.data);
      dispatch(setgroupdetail(result.data));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="bg-gray-700 text-cyan-50 text-center p-3 mt-8">
        GroupSettingsEdit
      </div>
      <div className="bg-gray-900 p-4 mt-8">
        <div className="bg-black text-cyan-50  p-4  gap-6 rounded-xl">
          <div className="text-4xl self-start">Change Group Picture</div>
          <div className="mt-4">
            <div>
              <img
                src={grouppicture}
                alt=""
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div className="mt-4 flex gap-4">
              <input
                type="text"
                className=" bg-gray-900 rounded-xl w-[50vw]"
                onChange={(ev) => {
                  console.log(ev.target.value);
                  setgrouppicture(ev.target.value);
                }}
                defaultValue={groupdetails.grouppicture}
              />
              {groupdetails.grouppicture != grouppicture && (
                <>
                  <button
                    className="bg-blue-600 rounded-xl"
                    onClick={() => {
                      handlesave({ grouppicture: grouppicture });
                    }}
                  >
                    save
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="bg-black text-cyan-50  p-4  gap-6 rounded-xl mt-4">
          <div className="text-4xl self-start">Change Group Name</div>
          <div className="mt-4">
            <div className="mt-4 flex gap-4">
              <input
                type="text"
                className=" bg-gray-900 rounded-xl w-[50vw]"
                onChange={(ev) => {
                  console.log(ev.target.value);
                  setgroupname(ev.target.value);
                }}
                defaultValue={groupdetails.name}
              />
              {groupdetails.name != groupname && (
                <>
                  <button
                    className="bg-blue-600 rounded-xl"
                    onClick={() => {
                      handlesave({ name: groupname });
                    }}
                  >
                    save
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="bg-black text-cyan-50  p-4  gap-6 rounded-xl mt-4">
          <div className="text-4xl self-start">Change Group Description</div>
          <div className="mt-4">
            <div className="mt-4 flex gap-4">
              <input
                type="text"
                className=" bg-gray-900 rounded-xl w-[50vw]"
                onChange={(ev) => {
                  console.log(ev.target.value);
                  setgroupdesciption(ev.target.value);
                }}
                defaultValue={groupdetails.groupdesciption}
              />
              {groupdetails.groupdesciption != groupdesciption && (
                <>
                  <button
                    className="bg-blue-600 rounded-xl"
                    onClick={() => {
                      handlesave({ groupdesciption: groupdesciption });
                    }}
                  >
                    save
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="bg-black text-cyan-50  p-4  gap-6 rounded-xl mt-4">
          <div className="text-4xl self-start">
            Make Group Public Or Private
          </div>
          <div className="mt-4">
            <div className="mt-4 flex gap-4">
              <button
                className=" bg-gray-900 rounded-xl w-[50vw]"
                onClick={() => {
                  setgroupstatus(!groupstatus);
                }}
              >
                {groupstatus ? "Public" : "Private"}
              </button>
              {groupdetails.public != groupstatus && (
                <>
                  <button
                    className="bg-blue-600 rounded-xl"
                    onClick={() => {
                      handlesave({ public: groupstatus });
                    }}
                  >
                    save
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupSettingsEdit;
