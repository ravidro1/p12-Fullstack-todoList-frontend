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
        let tempCurrentList = tempAllLists[currentListIndex].list;

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
          list: tempCurrentList,
        };
        console.log(tempAllLists);

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

  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center flex-col text-white relative">
      <section className="w-[100%] h-[100%] flex justify-around items-center flex-col ">
        {/* <div className="w-[100%] h-[20%] flex flex-col justify-center items-center text-3xl  capitalize px-3 "> */}
        <h1 className="text-7xl h-[10%]">
          {lists.find((element, index) => index == currentListIndex).name}
        </h1>
        {/* </div> */}

        <div className="w-[75%] h-[70%] flex items-center flex-col overflow-y-scroll border border-[#fff] bg-[#a1bdb6]">
          <button
            onClick={() => setShowAddTask(true)}
            style={
              {
                // lists.find((element, index) => index == currentListIndex).list
                //   .length % 2
                //   ? "#1fa3a7"
                //   : "#0e848873",
              }
            }
            className={
              "w-[100%] h-[15%] text-5xl bg-[#1fa3a7] hover:bg-[#228285]"
            }
          >
            {" "}
            +{" "}
          </button>

          <DndContext
            sensors={touchSensor}
            modifiers={[restrictToVerticalAxis]}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={
                lists.find((element, index) => index == currentListIndex).list
              }
              strategy={verticalListSortingStrategy}
            >
              {lists
                .find((element, index) => index == currentListIndex)
                .list.map((item, index) => {
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
          className="w-[65%] h-[80%] flex justify-center items-center absolute z-20 border border-black"
        >
          <AddTask
            lists={lists}
            setLists={setLists}
            currentListIndex={currentListIndex}
            addTaskWindowRef={addTaskWindowRef}
            setShowAddTask={setShowAddTask}
          />
        </section>
      )}
    </div>
  );
}
