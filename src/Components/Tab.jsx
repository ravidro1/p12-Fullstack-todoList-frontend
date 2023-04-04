import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Tab({
  lists,
  setLists,
  tab,
  lastTabRef,
  currentListIndex,
  setCurrentListIndex,
  index,
  tabContinerRef,
}) {
  const selectThisTab = () => {
    setCurrentListIndex(index);
  };

  return (
    <button
      ref={(e) => {
        lastTabRef && (lastTabRef.current = e);
      }}
      onClick={selectThisTab}
      style={{
        backgroundColor: index == currentListIndex ? "#46a2a5" : "#0E8388",
      }}
      className={
        "h-[95%] flex justify-center items-center bg-[#0E8388] p-0 rounded-xl text-white capitalize min-w-[24%] max-w-[24%] outline-none mx-[0.5%]"
      }
    >
      {tab.name}
    </button>
  );
}
