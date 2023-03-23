import React, { useState } from "react";

export default function OneListItem({
  item,
  itemIndex,
  currentListIndex,
  lists,
  setLists,
}) {
  const [isFullOpen, setIsFullOpen] = useState(false);

  const deleteItem = () => {
    setLists((prev) => {
      return [
        ...prev.map((element, index) => {
          if (index == currentListIndex) {
            return {
              ...lists.find((element, index) => index == currentListIndex),
              list: [
                ...lists
                  .find((element, index) => index == currentListIndex)
                  .list.filter((element, index) => index != itemIndex),
              ],
            };
          }
          return element;
        }),
      ];
    });
  };

  const checkedItem = () => {
    setLists((prev) => {
      return [
        ...prev.map((element, index) => {
          if (index == currentListIndex) {
            return {
              ...lists.find((element, index) => index == currentListIndex),
              list: [
                ...lists
                  .find((element, index) => index == currentListIndex)
                  .list.map((element, index) => {
                    if (index == itemIndex) {
                      return { ...element, checked: !element.checked };
                    }
                    return element;
                  }),
              ],
            };
          }
          return element;
        }),
      ];
    });
  };

  return (
    <div
      onDoubleClick={() => setIsFullOpen(!isFullOpen)}
      style={{ backgroundColor: itemIndex % 2 ? "#2E4F4F" : "#2C3333" }}
      className={"w-[100%] px-4 text-1xl text-white"}
    >
      <section className={"w-[100%] flex justify-between px-4 text-1xl"}>
        <div className="flex w-[92%]">
          <input
            onChange={checkedItem}
            checked={item.checked}
            type={"checkbox"}
          />
          <p
            className={
              "px-5  break-all py-2 flex items-center text-lg font-semibold " +
              (item.checked ? "line-through" : "")
            }
          >
            {" "}
            {item.content}{" "}
          </p>
        </div>

        <button className=" w-[8%] py-4" onClick={deleteItem}>
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
      </section>

      {isFullOpen && (
        <section className="w-[100%] ">
          <section className="w-[100%] border-t border-white py-1">
            <div className="flex justify-center"> Content: </div>
            <div> {item.content} </div>
          </section>
          <section className="w-[100%] flex justify-around border-y border-white py-1">
            <div> Start Date: {item.startDate} </div>
            <div> End Date: {item.endDate} </div>
          </section>
        </section>
      )}
    </div>
  );
}
