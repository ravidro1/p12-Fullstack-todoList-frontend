import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";
import useAuthContext from "../context/useAuthContext";

export default function OneListItem({
  item,
  itemIndex,
  currentListIndex,
  lists,
  setLists,
  id,
}) {
  const { token } = useAuthContext();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteItem = async () => {
    try {
      await axios.post(
        "/api/list/delete-task",
        { task_id: lists[currentListIndex].tasks[itemIndex].id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setLists((prev) => {
        return [
          ...prev.map((element, index) => {
            if (index == currentListIndex) {
              return {
                ...lists[currentListIndex],
                tasks: [
                  ...lists[currentListIndex].tasks.filter(
                    (element, index) => index != itemIndex
                  ),
                ],
              };
            }
            return element;
          }),
        ];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkedItem = async () => {
    console.log(item);
    try {
      const res = await axios.post(
        "/api/list/edit-is-complete-task",
        {
          task_id: item.id,
          is_complete: !item.is_complete,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setLists((prev) => {
        return [
          ...prev.map((element, index) => {
            if (index == currentListIndex) {
              return {
                ...lists[currentListIndex],
                tasks: [
                  ...lists[currentListIndex].tasks.map((inElement, index) => {
                    if (index == itemIndex) {
                      return {
                        ...inElement,
                        is_complete: !inElement.is_complete,
                      };
                    }
                    return inElement;
                  }),
                ],
              };
            }
            return element;
          }),
        ];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeIsOpen = () => {
    setLists((prev) => {
      return [
        ...prev.map((element, index) => {
          if (index == currentListIndex) {
            return {
              ...element,
              tasks: element.tasks.map((inElement, i) => {
                if (i == itemIndex)
                  return {
                    ...inElement,
                    isOpen: !inElement.isOpen,
                  };
                return inElement;
              }),
            };
          }
          return element;
        }),
      ];
    });
  };

  const getFormatTime = (time) => {
    const timeType = new Date(time);
    const tempTime =
      timeType.getDate() +
      "/" +
      timeType.getMonth() +
      "/" +
      timeType.getFullYear();
    return tempTime;
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...style,
        userSelect: "none",
        backgroundColor: itemIndex % 2 ? "#1fa3a7" : "#0e848873",
      }}
      className={"w-[100%] px-4 text-1xl text-white"}
    >
      <section
        className={
          "w-[100%] justify-between px-4 text-1xl flex flex-col items-center"
        }
      >
        <div className="w-[100%] h-[80%] flex flex-row">
          <div className="flex w-[92%] items-center">
            <label className="cursor-pointer relative flex flex-col items-center justify-center">
              <input
                className="w-[20px] h-[20px] appearance-none border-[#fff] border-2 rounded-sm outline-none"
                onChange={checkedItem}
                checked={item.is_complete}
                type={"checkbox"}
              />
              <FontAwesomeIcon
                icon={faCheck}
                style={{ opacity: item.is_complete ? 1 : 0 }}
                className="text-[fff]  w-[60%] h-[60%] absolute check-1 flex flex-col items-center justify-center"
              />
            </label>

            <p
              className={
                "px-5  break-all flex items-center text-lg font-semibold decoration-[2px] decoration-[#1fa3a7] " +
                (item.is_complete ? "line-through" : "")
              }
            >
              {" "}
              {item.title}{" "}
            </p>
          </div>

          <button
            className=" w-[8%] rounded-lg py-3 hover:bg-[rgb(0,0,0,0.2)] flex justify-center mt-3"
            onClick={deleteItem}
          >
            <svg
              className="h-[2vw] "
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />{" "}
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{" "}
              <line x1="10" y1="11" x2="10" y2="17" />{" "}
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>

        <section
          style={{
            height: 0 + (item.isOpen ? 100 : 0) + "px",
          }}
          className="w-[100%] overflow-hidden oneListItemOpenBigWindowAnimation"
        >
          <>
            <section className="w-[100%] border-t border-white py-1">
              <div className="flex justify-center"> Content: </div>
              <div> {item.content} </div>
            </section>
            <section className="w-[100%] flex justify-around border-y border-white py-1">
              <div> Start Date: {getFormatTime(item.start_date)} </div>
              <div> End Date: {getFormatTime(item.end_date)} </div>
            </section>
          </>
        </section>

        <button
          onClick={changeIsOpen}
          className="w-[10%] rounded-lg flex justify-center hover:bg-[rgb(0,0,0,0.2)]"
        >
          <svg
            style={{
              transform: item.isOpen ? "rotate(0deg)" : "rotate(180deg)",
            }}
            className="h-8 w-8 arrowAnimation"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <polyline points="17 11 12 6 7 11" />{" "}
            <polyline points="17 18 12 13 7 18" />
          </svg>
        </button>
      </section>
    </div>
  );
}
