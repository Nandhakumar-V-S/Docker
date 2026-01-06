/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect, useContext } from "react";
//? Assets
import Modal from "react-bootstrap/Modal";

//? Components
import moment from "moment";
import Form from "react-bootstrap/Form";
import ListPageTableLoading from "@/modules/loading-skeleton/listpage-table-loading";
import { parseISO, format } from "date-fns";
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import { ArcButtonPrimary } from "@/components/arccomponents/ui-components/ArcButtons/ArcButtons";
import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate,
} from "@grapecity/wijmo.react.grid";
import "@grapecity/wijmo.styles/wijmo.css";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
//? CSS

//? Images

//? JSON File

//? Icons
import { IoSearch } from "react-icons/io5";
import { MdManageSearch, MdOutlineCancel } from "react-icons/md";
import { TbFilterSearch } from "react-icons/tb";
import { request } from "@/request/API/globalrequest";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { totalColumnsInfo } from "@/redux/Task/selector";
import { useSelector } from "react-redux";
import WijmoFlexgrid from "@/components/TaskComp/Wijmo/WijmoFlexgrid";
import AutoCompleteWijmo from "@/components/TaskComp/autotaskcompletewijmo/AutoCompleteWijmo";
import { SelectedRowContext } from "@/context/SelectedRow/SelectedRowContext";
import ArcDataNotFound from "../nodatafound/no-data-found";
import WijmoPagination from "@/components/TaskComp/Wijmo/WijmoPagination";
import { FaSearch } from "react-icons/fa";
// import WijmoFlexgrid from "@/components/Wijmo/WijmoFlexgrid";
// *******~ Import ~******** //
export default function ArcFilterPopup({
  // ArcPopupshow,
  // setArcPopupshow,
  setEditShow,
  setSelectedRow,
  setAddTaskShow,
  // titleFieldValue,
  // setTitleFieldValue,
  selectedRow,
}) {
  // const [ArcFilterPopupshow, setArcFilterPopupshow] = useState(false);
  const [taskData, setTaskData] = useState(false);
  const [autotaskFilterGridLoading, setAutotaskFilterGridLoading] =
    useState(false);
  const { data, totalRecords } = taskData || {};
  const totalColumns = useSelector(totalColumnsInfo);
  const {
    ArcFilterPopupshow,
    setArcFilterPopupshow,
    titleFieldValue,
    setTitleFieldValue,
  } = useContext(SelectedRowContext);
  const handleArcPopupShow = () => {
    setArcFilterPopupshow(true);
    getlistdetails(postRequest);
  };
  useEffect(() => {
    if (ArcFilterPopupshow) {
      getlistdetails(postRequest);
    }
  }, [ArcFilterPopupshow]);

  console.log(selectedRow);

  // const obj = {
  //   filterid: "bb7f219e-d5aa-4aa3-ba78-2b942f6aed03",
  //   apiname: item.apiname,
  //   filtervalue: item.value,
  //   controltype: "textbox",
  //   condition: "OR",
  // };
  // const postRequest = {
  //   entityid: "26B84156-CC30-416E-99D5-B37409B4D0BD",
  //   listid: "0C67EE8D-2E31-4E25-85B2-4AFA61197F3E",
  //   start: 0,
  //   skip: 20,
  //   orderby: "",
  //   orderbydir: "",
  //   loggeduserid: "1016",
  //   sessionid: "",
  //   filterparams: titleFieldValue,
  // };
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const paginationConfig = {
    pageSize,
    currentPage,
    totalLength: totalRecords || 0,
  };
  const postRequest = {
    entityid: "26B84156-CC30-416E-99D5-B37409B4D0BD",
    listid: "0C67EE8D-2E31-4E25-85B2-4AFA61197F3E",
    start: (currentPage - 1) * pageSize,
    skip: pageSize,
    orderby: "",
    orderbydir: "",
    loggeduserid: "1016",
    sessionid: "",
    filterparams: titleFieldValue,
  };

  // const [pageSize, setPageSize] = useState(20);
  // const [currentPage, setCurrentPage] = useState(1);

  // const paginationConfig = {
  //   pageSize,
  //   currentPage,
  //   totalLength: totalRecords || 0,
  // };

  // console.log(listData, "listdata");

  useEffect(() => {
    getlistdetails(postRequest);
  }, [currentPage, pageSize]);

  var sortcolumn = [
    {
      name: "Title",
      visible: true,
      displayapiname: "column16",
      istitle: true,
      isdate: false,
      controltype: "autocomplete",
      masterid: "0",
      inlineeditable: null,
      ismapped: true,
      id: "49c019a4-ff75-4790-aca5-dd9b1d2af81b",
      seqno: 2,
      attrtype: "text",
      api_name: "column16",
      columnwidth: 150,
    },

    {
      name: "Project",
      visible: true,
      displayapiname: "utbl_Workitem_column41_text",
      istitle: false,
      isdate: false,
      controltype: "onclickloaddropdown",
      masterid: "0",
      inlineeditable: null,
      ismapped: true,
      id: "b87fb361-e374-46f2-a823-55f78a8c5ce7",
      seqno: 5,
      attrtype: "Uniqueidentifier",
      api_name: "column41",
      columnwidth: 150,
    },
    {
      name: "Due Date",
      visible: true,
      displayapiname: "column30",
      istitle: false,
      isdate: true,
      controltype: "date",
      masterid: "0",
      inlineeditable: false,
      ismapped: true,
      id: "444a7d82-7367-41c9-8f0d-72978bb08ee3",
      seqno: 6,
      attrtype: "datetime",
      api_name: "column30",
      columnwidth: 150,
    },
    {
      name: "Priority",
      visible: true,
      displayapiname: "utbl_Workitem_column6_text",
      istitle: false,
      isdate: false,
      controltype: "dropdown",
      masterid: "7041",
      inlineeditable: null,
      ismapped: true,
      id: "2013ccac-00d8-495f-a3a0-86e052157258",
      seqno: 7,
      attrtype: "numeric",
      api_name: "column6",
      columnwidth: 150,
    },
    {
      name: "Workitem Type",
      visible: true,
      displayapiname: "column1",
      istitle: false,
      isdate: false,
      controltype: "dropdown",
      masterid: "3060",
      inlineeditable: null,
      ismapped: true,
      id: "2597f94f-c1f1-4b7b-b582-7fe60cb384eb",
      seqno: 8,
      attrtype: "numeric",
      api_name: "column1",
      columnwidth: 150,
    },

    {
      name: "Effort",
      visible: true,
      displayapiname: "column4",
      istitle: false,
      isdate: false,
      controltype: "Textbox_time",
      masterid: "7040",
      inlineeditable: null,
      ismapped: true,
      id: "4925a119-2e54-4a2c-b11e-b4e19f69c619",
      seqno: 10,
      attrtype: "numeric",
      api_name: "column4",
      columnwidth: 150,
    },
    {
      name: "Task Status",
      visible: true,
      displayapiname: "column9",
      istitle: false,
      isdate: false,
      controltype: "dropdown",
      masterid: "4000",
      inlineeditable: null,
      ismapped: true,
      id: "76b1847e-d6c1-4b1f-9c94-2ebd93890b98",
      seqno: 11,
      attrtype: "numeric",
      api_name: "column9",
      columnwidth: 150,
    },
    {
      name: "Task Progress %",
      visible: true,
      displayapiname: "column18",
      istitle: false,
      isdate: false,
      controltype: "Progressbar",
      masterid: "",
      inlineeditable: null,
      ismapped: true,
      id: "36422ccd-89a3-47d4-b31f-9ea4758d8afc",
      seqno: 13,
      attrtype: "text",
      api_name: "column18",
      columnwidth: 150,
    },
    {
      name: "Task Owner",
      visible: true,
      displayapiname: "utbl_Workitem_column10_text",
      istitle: false,
      isdate: false,
      controltype: "onclickloaddropdown",
      masterid: "0",
      inlineeditable: null,
      ismapped: true,
      id: "032271d7-76e0-461e-aa93-1611dc150fd9",
      seqno: 14,
      attrtype: "numeric",
      api_name: "column10",
      columnwidth: 150,
    },
    {
      name: "Resource",
      visible: true,
      displayapiname: "column11",
      istitle: false,
      isdate: false,
      controltype: "onclickloaddropdown",
      masterid: "0",
      inlineeditable: null,
      ismapped: true,
      id: "ee2dd5cf-2dcd-483a-ae6f-237d7bf5c9a4",
      seqno: 15,
      attrtype: "numeric",
      api_name: "column11",
      columnwidth: 150,
    },
    {
      name: "id",
      visible: false,
      displayapiname: "id",
      istitle: false,
      isdate: false,
      controltype: "",
      masterid: "",
      inlineeditable: null,
      ismapped: true,
      id: "c1bf265f-3d4d-48f4-a88c-6ea9b5d82fbd",
      seqno: 99,
      attrtype: "Uniqueidentifier",
      api_name: "id",
      columnwidth: 150,
    },
  ];
  const sortedColumn = sortcolumn
    ?.filter((column) => column.ismapped)
    .sort((a, b) => a.seqno - b.seqno);
  const tableData =
    data?.length > 0 &&
    data?.map((item) => {
      return Object.keys(item).reduce((acc, key) => {
        const lowerCaseKey = key.toLowerCase();
        const spendHoursValue = item["Effort"] || "-";
        if (lowerCaseKey === "column4") {
          acc[lowerCaseKey] = spendHoursValue;
        } else {
          acc[lowerCaseKey] = item[key];
        }
        // acc[key.toLowerCase()] = item[key];
        return acc;
      }, {});
    });

  async function handlefiltersearch() {
    setPageSize(20);
    setCurrentPage(1);
    if (titleFieldValue[0]?.filtervalue === "") {
      const postrequest = { ...postRequest, filterparams: [] };
      await getlistdetails(postrequest);
    } else {
      await getlistdetails(postRequest);
    }
  }

  // function handletaskfilterpopupsearch(e) {
  //   let titleFieldVal = titleFieldValue[0];

  //   titleFieldVal = [{ ...titleFieldVal, filtervalue: e.target.value }];

  //   setTitleFieldValue(titleFieldVal);
  //   if (titleFieldValue[0]?.filtervalue === "") {
  //     const postrequest = { ...postRequest, filterparams: [] };
  //     var response = getlistdetails(postrequest);
  //     setTaskData.length > 0;
  //   }
  // }
  async function handlefilterentersearch(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      setPageSize(20);
      setCurrentPage(1);
      if (titleFieldValue[0]?.filtervalue === "") {
        const postrequest = { ...postRequest, filterparams: [] };
        await getlistdetails(postrequest);
      } else {
        await getlistdetails(postRequest);
      }
    }
  }
  function handletaskfilterpopupsearch(e) {
    // Update the filter value for other key presses (optional)
    let titleFieldVal = titleFieldValue[0];
    titleFieldVal = [{ ...titleFieldVal, filtervalue: e.target.value }];
    setTitleFieldValue(titleFieldVal);
  }
  async function getlistdetails(Request) {
    setAutotaskFilterGridLoading(true);
    const response = await request.post(
      API_TEST_URL,
      "task/gettasklistdetails",
      Request
    );
    if (response) {
      console.log(response);
      const resultdata = await response?.result;

      setTaskData(resultdata);
      setAutotaskFilterGridLoading(false);
    }
    //dispatch(getListdataSuccess(response));
    // dispatch(setLoading(false));
  }
  const handleArcPopupClose = () => setArcFilterPopupshow(false);

  console.log(ArcFilterPopupshow);
  useEffect(() => {
    if (data?.length === 0 || titleFieldValue[0]?.filtervalue === "") {
      setTaskData([]); // Reset data here
    }
  }, [data, titleFieldValue]);
  // useEffect(() => {}, [third]);

  return (
    <>
      {/* <ArcButtonPrimary
        BtnText="Arc Filter Popup"
        OnClick={handleArcPopupShow}
      /> */}

      <Modal
        show={ArcFilterPopupshow}
        onHide={handleArcPopupClose}
        className={`arc-popup-default arc-filter-popup`}
        centered={true}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="popup-body-content">
            <div className="popup-header">
              <h3>
                Search: <span>Task</span>
              </h3>
              {/* <span className="close-btn" onClick={handleArcPopupClose}>
                <MdOutlineCancel />
              </span> */}
              <ArcToolTip
                HoverText="Close"
                BtnName={<MdOutlineCancel />}
                Placement="left"
                className="close-btn"
                as="span"
                onClick={handleArcPopupClose}
              />
            </div>
            <div className="popup-main" style={{ height: "350px" }}>
              {/* <ArcTextBox
                // Label="Search"
                ClassName=""
                Type="text"
                PlaceHolder="Search"
                Name="firstname"
                Required={false}
                ReadOnly={false}
              /> */}
              <div className="search-input">
                <div className="search-input-filter">
                  <div className={`search-input-filter-inside `}>
                    <span>
                      <IoSearch />
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      value={
                        titleFieldValue?.length > 0 &&
                        titleFieldValue[0]?.filtervalue != 0
                          ? titleFieldValue[0]?.filtervalue
                          : ""
                      }
                      onKeyDown={handlefilterentersearch}
                      onChange={handletaskfilterpopupsearch}
                    />
                  </div>
                  <button title="Search" onClick={handlefiltersearch}>
                    {/* <IoSearch /> */}
                    {/* <MdManageSearch /> */}
                    <FaSearch />
                  </button>
                </div>
              </div>
              {/* <GridDataTableFollowups LoadingState={false} data={taskData} /> */}

              <>
                {/* <p>{loading ? "true" : "false"}</p> */}
                {console.log(sortedColumn)}
                {console.log(data)}
                {data?.length > 0 &&
                  titleFieldValue[0]?.filtervalue != "" &&
                  sortedColumn?.length > 0 && (
                    <>
                      <AutoCompleteWijmo
                        // setArcFilterPopupshow={setArcFilterPopupshow}
                        loading={autotaskFilterGridLoading}
                        tableData={data}
                        sortedColumns={sortedColumn}
                        setEditShow={setEditShow}
                        setSelectedRow={setSelectedRow}
                        setAddTaskShow={setAddTaskShow}
                        selectedRow={selectedRow}
                        style={{ height: "300px" }}
                      />
                      <WijmoPagination
                        loading={autotaskFilterGridLoading}
                        paginationConfig={paginationConfig}
                        onPageChange={setCurrentPage}
                        onPageSizeChange={setPageSize}
                      />
                    </>
                  )}

                {/* <WijmoPagination
                  loading={loading}
                  paginationConfig={paginationConfig}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={setPageSize}
                /> */}
                {console.log(data?.length)}
                {data?.length === undefined || data?.length === 0 ? (
                  <ArcDataNotFound />
                ) : null}
              </>
            </div>

            {/* <div className="popup-footer">
              <button className="cancel" onClick={handleArcPopupClose}>
                Cancel
              </button>
              <button>New</button>
            </div> */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

const GridDataTableFollowups = ({ LoadingState, data }) => {
  const GridData = [
    {
      id: "b04515b9-6c78-4e19-88b3-40ae78791a05",
      taskname: "Review of test cases",
      project: "Regroup",
      duedate: "2024-06-04T00:00:00",
      followuptype: "Review",
      workday: "D3",
      workweek: "W23",
      status: "Complete",
      assignedby: "Annamalai",
      assignedto: "Annamalai",
    },
    {
      id: "c23d64a9-9479-4206-a6f5-50e4025ec7e0",
      taskname: "Release Note",
      project: "GS BU",
      duedate: "2024-06-13T00:00:00",
      followuptype: "Review",
      workday: "D5",
      workweek: "W24",
      status: "Complete",
      assignedby: "Annamalai",
      assignedto: "Annamalai",
    },
    {
      id: "f333b412-1034-4fc9-81be-816244c3f44d",
      taskname: "Followup Review Test",
      project: "US BU",
      duedate: "2024-06-18T00:00:00",
      followuptype: "Review",
      workday: "D3",
      workweek: "W25",
      status: "-",
      assignedby: "Annamalai",
      assignedto: "Annamalai",
    },
    {
      id: "c09281e5-f1cf-433d-8aeb-8de23dcb6948",
      taskname: "Followup Planner 3",
      project: "GS BU",
      duedate: "2024-06-15T00:00:00",
      followuptype: "Review",
      workday: "D7",
      workweek: "W24",
      status: "Redo",
      assignedby: "Annamalai",
      assignedto: "Annamalai",
    },
    {
      id: "a1822b04-bcc9-4cca-be78-c4a5e37b7a8d",
      taskname: "New followup",
      project: "Regroup",
      duedate: "2024-05-30T00:00:00",
      followuptype: "Review",
      workday: "D5",
      workweek: "W22",
      status: "-",
      assignedby: "Annamalai",
      assignedto: "Annamalai",
    },
  ];

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
    { header: "Project", binding: "project", width: 150 },
    { header: "Due Date", binding: "duedate", width: 110 },
    { header: "Followup Type", binding: "followuptype", width: 120 },
    { header: "Work Day", binding: "workday", width: 100 },
    { header: "Work Week", binding: "workweek", width: 100 },
    { header: "Status", binding: "status", width: 110 },
    { header: "Assigned By", binding: "assignedby", width: 130 },
    { header: "Assigned To", binding: "assignedto", width: 130 },
  ];
  console.log(GridData);
  return (
    <React.Fragment>
      {LoadingState ? (
        <ListPageTableLoading />
      ) : (
        <FlexGrid
          autoRowHeights={true}
          deferResizing={true}
          frozenColumns={1}
          itemsSource={data || []}
          allowSorting={true}
          className="list-data-table with-360-page"
          headersVisibility="Column"
          selectionMode="None"
        >
          <FlexGridColumn
            allowDragging={false}
            allowResizing={true}
            binding="taskname"
            header="Task Name"
            minWidth={350}
            isReadOnly={true}
            fixed
          >
            <FlexGridCellTemplate
              on
              cellType="Cell"
              template={(ctx) => {
                const fullName = ctx.item.taskname;
                // const RowData = ctx.item;
                // const TransactionID = ctx.item.id;
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
                        <span title="Update Status"></span>
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
                  const GridValue = ctx.item.duedate;
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
                            data.binding === "duedate"
                              ? formattedDate
                              : ActualValue || "-"
                          }
                        >
                          {data.binding === "duedate"
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
