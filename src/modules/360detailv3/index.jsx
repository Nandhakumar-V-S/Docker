// *******~ Import ~******** //
//? React
import React, { useContext } from "react";
//? Assets
import useLanguage from "@/locale/useLanguage";
import { ListPageLayout } from "@/layout";
import { Container, Row, Col } from "react-bootstrap";
//? Components
import Header360V3 from "@/modules/360detailv3/components/360headerv3";
import Details360V3 from "@/modules/360detailv3/components/360detailsv3";
// import Details360V2 from "./components/360details";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

export default function Detail360PageModuleV3() {
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
  console.log("Inside 360page V3 Module");
  return (
    <ListPageLayout>
      <main className="page-360-v3">
        <Header360V3 />
        <Details360V3 />
      </main>
    </ListPageLayout>
  );
}
