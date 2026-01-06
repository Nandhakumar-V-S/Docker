// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets
import ProgressBar from "react-bootstrap/ProgressBar";
//? Components
import ProspectingWidget from "./ProspectingWidget";
import { ArcDateFilter } from "@/components/arccomponents/ui-components/ArcYearWeekPicker/ArcYearWeekPicker";

//? CSS

//? Images

//? JSON File

//? Icons
import { GrContactInfo } from "react-icons/gr";
import { TbExternalLink } from "react-icons/tb";
import { RiMailSendLine } from "react-icons/ri";
import { MdAddIcCall } from "react-icons/md";
import { RiAccountBoxLine } from "react-icons/ri";
// *******~ Import ~******** //

const ActivityWidget = () => {
  const [startDate, setStartDate] = useState(new Date());
  const ActivityData = [
    {
      Icon: <RiAccountBoxLine />,
      Title: "New Ticket created via call",
      Description: "103 New leads have been allocated to you",
      Url: "Reach Out New Contacts",
    },
    {
      Icon: <RiMailSendLine />,
      Title: "Pricing query",
      Description: "You have 19 replies that you haven't responded yet",
      Url: "Waiting for Action",
    },
    {
      Icon: <MdAddIcCall />,
      Title: "Product feedback",
      Description: "product enchancement requested - ID1234",
      Url: "Quick Action",
    },
    {
      Icon: <MdAddIcCall />,
      Title: "Email Tickets - Escalation Tomorrow",
      Description: "you have 19 replies that you haven't reponded yet",
      Url: "Reply to Emails",
    },
    {
      Icon: <MdAddIcCall />,
      Title: "Marketing Calls",
      Description: "you have 9 Calls that you haven't made yet",
      Url: "Make a Phone Call",
    },
    {
      Icon: <MdAddIcCall />,
      Title: "Marketing Calls",
      Description: "you have 9 Calls that you haven't made yet",
      Url: "Make a Phone Call",
    },
    {
      Icon: <MdAddIcCall />,
      Title: "Marketing Calls",
      Description: "you have 9 Calls that you haven't made yet",
      Url: "Make a Phone Call",
    },
    {
      Icon: <MdAddIcCall />,
      Title: "Marketing Calls",
      Description: "you have 9 Calls that you haven't made yet",
      Url: "Make a Phone Call",
    },
    {
      Icon: <MdAddIcCall />,
      Title: "Marketing Calls",
      Description: "you have 9 Calls that you haven't made yet",
      Url: "Make a Phone Call",
    },
  ];
  return (
    <React.Fragment>
      <ProspectingWidget className={"activity-widget"}>
        <div className="widget-header">
          <div className="profile">
            <div className="info">
              <span className="icon">
                <GrContactInfo />
              </span>
              <p className="name">Recent Activities</p>
            </div>
          </div>
          <div className="action">
            <ArcDateFilter
              startDate={startDate}
              setStartDate={setStartDate}
              onChange={(date) => {
                setStartDate(date);
              }}
            />
          </div>
        </div>
        <div className="widget-body">
          <ul className="activity-list">
            {[...Array(1)].map((data, index) => (
              <React.Fragment key={index}>
                {ActivityData.map((data, index) => (
                  <li className="activity" key={index}>
                    <span className="icon-main">{data.Icon}</span>
                    <div className="content">
                      <h5>{data.Title}</h5>
                      <p className="desc">{data.Description}</p>
                      <p className="link">
                        <span className="icon">
                          <TbExternalLink />
                        </span>
                        {data.Url}
                      </p>
                    </div>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </ProspectingWidget>
    </React.Fragment>
  );
};
export default ActivityWidget;
