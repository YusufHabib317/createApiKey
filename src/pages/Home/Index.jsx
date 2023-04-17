import "./index.css";

import { BiHide, BiShow } from "react-icons/bi";

import { AiOutlineCopy } from "react-icons/ai";
import { BsCheck2Square } from "react-icons/bs";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [result_1, setResult_1] = useState("");
  const [result_2, setResult_2] = useState("");

  const [copy_1, setCopy_1] = useState(false);
  const [copy_2, setCopy_2] = useState(false);

  const [show_1, setShow_1] = useState(false);
  const [show_2, setShow_2] = useState(false);

  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let charLength = chars.length;
  function genRandonString_1() {
    for (let i = 0; i < 16; i++) {
      if (!result_1) {
        setResult_1((prev) => {
          return (prev += chars.charAt(Math.floor(Math.random() * charLength)));
        });
      } else {
        setResult_1("");
        setTimeout(() => {
          setResult_1((prev) => {
            return (prev += chars.charAt(
              Math.floor(Math.random() * charLength)
            ));
          });
        }, 0.001);
      }
    }
  }
  function genRandonString_2() {
    for (let i = 0; i < 16; i++) {
      if (!result_2) {
        setResult_2((prev) => {
          return (prev += chars.charAt(Math.floor(Math.random() * charLength)));
        });
      } else {
        setResult_2("");
        setTimeout(() => {
          setResult_2((prev) => {
            return (prev += chars.charAt(
              Math.floor(Math.random() * charLength)
            ));
          });
        }, 0.001);
      }
    }
  }
  if (copy_1) {
    setTimeout(() => {
      setCopy_1(false);
    }, 1000);
  }
  if (copy_2) {
    setTimeout(() => {
      setCopy_2(false);
    }, 1000);
  }
  const handleLogout = () => {
    auth.logout();
    navigate("/sign");
  };
  const handleDel = () => {
    setResult_1("");
    setResult_2("");
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="shadow-lg p-3 w-[80%] flex flex-col justify-center items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-row justify-center items-center space-x-6">
            <button
              className="bg-blue-600 rounded-lg px-3 py-2 text-white hover:bg-blue-700"
              onClick={() => {
                genRandonString_1();
                genRandonString_2();
              }}
            >
              Create New API Key
            </button>
            <button
              className="bg-red-500 rounded-lg px-2 py-1 text-white text-[0.85rem] hover:bg-red-600"
              type="button"
              onClick={handleDel}
            >
              Delete
            </button>
          </div>
          <button
            className="bg-blue-500 rounded-lg px-2 py-1 text-white text-[0.85rem] hover:bg-blue-600"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="self-start flex flex-col justify-center items-start mt-5 w-full">
          <div className="flex justify-between items-center bg-slate-100 p-3 rounded-lg w-full">
            <div className="flex items-center">
              <p className=" text-gray-400 text-[0.9rem]">API Key:</p>
              <label>
                <input
                  type={show_1 ? "text" : "password"}
                  readOnly
                  value={result_1}
                  className="w-full bg-transparent ml-14 text-[1.2rem]"
                />
              </label>
              {/* <p className=" text-[0.75rem] ml-12">{result_1}</p> */}
            </div>
            <div className="flex justify-center items-center">
              <button
                className="cursor-pointer hover:bg-slate-400 hover:text-white text-[0.9rem] p-2 rounded-lg"
                onClick={() => {
                  navigator.clipboard.writeText(result_1);
                  setCopy_1(true);
                }}
              >
                {result_1 && copy_1 ? <BsCheck2Square /> : <AiOutlineCopy />}
              </button>
              <button
                className="cursor-pointer hover:bg-slate-400 hover:text-white text-[0.9rem] p-2 rounded-lg"
                onClick={() => setShow_1(!show_1)}
              >
                {show_1 ? <BiShow /> : <BiHide />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center bg-slate-100 p-3 rounded-lg w-full mt-5">
            <div className="flex items-center">
              <p className=" text-gray-400 text-[0.9rem]"> Secret Key:</p>
              {/* <p className=" text-[0.75rem] ml-7">{result_2}</p> */}
              <label>
                <input
                  type={show_2 ? "text" : "password"}
                  readOnly
                  value={result_2}
                  className="w-full bg-transparent ml-9 text-[1.2rem]"
                />
              </label>
            </div>
            <div className="flex justify-center items-center">
              <button
                className="cursor-pointer hover:bg-slate-400 hover:text-white text-[0.9rem] p-2 rounded-lg"
                onClick={() => {
                  navigator.clipboard.writeText(result_2);
                  setCopy_2(true);
                }}
              >
                {result_2 && copy_2 ? <BsCheck2Square /> : <AiOutlineCopy />}
              </button>
              <button
                className="cursor-pointer hover:bg-slate-400 hover:text-white text-[0.9rem] p-2 rounded-lg"
                onClick={() => setShow_2(!show_2)}
              >
                {show_2 ? <BiShow /> : <BiHide />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
