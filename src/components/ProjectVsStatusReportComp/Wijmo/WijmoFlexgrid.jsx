/* eslint-disable react/prop-types */
import { useEffect, useState, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate,
} from "@grapecity/wijmo.react.grid";
import { CollectionView } from "@grapecity/wijmo";
import { MdSms } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoCallSharp } from "react-icons/io5";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiCalendar } from "react-icons/ci";
import { MdOutlinePhoneCallback } from "react-icons/md";
import { MdOutlineSendToMobile } from "react-icons/md";
import { LiaClone } from "react-icons/lia";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { PiInfoBold } from "react-icons/pi";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import ListPageTableLoading from "@/modules/loading-skeleton/listpage-table-loading";
import moment from "moment";
import {
  sortColumn,
  updateColumnSeq,
  updatedNewLayout,
} from "@/redux/ProjectVsStatusReport/actions";
import TaskReport from "./TaskReport";
import { postDataInfo } from "@/redux/ProjectVsStatusReport/selector";
import { GetTaskReport } from "@/redux/ProjectVsStatusReport/TaskReport/GetTaskReport";

// ~ Selected Filter
import { ListContext } from "@/modules/ProjectVsStatusReportModule/index";
import { selectedFiltersInfo } from "@/redux/ProjectVsStatusReport/selector";
// ~ Selected Filter

