import React, { useState } from "react";

const YourGroups = ({
  joinedgroups,
  handleAuthorization,
  createref,
  handlecreate,
}) => {
  const [tabs, settabs] = useState("groups");
  return (
    <>
      <div className="bg-gray-700 text-cyan-50 text-center p-3 mt-8">
        YourGroups
      </div>
      <div className="bg-gray-900 text-cyan-50 text-center p-3 mt-8">
        <div>
          <div className="flex justify-evenly">
            <button
              onClick={() => {
                settabs("groups");
              }}
            >
              Groups
            </button>{" "}
            <button
              onClick={() => {
                settabs("creategroups");
              }}
            >
              Create Group
            </button>
          </div>
          {tabs == "creategroups" && (
            <div className="mt-4 bg-black p-4 w-[65vw] m-auto rounded-xl flex justify-center text-2xl">
              <div className="flex gap-4 ">
                <input
                  className="rounded-xl bg-gray-900"
                  type="text"
                  placeholder="Enter Name Of Your Group ..."
                  ref={createref}
                />
                <button
                  className="bg-blue-600 rounded-xl"
                  onClick={() => {
                    handlecreate();
                  }}
                >
                  Create group
                </button>
              </div>
            </div>
          )}
          {tabs == "groups" && (
            <>
              <ul className="flex flex-col gap-4 mt-4 ">
                {joinedgroups.map((v) => {
                  console.log(v);
                  return (
                    <li
                      className="bg-black gap-8 flex align-baseline w-[65vw] m-auto rounded-xl items-center p-4 "
                      key={v.id}
                      onClick={() => {
                        handleAuthorization(v);
                      }}
                    >
                      {
                        <img
                          src={v.group.grouppicture}
                          alt={v.group.name}
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
                      <p className="text-3xl">{v.group.name}</p>
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

export default YourGroups;
