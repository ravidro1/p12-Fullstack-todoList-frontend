import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

export default function SignUp() {
  const navigate = useNavigate();

  const [tempUsername, setTempUsername] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [tempVerifyPassword, setTempVerifyPassword] = useState("");
  const [fieldsFull, setFieldsFull] = useState(false);

  useEffect(() => {
    if (
      tempUsername.length > 0 &&
      tempPassword.length > 0 &&
      tempVerifyPassword.length > 0
    )
      setFieldsFull(true);
    else setFieldsFull(false);
  }, [tempUsername, tempPassword, tempVerifyPassword]);

  const submitSignUp = () => {
    if (fieldsFull) {
      console.log(tempUsername);
      console.log(tempPassword);

      setTempUsername("");
      setTempPassword("");
      setTempVerifyPassword("");
    } else {
      alert("Both Inputs Need To Be Fill For Login!!!");
    }
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: "-100%", transition: { duration: 0.3 } }}
      className="w-[100%] h-[100%] bg-[#274f4f] flex justify-around items-center flex-col font-extralight"
    >
      <div className="text-[7vw] text-white"> Register </div>
      <div className="w-[40%] h-[65%] bg-[#0E8388] rounded-xl shadow-black shadow-2xl flex flex-col justify-around items-center">
        <section className="w-[100%] h-[35%] flex flex-col justify-around items-center">
          <input
            placeholder="Username"
            className="w-[45%] h-[27%] pl-6 pr-6 rounded-lg outline-none border border-black"
            type="text"
            onChange={(e) => setTempUsername(e.target.value)}
            value={tempUsername}
          />
          <input
            placeholder="Password"
            className="w-[45%] h-[27%] pl-6 pr-6 rounded-lg outline-none border border-black"
            type="text"
            onChange={(e) => setTempPassword(e.target.value)}
            value={tempPassword}
          />{" "}
          <input
            placeholder="Verify Password"
            className="w-[45%] h-[27%] pl-6 pr-6 rounded-lg outline-none border border-black"
            type="text"
            onChange={(e) => setTempVerifyPassword(e.target.value)}
            value={tempVerifyPassword}
          />{" "}
        </section>

        <section className="w-[100%] h-[20%] flex flex-col justify-around items-center">
          <button
            disabled={!fieldsFull}
            onClick={submitSignUp}
            className={
              "w-[35%] h-[45%] bg-[#2E4F4F] rounded-lg border text-white font-semibold text-[1.5vw] outline-none " +
              `${!fieldsFull && "opacity-60"}`
            }
          >
            Register{" "}
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-[35%] h-[10%] text-white font-semibold text-[1.75vw] outline-none hover:text-red-900"
          >
            To Login{" "}
          </button>
        </section>
      </div>
    </motion.div>
  );
}
