import React from "react";
import swal from "sweetalert";
import AddTask from "./AddTask";
import OneListItem from "./OneListItem";

export default function ListShow({
  setLists,
  currentListIndex,
  setFirstTabIndex,
  setLastTabIndex,
  setCurrentListIndex,
  lists,
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

  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center flex-col">
      <section className="w-[100%] h-[90%] flex  items-center flex-col">
        <div className="w-[100%] h-[20%] flex flex-col justify-center items-center text-3xl text-white capitalize px-3 pt-5">
          <button
            onClick={deleteList}
            className="px-2 py-2 h-[45%] flex items-center self-start bg-red-600 rounded-lg border text-[#fff]"
          >
            Delete
          </button>
          <h1 className="text-7xl h-[55%]">
            {lists.find((element, index) => index == currentListIndex).name}
          </h1>
        </div>

        <div className="mt-5 w-[75%] h-[75%] flex items-center flex-col overflow-y-scroll border border-[#2C3333] bg-[#CBE4DE]">
          {lists
            .find((element, index) => index == currentListIndex)
            .list.map((item, index) => {
              if (item?.content?.length > 0) {
                return (
                  <OneListItem
                    setLists={setLists}
                    currentListIndex={currentListIndex}
                    key={index}
                    item={item}
                    itemIndex={index}
                    lists={lists}
                  />
                );
              }
            })}
        </div>
      </section>
      <section className="w-[100%] h-[10%] flex justify-center items-center ">
        <AddTask
          lists={lists}
          setLists={setLists}
          currentListIndex={currentListIndex}
        />
      </section>
    </div>
  );
}
