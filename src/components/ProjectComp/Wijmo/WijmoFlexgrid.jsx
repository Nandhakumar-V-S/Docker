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
import EditTask from "./components/Update/EditTask";
import { BiSolidEditAlt } from "react-icons/bi";
import {
  GetDefaultTaskInputs,
  resetDefaultFormValues,
} from "@/redux/Task/AddTask/GetDefaultTaskInputs";
import { EditCell } from "@/components/ExecutionComp/Wijmo/EditCell";
import ProjectTaskList from "./components/tasklist";
import moment from "moment";
import { GoTasklist } from "react-icons/go";
import {
  sortColumn,
  updateColumnSeq,
  updatedNewLayout,
  editcell,
  // getTransactionID,
} from "@/redux/Project/actions";
import { masterDataInfo } from "@/redux/Project/selector";
import { getSearch360EntityInfo } from "@/redux/GlobalSearch/GetSearch360EntityInfo";
import {
  GetProjectTaskList,
  resetstatus as ResetProjectTaskList,
} from "@/redux/Project/getTaskList/GetTaskList";
import { PiInfoBold } from "react-icons/pi";
import {
  GetFormFields,
  resetFormFields,
} from "@/redux/GetFormFields/GetFormFields";
// ! Import
// ~ Selected Filter
import { ListContext } from "@/modules/ProjectModule/index";
import { selectedFiltersInfo } from "@/redux/Project/selector";
// ~ Selected Filter
const WijmoFlexgrid = ({ loading, tableData, sortedColumns }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectIsGrouping } = useContext(ArcGlobalContextProvider);
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  const [collectionView, setCollectionView] = useState("");
  const [columnSequence, setColumnSequence] = useState([]);
  const [newLayout, setNewLayout] = useState([]);
  const [SelectedRow, setSelectedRow] = useState();
  // * Popup State
  const [EditProjectShow, setEditProjectShow] = useState(false);
  const [istageditedEditTask, setistageditedEditTask] = useState(false);
  const [UpdateselectedTagItemEdit, setUpdateselectedTagItemEdit] = useState(
    []
  );
  const masterData = useSelector(masterDataInfo);
  // * Popup State
  // ~ Selected Filter
  const { FilterDropdownShow } = useContext(ListContext);
  const selectedFilters = useSelector(selectedFiltersInfo);
  const selectedFiltersLength = selectedFilters.length;
  // ~ Selected Filter
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
  const UpdateRowData = async (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("TransactionID:", TransactionID);
    // Update the selected row state
    await setSelectedRow(RowData);
    // await setSelectedRow1(RowData);
    await dispatch(resetFormFields());
    await dispatch(resetDefaultFormValues());
    const formid = "A6BEEBEC-04EC-45D9-ABE5-4E59125FA591";
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
    const transactionid = row_data.ID;
    const attributedatatype = col_data.attrtype;
    const listconfigid = col_data.ID;
    const apiname = col_data.api_name;
    const value = selectedValue;

    console.log(transactionid);
    console.log(attributedatatype);
    console.log(listconfigid);
    console.log(apiname);
    console.log(value);
    // dispatch(
    //   editcell(transactionid, attributedatatype, listconfigid, apiname, value)
    // );
  };

  console.log(sortedColumns);

  // ~ Get Task List
  const [ShowTaskList, setShowTaskList] = useState(false);
  const [executeCall, setExecuteCall] = useState(false);
  const [SelectedProject, setSelectedProject] = useState({});
  const [transId, setTransId] = useState("");
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  const handleGetTaskList = async (TransactionId, RowData) => {
    await setTransId(TransactionId);
    console.log(TransactionId, RowData);
    await setSelectedProject({});
    // await dispatch(ResetProjectTaskList());
    // const RequestData = {
    //    entityid: "26B84156-CC30-416E-99D5-B37409B4D0BD",
    //    listid: "0C67EE8D-2E31-4E25-85B2-4AFA61197F3E",
    //    start: 0,
    //    skip: 1000,
    //    orderby: "",
    //    orderbydir: "",
    //    loggeduserid: loggedUserId,
    //    sessionid: "",
    //    transactionid: TransactionId,
    //    filterparams: [
    //       {
    //          filterid: "",
    //          apiname: "",
    //          filtervalue: "",
    //          condition: ""
    //       }
    //    ]
    // };
    await setSelectedProject(RowData);
    // await dispatch(GetProjectTaskList(RequestData));
    await setExecuteCall(true);
    setShowTaskList((prevState) => !prevState); // Toggle state
  };
  // ~ Get Task List

  return (
    <>
      <ProjectTaskList
        ArcOffCanvaShow={ShowTaskList}
        setArcOffCanvaShow={setShowTaskList}
        SelectedProject={SelectedProject}
        setSelectedProject={setSelectedProject}
        executeCall={executeCall}
        setExecuteCall={setExecuteCall}
        transId={transId}
      />

      <EditTask
        show={EditProjectShow}
        setShow={setEditProjectShow}
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
            projectIsGrouping ? "is-grouping" : null
          } ${
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
                          <div className="action with-action-1">
                            <span
                              title="Edit Project"
                              onClick={() => {
                                UpdateRowData(RowData, TransactionID);
                                setEditProjectShow(true);
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
                    return (
                      <>
                        {column.name === "# of Task" ? (
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
                                    <PiInfoBold
                                      title="View Task Info"
                                      onClick={() =>
                                        handleGetTaskList(ctx.item.id, ctx.item)
                                      }
                                      style={{ cursor: "pointer" }}
                                    />
                                  </i>
                                </>
                              )}
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="name-td new-name-td-default">
                              <span className="default-value">
                                {properDateFormat
                                  ? properDateFormat
                                  : gridvalue || "-"}
                              </span>
                            </div>
                          </>
                        )}
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
