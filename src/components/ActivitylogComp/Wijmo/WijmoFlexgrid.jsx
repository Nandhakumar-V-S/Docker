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
import WijmoHeaderTemplate from "@/components/arccomponents/utility/WijmoHeaderTemplate";
// import EditTask from "./components/Update/EditTask";
import { BiSolidEditAlt } from "react-icons/bi";
import {
  postDataInfo,
  selectedFiltersInfo,
} from "@/redux/Activitylog/selector";
import { GetDefaultTaskInputs } from "@/redux/Task/AddTask/GetDefaultTaskInputs";
import { EditCell } from "@/components/ExecutionComp/Wijmo/EditCell";
import { ListContext } from "@/modules/activitylogModule/index";
import moment from "moment";
import { BiSolidCommentAdd } from "react-icons/bi";
import { AiFillTag, AiFillTags } from "react-icons/ai";
import {
  sortColumn,
  updateColumnSeq,
  updatedNewLayout,
  editcell,
  getListdataSuccess,
  // getTransactionID,
} from "@/redux/Activitylog/actions";
import {
  masterDataInfo,
  verticalGroupbySelectedInfo,
} from "@/redux/Activitylog/selector";
import EditTag from "./components/Update/EditTag";
import AddTag from "./components/Update/AddTag";
// import AddEntity from "./components/Update/AddEntity";
import { GetDefaultTagValue } from "@/redux/Tag/AddTag/getDefaultTagValues";
import { GetAddEntityFields } from "@/redux/Tag/AddTag/getAddEntityFields";
import AddEntityField from "./components/Update/AddEntity";
import { GetEditTagValue } from "@/redux/Tag/AddTag/getEditTagValues";
import { API_TEST_URL } from "@/config/serverApiConfig";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { FaLongArrowAltUp } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import DetailsForm from "@/modules/Case360DetailsEdit/components/DetailsForm";

