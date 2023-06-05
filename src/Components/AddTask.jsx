import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useAuthContext from "../context/useAuthContext";
import axios from "axios";

export default function AddTask({
  currentListIndex,
  setLists,
  lists,
  setShowAddTask,
  addTaskWindowRef,
  setErrorMessage_addTask,
}) {
  const { token } = useAuthContext();

  const [tempTitle, setTempTitle] = useState("");
  const [tempContent, setTempContent] = useState("");
  const [tempStartDate, setTempStartDate] = useState("");
  const [tempEndDate, setTempEndDate] = useState("");

  useEffect(() => {
    setErrorMessage_addTask("");
  }, [tempTitle]);

  const addTask = async () => {
    if (
      tempTitle.length &&
      tempContent.length &&
      tempStartDate.length &&
      tempEndDate
    ) {
      try {
        const res = await axios.post(
          "/api/list/create-new-task",
          {
            title: tempTitle,
            content: tempContent,
            start_date: tempStartDate,
            end_date: tempEndDate,
            ownerListID: lists[currentListIndex].id,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        console.log(res.data);
        const newTask = res.data;

        setLists((prev) => {
          return [
            ...prev.map((item, index) => {
              if (index == currentListIndex) {
                return {
                  ...lists[currentListIndex],
                  tasks: [newTask, ...lists[currentListIndex].tasks],
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
      } catch (error) {
        console.log(error);
        if (error?.response?.status == 400)
          setErrorMessage_addTask(
            "You Already Have A Task With That Title In Current List"
          );
        else setErrorMessage_addTask("There Seems To Be Server Issues");
      }
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
    <>
      <form
        ref={addTaskWindowRef}
        onSubmit={(e) => e.preventDefault()}
        className="w-[100%] h-[75%] bg-[#CBE4DE] flex flex-col justify-between text-[#0E8388] rounded-xl"
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
          type="submit"
          onClick={addTask}
          className="w-[100%] h-[15%] bg-[#CBE4DE]  outline-none text-xl"
        >
          {" "}
          Add Task
        </button>
      </form>
    </>
  );
}
