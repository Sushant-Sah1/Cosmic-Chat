import axios from "axios";
import React, { useEffect, useState } from "react";

const PrivateGroups = ({ handlejoin, joinref }) => {
  const [tabs, settabs] = useState("searchprivgroup");
  const [privgroups, setprivgroups] = useState([])
  async function handleprivsearch() {
    try {
      const data = await axios.post(
        "http://localhost:4444/api/groups/searchprivgroup"
      );
      console.log(data)
      setprivgroups(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handleprivsearch()
  }, []);
  return (
    <>
      <div className="bg-gray-700 text-cyan-50 text-center p-3 mt-8">
        PrivateGroups
      </div>
      <div className="bg-gray-900 text-cyan-50 text-center p-3 mt-8">
        <div>
          <div className="flex justify-evenly">
            <button
              onClick={() => {
                settabs("searchprivgroup");
              }}
            >
              Search Private Groups
            </button>
            <button
              onClick={() => {
                settabs("joinprivgroup");
              }}
            >
              Join Private Groups
            </button>
          </div>
          {tabs == "joinprivgroup" && (
            <div className="mt-4 bg-black p-4 w-[65vw] m-auto rounded-xl flex justify-center text-2xl">
              <div className="flex gap-4 ">
                <input
                  className="rounded-xl bg-gray-900"
                  type="text"
                  placeholder="Enter Group Code To Join The Group ..."
                  ref={joinref}
                />
                <button
                  className="bg-blue-600 rounded-xl"
                  onClick={() => {
                    handlejoin(joinref.current.value);
                  }}
                >
                  Join Group
                </button>
              </div>
            </div>
          )}
          {tabs == "searchprivgroup" && (
            <>
              <ul className="flex flex-col gap-4 mt-4 ">
                {privgroups.map((v) => {
                  return (
                    <li
                      key={v.id}
                      className="bg-black gap-8 flex align-baseline w-[65vw] m-auto rounded-xl items-center p-4 "
                    >
                      {
                        <img
                          src={v.grouppicture}
                          alt={v.name}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            border: "2px solid #ddd",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                          }}
                        />
                      }
                      <p className="text-3xl">{v.name}</p>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PrivateGroups;
