import React from "react";

export default function OneListItem({
  item,
  itemIndex,
  currentListIndex,
  lists,
  setLists,
}) {
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
      style={{ backgroundColor: itemIndex % 2 ? "#2E4F4F" : "#2C3333" }}
      className={"w-[100%] flex justify-between px-4 text-1xl"}
    >
      <section className="flex w-[92%]">
        <input
          onChange={checkedItem}
          checked={item.checked}
          type={"checkbox"}
        />
        <p
          className={
            "px-5 text-white break-all py-2 flex items-center" +
            (item.checked ? "line-through" : "")
          }
        >
          {" "}
          {item.content}{" "}
        </p>
      </section>

      <button className="text-white w-[8%] py-4" onClick={deleteItem}>
        <svg
          className="h-[2vw] text-white"
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
  );
}
