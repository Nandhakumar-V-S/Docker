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
// import EditTask from "./components/Update/EditTask";
import { BiSolidEditAlt } from "react-icons/bi";
import { GetDefaultTaskInputs } from "@/redux/Task/AddTask/GetDefaultTaskInputs";
import { EditCell } from "@/components/ExecutionComp/Wijmo/EditCell";
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
} from "@/redux/Features/actions";
import { masterDataInfo } from "@/redux/Features/selector";
import EditTag from "./components/Update/EditTag";
import AddTag from "./components/Update/AddTag";
// import AddEntity from "./components/Update/AddEntity";
import { GetDefaultTagValue } from "@/redux/Tag/AddTag/getDefaultTagValues";
import { GetAddEntityFields } from "@/redux/Tag/AddTag/getAddEntityFields";
import AddEntityField from "./components/Update/AddEntity";
import { GetEditTagValue } from "@/redux/Tag/AddTag/getEditTagValues";
import { API_TEST_URL } from "@/config/serverApiConfig";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";

// ! Import
const WijmoFlexgrid = ({ loading, tableData, sortedColumns }) => {
  console.log(sortedColumns);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tagIsGrouping } = useContext(ArcGlobalContextProvider);
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

  console.log(sortedColumns);
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

      {loading ? (
        <ListPageTableLoading />
      ) : (
        <FlexGrid
          autoRowHeights={true}
          deferResizing={true}
          frozenColumns={2}
          itemsSource={collectionView ? collectionView.items : null}
          allowSorting={true}
          autoGenerateColumns={false}
          className={`list-data-table features ${tagIsGrouping ? "is-grouping" : null}`}
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
                    const TransactionID = ctx.item.lbl_gen_id;
                    return (
                      <>
                        <div className="name-td new-name-td with-action-4">
                          {/*   <a href="/360detail_v4" style={{ textDecoration: 'none' }}>*/}
                          <a
                            style={{ textDecoration: "none"}}
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
                          {/* <div className="action with-action-4">
                            <span
                              title="Add Tag"
                              onClick={() => {
                                setAddTagshow(true);
                                getTagList(RowData, TransactionID);
                              }}
                            >
                              <AiFillTag />
                            </span>
                            <span
                              title="Add Entity"
                              onClick={() => {
                                setAddEntityshow(true);
                                getEntityList(RowData, TransactionID);
                              }}
                            >
                              <BiSolidCommentAdd />
                            </span>
                            <span
                              title="Edit Tag"
                              onClick={() => {
                                setEditTagshow(true);
                                UpdateRowData(RowData, TransactionID);
                              }}
                            >
                              <BiSolidEditAlt />
                            </span>
                          </div> */}
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
                    const DataName = column.name;
                    let gridvalue = "";
                    let properDateFormat = "";
                    let TagValues = ctx?.item.tags || [];
                    // let TagValues = Tags.tags || [];
                    console.log(ctx.item);
                    // Parse the JSON string
                    const parsedData = Array.isArray(TagValues)
                      ? TagValues
                      : JSON.parse(TagValues);
                    console.log(parsedData);
                    const nameValues = parsedData.map((item) => ({
                      name: item.TagName,
                      color: item.colourcode,
                      // color: item.colourcode ? item.colourcode : 1,
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
                    const InsideData = ctx;
                    console.log(InsideData);
                    console.log(properDateFormat);
                    console.log(nameValues);
                    const ActualValue = properDateFormat
                      ? properDateFormat
                      : gridvalue || "-";
                    return (
                      <>
                        {/*  sample className .wjgridcelltext-green & wjgridcelltext-red & wjgridcelltext-black*/}
                        <div
                          className={`name-td new-name-td-default ${
                            column.inlineeditable ? "" : "without-cell-edit"
                          } `}
                        >
                          {column.name === "Associated Tags" ? (
                            <>
                              <GridTemplate nameValues={nameValues} />
                            </>
                          ) : (
                            <span className="default-value" title={ActualValue}>
                              {ActualValue}
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
                                column.masterid === null ? "" : column.masterid
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