import axios from "axios";
import React from "react";
import { use } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setgroupdetail } from "../features/groupdetails";
import { setuserdetail } from "../features/userdetails";
import { setisadmin } from "../features/isadmin";
import { setisowner } from "../features/isowner";
import { setismember } from "../features/ismember";
import YourGroups from "./YourGroups";
import PrivateGroups from "./PrivateGroups";
import PublicGroups from "./PublicGroups";

const DashBoard = () => {
  const createref = useRef("");
  const searchref = useRef("");
  const joinref = useRef("");
  const userdetail = useSelector((state) => state.userdetail.value);
  const [joinedgroups, setjoinedgroups] = useState([]);
  const [closesearch, setclosesearch] = useState(true);
  const [searchresult, setsearchresult] = useState([]);
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const [tab, settab] = useState("YourGroup");
  console.log(userdetail);

  async function handlecreate() {
    try {
      const data = await axios.post(
        "http://localhost:4444/api/groups/creategroup",
        {
          groupname: createref.current.value,
          makerid: userdetail.id,
        }
      );
      console.log(joinedgroups);
      console.log(data);
      setjoinedgroups([...joinedgroups, data.data]);
      createref.current.value = "";
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAuthorization(v) {
    try {
      const data = await axios.post(
        "http://localhost:4444/api/member/checkmember",
        {
          groupname: v.groupid,
          userid: userdetail.id,
        }
      );
      // console.log(joinedgroups);
      if (data.data) {
        console.log("ALLOWED I AM");
        dispatch(setgroupdetail(v.group));
        dispatch(setisadmin(v.admin));
        dispatch(setismember(v.member));
        dispatch(setisowner(v.owner));
        navigate("/groupchat");
      } else {
        console.log(" NOT ALLOWED I NOT ALLOWED");
        navigate("/UnAthorized");
      }
      console.log(data);
      // setjoinedgroups([...joinedgroups, data.data]);
      createref.current.value = "";
    } catch (error) {
      console.log(error);
    }
  }

  async function handlejoin(groupid) {
    try {
      const data = await axios.post(
        "http://localhost:4444/api/groups/joingroup",
        {
          groupid,
          userid: userdetail.id,
          username: userdetail.username,
        }
      );
      console.log(joinedgroups);
      console.log(data);
      setjoinedgroups([...joinedgroups, data.data]);
    } catch (error) {
      console.log(error);
    }
  }

  // async function handlesearch() {
  //   try {
  //     const data = await axios.post(
  //       "http://localhost:4444/api/groups/searchgroup",
  //       {
  //         name: searchref.current.value,
  //       }
  //     );
  //     console.log("SEARCH");
  //     console.log(data);
  //     setclosesearch(false);
  //     setsearchresult(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function handlejoinedgroups() {
    try {
      const data = await axios.post(
        "http://localhost:4444/api/groups/joinedgroups",
        {
          userid: userdetail.id,
        }
      );
      console.log(joinedgroups);
      console.log(data);
      setjoinedgroups(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handlejoinedgroups();
  }, []);
  return (
    <>
      <div className="bg-gray-800 text-cyan-100 flex justify-between p-4">
        <div>DashBoard</div>
        <div className="flex gap-16">
          <button
          className="text-red-600"
            onClick={() => {
              dispatch(setuserdetail({}));
              navigate("/");
            }}
          >
            LogOut
          </button>
          <button
            onClick={() => {
              navigate("/profilepage");
            }}
          >
            Customize Profile
          </button>
          <button
            onClick={() => {
              settab("YourGroup");
            }}
          >
            Your Groups
          </button>
          <button
            onClick={() => {
              settab("PrivateGroup");
            }}
          >
            Private Groups
          </button>
          <button
            onClick={() => {
              settab("PublicGroup");
            }}
          >
            Public Groups
          </button>
        </div>
      </div>

      {tab == "YourGroup" && (
        <>
          <YourGroups
            joinedgroups={joinedgroups}
            handleAuthorization={handleAuthorization}
            createref={createref}
            handlecreate={handlecreate}
          />
        </>
      )}
      {tab == "PrivateGroup" && (
        <>
          <PrivateGroups handlejoin={handlejoin} joinref={joinref} />
        </>
      )}
      {tab == "PublicGroup" && (
        <>
          <PublicGroups handlejoin={handlejoin} />
        </>
      )}
    </>
  );
};

export default DashBoard;
