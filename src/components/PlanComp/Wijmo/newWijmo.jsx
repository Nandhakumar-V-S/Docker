import React, { useState, useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate,
} from "@grapecity/wijmo.react.grid";
import {
  InputDate,
  InputTime,
  ComboBox,
  AutoComplete,
  InputColor,
  InputNumber,
} from "@grapecity/wijmo.input";
import { DataMap } from "@grapecity/wijmo.grid";
import { CollectionView } from "@grapecity/wijmo";
//import moment from "moment";
import { MdSms } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoCallSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiCalendar } from "react-icons/ci";
import { MdOutlinePhoneCallback } from "react-icons/md";
import { MdOutlineSendToMobile } from "react-icons/md";
import { LiaClone } from "react-icons/lia";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import ListPageTableLoading from "@/modules/loading-skeleton/listpage-table-loading";
import { masterDataInfo, planweekInfo } from "@/redux/Plan/selector";

import {
  sortColumn,
  updateColumnSeq,
  updatedNewLayout,
  getTransactionID,
  insertPlan,
} from "@/redux/Plan/actions";
// ~ Selected Filter
import { ListContext } from "@/modules/PlanModule/index";
import { selectedFiltersInfo } from "@/redux/Plan/selector";
// ~ Selected Filter
const WijmoGrid = ({ loading, tableData, sortedColumns }) => {
  //const data = getData(100);
  const dispatch = useDispatch();
  const masterData = useSelector(masterDataInfo);
  console.log("masterData", masterData);
  const planweek = useSelector(planweekInfo);
  console.log("planweek", planweek);
  // ~ Selected Filter
  const { FilterDropdownShow } = useContext(ListContext);
  const selectedFilters = useSelector(selectedFiltersInfo);
  const selectedFiltersLength = selectedFilters.length;
  // ~ Selected Filter
  const { planIsGrouping } = useContext(ArcGlobalContextProvider);
  const [collectionView, setCollectionView] = useState("");
  const [columnSequence, setColumnSequence] = useState([]);
  const [newLayout, setNewLayout] = useState([]);
  const [readonlyCol, setreadonlyCol] = useState([]);
  useEffect(() => {
    removeWijimoLicense();
    initialized();
  }, [tableData, sortedColumns]);
  console.log(tableData);
  console.log(sortedColumns);

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
    if (tableData && tableData.length > 0) {
      const filteredData = tableData?.map((row) => {
        const filteredRow = {};
        sortedColumns?.forEach((column) => {
          const dataIndex = column.displayapiname?.toLowerCase();
          if (row.hasOwnProperty(dataIndex)) {
            console.log("it runs");
            filteredRow[dataIndex] = row[dataIndex];
          }
        });
        console.log(filteredRow);
        return filteredRow;
      });
      console.log(filteredData);

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
  const DataMenuBtn = () => {
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
                  {[
                    { Label: "Edit all fields", Icon: <BiSolidEditAlt /> },
                    { Label: "Add meeting", Icon: <CiCalendar /> },
                    { Label: "Add call log", Icon: <MdOutlinePhoneCallback /> },
                    {
                      Label: "Send SMS to mobile",
                      Icon: <MdOutlineSendToMobile />,
                    },
                    {
                      Label: "Send SMS to work",
                      Icon: <MdOutlineSendToMobile />,
                    },
                    { Label: "Clone", Icon: <LiaClone /> },
                    { Label: "Delete", Icon: <RiDeleteBin6Line /> },
                    { Label: "Unsubscribe", Icon: <MdOutlineUnsubscribe /> },
                    { Label: "Forget", Icon: <RiDeleteBin2Line /> },
                  ].map((data, index) => (
                    <button key={index}>
                      {data.Icon} {data.Label}
                    </button>
                  ))}
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

  const newColumnLayout = (flexgrid) => {
    console.log(flexgrid);
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

  const sortingColumn = (sender, args) => {
    const columnIndex = args.col;
    const dataIndex = sender.columns[columnIndex].binding;
    console.log("Clicked column dataindex:", dataIndex);

    dispatch(sortColumn(dataIndex));
  };
  const cellEditEnded = (sender, args) => {
    const columnIndex = args.col;
    console.log(columnIndex);
    const dataIndex = sender.columns[columnIndex].binding;
    console.log(dataIndex);
    const selectedid = sender.selectedItems[0]["id"];
    console.log(selectedid);
    const selectedcell = sender.selectedItems[0][dataIndex];
    console.log(selectedcell);
    const changedData = {
      apiname: dataIndex,
      transactionid: selectedid,
      type: selectedcell === true ? "Insert" : "Delete",
    };
    console.log(changedData);
    if (changedData) {
      dispatch(insertPlan(changedData));
    }
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
  const relevantColumns = ["d1", "d2", "d3", "d4", "d5", "d6", "d7"];
  //const readonlyColumns = ["d1", "d2", "d3"];

  useEffect(() => {
    if (planweek !== "") {
      const [week, year] = planweek.split("$");
      const weekNumber = parseInt(week, 10);
      const yearNumber = parseInt(year, 10);
      console.log(weekNumber, yearNumber);
      const startOfWeek = getWeekStartDate(weekNumber, yearNumber);
      console.log(startOfWeek);
      const columnDates = {
        d1: new Date(startOfWeek),
        d2: new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)),
        d3: new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)),
        d4: new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)),
        d5: new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)),
        d6: new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)),
        d7: new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)),
      };
      console.log(columnDates);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const disabledColumns = Object.keys(columnDates).filter(
        (column) => columnDates[column] < today
      );
      console.log(disabledColumns);
      setreadonlyCol(disabledColumns);
    }
  }, [planweek]);

  return (
    <>
      {loading ? (
        <ListPageTableLoading />
      ) : (
        <FlexGrid
          itemsSource={collectionView ? collectionView.items : null}
          autoRowHeights={true}
          deferResizing={true}
          frozenColumns={1}
          autoGenerateColumns={false}
          allowSorting={true}
          className={`list-data-table ${
            planIsGrouping ? "is-grouping" : null
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
          cellEditEnded={cellEditEnded}
          // selectionMode="None"
        >
          {sortedColumns?.map((column) =>
            column.istitle === true ? (
              <FlexGridColumn
                key={column.id}
                binding={column.displayapiname?.toLowerCase()}
                header={column.name}
                width={column.columnwidth}
                minWidth={300}
                visible={column.visible}
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
                    const fullName = ctx?.item[dataIndex];
                    const words = fullName && fullName.split(" ");
                    const startWithLetter = words ? words[0].charAt(0) : "";
                    const endWithLetter =
                      words && words.length > 1
                        ? words[words.length - 1].charAt(0)
                        : "";
                    const UserLeadID = ctx.item.id;
                    return (
                      <>
                        <div className="name-td without-link new-name-td ">
                          {/*   <a href="/360detail_v4" style={{ textDecoration: 'none' }}>*/}
                          <a
                            style={{ textDecoration: "none" }}
                            // onClick={() => HandlePostLeadID(UserLeadID)}
                            // onClick={() => console.log(UserLeadID)}
                          >
                            <div className="name-detail">
                              <span>
                                {startWithLetter}
                                {endWithLetter}
                              </span>

                              <p title={fullName}>{fullName}</p>
                            </div>
                          </a>
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
                            <DataMenuBtn />
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
                allowDragging={
                  !relevantColumns.includes(
                    column.displayapiname?.toLowerCase()
                  )
                }
                //   dataMap={
                //     column.dataindex === "Priority" ? getPriority(masterData) : null
                //   }
                // dataMap={
                //   column.dataindex === "Priority"
                //     ? new DataMap(
                //         getPriority(masterData),
                //         "optionid",
                //         "optionvalue"
                //       )
                //     : null
                // }
                // format={column.dataindex === "DueDate" ? "d" : null}
                // editor={
                //   column.dataindex === "DueDate"
                //     ? new InputDate(document.createElement("div"))
                //     : column.dataindex === "Priority"
                //       ? new AutoComplete(document.createElement("div"), {
                //           itemsSource: getPriority(masterData),
                //           selectedValuePath: "optionid",
                //           displayMemberPath: "optionvalue",
                //         })
                //       : null
                // }
                visible={column.visible}
                width={column.columnwidth}
                allowResizing={true}
                minWidth={110}
                isReadOnly={
                  readonlyCol.includes(column.displayapiname?.toLowerCase()) ||
                  !relevantColumns.includes(
                    column.displayapiname?.toLowerCase()
                  )
                }
                // isReadOnly={true}

                // fixed
              >
                {/* {renderCellTemplate(column.cellTemplate)} */}
              </FlexGridColumn>
            )
          )}
        </FlexGrid>
      )}
    </>
  );
};
// const getPriority = () => ["A", "B", "C"];

const getPriority = (masterData) => {
  const priorityObject = masterData?.find((item) => item.masterid === "7001");
  if (priorityObject) {
    const values = priorityObject.mastervalues.map(
      (value) => value.optionvalue
    );
    console.log(values);
    return priorityObject.mastervalues;
  }
  return [];
};

const renderCellTemplate = (cellTemplate) => {
  console.log(cellTemplate);
  let result = null;
  if (cellTemplate) {
    result = <FlexGridCellTemplate cellType="Cell" template={cellTemplate} />;
  }
  return result;
};

export default WijmoGrid;

//helper functions
const getWeekStartDate = (week, year) => {
  const firstDayOfYear = new Date(year, 0, 1);
  const daysOffset = (week - 1) * 7;
  const startDate = new Date(
    firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset)
  );
  const dayOfWeek = startDate.getDay();
  const diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(startDate.setDate(diff));
};
