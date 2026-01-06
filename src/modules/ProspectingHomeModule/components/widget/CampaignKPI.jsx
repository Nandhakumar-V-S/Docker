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

import { RiAccountBoxLine } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import { PiTreeStructure } from "react-icons/pi";
// *******~ Import ~******** //

const CampaignKPI = () => {
  const CampaignData = [
    {
      title: "Refund & Exchange Request",
      label: "16 Tickets Waiting for Action",
      date: "3 Tickets in Critical status",
      step: "ID 1234 - Due Tomorrow",
      Total: "16",
      Chat: "2",
      // Loss: "6",
      Calls: "3",
      Emails: "5",
    },
    {
      title: "Pricing Enquiries",
      label: "42 Tickets Waiting for Action",
      date: "3 tickets in Critical status",
      step: "ID 1234 - Due Tomorrow",
      Total: "42",
      Chat: "6",
      // Loss: "12",
      Calls: "8",
      Emails: "16",
    },
    {
      title: "Feature Rquests & Product Feedback",
      label: "16 Tickets waiting for Action",
      date: "3 tickets in Critical status",
      step: "ID 1234 - Due Tomorrow",
      Total: "42",
      Chat: "6",
      // Loss: "12",
      Calls: "8",
      Emails: "16",
    },
    {
      title: "Refund & Exchange Request",
      label: "16 Tickets Waiting for Action",
      date: "3 Tickets in Critical status",
      step: "ID 1234 - Due Tomorrow",
      Total: "16",
      Chat: "2",
      // Loss: "6",
      Calls: "3",
      Emails: "5",
    },
    {
      title: "Pricing Enquiries",
      label: "42 Tickets Waiting for Action",
      date: "3 tickets in Critical status",
      step: "ID 1234 - Due Tomorrow",
      Total: "42",
      Chat: "6",
      // Loss: "12",
      Calls: "8",
      Emails: "16",
    },
    {
      title: "Feature Rquests & Product Feedback",
      label: "16 Tickets waiting for Action",
      date: "3 tickets in Critical status",
      step: "ID 1234 - Due Tomorrow",
      Total: "42",
      Chat: "6",
      // Loss: "12",
      Calls: "8",
      Emails: "16",
    },
  ];
  return (
    <React.Fragment>
      {CampaignData.map((data, index) => (
        <React.Fragment key={index}>
          <ProspectingWidget className={"default-grid campaign-kpi"}>
            <p className="kpi-title">{data.title}</p>
            <div className="campaign-info">
              <ul className="info-list">
                <li>
                  <span className="icon">
                    <RiAccountBoxLine />
                  </span>
                  <span className="value">{data.label}</span>
                </li>
                <li>
                  <span className="icon">
                    <LuCalendarDays />
                  </span>
                  <span className="value">{data.date}</span>
                </li>
                <li>
                  <span className="icon">
                    <PiTreeStructure />
                  </span>
                  <span className="value">{data.step}</span>
                </li>
              </ul>
              <ul className="kpi-count">
                <li>
                  <span className="value">Total</span>
                  <p className="title">{data.Total}</p>
                </li>
                <li>
                  <span className="value">Chat</span>
                  <p className="title">{data.Chat}</p>
                </li>
                {/* <li>
                  <span className="value">Loss</span>
                  <p className="title">{data.Loss}</p>
                </li> */}
                <li>
                  <span className="value">Calls</span>
                  <p className="title">{data.Calls}</p>
                </li>
                <li>
                  <span className="value">Emails</span>
                  <p className="title">{data.Emails}</p>
                </li>
              </ul>
            </div>
          </ProspectingWidget>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
export default CampaignKPI;
