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

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouseXPos(event.clientX - tabContinerRef.current.offsetLeft);
    };

    window.addEventListener("mousemove", handleMouseMove);
  }, []);

  const [counter, setCounter] = useState(0);

  const [mouseXPos, setMouseXPos] = useState(0);
  const [placeOfMouseOnTab, setPlaceOfMouseOnTab] = useState(0);
  const [tempX, setTempX] = useState(0);
  const selfRef = useRef();
  const counterRef = useRef();

  const startCounter = (e) => {
    setPlaceOfMouseOnTab(
      mouseXPos - index * 0.25 * tabContinerRef.current.offsetWidth
    );
    selectThisTab();
    if (counterRef.current) return;
    counterRef.current = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 10);
  };

  const stopCounter = () => {
    if (counterRef.current) {
      clearInterval(counterRef.current);
      counterRef.current = null;
      setCounter(0);
      check();
    }
  };

  useEffect(() => {
    setTempX((mouseXPos * 100) / tabContinerRef.current.offsetWidth);
  }, [counter]);

  const check = () => {
    if (lists.length > 1) {
      let tempArray = lists.filter((element, i) => i != index);

      console.log(tempArray);

      let newCellIndex = 0;

      tempArray.forEach((element, i) => {
        console.log(tempX, element.x, mouseXPos, placeOfMouseOnTab);
        if (tempX - 10 >= element.x) newCellIndex = i + 1;
      });
      console.log(newCellIndex);
      tempArray.splice(newCellIndex, 0, tab);

      setCurrentListIndex(newCellIndex);

      tempArray = tempArray.map((element, i) => {
        return { ...element, x: i * 25 };
      });

      setLists(tempArray);
    } else {
    }
  };

  return (
    <button
      // ref={[lastTabRef, selfRef]}
      ref={(e) => {
        selfRef.current = e;
        lastTabRef && (lastTabRef.current = e);
      }}
      onMouseDown={(e) => startCounter(e)}
      onMouseUp={() => stopCounter()}
      onMouseLeave={() => stopCounter()}
      style={{
        // scale: counter > 0 ? 0.9 : 1,
        backgroundColor: currentListIndex == index ? "#12abb0" : "#0E8388",
        opacity: counter > 0 ? 1 : 0.7,
        zIndex: counter > 0 ? 20 : 1,
        left:
          counter > 0
            ? mouseXPos - placeOfMouseOnTab
            : (tab.x / 100) * tabContinerRef.current.offsetWidth,

        marginInline: `0.5%`,
      }}
      className={
        "h-[95%] flex justify-center items-center p-0 rounded-xl absolute text-white capitalize min-w-[24%] max-w-[24%] outline-none " +
        "" // `${"animate-tabToRight"}`
      }
    >
      {tab.name}
    </button>
  );
}

// className="box"
// dragConstraints={{ top: 20,bottom:20 }}
