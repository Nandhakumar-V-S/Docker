/* eslint-disable no-inner-declarations */
/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  dispatch,
} from "react";
import { useLocation } from "react-router-dom";
//? Assets

import { format } from "date-fns";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdOutlineCancel } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate,
} from "@grapecity/wijmo.react.grid";
import "@grapecity/wijmo.styles/wijmo.css";
import { MdSms } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoCallSharp } from "react-icons/io5";
import moment from "moment";
//? Components

import DetailSidebar from "./DetailSidebar";
import { GetLeadInfo } from "@/redux/360Details/LeadInfoSlice";
import { GetEntityGrid } from "@/redux/360Details/Get360EntityGrid";
import { GetTimeline360 } from "@/redux/360Details/GetTimeline";
import {
  getnewlistfieldsSuccess,
  getnewDatasetSuccess,
  getTaskrowdata,
  getPlanDatasetSuccess,
  getPlanlistfieldsSuccess,
  getPlanTaskrowdata,
  getSubMasterDataSuccess,
} from "@/redux/Execution/actions";
import {
  newentityidInfo,
  newlistidInfo,
  useridInfo,
  TransactionIdInfo,
  newdataSetIDInfo,
  newTotalcolumnInfo,
  TaskrowdataInfo,
  planentityidInfo,
  planlistidInfo,
  plandataSetIDInfo,
  plannewTotalcolumnInfo,
  planTaskrowdataInfo,
} from "@/redux/Execution/selector";
//? CSS
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import ArcDataNotFound from "@/components/arccomponents/ui-components/nodatafound/no-data-found";
//? Images
import { request } from "@/request/API/globalrequest";
import { API_TEST_URL } from "@/config/serverApiConfig";
// import { getMasterDataSuccess } from "@/redux/Execution/actions";
// import { getMasterDataSuccess } from "@/redux/Task/actions"
//i-added
//? JSON File
import SortedColumns from "./sortedColumns.json";
import { useDispatch, useSelector } from "react-redux";

