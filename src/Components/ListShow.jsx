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
  console.log(lists);
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
    // console.log("Active: " + active.id);
    // console.log("Over: " + over.id);

    if (active.id != over.id) {
      setLists((prev) => {
        let tempAllLists = [...prev];
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

        // tempCurrentList = arrayMove(
        //   tempCurrentList,
        //   tempActiveIndex,
        //   tempOverIndex
        // );

        tempAllLists[currentListIndex] = {
          ...tempAllLists[currentListIndex],
          tasks: tempCurrentList,
        };

        return tempAllLists;
        // return arrayMove(prev, tempActiveIndex, tempOverIndex);
      });
    }
  };

  const touchSensor = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  console.log(addTaskWindowRef);
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
                items={
                  lists.find((element, index) => index == currentListIndex)
                    .tasks
                }
                strategy={verticalListSortingStrategy}
              >
                {lists
                  .find((element, index) => index == currentListIndex)
                  .tasks.map((item, index) => {
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
            {errorMessage_addTask}{" "}
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
