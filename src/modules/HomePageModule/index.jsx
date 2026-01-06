// *******~ Import ~******** //
//? React
import { useContext, useEffect } from "react";

//? Assets
import { useLocation } from "react-router-dom";
//? Components

import HomeHeader from "@/modules/HomePageModule/components/HomeHeader";
import WidgetSection from "@/modules/HomePageModule/components/WidgetSection";

import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

export default function HomePageModule() {
  const { previousPathName, setPreviousPathName } = useContext(
    ArcGlobalContextProvider
  );
  const {
    ScreenWidth,
    BreakpointXs,
    BreakpointSm,
    BreakpointMd,
    Breakpointlg,
    BreakpointXl,
    BreakpointXxl,
  } = useContext(ContextWidthProvider);
  let location = useLocation();
  const currentPathName = location.pathname;
  const UpdateNamePathName = "execution";

  // const endsWithSpecificString = (str) => currentPathName.endsWith(str);

  useEffect(() => {
    setPreviousPathName(currentPathName);
    sessionStorage.setItem("PreviousPath", currentPathName);
  }, [currentPathName]);
  console.log("Home Page Module");
  console.log("Path Name" + previousPathName);

  return (
    <>
      <main className="home-page-main">
        <HomeHeader />
        <WidgetSection />
      </main>
    </>
  );
}
