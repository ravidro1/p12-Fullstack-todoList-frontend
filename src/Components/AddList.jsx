import React, { useEffect, useRef, useState } from "react";

export default function AddList({
  lists,
  setLists,
  setCurrentListIndex,
  setFirstTabIndex,
  setLastTabIndex,
  setTabsIndex,
}) {
  const [tempNameOfList, setTempNameOfList] = useState("");
  const [fieldsFull, setFieldsFull] = useState(false);

  useEffect(() => {
    if (tempNameOfList.length > 0) setFieldsFull(true);
    else setFieldsFull(false);
  }, [tempNameOfList]);

  const addList = () => {
    if (fieldsFull) {
      setLists((prev) => {
        return [...prev, { name: tempNameOfList, list: [] }];
      });

      setFirstTabIndex(lists.length - 3 < 0 ? 0 : lists.length - 3);
      setLastTabIndex(lists.length);
      setCurrentListIndex(lists.length);
      setTabsIndex(lists.length);
      setTempNameOfList("");
    } else {
      alert("The Name OF The New List Need Contain At Least One Char");
    }
  };

  return (
    <form className="w-[100%] h-[100%] flex flex-col justify-around items-center">
      <h1 className="2xl:text-9xl lg:text-8xl text-6xl">ADD LIST</h1>

      <input
        className="lg:w-[45%] w-[60%] h-[15%] border border-black rounded-xl outline-none px-5 text-black"
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

      <button
        disabled={!fieldsFull}
        className={
          "2xl:w-[30%] lg:w-[35%] w-[50%] h-[12%]  2xl:text-4xl text-3xl bg-[#2E4F4F] border border-white rounded-lg " +
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
