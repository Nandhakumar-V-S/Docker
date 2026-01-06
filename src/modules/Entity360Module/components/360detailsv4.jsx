/* eslint-disable no-inner-declarations */
/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useEffect, useState, useContext, useRef } from "react";
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
import { BiSolidEditAlt } from "react-icons/bi";
import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate,
} from "@grapecity/wijmo.react.grid";
import "@grapecity/wijmo.styles/wijmo.css";
import { MdSms } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {} from "react-icons/bi";
import { IoCallSharp } from "react-icons/io5";
import moment from "moment";
//? Components

import DetailSidebar from "./DetailSidebar";
import { GetLeadInfo } from "@/redux/360Details/LeadInfoSlice";
import { GetEntityGrid } from "@/redux/Entity360/Get360EntityGrid";
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
  att30entityidInfo,
  att360listidInfo,
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
import ListPageTableLoading from "@/modules/loading-skeleton/listpage-table-loading";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import ArcDataNotFound from "@/components/arccomponents/ui-components/nodatafound/no-data-found";
//? Images
import { request } from "@/request/API/globalrequest";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { getMasterDataSuccess } from "@/redux/Execution/actions";
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
import EntityData from "./entity.json";
import TimeLine from "./Timeline";

import UpdateAttributes from "./UpdateAttribute/UpdateAttribute";
import { GetDefaultFormValues } from "@/redux/Entity360/UpdateAttribute360/GetDefaultValues";
// *******~ Import ~******** //

const AllDetails = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const AttributeaddStatus = useSelector(
    (state) => state.arcAddAttribute.status
  );
  const AttributeupdateStatus = useSelector(
    (state) => state.UpdateEntityAttributesStatus.Addstatus
  );
  const entityid = useSelector(att30entityidInfo);
  const listid = useSelector(att360listidInfo);

  const userid = useSelector(useridInfo);
  // const TransactionId = useSelector(TransactionIdInfo);
  const dataSetID = useSelector(newdataSetIDInfo);

  const newTotalcolumn = useSelector(newTotalcolumnInfo);
  const Taskrowdata = useSelector((state) => state.entityGridData.griddata);
  const Rendercount = useSelector((state) => state.entityGridData.rendercount);

  const loadingstatus = useSelector((state) => state.entityGridData.status);

  useEffect(() => {
    if (Rendercount > 1) {
      setLoading(false);
    }
  }, [Rendercount]);

  useEffect(
    () => {
      // if(loadingstatus === "success" ){
      //   setLoading(false)
      // }
      if (
        loadingstatus === "loading..." ||
        AttributeaddStatus === "loading..." ||
        AttributeupdateStatus == "loading..."
      ) {
        setLoading(true);
      }
    },
    [loadingstatus, AttributeaddStatus],
    AttributeupdateStatus
  );
  const sortedColumn = newTotalcolumn?.filter((column) => column.ismapped);

  console.log(Taskrowdata);
  const { data, totalRecords } = Taskrowdata?.result || [];
  // console.log(TransactionId);
  console.log(sortedColumn);
  console.log(data);

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
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  const plantableData = planTaskrowdata?.data?.map((item) => {
    return Object.keys(item).reduce((acc, key) => {
      acc[key.toLowerCase()] = item[key];
      return acc;
    }, {});
  });
  console.log("Current Path Name:", previousPathName);
  const [key, setKey] = useState("attributes");
  // ! selectEntityDetails start
  const selectEntityDetails = (state) => state.attribute.entityDetails;
  const entityDetails = useSelector(selectEntityDetails);
  const entityResults = entityDetails?.result?.data;
  console.log(entityResults);
  const entityResultsData = entityResults && entityResults[0];
  // const TransactionId = entityResultsData?.id;
  const TransactionId = sessionStorage.getItem("Current_EntityID");
  console.log("TransactionId", TransactionId);
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

  useEffect(() => {
    var request_data = "70C75211-155C-45DC-B155-002DBB5CCE91";

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
        setLoading(false);
      }

      getDataset();
    }
  }, [dataSetID, TransactionId, AddSubtaskstatus]);

  // ! plan table start
  // useEffect(() => {
  //   if (planentityid && planlistid && userid) {
  //     async function getnewlistconfigbyid() {
  //       const data = await request.get(
  //         API_TEST_URL,
  //         `arclist/getlistconfigbyid?entityid=${planentityid}&listid=${planlistid}&userid=${userid}`
  //       );
  //       dispatch(getPlanlistfieldsSuccess(data));
  //     }

  //     getnewlistconfigbyid();
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   if (plandataSetID) {
  //     async function getDataset() {
  //       const data = await request.get(
  //         API_TEST_URL,
  //         `dataset/getdatasetfieldinfobyid?datasetid=${plandataSetID}&userid=${userid}`
  //       );
  //       dispatch(getPlanDatasetSuccess(data));

  //     }

  //     //getDataset();
  //   }
  // }, [plandataSetID, TransactionId]);
  // ! plan table start

  useEffect(() => {
    if (
      SelectedentityId !== "" ||
      AttributeupdateStatus == "successful" ||
      AttributeaddStatus == "success"
    ) {
      dispatch(GetEntityGrid(requestData)); // Dispatch the thunk to fetch data
    }
  }, [SelectedentityId, AttributeaddStatus, AttributeupdateStatus]);

  useEffect(() => {
    if (AttributeupdateStatus === "successful") {
      dispatch(GetEntityGrid(requestData)); // Dispatch the thunk to fetch data
    }
  }, [AttributeupdateStatus]);

  console.log(status);
  console.log(leadDetails);
  console.log(SelectedentityId);
  console.log(plantableData);
  console.log(plansortedColumn);

  return (
    <>
      <div className="all-details-main">
        <div className="all-details">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className=""
          >
            <Tab eventKey="attributes" title={<>Attributes</>}>
              <GridData
                gridData={tableData}
                SortedColumns={sortedColumn}
                loading={loading}
              />
              {tableData?.length === 0 ? <ArcDataNotFound /> : null}
            </Tab>
          </Tabs>
        </div>
        <DetailSidebar />
      </div>
    </>
  );
};
export default AllDetails;

