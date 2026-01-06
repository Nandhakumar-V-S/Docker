/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
//? Assets
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { parseISO, format } from "date-fns";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import { get360EntityInfo } from "@/redux/360Details/Get360EntityInfo";
//? Components
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import WijmoPagination from "@/components/PlanComp/Wijmo/WijmoPagination";
import ArcDataNotFound from "@/components/arccomponents/ui-components/nodatafound/no-data-found";
import OfflineGrid_API from "./OfflineGrid_Api.json";
import ListPageTableLoading from "@/modules/loading-skeleton/listpage-table-loading";
import { fetchPlanSummery } from "@/redux/Home/PlanSummery/PlanSummery";
import ArcWidget from "@/components/arccomponents/widget-v2/arcwidget";
import { WidgetHeader } from "@/components/arccomponents/widget-v2/widgetHeader";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { GetDefaultFormValues } from "@/redux/Execution/UpdateStatus/GetDefaultValues";

import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate,
} from "@grapecity/wijmo.react.grid";
import "@grapecity/wijmo.styles/wijmo.css";
import UpdateSatus from "@/components/ExecutionComp/Wijmo/components/Update/UpdateStatus";
import UpdateSession from "@/components/ExecutionComp/Wijmo/components/Update/UpdateSession";
import SubTaskGrid from "@/components/ExecutionComp/Wijmo/components/Update/SubTaskGrid";
import AddFollowup from "@/components/ExecutionComp/Wijmo/components/Update/AddFollowup";
import ExtendPlan from "@/components/ExecutionComp/Wijmo/components/Update/extend";
import { GetSubTask } from "@/redux/Execution/addSubTask/GetSubTask";
import { resetAddStatus } from "@/redux/Execution/UpdateStatus/UpdateStatus";
import { resetSessionStatus } from "@/redux/Execution/UpdateStatus/UpdateSession";
import { resetStatus } from "@/redux/Execution/extendTask/AddExtendPlan";
import UpdateFollow from "@/components/FollowupComp/Wijmo/UpdateFollowup/Updatefollowup";
import { MdAddCall } from "react-icons/md";
import { changeEntityid } from "@/redux/Home/actions";
import { GetDefaultFormValues as GetDefaultFormValuesFollowup } from "@/redux/Followup/UpdateStatus/GetDefaultValues";
//? CSS

//? Images

//? JSON File

//? Icons
import { BiTask } from "react-icons/bi";
import { MdOutlineScreenShare } from "react-icons/md";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { HiOutlineDotsVertical } from "react-icons/hi";
// *******~ Import ~******** //

