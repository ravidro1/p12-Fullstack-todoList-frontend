import React, { useEffect, useRef, useState } from "react";
import useAuthContext from "../context/useAuthContext";
import axios from "axios";

export default function AddList({
  lists,
  setLists,
  setCurrentListIndex,
  setFirstTabIndex,
  setLastTabIndex,
  setTabsIndex,
}) {
  const { token } = useAuthContext();

  const [tempNameOfList, setTempNameOfList] = useState("");
  const [fieldsFull, setFieldsFull] = useState(false);

  const [errorMessage_addList, setErrorMessage_addList] = useState("");

  useEffect(() => {
    if (tempNameOfList.length > 0) setFieldsFull(true);
    else setFieldsFull(false);
    setErrorMessage_addList("");
  }, [tempNameOfList]);

  const addList = async () => {
    if (fieldsFull) {
      try {
        const res = await axios.post(
          "/api/list/create-new-list",
          {
            name: tempNameOfList,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setLists((prev) => {
          return [...prev, { name: tempNameOfList, tasks: [] }];
        });
        setFirstTabIndex(lists.length - 3 < 0 ? 0 : lists.length - 3);
        setLastTabIndex(lists.length);
        setCurrentListIndex(lists.length);
        setTabsIndex(lists.length);
        setTempNameOfList("");
      } catch (error) {
        console.log(error);
        if (error?.response?.status == 400)
          setErrorMessage_addList("You Already Have A List With That Name");
        else setErrorMessage_addList("There Seems To Be Server Issues");
      }
    } else {
      alert("The Name OF The New List Need Contain At Least One Char");
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-[100%] h-[100%] flex flex-col justify-around items-center"
    >
      <h1 className="2xl:text-9xl lg:text-8xl text-6xl text-center">
        ADD LIST
      </h1>

      <div className="w-[100%] flex flex-col justify-around items-center">
        <input
          className="lg:w-[45%] max-w-[80%] w-[300px] h-[75px] border border-black rounded-xl outline-none px-5 text-black"
          onChange={(e) => {
            let word = e.target.value;
            if (word.length > 0) {
              word = e.target.value.trimStart().toLocaleLowerCase().split("");

              word = word.map((letter, index) => {
                if (index == 0 || word[index - 1] == " ")
                  return letter.toUpperCase();
                return letter;
              });
              word = word.toString();
            }
            setTempNameOfList(word.replaceAll(",", ""));
          }}
          value={tempNameOfList}
          placeholder="NAME OF LIST"
          type="text"
        />

        {errorMessage_addList && (
          <p className="text-center text-xl my-3 text-red-800">
            {" "}
            {errorMessage_addList}{" "}
          </p>
        )}
      </div>

      <button
        disabled={!fieldsFull}
        className={
          "2xl:w-[30%] lg:w-[35%] max-w-[70%] w-[250px] h-[12%]  2xl:text-4xl text-3xl bg-[#2E4F4F] border border-white rounded-lg " +
          `${!fieldsFull && "opacity-60"}`
        }
        onClick={addList}
      >
        {" "}
        Submit{" "}
      </button>
    </form>
  );
}
