import React, { useEffect, useRef, useState } from "react";
import AddList from "./AddList";
import Tab from "./Tab";

export default function TabsScrollBar({
  lists,
  setLists,
  setCurrentListIndex,
  firstTabIndex,
  lastTabIndex,
  setFirstTabIndex,
  setLastTabIndex,
  tabsIndex,
  setTabsIndex,
}) {
  const lastTabRef = useRef();

  useEffect(() => {
    if (lists.length > 0 && firstTabIndex == null && lastTabIndex == null) {
      setFirstTabIndex(0);
      if (lists.length > 4) setLastTabIndex(3);
      else setLastTabIndex(lists.length - 1);
    }
  }, []);

  useEffect(() => {
    lastTabRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [tabsIndex]);

  const scrollTabs = (leftOrRight) => {
    if (leftOrRight == "right") {
      console.log("right");
      if (lastTabIndex < lists.length - 1) {
        setFirstTabIndex(firstTabIndex + 1);
        setLastTabIndex(lastTabIndex + 1);
        setTabsIndex(lastTabIndex + 1);
      }
    } else {
      if (firstTabIndex > 0) {
        setFirstTabIndex(firstTabIndex - 1);
        setLastTabIndex(lastTabIndex - 1);
        setTabsIndex(firstTabIndex - 1);
      }
    }
  };

  return (
    <section className="w-[100%] h-[100%] flex  bg-[#a1bdb6]">
      <button
        onClick={() => scrollTabs("left")}
        className="w-[5%] h-[100%] font-bold text-xl text-white  outline-none"
      >
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M15.75 19.5L8.25 12l7.5-7.5"></path>
        </svg>
      </button>
      <div className="flex w-[80%] h-[100%] items-center overflow-scroll">
        {lists.map((item, index) => {
          return (
            <Tab
              key={index}
              index={index}
              tab={item}
              lastTabRef={index == tabsIndex ? lastTabRef : null}
              setCurrentListIndex={setCurrentListIndex}
            />
          );
        })}
      </div>

      <div className="flex w-[10%] h-[100%] items-center">
        <button
          onClick={() => setCurrentListIndex(null)}
          className={
            "h-[100%] min-w-[90%] max-w-[100%] flex justify-center items-center  p-0 rounded-xl relative text-[#0E8388] capitalize  mx-[5%]  outline-none"
          }
        >
          <svg
            className="h-[85%]"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
            ></path>
          </svg>
        </button>
      </div>

      <button
        onClick={() => scrollTabs("right")}
        className="w-[5%] h-[100%] font-bold text-xl text-white  outline-none"
      >
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
        </svg>
      </button>
    </section>
  );
}
