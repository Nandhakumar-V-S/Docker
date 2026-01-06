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
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiCalendar } from "react-icons/ci";
import { MdOutlinePhoneCallback } from "react-icons/md";
import { MdOutlineSendToMobile } from "react-icons/md";
import { LiaClone } from "react-icons/lia";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import UpdateFollow from "./UpdateFollowup/Updatefollowup";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import ListPageTableLoading from "@/modules/loading-skeleton/listpage-table-loading";

import { GetDefaultFormValues } from "@/redux/Followup/UpdateStatus/GetDefaultValues";
import moment from "moment";
import {
  sortColumn,
  updateColumnSeq,
  updatedNewLayout,
} from "@/redux/Followup/actions";
// * Popup State
// ~ Selected Filter
import { ListContext } from "@/modules/FollowupModule/index";
import { selectedFiltersInfo } from "@/redux/Followup/selector";
// ~ Selected Filter
const WijmoFlexgrid = ({ loading, tableData, sortedColumns }) => {
  const dispatch = useDispatch();
  const { followIsGrouping } = useContext(ArcGlobalContextProvider);
  const [collectionView, setCollectionView] = useState("");
  const [columnSequence, setColumnSequence] = useState([]);
  const [newLayout, setNewLayout] = useState([]);
  const [UpdateStatusshow, setUpdateStatusShow] = useState(false);
  const [SelectedRow, setSelectedRow] = useState(false);
  const [followupupdate, setFolloupupdate] = useState(false);
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

  const updatfollowup = useSelector(
    (state) => state.UpdateStatusState.Addstatus
  );

  console.log(followupupdate);

  useEffect(() => {
    if (updatfollowup == "loading...") {
      setFolloupupdate(true);
    } else {
      setFolloupupdate(false);
    }
  }, [updatfollowup]);

  useEffect(() => {
    if (newLayout.length > 0) {
      console.log("newLayout:", newLayout);
      dispatch(updatedNewLayout(newLayout));
    }
  }, [newLayout]);
  // ~ Selected Filter
  const { FilterDropdownShow } = useContext(ListContext) || {};
  const selectedFilters = useSelector(selectedFiltersInfo);
  const selectedFiltersLength = selectedFilters.length;
  // ~ Selected Filter
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

  const UpdateRowData = (RowData, TransactionID) => {
    // Log RowData to ensure it contains the expected values
    console.log("RowData:", RowData);
    console.log("RowData:", TransactionID);
    // Update the selected row state
    setSelectedRow(RowData);

    dispatch(GetDefaultFormValues(TransactionID));
  };
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

  return (
    <>
      <UpdateFollow
        show={UpdateStatusshow}
        setShow={setUpdateStatusShow}
        SelectedRow={SelectedRow}
      />
      <>
        {loading || followupupdate ? (
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
              followIsGrouping ? "is-grouping" : null
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
                      const dataIndex = column.displayapiname?.toLowerCase();
                      const fullName = ctx?.item[dataIndex];
                      const words = fullName && fullName.split(" ");
                      const startWithLetter = words ? words[0].charAt(0) : "";
                      const endWithLetter =
                        words && words.length > 1
                          ? words[words.length - 1].charAt(0)
                          : "";
                      const UserLeadID = ctx.item.id;
                      const RowData = ctx.item;
                      const TransactionID = ctx.item.id;
                      console.log("RowData", RowData);

                      return (
                        <>
                          <div className="name-td without-link new-name-td with-action-1 ">
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
                            <div className="action with-action-1">
                              <span
                                title="Update Status"
                                onClick={() => {
                                  setUpdateStatusShow(true);
                                  UpdateRowData(RowData, TransactionID);
                                }}
                              >
                                <MdOutlineSystemUpdateAlt />
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
                  key={column.id}
                  binding={column.displayapiname?.toLowerCase()}
                  header={column.name}
                  width={column.columnwidth}
                  minWidth={110}
                  visible={column.visible}
                  allowResizing={true}
                  isReadOnly={true}
                  fixed
                >
                  <FlexGridCellTemplate
                    on
                    cellType="Cell"
                    template={(ctx) => {
                      //  console.log(ctx);
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

                      // console.log(properDateFormat);
                      // console.log(gridvalue);
                      return (
                        <>
                          <div className="name-td new-name-td-default without-cell-edit">
                            <span
                              className="default-value"
                              title={
                                properDateFormat ? properDateFormat : gridvalue
                              }
                            >
                              {properDateFormat ? properDateFormat : gridvalue}
                            </span>
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
    </>
  );
};

export default WijmoFlexgrid;
