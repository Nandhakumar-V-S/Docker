// *******~ Import ~******** //
//? React
import React from "react";
//? Assets

//? Components
import ArcWidget from "@/components/arccomponents/widget-v2/arcwidget";
import { Link } from "react-router-dom";
//? CSS

//? Images

//? JSON File

//? Icons
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { IoArrowForward } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa";
// *******~ Import ~******** //

const KpiWidget = ({ WidgetInfo, Borderbottom }) => {
  return (
    <React.Fragment>
      <ArcWidget className={"kpi-widget"} Borderbottom={Borderbottom}>
        <i>{WidgetInfo.Icon}</i>
        <div className="widget-content">
          <div className="title">
            <p>{WidgetInfo.Title}</p>
            <h4>{WidgetInfo.Value}</h4>
          </div>
          <div className="total">
            <span
              className={`value ${
                WidgetInfo.Percentage.includes("-") ? "minus" : ""
              }`}
            >
              {WidgetInfo.Percentage}
            </span>
            <span className="duration">last {WidgetInfo.Duration}</span>
          </div>
        </div>
      </ArcWidget>
    </React.Fragment>
  );
};
export default KpiWidget;

export function KpiWidgetV2({ WidgetInfo }) {
  return (
    <React.Fragment>
      <ArcWidget className={"kpi-widget kpi-widget-v2"} Borderbottom={true}>
        {/* <pre>{JSON.stringify(WidgetInfoV2, null, 2)}</pre> */}
        <div className="header">
          <h4 className="title">{WidgetInfo.Title}</h4>
          <p className="desc">{WidgetInfo.Desc}</p>
        </div>
        <div className="status-div">
          <p>
            <span className="count">{WidgetInfo.Status.Completed}</span>
            Lead
          </p>
          <p>
            <span className="count">{WidgetInfo.Status.Inprogress}</span>
            Opportunity
          </p>
          <p>
            <span className="count">{WidgetInfo.Status.Todo}</span>
            Customer
          </p>
          {WidgetInfo.Status.Cancel && (
            <p>
              <span className="count">{WidgetInfo.Status.Cancel}</span>
              Cancelled
            </p>
          )}
        </div>
      </ArcWidget>
    </React.Fragment>
  );
}

export function KpiWidgetv3({ WidgetInfo, Borderbottom }) {
  return (
    <React.Fragment>
      <ArcWidget
        className={"kpi-widget kpi-widget-v3"}
        Borderbottom={Borderbottom}
      >
        <i>{WidgetInfo.Icon}</i>
        <div className="widget-content">
          <div className="title">
            <p>{WidgetInfo.Title}</p>
            <h4>{WidgetInfo.Value}</h4>
          </div>
        </div>
      </ArcWidget>
    </React.Fragment>
  );
}

export function KpiWidgetv4({ WidgetInfo, Borderbottom }) {
  return (
    <React.Fragment>
      <ArcWidget
        className={"kpi-widget kpi-widget-v4"}
        Borderbottom={Borderbottom}
      >
        <div className="widget-content">
          <i>{WidgetInfo.Icon}</i>
          <div className="title">
            <h4>{WidgetInfo.Value}</h4>
            <p>{WidgetInfo.Title}</p>
          </div>
        </div>
        <div className="total">
          <span className="duration">
            <Link to={WidgetInfo.Link}>
              {WidgetInfo.LinkLabel} <IoArrowForward />
            </Link>
          </span>
          <span></span>
        </div>
      </ArcWidget>
    </React.Fragment>
  );
}

export const KpiWidgetV5 = ({ WidgetInfo, Borderbottom, className }) => {
  return (
    <React.Fragment>
      <ArcWidget
        className={`kpi-widget kpi-widget-v5 ${className}`}
        Borderbottom={Borderbottom}
      >
        <div
          className={`widget-content ${
            WidgetInfo.IconType === "false" && "no-icon"
          }`}
        >
          <span className="count">{WidgetInfo.Count}</span>

          <div className="icon-title-total">
            {WidgetInfo.IconType === "false" ? null : (
              <i className="main-icon">
                {WidgetInfo.IconType === "bill" ? (
                  <HiOutlineDocumentText />
                ) : WidgetInfo.IconType === "pay" ? (
                  <FaRegMoneyBillAlt />
                ) : null}
              </i>
            )}
            <div className="title">
              <p>{WidgetInfo.Title}</p>
              <h4>{WidgetInfo.Value}</h4>
            </div>
          </div>
          {WidgetInfo.PreviousValue && (
            <div className="total">
              <span className="duration">{WidgetInfo.Duration}</span>
              <span className={`value`}>
                {WidgetInfo.PreviousValue}{" "}
                <i>
                  <FaArrowDown />
                </i>
              </span>
            </div>
          )}
        </div>
      </ArcWidget>
    </React.Fragment>
  );
};

export const WidgetGroup = ({ children }) => {
  return (
    <React.Fragment>
      <ArcWidget className={`kpi-widget-group `}>{children}</ArcWidget>
    </React.Fragment>
  );
};
