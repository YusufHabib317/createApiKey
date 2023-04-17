import "./sign.css";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AiOutlineCheck } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useAuth } from "../../context/Auth";

//regex
const Email_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = "/register";
const logIn_URL = "/log";

const Sign = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";

  const emailRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  //handle page
  const [page, setPage] = useState(0);

  // data signup
  const initialValue_signup = {
    email: "",
    password: "",
  };

  const [formData_signup, setFormData_signup] = useState(initialValue_signup);
  const onChange_signup = (e) => {
    const { name, value } = e.target;
    setFormData_signup({ ...formData_signup, [name]: value });
  };
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");

  const [validMatch, setValidMatch] = useState(false);

  useEffect(() => {
    setValidEmail(Email_REGEX.test(formData_signup.email));
  }, [formData_signup.email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(formData_signup.password));
    setValidMatch(formData_signup.password === matchPwd);
  }, [formData_signup.password, matchPwd]);

  // data signin
  const initialValue_signin = {
    email: "",
    password: "",
  };
  const [formData_signin, setFormData_signin] = useState(initialValue_signin);
  const onChange_signin = (e) => {
    const { name, value } = e.target;
    setFormData_signin({ ...formData_signin, [name]: value });
  };

  //submit signup

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    auth.login(formData_signup.email);

    setPage(2);
    const v1 = Email_REGEX.test(formData_signup.email);
    const v2 = PWD_REGEX.test(formData_signup.password);

    if (!v1 || !v2) {
      setErrMsg("invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          email: formData_signup.email,
          password: formData_signup.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
    } catch (err) {
      console.log(err);
    }
    setPage(2);
    setTimeout(() => {
      navigate(redirectPath, { replace: true });
    }, 3000);
  };

  const handleSubmitSignupWithGoogle = async (e) => {
    e.preventDefault();
    auth.login(formData_signup.email);

    setPage(2);
    const v1 = Email_REGEX.test(formData_signup.email);

    if (!v1) {
      setErrMsg("invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          email: formData_signup.email,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
    } catch (err) {
      console.log(err);
    }
    setPage(2);
    setTimeout(() => {
      navigate(redirectPath, { replace: true });
    }, 3000);
  };

  //submit signin
  const handleSubmitSignin = async (e) => {
    e.preventDefault();
    auth.login(formData_signin.email);

    try {
      const response = await axios.post(
        logIn_URL,
        JSON.stringify({
          email: formData_signin.email,
          password: formData_signin.password ? formData_signin.password : null,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
    } catch (err) {
      console.log(err);
    }
    setPage(2);
    setTimeout(() => {
      navigate(redirectPath, { replace: true });
    }, 3000);
  };

  //page case
  const pageShow = () => {
    switch (page) {
      case 0: {
        return content_one;
      }
      case 1: {
        return content_Two;
      }
      case 2: {
        return content_Third;
      }
      case 3: {
        return content_Four;
      }
      case 4: {
        return content_Fivth;
      }

      default: {
        return null;
      }
    }
  };
  //content
  //signup
  let content_one = (
    <form
      className="flex flex-col justify-center items-center w-full  h-full p-6 "
      onSubmit={handleSubmitSignup}
    >
      <h2 className="text-[2.5rem] font-bold">Sign Up</h2>
      <div className="flex flex-col justify-center items-center space-y-2 w-[100%]">
        <label
          htmlFor="email"
          className="w-[90%] m-3 flex justify-between items-end"
        >
          <input
            type="email"
            name="email"
            id="email"
            value={formData_signup.email}
            placeholder="Email"
            className="w-[95%] border-gray-500 border-b p-1 outline-none"
            ref={emailRef}
            onChange={onChange_signup}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          {validEmail ? (
            <AiOutlineCheck className="text-green-500 font-bold text-[1.5rem]" />
          ) : (
            <FaTimes className="text-red-500 font-bold text-[1.5rem]" />
          )}
        </label>
        {emailFocus && formData_signup.email && !validEmail ? (
          <p className="w-[90%] bg-slate-100  rounded-lg p-2 text-[0.85rem] font-[500]">
            email must be formatted correctly
          </p>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col justify-center items-center space-y-2 w-[100%]">
        <label
          htmlFor="password"
          className="w-[90%] m-3 flex justify-between items-end"
        >
          <input
            type="password"
            name="password"
            id="password"
            value={formData_signup.password}
            placeholder="password"
            className="w-full border-gray-500 border-b p-1 outline-none"
            onChange={onChange_signup}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          {validPwd ? (
            <AiOutlineCheck className="text-green-500 font-bold text-[1.5rem]" />
          ) : (
            <FaTimes className="text-red-500 font-bold text-[1.5rem]" />
          )}
        </label>
        {pwdFocus && formData_signup.password && !validPwd ? (
          <p className="w-[90%] bg-slate-100  rounded-lg p-2 text-[0.85rem] font-[500]">
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>
        ) : (
          <></>
        )}
      </div>
      <label
        htmlFor="confirmPassword"
        className="w-[90%] m-5 flex justify-between items-end"
      >
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={matchPwd}
          placeholder="confirmPassword"
          className="w-full border-gray-500 border-b p-1 outline-none"
          onChange={(e) => setMatchPwd(e.target.value)}
        />
        {validMatch && matchPwd ? (
          <AiOutlineCheck className="text-green-500 font-bold text-[1.5rem]" />
        ) : (
          <FaTimes className="text-red-500 font-bold text-[1.5rem]" />
        )}
      </label>
      <button
        className="bg-blue-500 text-white px-5 py-1 rounded-lg text-[1.1rem] disabled:bg-slate-400"
        disabled={
          !validEmail ||
          !validPwd ||
          !formData_signup.email ||
          !formData_signup.password ||
          !matchPwd ||
          !validMatch
        }
      >
        Sign Up
      </button>
      <div className="relative w-full flex justify-center items-center m-8 par">
        <div className="absolute bg-gray-500 w-[90%] h-[0.5px]" />
        <div className="absolute text-[1rem] mb-2 bg-white px-3">
          or sign up with
        </div>
        <div
          className="absolute top-5 text-[1.8rem] cursor-pointer mt-3"
          onClick={() => setPage(1)}
        >
          <FcGoogle className="text-opacity-50" />
        </div>
      </div>
      <p className="mt-7 self-start text-[0.85rem] cursor-pointer">
        lready have an account?
        <span
          className="underline hover:text-blue-500 ml-1"
          onClick={() => setPage(3)}
        >
          login
        </span>
      </p>
    </form>
  );
  //signup with google
  let content_Two = (
    <>
      <form
        className="flex flex-col justify-center items-center w-full  h-full p-6"
        onSubmit={handleSubmitSignupWithGoogle}
      >
        <h2 className="text-[1.5rem] sm:text-[2.5rem] font-bold">Sign Up</h2>

        <label
          htmlFor="email"
          className="w-[90%] m-3 flex justify-between items-end"
        >
          <input
            type="email"
            name="email"
            id="email"
            value={formData_signup.email}
            placeholder="Email"
            className="w-[95%] border-gray-500 border-b p-1 outline-none"
            ref={emailRef}
            onChange={onChange_signup}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          {validEmail ? (
            <AiOutlineCheck className="text-green-500 font-bold text-[1.5rem]" />
          ) : (
            <FaTimes className="text-red-500 font-bold text-[1.5rem]" />
          )}
        </label>
        {emailFocus && formData_signup.email && !validEmail ? (
          <p className="w-[90%] bg-slate-100  rounded-lg p-2 text-[0.85rem] font-[500]">
            email must be formatted correctly
          </p>
        ) : (
          <></>
        )}

        <button
          className="bg-blue-500 text-white px-3 py-1  sm:px-5 sm:py-1 rounded-lg text-[1.1rem] mt-5 disabled:bg-slate-400"
          disabled={!validEmail}
        >
          Sign Up
        </button>
      </form>
      <p
        className="mt-5 text-[0.8rem] underline px-6 cursor-pointer  hover:text-blue-500"
        onClick={() => setPage(0)}
      >
        back
      </p>
    </>
  );
  //after sign
  let content_Third = (
    <>
      <div className="w-full ">
        <div className="relative bg-blue-500 w-full h-[7rem] ">
          <div className="absolute flex justify-center items-center rounded-full bg-white  top-[4.9rem] w-[4rem] h-[4rem] s">
            <BiMessage className="w-[3rem] h-[3rem]" />
          </div>
        </div>
        <div className=" text-[0.75rem] sm:text-[0.95rem] text-gray-600 mt-10  px-6 text-center">
          <p>
            <span className="text-[1.5rem]">Thank you!</span> An emial has been
            sent to
            <span className="text-[1.3rem] underline">{auth.user}</span>
          </p>
          <p className=" text-[0.7rem] sm:text-[0.8rem] w-[80%] mx-auto mt-2">
            Please check your inbox to veryfy your email address and follow the
            instructions
          </p>
        </div>
      </div>
    </>
  );
  // login
  let content_Four = (
    <>
      <div className="w-full ">
        <form
          className="flex flex-col justify-center items-center w-full  h-full p-6 "
          onSubmit={handleSubmitSignin}
        >
          <h2 className="text-[2.5rem] font-bold">Log in</h2>
          <label htmlFor="email" className="w-[90%] m-5">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full border-gray-500 border-b p-1 outline-none"
              onChange={onChange_signin}
            />
          </label>
          <label htmlFor="password" className="w-[90%] m-5">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="w-full border-gray-500 border-b p-1 outline-none"
              onChange={onChange_signin}
            />
          </label>
          <button
            className="bg-blue-500 text-white px-5 py-1 rounded-lg text-[1.1rem] disabled:bg-slate-400"
            disabled={!formData_signin.email || !formData_signin.password}
          >
            Log in
          </button>
          <div className="relative w-full flex justify-center items-center m-8 par">
            <div className="absolute bg-gray-500 w-[90%] h-[0.5px]" />
            <div className="absolute text-[1rem] mb-2 bg-white px-3">
              or log in with
            </div>
            <div
              className="absolute top-5 text-[1.8rem] cursor-pointer mt-3"
              onClick={() => setPage(4)}
            >
              <FcGoogle />
            </div>
          </div>
        </form>
        <p
          className="mt-5 text-[0.8rem] underline px-6 cursor-pointer  hover:text-blue-500"
          onClick={() => setPage(0)}
        >
          back
        </p>
      </div>
    </>
  );
  // login with google
  let content_Fivth = (
    <>
      <form
        className="flex flex-col justify-center items-center w-full  h-full p-6 "
        onSubmit={handleSubmitSignin}
      >
        <h2 className="text-[1.5rem] sm:text-[2.5rem] font-bold">Log In</h2>
        <label htmlFor="email" className="w-[90%] m-5">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full border-gray-500 border-b p-1 outline-none"
            onChange={onChange_signin}
          />
        </label>

        <button
          className="bg-blue-500 text-white px-3 py-1  sm:px-5 sm:py-1 rounded-lg text-[1.1rem] mt-5 disabled:bg-slate-400"
          disabled={!formData_signin.email}
        >
          Log In
        </button>
      </form>
      <p
        className="mt-5 text-[0.8rem] underline px-6 cursor-pointer  hover:text-blue-500"
        onClick={() => setPage(3)}
      >
        back
      </p>
    </>
  );

  return (
    <div className="w-full min-h-screen flex justify-center items-center ">
      <div className="container mx-auto w-[60%]">{pageShow()}</div>
    </div>
  );
};

export default Sign;
