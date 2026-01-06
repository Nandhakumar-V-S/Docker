/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect, useContext } from "react";
//? Assets
import Offcanvas from "react-bootstrap/Offcanvas";
import WijmoPagination from "@/components/PlanComp/Wijmo/WijmoPagination";
import { useDispatch, useSelector } from "react-redux";
import { format, parse, isValid } from "date-fns";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
//? Components
//import { GetResourcePlan } from "@/redux/Home/PlanProgress/GetResourcePlan";
import ArcDataNotFound from "@/components/arccomponents/ui-components/nodatafound/no-data-found";

import ListPageTableLoading from "@/modules/loading-skeleton/listpage-table-loading";

import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate,
} from "@grapecity/wijmo.react.grid";
import "@grapecity/wijmo.styles/wijmo.css";
import { resetAll } from "@/redux/TaskInfo/actions";

//? CSS

//? Images

//? JSON File

//? Icons
import { MdOutlineCancel } from "react-icons/md";
import TaskInfo from "@/pages/TaskInfo";
import TaskInfoApi from "@/request/API/TaskInfoApi";
import Add from "@/components/AddButton/Add";
import { masterDataInfo as masterDataInfoTask } from "@/redux/Task/selector";
import AddTask from "@/modules/TaskModule/components/Addtask/Addtask";
import { SelectedRowContext } from "@/context/SelectedRow/SelectedRowContext";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { getMasterDataSuccess } from "@/redux/Task/actions";
import { request } from "@/request/API/globalrequest";

// *******~ Import ~******** //

export default function ProjectTaskList({
  ArcOffCanvaShow,
  setArcOffCanvaShow,
  SelectedProject,
  setSelectedProject,
  executeCall,
  setExecuteCall,
  transId,
}) {
  const dispatch = useDispatch();
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  //   const [ArcOffCanvaShow, setArcOffCanvaShow] = useState(false);
  // const handleArcOffCanvaClose = () => setArcOffCanvaShow(false);
  const handleArcOffCanvaClose = async () => {
    await dispatch(resetAll());
    await setExecuteCall(false);
    await setArcOffCanvaShow(false);
  };
  const handleArcOffCanva2Show = () => setArcOffCanvaShow(true);
  const GetTaskReportState = useSelector(
    (state) => state.GetProjectTaskListState?.response
  );
  const GetTaskReportStateStatus = useSelector(
    (state) => state.GetProjectTaskListState?.status
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

  const masterDataTaskPage = useSelector(masterDataInfoTask);

  async function getlookupdetails() {
    const postData = {
      entityId: "26B84156-CC30-416E-99D5-B37409B4D0BD",
    };
    const response = await request.post(
      API_TEST_URL,
      "arcconfiguration/getlookupdatabyid",
      postData
    );
    dispatch(getMasterDataSuccess(response));
  }

  useEffect(() => {
    if (ArcOffCanvaShow && masterDataTaskPage.length === 0) {
      getlookupdetails();
    }
  }, [ArcOffCanvaShow]);

  console.log(transId);
  // const [TaskShow, setTaskShow] = useState(false);
  const { addTaskShow, setAddTaskShow } = useContext(SelectedRowContext);

  // const addTaskPopup = {
  //   formId: "8EC24FBD-FB89-427E-8529-63E5EC2612E6",
  //   endpoint: "/planexecution/insertplanexecbyid",
  //   btnName: "Add Task",
  //   headerName: "Add Task",
  //   show: TaskShow,
  //   setShow: setTaskShow,
  //   // entityId: entityId,
  //   instanceId: "",
  //   isFormattedValue: false,
  //   istag: false,
  //   TaskInfoPage: true,
  //   masterDataPopup: masterDataTaskPage

  //   // setLoading: setLoader
  // };
  console.log(SelectedProject);

  const ProjectPageDetails = {
    page: "Project",
    columnValue: SelectedProject?.column17,
    columnID: SelectedProject.id,
    disabled: true,
  };

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
        enforceFocus={false}
      >
        <Offcanvas.Body>
          <div className="off-canva-body-content">
            <div className="off-canva-header">
              <h3>{SelectedProject?.column17} - Task Details </h3>
              <div className="addtaskbtn-with-cancel">
                {/* <Add popupDatas={addTaskPopup} /> */}
                <AddTask
                  // setArcFilterPopupshow={setArcFilterPopupshow}
                  show={addTaskShow}
                  setShow={setAddTaskShow}
                  taskInfoPage={true}
                  masterDataforPopup={masterDataTaskPage}
                  ProjectPageDetails={ProjectPageDetails}

                  // setTitleFieldValue={setTitleFieldValue}
                  // titleFieldValue={titleFieldValue}
                />

                <ArcToolTip
                  className={"close-btn"}
                  HoverText="Close"
                  BtnName={<MdOutlineCancel />}
                  Placement="left"
                  onClick={handleArcOffCanvaClose}
                  as="span"
                />
              </div>
            </div>
            <div className="off-canva-main">
              {executeCall ? <TaskInfoApi transId={transId} /> : <></>}
              {/* <GridDataTableTodayTask GridData={GridData} LoadingState={LoadingState} /> */}
              {executeCall && <TaskInfo />}
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
    {
      header: "Task Status",
      binding: "column9",
      width: 110,
    },
    { header: "Project", binding: "utbl_Workitem_column41_text", width: 110 },
    {
      header: "Resource",
      binding: "column11",
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
          {GridData[0]?.column11} - { "Resource Summary Report"}
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
            binding={"utbl_Workitem_column16"}
            header="Task Name"
            minWidth={350}
            isReadOnly={true}
            fixed
          >
            <FlexGridCellTemplate
              on
              cellType="Cell"
              template={(ctx) => {
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
