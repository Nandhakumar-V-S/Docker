// *******~ Import ~******** //
//? React
import React from "react";
//? Assets

//? Components
import ArcWidget from "@/components/arccomponents/widget-v2/arcwidget";
import { WidgetHeader } from "@/components/arccomponents/widget-v2/widgetHeader";
//? CSS

//? Images

//? JSON File

//? Icons

import { LuClock3 } from "react-icons/lu";
import { LuUser2 } from "react-icons/lu";
import { FaCircleDot } from "react-icons/fa6";
import { MdOutlinePhoneCallback } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdAddIcCall } from "react-icons/md";

import { FaRegCalendar } from "react-icons/fa6";

import { BiTask } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";

import { IoCalendarClearOutline } from "react-icons/io5";
// *******~ Import ~******** //

export default function TimelineWidget({ TimelineData }) {
  //! ArcDropDownControledData State
  const ArcDropDownControledData = [
    { id: 1, value: "this Week" },
    { id: 2, value: "this Month" },
    { id: 3, value: "this Year" },
  ];
  return (
    <React.Fragment>
      <ArcWidget className="arc-timeline-widget">
        <WidgetHeader
          Title={"Timeline"}
          ArcDropDownControledData={ArcDropDownControledData}
        />
        <div className="timeline-container">
          <div className="timeline-continue">
            <div className="current-time">
              <div className="circle">
                <FaCircleDot />
              </div>
            </div>
            {TimelineData?.map((data, index) => (
              <React.Fragment key={index}>
                <div className="timeline-data even-div">
                  <div className="left-div">
                    <p>{data.Time}</p>
                  </div>
                  <div className="right-div">
                    <div className="history-box">
                      <span className="icon">
                        {data.Type === "call" ? (
                          <MdOutlinePhoneCallback />
                        ) : data.Type === "event" ? (
                          <IoCalendarClearOutline />
                        ) : data.Type === "task" ? (
                          <BiTask />
                        ) : null}
                      </span>
                      <div className="content">
                        <h5>{data.Title}</h5>
                        <p className="date-time">
                          <span className="time-icon">
                            <LuClock3 />
                          </span>
                          {data.DateTime}
                        </p>
                        <p>
                          <span>
                            <LuUser2 /> {data.Name}
                          </span>
                          <span
                            className={`tag ${
                              data.Status === 0
                                ? "completed"
                                : data.Status === 1
                                  ? "pending"
                                  : data.Status === 2
                                    ? "cancelled"
                                    : null
                            }`}
                          >
                            {data.Status === 0
                              ? "Completed"
                              : data.Status === 1
                                ? "Pending"
                                : data.Status === 2
                                  ? "Cancelled"
                                  : null}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </ArcWidget>
    </React.Fragment>
  );
}
