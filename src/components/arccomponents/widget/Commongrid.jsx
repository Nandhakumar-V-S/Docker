/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
//? Assets
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { parseISO, format } from "date-fns";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import { get360EntityInfo } from "@/redux/360Details/Get360EntityInfo";
//? Components
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import WijmoPagination from "@/components/PlanComp/Wijmo/WijmoPagination";
import ArcDataNotFound from "@/components/arccomponents/ui-components/nodatafound/no-data-found";
import OfflineGrid_API from "./OfflineGrid_Api.json";
import ListPageTableLoading from "@/modules/loading-skeleton/listpage-table-loading";
import { fetchPlanSummery } from "@/redux/Home/PlanSummery/PlanSummery";
import ArcWidget from "@/components/arccomponents/widget/arcwidget";
import { WidgetHeader } from "@/components/arccomponents/widget/widgetHeader";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { GetDefaultFormValues } from "@/redux/Execution/UpdateStatus/GetDefaultValues";

import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate,
} from "@grapecity/wijmo.react.grid";
import "@grapecity/wijmo.styles/wijmo.css";

import UpdateFollow from "@/components/FollowupComp/Wijmo/UpdateFollowup/Updatefollowup";
import { changeEntityid } from "@/redux/Home/actions";
import { GetDefaultFormValues as GetDefaultFormValuesFollowup } from "@/redux/Followup/UpdateStatus/GetDefaultValues";
//? CSS

//? Images

//? JSON File

//? Icons
import { BiTask } from "react-icons/bi";
import { MdOutlineScreenShare } from "react-icons/md";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import moment from "moment";
// *******~ Import ~******** //

const CommonGridDataTable = ({
  GridBinding,
  GridData,
  Response,
  LoadingState,
}) => {
  //   alert("CommonGridDataTable");
  console.log(GridData);
  useEffect(() => {
    removeWijimoLicense();
  }, []);

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

  // const GridBinding = [
  //   // { header: "title", binding: "utbl_Workitem_column16", width: "200" },
  //   { header: "Project", binding: "project", width: 150 },
  //   { header: "Due Date", binding: "duedate", width: 110 },
  //   { header: "Followup Type", binding: "followuptype", width: 120 },
  //   { header: "Work Day", binding: "workday", width: 100 },
  //   { header: "Work Week", binding: "workweek", width: 100 },
  //   { header: "Status", binding: "status", width: 110 },
  //   { header: "Assigned By", binding: "assignedby", width: 130 },
  //   { header: "Assigned To", binding: "assignedto", width: 130 },
  // ];
  console.log(GridData);
  return (
    <React.Fragment>
      {GridData?.length === 0 ? (
        <ArcDataNotFound Title={"Data not found"} />
      ) : null}
      {LoadingState ? (
        <ListPageTableLoading />
      ) : (
        <FlexGrid
          autoRowHeights={true}
          deferResizing={true}
          frozenColumns={1}
          itemsSource={GridData}
          allowSorting={true}
          className="list-data-table with-360-page"
          headersVisibility="Column"
          selectionMode="None"
        >
          <FlexGridColumn
            allowDragging={false}
            allowResizing={true}
            binding="utbl_Workitem_column16"
            header="Task Name"
            minWidth={350}
            isReadOnly={true}
            fixed
          >
            <FlexGridCellTemplate
              on
              cellType="Cell"
              template={(ctx) => {
                const fullName = ctx.item.utbl_Workitem_column16;
                const RowData = ctx.item;
                const TransactionID = ctx.item.id;
                const words = fullName && fullName.split(" ");
                const startWithLetter = words ? words[0].charAt(0) : "";
                const endWithLetter =
                  words && words.length > 1
                    ? words[words.length - 1].charAt(0)
                    : "";
                return (
                  <>
                    <div className="name-td without-link new-name-td with-action-1">
                      <a style={{ textDecoration: "none" }}>
                        <div className="name-detail">
                          <span>
                            {startWithLetter}
                            {endWithLetter}
                          </span>
                          <p title={fullName}>{fullName}</p>
                        </div>
                      </a>
                      <div className="">
                        {/* <span
                          title="Update Status"
                          onClick={() => {
                            setUpdateStatusShow(true);
                            UpdateRowData(RowData, TransactionID);
                          }}
                        >
                          <MdOutlineSystemUpdateAlt />
                        </span> */}
                      </div>
                    </div>
                  </>
                );
              }}
            />
          </FlexGridColumn>

          {GridBinding.map((data, index) => (
            <FlexGridColumn
              key={index}
              binding={data.binding}
              header={data.header}
              minWidth={data.width}
              width={data.width}
              allowResizing={true}
              allowSorting={true}
              fixed
              isReadOnly={true}
            >
              <FlexGridCellTemplate
                on
                cellType="Cell"
                template={(ctx) => {
                  console.log(ctx.item);
                  const GridValue =
                    ctx.item.column30 || ctx.item.utbl_Workitem_column30;
                  const ActualValue = ctx?.item[data.binding];
                  console.log(GridValue);
                  console.log(ActualValue);
                  const formattedDate = ["", null].includes(GridValue)
                    ? "-"
                    : moment(GridValue, "MM/DD/YYYY h:mm:ss A").format(
                        "MM/DD/YYYY"
                      );
                  return (
                    <>
                      <div className="name-td new-name-td-default without-cell-edit">
                        <span
                          className="default-value"
                          title={
                            data.binding === "column30"
                              ? formattedDate
                              : ActualValue || "-"
                          }
                        >
                          {data.binding === "column30"
                            ? formattedDate
                            : ActualValue || "-"}
                        </span>
                      </div>
                    </>
                  );
                }}
              />
            </FlexGridColumn>
          ))}
        </FlexGrid>
      )}
    </React.Fragment>
  );
};
export default CommonGridDataTable;
