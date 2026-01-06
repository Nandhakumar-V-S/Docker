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
  GridData,
  LoadingState,
  selectedResource,
  isProgress,
}) => {
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
    }
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
