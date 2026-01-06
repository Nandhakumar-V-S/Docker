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

export default function TaskReportPopup({
  ArcOffCanvaShow,
  setArcOffCanvaShow,
  // selectedYear,
  // selectedWeek,
  //isProgress,
  // startDate,
}) {
  const dispatch = useDispatch();
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  //   const [ArcOffCanvaShow, setArcOffCanvaShow] = useState(false);
  const handleArcOffCanvaClose = () => setArcOffCanvaShow(false);
  const handleArcOffCanva2Show = () => setArcOffCanvaShow(true);
  const GetTaskReportState = useSelector(
    (state) => state.GetTaskReportState?.response
  );
  const GetTaskReportStateStatus = useSelector(
    (state) => state.GetTaskReportState?.status
  );

  const [LoadingState, setLoadingState] = useState(false);
  const [GridData, setGridData] = useState([]);
  useEffect(() => {
    let timer;

    if (GetTaskReportStateStatus === "loading...") {
      setLoadingState(true);
    } else {
      timer = setTimeout(() => {
        setLoadingState(false);
      }, 500); // 1 second delay
    }

    // Clear the timeout if the component is unmounted or if dependencies change
    return () => clearTimeout(timer);
  }, [GetTaskReportStateStatus]);

  useEffect(() => {
    setGridData(GetTaskReportState?.result?.data);
  }, [GetTaskReportState]);

  console.log(GridData);
  return (
    <>
      {/* <button className="" onClick={handleArcOffCanva2Show}>
        {Icon && <span>{Icon}</span>} {BtnText}
      </button> */}

      <Offcanvas
        show={ArcOffCanvaShow}
        onHide={handleArcOffCanvaClose}
        className={`arc-off-canva-default resourceplan-canva taskreport`}
        placement={"end"}
        backdrop="static"
      >
        <Offcanvas.Body>
          <div className="off-canva-body-content">
            <div className="off-canva-header">
              <h3>
                {/* {selectedResource.name} -{" "} */}
                Project Summary - Task Details{" "}
                {/* {isProgress ? (
                  <>
                    <span>{format(startDate, "MM/dd/yyyy")}</span>
                  </>
                ) : (
                  <>
                    {" "}
                    <span>{`W${selectedWeek}-${selectedYear}`}</span>
                  </>
                )} */}
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
              <GridDataTableTodayTask
                GridData={GridData}
                LoadingState={LoadingState}
                //selectedResource={selectedResource}
                // isProgress={isProgress}
              />
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export const GridDataTableTodayTask = ({
  GridData,
  LoadingState,
  // selectedResource,
  //isProgress,
}) => {
  // ! Actions
  const GetTaskReportStateStatus = useSelector(
    (state) => state.GetTaskReportState?.status
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
    //{ header: "Task Name", binding: "utbl_Workitem_column16", width: 200 },
    //{ header: "Task Name", binding: "utbl_Workitem_column16", width: 110 },
    { header: "Project", binding: "utbl_Workitem_column41_text", width: 110 },
    {
      header: "Task Status",
      binding: "utbl_Workitem_column9_text",
      width: 110,
    },
    {
      header: "Resource",
      binding: "utbl_Workitem_column11_text",
      width: 110,
    },
    {
      header: "Owner",
      binding: "utbl_Workitem_column10_text",
      width: 110,
    },
    { header: "Due Date", binding: "utbl_Workitem_column30", width: 110 },
  ];
  console.log(GridData);
  return (
    <React.Fragment>
      {/* <div className="title">
        <p>
          {GridData[0]?.column11} - { "Project Summary Report"}
        </p>
      </div> */}
      {GridData?.length === 0 && GetTaskReportStateStatus !== "loading..." ? (
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
            binding="utbl_Workitem_column16"
            header="Task Name"
            minWidth={350}
            isReadOnly={true}
            fixed
          >
            <FlexGridCellTemplate
              on
              cellType="Cell"
              template={(ctx) => {
                console.log(ctx);
                const fullName =
                  ctx.item.column16 || ctx.item.utbl_Workitem_column16;
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

                  // if (datePattern.test(GridValue)) {
                  //   const parsedDate = parse(
                  //     GridValue,
                  //     "M/d/yyyy h:mm:ss a",
                  //     new Date()
                  //   );
                  //   if (isValid(parsedDate)) {
                  //     formattedDate = format(parsedDate, "MM/dd/yyyy");
                  //   }
                  // }

                  if (datePattern.test(GridValue)) {
                    const parsedDate = parse(
                      GridValue,
                      "M/d/yyyy h:mm:ss a",
                      new Date()
                    );

                    if (isValid(parsedDate)) {
                      // formattedDate = format(parsedDate, "M/d/yyyy");//MM/dd/yyyy
                      const sampleformat = format(parsedDate, "MM/dd/yyyy"); //MM/dd/yyyy
                      formattedDate = sampleformat; //.split(' ')[0]
                    } else {
                      formattedDate = GridValue;
                    }
                  }

                  console.log(formattedDate, "formattedDate");
                  return (
                    <>
                      {data.binding === "utbl_Workitem_column30"
                        ? formattedDate == null || formattedDate == ""
                          ? "-"
                          : formattedDate
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
