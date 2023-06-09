import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { Context } from "../App";
import axios from "axios";
import useAuthContext from "../context/useAuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { setToken } = useAuthContext();

  const [tempUsername, setTempUsername] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [fieldsFull, setFieldsFull] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const { sizePerScreen } = useContext(Context);

  useEffect(() => {
    console.log(sizePerScreen);
  }, [sizePerScreen]);

  useEffect(() => {
    if (tempUsername.length > 0 && tempPassword.length > 0) setFieldsFull(true);
    else setFieldsFull(false);
    setErrorMessage("");
  }, [tempUsername, tempPassword]);

  const submitLogin = async () => {
    setLoading(true);
    if (tempUsername.length > 0 && tempPassword.length > 0) {
      try {
        const res = await axios.post("/api/user/login", {
          username: tempUsername,
          password: tempPassword,
        });

        setToken(res.data?.token);

        setLoading(false);

        setTempUsername("");
        setTempPassword("");

        navigate("/Home");
      } catch (error) {
        console.log(error);
        setLoading(false);
        if (error?.response?.status == 400)
          setErrorMessage("Username Or Password Incorrect");
        else setErrorMessage("There Seems To Be Server Issues");
      }
    } else {
      alert("Both Inputs Need To Be Fill For Login!!!");
    }
  };

  return (
    <div className="w-[100%] h-[100%] bg-[#274f4f] flex justify-around items-center flex-col font-extralight">
      <div className="2xl:text-9xl lg:text-7xl text-7xl text-white">
        {" "}
        Login{" "}
      </div>
      {errorMessage && (
        <div className="text-center border border-red-700 bg-[rgba(185,50,50,0.5)] text-2xl text-white lg:w-[35%] w-[80%] h-[15%] rounded-lg flex justify-center items-center">
          {" "}
          {errorMessage}{" "}
        </div>
      )}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="lg:w-[35%] w-[80%] h-[60%] bg-[#0E8388] rounded-xl shadow-black shadow-2xl flex flex-col justify-around items-center"
      >
        <section className="w-[100%] lg:h-[45%] h-[40%] flex flex-col justify-around items-center lg:pt-[10%] pt-[5%] lg:pb-[5%] pb-[2%]">
          <input
            role="input_1"
            placeholder="Username"
            className="lg:w-[250px] w-[350px] max-w-[80%] h-[60px] max-h-[45%] pl-6 pr-6 rounded-lg outline-none border border-black"
            type="text"
            onChange={(e) => setTempUsername(e.target.value)}
            value={tempUsername}
          />
          <input
            role="input_2"
            placeholder="Password"
            className="lg:w-[250px] w-[350px] max-w-[80%] h-[60px] max-h-[45%] pl-6 pr-6 rounded-lg outline-none border border-black"
            type="text"
            onChange={(e) => setTempPassword(e.target.value)}
            value={tempPassword}
          />{" "}
        </section>

        <section className="w-[100%] lg:h-[40%] h-[45%] flex flex-col justify-around items-center lg:pb-[5%] lg:pt-[5%] pb-[3%] pt-[3%]">
          <button
            role="button"
            disabled={!fieldsFull}
            onClick={submitLogin}
            className={
              "lg:w-[200px] w-[275px] max-w-[80%] h-[70px] bg-[#2E4F4F] rounded-lg border text-white font-semibold lg:text-4xl text-3xl outline-none flex justify-center items-center  " +
              `${!fieldsFull && "opacity-60"}`
            }
          >
            Login{" "}
          </button>

          <button
            onClick={() => navigate("/SignUp")}
            className="w-fit h-fit text-white font-semibold lg:text-3xl text-2xl outline-none hover:text-red-900"
          >
            To Register{" "}
          </button>
        </section>

        <section className="w-[100%] h-[10%] flex flex-col justify-around items-center mb-[3%]">
          {loading && (
            <svg
              aria-hidden="true"
              className="w-[25%] h-[60%] mr-2 text-[#ffffff3a] animate-spin dark:text-gray-600 fill-[#ffffff99] top-[30%]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
        </section>
      </form>
    </div>
  );
}
