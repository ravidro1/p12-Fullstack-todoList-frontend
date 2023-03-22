import React, {  useState } from "react";

export default function Tab({
  tab,
  lastTabRef,
  setCurrentListIndex,
  index,
}) {
  const [tabWidth] = useState(24);

  const selectThisTab = () => {
    setCurrentListIndex(index);
  };

  return (
    <button
      ref={lastTabRef}
      onClick={() => selectThisTab()}
      style={{
        marginInline: ` ${(100 - tabWidth * 4) / 8}%`,
      }}
      className={
        "h-[95%] flex justify-center items-center bg-[#0E8388] p-0 rounded-xl relative text-white capitalize min-w-[24%] max-w-[24%]"
      }
    >
      {tab.name}
    </button>
  );
}