//? Icons
import { FaRegEdit } from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LuClock3 } from "react-icons/lu";
import { FaRegCalendar } from "react-icons/fa6";
import { LuUser2 } from "react-icons/lu";
import { RiEdit2Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { FaCircleDot } from "react-icons/fa6";
import { MdOutlinePhoneCallback } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

import { IoCalendarClearOutline } from "react-icons/io5";
import MultiStepProgressBar from "./progressbar/progressbar";
import { GrNotes } from "react-icons/gr";
import EntityDataTask from "./entity.json";
import EntityDataPlan from "./entityplan.json";
import TimeLine from "./Timeline";
import AddSubTask360 from "@/components/arccomponents/DynamicInputs/AddSubTask-360/addsubtask-360";
import Updatesubtask from "@/modules/TaskModule/components/Updatesubtask/Updatesubtask";
import ListPageTableLoading from "@/modules/loading-skeleton/listpage-table-loading";
import DataTable from "@/modules/FollowupModule/WijmoLayout/DataTable";
import FollowupApi from "@/request/API/FollowupApi";
import WijmoFlexgrid from "@/components/FollowupComp/Wijmo/WijmoFlexgrid";
import {
  listDataInfo,
  loadingInfo,
  totalColumnsInfo,
} from "@/redux/Followup/selector";
// import { GetsubtaskDtsByTransId } from "@/redux/Execution/UpdateSubtask/GetsubtaskDtsByTransId";
// *******~ Import ~******** //

const AllDetails = () => {
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  const EntityData =
    previousPathName === "/task" ? EntityDataTask : EntityDataPlan;
  const dispatch = useDispatch();
  const AttributeaddStatus = useSelector(
    (state) => state.arcAddAttribute.Addstatus
  );

  const followuploading = useSelector(loadingInfo);
  const entityid = useSelector(newentityidInfo);
  const listid = useSelector(newlistidInfo);
  const planentityid = useSelector(planentityidInfo);
  const planlistid = useSelector(planlistidInfo);
  const userid = useSelector(useridInfo);
  // const TransactionId = useSelector(TransactionIdInfo);
  const dataSetID = useSelector(newdataSetIDInfo);
  const plandataSetID = useSelector(plandataSetIDInfo);
  const followuplistData = useSelector(listDataInfo);
  const followupdata = followuplistData.data;
  const followuptotalRecords = followuplistData.totalRecords;

  const followuptotalColumns = useSelector(totalColumnsInfo);
  const newTotalcolumn = useSelector(newTotalcolumnInfo);
  const Taskrowdata = useSelector(TaskrowdataInfo);
  const sortedColumn = newTotalcolumn?.filter((column) => column.ismapped);

  const { data, totalRecords } = Taskrowdata || {};
  const followuptableData = followupdata?.map((item) => {
    return Object.keys(item).reduce((acc, key) => {
      acc[key.toLowerCase()] = item[key];
      return acc;
    }, {});
  });
  console.log(followupdata);
  console.log(followuplistData);
  console.log(followuptableData);
  const followupsortedColumn = followuptotalColumns
    ?.filter((column) => column.ismapped)
    .sort((a, b) => a.seqno - b.seqno);
  let followupdataSource;
  followupdataSource = (followuptableData && followuptableData) || [];
  // console.log(TransactionId);
  console.log(followupdataSource);
  console.log(followupsortedColumn);

  const tableData = data?.map((item) => {
    return Object.keys(item).reduce((acc, key) => {
      acc[key.toLowerCase()] = item[key];
      return acc;
    }, {});
  });

  const plannewTotalcolumn = useSelector(plannewTotalcolumnInfo);
  console.log();
  const planTaskrowdata = useSelector(planTaskrowdataInfo);
  const plansortedColumn = plannewTotalcolumn?.filter(
    (column) => column.ismapped
  );

  //const { data, totalRecords } = planTaskrowdata || {};
  // console.log(TransactionId);
  console.log(plansortedColumn);
  console.log(planTaskrowdata);
  // const { previousPathName } = useContext(ArcGlobalContextProvider);
  const plantableData = planTaskrowdata?.data?.map((item) => {
    return Object.keys(item).reduce((acc, key) => {
      acc[key.toLowerCase()] = item[key];
      return acc;
    }, {});
  });
  console.log("Current Path Name:", previousPathName);
  const [key, setKey] = useState("overview");
  const [istageditedEditTask, setistageditedEditTask] = useState(false);
  // ! selectEntityDetails start
  const selectEntityDetails = (state) => state.entity.entityDetails;
  const entityDetails = useSelector(selectEntityDetails);
  const entityResults = entityDetails?.result?.data;
  console.log(entityResults);
  const entityResultsData = entityResults && entityResults[0];
  // const TransactionId = entityResultsData?.id;
  const TransactionId = sessionStorage.getItem("Current_EntityID");
  console.log("TransactionId", TransactionId);
  const followuppostRequest = {
    entityid: "C65FE730-5FDC-418E-BDC5-98F2FC405750",
    listid: "8E006794-EF59-49F9-ADD4-B42821328984",
    start: 0,
    skip: 20,
    orderby: "",
    orderbydir: "",
    loggeduserid: "1016",
    sessionid: "",
    filterparams: [],
    transactionid: TransactionId ? TransactionId : "",
  };
  const SelectedentityId =
    String(entityResultsData?.id) === "undefined" ? "" : entityResultsData?.id;
  // ! selectEntityDetails start
  // Select Redux state
  const gridData = useSelector(
    (state) => state.entityGridData.griddata?.result.data
  );
  // const gridDataStatus = useSelector((state) => state.entityGridData.status);
  const status = useSelector((state) => state.arcGetLead.status);
  // const leadDetails = useSelector((state) => state.arcGetLead.leadDetails);
  const leadDetails = useSelector((state) => state.entity.entityDetails);
  const AddSubtaskstatus = useSelector(
    (state) => state.addSubTaskState.AddSubtaskstatus
  );

  // const usePreviousLocation = () => {
  //   const location = useLocation();
  //   const previousLocationRef = useRef();

  //   useEffect(() => {
  //     previousLocationRef.current = location;
  //   }, [location]);

  //   return previousLocationRef.current;
  // };
  // const previousLocation = usePreviousLocation();
  // console.log(previousLocation.pathname);

  var requestData = {
    entityid: "70C75211-155C-45DC-B155-002DBB5CCE91",
    listid: "8B50916F-41EC-4D7E-B362-6706D121522B",
    selectedentityid: String(SelectedentityId),
    start: 0,
    skip: 50,
    orderby: "",
    orderbydir: "desc",
    loggeduserid: "",
    sessionid: "",
    filterparams: [],
  };
  // var PlanRequest = {
  //   entityid: "F48EF545-9995-4F8F-857D-DDDA2BC063CC",
  //   listid: "0A533D6B-5FC9-425E-B327-814AA7554CF5",
  //   start: 0,
  //   skip: 100,
  //   orderby: "",
  //   orderbydir: "",
  //   loggeduserid: "",
  //   sessionid: "",
  //   transactionid: TransactionId ? TransactionId : "",
  //   filterparams: [],
  // };

  var PlanRequest = {
    entityid: "F48EF545-9995-4F8F-857D-DDDA2BC063CC",
    listid: "0A533D6B-5FC9-425E-B327-814AA7554CF5",
    start: 0,
    skip: 100,
    orderby: "",
    orderbydir: "",
    loggeduserid: "",
    sessionid: "",
    transactionid:
      previousPathName === "/task" ? "" : TransactionId ? TransactionId : "",
    transactionworkitemid:
      previousPathName === "/task" ? (TransactionId ? TransactionId : "") : "",
    filterparams: [],
  };
  useEffect(() => {
    var request_data = "6A054A51-CAED-4860-9934-754D3EBBAC7D";

    async function getlookupdetails() {
      const postData = {
        entityId: request_data,
      };
      const response = await request.post(
        API_TEST_URL,
        "arcconfiguration/getlookupdatabyid",
        postData
      );
      dispatch(getSubMasterDataSuccess(response));
      // dispatch(getMasterDataSuccess(response));//i-added
      //i-added
    }
    getlookupdetails();
  }, [dispatch]);

  useEffect(() => {
    if (entityid && listid && userid) {
      async function getnewlistconfigbyid() {
        const data = await request.get(
          API_TEST_URL,
          `arclist/getlistconfigbyid?entityid=${entityid}&listid=${listid}&userid=${userid}`
        );
        dispatch(getnewlistfieldsSuccess(data));
      }

      getnewlistconfigbyid();
    }
  }, [dispatch]);

  useEffect(() => {
    if (dataSetID) {
      async function getDataset() {
        const data = await request.get(
          API_TEST_URL,
          `dataset/getdatasetfieldinfobyid?datasetid=${dataSetID}&userid=${userid}`
        );
        dispatch(getnewDatasetSuccess(data));

        if (data && TransactionId) {
          const newdata = await request.get(
            API_TEST_URL,
            `planexecution/getplanexec360tasklist?${
              previousPathName === "/task" ? "workitemid" : "assignmentid"
            }=${TransactionId}`
          );
          dispatch(getTaskrowdata(newdata));
        }
      }

      getDataset();
    }
  }, [dataSetID, TransactionId, AddSubtaskstatus]);

  const UpdatesubtaskStatus = useSelector(
    (state) => state.UpdatesubtaskAPIstate.DefaultFormValues?.result?.response
  );
  const [PageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    if (UpdatesubtaskStatus === "SubTask Updated successfully.") {
      async function getDataset() {
        setPageLoading(true);
        const data = await request.get(
          API_TEST_URL,
          `dataset/getdatasetfieldinfobyid?datasetid=${dataSetID}&userid=${userid}`
        );
        dispatch(getnewDatasetSuccess(data));

        if (data && TransactionId) {
          const newdata = await request.get(
            API_TEST_URL,
            `planexecution/getplanexec360tasklist?${
              previousPathName === "/task" ? "workitemid" : "assignmentid"
            }=${TransactionId}`
          );
          dispatch(getTaskrowdata(newdata));
          setPageLoading(false);
        }
      }

      getDataset();
    }
  }, [UpdatesubtaskStatus]);

  // ! plan table start
  useEffect(() => {
    if (planentityid && planlistid && userid) {
      async function getnewlistconfigbyid() {
        const data = await request.get(
          API_TEST_URL,
          `arclist/getlistconfigbyid?entityid=${planentityid}&listid=${planlistid}&userid=${userid}`
        );
        dispatch(getPlanlistfieldsSuccess(data));
      }

      getnewlistconfigbyid();
    }
  }, [dispatch]);

  useEffect(() => {
    if (plandataSetID) {
      async function getDataset() {
        const data = await request.get(
          API_TEST_URL,
          `dataset/getdatasetfieldinfobyid?datasetid=${plandataSetID}&userid=${userid}`
        );
        dispatch(getPlanDatasetSuccess(data));

        if (data && TransactionId) {
          // const newdata = await request.get(
          //   API_TEST_URL,
          //   `planexecution/getplanexec360listdetails?assignmentid=${TransactionId}`
          // );
          // dispatch(getPlanTaskrowdata(newdata));
          const response = await request.post(
            API_TEST_URL,
            "planexecution/getplanexec360listdetails",
            PlanRequest
          );
          dispatch(getPlanTaskrowdata(response));
        }
      }

      getDataset();
    }
  }, [plandataSetID, TransactionId]);
  // ! plan table start

  useEffect(() => {
    if (SelectedentityId !== "") {
      dispatch(GetEntityGrid(requestData)); // Dispatch the thunk to fetch data
    }
  }, [SelectedentityId, AttributeaddStatus]);

  const GetTimeline = () => {
    dispatch(GetTimeline360(TransactionId));
  };
  const { settask360followuptab } = useContext(ArcGlobalContextProvider);
  console.log(status);
  console.log(leadDetails);
  console.log(SelectedentityId);
  console.log(plantableData);
  console.log(plansortedColumn);
  const HandleTabKey = (key) => {
    if (key == "Followup") {
      settask360followuptab(true);
    }
  };

  return (
    <>
      <div className="all-details-main">
        <div className="all-details">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(key) => {
              setKey(key);
              HandleTabKey(key);
            }}
            className=""
          >
            <Tab eventKey="overview" title={<>Overview</>}>
              <Overview entityResults={entityResults} />
            </Tab>
            <Tab eventKey="attributes" title={<>Subtask</>}>
              <GridData
                gridData={tableData}
                SortedColumns={sortedColumn}
                PageLoading={PageLoading}
              />
              {tableData?.length === 0 ? <ArcDataNotFound /> : null}
            </Tab>
            <Tab eventKey="plan" title={<>Plan</>}>
              <GridData
                gridData={plantableData}
                SortedColumns={plansortedColumn}
              />

              {plantableData?.length === 0 ? <ArcDataNotFound /> : null}
            </Tab>
            <Tab eventKey="Followup" title={<>Followup</>}>
              <FollowupApi
                frompage={"360details"}
                followuprequestclass={followuppostRequest}
              />

              <WijmoFlexgrid
                loading={followuploading}
                tableData={followupdataSource}
                sortedColumns={followupsortedColumn}
              />

              {followupdataSource?.length === 0 ? <ArcDataNotFound /> : null}
            </Tab>
            <Tab
              eventKey="timeline"
              title={
                <>
                  <span onClick={GetTimeline}>Timeline</span>
                </>
              }
            >
              <TimeLine />
            </Tab>
          </Tabs>
        </div>
        {/* <DetailSidebar /> */}
      </div>
    </>
  );
};
export default AllDetails;

