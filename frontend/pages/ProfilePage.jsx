import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setuserdetail } from "../features/userdetails";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userdetail = useSelector((state) => state.userdetail.value);
  const navigate = useNavigate("");
  const [email, setemail] = useState(userdetail.email);
  const [username, setusername] = useState(userdetail.username);
  const [password, setpassword] = useState(userdetail.password);
  const [profilepicture, setprofilepicture] = useState(userdetail.profilepicture);

  async function handlesave(data) {
    try {
      const result = await axios.post(
        "https://cosmic-chat-fqrq.onrender.com/api/userprofile/updateprofile",
        {
          data,
          userid: userdetail.id,
        }
      );
      dispatch(setuserdetail(result.data));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="bg-gray-800 text-cyan-100 flex justify-between p-4">
        <div>ProfilePage</div>
        <div className="flex gap-16">
          <button
            className="text-red-600"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Go TO Dashboard
          </button>
        </div>
      </div>
      <div className="bg-gray-900 p-4 mt-8">
        <div className="bg-black text-cyan-50  p-4  gap-6 rounded-xl">
          <div className="text-4xl self-start">Change Profile Picture</div>
          <div className="mt-4">
            <div>
              <img
                src={profilepicture}
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
                  setprofilepicture(ev.target.value);
                }}
                defaultValue={userdetail.profilepicture}
              />
              {userdetail.profilepicture != profilepicture && (
                <>
                  <button
                    className="bg-blue-600 rounded-xl"
                    onClick={() => {
                      handlesave({ profilepicture: profilepicture });
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
          <div className="text-4xl self-start">Change Email</div>
          <div className="mt-4">
            <div className="mt-4 flex gap-4">
              <input
                type="text"
                className=" bg-gray-900 rounded-xl w-[50vw]"
                onChange={(ev) => {
                  console.log(ev.target.value);
                  setemail(ev.target.value);
                }}
                defaultValue={userdetail.email}
              />
              {userdetail.email != email && (
                <>
                  <button
                    className="bg-blue-600 rounded-xl"
                    onClick={() => {
                      handlesave({ email: email });
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
          <div className="text-4xl self-start">Change Username</div>
          <div className="mt-4">
            <div className="mt-4 flex gap-4">
              <input
                type="text"
                className=" bg-gray-900 rounded-xl w-[50vw]"
                onChange={(ev) => {
                  setusername(ev.target.value);
                }}
                defaultValue={userdetail.username}
              />
              {userdetail.username != username && (
                <>
                  <button
                    className="bg-blue-600 rounded-xl"
                    onClick={() => {
                      handlesave({ username: username });
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
          <div className="text-4xl self-start">Change Password</div>
          <div className="mt-4">
            <div className="mt-4 flex gap-4">
              <input
                type="text"
                className=" bg-gray-900 rounded-xl w-[50vw]"
                onChange={(ev) => {
                  setpassword(ev.target.value);
                }}
                defaultValue={userdetail.password}
              />
              {userdetail.password != password && (
                <>
                  <button
                    className="bg-blue-600 rounded-xl"
                    onClick={() => {
                      handlesave({ password: password });
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

export default ProfilePage;
