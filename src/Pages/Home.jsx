import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddList from "../Components/AddList";
import ListShow from "../Components/ListShow";
import TabsScrollBar from "../Components/TabsScrollBar";
import axios from "axios";
import useAuthContext from "../context/useAuthContext";

export default function Home() {
  const navigate = useNavigate();

  const { token } = useAuthContext();
  const [lists, setLists] = useState([]);

  const [currentListIndex, setCurrentListIndex] = useState();

  const [tabsIndex, setTabsIndex] = useState();
  const [firstTabIndex, setFirstTabIndex] = useState(null);
  const [lastTabIndex, setLastTabIndex] = useState(null);
  const [showAddTask, setShowAddTask] = useState(null);

  useEffect(() => {
    getLists();
  }, []);

  const getLists = () => {
    axios
      .get("/api/list/get-all-list", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // add isOpen field for each task
        const tempLists = res.data.map((list) => {
          const test = sortTasks(
            list.tasks.map((task) => {
              return { ...task, isOpen: false };
            })
          );
          console.log(test);
          return {
            ...list,
            tasks: test,
          };
        });

        setLists(tempLists);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = async () => {
    axios
      .post("/api/user/logout")
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        navigate("/");
      });
  };

  const addTaskWindowRef = useRef();

  const closeAddTask = (event) => {
    if (
      addTaskWindowRef.current &&
      !addTaskWindowRef.current.contains(event.target)
    ) {
      setShowAddTask(false);
    }
  };

  const sortTasks = (tasks) => {
    const tempTasks = [...tasks];
    for (let i = 0; i < tasks.length; i++) {
      for (let j = 0; j < tasks.length; j++) {
        if (tempTasks[i].render_number < tempTasks[j].render_number && i != j) {
          const tempTask = tempTasks[i];
          tempTasks[i] = tempTasks[j];
          tempTasks[j] = tempTask;
        }
      }
    }
    return tempTasks;
  };

  return (
    <div
      onClick={(e) => closeAddTask(e)}
      className="w-[100%] h-[100%] bg-[#274f4f] flex justify-around items-center flex-col font-extralight"
    >
      <div
        style={{ zIndex: -1 }}
        className={`w-[100%] h-[100%] absolute ${
          showAddTask
            ? "animate-toDarkScreen"
            : showAddTask != null
            ? "animate-toTransparentScreen"
            : ""
        }`}
      ></div>

      <button
        onClick={logout}
        className=" max-h-[10%] aspect-square self-start mx-5 text-white"
      >
        <svg
          width={"100%"}
          height={"100%"}
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
          ></path>
        </svg>
      </button>

      <main className="h-[90%] w-[100%] flex justify-center items-center">
        <div className="lg:w-[50%] w-[85%] h-[80%] bg-[#0E8388] rounded-xl shadow-black shadow-2xl flex flex-col items-center overflow-hidden">
          <section className="w-[100%] lg:h-[10%] h-[15%] flex border-b border-b-[#2C3333]">
            <TabsScrollBar
              currentListIndex={currentListIndex}
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
                showAddTask={showAddTask}
                setShowAddTask={setShowAddTask}
                addTaskWindowRef={addTaskWindowRef}
              />
            ) : (
              <div className="text-white text-2xl w-[100%] h-[100%] ">
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
      </main>
    </div>
  );
}
