// *******~ Import ~******** //
//? React
import React, { useContext } from "react";
//? Assets
import useLanguage from "@/locale/useLanguage";
import { ListPageLayout } from "@/layout";
import { Container, Row, Col } from "react-bootstrap";
//? Components
import Header360V2 from "./components/360headerv2";
import Details360V2 from "./components/360details";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

export default function Detail360PageModuleV2() {
  const {
    ScreenWidth,
    BreakpointXs,
    BreakpointSm,
    BreakpointMd,
    Breakpointlg,
    BreakpointXl,
    BreakpointXxl,
  } = useContext(ContextWidthProvider);
  //   const translate = useLanguage();
  console.log("Inside 360page V2 Module");
  return (
    <ListPageLayout>
      <main className="page-360-v2">
        <Header360V2 />
        <Details360V2 />
      </main>
    </ListPageLayout>
  );
}