const formatValue = (value, apiName) => {
  if (!value || value.length === 0) {
    return "-";
  }

  if (apiName === "utbl_Workitem_column30") {
    return moment(value, "MM/DD/YYYY h:mm:ss A").format("DD/MM/YYYY");
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
  const entityResult =
    entityResults && entityResults.length > 0 ? entityResults[0] : null;
  return (
    <>
      <div className="tab-main-content overview">
        <div className="info-box">
          <div className="info-header">
            <h4>Task Information</h4>
            {/* <button>
              <RiEdit2Line /> Edit
            </button> */}
          </div>
          {/* <pre>{JSON.stringify(EntityData?.Generalinfo, null, 2)}</pre> */}
          <ul>
            {console.log(EntityData?.Generalinfo)}
            {console.log(entityResult)}
            {console.log(lead.api_name)}
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

const GridData = ({ gridData, SortedColumns, loading }) => {
  const dispatch = useDispatch();
  const [TableData, setTableData] = useState([]);
  const [SelectedRow, setSelectedRow] = useState(false);
  const [UpdateStatusshow, setUpdateStatusShow] = useState(false);

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
  const UpdateRowData = (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("RowData:", TransactionID);
    // Update the selected row state
    setSelectedRow(RowData);
    // dispatch(GetDefaultFormValues(TransactionID));
  };
  console.log(gridData);
  console.log(TableData);

  console.log(SortedColumns);
  const nonSortableColumns = ["column3"];
  console.log(UpdateStatusshow);
  console.log(SelectedRow);

  return (
    <>
      <UpdateAttributes
        show={UpdateStatusshow}
        setShow={setUpdateStatusShow}
        SelectedRow={SelectedRow}
      />
      {/* <pre>{JSON.stringify(gridData, null, 2)}</pre> */}
      {loading ? (
        <ListPageTableLoading />
      ) : (
        <div className="tab-main-content table-grid-data">
          <FlexGrid
            autoRowHeights={true}
            deferResizing={true}
            frozenColumns={1}
            itemsSource={TableData}
            allowSorting={false}
            className="list-data-table with-360-page"
            headersVisibility="Column"
          >
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
                  visible={column.visible}
                  fixed
                >
                  <FlexGridCellTemplate
                    on
                    cellType="Cell"
                    template={(ctx) => {
                      console.log(ctx);
                      const dataIndex = column.displayapiname.toLowerCase();
                      const cofig = ctx?.item?.issystemfields;
                      console.log(cofig);
                      const fullName = ctx?.item[dataIndex];
                      const words = fullName && fullName.split(" ");
                      const startWithLetter = words ? words[0].charAt(0) : "";
                      const endWithLetter =
                        words && words.length > 1
                          ? words[words.length - 1].charAt(0)
                          : "";
                      const RowData = ctx.item;
                      const AttributeID = ctx.item.id;
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
                              {/* {cofig == "False" ? (
                                <span
                                  title="Update Status"
                                  onClick={() => {
                                    setUpdateStatusShow(true);
                                    UpdateRowData(RowData, AttributeID);
                                  }}
                                >
                                  <BiSolidEditAlt />
                                </span>
                              ) : null} */}
                            </div>
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
                        column.api_name !== "workday"
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
        </div>
      )}
    </>
  );
};
