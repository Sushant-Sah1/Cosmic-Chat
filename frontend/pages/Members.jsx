import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setgroupdetail } from "../features/groupdetails";

const Members = ({ socketRef, members }) => {
  const groupdetail = useSelector((state) => state.groupdetail.value);
  const userdetail = useSelector((state) => state.userdetail.value);
  const isadmin = useSelector((state) => state.isadmin.value);
  const isowner = useSelector((state) => state.isowner.value);
  console.log(members);

  async function handlekick(kusername, kmid, kuid) {
    socketRef.current.emit("kickamember", {
      groupid: groupdetail.id,
      username: userdetail.username,
      kickeduserid: kuid,
      kickedusername: kusername,
      kickedmemberid: kmid,
    });
  }

  async function handlemakemember(kusername, kmid, kuid) {
    socketRef.current.emit("makemember", {
      groupid: groupdetail.id,
      username: userdetail.username,
      kickeduserid: kuid,
      kickedusername: kusername,
      kickedmemberid: kmid,
    });
  }

  async function handlemakeadmin(kusername, kmid, kuid) {
    socketRef.current.emit("makeadmin", {
      groupid: groupdetail.id,
      username: userdetail.username,
      kickeduserid: kuid,
      kickedusername: kusername,
      kickedmemberid: kmid,
    });
  }

  async function handlemakeowner(kusername, kmid, kuid) {
    socketRef.current.emit("makeowner", {
      groupid: groupdetail.id,
      username: userdetail.username,
      kickeduserid: kuid,
      kickedusername: kusername,
      kickedmemberid: kmid,
    });
  }

  return (
    <>
      <div className="bg-gray-700 text-cyan-50 text-center p-3 mt-8">
        Members
      </div>
      <div className="bg-gray-900 p-4 mt-8 text-cyan-50">
        <div>
          <div className="bg-gray-800 p-2 mt-8 rounded-xl">Owner</div>
          <ul>
            {members
              .filter((v) => v.owner)
              .map((v) => {
                return (
                  <li
                    key={v.id}
                    className="bg-black p-4 rounded-xl flex items-center gap-4"
                  >
                    <div>
                      <img
                        src={v.user.profilepicture}
                        alt={v.user.username}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          border: "2px solid #ddd",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        }}
                      />
                    </div>
                    <div>
                      <div>{v.user.username}</div>
                      <div>@{v.user.email}</div>
                    </div>
                    <div>
                      {v.online ? (
                        <img
                          src="https://play-lh.googleusercontent.com/knXtj4S0nn7jf1YFCMczhtfw-yeoHxw_rO4mnm28C5d2KTQmTDgReu2q7wOIlmvJVjo"
                          alt=""
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      ) : (
                        <img
                          src="https://img.icons8.com/?size=96&id=Zyo5wDjgJxRW&format=png"
                          alt=""
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      )}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        <div>
          <div className="bg-gray-800 p-2 mt-8 rounded-xl">Admin</div>
          <ul>
            {members
              .filter((v) => v.admin)
              .map((v) => {
                return (
                  <li
                    key={v.id}
                    className="bg-black p-4 rounded-xl flex gap-4 items-center justify-between"
                  >
                    <div className=" flex items-center gap-4">
                      {" "}
                      <div>
                        <img
                          src={v.user.profilepicture}
                          alt={v.user.username}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            border: "2px solid #ddd",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                          }}
                        />
                      </div>
                      <div>
                        <div>{v.user.username}</div>
                        <div>@{v.user.email}</div>
                      </div>
                      <div>
                        {v.online ? (
                          <img
                            src="https://play-lh.googleusercontent.com/knXtj4S0nn7jf1YFCMczhtfw-yeoHxw_rO4mnm28C5d2KTQmTDgReu2q7wOIlmvJVjo"
                            alt=""
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                          />
                        ) : (
                          <img
                            src="https://img.icons8.com/?size=96&id=Zyo5wDjgJxRW&format=png"
                            alt=""
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <div>
                        {(isadmin || isowner) && (
                          <>
                            <button
                              className="bg-red-700 rounded-xl"
                              onClick={() => {
                                handlekick(v.user.username, v.id, v.user.id);
                              }}
                            >
                              kick out of group
                            </button>
                          </>
                        )}
                        {isowner && (
                          <>
                            {" "}
                            <button
                              className="bg-yellow-600 rounded-xl"
                              onClick={() => {
                                handlemakeowner(
                                  v.user.username,
                                  v.id,
                                  v.user.id
                                );
                              }}
                            >
                              make owner
                            </button>
                          </>
                        )}
                        {(isadmin || isowner) && (
                          <>
                            {" "}
                            <button
                              className="bg-blue-600 rounded-xl"
                              onClick={() => {
                                console.log("making a member");
                                handlemakemember(
                                  v.user.username,
                                  v.id,
                                  v.user.id
                                );
                              }}
                            >
                              make member
                            </button>{" "}
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        <div>
          <div className="bg-gray-800 p-2 mt-8 rounded-xl">Member</div>
          <ul>
            {members
              .filter((v) => v.member)
              .map((v) => {
                return (
                  <li
                    key={v.id}
                    className="bg-black p-4 rounded-xl flex gap-4 items-center justify-between"
                  >
                    <div className=" flex items-center gap-4">
                      {" "}
                      <div>
                        <img
                          src={v.user.profilepicture}
                          alt={v.user.username}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            border: "2px solid #ddd",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                          }}
                        />
                      </div>
                      <div>
                        <div>{v.user.username}</div>
                        <div>@{v.user.email}</div>
                      </div>
                      <div>
                        {v.online ? (
                          <img
                            src="https://play-lh.googleusercontent.com/knXtj4S0nn7jf1YFCMczhtfw-yeoHxw_rO4mnm28C5d2KTQmTDgReu2q7wOIlmvJVjo"
                            alt=""
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                          />
                        ) : (
                          <img
                            src="https://img.icons8.com/?size=96&id=Zyo5wDjgJxRW&format=png"
                            alt=""
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      {(isadmin || isowner) && (
                        <>
                          <button
                            className="bg-red-700 rounded-xl"
                            onClick={() => {
                              handlekick(v.user.username, v.id, v.user.id);
                            }}
                          >
                            kick out of group
                          </button>
                          <button
                            className="bg-blue-600 rounded-xl"
                            onClick={() => {
                              handlemakeadmin(v.user.username, v.id, v.user.id);
                            }}
                          >
                            make admin
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Members;