const formatValue = (value, apiName) => {
  if (!value || value.length === 0) {
    return "-";
  }

  if (apiName === "column30") {
    return moment(value, "MM/DD/YYYY h:mm:ss A").format("DD/MM/YYYY");
  }

  if (apiName === "utbl_Workitem_column18") {
    return value + "%";
  }

  return value;
};

function ContextAwareToggle({ eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );
  const isCurrentEventKey = activeEventKey === eventKey;
  return (
    <button
      type="button"
      className={isCurrentEventKey ? "active" : null}
      onClick={decoratedOnClick}
    >
      {isCurrentEventKey ? "Hide" : "Show"}
    </button>
  );
}
export const Overview = ({ entityResults }) => {
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  const EntityData =
    previousPathName === "/task" ? EntityDataTask : EntityDataPlan;
  const entityResult =
    entityResults && entityResults.length > 0 ? entityResults[0] : null;
  return (
    <>
      <div className="tab-main-content overview">
        <div className="info-box">
          <div className="info-header">
            <h4>{sessionStorage.getItem("360Pagename")} Information</h4>
            {/* <button>
              <RiEdit2Line /> Edit
            </button> */}
          </div>
          {/* <pre>{JSON.stringify(EntityData?.Generalinfo, null, 2)}</pre>
          <pre>{JSON.stringify(entityResult, null, 2)}</pre> */}
          <ul>
            {EntityData?.Generalinfo?.map((lead, index) => (
              <React.Fragment key={index}>
                <li key={index}>
                  <div className="data">
                    <span>{lead.labeltext}</span>
                    <p
                      title={
                        entityResult
                          ? formatValue(
                              entityResult[lead.api_name],
                              lead.api_name
                            )
                          : "-"
                      }
                    >
                      {entityResult
                        ? formatValue(
                            entityResult[lead.api_name],
                            lead.api_name
                          )
                        : "-"}
                    </p>
                  </div>
                </li>
              </React.Fragment>
            ))}
          </ul>
          {/* <pre>{JSON.stringify(leadDetails, null, 2)}</pre> */}
        </div>
      </div>
    </>
  );
};

