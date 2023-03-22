import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [tempUsername, setTempUsername] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [fieldsFull, setFieldsFull] = useState(false);

  useEffect(() => {
    if (tempUsername.length > 0 && tempPassword.length > 0) setFieldsFull(true);
    else setFieldsFull(false);
  }, [tempUsername, tempPassword]);

  const submitSignUp = () => {
    if (tempUsername.length > 0 && tempPassword.length > 0) {
      console.log(tempUsername);
      console.log(tempPassword);

      setTempUsername("");
      setTempPassword("");
    } else {
      alert("Both Inputs Need To Be Fill For Login!!!");
    }
  };

  return (
    <div className="w-[100%] h-[100%] bg-[#2C3333] flex justify-around items-center flex-col">
      <div className="text-[7vw] text-white"> SignUp </div>
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
        </section>

        <section className="w-[100%] h-[20%] flex flex-col justify-around items-center">
          <button
            onClick={submitSignUp}
            className={
              "w-[35%] h-[45%] bg-[#2E4F4F] rounded-lg border text-white font-semibold text-[1.5vw] outline-none " +
              `${!fieldsFull && "opacity-60"}`
            }
          >
            SignUp{" "}
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-[35%] h-[10%] text-white font-semibold text-[1.75vw] outline-none hover:text-red-900"
          >
            Login{" "}
          </button>
        </section>
      </div>
    </div>
  );
}
