import React, { useEffect, useRef, useState } from "react";

export default function AddTask({
  currentListIndex,
  setLists,
  lists,
  setShowAddTask,
  addTaskWindowRef,
}) {
  const [tempTitle, setTempTitle] = useState("");
  const [tempContent, setTempContent] = useState("");
  const [tempStartDate, setTempStartDate] = useState("");
  const [tempEndDate, setTempEndDate] = useState("");

  const addTask = () => {
    if (
      tempTitle.length &&
      tempContent.length &&
      tempStartDate.length &&
      tempEndDate
    ) {
      setLists((prev) => {
        return [
          ...prev.map((item, index) => {
            if (index == currentListIndex) {
              return {
                ...lists.find((element, index) => index == currentListIndex),
                list: [
                  {
                    title: tempTitle,
                    content: tempContent,
                    startDate: tempStartDate,
                    endDate: tempEndDate,
                    checked: false,
                  },
                  ...lists.find((element, index) => index == currentListIndex)
                    .list,
                ],
              };
            }
            return item;
          }),
        ];
      });

      setTempTitle("");
      setTempContent("");
      setTempStartDate("");
      setTempEndDate("");
      setShowAddTask(false);
    } else {
      alert("The New Task Need To Contain At Least One Char");
    }
  };

  const onChangeTime = (event, startOrEnd) => {
    if (startOrEnd == "start") {
      if (tempEndDate && tempEndDate < event.target.value) {
        setTempStartDate(tempEndDate);
      } else {
        setTempStartDate(event.target.value);
      }
    } else if (startOrEnd == "end") {
      if (tempStartDate && event.target.value < tempStartDate) {
        setTempStartDate(event.target.value);
      }
      setTempEndDate(event.target.value);
    }
  };

  return (
    <form
      ref={addTaskWindowRef}
      onSubmit={(e) => e.preventDefault()}
      className="w-[100%] h-[100%] bg-[#CBE4DE] flex flex-col justify-between text-[#0E8388] rounded-xl"
    >
      <input
        className="w-[100%] h-[10%] px-5 border-b-[#2C3333] border-b outline-none"
        onChange={(e) => setTempTitle(e.target.value)}
        value={tempTitle}
        placeholder="Title..."
        type="text"
      />
      <textarea
        className="w-[100%] h-[55%] px-5 bg-[#fff]  border-b-[#2C3333] border-b outline-none"
        onChange={(e) => setTempContent(e.target.value)}
        value={tempContent}
        placeholder="Content..."
        type="tex"
      />

      <input
        className="w-[100%] h-[10%] outline-none border-b-[#2C3333] border-b  px-5"
        value={tempStartDate}
        onChange={(e) => onChangeTime(e, "start")}
        type="date"
      />
      <input
        placeholder="st"
        className="w-[100%] h-[10%] outline-none border-b-[#2C3333] border-b  px-5"
        value={tempEndDate}
        onChange={(e) => onChangeTime(e, "end")}
        type="date"
      />

      <button
        onClick={addTask}
        className="w-[100%] h-[15%] bg-[#CBE4DE]  outline-none text-xl"
      >
        {" "}
        Add Task
      </button>
    </form>
  );
}
