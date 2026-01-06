// *******~ Import ~******** //
//? React
import { useState, useEffect, useContext } from "react";
//? Assets
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
//? CSS
import "./color-switch.scss";
//? Images

//? JSON File

//? Icons

import { MdOutlineDone } from "react-icons/md";
// *******~ Import ~******** //

const ColorSwitch = () => {
  const { themeColor, handleThemeChange } = useContext(
    ArcGlobalContextProvider
  );
  const themes = [
    "#2f5fc9",
    "#5e6ab8",
    "#0091ae",
    "#00a38d",
    "#425b76",
    "#dbae60",
    "#ff7a59",
  ];
  return (
    <>
      {themes.map((color, index) => (
        <button
          key={index}
          style={{ backgroundColor: color }}
          onClick={() => handleThemeChange(color)}
        >
          {themeColor === color && <MdOutlineDone />}
        </button>
      ))}
    </>
  );
};
export default ColorSwitch;
