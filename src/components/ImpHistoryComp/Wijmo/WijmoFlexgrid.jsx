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
import moment from "moment-timezone";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiCalendar } from "react-icons/ci";
import { MdOutlinePhoneCallback } from "react-icons/md";
import { MdOutlineSendToMobile } from "react-icons/md";
import { LiaClone } from "react-icons/lia";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useNavigate } from "react-router-dom";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import ListPageTableLoading from "@/modules/loading-skeleton/listpage-table-loading";

import {
  sortColumn,
  updateColumnSeq,
  updatedNewLayout,
} from "@/redux/ImportHistory/actions";

const WijmoFlexgrid = ({ loading, tableData, sortedColumns }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { impHisIsGrouping } = useContext(ArcGlobalContextProvider);
  const [collectionView, setCollectionView] = useState("");
  const [columnSequence, setColumnSequence] = useState([]);
  const [newLayout, setNewLayout] = useState([]);

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
    sessionStorage.setItem("Fromimportscreen", JSON.stringify(1));
    sessionStorage.setItem("Autotabshift", JSON.stringify(1));
  }, []);

  useEffect(() => {
    if (newLayout.length > 0) {
      console.log("newLayout:", newLayout);
      dispatch(updatedNewLayout(newLayout));
    }
  }, [newLayout]);

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

  const HandleNavigateDataImport = (
    status,
    importdataid,
    importdataversionid
  ) => {
    if (status && importdataid && importdataversionid) {
      const UpdatedState = {
        key: "Created",
        currentStep:
          status === "Draft"
            ? 2
            : ["Completed", "Failed", "InProgress"].includes(status)
              ? 3
              : 1,
        Importversionid: importdataversionid,
        Impotdataid: importdataid,
        summarykey: "Created",
      };
      console.log(UpdatedState);
      sessionStorage.setItem("dataimport", JSON.stringify(UpdatedState));
      navigate("/import");
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

  const UTCtoLocalTime = (input) => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Parse the input date string
    const utc = moment.utc(input, "YYYY-MM-DD HH:mm:ss.SSS");

    // Convert to the user's timezone
    const local = utc.clone().tz(userTimezone);

    // Log the timezone and local time for debugging
    console.log("User Timezone:", userTimezone);
    console.log("Local Time:", local.toString());
    console.log("utc Time:", utc.toString());

    // Format the date to the desired format
    const formattedDate = local.format("MM-DD-YYYY hh:mm A");
    return formattedDate;
  };

  return (
    <div>
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
            impHisIsGrouping ? "is-grouping" : null
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
                    const dataIndex = column.displayapiname?.toLowerCase();
                    const fullName = ctx?.item[dataIndex];
                    const words = fullName && fullName.split(" ");
                    const startWithLetter = words ? words[0].charAt(0) : "";
                    const endWithLetter =
                      words && words.length > 1
                        ? words[words.length - 1].charAt(0)
                        : "";
                    const importdataid = ctx?.item.id;
                    const importdataversionid =
                      ctx?.item.utbl_importdataversion_id;
                    const status = ctx?.item.status;
                    return (
                      <>
                        <div className="name-td new-name-td">
                          {/*   <a href="/360detail_v4" style={{ textDecoration: 'none' }}>*/}
                          <a
                            style={{ textDecoration: "none" }}
                            onClick={() => {
                              HandleNavigateDataImport(
                                status,
                                importdataid,
                                importdataversionid
                              );
                              console.log(
                                status,
                                importdataid,
                                importdataversionid
                              );
                            }}
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
                width={column.columnwidth}
                minWidth={150}
                visible={column.visible}
                allowResizing={true}
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
                    const colorCode = item["colorcode"];
                    const status = item["status"];

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
                        console.log(dateVal);
                        properDateFormat = UTCtoLocalTime(dateVal);
                        // properDateFormat = moment(
                        //   dateVal,
                        //   "MM/DD/YYYY h:mm:ss A"
                        // ).format("MM/DD/YYYY");
                      }
                    } else if (weekMapping.includes(column.api_name)) {
                      if ("D1" == column.api_name) {
                        gridContent = (
                          <span className={item["d1color"]}>{value}</span>
                        );
                      } else if ("D2" == column.api_name) {
                        gridContent = (
                          <span className={item["d2color"]}>{value}</span>
                        );
                      } else if ("D3" == column.api_name) {
                        gridContent = (
                          <span className={item["d3color"]}>{value}</span>
                        );
                      } else if ("D4" == column.api_name) {
                        gridContent = (
                          <span className={item["d4color"]}>{value}</span>
                        );
                      } else if ("D5" == column.api_name) {
                        gridContent = (
                          <span className={item["d5color"]}>{value}</span>
                        );
                      } else if ("D6" == column.api_name) {
                        gridContent = (
                          <span className={item["d6color"]}>{value}</span>
                        );
                      } else {
                        gridContent = <span>{value}</span>;
                      }
                    } else if (column.api_name == "status") {
                      // Apply conditional color styling based on status
                      const style = {};
                      if (status === "Completed") {
                        style.color = "green";
                      } else if (status === "pending") {
                        style.color = "orange";
                      } else if (status === "Draft") {
                        style.color = "orange";
                      } else if (status === "Failed") {
                        style.color = "red";
                      } else if (status === "Yet to start") {
                        style.color = "orange";
                      } else if (status === "In Progress") {
                        style.color = "orange";
                      } else if (status === "InProgress") {
                        style.color = "orange";
                      }

                      gridContent = <span style={style}>{value || "-"}</span>;
                    } else if (column.api_name == "") {
                      UTCtoLocalTime();
                    } else {
                      gridContent = <span>{value || "-"}</span>;
                    }

                    return (
                      <>{properDateFormat ? properDateFormat : gridContent}</>
                    );
                  }}
                />
              </FlexGridColumn>
            )
          )}
        </FlexGrid>
      )}
    </div>
  );
};

export default WijmoFlexgrid;