const WijmoFlexgrid = ({ loading, tableData, sortedColumns }) => {
  const dispatch = useDispatch();
  const { projectVsStatusReportIsGrouping } = useContext(
    ArcGlobalContextProvider
  );
  const { orderBy, orderByHeader } = useSelector(
    (state) => state.projectVsStatusReport
  );
  // ~ Selected Filter
  const { FilterDropdownShow } = useContext(ListContext);
  const selectedFilters = useSelector(selectedFiltersInfo);
  const selectedFiltersLength = selectedFilters.length;
  // ~ Selected Filter
  console.log(orderBy, "orderby");
  console.log(orderByHeader, "orderByHeader");
  const [collectionView, setCollectionView] = useState("");
  const [columnSequence, setColumnSequence] = useState([]);
  const [newLayout, setNewLayout] = useState([]);
  //added by Gomathi K
  const [showTaskReport, setShowTaskReport] = useState(false);
  // const [ArcOffCanvaShow, setArcOffCanvaShow] = useState(false);
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
  //added by Gomathi
  const filtervalue = useSelector(postDataInfo);
  console.log(filtervalue);

  const handleIconClick = (id, apiname) => {
    console.log(id, apiname);
    const RequestData = {
      entityid: "26B84156-CC30-416E-99D5-B37409B4D0BD",
      listid: "0C67EE8D-2E31-4E25-85B2-4AFA61197F3E",
      start: 0,
      skip: 1000,
      page: "project",
      orderby: "",
      orderbydir: "",
      loggeduserid: loggedUserId,
      sessionid: "",
      projectid: id,
      resourceid: "",
      status: apiname,
      filterparams: filtervalue.filterparams,
    };

    dispatch(GetTaskReport(RequestData));
    setShowTaskReport((prevState) => !prevState); // Toggle state
  };
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

  function initialized() {
    // if (collectionView) {
    //   collectionView.refresh();
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

  const sortingColumn = (sender, args) => {
    const columnIndex = args.col;
    const dataIndex = sender.columns[columnIndex].binding;
    console.log("Clicked column dataindex:", dataIndex);

    dispatch(sortColumn(dataIndex));
  };
  const nonSortableColumns = ["D1", "D2", "D3", "D4", "D4", "D5", "D6"];
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
  console.log(sortedColumns, "soreted");
  return (
    <>
      <TaskReport
        ArcOffCanvaShow={showTaskReport}
        setArcOffCanvaShow={setShowTaskReport}
        //selectedResource={selectedResource}
        // selectedYear={selectedYear}
        // selectedWeek={selectedWeek}
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
          className={`list-data-table report ${
            projectVsStatusReportIsGrouping ? "is-grouping" : null
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
        >
          {sortedColumns.map((column, index) =>
            column.istitle === true ? (
              <FlexGridColumn
                cssClassAll={
                  column.displayapiname.toLowerCase() ==
                  orderByHeader.toLowerCase()
                    ? orderBy === "asc"
                      ? "asc"
                      : "desc"
                    : null
                }
                key={column.id}
                binding={column.displayapiname?.toLowerCase()}
                header={column.name}
                width={column.columnwidth}
                minWidth={300}
                allowDragging={false}
                allowResizing={true}
                isReadOnly={true}
                fixed
                selectionMode="None"
              >
                <FlexGridCellTemplate
                  on
                  cellType="Cell"
                  template={(ctx) => {
                    const dataIndex = column.displayapiname?.toLowerCase();
                    const fullName = ctx?.item[dataIndex];
                    const words = fullName && fullName.split(" ");
                    const startWithLetter = words ? words[0].charAt(0) : "";
                    const endWithLetter =
                      words && words.length > 1
                        ? words[words.length - 1].charAt(0)
                        : "";
                    const UserLeadID = ctx.item.id;
                    console.log(column.displayapiname.toLowerCase());

                    return (
                      <>
                        <div className="name-td without-link new-name-td">
                          {/*   <a href="/360detail_v4" style={{ textDecoration: 'none' }}>*/}
                          <a
                            style={{ textDecoration: "none" }}
                            // onClick={() => HandlePostLeadID(UserLeadID)}
                            onClick={() => console.log(UserLeadID)}
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
                cssClassAll={
                  column.displayapiname.toLowerCase() ===
                  orderByHeader.toLowerCase()
                    ? orderBy === "asc"
                      ? "asc"
                      : "desc"
                    : ""
                }
                binding={column.displayapiname?.toLowerCase()}
                header={column.name}
                width={column.columnwidth}
                minWidth={110}
                visible={column.visible}
                allowResizing={true}
                allowSorting={!nonSortableColumns.includes(column.name)}
                isReadOnly={true}
                fixed
              >
                <FlexGridCellTemplate
                  cellType="Cell"
                  template={(ctx) => {
                    let gridContent = "";
                    let properDateFormat = "";
                    const item = ctx?.item;
                    const dataIndex = column.displayapiname?.toLowerCase();
                    const value = item?.[dataIndex];
                    const currentWeek = item["workday"];
                    const colorCode = item["d1_color"];
                    console.log(item);
                    console.log(
                      `Processing column: ${column.api_name}, currentWeek: ${currentWeek}, colorCode: ${colorCode}, value: ${value}`
                    );

                    const weekMapping = ["D1", "D2", "D3", "D4", "D5", "D6"];

                    if (
                      column.isdate === true &&
                      column.api_name !== "workday"
                    ) {
                      const dateVal = ctx?.item[dataIndex];

                      if (dateVal !== "") {
                        properDateFormat = moment(
                          dateVal,
                          "MM/DD/YYYY h:mm:ss A"
                        ).format("MM/DD/YYYY");
                      }
                    } else if (weekMapping.includes(column.api_name)) {
                      if ("D1" == column.api_name) {
                        gridContent = (
                          <GridTemplate
                            status="d1_hovertext"
                            color="d1_color"
                            item={item}
                            value={value}
                          />
                        );
                      } else if ("D2" == column.api_name) {
                        gridContent = (
                          <GridTemplate
                            status="d2_hovertext"
                            color="d2_color"
                            item={item}
                            value={value}
                          />
                        );
                      } else if ("D3" == column.api_name) {
                        gridContent = (
                          <GridTemplate
                            status="d3_hovertext"
                            color="d3_color"
                            item={item}
                            value={value}
                          />
                        );
                      } else if ("D4" == column.api_name) {
                        gridContent = (
                          <GridTemplate
                            status="d4_hovertext"
                            color="d4_color"
                            item={item}
                            value={value}
                          />
                        );
                      } else if ("D5" == column.api_name) {
                        gridContent = (
                          <GridTemplate
                            status="d5_hovertext"
                            color="d5_color"
                            item={item}
                            value={value}
                          />
                        );
                      } else if ("D6" == column.api_name) {
                        gridContent = (
                          <GridTemplate
                            status="d6_hovertext"
                            color="d6_color"
                            item={item}
                            value={value}
                          />
                        );
                      } else {
                        gridContent = <span>{value}</span>;
                      }
                    } else {
                      gridContent = (
                        <span
                          className="wjgridcelltext-d wjgridcelltext-black"
                          title={value}
                        >
                          {value != "" ? value : 0}
                          <i>
                            {value != 0 ? (
                              <PiInfoBold
                                title="View Task Info"
                                onClick={() =>
                                  handleIconClick(
                                    ctx.item.id,
                                    column.displayapiname
                                  )
                                }
                                style={{ cursor: "pointer" }}
                              />
                            ) : (
                              ""
                            )}
                          </i>
                        </span>
                      );
                    }

                    return (
                      <>
                        {properDateFormat ? (
                          <span title={properDateFormat}>
                            {properDateFormat}
                          </span>
                        ) : (
                          gridContent
                        )}
                      </>
                    );
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

const GridTemplate = ({ item, value, color, status }) => {
  const statusdata = {
    d1_hovertext: "Inprogress$30",
    d2_hovertext: "Completed$40",
    d3_hovertext: "Backlog$10",
    d4_hovertext: "Todo$60",
    d5_hovertext: "Inprogress$70",
    d6_hovertext: "Yest to start$90",
  };
  // Split the string using the `$` delimiter
  const [statusvalue, progresspercentage] = item[status].split("$");
  const currentstatus = {
    status: statusvalue || "-",
    progress: progresspercentage || "-",
  };
  console.log(item);
  return (
    <>
      <span className={`wjgridcelltext-d ${item[color]}`}>
        {value}
        {["", "-"].includes(value) ? null : (
          <ArcToolTip
            HoverText={
              <>
                <p className="status">
                  Plan Status: <span>{currentstatus.status}</span>
                </p>
                <p className="status">
                  Daily Progress: <span>{currentstatus.progress}%</span>
                </p>
              </>
            }
            Tooltipclass={"grid-tooltip"}
            BtnName={<PiInfoBold />}
            Placement="left"
            as="i"
          />
        )}
      </span>
    </>
  );
};
