/* eslint-disable react/prop-types */
import { useEffect, useState, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate,
} from "@grapecity/wijmo.react.grid";
import { FlexGridDetail } from "@grapecity/wijmo.react.grid.detail";
import { CollectionView } from "@grapecity/wijmo";
import { useNavigate } from "react-router-dom";
import { get360EntityInfo } from "@/redux/360Details/Get360EntityInfo";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import {
  GetFormFields,
  resetFormFields,
} from "@/redux/GetFormFields/GetFormFields";
import ListPageTableLoading, {
  SubtaskGridLoading,
} from "@/modules/loading-skeleton/listpage-table-loading";
import EditTask from "./components/Update/EditTask";
import { BiSolidEditAlt } from "react-icons/bi";
import { GetDefaultTaskInputs } from "@/redux/Task/AddTask/GetDefaultTaskInputs";
import { EditCell } from "@/components/ExecutionComp/Wijmo/EditCell";
import { getlookupdetails } from "@/redux/getlookupdetails/getlookupdetails";
import {
  getupdatelookupdetails,
  resetstatus,
} from "@/redux/getlookupdetails/getUpdateLookupDetails";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { PiInfoBold } from "react-icons/pi";
import { UpdateMasterTaskData } from "@/redux/Journey/AddTask/UpdateMasterTask";
import { CellEditV2 } from "@/components/ExecutionComp/Wijmo/EditCell";
import {
  resetsubTaskDatas,
  // resetstatus as ResetupdateTask,
} from "@/redux/Execution/UpdateSubtask/UpdatesubtaskAPI";
import moment from "moment";
import {
  sortColumn,
  updateColumnSeq,
  updatedNewLayout,
  editcell,
  // getTransactionID,
} from "@/redux/Journey/actions";
import { masterDataInfo } from "@/redux/Journey/selector";
import { FaRegEdit } from "react-icons/fa";

