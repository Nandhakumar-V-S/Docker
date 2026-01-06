/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate,
} from "@grapecity/wijmo.react.grid";
import { CollectionView } from "@grapecity/wijmo";
import { useNavigate } from "react-router-dom";
import { get360EntityInfo } from "@/redux/360Details/Get360EntityInfo";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import ListPageTableLoading from "@/modules/loading-skeleton/listpage-table-loading";
import EditTask from "@/components/TaskComp/Wijmo/components/Update/EditTask";
// import EditTask from "./components/Update/EditTask";
import { BiSolidEditAlt } from "react-icons/bi";
import {
  GetDefaultTaskInputs,
  resetDefaultFormValues,
} from "@/redux/Task/AddTask/GetDefaultTaskInputs";
import {
  CellEditV2,
  EditCell,
} from "@/components/ExecutionComp/Wijmo/EditCell";
// import ProjectTaskList from "./components/tasklist";
import moment from "moment";
import { GoTasklist } from "react-icons/go";
import {
  sortColumn,
  updateColumnSeq,
  updatedNewLayout,
  editcell,
  // getTransactionID,
} from "@/redux/TaskInfo/actions";
import { masterDataInfo } from "@/redux/TaskInfo/selector";
import { getSearch360EntityInfo } from "@/redux/GlobalSearch/GetSearch360EntityInfo";
import {
  getupdatelookupdetails,
  resetstatus,
} from "@/redux/getlookupdetails/getUpdateLookupDetails";
import {
  GetProjectTaskList,
  resetstatus as ResetProjectTaskList,
} from "@/redux/Project/getTaskList/GetTaskList";
import { PiInfoBold } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import {
  GetFormFields,
  resetFormFields,
} from "@/redux/GetFormFields/GetFormFields";
import { SelectedRowContext } from "@/context/SelectedRow/SelectedRowContext";
import { UpdateMasterTaskData } from "@/redux/Task/AddTask/UpdateMasterTask";
// ! Import
const WijmoFlexgrid = ({ loading, tableData, sortedColumns }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskInfoIsGrouping } = useContext(ArcGlobalContextProvider);
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  const [collectionView, setCollectionView] = useState("");
  const [columnSequence, setColumnSequence] = useState([]);
  const [newLayout, setNewLayout] = useState([]);
  const [SelectedRow, setSelectedRow] = useState();
  const [istageditedEditTask, setistageditedEditTask] = useState(false);
  const [istagedited, setistagedited] = useState(false);
  // * Popup State
  // const [EditTaskshow, setEditTaskshow] = useState(false);
  const masterData = useSelector(masterDataInfo);
  // * Popup State
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

  function initialized() {
    // if (collectionView) {
    //   CollectionView.clear();
    // }
    if (tableData && tableData.length > 0) {
      console.log(tableData);
      const filteredData = tableData?.map((row) => {
        const filteredRow = {};
        console.log(row);
        console.log(sortedColumns);
        sortedColumns?.forEach((column) => {
          const dataIndex = column.displayapiname?.toLowerCase();
          console.log(dataIndex);
          // const dataIndex = column.api_name;
          if (row.hasOwnProperty(dataIndex)) {
            console.log("it runs");
            filteredRow[dataIndex] = row[dataIndex];
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
    sessionStorage.setItem("PreviousPath", previousPathName);

    // Dispatch the Redux thunk with the leadID
    dispatch(getSearch360EntityInfo({ TransactionID, previousPathName }));
    //dispatch(getTransactionID(TransactionID));

    // Navigate to the desired route
    navigate("/project360");
  };

  const GetAddForm = async (formid) => {
    // dispatch(resetFormFields());
    await dispatch(GetFormFields(formid));
  };
  const { EditTaskShow, setEditTaskShow, setSelectedRow1 } =
    useContext(SelectedRowContext);
  const UpdateRowData = async (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("TransactionID:", TransactionID);
    // Update the selected row state
    await setSelectedRow(RowData);
    await setSelectedRow1(RowData);
    await dispatch(resetFormFields());
    await dispatch(resetDefaultFormValues());
    const formid = "8EC23FBD-FB89-437E-8629-62E5EC2613E9";
    await GetAddForm(formid);
    // Prepare the data object in the required format
    const requestData = {
      transactionid: TransactionID,
      formid: formid,
    };
    await dispatch(GetDefaultTaskInputs(requestData));
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
  const handleSave = (row_data, col_data, selectedValue) => {
    console.log(row_data);
    console.log(col_data);
    console.log(selectedValue);
    const transactionid = row_data.ID || row_data.id;
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

  console.log(sortedColumns);

  // ~ Get Task List
  const [ShowTaskList, setShowTaskList] = useState(false);
  const [SelectedProject, setSelectedProject] = useState({});
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  const handleGetTaskList = async (TransactionId, RowData) => {
    console.log(TransactionId, RowData);
    await setSelectedProject({});
    await dispatch(ResetProjectTaskList());
    const RequestData = {
      entityid: "26B84156-CC30-416E-99D5-B37409B4D0BD",
      listid: "0C67EE8D-2E31-4E25-85B2-4AFA61197F3E",
      start: 0,
      skip: 1000,
      orderby: "",
      orderbydir: "",
      loggeduserid: loggedUserId,
      sessionid: "",
      transactionid: TransactionId,
      filterparams: [
        {
          filterid: "",
          apiname: "",
          filtervalue: "",
          condition: "",
        },
      ],
    };
    setSelectedProject(RowData);
    await dispatch(GetProjectTaskList(RequestData));
    setShowTaskList((prevState) => !prevState); // Toggle state
  };
  // ~ Get Task List

  const [showEditBoxPosition, setshowEditBoxPosition] = useState({
    XLeft: "0",
    XRight: "0",
    YTop: "0",
    YBottom: "0",
    ClassName: "defaultHeight",
  });
  const [showEditBox, setShowEditBox] = useState(false);
  const [InlineEditControl, setInlineEditControl] = useState({});

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

  const HandleEditClick = (InlineEditInput) => {
    setInlineEditControl(InlineEditInput);
    // setistagedited(false);
    // dispatch(resetstatus());
    // setUpdateselectedTagItem([]);
    let query = "";
    let page = 1;
    let limit = 10;
    let transactionId = InlineEditInput.row_data?.id;
    let IsDefault = true;
    fetchUpdateLookupDetailsData(query, page, limit, transactionId, IsDefault);
    setShowEditBox(true);
  };

  //tag

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

  return (
    <>
      {/* <ProjectTaskList
            ArcOffCanvaShow={ShowTaskList}
            setArcOffCanvaShow={setShowTaskList}
            SelectedProject={SelectedProject}
            setSelectedProject={setSelectedProject}
         /> */}

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
      <EditTask
        show={EditTaskShow}
        setShow={setEditTaskShow}
        SelectedRow={SelectedRow}
        UpdateselectedTagItem={UpdateselectedTagItemEdit}
        setUpdateselectedTagItem={setUpdateselectedTagItemEdit}
        istagedited={istageditedEditTask}
        setistagedited={setistageditedEditTask}
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
            taskInfoIsGrouping ? "is-grouping" : null
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
                key={column.ID}
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
                    console.log(ctx);
                    const dataIndex = column.displayapiname?.toLowerCase();
                    const fullName = ctx?.item[dataIndex];
                    const words = fullName && fullName.split(" ");
                    const startWithLetter = words ? words[0].charAt(0) : "";
                    const endWithLetter =
                      words && words.length > 1
                        ? words[words.length - 1].charAt(0)
                        : "";
                    const RowData = ctx.item;
                    console.log(ctx);
                    const TransactionID = ctx.item.id;
                    console.log(TransactionID);

                    return (
                      <>
                        <div className="name-td new-name-td with-action-1">
                          {/*   <a href="/360detail_v4" style={{ textDecoration: 'none' }}>*/}
                          <a
                            style={{ textDecoration: "none" }}
                            // onClick={() => HandlePostLeadID(TransactionID)}
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
                            <span
                              title="Edit Task"
                              onClick={() => {
                                UpdateRowData(RowData, TransactionID);
                                setEditTaskShow(true);
                                setistageditedEditTask(false);
                                setUpdateselectedTagItemEdit([]);
                              }}
                              // style={{ cursor: "pointer" }}
                            >
                              <BiSolidEditAlt />
                            </span>
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
                key={column.ID}
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
                    console.log(ctx);
                    // const DataName = column.name;
                    let gridvalue = "";
                    let properDateFormat = "";
                    const DataName = column.name;
                    let TagValues = ctx?.item.tags || [];
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
                      gridvalue = ctx?.item[dataIndex];
                    }

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
                    //  console.log(properDateFormat);
                    // console.log(gridvalue);
                    return (
                      <>
                        <div
                          className={`name-td new-name-td-default ${
                            column.inlineeditable ? "" : "without-cell-edit"
                          } `}
                        >
                          {column.name === "Tag" ? (
                            <>
                              <GridTemplate nameValues={nameValues} />
                            </>
                          ) : column.name === "# of Task" ? (
                            <>
                              <span
                                className="wjgridcelltext-d wjgridcelltext-black"
                                title={gridvalue === "-" ? 0 : gridvalue}
                              >
                                {gridvalue === "-" ? (
                                  0
                                ) : (
                                  <>
                                    {gridvalue}{" "}
                                    <i>
                                      {/* <PiInfoBold
                                                         title='View Task Info'
                                                         onClick={() =>
                                                            handleGetTaskList(ctx.item.id, ctx.item)
                                                         }
                                                         style={{ cursor: "pointer" }}
                                                      /> */}
                                    </i>
                                  </>
                                )}
                              </span>
                            </>
                          ) : (
                            <>
                              <div
                                className={`name-td new-name-td-default ${
                                  column.inlineeditable
                                    ? ""
                                    : "without-cell-edit"
                                } `}
                              >
                                <span className="default-value">
                                  {properDateFormat
                                    ? properDateFormat
                                    : gridvalue || "-"}
                                </span>
                              </div>
                            </>
                          )}
                          {column.inlineeditable ? (
                            <>
                              {console.log(column.name, "column.name")}
                              <button
                                className="edit-btn"
                                onClick={(event) => {
                                  ShowCellEditBox(event);
                                  HandleEditClick(InlineEditInput);
                                }}
                              >
                                <FaRegEdit
                                  title={
                                    column.name == "Plan Week"
                                      ? "Edit Plan Week"
                                      : column.name == "Due Date"
                                        ? "Edit Due Date"
                                        : column.name == "Tag"
                                          ? "Edit Tag"
                                          : ""
                                  }
                                />
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
