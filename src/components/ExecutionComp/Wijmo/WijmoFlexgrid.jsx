/* eslint-disable react/prop-types */
import { useEffect, useState, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_TEST_URL } from "@/config/serverApiConfig";
import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate,
} from "@grapecity/wijmo.react.grid";
import { FlexGridDetail } from "@grapecity/wijmo.react.grid.detail";
import "@grapecity/wijmo.styles/wijmo.css";
import { CollectionView } from "@grapecity/wijmo";
import { useNavigate } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { BiSolidEditAlt } from "react-icons/bi";
import { get360EntityInfo } from "@/redux/360Details/Get360EntityInfo";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import ListPageTableLoading from "@/modules/loading-skeleton/listpage-table-loading";
import UpdateSatus from "./components/Update/UpdateStatus";
import UpdateSession from "./components/Update/UpdateSession";
import SubTaskGrid from "./components/Update/SubTaskGrid";
import AddFollowup from "./components/Update/AddFollowup";
import ExtendPlan from "./components/Update/extend";
import { GetDefaultFormValues } from "@/redux/Execution/UpdateStatus/GetDefaultValues";
import { GetSubTask } from "@/redux/Execution/addSubTask/GetSubTask";
import {
  resetsubTaskDatas,
  // resetstatus as ResetupdateTask,
} from "@/redux/Execution/UpdateSubtask/UpdatesubtaskAPI";
import Updatesubtask from "@/modules/TaskModule/components/Updatesubtask/Updatesubtask";
import {
  EditCell,
  CellEditV2,
} from "@/components/ExecutionComp/Wijmo/EditCell";
// import { fetchFollowupScreenFields } from "@/redux/Execution/AddFollowup/AddFollowupFormFields";
import moment from "moment";
import {
  sortColumn,
  updateColumnSeq,
  updatedNewLayout,
  getTransactionID,
  editcell,
} from "@/redux/Execution/actions";
import { masterDataInfo } from "@/redux/Execution/selector";
import { BiTask } from "react-icons/bi";
import { MdOutlineScreenShare } from "react-icons/md";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import LoginPage from "@/pages/Login";
import { FaRegEdit } from "react-icons/fa";
// ~ Selected Filter
import { ListContext } from "@/modules/ExecutionModule/index";
import { selectedFiltersInfo } from "@/redux/Execution/selector";
// ~ Selected Filter
// ! Import
const WijmoFlexgrid = ({ loading, tableData, sortedColumns }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { entIsGrouping } = useContext(ArcGlobalContextProvider);
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  const [collectionView, setCollectionView] = useState("");
  const [columnSequence, setColumnSequence] = useState([]);
  const [newLayout, setNewLayout] = useState([]);
  const [SelectedRow, setSelectedRow] = useState();
  const rowDetailRef = useRef(null);
  const rowDetailControlRef = useRef(null);
  // const [showEditBoxPosition, setshowEditBoxPosition] = useState({
  //   xLeft: "0",
  //   xRight: "0",
  //   Ytop: "0",
  //   YBottom: "0",
  //   ClassName: "default",
  // });
  // * Popup State
  const [UpdateStatusshow, setUpdateStatusShow] = useState(false);
  const [UpdateSessionshow, setUpdateSessionShow] = useState(false);
  const [AddSubtaskShow, setAddSubtaskShow] = useState(false);
  const [AddFollowShow, setAddFollowShow] = useState(false);
  const [ExtendPlanShow, setExtendPlanShow] = useState(false);
  const masterData = useSelector(masterDataInfo);
  console.log("masterData", masterData);
  // * Popup State
  const AddSubTaskPlanStateStatus = useSelector(
    (state) => state.AddSubTaskPlanState.Status
  );
  console.log(AddSubTaskPlanStateStatus);
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
  // ~ Selected Filter
  const { FilterDropdownShow } = useContext(ListContext);
  const selectedFilters = useSelector(selectedFiltersInfo);
  const selectedFiltersLength = selectedFilters.length;
  // ~ Selected Filter
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
          <span className="extend-followup">
            <HiOutlineDotsVertical />
          </span>
        </OverlayTrigger>
      </>
    );
  };

  function initialized() {
    // if (collectionView) {
    //   CollectionView.clear();
    // }
    if (tableData && tableData.length > 0) {
      const filteredData = tableData?.map((row) => {
        const filteredRow = {};
        sortedColumns?.forEach((column) => {
          const dataIndex = column.displayapiname?.toLowerCase();
          // const dataIndex = column.api_name;
          console.log(dataIndex);
          if (row.hasOwnProperty(dataIndex)) {
            console.log("it runs");
            filteredRow[dataIndex] = row[dataIndex];
            console.log((filteredRow[dataIndex] = row[dataIndex]));
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
  const UpdatesubtaskRowData = (RowData) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    // console.log("TransactionID:", TransactionID);
    // Update the selected row state
    setSelectedsubtaskRow(RowData);

    // dispatch(GetDefaultTaskInputs(TransactionID));
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
  const HandlePostLeadID = (TransactionID) => {
    console.log("Current EntityID: " + TransactionID);

    // Store leadID in sessionStorage
    sessionStorage.setItem("Current_EntityID", TransactionID);

    // Dispatch the Redux thunk with the leadID
    dispatch(get360EntityInfo({ TransactionID, previousPathName }));
    dispatch(getTransactionID(TransactionID));

    // Navigate to the desired route
    navigate("/360detail_v4");
  };

  const UpdateRowData = (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("RowData:", TransactionID);
    // Update the selected row state
    setSelectedRow(RowData);

    dispatch(
      GetDefaultFormValues({
        TransactionId: TransactionID,
        previousPathName: "/exec",
      })
    );
  };
  const GetSubTaskData = (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("RowData:", TransactionID);
    // Update the selected row state
    setSelectedRow(RowData);

    dispatch(GetSubTask(TransactionID));
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
  // useEffect(() => {
  //   const cells = document.querySelectorAll(".wj-cell");
  //   cells.forEach((cell) => {
  //     cell.style.zIndex = "999";
  //   });
  // }, [collectionView.items]);

  // ~ Inline Edit Version 2 ~ //
  const [showEditBox, setShowEditBox] = useState(false);
  const [InlineEditControl, setInlineEditControl] = useState({});
  const HandleEditClick = (InlineEditInput) => {
    setInlineEditControl(InlineEditInput);
  };
  console.log(InlineEditControl);
  const [showEditBoxPosition, setshowEditBoxPosition] = useState({
    XLeft: "0",
    XRight: "0",
    YTop: "0",
    YBottom: "0",
    ClassName: "defaultHeight",
  });

  const ShowCellEditBox = (event) => {
    setShowEditBox(true);

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

  // ~ Sub Task Render
  const UpdatesubtaskStatus = useSelector(
    (state) => state.UpdatesubtaskAPIstate.DefaultFormValues?.result?.response
  );

  const [subtaskshow, setsubtaskshow] = useState(false);
  const [SelectedsubtaskRow, setSelectedsubtaskRow] = useState([]);
  const [dataForGrid, setDataForGrid] = useState([]);
  const [loadingData, setloadingData] = useState([]);
  const [SelectedRowId, setSelectedRowId] = useState(null);
  let catToProductMapRef = useRef(new Map());
  const [dataForGrid2, setDataForGrid2] = useState([]);
  const [transRowId, setTransRowId] = useState("");

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

  console.log(catToProductMapRef);
  console.log(dataForGrid2);
  console.log(dataForGrid);

  const getResponse = async (categoryID) => {
    const response = await fetch(
      API_TEST_URL +
        `/planexecution/getplanexec360tasklist?workitemid=${""}&assignmentid=${categoryID}`,
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
    if (AddSubTaskPlanStateStatus === "successful") {
      setDataForGrid([]);
      catToProductMapRef.current = new Map();
      setloadingData([]);
      setDataForGrid2([]);
    }
  }, [AddSubTaskPlanStateStatus]);
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
              header="Exec Date"
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
  // ~ Sub Task Render

  return (
    <>
      <Updatesubtask
        show={subtaskshow}
        setShow={setsubtaskshow}
        SelectedRow={SelectedsubtaskRow}
      />
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
      <AddFollowup
        show={AddFollowShow}
        setShow={setAddFollowShow}
        SelectedRow={SelectedRow}
      />
      <ExtendPlan
        show={ExtendPlanShow}
        setShow={setExtendPlanShow}
        SelectedRow={SelectedRow}
      />
      {showEditBox && (
        <CellEditV2
          showEditBox={showEditBox}
          setShowEditBox={setShowEditBox}
          showEditBoxPosition={showEditBoxPosition}
          InlineEditControl={InlineEditControl}
          masterdata={masterData}
          handleSave={handleSave}
        />
      )}
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
          className={`list-data-table ${entIsGrouping ? "is-grouping" : null} ${
            FilterDropdownShow && selectedFiltersLength > 0
              ? "show-filter"
              : "hide-filter"
          }`}
          headersVisibility="Column"
          initialized={initialized}
          sortingColumn={sortingColumn}
          draggedColumn={draggedColumn}
          resizedColumn={resizedColumn}
          updatedView={updatedView}
          selectionMode="None"
        >
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
                    //console.log(ctx);
                    const dataIndex = column.displayapiname?.toLowerCase();
                    const DataName = column.name;
                    const fullName = ctx?.item[dataIndex];
                    const words = fullName && fullName.split(" ");
                    const startWithLetter = words ? words[0].charAt(0) : "";
                    const endWithLetter =
                      words && words.length > 1
                        ? words[words.length - 1].charAt(0)
                        : "";
                    const RowData = ctx.item;
                    const TransactionID = ctx.item.id;
                    console.log(RowData);
                    console.log(TransactionID);
                    return (
                      <>
                        <div className="name-td new-name-td with-action-4">
                          {/*   <a href="/360detail_v4" style={{ textDecoration: 'none' }}>*/}

                          <>
                            <a
                              style={{ textDecoration: "none" }}
                              onClick={() => HandlePostLeadID(TransactionID)}
                            >
                              <div className="name-detail">
                                <span>
                                  {startWithLetter}
                                  {endWithLetter}
                                </span>
                                <p title={fullName}>{fullName}</p>
                              </div>
                            </a>
                            <div className="action with-action-4">
                              <span
                                title="Update Status"
                                onClick={() => {
                                  setUpdateStatusShow(true);
                                  UpdateRowData(RowData, TransactionID);
                                  GetSubTaskData(RowData, TransactionID);
                                }}
                              >
                                <MdOutlineSystemUpdateAlt />
                              </span>
                              <span
                                title="Add Sub Task"
                                onClick={() => {
                                  setAddSubtaskShow(true);
                                  UpdateRowData(RowData, TransactionID);
                                  GetSubTaskData(RowData, TransactionID);
                                }}
                              >
                                <BiTask />
                              </span>
                              <span
                                title="Update Session"
                                onClick={() => {
                                  setUpdateSessionShow(true);
                                  UpdateRowData(RowData, TransactionID);
                                }}
                              >
                                <LiaBusinessTimeSolid />
                              </span>

                              <DataMenuBtn
                                RowData={RowData}
                                TransactionID={TransactionID}
                              />
                            </div>
                          </>

                          {/* <EditBox value={fullName} Title={DataName} /> */}
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
                fixed
                isReadOnly={true}
              >
                <FlexGridCellTemplate
                  on
                  cellType="Cell"
                  template={(ctx) => {
                    // console.log(ctx);
                    const DataName = column.name;
                    const RowData = ctx.item;
                    const RowId = ctx.item.id;
                    let gridvalue = "";
                    let properDateFormat = "";
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
                      gridvalue = ctx?.item[dataIndex];
                    }

                    //  console.log(properDateFormat);
                    // console.log(gridvalue);
                    const ActualValue = properDateFormat
                      ? properDateFormat
                      : column.controltype.toLowerCase() === "progressbar"
                        ? ["", "-"].includes(gridvalue)
                          ? "0%"
                          : gridvalue + "%"
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
                          {column.name === "# of SubTask" ? (
                            <span
                              className="default-value view-subtask"
                              title={ActualValue}
                            >
                              {/* {!isDetailAvailable(ctx.row) ? (
      <span className="glyphicon">open</span>
    ) : null} */}
                              {["0", "-"].includes(ActualValue) ? (
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
                                      {/* <IoEyeOff /> */}
                                      {/* Hide */}
                                      {/* <FiMinus /> */}
                                      <FaMinus />
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
                                      {/* <IoEye /> */}
                                      {/* Show */}

                                      <FaPlus />
                                    </p>
                                  ) : null}
                                </>
                              )}
                            </span>
                          ) : (
                            <>
                              <span
                                className="default-value"
                                title={ActualValue}
                              >
                                {ActualValue}
                              </span>

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
                                  {/* <EditCell
                                value={
                                  properDateFormat
                                    ? properDateFormat
                                    : gridvalue || ""
                                }
                                Title={DataName}
                                controltype={
                                  column.controltype === null
                                    ? ""
                                    : column.controltype.toLowerCase()
                                }
                                masterid={
                                  column.masterid === null
                                    ? ""
                                    : column.masterid
                                }
                                row_data={ctx.item}
                                col_data={column}
                                masterdata={masterData}
                                handleSave={handleSave}
                              /> */}
                                </>
                              ) : null}
                            </>
                          )}
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
