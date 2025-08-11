import axios from "axios";
import React, { useEffect, useState } from "react";

const PublicGroups = ({ handlejoin }) => {
  const [publicgroups, setpublicgroups] = useState([]);
  async function handlepubsearch() {
    try {
      const data = await axios.post(
        "https://cosmic-chat-backend.onrender.com/api/groups/searchpubgroup"
      );
      console.log(data);
      setpublicgroups(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handlepubsearch();
  }, []);
  return (
    <>
      <div className="bg-gray-700 text-cyan-50 text-center p-3 mt-8">
        PublicGroups
      </div>
      <div className="bg-gray-900 text-cyan-50 text-center p-3 mt-8">
        <div>
          <ul className="flex flex-col gap-4 mt-4 ">
            {publicgroups.map((v) => {
              return (
                <li
                  key={v.id}
                  className="bg-black gap-8 flex w-[65vw] m-auto rounded-xl items-center p-4 justify-between"
                >
                  <div className="flex items-center gap-8">
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
                    <p className="text-3xl text-white">{v.name}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                      onClick={() => handlejoin(v.id)}
                    >
                      Join
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <ul>
        {publicgroups.map((v) => { //
          return (
            <li key={v.id}>//
              {
                // <img
                //   src={v.grouppicture}
                //   alt={v.name}
                //   style={{
                //     width: "60px",
                //     height: "60px",
                //     objectFit: "cover",
                //     borderRadius: "50%",
                //     border: "2px solid #ddd",
                //     boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                //   }}
                // />
              }
              {/* {v.name} */}
              {/* <button
                onClick={() => {
                  handlejoin(v.id);
                }}
              >
                Join
              </button> */}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PublicGroups;