const Notes = () => {
  return (
    <>
      <div className="tab-main-content notes">
        <div className="input-control">
          <Form.Label>Add Notes</Form.Label>
          <Form.Control as="textarea" placeholder="Add a note..." rows={3} />
          <div className="group-btn">
            <button>Save</button>
            <button className="cancel">Cancel</button>
          </div>
        </div>
        <ul className="notes-list">
          <li>
            <span className="icon">
              <GrNotes />
            </span>
            <div className="content">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia,
                officiis laudantium. dolor sit amet consectetur.
              </p>
              <h5>Opportunity</h5>
              <p>
                <span>Admin</span>
                <span>5 hours ago</span>
              </p>
            </div>
            <span className="icon action-btn">
              <BiEditAlt />
            </span>
            <span className="icon action-btn">
              <RiDeleteBin6Line />
            </span>
          </li>
          <li>
            <span className="icon">
              <GrNotes />
            </span>
            <div className="content">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia,
                officiis laudantium.
              </p>
              <h5>Lead</h5>
              <p>
                <span>Admin</span>
                <span>in 3 minutes</span>
              </p>
            </div>
            <span className="icon action-btn">
              <BiEditAlt />
            </span>
            <span className="icon action-btn">
              <RiDeleteBin6Line />
            </span>
          </li>
          <li>
            <span className="icon">
              <GrNotes />
            </span>
            <div className="content">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia,
                officiis laudantium.
              </p>
              <h5>Lead</h5>
              <p>
                <span>Brenda Lee</span>
              </p>
            </div>
            <span className="icon action-btn">
              <BiEditAlt />
            </span>
            <span className="icon action-btn">
              <RiDeleteBin6Line />
            </span>
          </li>
          {[...Array(10)].map((data, index) => (
            <React.Fragment key={index}>
              <li>
                <span className="icon">
                  <GrNotes />
                </span>
                <div className="content">
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quia, officiis laudantium.
                  </p>
                  <h5>Opportunity</h5>
                  <p>
                    <span>Applicant - Jared</span>
                    <span>Brenda Lee</span>
                  </p>
                </div>
                <span className="icon action-btn">
                  <BiEditAlt />
                </span>
                <span className="icon action-btn">
                  <RiDeleteBin6Line />
                </span>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </>
  );
};

const Activities = () => {
  const [selectedValue, setSelectedValue] = useState(); // Initial value

  const handleSelect = (eventKey) => {
    setSelectedValue(eventKey);
  };

  const ActivitiesData = [
    {
      type: "call",
      details: {
        name: "Gonzalez Helen",
        owner: "Admin Manager",
        subject: "Time Tracking",
        number: "(907) 095-345-897",
        date: "10/06/2024",
        time: "10:00PM - 11:00PM",
        priority: "High",
        status: "Sheduled",
      },
    },
    {
      type: "event",
      details: {
        name: "Gonzalez Helen",
        owner: "Admin Manager",
        subject: "Meeting is held for online training",
        number: "",
        date: "10/06/2024",
        time: "10:00PM - 11:00PM",
        priority: "Low",
        status: "Cancelled",
      },
    },
    {
      type: "task",
      details: {
        name: "Gonzalez Helen",
        owner: "Admin Manager",
        subject: "Project demo sheduled on tomorrow",
        number: "",
        date: "10/06/2024",
        time: "10:00PM - 11:00PM",
        priority: "Medium",
        status: "Sheduled",
      },
    },
    {
      type: "call",
      details: {
        name: "Gonzalez Helen",
        owner: "Admin Manager",
        subject: "Outgoing call to Jared Roy",
        number: "",
        date: "10/06/2024",
        time: "10:00PM - 11:00PM",
        priority: "High",
        status: "Completed",
      },
    },
    {
      type: "task",
      details: {
        name: "Gonzalez Helen",
        owner: "Admin Manager",
        subject: "Due date is tomorrow for sending the project",
        number: "",
        date: "10/06/2024",
        time: "10:00PM - 11:00PM",
        priority: "Medium",
        status: "Sheduled",
      },
    },
  ];

  return (
    <>
      <div className="tab-main-content activities">
        <div className="activities-header">
          <DropdownButton
            id="dropdown-item-button"
            title={`${selectedValue ? selectedValue : "All activities"}`}
            onSelect={handleSelect}
          >
            <div className="item-div">
              {["All activities", "Task", "Evenet", "Call"].map(
                (data, index) => (
                  <>
                    <Dropdown.Item eventKey={data} as="button" key={index}>
                      {data}
                    </Dropdown.Item>
                  </>
                )
              )}
            </div>
          </DropdownButton>
          <div className="add-activities-btn">
            <AddTask />
            <button>
              <FaPlus />
              Event
            </button>
            <button>
              <FaPlus />
              Call
            </button>
          </div>
        </div>
        <div className="activities-list">
          <ul>
            {[...Array(3)].map((data, index) => (
              <React.Fragment key={index}>
                {ActivitiesData.map((Activitie, index) => (
                  <li key={index}>
                    <span className="icon">
                      {Activitie.type === "call" ? (
                        <>
                          <MdOutlinePhoneCallback />
                        </>
                      ) : Activitie.type === "event" ? (
                        <>
                          <IoCalendarClearOutline />
                        </>
                      ) : (
                        <>
                          <BiTask />
                        </>
                      )}
                    </span>
                    <div className="content">
                      <h5>
                        {Activitie.details.subject}{" "}
                        <span
                          className={Activitie.details.priority.toLowerCase()}
                        >
                          {Activitie.details.priority}
                        </span>
                      </h5>
                      <p className="date-time">
                        <FaRegCalendar />
                        {Activitie.details.date}, <LuClock3 />
                        {Activitie.details.time}
                      </p>
                      {Activitie.details.number && (
                        <p className="call">
                          <MdAddIcCall />
                          {Activitie.details.number}
                        </p>
                      )}
                      <p>
                        <span>
                          <LuUser2 />
                          {Activitie.details.name}
                        </span>
                        <span
                          className={Activitie.details.status.toLowerCase()}
                        >
                          {Activitie.details.status}
                        </span>
                      </p>
                    </div>
                    <span className="icon action-btn">
                      <BiEditAlt />
                    </span>
                    <span className="icon action-btn">
                      <RiDeleteBin6Line />
                    </span>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const AddTask = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="action-btn" onClick={handleShow}>
        <span>
          <FaPlus />
        </span>
        Task
      </button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="add-contact-form-canva"
        backdrop="static"
      >
        <Offcanvas.Body>
          <div className="add-contact-form">
            <div className="header-content">
              <h3>Add Task</h3>

              <span onClick={handleClose} className="close-btn">
                <MdOutlineCancel />
              </span>
            </div>
            <div className="main-content">
              <Form>
                <Form.Group className="form-group">
                  <div className="input-control">
                    <Form.Label>Add Task</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter task name"
                      name=""
                    />
                  </div>
                  <div className="input-control">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter the task details..."
                      rows={3}
                    />
                  </div>
                </Form.Group>
              </Form>
            </div>
            <div className="footer-content">
              <button className="cancel" onClick={handleClose}>
                Cancel
              </button>
              <button>Add</button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

const GridData = ({ gridData, SortedColumns, PageLoading }) => {
  // Access the Redux state using useSelector
  const dispatch = useDispatch();
  const [SelectedRow, setSelectedRow] = useState([]);

  const [subtaskshow, setsubtaskshow] = useState(false);
  const [transactionid, settransactionid] = useState("");
  // useSelector((state) => state.GetsubtaskDtsByTransIdReducer.DefaultFormValues);
  const UpdateRowData = (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("subtaskshow:", RowData);
    console.log("TransactionID:", TransactionID);
    // Update the selected row state
    setSelectedRow(RowData);
    settransactionid(TransactionID);
    // dispatch(GetsubtaskDtsByTransId(TransactionID));
  };
  const [TableData, setTableData] = useState([]);

  const UpdatedTableData = gridData?.map((item) => {
    return Object.keys(item).reduce((acc, key) => {
      const lowerCaseKey = key.toLowerCase();
      const spendHoursValue = item["spendhours"] || "-";
      if (lowerCaseKey === "utbl_assignment_column3") {
        acc[lowerCaseKey] = spendHoursValue;
      } else {
        acc[lowerCaseKey] = item[key];
      }
      // acc[key.toLowerCase()] = item[key];
      return acc;
    }, {});
  });

  useEffect(() => {
    setTableData(UpdatedTableData);
    removeWijimoLicense();
  }, [gridData]);

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
  const convertMinutesToHoursAndMinutes = (minutes) => {
    if (minutes < 0) return "Invalid input"; // Handle negative input

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    let result = "";

    if (hours > 0) {
      result += `${hours}h`;
    }
    if (remainingMinutes > 0) {
      result += `${result ? " " : ""}${remainingMinutes}m`; // Add a space if hours are also present
    }

    return result || "0m"; // Return '0m' if both hours and minutes are zero
  };

  console.log(gridData);
  console.log(SortedColumns);
  const nonSortableColumns = [""];

  return (
    <>
      <Updatesubtask
        show={subtaskshow}
        setShow={setsubtaskshow}
        SelectedRow={SelectedRow}
        transactionid={transactionid}
      />
      {/* <Updatesubtask show={subtaskshow} setShow={setsubtaskshow} SelectedRow={} /> */}
      {/* <pre>{JSON.stringify(gridData, null, 2)}</pre> */}
      {/* {PageLoading ? <ListPageTableLoading />: "false"} */}
      <div className="tab-main-content table-grid-data">
        {PageLoading ? (
          <ListPageTableLoading />
        ) : (
          <FlexGrid
            autoRowHeights={true}
            deferResizing={true}
            frozenColumns={1}
            itemsSource={TableData}
            allowSorting={true}
            className="list-data-table with-360-page"
            headersVisibility="Column"
            // selectionMode="None"
          >
            {console.log(SortedColumns)}
            {SortedColumns.map((column, index) =>
              column.istitle === true || column.name === "Plan Date" ? (
                <FlexGridColumn
                  key={column.id}
                  binding={column.displayapiname.toLowerCase()}
                  header={column.name}
                  width={350}
                  minWidth={column.columnwidth}
                  allowDragging={false}
                  allowResizing={true}
                  isReadOnly={true}
                  fixed
                >
                  <FlexGridCellTemplate
                    on
                    cellType="Cell"
                    template={(ctx) => {
                      console.log(ctx.item);
                      const dataIndex = column.displayapiname.toLowerCase();
                      const fullName = ctx?.item[dataIndex];
                      const words = fullName && fullName.split(" ");
                      const startWithLetter = words ? words[0].charAt(0) : "";
                      const RowData = ctx.item;
                      console.log(ctx);
                      const TransactionID = ctx.item.id;
                      const endWithLetter =
                        words && words.length > 1
                          ? words[words.length - 1].charAt(0)
                          : "";

                      return (
                        <>
                          <div className="name-td without-link new-name-td with-action-1">
                            <a
                              style={{ textDecoration: "none" }}
                              // onClick={() => HandlePostLeadID(UserLeadID)}
                            >
                              <div className="name-detail">
                                {column.istitle === true && (
                                  <span>
                                    {startWithLetter}
                                    {endWithLetter}
                                  </span>
                                )}
                                <p title={fullName}>{fullName}</p>
                              </div>
                            </a>
                            <div className="action with-action-1">
                              {/* <span
                                title="Edit SubTask"
                                onClick={() => {
                                  setsubtaskshow(true);
                                  // setEditTaskshow(true);
                                  // setistageditedEditTask(false);
                                  // setUpdateselectedTagItemEdit([]);
                                  UpdateRowData(RowData, TransactionID);
                                }}
                              >
                                <BiSolidEditAlt />
                              </span> */}
                            </div>
                            {/* <div className="action">
                            <span>
                              <MdSms />
                            </span>
                            <span>
                              <IoCallSharp />
                            </span>
                            <span>
                              <BiSolidEditAlt />
                            </span>
                            <span>
                              <RiDeleteBin6Line />
                            </span>
                          </div> */}
                          </div>
                        </>
                      );
                    }}
                  />
                </FlexGridColumn>
              ) : (
                <FlexGridColumn
                  key={column.id}
                  binding={column.displayapiname.toLowerCase()}
                  header={column.name}
                  width={column.columnwidth}
                  minWidth={column.columnwidth}
                  visible={column.visible}
                  allowSorting={!nonSortableColumns.includes(column.api_name)}
                  allowResizing={true}
                  isReadOnly={true}
                  fixed
                >
                  <FlexGridCellTemplate
                    on
                    cellType="Cell"
                    template={(ctx) => {
                      // console.log(ctx);
                      let gridvalue = "";
                      let properDateFormat = "";
                      if (
                        column.isdate === true &&
                        column.api_name == "utbl_Workitem_column30"
                      ) {
                        const dataIndex = column.displayapiname?.toLowerCase();
                        const dateVal = ctx?.item[dataIndex];

                        if (dateVal !== "" && dateVal !== "-") {
                          console.log(dateVal);
                          properDateFormat = moment(
                            dateVal,
                            "MM/DD/YYYY h:mm:ss A"
                          ).format("MM/DD/YYYY");
                          // properDateFormat = format(dateVal, "MM/dd/yyyy");
                        }
                      }

                      if (column.api_name == "column2") {
                        const dataIndex = column.displayapiname?.toLowerCase();
                        const dateVal = ctx?.item[dataIndex];

                        if (dateVal !== "" && dateVal !== "-") {
                          console.log(dateVal);
                          properDateFormat =
                            convertMinutesToHoursAndMinutes(dateVal);
                          // properDateFormat = format(dateVal, "MM/dd/yyyy");
                        }
                      } else {
                        const dataIndex = column.displayapiname?.toLowerCase();
                        gridvalue = ctx?.item[dataIndex];
                      }

                      //  console.log(properDateFormat);
                      // console.log(gridvalue);
                      return (
                        <>
                          <span>
                            {" "}
                            {properDateFormat
                              ? properDateFormat
                              : gridvalue?.length === 0
                                ? "-"
                                : gridvalue}
                          </span>
                        </>
                      );
                      //  }
                    }}
                  />
                </FlexGridColumn>
              )
            )}
          </FlexGrid>
        )}
      </div>
    </>
  );
};