import { API_TEST_URL } from "@/config/serverApiConfig";
import { ImNotification } from "react-icons/im";
import { IoReloadCircleOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import Updatesubtask from "@/modules/TaskModule/components/Updatesubtask/Updatesubtask";
import { ArcSuccess } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";
import { SelectedRowContext } from "@/context/SelectedRow/SelectedRowContext";

// ~ Dataset Features
import { setNewDatasetID as setNewTaskDatasetID } from "@/redux/Task/actions";
import { savedDatasetidInfo as TaskSavedDatasetidInfo } from "@/redux/Task/selector";
import { setNewDatasetID as setNewExecutionDatasetID } from "@/redux/Execution/actions";
import { savedDatasetidInfo as ExecutionSavedDatasetidInfo } from "@/redux/Execution/selector";
import { setNewDatasetID as setNewPlanDatasetID } from "@/redux/Plan/actions";
import { savedDatasetidInfo as PlanSavedDatasetidInfo } from "@/redux/Plan/selector";
import { setNewDatasetID as setNewProjectDatasetID } from "@/redux/Project/actions";
import { savedDatasetidInfo as ProjectSavedDatasetidInfo } from "@/redux/Project/selector";
import { setNewDatasetID as setNewFollowupDatasetID } from "@/redux/Followup/actions";
import { savedDatasetidInfo as FollowupSavedDatasetidInfo } from "@/redux/Followup/selector";
import { setNewDatasetID as setNewReportDatasetID } from "@/redux/Report/actions";
import { savedDatasetidInfo as ReportSavedDatasetidInfo } from "@/redux/Report/selector";
import { setNewDatasetID as setNewTagDatasetID } from "@/redux/Tag/actions";
import { savedDatasetidInfo as TagSavedDatasetidInfo } from "@/redux/Tag/selector";

// ~ Dataset Features
// ! Import
const WijmoFlexgrid = ({ loading, tableData, sortedColumns }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rowDetailRef = useRef(null);
  const rowDetailControlRef = useRef(null);
  const { JourneyIsGrouping } = useContext(ArcGlobalContextProvider);
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  const [collectionView, setCollectionView] = useState("");
  const [columnSequence, setColumnSequence] = useState([]);
  const [newLayout, setNewLayout] = useState([]);
  const [SelectedRow, setSelectedRow] = useState();
  const [istagedited, setistagedited] = useState(false);
  const [istageditedEditTask, setistageditedEditTask] = useState(false);
  const [subtaskshow, setsubtaskshow] = useState(false);
  const [SelectedsubtaskRow, setSelectedsubtaskRow] = useState([]);
  // ~ Dataset Features
  const TasksavedDatasetid = useSelector(TaskSavedDatasetidInfo);
  const ExecutionsavedDatasetid = useSelector(ExecutionSavedDatasetidInfo);
  const PlansavedDatasetid = useSelector(PlanSavedDatasetidInfo);
  const ProjectsavedDatasetid = useSelector(ProjectSavedDatasetidInfo);
  const FollowupsavedDatasetid = useSelector(FollowupSavedDatasetidInfo);
  const ReportsavedDatasetid = useSelector(ReportSavedDatasetidInfo);
  const TagsavedDatasetid = useSelector(TagSavedDatasetidInfo);
  // ~ Dataset Features
  // * Popup State
  const [EditTaskshow, setEditTaskshow] = useState(false);
  const masterData = useSelector(masterDataInfo);
  // * Popup State
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  console.log(tableData);
  console.log(sortedColumns);
  useEffect(() => {
    removeWijimoLicense();
    initialized();
  }, [tableData, sortedColumns]);

  useEffect(() => {
    if (columnSequence.length > 0) {
      console.log("columnSequence updated:", columnSequence);
      dispatch(updateColumnSeq(columnSequence));
    }
  }, [columnSequence]);

  useEffect(() => {
    if (newLayout.length > 0) {
      console.log("newLayout:", newLayout);
      dispatch(updatedNewLayout(newLayout));
    }
  }, [newLayout]);

  const consoleErr = console.error;
  const SUPPRESSED_WARNINGS = [
    "Warning: flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.",
  ];
  console.error = function filterWarnings(msg, ...args) {
    if (!SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) {
      consoleErr(msg, ...args);
    }
  };
  function initialized() {
    // if (collectionView) {
    //   CollectionView.clear();
    // }
    if (tableData && tableData.length > 0) {
      console.log(tableData);
      const filteredData = tableData?.map((row) => {
        const filteredRow = {};
        console.log(sortedColumns);
        console.log(row);
        sortedColumns?.forEach((column) => {
          const dataIndex = column.displayapiname?.toLowerCase();
          console.log(dataIndex);
          const lowercaseRow = Object.keys(row).reduce((acc, key) => {
            acc[key.toLowerCase()] = row[key];
            return acc;
          }, {});
          // const dataIndex = column.api_name;
          if (lowercaseRow.hasOwnProperty(dataIndex)) {
            console.log("it runs");
            filteredRow[dataIndex] = lowercaseRow[dataIndex];
          }
        });
        console.log(filteredRow);
        return filteredRow;
      });
      console.log(filteredData);
      // if (filteredData.length > 0) {
      //   const newCollectionView = new CollectionView(filteredData);
      //   setCollectionView(newCollectionView);
      // }
      const nonEmptyData = filteredData.filter(
        (data) => Object.keys(data).length > 0
      );
      console.log(nonEmptyData);
      if (nonEmptyData.length > 0) {
        const newCollectionView = new CollectionView(nonEmptyData);
        setCollectionView(newCollectionView);
      }
    } else {
      const emptyData = [];
      const newCollectionView = new CollectionView(emptyData);
      setCollectionView(newCollectionView);
    }
    //const newCollectionView = new CollectionView(filteredData);
    // setCollectionView(newCollectionView);
    var _a;
    rowDetailControlRef.current =
      (_a = rowDetailRef.current) === null || _a === void 0
        ? void 0
        : _a.control;
  }
  console.log(collectionView);

  function convertMinutesToHoursAndMinutes(minutes) {
    const hours = Math.floor(minutes / 60); // Get whole hours
    const remainingMinutes = minutes % 60; // Get the remaining minutes

    if (remainingMinutes === 0) {
      return hours !== 0 ? `${hours} h` : "-"; // Only display hours if no minutes
    } else {
      return hours !== 0
        ? `${hours} h ${remainingMinutes} min`
        : `${remainingMinutes} min`; // Display both hours and minutes
    }
  }
  const isDetailAvailable = (row) => {
    var _a;
    return (_a = rowDetailControlRef.current) === null || _a === void 0
      ? void 0
      : _a.isDetailAvailable(row);
  };
  const isDetailVisible = (row) => {
    var _a;
    return (_a = rowDetailControlRef.current) === null || _a === void 0
      ? void 0
      : _a.isDetailVisible(row);
  };
  const hideDetail = (row) => {
    var _a;
    return (_a = rowDetailControlRef.current) === null || _a === void 0
      ? void 0
      : _a.hideDetail(row);
  };
  const showDetail = (row) => {
    var _a;
    return (_a = rowDetailControlRef.current) === null || _a === void 0
      ? void 0
      : _a.showDetail(row, true);
  };

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

  const newColumnLayout = (flexgrid) => {
    const layout = [];
    flexgrid?.columns.forEach((col) => {
      if (col.width != null) {
        layout.push({
          displayapiname: col.binding,
          columnsequence: col.index + 1,
          columnwidth: col.width,
        });
      }
    });
    setNewLayout(layout);
  };

  const updateColumnData = (flexgrid) => {
    const sequence = [];

    flexgrid?.columns.forEach((col) => {
      if (col.width != null) {
        sequence.push({
          displayapiname: col.binding,
          columnsequence: col.index + 1,
          columnwidth: col.width,
        });
      }
    });
    setColumnSequence(sequence);
  };

  //  ~ Redirect with Dataset
  const entityMapping = {
    Task: {
      SavedId: TasksavedDatasetid,
      navigatepath: "/task",
      setNewID: setNewTaskDatasetID,
    },
    PlanViewer: {
      SavedId: ExecutionsavedDatasetid,
      navigatepath: "/execution",
      setNewID: setNewExecutionDatasetID,
    },
    Plan: {
      SavedId: PlansavedDatasetid,
      navigatepath: "/plan",
      setNewID: setNewPlanDatasetID,
    },
    Project: {
      SavedId: ProjectsavedDatasetid,
      navigatepath: "/project",
      setNewID: setNewProjectDatasetID,
    },
    Followup: {
      SavedId: FollowupsavedDatasetid,
      navigatepath: "/followup",
      setNewID: setNewFollowupDatasetID,
    },
    Report: {
      SavedId: ReportsavedDatasetid,
      navigatepath: "/report",
      setNewID: setNewReportDatasetID,
    },
    Tag: {
      SavedId: TagsavedDatasetid,
      navigatepath: "/tag",
      setNewID: setNewTagDatasetID,
    },
  };

  const RedirectwithDataset = (datasetId, path) => {
    const { SavedId, navigatepath, setNewID } =
      entityMapping[path === "Plan Viewer" ? "PlanViewer" : path] || {};
    console.log(SavedId, navigatepath, setNewID);

    if (datasetId && path) {
      if (datasetId === SavedId) {
        console.log("Same dataSetID received, exiting");
        navigate(navigatepath);
      }

      dispatch(setNewID(datasetId));
      navigate(navigatepath); // Navigate to the correct path
    } else {
      console.log("Invalid datasetId or path");
    }
  };

  //  ~ Redirect with Dataset

  const HandlePostLeadID = (TransactionID) => {
    console.log("Current EntityID: " + TransactionID);

    // Store leadID in sessionStorage
    sessionStorage.setItem("Current_EntityID", TransactionID);

    // Dispatch the Redux thunk with the leadID
    dispatch(get360EntityInfo({ TransactionID, previousPathName }));
    //dispatch(getTransactionID(TransactionID));

    // Navigate to the desired route
    navigate("/360detail_v4");
  };

  const GetAddForm = (formid) => {
    // dispatch(resetFormFields());
    dispatch(GetFormFields(formid));
  };
  const UpdateRowData = (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("TransactionID:", TransactionID);
    // Update the selected row state
    setSelectedRow(RowData);
    const formid = "8EC23FBD-FB89-437E-8629-62E5EC2613E9";
    GetAddForm(formid);
    // Prepare the data object in the required format
    const requestData = {
      transactionid: TransactionID,
      formid: formid,
    };
    dispatch(GetDefaultTaskInputs(requestData));
  };

  const UpdatesubtaskRowData = (RowData) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    // console.log("TransactionID:", TransactionID);
    // Update the selected row state
    setSelectedsubtaskRow(RowData);

    // dispatch(GetDefaultTaskInputs(TransactionID));
  };
  console.log(SelectedRow);
  const sortingColumn = (sender, args) => {
    const columnIndex = args.col;
    const dataIndex = sender.columns[columnIndex].binding;
    console.log("Clicked column dataindex:", dataIndex);

    dispatch(sortColumn(dataIndex));
  };

  const draggedColumn = (s, e) => {
    setTimeout(() => {
      updateColumnData(s);
    }, 0);
  };

  const resizedColumn = (s, e) => {
    setTimeout(() => {
      updateColumnData(s);
    }, 0);
  };
  const updatedView = (s, e) => {
    setTimeout(() => {
      newColumnLayout(s);
    }, 0);
  };

  // ! inline edit

  const handleSave = (row_data, col_data, selectedValue) => {
    const transactionid = row_data.id;
    const attributedatatype = col_data.attrtype;
    const listconfigid = col_data.id;
    const apiname = col_data.api_name;
    const value = selectedValue;

    console.log(transactionid);
    console.log(attributedatatype);
    console.log(listconfigid);
    console.log(apiname);
    console.log(value);
    dispatch(
      editcell(transactionid, attributedatatype, listconfigid, apiname, value)
    );
  };

  const handleSaveTag = (row_data, col_data, selectedValue) => {
    const transactionid = row_data.id;
    const requestData = {
      entityid: "26B84156-CC30-416E-99D5-B37409B4D0BD",
      transactionid: transactionid,
      userid: loggedUserId,
      data: [],
      tag: selectedValue,
      istagedited: istagedited,
    };
    dispatch(UpdateMasterTaskData(requestData));
  };

  const [UpdateselectedTagItemEdit, setUpdateselectedTagItemEdit] = useState(
    []
  );

  // ! Autocomplete Tag Update start
  const [UpdateselectedTagItem, setUpdateselectedTagItem] = useState([]);
  // Fetch lookup details
  const fetchUpdateLookupDetailsData = (
    query,
    page,
    limit,
    transactionId,
    IsDefault
  ) => {
    const requestData = {
      entityId: "26B84156-CC30-416E-99D5-B37409B4D0BD",
      lookupId: "18A0DE1A-86BC-4733-B4DE-129CC6C360EF",
      transactionId: transactionId,
      IsDefaultValueNeeded: IsDefault,
      limit: limit.toString(),
      page: page.toString(),
      q: query,
    };
    dispatch(getupdatelookupdetails(requestData));
  };
  const getUpdatetagData = useSelector(
    (state) => state.getupdatelookupdetailsState.response?.result?.data
  );
  const UpdatesubtaskStatus = useSelector(
    (state) => state.UpdatesubtaskAPIstate.DefaultFormValues?.result?.response
  );
  // const status = useSelector((state) => state.UpdatesubtaskAPIstate.status);
  // Close the popup and notify when the status is successful
  console.log("UpdatesubtaskStatus:", UpdatesubtaskStatus);
  // console.log("Status:", status);

  // useEffect(() => {
  //   console.log("Inside useEffect, status:", status);

  // //   if (status === "successful") {
  // //     console.log("Status is successful, closing popup...");
  // //     setEditTaskshow(false);
  // //     // Show a success notification
  // //     ArcSuccess({
  // //       Message: "SubWorkitem Updated",
  // //       position: "top-center",
  // //     });
  // //   }
  // // }, [status]);
  // ! Autocomplete Tag Update End

  // ~ Inline Edit Version 2 ~ //
  const [showEditBox, setShowEditBox] = useState(false);
  const [InlineEditControl, setInlineEditControl] = useState({});
  const { setEditTaskShow } = useContext(SelectedRowContext);
  const HandleEditClick = (InlineEditInput) => {
    setInlineEditControl(InlineEditInput);
    setistagedited(false);
    // dispatch(resetstatus());
    setUpdateselectedTagItem([]);
    let query = "";
    let page = 1;
    let limit = 10;
    let transactionId = InlineEditInput.row_data?.id;
    let IsDefault = true;
    fetchUpdateLookupDetailsData(query, page, limit, transactionId, IsDefault);
    setShowEditBox(true);
  };
  console.log(InlineEditControl);
  console.log();
  const [showEditBoxPosition, setshowEditBoxPosition] = useState({
    XLeft: "0",
    XRight: "0",
    YTop: "0",
    YBottom: "0",
    ClassName: "defaultHeight",
  });

  const ShowCellEditBox = (event) => {
    const parentDivButton = event.target.closest(".wj-cell");
    if (parentDivButton) {
      const rect = parentDivButton.getBoundingClientRect();
      const XLeft = rect.left;
      const YTop = rect.top;
      const XRight = rect.right;
      const YBottom = rect.bottom;

      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      const conditionValueHeight = viewportHeight - 320;
      const conditionValueWidth = viewportWidth - 280;

      console.log(conditionValueHeight, conditionValueWidth);

      const className = `${
        YTop >= conditionValueHeight ? "enlargedHeight" : "defaultHeight"
      } ${XLeft >= conditionValueWidth ? "enlargedWidth" : "defaultWidth"}`;

      setshowEditBoxPosition({
        XLeft: XLeft,
        XRight: XRight,
        YTop: YTop,
        YBottom: YBottom,
        ClassName: className,
      });

      console.log(showEditBoxPosition);
    } else {
      console.log("Parent div not found");
    }
  };
  // ~ Inline Edit Version 2 ~ //

  //subtasks

  const staticProducts = [
    {
      SubTaskName: "Test",
      id: "bc195f41-820a-47a9-93ff-0a093320fe60",
      Resource: "Annamalai",
      ClosedOn: "23/7/2024",
      Status: "Active",
    },
    {
      SubTaskName: "Test1",
      id: "bc195f41-820a-47a9-93ff-0a093320fe60",
      Resource: "Annamalai",
      ClosedOn: "23/7/2024",
      Status: "Active",
    },
    {
      SubTaskName: "Test 2",
      id: "bc195f41-820a-47a9-93ff-0a093320fe60",
      Resource: "Annamalai",
      ClosedOn: "23/7/2024",
      Status: "Active",
    },
    {
      SubTaskName: "Test 3",
      id: "bc195f41-820a-47a9-93ff-0a093320fe6",
      Resource: "Annamalai",
      ClosedOn: "23/7/2024",
      Status: "Active",
    },
    // Add more products as needed
  ];

  const [dataForGrid, setDataForGrid] = useState([]);
  const [loadingData, setloadingData] = useState([]);
  const [SelectedRowId, setSelectedRowId] = useState(null);
  const catToProductMapRef = useRef(new Map());
  const [dataForGrid2, setDataForGrid2] = useState([]);
  const [transRowId, setTransRowId] = useState("");

  console.log(catToProductMapRef);
  console.log(dataForGrid2);
  console.log(dataForGrid);

  const getResponse = async (categoryID) => {
    const response = await fetch(
      API_TEST_URL +
        `/planexecution/getplanexec360tasklist?workitemid=${categoryID}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        //   body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  };

  useEffect(() => {
    async function getUpdatedSubData() {
      if (UpdatesubtaskStatus === "SubTask Updated successfully.") {
        console.log(transRowId);
        if (transRowId) {
          console.log(transRowId);
          const updatedData = await getResponse(transRowId);
          const dataforBind = await updatedData?.result?.data;
          console.log(dataForGrid);
          console.log(dataforBind);
          setDataForGrid((prev) => ({ ...prev, [transRowId]: dataforBind }));

          setDataForGrid2(dataforBind);

          // dataForGrid[]
          console.log(dataforBind);
        }
      }
    }
    getUpdatedSubData();
  }, [UpdatesubtaskStatus]);

  const getProducts = async (categoryID) => {
    try {
      setloadingData((prev) => ({ ...prev, [categoryID]: true }));
      let categoryProducts = catToProductMapRef.current.get(categoryID);

      if (!categoryProducts) {
        const response = await getResponse(categoryID);
        categoryProducts = response?.result?.data || [];
        catToProductMapRef.current.set(categoryID, categoryProducts);
      }

      setDataForGrid((prev) => ({ ...prev, [categoryID]: categoryProducts }));
      setloadingData((prev) => ({ ...prev, [categoryID]: false }));
      setDataForGrid2(categoryProducts);
      setTransRowId(categoryID);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setloadingData((prev) => ({ ...prev, [categoryID]: false }));
    }
  };

  // if (UpdatesubtaskStatus === "SubTask Updated successfully.") {
  //   console.log(UpdatesubtaskStatus);
  //   console.log(SelectedRowId);

  //   getProducts(SelectedRowId);

  //   dispatch(ResetupdateTask());
  // }

  // const UpdateSubtaskRowData = (rowData) => {
  //   // Assuming this function will update the subtask and return a promise
  //   // Update subtask and then trigger a re-fetch of grid data
  //   updateSubtask(rowData).then(() => {
  //     setsubtaskshow(false);
  //     // Assuming fetchData is the function to reload or refetch grid data
  //     fetchData();
  //   });
  // };
  console.log(dataForGrid);
  const renderDetail = (ctx) => {
    const rowId = ctx.item?.id;

    if (!rowId) {
      console.warn("Row ID is missing or undefined");
      return null;
    }

    if (!dataForGrid[rowId] && !loadingData[rowId]) {
      getProducts(rowId);
    }
    const items = Array.isArray(dataForGrid[rowId]) ? dataForGrid[rowId] : [];
    console.log(items);
    return (
      <>
        {/* {items?.length === 0 ? (
          <p className="no-subtask-found">
            <ImNotification /> Not Found
          </p>
        ) : (
          
        )} */}
        {!loadingData[rowId] && (
          <FlexGrid
            autoGenerateColumns={false}
            isReadOnly
            itemsSource={items || []}
            className="sub-task-datas"
            headersVisibility="Column"
            // style={{ height: "auto" }}
            // selectionMode="None"
          >
            <FlexGridColumn
              header="SubTask Name"
              binding="utbl_SubWorkitem_column16"
              width={350}
              minWidth={200}
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
                  const fullName = ctx?.item.utbl_SubWorkitem_column16;
                  const words = fullName && fullName.split(" ");
                  const startWithLetter = words ? words[0].charAt(0) : "";
                  const endWithLetter =
                    words && words.length > 1
                      ? words[words.length - 1].charAt(0)
                      : "";
                  const RowData = ctx.item;
                  // setSelectedsubtaskRow(ctx.item);

                  return (
                    <>
                      <div className={`name-td  new-name-td  with-action-1`}>
                        <a style={{ textDecoration: "none" }}>
                          <div className="name-detail subtask">
                            <span>
                              {startWithLetter}
                              {endWithLetter}
                            </span>

                            <p title={fullName} className="subtask-title">
                              {fullName}
                            </p>
                          </div>
                        </a>
                        <div className="action with-action-1">
                          <span
                            title="Edit SubTask"
                            onClick={() => {
                              setsubtaskshow(true);

                              dispatch(resetsubTaskDatas());
                              // setEditTaskshow(true);
                              // setistageditedEditTask(false);
                              // setUpdateselectedTagItemEdit([]);
                              UpdatesubtaskRowData(RowData);
                            }}
                          >
                            <BiSolidEditAlt />
                          </span>
                        </div>
                      </div>
                    </>
                  );
                }}
              />
            </FlexGridColumn>
            <FlexGridColumn
              header="Execution Date"
              binding="utbl_SubWorkitem_column30"
            />
            <FlexGridColumn
              header="Resource"
              binding="utbl_SubWorkitem_column4_text"
            />
            <FlexGridColumn
              header="Closed On"
              binding="utbl_SubWorkitem_column31"
            />
            <FlexGridColumn
              header="Spent Hour"
              binding="utbl_SubWorkitem_column2"
            />
            <FlexGridColumn
              header="Status"
              binding="utbl_SubWorkitem_column3_text"
            />
          </FlexGrid>
        )}
      </>
    );
  };

  console.log(collectionView.items);
  return (
    <>
      {console.log(SelectedsubtaskRow)}

      <Updatesubtask
        show={subtaskshow}
        setShow={setsubtaskshow}
        SelectedRow={SelectedsubtaskRow}
      />
      <EditTask
        show={EditTaskshow}
        setShow={setEditTaskshow}
        SelectedRow={SelectedRow}
        UpdateselectedTagItem={UpdateselectedTagItemEdit}
        setUpdateselectedTagItem={setUpdateselectedTagItemEdit}
        istagedited={istageditedEditTask}
        setistagedited={setistageditedEditTask}
      />

      <CellEditV2
        showEditBox={showEditBox}
        setShowEditBox={setShowEditBox}
        showEditBoxPosition={showEditBoxPosition}
        InlineEditControl={InlineEditControl}
        masterdata={masterData}
        handleSave={handleSave}
        handleSaveTag={handleSaveTag}
        UpdateselectedTagItem={UpdateselectedTagItem}
        setUpdateselectedTagItem={setUpdateselectedTagItem}
        fetchUpdateLookupDetailsData={fetchUpdateLookupDetailsData}
        getUpdatetagData={getUpdatetagData}
        setistagedited={setistagedited}
      />

      {loading ? (
        <ListPageTableLoading />
      ) : (
        <FlexGrid
          autoRowHeights={true}
          deferResizing={true}
          frozenColumns={1}
          itemsSource={collectionView ? collectionView.items : null}
          allowSorting={true}
          autoGenerateColumns={false}
          className={`list-data-table ${
            JourneyIsGrouping ? "is-grouping" : null
          }`}
          headersVisibility="Column"
          initialized={initialized}
          sortingColumn={sortingColumn}
          draggedColumn={draggedColumn}
          resizedColumn={resizedColumn}
          updatedView={updatedView}
          selectionMode="None"
          // headersVisibility="Column"
        >
          {console.log(sortedColumns, "sortedColumns")}
          {sortedColumns.map((column) =>
            column.istitle === true ? (
              <FlexGridColumn
                key={column.id}
                binding={column.displayapiname?.toLowerCase()}
                header={column.name}
                width={column.columnwidth}
                minWidth={300}
                allowDragging={false}
                allowResizing={true}
                isReadOnly={true}
                fixed
              >
                <FlexGridCellTemplate
                  on
                  cellType="Cell"
                  template={(ctx) => {
                    console.log(collectionView.items);
                    const dataIndex = column.displayapiname?.toLowerCase();
                    const fullName = ctx?.item[dataIndex];
                    console.log(fullName);

                    const words = fullName && fullName.split(" ");
                    const startWithLetter = words ? words[0].charAt(0) : "";
                    const endWithLetter =
                      words && words.length > 1
                        ? words[words.length - 1].charAt(0)
                        : "";
                    const RowData = ctx.item;
                    console.log(ctx);
                    const TransactionID = ctx.item.id;
                    const datasetId = ctx.item.datasetid;
                    const path = ctx.item.entityname;

                    return (
                      <>
                        <div className="name-td new-name-td with-action-1">
                          {/*   <a href="/360detail_v4" style={{ textDecoration: 'none' }}>*/}
                          <a
                            style={{ textDecoration: "none" }}
                            // onClick={() => HandlePostLeadID(TransactionID)}
                            onClick={() => RedirectwithDataset(datasetId, path)}
                          >
                            <div className="name-detail">
                              <span>
                                {startWithLetter}
                                {endWithLetter}
                              </span>

                              <p title={fullName}>{fullName}</p>
                            </div>
                          </a>
                          <div className="action with-action-1">
                            {/* <span
                              title="Edit Task"
                              onClick={() => {
                                setEditTaskShow(true);
                                setistageditedEditTask(false);
                                setUpdateselectedTagItemEdit([]);
                                UpdateRowData(RowData, TransactionID);
                              }}
                            >
                              <BiSolidEditAlt />
                            </span> */}
                          </div>
                        </div>
                      </>
                    );
                    //  }
                  }}
                />
              </FlexGridColumn>
            ) : (
              <FlexGridColumn
                key={column.id}
                binding={column.displayapiname?.toLowerCase()}
                header={column.name}
                width={column.columnwidth}
                minWidth={110}
                visible={column.visible}
                allowResizing={true}
                isReadOnly={true}
                fixed
                // className={"asc"}
              >
                <FlexGridCellTemplate
                  on
                  cellType="Cell"
                  template={(ctx) => {
                    // console.log(ctx);
                    console.log(ctx?.item);
                    const DataName = column.name;
                    let gridvalue = "";
                    let properDateFormat = "";
                    let TagValues = ctx?.item.tags || [];
                    let EffortValues = ctx?.item.column4 || "";

                    console.log("EffortValues" + EffortValues);

                    const RowId = ctx.item.id;
                    // Parse the JSON string
                    const parsedData = Array.isArray(TagValues)
                      ? TagValues
                      : JSON.parse(TagValues);
                    // Extract the name values
                    const nameValues = parsedData.map((item) => ({
                      name: item.name,
                      color: item.colorcode,
                    }));
                    console.log(nameValues);
                    if (
                      column.isdate === true &&
                      column.api_name !== "workday"
                    ) {
                      const dataIndex = column.displayapiname?.toLowerCase();
                      const dateVal = ctx?.item[dataIndex];

                      if (dateVal !== "") {
                        properDateFormat = moment(
                          dateVal,
                          "MM/DD/YYYY h:mm:ss A"
                        ).format("MM/DD/YYYY");
                      }
                    } else {
                      const dataIndex = column.displayapiname?.toLowerCase();
                      console.log(dataIndex);

                      gridvalue = ctx?.item[dataIndex];
                      console.log(dataIndex + gridvalue);
                    }
                    console.log(nameValues);

                    console.log(ctx);
                    const ActualValue = properDateFormat
                      ? properDateFormat
                      : gridvalue || "-";

                    const InlineEditInput = {
                      value: properDateFormat
                        ? properDateFormat
                        : gridvalue || "",
                      Title: DataName,
                      controltype:
                        column.controltype === null
                          ? ""
                          : column.controltype.toLowerCase(),
                      masterid: column.masterid === null ? "" : column.masterid,
                      row_data: ctx.item,
                      col_data: column,
                    };
                    return (
                      <>
                        {/*  sample className .wjgridcelltext-green & wjgridcelltext-red & wjgridcelltext-black*/}
                        <div
                          className={`name-td new-name-td-default ${
                            column.inlineeditable ? "" : "without-cell-edit"
                          } `}
                        >
                          {column.name === "Tag" ? (
                            <>
                              <GridTemplate nameValues={nameValues} />
                            </>
                          ) : column.name === "# of SubTask" ? (
                            <span
                              className="default-value view-subtask"
                              title={ActualValue}
                            >
                              {/* {!isDetailAvailable(ctx.row) ? (
                                <span className="glyphicon">open</span>
                              ) : null} */}
                              {ActualValue === "-" ? (
                                <>{ActualValue}</>
                              ) : (
                                <>
                                  {ActualValue}
                                  {isDetailAvailable(ctx.row) &&
                                  isDetailVisible(ctx.row) ? (
                                    <p
                                      className="hide"
                                      title="Hide subTask"
                                      onClick={() => hideDetail(ctx.row)}
                                    >
                                      <IoEyeOff />
                                      {/* Hide */}
                                    </p>
                                  ) : null}
                                  {isDetailAvailable(ctx.row) &&
                                  !isDetailVisible(ctx.row) ? (
                                    <p
                                      className="show"
                                      title="Show SubTask"
                                      onClick={() => {
                                        showDetail(ctx.row);
                                        setSelectedRowId(RowId);
                                      }}
                                    >
                                      <IoEye />
                                      {/* Show */}
                                    </p>
                                  ) : null}
                                </>
                              )}
                            </span>
                          ) : column.name === "Effort" ? (
                            <span
                              className="default-value"
                              title={EffortValues}
                            >
                              {EffortValues
                                ? convertMinutesToHoursAndMinutes(EffortValues)
                                : "-"}
                            </span>
                          ) : (
                            <span className="default-value" title={ActualValue}>
                              {ActualValue}
                            </span>
                          )}

                          {column.inlineeditable ? (
                            <>
                              <button
                                className="edit-btn"
                                onClick={(event) => {
                                  ShowCellEditBox(event);
                                  HandleEditClick(InlineEditInput);
                                }}
                              >
                                <FaRegEdit />
                              </button>
                            </>
                          ) : null}
                        </div>
                      </>
                    );
                    //  }
                  }}
                />
              </FlexGridColumn>
            )
          )}
          <FlexGridDetail
            detailVisibilityMode="ExpandSingle"
            ref={rowDetailRef}
            isAnimated
            maxHeight={null}
            template={renderDetail}
          />
        </FlexGrid>
      )}
    </>
  );
};

export default WijmoFlexgrid;

const GridTemplate = ({ nameValues }) => {
  const TagValues = ["High", "Migration", "Rework"];
  const TagValuesnew = ["Business growth", "Approval", "Review"];
  console.log(nameValues);
  return (
    <>
      <span className="default-value with-tag-data d-flex">
        <span className={`wjgridcelltext-d`}>
          {nameValues.slice(0, 2).map((data, index) => (
            <p className={`tag tag-color-${data.color}`} key={index}>
              {data.name}
            </p>
          ))}

          {nameValues.length > 2 && (
            <ArcToolTip
              HoverText={
                <>
                  <p className="title">Tag</p>
                  {nameValues.slice(2).map((data, index) => (
                    <p className={`tags tag-color-${data.color}`} key={index}>
                      {data.name}
                    </p>
                  ))}
                </>
              }
              Tooltipclass={"grid-tooltip withtag-tooltip"}
              BtnName={<p className="tag-count">+{nameValues.length - 2}</p>}
              Placement="left"
              as="i"
            />
          )}
        </span>
      </span>
    </>
  );
};
