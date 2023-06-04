import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function ContextData() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const [sizePerScreen, setSizePerScreen] = useState(); // sm: 1, md: 2 lg: 3

  useEffect(() => {
    if (windowWidth < 640) {
      setSizePerScreen(1);
    } else if (windowWidth < 1024) {
      setSizePerScreen(2);
    } else if (windowWidth < 1536) {
      setSizePerScreen(3);
    } else {
      setSizePerScreen(4);
    }
  }, [windowWidth, windowHeight]);

  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);
    return () => {
      window.removeEventListener("resize", setWindowDimensions);
    };
  }, []);

  return { sizePerScreen };
}
