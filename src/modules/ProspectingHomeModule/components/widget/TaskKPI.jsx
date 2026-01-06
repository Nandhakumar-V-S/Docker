// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets

//? Components
import ProspectingWidget from "./ProspectingWidget";

//? CSS

//? Images

//? JSON File

//? Icons
import { RiMailSendLine } from "react-icons/ri";
import { MdAddIcCall } from "react-icons/md";
import { TbExternalLink } from "react-icons/tb";
// *******~ Import ~******** //

const TaskKPI = () => {
  const TaskData = [
    {
      label: "Open Ticket",
      count: "12",
      emails: "7",
      calls: "5",
    },
    {
      label: "Tickets InProgress",
      count: "5",
      emails: "3",
      calls: "2",
    },
    {
      label: "Escalated Tickets",
      count: "99",
      emails: "45",
      calls: "54",
    },
    // {
    //   label: "Due Tomorrow",
    //   count: "32",
    //   emails: "23",
    //   calls: "9",
    // },
  ];
  return (
    <React.Fragment>
      {TaskData.map((data, index) => (
        <React.Fragment key={index}>
          <ProspectingWidget className={"default-grid task-kpi"}>
            <p className="kpi-title">
              {data.label} <span>({data.count})</span>{" "}
              {/* <span className="see-all">
                <TbExternalLink /> See all task
              </span> */}
            </p>
            <div className="task-info">
              <div className="info-box">
                <span className="icon email">
                  <RiMailSendLine />
                </span>
                <div className="info">
                  <span className="value"> Emails</span>
                  <p className="title">{data.emails}</p>
                </div>
              </div>
              <div className="info-box">
                <span className="icon call">
                  <MdAddIcCall />
                </span>
                <div className="info">
                  <span className="value">Calls</span>
                  <p className="title">{data.calls}</p>
                </div>
              </div>
            </div>
          </ProspectingWidget>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
export default TaskKPI;
