/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect } from "react";
//? Assets
import Offcanvas from "react-bootstrap/Offcanvas";
import WijmoPagination from "@/components/PlanComp/Wijmo/WijmoPagination";
import { useDispatch, useSelector } from "react-redux";
import { format, parse, isValid } from "date-fns";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
//? Components
import { GetResourcePlan } from "@/redux/Home/PlanProgress/GetResourcePlan";
import ArcDataNotFound from "@/components/arccomponents/ui-components/nodatafound/no-data-found";

import ListPageTableLoading from "@/modules/loading-skeleton/listpage-table-loading";

import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate,
} from "@grapecity/wijmo.react.grid";
import "@grapecity/wijmo.styles/wijmo.css";

//? CSS

//? Images

//? JSON File

//? Icons
import { MdOutlineCancel } from "react-icons/md";

// *******~ Import ~******** //

export default function ResourcePlanPopup({
  ArcOffCanvaShow,
  setArcOffCanvaShow,
  selectedResource,
  selectedYear,
  selectedWeek,
  isProgress,
  startDate,
}) {
  const dispatch = useDispatch();
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  //   const [ArcOffCanvaShow, setArcOffCanvaShow] = useState(false);
  const handleArcOffCanvaClose = () => setArcOffCanvaShow(false);
  const handleArcOffCanva2Show = () => setArcOffCanvaShow(true);
  const GetResourcePlanState = useSelector(
    (state) => state.GetResourcePlanState?.response
  );
  const GetResourcePlanStateStatus = useSelector(
    (state) => state.GetResourcePlanState?.status
  );

  const [LoadingState, setLoadingState] = useState(false);
  const [GridData, setGridData] = useState([]);
  useEffect(() => {
    let timer;

    if (GetResourcePlanStateStatus === "loading...") {
      setLoadingState(true);
    } else {
      timer = setTimeout(() => {
        setLoadingState(false);
      }, 500); // 1 second delay
    }

    // Clear the timeout if the component is unmounted or if dependencies change
    return () => clearTimeout(timer);
  }, [GetResourcePlanStateStatus]);

  useEffect(() => {
    setGridData(GetResourcePlanState?.result?.data);
  }, [GetResourcePlanState]);

  //   const GridData = GetResourcePlanState?.result?.data;
  console.log(GridData);
  return (
    <>
      {/* <button className="" onClick={handleArcOffCanva2Show}>
        {Icon && <span>{Icon}</span>} {BtnText}
      </button> */}

      <Offcanvas
        show={ArcOffCanvaShow}
        onHide={handleArcOffCanvaClose}
        className={`arc-off-canva-default resourceplan-canva`}
        placement={"end"}
        backdrop="static"
      >
        <Offcanvas.Body>
          <div className="off-canva-body-content">
            <div className="off-canva-header">
              <h3>
                {/* {selectedResource.name} -{" "} */}
                Plan Details -{" "}
                {isProgress ? (
                  <>
                    <span>{format(startDate, "MM/dd/yyyy")}</span>
                  </>
                ) : (
                  <>
                    {" "}
                    <span>{`W${selectedWeek}-${selectedYear}`}</span>
                  </>
                )}
              </h3>
              {/* <span className="close-btn" onClick={handleArcOffCanvaClose}>
                <MdOutlineCancel />
              </span> */}
              <ArcToolTip
                className={"close-btn"}
                HoverText="Close"
                BtnName={<MdOutlineCancel />}
                Placement="left"
                onClick={handleArcOffCanvaClose}
                as="span"
              />
            </div>
            <div className="off-canva-main">
              {/* <pre>{JSON.stringify(GetResourcePlanState, null, 2)}</pre> */}
              <GridDataTableTodayTask
                GridData={GridData}
                LoadingState={LoadingState}
                selectedResource={selectedResource}
                isProgress={isProgress}
              />
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export const GridDataTableTodayTask = ({
  LoadingState,
  selectedResource,
  isProgress,
}) => {
  const GridData = [
    {
      id: "03abf104-78d0-4c16-84b6-22f93fdbfa73",
      utbl_Assignment_column17: "80",
      utbl_Workitem_column16: "Tag Cloud - Wireframe / DB Design",
      utbl_Workitem_column18: "40",
      utbl_Workitem_column17: "",
      utbl_Assignment_column3: "30",
      utbl_Workitem_column30: "6/20/2024 12:00:00 AM",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Complete",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "S4",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "A",
      utbl_Workitem_column9: "In Progress",
      workday: "D5                             ",
      workweek: "W25                            ",
      spendhours: "30m",
      spendhourminutes: "30",
      "#ofSubTask": "0",
    },
    {
      id: "2df8e15d-5bf9-43ac-85a6-067755c2e31f",
      utbl_Assignment_column17: "90",
      utbl_Workitem_column16: "Tag Cloud - Wireframe / DB Design",
      utbl_Workitem_column18: "40",
      utbl_Workitem_column17: "",
      utbl_Assignment_column3: "60",
      utbl_Workitem_column30: "6/20/2024 12:00:00 AM",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Complete",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "S2",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "A",
      utbl_Workitem_column9: "In Progress",
      workday: "D4                             ",
      workweek: "W25                            ",
      spendhours: "1h",
      spendhourminutes: "60",
      "#ofSubTask": "0",
    },
    {
      id: "3e84ce35-4bac-4534-8ff5-f8ff560f938d",
      utbl_Assignment_column17: "50",
      utbl_Workitem_column16: "Demosnack Integration - Approach",
      utbl_Workitem_column18: "",
      utbl_Workitem_column17: "Demosnack Integration - Approach",
      utbl_Assignment_column3: "30",
      utbl_Workitem_column30: "",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "In Progress",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "S3",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "A",
      utbl_Workitem_column9: "In Progress",
      workday: "D5                             ",
      workweek: "W25                            ",
      spendhours: "30m",
      spendhourminutes: "30",
      "#ofSubTask": "0",
    },
    {
      id: "09830689-59b1-4e9b-b302-927cba5867e0",
      utbl_Assignment_column17: "50",
      utbl_Workitem_column16: "Server A&B - Cleanup",
      utbl_Workitem_column18: "50",
      utbl_Workitem_column17: "",
      utbl_Assignment_column3: "30",
      utbl_Workitem_column30: "6/28/2024 12:00:00 AM",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Complete",
      utbl_Workitem_column3_text: "Cleanup",
      utbl_Assignment_column4_text: "S5",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "B",
      utbl_Workitem_column9: "In Progress",
      workday: "D4                             ",
      workweek: "W25                            ",
      spendhours: "30m",
      spendhourminutes: "30",
      "#ofSubTask": "0",
    },
    {
      id: "237bcd04-c5f2-4e48-83d5-6b3d3e391b59",
      utbl_Assignment_column17: "30",
      utbl_Workitem_column16:
        "Softrack - Contact Us form issue - TCP 1.2 protocol issue",
      utbl_Workitem_column18: "10",
      utbl_Workitem_column17: "",
      utbl_Assignment_column3: "10",
      utbl_Workitem_column30: "6/21/2024 12:00:00 AM",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "In Progress",
      utbl_Workitem_column3_text: "Execution",
      utbl_Assignment_column4_text: "S6",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "B",
      utbl_Workitem_column9: "In Progress",
      workday: "D4                             ",
      workweek: "W25                            ",
      spendhours: "10m",
      spendhourminutes: "10",
      "#ofSubTask": "0",
    },
    {
      id: "d0c2e9a2-1295-43f3-950d-08c074b52841",
      utbl_Assignment_column17: "60",
      utbl_Workitem_column16: "UX API / UX Embed / UX Integration",
      utbl_Workitem_column18: "60",
      utbl_Workitem_column17: "",
      utbl_Assignment_column3: "15",
      utbl_Workitem_column30: "6/21/2024 12:00:00 AM",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "In Progress",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "S4",
      utbl_Workitem_column41_text: "Platform Design",
      utbl_Workitem_column6_text: "B",
      utbl_Workitem_column9: "In Progress",
      workday: "D5                             ",
      workweek: "W25                            ",
      spendhours: "15m",
      spendhourminutes: "15",
      "#ofSubTask": "0",
    },
    {
      id: "2c3233ae-3c10-489c-bd79-2cc2d028663d",
      utbl_Assignment_column17: "50",
      utbl_Workitem_column16: "UX API / UX Embed / UX Integration",
      utbl_Workitem_column18: "60",
      utbl_Workitem_column17: "",
      utbl_Assignment_column3: "30",
      utbl_Workitem_column30: "6/21/2024 12:00:00 AM",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "In Progress",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "S3",
      utbl_Workitem_column41_text: "Platform Design",
      utbl_Workitem_column6_text: "B",
      utbl_Workitem_column9: "In Progress",
      workday: "D4                             ",
      workweek: "W25                            ",
      spendhours: "30m",
      spendhourminutes: "30",
      "#ofSubTask": "0",
    },
    {
      id: "66a307a6-d68e-48ab-81a9-29865f7728ce",
      utbl_Assignment_column17: "60",
      utbl_Workitem_column16: "Payment for eCom + ArcPay Library Review",
      utbl_Workitem_column18: "",
      utbl_Workitem_column17: "",
      utbl_Assignment_column3: "30",
      utbl_Workitem_column30: "6/19/2024 12:00:00 AM",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Ravishankar",
      utbl_Assignment_column2_text: "Complete",
      utbl_Workitem_column3_text: "Task",
      utbl_Assignment_column4_text: "S3",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "B",
      utbl_Workitem_column9: "Complete",
      workday: "D3                             ",
      workweek: "W25                            ",
      spendhours: "30m",
      spendhourminutes: "30",
      "#ofSubTask": "0",
    },
    {
      id: "3457b2ea-5adf-4391-b572-80d84a9b0359",
      utbl_Assignment_column17: "70",
      utbl_Workitem_column16: "Tag Cloud - Wireframe / DB Design",
      utbl_Workitem_column18: "40",
      utbl_Workitem_column17: "",
      utbl_Assignment_column3: "60",
      utbl_Workitem_column30: "6/20/2024 12:00:00 AM",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Complete",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "S3",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "A",
      utbl_Workitem_column9: "In Progress",
      workday: "D3                             ",
      workweek: "W25                            ",
      spendhours: "1h",
      spendhourminutes: "60",
      "#ofSubTask": "0",
    },
    {
      id: "cec0c9ea-9915-4bd5-b083-3ca4947a5eda",
      utbl_Assignment_column17: "60",
      utbl_Workitem_column16:
        "Softrack - Contact Us form issue - TCP 1.2 protocol issue",
      utbl_Workitem_column18: "10",
      utbl_Workitem_column17: "",
      utbl_Assignment_column3: "30",
      utbl_Workitem_column30: "6/21/2024 12:00:00 AM",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "In Progress",
      utbl_Workitem_column3_text: "Execution",
      utbl_Assignment_column4_text: "S7",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "B",
      utbl_Workitem_column9: "In Progress",
      workday: "D2                             ",
      workweek: "W25                            ",
      spendhours: "30m",
      spendhourminutes: "30",
      "#ofSubTask": "0",
    },
    {
      id: "a860b130-8faa-454e-9132-564d4d67cb97",
      utbl_Assignment_column17: "",
      utbl_Workitem_column16: "P500 - Developer Document by Activity",
      utbl_Workitem_column18: "",
      utbl_Workitem_column17: "P500 - Developer Document by Activity",
      utbl_Assignment_column3: "0",
      utbl_Workitem_column30: "",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Yet to start",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "S4",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "B",
      utbl_Workitem_column9: "In Progress",
      workday: "D4                             ",
      workweek: "W25                            ",
      spendhours: "-",
      spendhourminutes: "",
      "#ofSubTask": "0",
    },
    {
      id: "84a935a9-6a9e-46db-9ca7-53cbe7fa4490",
      utbl_Assignment_column17: "",
      utbl_Workitem_column16: "P500 - Developer Document by Activity",
      utbl_Workitem_column18: "",
      utbl_Workitem_column17: "P500 - Developer Document by Activity",
      utbl_Assignment_column3: "0",
      utbl_Workitem_column30: "",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "In Progress",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "S3",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "B",
      utbl_Workitem_column9: "In Progress",
      workday: "D3                             ",
      workweek: "W25                            ",
      spendhours: "-",
      spendhourminutes: "",
      "#ofSubTask": "0",
    },
    {
      id: "bf1ed144-1c99-4f81-bcd3-ae6cd78d9f6b",
      utbl_Assignment_column17: "",
      utbl_Workitem_column16: "Protect Our IP",
      utbl_Workitem_column18: "",
      utbl_Workitem_column17: "Protect Our IP",
      utbl_Assignment_column3: "0",
      utbl_Workitem_column30: "",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Yet to start",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "S5",
      utbl_Workitem_column41_text: "Platform Design",
      utbl_Workitem_column6_text: "A",
      utbl_Workitem_column9: "In Progress",
      workday: "D4                             ",
      workweek: "W25                            ",
      spendhours: "-",
      spendhourminutes: "",
      "#ofSubTask": "0",
    },
    {
      id: "2b5cf143-f9af-41fe-8632-8011332dab4b",
      utbl_Assignment_column17: "",
      utbl_Workitem_column16: "Protect Our IP",
      utbl_Workitem_column18: "",
      utbl_Workitem_column17: "Protect Our IP",
      utbl_Assignment_column3: "0",
      utbl_Workitem_column30: "",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Complete",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "S4",
      utbl_Workitem_column41_text: "Platform Design",
      utbl_Workitem_column6_text: "A",
      utbl_Workitem_column9: "In Progress",
      workday: "D3                             ",
      workweek: "W25                            ",
      spendhours: "-",
      spendhourminutes: "",
      "#ofSubTask": "0",
    },
    {
      id: "c9944028-fe24-483d-aca2-ced07962515e",
      utbl_Assignment_column17: "",
      utbl_Workitem_column16: "Numering System - By Dept",
      utbl_Workitem_column18: "10",
      utbl_Workitem_column17: "Numering System - By Dept",
      utbl_Assignment_column3: "0",
      utbl_Workitem_column30: "",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Yet to start",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "C",
      utbl_Workitem_column9: "Backlog",
      workday: "D5                             ",
      workweek: "W25                            ",
      spendhours: "-",
      spendhourminutes: "",
      "#ofSubTask": "0",
    },
    {
      id: "3438bffc-d18c-4b2e-82d3-b01a55d14518",
      utbl_Assignment_column17: "70",
      utbl_Workitem_column16: "Allocation - Design",
      utbl_Workitem_column18: "",
      utbl_Workitem_column17: "Allocation - Design",
      utbl_Assignment_column3: "30",
      utbl_Workitem_column30: "",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Complete",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "S2",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "A",
      utbl_Workitem_column9: "In Progress",
      workday: "D4                             ",
      workweek: "W25                            ",
      spendhours: "30m",
      spendhourminutes: "30",
      "#ofSubTask": "2",
    },
    {
      id: "1554d776-e0df-4506-a1c9-6522ab3d261a",
      utbl_Assignment_column17: "50",
      utbl_Workitem_column16: "Allocation - Design",
      utbl_Workitem_column18: "",
      utbl_Workitem_column17: "Allocation - Design",
      utbl_Assignment_column3: "45",
      utbl_Workitem_column30: "",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Complete",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "S2",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "A",
      utbl_Workitem_column9: "In Progress",
      workday: "D3                             ",
      workweek: "W25                            ",
      spendhours: "45m",
      spendhourminutes: "45",
      "#ofSubTask": "2",
    },
    {
      id: "ddb4c3c7-b386-4a63-9611-55a264c532c0",
      utbl_Assignment_column17: "",
      utbl_Workitem_column16: "Redhat - Explore Techs",
      utbl_Workitem_column18: "",
      utbl_Workitem_column17: "Redhat - Explore Techs",
      utbl_Assignment_column3: "0",
      utbl_Workitem_column30: "",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Yet to start",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "C",
      utbl_Workitem_column9: "In Progress",
      workday: "D5                             ",
      workweek: "W25                            ",
      spendhours: "-",
      spendhourminutes: "",
      "#ofSubTask": "0",
    },
    {
      id: "8223f613-10e7-4700-bd05-232b5bf5d7b6",
      utbl_Assignment_column17: "60",
      utbl_Workitem_column16:
        "Data sync - (ArcProducts / With Our BU Products / With 3rd Party)",
      utbl_Workitem_column18: "",
      utbl_Workitem_column17:
        "Data sync - (ArcProducts / With Our BU Products / With 3rd Party)",
      utbl_Assignment_column3: "30",
      utbl_Workitem_column30: "",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "In Progress",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "S2",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "A",
      utbl_Workitem_column9: "In Progress",
      workday: "D5                             ",
      workweek: "W25                            ",
      spendhours: "30m",
      spendhourminutes: "30",
      "#ofSubTask": "0",
    },
    {
      id: "46234e0f-a266-4488-bf38-f2ccb13673b5",
      utbl_Assignment_column17: "60",
      utbl_Workitem_column16:
        "Data sync - (ArcProducts / With Our BU Products / With 3rd Party)",
      utbl_Workitem_column18: "",
      utbl_Workitem_column17:
        "Data sync - (ArcProducts / With Our BU Products / With 3rd Party)",
      utbl_Assignment_column3: "60",
      utbl_Workitem_column30: "",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Complete",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "S2",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "A",
      utbl_Workitem_column9: "In Progress",
      workday: "D4                             ",
      workweek: "W25                            ",
      spendhours: "1h",
      spendhourminutes: "60",
      "#ofSubTask": "0",
    },
    {
      id: "e17ea074-b329-4759-8778-de4af47af3f8",
      utbl_Assignment_column17: "",
      utbl_Workitem_column16:
        "Data sync - (ArcProducts / With Our BU Products / With 3rd Party)",
      utbl_Workitem_column18: "",
      utbl_Workitem_column17:
        "Data sync - (ArcProducts / With Our BU Products / With 3rd Party)",
      utbl_Assignment_column3: "0",
      utbl_Workitem_column30: "",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Yet to start",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "S5",
      utbl_Workitem_column41_text: "DevAdhoc",
      utbl_Workitem_column6_text: "A",
      utbl_Workitem_column9: "In Progress",
      workday: "D3                             ",
      workweek: "W25                            ",
      spendhours: "-",
      spendhourminutes: "",
      "#ofSubTask": "0",
    },
    {
      id: "80b024a5-f451-428d-ad75-04019fcaddd5",
      utbl_Assignment_column17: "",
      utbl_Workitem_column16: "Architecture Diagram",
      utbl_Workitem_column18: "",
      utbl_Workitem_column17: "Architecture Diagram",
      utbl_Assignment_column3: "0",
      utbl_Workitem_column30: "",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Yet to start",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "",
      utbl_Workitem_column41_text: "Platform Design",
      utbl_Workitem_column6_text: "C",
      utbl_Workitem_column9: "In Progress",
      workday: "D5                             ",
      workweek: "W25                            ",
      spendhours: "-",
      spendhourminutes: "",
      "#ofSubTask": "0",
    },
    {
      id: "f0cc9ecc-2b2c-4c9d-a2a8-572483806107",
      utbl_Assignment_column17: "",
      utbl_Workitem_column16:
        "Various Components - In Platform / Inmemory / DB / Microsoft free",
      utbl_Workitem_column18: "",
      utbl_Workitem_column17:
        "Various Components - In Platform / Inmemory / DB / Microsoft free",
      utbl_Assignment_column3: "0",
      utbl_Workitem_column30: "",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Yet to start",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "",
      utbl_Workitem_column41_text: "Platform Design",
      utbl_Workitem_column6_text: "C",
      utbl_Workitem_column9: "In Progress",
      workday: "D5                             ",
      workweek: "W25                            ",
      spendhours: "-",
      spendhourminutes: "",
      "#ofSubTask": "0",
    },
    {
      id: "d1932d22-6fe9-4e1c-86e2-0b98768e0d9c",
      utbl_Assignment_column17: "",
      utbl_Workitem_column16:
        "Memory Map - On Login / Session value - IP, Screen valuse, Master data, Filter persistance",
      utbl_Workitem_column18: "",
      utbl_Workitem_column17:
        "Memory Map - On Login / Session value - IP, Screen valuse, Master data, Filter persistance",
      utbl_Assignment_column3: "0",
      utbl_Workitem_column30: "",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Yet to start",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "",
      utbl_Workitem_column41_text: "Platform Design",
      utbl_Workitem_column6_text: "C",
      utbl_Workitem_column9: "In Progress",
      workday: "D5                             ",
      workweek: "W25                            ",
      spendhours: "-",
      spendhourminutes: "",
      "#ofSubTask": "0",
    },
    {
      id: "eab91dc8-19d0-4835-9733-1301d8ea09f1",
      utbl_Assignment_column17: "",
      utbl_Workitem_column16:
        "Memory Map - On Login / Session value - IP, Screen valuse, Master data, Filter persistance",
      utbl_Workitem_column18: "",
      utbl_Workitem_column17:
        "Memory Map - On Login / Session value - IP, Screen valuse, Master data, Filter persistance",
      utbl_Assignment_column3: "0",
      utbl_Workitem_column30: "",
      utbl_Assignment_column1_text: "Gopinath",
      utbl_Workitem_column10_text: "Gopinath",
      utbl_Assignment_column2_text: "Yet to start",
      utbl_Workitem_column3_text: "Design",
      utbl_Assignment_column4_text: "S5",
      utbl_Workitem_column41_text: "Platform Design",
      utbl_Workitem_column6_text: "C",
      utbl_Workitem_column9: "In Progress",
      workday: "D4                             ",
      workweek: "W25                            ",
      spendhours: "-",
      spendhourminutes: "",
      "#ofSubTask": "0",
    },
  ];
  // ! Actions
  const GetResourcePlanStateStatus = useSelector(
    (state) => state.GetResourcePlanState?.status
  );

  useEffect(() => {
    removeWijimoLicense();
  }, []);

  function removeWijimoLicense() {
    const removeEvaluationText = () => {
      const bodyElements = document.body.children;
      for (let i = bodyElements.length - 1; i >= 0; i--) {
        const body = bodyElements[i];
        if (
          body.innerText.includes("Wijmo Evaluation") ||
          body.innerText.includes("Wijmo license")
        ) {
          body.remove();
        }
      }
    };
    removeEvaluationText();
  }
  const GridBinding = [
    // { header: "title", binding: "utbl_Workitem_column16", width: "200" },
    { header: "Project", binding: "utbl_Workitem_column41_text", width: 110 },
    { header: "Priority", binding: "utbl_Workitem_column6_text", width: 110 },
    {
      header: "Resource",
      binding: "utbl_Assignment_column1_text",
      width: 110,
    },
    { header: "Spent Hour", binding: "spendhours", width: 110 },
    {
      header: "Session",
      binding: "utbl_Assignment_column4_text",
      width: 110,
    },

    {
      header: "Plan status",
      binding: "utbl_Assignment_column2_text",
      width: 110,
    },
    { header: "Task Status", binding: "utbl_Workitem_column9", width: 110 },
    {
      header: "Task Progress %",
      binding: "utbl_Workitem_column18",
      width: 170,
    },
    { header: "Plan Day", binding: "workday", width: 110 },
    { header: "Plan Week", binding: "workweek", width: 110 },
    { header: "Due Date", binding: "utbl_Workitem_column30", width: 110 },
    // { header: "Status", binding: "utbl_Workitem_column9", width: 150 },

    { header: "Chunk", binding: "utbl_Workitem_column3_text", width: 110 },
    {
      header: "Daily Progress % ",
      binding: "utbl_Assignment_column17",
      width: 170,
    },
  ];
  console.log(GridData);
  return (
    <React.Fragment>
      <div className="title">
        <p>
          {selectedResource.name} - {isProgress ? "Progress" : "Plan vs Actual"}{" "}
        </p>
      </div>
      {GridData?.length === 0 && GetResourcePlanStateStatus !== "loading..." ? (
        <ArcDataNotFound Title={"Data not found"} />
      ) : null}
      {LoadingState ? (
        <ListPageTableLoading />
      ) : (
        <FlexGrid
          autoRowHeights={true}
          deferResizing={true}
          frozenColumns={1}
          itemsSource={GridData}
          allowSorting={true}
          className="list-data-table with-360-page"
          headersVisibility="Column"
          selectionMode="None"
        >
          <FlexGridColumn
            allowDragging={false}
            allowResizing={true}
            allowSorting={true}
            binding="title"
            header="Task Name"
            minWidth={350}
            isReadOnly={true}
            fixed
          >
            <FlexGridCellTemplate
              on
              cellType="Cell"
              template={(ctx) => {
                const fullName = ctx.item.utbl_Workitem_column16;
                const RowData = ctx.item;
                const TransactionID = ctx.item.id;
                const words = fullName && fullName.split(" ");
                const startWithLetter = words ? words[0].charAt(0) : "";
                const endWithLetter =
                  words && words.length > 1
                    ? words[words.length - 1].charAt(0)
                    : "";
                return (
                  <>
                    <div className="name-td new-name-td without-link">
                      <a style={{ textDecoration: "none" }}>
                        <div className="name-detail">
                          <span>
                            {startWithLetter}
                            {endWithLetter}
                          </span>
                          <p title={fullName}>{fullName}</p>
                        </div>
                      </a>
                    </div>
                  </>
                );
              }}
            />
          </FlexGridColumn>

          {GridBinding.map((data, index) => (
            <FlexGridColumn
              key={index}
              binding={data.binding}
              header={data.header}
              minWidth={data.width}
              width={data.width}
              allowResizing={true}
              allowSorting={true}
              fixed
              isReadOnly={true}
            >
              <FlexGridCellTemplate
                on
                cellType="Cell"
                template={(ctx) => {
                  const GridValue = ctx.item.utbl_Workitem_column30;
                  const Value = ctx?.item[data.binding];
                  console.log(Value);
                  // Regex to check if GridValue is in the format of "M/d/yyyy h:mm:ss a"
                  const datePattern =
                    /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2}:\d{2} (AM|PM)$/;

                  let formattedDate = GridValue;

                  if (datePattern.test(GridValue)) {
                    const parsedDate = parse(
                      GridValue,
                      "M/d/yyyy h:mm:ss a",
                      new Date()
                    );
                    if (isValid(parsedDate)) {
                      formattedDate = format(parsedDate, "MM/dd/yyyy");
                    }
                  }

                  return (
                    <>
                      {data.binding === "utbl_Workitem_column30"
                        ? formattedDate
                        : data.header === "Progress Percentage"
                          ? ["", "-"].includes(Value)
                            ? "0%"
                            : Value + "%"
                          : Value || "-"}
                    </>
                  );
                }}
              />
            </FlexGridColumn>
          ))}
        </FlexGrid>
      )}
    </React.Fragment>
  );
};