const GridWidget = ({ PlanSummeryKPIState, Title, divWidth }) => {
  const dispatch = useDispatch();
  const DefaultURL = "gettodaytask";
  const DefaultpageSize = "15";
  const DefaultcurrentPage = "1";
  const PlanSummeryState = useSelector(
    (state) => state.PlanSummeryState.response
  );
  const [LoadingState, setLoadingState] = useState(false);
  const GridData = PlanSummeryState?.result?.data;
  const PaginationResults = PlanSummeryState?.result;
  // const GridData = OfflineGrid_API?.result?.data;
  const [CurrentURL, setCurrentURL] = useState("gettodaytask");
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const paginationConfig = {
    pageSize,
    currentPage,
    totalLength: PaginationResults?.totalCount || 0,
  };
  useEffect(() => {
    if (PlanSummeryState?.length === 0) {
      // dispatch(
      //   fetchPlanSummery({
      //     URL: CurrentURL,
      //     DefaultpageSize: DefaultpageSize,
      //     DefaultcurrentPage: DefaultcurrentPage,
      //   })
      // );
    }
  }, [dispatch]);

  const handleFetch = (url) => {
    setCurrentURL(url);
    setPageSize(15);
    setCurrentPage(1);
    // dispatch(
    //   fetchPlanSummery({
    //     URL: url,
    //     DefaultpageSize: DefaultpageSize,
    //     DefaultcurrentPage: DefaultcurrentPage,
    //   })
    // );
  };

  useEffect(() => {
    // dispatch(
    //   fetchPlanSummery({
    //     URL: CurrentURL,
    //     DefaultpageSize: pageSize,
    //     DefaultcurrentPage: currentPage,
    //   })
    // );
  }, [currentPage, pageSize]);

  const [key, setKey] = useState("gettodaytask");
  const {
    todaytask: TodayTaskCount,
    followups: FollowupsCount,
    approvals: ApprovalsCount,
  } = PlanSummeryKPIState?.result || {};
  const PlanSummeryStateStatus = useSelector(
    (state) => state.PlanSummeryState.status
  );
  useEffect(() => {
    let timer;

    if (PlanSummeryStateStatus === "loading") {
      setLoadingState(true);
    } else {
      timer = setTimeout(() => {
        setLoadingState(false);
      }, 500); // 1 second delay
    }

    // Clear the timeout if the component is unmounted or if dependencies change
    return () => clearTimeout(timer);
  }, [PlanSummeryStateStatus]);
  // let LoadingState = PlanSummeryStateStatus === "loading";
  // console.log(PlanSummeryKPIState);

  const newentityid = (id) => {
    dispatch(changeEntityid(id));
  };
  const ConvertUtcToLocal = (utcDate) => {
    // Parse the ISO string to a Date object
    const parsedDate = parseISO(utcDate);

    // Format the date to the local time zone
    const formattedDate = format(parsedDate, "PPpp");

    return formattedDate;
  };
  const utcTime = "2023-06-17T12:00:00Z"; // Example UTC time string
  return (
    <React.Fragment>
      <ArcWidget className={`grid-widget div-${divWidth}`}>
        <div className="widget-header">
          <h4>
            {Title}
            {/* {ConvertUtcToLocal(utcTime)} */}
          </h4>
          <div className="actions" style={{ visibility: "hidden" }}>
            <button>Submit</button>
          </div>
        </div>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="inside-widget-tab"
          transition={false}
        >
          <Tab
            eventKey="gettodaytask"
            title={
              <>
                <span
                  className="title-span"
                  onClick={() => {
                    handleFetch(DefaultURL);
                    setCurrentURL(DefaultURL);
                    newentityid("F48EF545-9995-4F8F-857D-DDDA2BC063CC");
                  }}
                >
                  CALL
                  <span className="count">{"50"}</span>
                </span>
              </>
            }
          >
            <>
              <div className="table-div">
                {/* <PageComponent GridData={GridData} /> */}
                <GridDataTableTodayTask
                  GridData={GridData}
                  LoadingState={LoadingState}
                />
                <div
                  className={`home-table-pagination ${
                    LoadingState && "loading"
                  }`}
                >
                  <WijmoPagination
                    loading={LoadingState}
                    paginationConfig={paginationConfig}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                  />
                </div>
              </div>
            </>
          </Tab>
          <Tab
            eventKey="getfollowuplst"
            title={
              <>
                <span
                  className="title-span"
                  onClick={() => {
                    handleFetch("getfollowuplst");
                    newentityid("C65FE730-5FDC-418E-BDC5-98F2FC405750");
                  }}
                >
                  TASK <span className="count">{"42"}</span>
                </span>
              </>
            }
          >
            <>
              <div className="table-div">
                <GridDataTableFollowups
                  GridData={GridData}
                  LoadingState={LoadingState}
                />
                <div
                  className={`home-table-pagination ${
                    LoadingState && "loading"
                  }`}
                >
                  <WijmoPagination
                    loading={LoadingState}
                    paginationConfig={paginationConfig}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                  />
                </div>
              </div>
            </>
          </Tab>
          <Tab
            eventKey="getapprovalslst"
            title={
              <>
                <span
                  className="title-span"
                  onClick={() => {
                    handleFetch("getapprovalslst");
                    newentityid("C65FE730-5FDC-418E-BDC5-98F2FC405750");
                  }}
                >
                  MEETING<span className="count">{"34"}</span>
                </span>
              </>
            }
          >
            <>
              <div className="table-div">
                <GridDataTableApproval
                  GridData={GridData}
                  LoadingState={LoadingState}
                />
                <div
                  className={`home-table-pagination ${
                    LoadingState && "loading"
                  }`}
                >
                  <WijmoPagination
                    loading={LoadingState}
                    paginationConfig={paginationConfig}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                  />
                </div>
              </div>
            </>
          </Tab>
          <Tab
            eventKey="EMAIL"
            title={
              <>
                <span
                  className="title-span"
                  onClick={() => {
                    handleFetch("getapprovalslst");
                    newentityid("C65FE730-5FDC-418E-BDC5-98F2FC405750");
                  }}
                >
                  EMAIL<span className="count">{"36"}</span>
                </span>
              </>
            }
          >
            <>
              <div className="table-div">
                <GridDataTableFollowups
                  GridData={GridData}
                  LoadingState={LoadingState}
                />
                <div
                  className={`home-table-pagination ${
                    LoadingState && "loading"
                  }`}
                >
                  <WijmoPagination
                    loading={LoadingState}
                    paginationConfig={paginationConfig}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                  />
                </div>
              </div>
            </>
          </Tab>
        </Tabs>
      </ArcWidget>
      {/* <pre>{JSON.stringify(PlanSummeryState, null, 2)}</pre> */}
    </React.Fragment>
  );
};
export default GridWidget;