// ! Import
const WijmoFlexgrid = ({ loading, tableData, sortedColumns }) => {
  console.log(sortedColumns);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activitylogIsGrouping } = useContext(ArcGlobalContextProvider);
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  const [collectionView, setCollectionView] = useState("");
  const [columnSequence, setColumnSequence] = useState([]);
  const [newLayout, setNewLayout] = useState([]);
  const [SelectedRow, setSelectedRow] = useState();
  const masterData = useSelector(masterDataInfo);
  // * Popup State
  const [EditTaghow, setEditTagshow] = useState(false);
  const [AddTagshow, setAddTagshow] = useState(false);
  const [AddEntityshow, setAddEntityshow] = useState(false);
  const postDataInfoData = useSelector(postDataInfo);

  const { FilterDropdownShow } = useContext(ListContext);
  const selectedFilters = useSelector(selectedFiltersInfo);
  const selectedFiltersLength = selectedFilters.length;

  //verticalgroupby
  const verticalgroupbySelected = useSelector(verticalGroupbySelectedInfo);
  // * Popup State
  console.log(tableData);
  console.log(sortedColumns);
  useEffect(() => {
    removeWijimoLicense();
    initialized();
  }, [tableData, sortedColumns, verticalgroupbySelected]);

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
      const filteredData = tableData?.map((row) => {
        const filteredRow = {};
        sortedColumns?.forEach((column) => {
          const dataIndex = column.displayapiname?.toLowerCase();
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
        if (verticalgroupbySelected?.columns?.length > 0) {
          let columns = [];
          let sorting = [];

          // Filter the verticalgroupbySelected columns based on sortedColumns
          const filteredColumns = verticalgroupbySelected?.columns?.filter(
            (item) => {
              return sortedColumns?.some(
                (data) =>
                  data?.displayapiname?.toLowerCase() ===
                  item?.binding?.toLowerCase()
              );
            }
          );
          console.log(filteredColumns);
          // Populate the columns array with the binding values of the filtered items
          if (filteredColumns) {
            filteredColumns.forEach((item) => {
              columns.push(item.binding);
            });
            sorting = filteredColumns.map((item) => ({
              property: item.binding,
              ascending: item.direction === "asc",
            }));
          }

          // Now you can use the 'columns' array as needed
          // console.log(columns);
          // console.log(sorting);
          const hideColsGridData = new CollectionView(nonEmptyData, {
            sortDescriptions: sorting,
            // sortDescriptions: ["column15_text", "column11_text"], // Adjust these to your actual data fields
            groupDescriptions: columns, // Adjust these to your actual data fields
          });
          setCollectionView(hideColsGridData);
        } else {
          const newCollectionView = new CollectionView(nonEmptyData);
          setCollectionView(newCollectionView);
        }
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

    // Dispatch the Redux thunk with the leadID
    dispatch(get360EntityInfo({ TransactionID, previousPathName }));
    //dispatch(getTransactionID(TransactionID));

    // Navigate to the desired route
    navigate("/360detail_v4");
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

  const getTagList = (RowData, TransactionID) => {
    console.log(RowData);
    dispatch(GetDefaultTagValue(TransactionID));
    setSelectedRow(RowData);
  };

  const getEntityList = (RowData, TransactionID) => {
    setSelectedRow(RowData);
    dispatch(GetAddEntityFields(TransactionID));
  };
  const UpdateRowData = (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("TransactionID:", TransactionID);
    // Update the selected row state
    setSelectedRow(RowData);
    console.log(SelectedRow);

    dispatch(GetEditTagValue(TransactionID));
  };
const [ editTicketform , seteditTicketform ] = useState(false)
  const HandleEdit = (id) => {
    seteditTicketform(true)
    localStorage.setItem("Ticketid",id)
    navigate("/editticket")
  }

  return (
    <>
      <EditTag
        show={EditTaghow}
        setShow={setEditTagshow}
        SelectedRow={SelectedRow}
      />
      <AddTag
        show={AddTagshow}
        setShow={setAddTagshow}
        SelectedRow={SelectedRow}
      />
      <AddEntityField
        show={AddEntityshow}
        setShow={setAddEntityshow}
        SelectedRow={SelectedRow}
      />
       {/* <DetailsForm />  */}
     { loading ? (
        <ListPageTableLoading />
      ) : (
        <div className="with-group-panel">
          <FlexGrid
            autoRowHeights={true}
            deferResizing={true}
            frozenColumns={2}
            itemsSource={collectionView ? collectionView : null}
            allowSorting={true}
            autoGenerateColumns={false}
            className={`list-data-table task-group sorting-ssr ${
              activitylogIsGrouping ? "is-grouping" : null
            } ${
              FilterDropdownShow && selectedFiltersLength > 0
                ? "show-filter"
                : "hide-filter"
            }`}
            headersVisibility="Column"
            initialized={initialized}
            sortingColumn={sortingColumn}
            // draggedColumn={draggedColumn}
            // resizedColumn={resizedColumn}
            updatedView={updatedView}
            selectionMode="None"
          >
            <FlexGridColumn
              width={50}
              allowDragging={true}
              allowResizing={true}
              isReadOnly={true}
              allowSorting={false}
              fixed
              cssClass="checkbox"
            >
              <FlexGridCellTemplate
                cellType="GroupHeader"
                // ref={flexRef}
                template={(ctx) => (
                  <div className="group-cell">
                    {console.log(ctx.item)}
                    <button
                      className="wj-btn wj-btn-glyph wj-elem-collapse"
                      type="button"
                      aria-label="Toggle Group"
                      // onClick={() => {
                      //   console.log(ctx.item);
                      //   ctx.grid.toggleGroup(ctx.item);
                      // }}
                    >
                      <span className="toggle-icon">
                        <RiArrowDropDownLine />
                      </span>
                      <p>{ctx?.item?.name || "Unassigned"}</p>
                      <span> ({ctx?.item?.items?.length} items)</span>{" "}
                    </button>
                  </div>
                )}
              />
              <FlexGridCellTemplate
                cellType="ColumnHeader"
                template={(ctx) => {
                  const allIds = collectionView?.items;
                  return (
                    <div className="checkbox-container">
                      {/* <input
                      type="checkbox"
                      // disabled={
                      //   allIds?.length === 0 || ctx.item.plan === "Trial"
                      // }
                      // onChange={(e) =>
                      //   handleSelectAll(e.target.checked, allIds)
                      // }
                      // checked={
                      //   collectionView?.items?.length === selectedRows?.length
                      // }
                    /> */}
                    </div>
                  );
                }}
              />
              <FlexGridCellTemplate
                cellType="Cell"
                template={(ctx) => {
                  console.log(ctx);

                  // Corrected logic: Check if the current row exists in selectedRows array
                  // const isChecked = selectedRows.some(
                  //   (row) => row.subscriptionid === ctx?.item?.subscriptionid
                  // );
                  console.log(ctx.item.plan, "isCheckedsss");

                  return (
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        checked=""
                        onChange={(e) =>
                          handleCheckboxChange(ctx?.item, e.target.checked)
                        }
                      />
                    </div>
                  );
                }}
              />
            </FlexGridColumn>
            {sortedColumns.map((column) =>
              column.istitle === true ? (
                <FlexGridColumn
                  key={column.id}
                  binding={column.displayapiname?.toLowerCase()}
                  header={column.name}
                  // width={column.columnwidth}
                  minWidth={220}
                  allowDragging={false}
                  allowResizing={false}
                  isReadOnly={true}
                  fixed
                >
                  <FlexGridCellTemplate
                    cellType="ColumnHeader"
                    template={() => {
                      return (
                        <>
                          <WijmoHeaderTemplate
                            column={column}
                            postDataInfoData={postDataInfoData}
                          />
                        </>
                      );
                    }}
                  />
                  <FlexGridCellTemplate
                    cellType="GroupHeader"
                    // ref={flexRef}
                    template={(ctx) => (
                      <div className="group-cell">
                        {console.log(ctx.item)}
                        <button
                          className="wj-btn wj-btn-glyph wj-elem-collapse"
                          type="button"
                          aria-label="Toggle Group"
                          // onClick={() => {
                          //   console.log(ctx.item);
                          //   ctx.grid.toggleGroup(ctx.item);
                          // }}
                        >
                          <span className="toggle-icon">
                            <RiArrowDropDownLine />
                          </span>
                          <p>{ctx?.item?.name || "Unassigned"}</p>
                          <span> ({ctx?.item?.items?.length} items)</span>{" "}
                        </button>
                      </div>
                    )}
                  />
                  <FlexGridCellTemplate
                    on
                    cellType="Cell"
                    template={(ctx) => {
                      console.log(ctx);
                      console.log(column);
                      const dataIndex = column.displayapiname?.toLowerCase();
                      const fullName = ctx?.item[dataIndex];
                      const words = fullName && fullName.split(" ");
                      const startWithLetter = words ? words[0].charAt(0) : "";
                      const endWithLetter =
                        words && words.length > 1
                          ? words[words.length - 1].charAt(0)
                          : "";
                      const RowData = ctx.item;
                      const TransactionID = ctx.item.id;
                      console.log(TransactionID,"TransactionID");
                      console.log(ctx,"ctx");
                      return (
                        <>
                          <div className="name-td new-name-td with-action-4">
                            {/*   <a href="/360detail_v4" style={{ textDecoration: 'none' }}>*/}
                            <a
                              style={{ textDecoration: "none" }}
                              // onClick={() => HandlePostLeadID(TransactionID)}
                            >
                              <div className="name-detail">
                                {/* <span>
                                  {startWithLetter}
                                  {endWithLetter}
                                </span> */}
                                <p title={fullName}>{fullName}</p>
                              </div>
                            </a>
                            <div className="action with-action-4">
                              {/* <div className="action with-action-1"> */}
                              <span
                                title="Edit"
                                onClick={() => HandleEdit(ctx.item.utbl_workitem_column16)}
                              >
                                <BiSolidEditAlt />
                              </span>
                              {/* </div> */}
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
                  minWidth={150}
                  visible={column.visible}
                  allowResizing={true}
                  isReadOnly={true}
                  fixed
                  // className={"asc"}
                >
                  <FlexGridCellTemplate
                    cellType="ColumnHeader"
                    template={() => {
                      return (
                        <>
                          <WijmoHeaderTemplate
                            column={column}
                            postDataInfoData={postDataInfoData}
                          />
                        </>
                      );
                    }}
                  />
                  <FlexGridCellTemplate
                    cellType="GroupHeader"
                    // ref={flexRef}
                    template={(ctx) => (
                      <div className="group-cell">
                        {console.log(ctx.item)}
                        <button
                          className="wj-btn wj-btn-glyph wj-elem-collapse"
                          type="button"
                          aria-label="Toggle Group"
                          // onClick={() => {
                          //   console.log(ctx.item);
                          //   ctx.grid.toggleGroup(ctx.item);
                          // }}
                        >
                          <span className="toggle-icon">
                            <RiArrowDropDownLine />
                          </span>
                          <p>{ctx?.item?.name || "Unassigned"}</p>
                          <span> ({ctx?.item?.items?.length} items)</span>{" "}
                        </button>
                      </div>
                    )}
                  />
                  <FlexGridCellTemplate
                    on
                    cellType="Cell"
                    template={(ctx) => {
                      // console.log(ctx);
                      const DataName = column.name;
                      let gridvalue = "";
                      let properDateFormat = "";
                      // let TagValues = ctx?.item.tags || [];
                      // let TagValues = Tags.tags || [];
                      // console.log(ctx);
                      // Parse the JSON string
                      // const parsedData = Array.isArray(TagValues)
                      //   ? TagValues
                      //   : JSON.parse(TagValues);
                      // console.log(parsedData);
                      // const nameValues = parsedData.map((item) => ({
                      //   name: item.TagName,
                      //   color: item.colourcode,
                      //   color: item.colourcode ? item.colourcode : 1,
                      // }));
                      // console.log(nameValues);

                      if (
                        column.isdate === true &&
                        column.api_name !== "workday" &&
                        column.name !== "Priority"
                      ) {
                        // Date formatting logic
                      } else if (column.name === "Priority") {
                        // Priority-specific handling
                        const dataIndex = column.displayapiname?.toLowerCase();
                        gridvalue = ctx?.item[dataIndex];
                      } else {
                        const dataIndex = column.displayapiname?.toLowerCase();
                        gridvalue = ctx?.item[dataIndex];
                      }
                      // const InsideData = ctx;
                      // console.log(InsideData);
                      //  console.log(properDateFormat);
                      // console.log(nameValues);
                      const ActualValue = properDateFormat
                        ? properDateFormat
                        : gridvalue || "-";

                      let priorityStyle = {};
                      if (column.name === "Priority") {
                        if (gridvalue === "Critical") {
                          priorityStyle = { color: "#ED5263" };
                        } else if (gridvalue === "High") {
                          priorityStyle = { color: "orange" };
                        } else if (gridvalue === "Medium") {
                          priorityStyle = { color: "#14b191" };
                        }
                      }
                      return (
                        <>
                          {/*  sample className .wjgridcelltext-green & wjgridcelltext-red & wjgridcelltext-black*/}
                          <div className={`name-td new-name-td-default`}>
                            {column.name === "Associated Tags" ? (
                              <>
                                <GridTemplate nameValues={nameValues} />
                              </>
                            ) : (
                              <span
                                className="default-value"
                                title={ActualValue}
                                style={priorityStyle}
                              >
                                {ActualValue}
                                {/* {gridvalue === "Critical" && (
                                  <FaLongArrowAltUp
                                    style={{ marginLeft: "5px" }}
                                  />
                                )} */}
                              </span>
                            )}
                            {column.inlineeditable ? (
                              <EditCell
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
                              />
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
        </div>
          
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
