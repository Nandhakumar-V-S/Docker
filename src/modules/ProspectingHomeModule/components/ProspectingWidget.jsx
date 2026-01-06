/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useContext, useState } from "react";
//? Assets
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import AccordionContext from "react-bootstrap/AccordionContext";
import Accordion from "react-bootstrap/Accordion";
//? Components
import TaskProgress from "./widget/TaskProgress";
import ActivityWidget from "./widget/ActivityWidget";
import TaskKPI from "./widget/TaskKPI";
import CampaignKPI from "./widget/CampaignKPI";
import AddButtonWidget from "@/components/arccomponents/widget-v2/addButtonWidget";
import ActivitesWidget, {
  ActivitesWidgetV2,
} from "@/components/arccomponents/widget-v2/ActivitesWidget";
import {
  GridDataToday,
  GridBinding,
  GridData,
  GridDataTomorrow,
  GridDataOverdue,
  LeadData,
} from "./widget/Grid";
//? CSS

//? Images

//? JSON File

//? Icons
import { IoIosArrowDown, IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { Tab, Tabs } from "react-bootstrap";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

// *******~ Import ~******** //

const ProspectingWidget = ({ DataType }) => {
  const progressDataMine = [
    {
      Resourceid: "1016",
      Label: "Created By me",
      PlannedTask: "37",
      completedTask: "12", // 60% completion
    },
    {
      Resourceid: "1009",
      Label: "Assigened To me",
      PlannedTask: "35",
      completedTask: "11", // 80% completion
    },
    {
      Resourceid: "1011",
      Label: "My New Tickets",
      PlannedTask: "40",
      completedTask: "10", // 85% completion
    },
    {
      Resourceid: "1012",
      Label: "My Overdue Tickets",
      PlannedTask: "50",
      completedTask: "10", // 50% completion
    },
    {
      Resourceid: "1013",
      Label: "My Reopened Tickets",
      PlannedTask: "20",
      completedTask: "10", // 75% completion
    },
    {
      Resourceid: "1013",
      Label: "Tickets Waiting for Approval",
      PlannedTask: "12",
      completedTask: "7", // 75% completion
    },
  ];
  const progressDataTeam = [
    {
      Resourceid: "1016",
      Label: "Annamalai V",
      PlannedTask: "56",
      completedTask: "32", // 60% completion
    },
    {
      Resourceid: "1009",
      Label: "Gopinath Ganesan",
      PlannedTask: "49",
      completedTask: "41", // 80% completion
    },
    {
      Resourceid: "1011",
      Label: "Ravishankar Sivanesan",
      PlannedTask: "61",
      completedTask: "55", // 85% completion
    },
    {
      Resourceid: "1012",
      Label: "Kiran",
      PlannedTask: "50",
      completedTask: "42", // 50% completion
    },
    {
      Resourceid: "1013",
      Label: "Aarthi R",
      PlannedTask: "35",
      completedTask: "26", // 75% completion
    },
    {
      Resourceid: "1013",
      Label: "Eric",
      PlannedTask: "42",
      completedTask: "30", // 75% completion
    },
  ];
  const ActivitiesData = [
    {
      type: "call",
      details: {
        name: "Gonzalez Helen",
        owner: "Admin Manager",
        subject: "Time Tracking",
        number: "(907) 095-345-897",
        date: "10/06/2024",
        time: "10:00PM - 11:00PM",
        priority: "High",
        status: "Sheduled",
      },
    },
    {
      type: "event",
      details: {
        name: "Gonzalez Helen",
        owner: "Admin Manager",
        subject: "Meeting is held for online training",
        number: "",
        date: "10/06/2024",
        time: "10:00PM - 11:00PM",
        priority: "Low",
        status: "Cancelled",
      },
    },
    {
      type: "task",
      details: {
        name: "Gonzalez Helen",
        owner: "Admin Manager",
        subject: "Project demo sheduled on tomorrow",
        number: "",
        date: "10/06/2024",
        time: "10:00PM - 11:00PM",
        priority: "Medium",
        status: "Sheduled",
      },
    },
    {
      type: "call",
      details: {
        name: "Gonzalez Helen",
        owner: "Admin Manager",
        subject: "Outgoing call to Jared Roy",
        number: "",
        date: "10/06/2024",
        time: "10:00PM - 11:00PM",
        priority: "High",
        status: "Completed",
      },
    },
    {
      type: "task",
      details: {
        name: "Gonzalez Helen",
        owner: "Admin Manager",
        subject: "Due date is tomorrow for sending the project",
        number: "",
        date: "10/06/2024",
        time: "10:00PM - 11:00PM",
        priority: "Medium",
        status: "Sheduled",
      },
    },
  ];
  const [key , setkey] = useState("New Tickets")
  return (
    <React.Fragment>
      <section className="prospectingwidget-section">
        <aside>
          <TaskProgress
            DataType={DataType}
            progressData={
              DataType === "Mine" ? progressDataMine : progressDataTeam
            }
          />
          <ActivityWidget />
        </aside>
        <section className="main-section">
          <div className="accordion" defaultActiveKey="0">
            <CustomToggle eventKey="0">
              <h4>Tickets (4)</h4>
              {/* <span>
                <IoIosArrowDown />
              </span> */}
            </CustomToggle>
            <div eventKey="0">
              <div className="task-kpi-widgrt-group">
                <TaskKPI />
              </div>
            </div>
          </div>
          <div className="accordion with-actions" defaultActiveKey="0">
            <CustomToggle eventKey="0">
              <h4>Request & Inquiries (2)</h4>
              <div className="actions">
                <button><MdArrowBackIos /></button>
                <button><MdArrowForwardIos /></button>
              </div>
            </CustomToggle>
            <div eventKey="0">
              <div className="task-kpi-widgrt-group">
                <CampaignKPI />
              </div>
            </div>
          </div>
          <div className="task-kpi-widgrt-group">
          <div className="table-div prospecting-widget">
          <Tabs onSelect={(k) => setkey(k)}>
            <Tab eventKey="New Tickets" title="New Tickets">
              <div className="table-div prospecting-widget">
                <GridData 
                  GridData={key ===  "New Tickets" ?  LeadData : LeadData}
                  GridBinding={GridBinding}
                  LoadingState={false}
                />
              </div>
            </Tab>
            <Tab eventKey="overdue Tickets" title="Overdue Tickets">
              <div className="table-div prospecting-widget">
                <GridData
                  GridData={key ===  "New Tickets" ?  LeadData : LeadData}
                  GridBinding={GridBinding}
                  LoadingState={false}
                />
              </div>
            </Tab>
            <Tab eventKey="Customer Tickets" title="Customer Tickets">
              <div className="table-div prospecting-widget">
                <GridData 
                  GridData={key ===  "New Tickets" ?  LeadData : LeadData}
                  GridBinding={GridBinding}
                  LoadingState={false}
                />
              </div>
            </Tab>
            <Tab eventKey="Tickets Waiting for Approval" title="Tickets Waiting for Approval">
              <div className="table-div prospecting-widget">
                <GridData 
                  GridData={key ===  "New Tickets" ?  LeadData : LeadData}
                  GridBinding={GridBinding}
                  LoadingState={false}
                />
              </div>
            </Tab>
            <Tab eventKey="Unassigned tickets" title="Unassigned tickets">
              <div className="table-div prospecting-widget">
                <GridData 
                  GridData={key ===  "New Tickets" ?  LeadData : LeadData}
                  GridBinding={GridBinding}
                  LoadingState={false}
                />
              </div>
            </Tab>
          </Tabs>
          </div>
          </div>
          {/* <div className="task-kpi-widgrt-group">
              
                  <GridData
                    GridData={LeadData}
                    GridBinding={GridBinding}
                    LoadingState={false}
                  />
                </div>
              </div> */}

          <div className="home-widget">
            {/* <ActivitesWidget
          ActivitiesData={ActivitiesData}
          Title={"Recent Activites"}
        /> */}
            <AddButtonWidget Title="Actions" />
            <ActivitesWidgetV2 />
          </div>
        </section>
      </section>
    </React.Fragment>
  );
};
export default ProspectingWidget;

export function CustomToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      className={`widget-group-title ${isCurrentEventKey && "active"}`}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

const ArcHomeTabType1 = () => {
  const [key, setKey] = useState("overview");
  return (
    <>
      <div className="arc-tab-content">
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="">
          <Tab eventKey="overview" title={<>Overview</>}>
            <>
              <div className="tab-main-content">
                <p>Tab 1</p>
              </div>
            </>
          </Tab>
          <Tab eventKey="notes" title={<>Notes</>}>
            <>
              <div className="tab-main-content">
                <p>Tab 2</p>
              </div>
            </>
          </Tab>
          <Tab eventKey="activities" title={<>Activities</>}>
            <>
              <div className="tab-main-content">
                <p>Tab 3</p>
              </div>
            </>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};
