import React, { useState } from "react";

export default function AddTask({ currentListIndex, setLists, lists }) {
  const [tempNewTask, setTempNewTask] = useState("");

  const addTask = () => {
    if (tempNewTask.length) {
      setLists((prev) => {
        console.log(prev);
        return [
          ...prev.map((item, index) => {
            if (index == currentListIndex) {
              return {
                ...lists.find((element, index) => index == currentListIndex),
                list: [
                  { content: tempNewTask, checked: false },
                  ...lists.find((element, index) => index == currentListIndex)
                    .list,
                ],
              };
            }
            return item;
          }),
        ];
      });
      setTempNewTask("");
    } else {
        alert("The New Task Need To Contain At Least One Char")
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-[100%] h-[100%]">
      <input
        className="w-[85%] h-[100%] px-5 outline-none bg-[#CBE4DE] text-[#0E8388] border-t-[#2C3333] border-t"
        onChange={(e) => setTempNewTask(e.target.value)}
        value={tempNewTask}
        placeholder="New Task"
        type="text"
      />
      <button
        onClick={addTask}
        className="w-[15%] h-[100%] bg-[#CBE4DE] text-[#0E8388] border-t-[#2C3333] border-t outline-none"
      >
        {" "}
        Add Task
      </button>
    </form>
  );
}
