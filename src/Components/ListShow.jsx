import React, { useState } from "react";
import swal from "sweetalert";
import AddTask from "./AddTask";
import OneListItem from "./OneListItem";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import axios from "axios";
import useAuthContext from "../context/useAuthContext";

export default function ListShow({
  setLists,
  currentListIndex,
  setFirstTabIndex,
  setLastTabIndex,
  setCurrentListIndex,
  lists,
  showAddTask,
  setShowAddTask,
  addTaskWindowRef,
}) {
  // console.log(lists);
  const { token } = useAuthContext();
  const [errorMessage_addTask, setErrorMessage_addTask] = useState("");

  const deleteList = () => {
    swal({
      title: "Are You Sure?",
      text: "Once Deleted, You Will Not Be Able To Recover This List!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((answer) => {
      if (answer) {
        swal("List Has Been Deleted!", {
          icon: "success",
        });

        axios.post(
          "/api/list/delete-list",
          { list_id: lists[currentListIndex].id },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setLists((prev) => {
          return [
            ...prev.filter((element, index) => index != currentListIndex),
          ];
        });

        setFirstTabIndex((prev) => {
          if (lists.length - 1 <= 0) return null;
          if (prev > 0) return prev - 1;
          return prev;
        });
        setLastTabIndex((prev) => {
          if (lists.length - 1 <= 0) return null;

          if (lists.length <= 4 || prev == lists.length - 1) return prev - 1;
          return prev;
        });

        setCurrentListIndex(null);
      } else {
        swal("Your List is safe!");
      }
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id != over.id) {
      let tempAllLists = [...lists];
      let tempCurrentList = tempAllLists[currentListIndex].tasks;

      const tempActiveIndex = tempCurrentList
        .map((item) => item.id)
        .indexOf(active.id);

      const tempOverIndex = tempCurrentList
        .map((item) => item.id)
        .indexOf(over.id);

      const tempActiveItem = tempCurrentList[tempActiveIndex];

      tempCurrentList = tempCurrentList.filter(
        (item, index) => index != tempActiveIndex
      );
      tempCurrentList.splice(tempOverIndex, 0, tempActiveItem);

      console.log(tempCurrentList);

      axios
        .post(
          "/api/list/set-render-numbers",
          {
            tasks: tempCurrentList.map((task, index) => {
              return { ...task, render_number: index };
            }),
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log(res.data);

          tempAllLists[currentListIndex] = {
            ...tempAllLists[currentListIndex],
            tasks: tempCurrentList,
          };
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLists(tempAllLists));
    }
  };

  // console.log(lists);

  const touchSensor = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center flex-col text-white relative ">
      <section className="w-[100%] h-[100%] flex justify-around items-center flex-col ">
        <h1 className="text-7xl h-[10%]">
          {lists.find((element, index) => index == currentListIndex).name}
        </h1>

        <div className="w-[75%] h-[70%] flex items-center flex-col border border-[#fff] bg-[#a1bdb6]">
          <button
            onClick={() => setShowAddTask(true)}
            className={
              "w-[100%] h-[15%] text-5xl bg-[#1fa3a7] hover:bg-[#228285]"
            }
          >
            {" "}
            +{" "}
          </button>

          <div className={"w-[100%] h-[85%] overflow-y-auto"}>
            <DndContext
              sensors={touchSensor}
              modifiers={[restrictToVerticalAxis]}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={lists[currentListIndex].tasks}
                strategy={verticalListSortingStrategy}
              >
                {lists[currentListIndex].tasks.map((item, index) => {
                  if (item?.content?.length > 0) {
                    return (
                      <OneListItem
                        id={item.id}
                        setLists={setLists}
                        currentListIndex={currentListIndex}
                        key={item.id}
                        item={item}
                        itemIndex={index}
                        lists={lists}
                      />
                    );
                  }
                })}
              </SortableContext>
            </DndContext>
          </div>
        </div>

        <button
          onClick={deleteList}
          className="self-center w-[20%] h-[10%] flex items-center justify-center bg-red-600 rounded-lg border text-[#fff]"
        >
          Delete
        </button>
      </section>

      {showAddTask && (
        <section
          data-value="parent"
          className="lg:w-[65%] lg:h-[70%] md:w-[75%] md:h-[80%] w-[85%] h-[95%] flex justify-between items-center fixed z-20 flex-col left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <div
            style={{ visibility: errorMessage_addTask ? "visible" : "hidden" }}
            className="text-center border p-2  border-red-700 bg-[rgba(185,50,50,0.5)] md:text-xl text-lg text-white w-[100%] h-[20%] rounded-lg flex justify-center items-center"
          >
            {" "}
            {errorMessage_addTask ? (
              errorMessage_addTask
            ) : (
              <svg
                aria-hidden="true"
                className="w-[25%] h-[60%] mr-2 text-[#ffffff3a] animate-spin dark:text-gray-600 fill-[#ffffff99] top-[30%] z-20"
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
            )}{" "}
          </div>

          <AddTask
            lists={lists}
            setLists={setLists}
            currentListIndex={currentListIndex}
            addTaskWindowRef={addTaskWindowRef}
            setShowAddTask={setShowAddTask}
            setErrorMessage_addTask={setErrorMessage_addTask}
          />
        </section>
      )}
    </div>
  );
}
