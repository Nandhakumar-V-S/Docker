// *******~ Import ~******** //
//? React
import React, { createContext, useContext, useState, useEffect } from "react";
//? Assets

//? Components

//? CSS

//? Images

//? JSON File

//? Icons
// *******~ Import ~******** //
export const ContextWidthProvider = createContext({});
// export const ContextWidthConsumer = () => useContext(ContextWidthProvider);
export const ResizeWidthContext = ({ children }) => {
  // const [inputValues, setInputValues] = useState({});
  // ! Resize Width
  const [ScreenWidth, setScreenWidth] = useState(window.innerWidth);
  const BreakpointXs = 575;
  const BreakpointSm = 767;
  const BreakpointMd = 991;
  const Breakpointlg = 1199;
  const BreakpointXl = 1199;
  const BreakpointXxl = 1399;
  useEffect(() => {
    const handleResizeWindow = () => setScreenWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  // ! Resize Width

  return (
    <ContextWidthProvider.Provider
      value={{
        ScreenWidth,
        BreakpointXs,
        BreakpointSm,
        BreakpointMd,
        Breakpointlg,
        BreakpointXl,
        BreakpointXxl,
      }}
    >
      {children}
    </ContextWidthProvider.Provider>
  );
};
