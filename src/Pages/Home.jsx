import React, { useEffect, useState } from "react";
import AddList from "../Components/AddList";
import ListShow from "../Components/ListShow";
import TabsScrollBar from "../Components/TabsScrollBar";

export default function Home() {
  const [lists, setLists] = useState([
    {
      name: "one list",
      list: [
        { content: "1", checked: false },
        { content: "1", checked: false },
        { content: "1", checked: false },
        { content: "1", checked: false },
        { content: "1", checked: false },
      ],
    },
    {
      name: "two list",
      list: [
        { content: "2", checked: true },
        { content: "2", checked: true },
        { content: "2", checked: false },
        { content: "2", checked: false },
        { content: "2", checked: false },
      ],
    },
    {
      name: "three list",
      list: [
        { content: "3", checked: false },
        { content: "3", checked: false },
        { content: "3", checked: false },
        { content: "3", checked: true },
        { content: "3", checked: false },
      ],
    },
    { name: "four list", list: [1, 2, 3, 4, 5] },
    { name: "five list", list: [] },
    { name: "six list", list: [] },
    { name: "seven list", list: [] },
  ]);

  const [currentListIndex, setCurrentListIndex] = useState();

  const [tabsIndex, setTabsIndex] = useState();
  const [firstTabIndex, setFirstTabIndex] = useState(null);
  const [lastTabIndex, setLastTabIndex] = useState(null);

  useEffect(() => {
    // getLists()
  }, []);

  const getLists = () => {};

  console.log(firstTabIndex, lastTabIndex, tabsIndex);
  return (
    <div className="w-[100%] h-[100%] bg-[#2C3333] flex justify-around items-center flex-col">
      <div className="w-[50%] h-[80%] bg-[#0E8388] rounded-xl shadow-black shadow-2xl flex flex-col items-center overflow-hidden">
        <section className="w-[100%] h-[10%] flex border-b border-b-[#2C3333]">
          <TabsScrollBar
            setCurrentListIndex={setCurrentListIndex}
            lists={lists}
            setLists={setLists}
            firstTabIndex={firstTabIndex}
            lastTabIndex={lastTabIndex}
            setFirstTabIndex={setFirstTabIndex}
            setLastTabIndex={setLastTabIndex}
            tabsIndex={tabsIndex}
            setTabsIndex={setTabsIndex}
          />
        </section>

        <section className="w-[100%] h-[90%] flex justify-center items-center flex-col">
          {currentListIndex != null ? (
            <ListShow
              setLists={setLists}
              currentListIndex={currentListIndex}
              setCurrentListIndex={setCurrentListIndex}
              setFirstTabIndex={setFirstTabIndex}
              setLastTabIndex={setLastTabIndex}
              lists={lists}
            />
          ) : (
            <div className="text-white text-2xl w-[100%] h-[100%]">
              <AddList
                setCurrentListIndex={setCurrentListIndex}
                setFirstTabIndex={setFirstTabIndex}
                setLastTabIndex={setLastTabIndex}
                lists={lists}
                setTabsIndex={setTabsIndex}
                setLists={setLists}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