export const GridDataTableTodayTask = ({ LoadingState }) => {
  const GridData = [
    {
      id: "1",
      title: "Discussion",
      callType: "Inbound",
      callStartTime: "2024-06-15T10:27:00.507",
      callDuration: "03:03",
      relatedTo: "Account",
      contactName: "Donald McCallion",
      callOwner: "Johnwilliam",
    },
    {
      id: "2",
      title: "Follow up with Lead",
      callType: "Outbound",
      callStartTime: "2024-06-15T10:27:00.507",
      callDuration: "00:00",
      relatedTo: "Lead",
      contactName: "Johnwilliam",
      callOwner: "Johnwilliam",
    },
    {
      id: "3",
      title: "Team discussion",
      callType: "Outbound",
      callStartTime: "2024-06-15T10:27:00.507",
      callDuration: "00:00",
      relatedTo: "Contact",
      contactName: "Johnwilliam",
      callOwner: "Johnwilliam",
    },
    {
      id: "4",
      title: "Scrum",
      callType: "Outbound",
      callStartTime: "2024-06-15T10:27:00.507",
      callDuration: "00:00",
      relatedTo: "Opportunity",
      contactName: "Joe Rouleau",
      callOwner: "Johnwilliam",
    },
    {
      id: "5",
      title: "Team call",
      callType: "Outbound",
      callStartTime: "2024-06-15T10:27:00.507",
      callDuration: "00:00",
      relatedTo: "Contact",
      contactName: "Johnwilliam",
      callOwner: "Johnwilliam",
    },
    {
      id: "6",
      title: "Call for reminder",
      callType: "Outbound",
      callStartTime: "2024-06-15T10:27:00.507",
      callDuration: "00:00",
      relatedTo: "Account",
      contactName: "Johnwilliam",
      callOwner: "Johnwilliam",
    },
    {
      id: "7",
      title: "Future Programs call",
      callType: "Outbound",
      callStartTime: "2024-06-15T10:27:00.507",
      callDuration: "00:00",
      relatedTo: "Opportunity",
      contactName: "Johnwilliam",
      callOwner: "Johnwilliam",
    },
    {
      id: "8",
      title: "Program Initialize call",
      callType: "Outbound",
      callStartTime: "2024-06-15T10:27:00.507",
      callDuration: "00:00",
      relatedTo: "Lead",
      contactName: "Johnwilliam",
      callOwner: "Johnwilliam",
    },
    {
      id: "9",
      title: "Standup call",
      callType: "Outbound",
      callStartTime: "2024-06-15T10:27:00.507",
      callDuration: "00:00",
      relatedTo: "Opportunity",
      contactName: "Johnwilliam",
      callOwner: "Johnwilliam",
    },
    {
      id: "10",
      title: "Scrum call",
      callType: "Outbound",
      callStartTime: "2024-06-15T10:27:00.507",
      callDuration: "00:00",
      relatedTo: "Account",
      contactName: "Johnwilliam",
      callOwner: "Johnwilliam",
    },
    {
      id: "11",
      title: "IPM call",
      callType: "Outbound",
      callStartTime: "2024-06-15T10:27:00.507",
      callDuration: "00:00",
      relatedTo: "Contact",
      contactName: "Johnwilliam",
      callOwner: "Johnwilliam",
    },
    {
      id: "12",
      title: "New Meeting call",
      callType: "Outbound",
      callStartTime: "2024-06-15T10:27:00.507",
      callDuration: "00:00",
      relatedTo: "Account",
      contactName: "Johnwilliam",
      callOwner: "Johnwilliam",
    },
    {
      id: "13",
      title: "Team call",
      callType: "Outbound",
      callStartTime: "2024-06-15T10:27:00.507",
      callDuration: "00:00",
      relatedTo: "Lead",
      contactName: "Johnwilliam",
      callOwner: "Johnwilliam",
    },
    {
      id: "14",
      title: "Scrum call",
      callType: "Outbound",
      callStartTime: "2024-06-15T10:27:00.507",
      callDuration: "00:00",
      relatedTo: "Opportunity",
      contactName: "Johnwilliam",
      callOwner: "Johnwilliam",
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  // * Popup State
  const [SelectedRow, setSelectedRow] = useState();
  const [UpdateStatusshow, setUpdateStatusShow] = useState(false);
  const [UpdateSessionshow, setUpdateSessionShow] = useState(false);
  const [AddSubtaskShow, setAddSubtaskShow] = useState(false);
  const [AddFollowShow, setAddFollowShow] = useState(false);
  const [ExtendPlanShow, setExtendPlanShow] = useState(false);
  // * Popup State
  const UpdateRowData = (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("RowData:", TransactionID);
    // Update the selected row state
    setSelectedRow(RowData);

    // dispatch(
    //   GetDefaultFormValues({
    //     TransactionId: TransactionID,
    //     previousPathName: "/exec",
    //   })
    // );
  };
  const GetSubTaskData = (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("RowData:", TransactionID);
    // Update the selected row state
    setSelectedRow(RowData);

    // dispatch(GetSubTask(TransactionID));
  };
  // ! Actions
  const PlanSummeryStateStatus = useSelector(
    (state) => state.PlanSummeryState.status
  );

  const HandlePostLeadID = (TransactionID) => {
    console.log("Current EntityID: " + TransactionID);

    // Store leadID in sessionStorage
    sessionStorage.setItem("Current_EntityID", TransactionID);

    // Dispatch the Redux thunk with the leadID
    dispatch(get360EntityInfo({ TransactionID, previousPathName }));
    // dispatch(getTransactionID(TransactionID));

    // Navigate to the desired route
    navigate("/360detail_v4");
  };
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
    { header: "Call Type", binding: "callType", width: 120 },
    { header: "Call Start Time", binding: "callStartTime", width: 120 },
    { header: "Call Duration", binding: "callDuration", width: 120 },
    { header: "Related To", binding: "relatedTo", width: 120 },
    { header: "Contact Name", binding: "contactName", width: 120 },
    { header: "Call Owner", binding: "callOwner", width: 150 },
  ];
  const DataMenuBtn = ({ RowData, TransactionID }) => {
    return (
      <>
        <OverlayTrigger
          trigger="click"
          placement="auto-end"
          rootClose={true}
          overlay={
            <Popover className="data-menu-option">
              <Popover.Body>
                <div className="option-div">
                  <button
                    onClick={() => {
                      setAddFollowShow(true);
                      UpdateRowData(RowData, TransactionID);
                    }}
                  >
                    <MdOutlineScreenShare /> Add Followup
                  </button>
                  <button
                    onClick={() => {
                      setExtendPlanShow(true);
                      UpdateRowData(RowData, TransactionID);
                    }}
                  >
                    <FaExternalLinkSquareAlt />
                    Extend
                  </button>
                </div>
              </Popover.Body>
            </Popover>
          }
        >
          <span>
            <HiOutlineDotsVertical />
          </span>
        </OverlayTrigger>
      </>
    );
  };
  console.log(GridData);
  return (
    <React.Fragment>
      <UpdateSatus
        show={UpdateStatusshow}
        setShow={setUpdateStatusShow}
        SelectedRow={SelectedRow}
      />
      <UpdateSession
        show={UpdateSessionshow}
        setShow={setUpdateSessionShow}
        SelectedRow={SelectedRow}
      />
      <SubTaskGrid
        show={AddSubtaskShow}
        setShow={setAddSubtaskShow}
        SelectedRow={SelectedRow}
      />
      {/* <AddFollowup
          show={AddFollowShow}
          setShow={setAddFollowShow}
          SelectedRow={SelectedRow}
        /> */}
      <ExtendPlan
        show={ExtendPlanShow}
        setShow={setExtendPlanShow}
        SelectedRow={SelectedRow}
      />
      {/* <pre>{JSON.stringify(GridData, null, 2)}</pre> */}
      {GridData?.length === 0 && PlanSummeryStateStatus !== "loading" ? (
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
          className="list-data-table with-360-page custom-height"
          headersVisibility="Column"
          selectionMode="None"
        >
          <FlexGridColumn
            allowDragging={false}
            allowResizing={true}
            binding="title"
            header="Subject"
            minWidth={350}
            isReadOnly={true}
            fixed
          >
            <FlexGridCellTemplate
              on
              cellType="Cell"
              template={(ctx) => {
                const fullName = ctx.item.title;
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
                    <div className="name-td new-name-td with-action-1">
                      <a
                        style={{ textDecoration: "none" }}
                        onClick={() => HandlePostLeadID(TransactionID)}
                      >
                        <div className="name-detail">
                          <span>
                            {startWithLetter}
                            {endWithLetter}
                          </span>
                          <p title={ctx.item.title}>{ctx.item.title}</p>
                        </div>
                      </a>
                      <div className="action new-name-td with-action-1">
                        <span title="Call">
                          <MdAddCall />
                        </span>
                      </div>
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
                  const GridValue = ctx.item.callStartTime;
                  const ActualValue = ctx?.item[data.binding];
                  // console.log(GridValue);
                  const formattedDate = ["", null].includes(GridValue)
                    ? "-"
                    : format(parseISO(GridValue), "MM/dd/yyyy");
                  return (
                    <>
                      <div className="name-td new-name-td-default without-cell-edit">
                        <span
                          className="default-value"
                          title={
                            data.binding === "callStartTime"
                              ? formattedDate
                              : ActualValue || "-"
                          }
                        >
                          {data.binding === "callStartTime"
                            ? formattedDate
                            : ActualValue || "-"}
                        </span>
                      </div>
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

const GridDataTableFollowups = ({ LoadingState }) => {
  const GridData = [
    {
      id: "1",
      title: "Internal discussion",
      dueDate: "2024-06-15T10:27:00.507",
      status: "Not Started",
      priority: "High",
      relatedTo: "Benton",
      contactName: "John Butt (Sample)",
      taskOwner: "Johnwilliam",
    },
    {
      id: "2",
      title: "Complete CRM Getting Started steps",
      dueDate: "2024-06-15T10:27:00.507",
      status: "Completed",
      priority: "Highest",
      relatedTo: "Benton",
      contactName: "John Butt (Sample)",
      taskOwner: "Johnwilliam",
    },
    {
      id: "3",
      title: "Register for upcoming CRM Webinars",
      dueDate: "2024-06-15T10:27:00.507",
      status: "Not Started",
      priority: "Low",
      relatedTo: "King (Sample)",
      contactName: "Kris Marrier (Sample)",
      taskOwner: "Johnwilliam",
    },
    {
      id: "4",
      title: "Complete CRM Getting Started steps",
      dueDate: "2024-06-15T10:27:00.507",
      status: "Completed",
      priority: "Normal",
      relatedTo: "Theola Frey (Sample)",
      contactName: "Theola Frey (Sample)",
      taskOwner: "Johnwilliam",
    },
    {
      id: "5",
      title: "Refer CRM Videos",
      dueDate: "2024-06-15T10:27:00.507",
      status: "In Progress",
      priority: "Normal",
      relatedTo: "Morlong Associates",
      contactName: "Mitsue Tollner (Sample)",
      taskOwner: "Johnwilliam",
    },
    {
      id: "6",
      title: "Competitor Comparison Document",
      dueDate: "2024-06-15T10:27:00.507",
      status: "Not Started",
      priority: "Highest",
      relatedTo: "Felzz Printing Service",
      contactName: "Capla Paprocki (Sample)",
      taskOwner: "Johnwilliam",
    },
    {
      id: "7",
      title: "Get Approval from Manager",
      dueDate: "2024-06-15T10:27:00.507",
      status: "Not Started",
      priority: "Low",
      relatedTo: "Chapman",
      contactName: "Simon Morasca (Sample)",
      taskOwner: "Johnwilliam",
    },
    {
      id: "8",
      title: "Get Approval from Manager",
      dueDate: "2024-06-15T10:27:00.507",
      status: "In Progress",
      priority: "Normal",
      relatedTo: "Commercial Press",
      contactName: "Leota Dilliard (Sample)",
      taskOwner: "Johnwilliam",
    },
    {
      id: "9",
      title: "Get Approval from Manager",
      dueDate: "2024-06-15T10:27:00.507",
      status: "In Progress",
      priority: "High",
      relatedTo: "King (Sample)",
      contactName: "Kris Marrier (Sample)",
      taskOwner: "Johnwilliam",
    },
    {
      id: "10",
      title: "Register for upcoming CRM Webinars",
      dueDate: "2024-06-15T10:27:00.507",
      status: "In Progress",
      priority: "Normal",
      relatedTo: "Michael Ruta (Sample)",
      contactName: "Michael Ruta (Sample)",
      taskOwner: "Johnwilliam",
    },
    {
      id: "11",
      title: "CRM Standup Sequence",
      dueDate: "2024-06-15T10:27:00.507",
      status: "In Progress",
      priority: "Normal",
      relatedTo: "Michael Ruta (Sample)",
      contactName: "Michael Ruta (Sample)",
      taskOwner: "Johnwilliam",
    },
    {
      id: "12",
      title: "Budgeting Resources",
      dueDate: "2024-06-15T10:27:00.507",
      status: "In Progress",
      priority: "Normal",
      relatedTo: "Michael Ruta (Sample)",
      contactName: "Michael Ruta (Sample)",
      taskOwner: "Johnwilliam",
    },
  ];
  const dispatch = useDispatch();
  const [UpdateStatusshow, setUpdateStatusShow] = useState(false);
  const [SelectedRow, setSelectedRow] = useState(false);
  const UpdateRowData = (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("RowData:", TransactionID);
    // Update the selected row state
    setSelectedRow(RowData);

    dispatch(GetDefaultFormValuesFollowup(TransactionID));
  };
  const PlanSummeryStateStatus = useSelector(
    (state) => state.PlanSummeryState.status
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
    // { header: "Subject", binding: "title", width: 150 },
    { header: "Due Date", binding: "dueDate", width: 110 },
    { header: "Status", binding: "status", width: 120 },
    { header: "Priority", binding: "priority", width: 120 },
    { header: "Related To", binding: "relatedTo", width: 120 },
    { header: "Contact Name", binding: "contactName", width: 120 },
    { header: "Task Owner", binding: "taskOwner", width: 120 },
  ];
  console.log(GridData);
  return (
    <React.Fragment>
      <UpdateFollow
        show={UpdateStatusshow}
        setShow={setUpdateStatusShow}
        SelectedRow={SelectedRow}
      />
      {/* <pre>{JSON.stringify(GridData, null, 2)}</pre> */}
      {GridData?.length === 0 && PlanSummeryStateStatus !== "loading" ? (
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
          className="list-data-table with-360-page custom-height"
          headersVisibility="Column"
          selectionMode="None"
        >
          <FlexGridColumn
            allowDragging={false}
            allowResizing={true}
            binding="title"
            header="Subject"
            minWidth={350}
            isReadOnly={true}
            fixed
          >
            <FlexGridCellTemplate
              on
              cellType="Cell"
              template={(ctx) => {
                const fullName = ctx.item.title;
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
                    <div className="name-td new-name-td with-action-1">
                      <a style={{ textDecoration: "none" }}>
                        <div className="name-detail">
                          <span>
                            {startWithLetter}
                            {endWithLetter}
                          </span>
                          <p title={fullName}>{fullName}</p>
                        </div>
                      </a>
                      <div className="action with-action-1">
                        <span
                          title="Update Status"
                          onClick={() => {
                            setUpdateStatusShow(true);
                            UpdateRowData(RowData, TransactionID);
                          }}
                        >
                          <MdOutlineSystemUpdateAlt />
                        </span>
                      </div>
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
                  const GridValue = ctx.item?.dueDate;
                  const ActualValue = ctx?.item[data.binding];
                  // console.log(GridValue);
                  const formattedDate = ["", null].includes(GridValue)
                    ? "-"
                    : format(parseISO(GridValue), "MM/dd/yyyy");
                  return (
                    <>
                      <div className="name-td new-name-td-default without-cell-edit">
                        <span
                          className="default-value"
                          title={
                            data.binding === "dueDate"
                              ? formattedDate
                              : ActualValue || "-"
                          }
                        >
                          {data.binding === "dueDate"
                            ? formattedDate
                            : ActualValue || "-"}
                        </span>
                      </div>
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

const GridDataTableApproval = ({ LoadingState }) => {
  const GridData = [
    {
      title: "Internal projects",
      from: "2024-06-15T10:27:00.507",
      to: "2024-06-15T10:27:00.507",
      relatedTo: "Printing Dimensions",
      contactName: "Donette Foller (Sample)",
      host: "Johnwilliam",
    },
    {
      title: "Demo",
      from: "2024-06-15T10:27:00.507",
      to: "2024-06-15T10:27:00.507",
      relatedTo: "Commercial Press (Sample)",
      contactName: "Leota Dilliard (Sample)",
      host: "Johnwilliam",
    },
    {
      title: "Webinar",
      from: "2024-06-15T10:27:00.507",
      to: "2024-06-15T10:27:00.507",
      relatedTo: "Chemel",
      contactName: "James Venere (Sample)",
      host: "Johnwilliam",
    },
    {
      title: "TradeShow",
      from: "2024-06-15T10:27:00.507",
      to: "2024-06-15T10:27:00.507",
      relatedTo: "Chanay (Sample)",
      contactName: "Josephine Darakjy (Sample)",
      host: "Johnwilliam",
    },
    {
      title: "Webinar",
      from: "2024-06-15T10:27:00.507",
      to: "2024-06-15T10:27:00.507",
      relatedTo: "Oh My Goodknits Inc",
      contactName: "Carissa Kidman (Sample)",
      host: "Johnwilliam",
    },
    {
      title: "Seminar",
      from: "2024-06-15T10:27:00.507",
      to: "2024-06-15T10:27:00.507",
      relatedTo: "Feltz Printing Service",
      contactName: "Capla Paprocki",
      host: "Johnwilliam",
    },
    {
      title: "Attend Customer conference",
      from: "2024-06-15T10:27:00.507",
      to: "2024-06-15T10:27:00.507",
      relatedTo: "Morlong Associates",
      contactName: "Mitsue Tollner (Sample)",
      host: "Johnwilliam",
    },
    {
      title: "CRM Webinar",
      from: "2024-06-15T10:27:00.507",
      to: "2024-06-15T10:27:00.507",
      relatedTo: "Felix Hirpara (Sample)",
      contactName: "John Butt (Sample)",
      host: "Johnwilliam",
    },
    {
      title: "CRM Webinar",
      from: "2024-06-15T10:27:00.507",
      to: "2024-06-15T10:27:00.507",
      relatedTo: "Benton",
      contactName: "John Butt (Sample)",
      host: "Johnwilliam",
    },
  ];
  const dispatch = useDispatch();
  const [UpdateStatusshow, setUpdateStatusShow] = useState(false);
  const [SelectedRow, setSelectedRow] = useState(false);
  const UpdateRowData = (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("RowData:", TransactionID);
    // Update the selected row state
    setSelectedRow(RowData);

    dispatch(GetDefaultFormValuesFollowup(TransactionID));
  };
  const PlanSummeryStateStatus = useSelector(
    (state) => state.PlanSummeryState.status
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
    { header: "From", binding: "from", width: 150 },
    { header: "To", binding: "to", width: 150 },
    { header: "Related To", binding: "relatedTo", width: 120 },
    { header: "Contact Name", binding: "contactName", width: 120 },
    { header: "Host", binding: "host", width: 120 },
  ];
  console.log(GridData);
  return (
    <React.Fragment>
      <UpdateFollow
        show={UpdateStatusshow}
        setShow={setUpdateStatusShow}
        SelectedRow={SelectedRow}
      />
      {/* <pre>{JSON.stringify(GridData, null, 2)}</pre> */}
      {GridData?.length === 0 && PlanSummeryStateStatus !== "loading" ? (
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
          className="list-data-table with-360-page custom-height"
          headersVisibility="Column"
          selectionMode="None"
        >
          <FlexGridColumn
            allowDragging={false}
            allowResizing={true}
            binding="title"
            header="Subject"
            minWidth={350}
            isReadOnly={true}
            fixed
          >
            <FlexGridCellTemplate
              on
              cellType="Cell"
              template={(ctx) => {
                const fullName = ctx.item.title;
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
                    <div className="name-td new-name-td with-action-1">
                      <a style={{ textDecoration: "none" }}>
                        <div className="name-detail">
                          <span>
                            {startWithLetter}
                            {endWithLetter}
                          </span>
                          <p title={ctx.item.title}>{ctx.item.title}</p>
                        </div>
                      </a>
                      <div className="action with-action-1">
                        <span
                          title="Update Status"
                          onClick={() => {
                            setUpdateStatusShow(true);
                            UpdateRowData(RowData, TransactionID);
                          }}
                        >
                          <MdOutlineSystemUpdateAlt />
                        </span>
                      </div>
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
                  const GridValue = ctx.item.to || ctx.item.from;
                  const ActualValue = ctx?.item[data.binding];
                  // console.log(GridValue);
                  const formattedDate = ["", null].includes(GridValue)
                    ? "-"
                    : format(parseISO(GridValue), "MM/dd/yyyy");
                  return (
                    <>
                      <div className="name-td new-name-td-default without-cell-edit">
                        <span
                          className="default-value"
                          title={
                            ["from", "to"].includes(data.binding)
                              ? formattedDate
                              : ActualValue || "-"
                          }
                        >
                          {["from", "to"].includes(data.binding)
                            ? formattedDate
                            : ActualValue || "-"}
                        </span>
                      </div>
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
export function GridWidgetv2({ Title, TableData }) {
  //! ArcDropDownControledData State
  const ArcDropDownControledData = [
    { id: 1, value: "this Week" },
    { id: 2, value: "this Month" },
    { id: 3, value: "this Year" },
  ];
  return (
    <React.Fragment>
      <ArcWidget className={"grid-widget"}>
        <WidgetHeader
          Title={Title}
          ArcDropDownControledData={ArcDropDownControledData}
        />
        <div className="arc-table-div">
          <Table bordered>
            <thead>
              <tr>
                {TableData.ColumnData.map((data, index) => (
                  <th key={index}>{data}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TableData.RowData.map((rowData, index) => (
                <tr key={index}>
                  {Object.keys(rowData).map((key, innerIndex) => (
                    <td key={innerIndex}>{rowData[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </ArcWidget>
    </React.Fragment>
  );
}
