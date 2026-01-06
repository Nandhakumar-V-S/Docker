// *******~ Import ~******** //
//? React
import React, { useState, useContext } from "react";
//? Assets
import Table from "react-bootstrap/Table";
import { Chart } from "react-google-charts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import { ResizableBox as ReactResizableBox } from "react-resizable";

import "react-resizable/css/styles.css";
//? Components
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
//? CSS

//? Images

//? JSON File

//? Icons
import { IoFilterSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { SlWallet } from "react-icons/sl";
import { CiWavePulse1 } from "react-icons/ci";
import { PiBriefcase } from "react-icons/pi";
import { FaUserFriends } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsPlus } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
// *******~ Import ~******** //

function ResizableBox({ width = 100, height = 300, resizable = true }) {
  // Define min and max width constraints
  // const {
  //   ScreenWidth,
  //   BreakpointXs,
  //   BreakpointSm,
  //   BreakpointMd,
  //   Breakpointlg,
  //   BreakpointXl,
  //   BreakpointXxl,
  // } = useContext(ContextWidthProvider);
  const minWidth = 300;
  const maxWidth = 1200;

  // Define min and max height constraints if needed
  const minHeight = 135;
  const maxHeight = 500;

  return (
    <>
      {resizable ? (
        <ReactResizableBox
          width={width}
          height={height}
          minConstraints={[minWidth, minHeight]} // Set minimum width and height
          maxConstraints={[maxWidth, maxHeight]} // Set maximum width and height
          className="custom-widget color-1 widget-medium"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <p>Resize</p>
          </div>
        </ReactResizableBox>
      ) : (
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          <p>Resize</p>
        </div>
      )}
    </>
  );
}

const ArcWidget = ({
  ColorType,
  Icon,
  Title,
  Value,
  Percentage,
  Decrease,
  Duration,
  WidgetSize,
}) => {
  return (
    <>
      <div
        className={`custom-widget color-${ColorType} ${
          WidgetSize === "medium"
            ? "widget-medium"
            : WidgetSize === "large"
              ? "widget-large"
              : ""
        }`}
      >
        <i>{Icon}</i>
        <div className="widget-content">
          <div className="title">
            <p>{Title}</p>
            <h4>{Value}</h4>
          </div>
          <div className="total">
            <span className={`value ${Decrease ? "decrease" : ""}`}>
              {Percentage}
            </span>
            <span className="duration">this {Duration}</span>
          </div>
        </div>
      </div>
    </>
  );
};

const WidgetGroup = () => {
  return (
    <>
      <div className="custom-widget-group">
        {/* <ResizableBox /> */}
        <ArcWidget
          ColorType="1"
          Icon={
            <>
              <FaUsers />
            </>
          }
          Title="Total Lead"
          Value="1,02,890"
          Percentage="+40%"
          Decrease={false}
          Duration="month"
        />
        <ArcWidget
          ColorType="2"
          Icon={
            <>
              {/* <SlWallet /> */}
              <FaUsers />
            </>
          }
          Title="Active Leads"
          Value="56,562"
          Percentage="+40%"
          Decrease={false}
          Duration="month"
        />
        <ArcWidget
          ColorType="3"
          Icon={
            <>
              <FaUsers />
            </>
          }
          Title="Untouched Leads"
          Value="56,562"
          Percentage="-12%"
          Decrease={true}
          Duration="month"
        />
        <ArcWidget
          ColorType="4"
          Icon={
            <>
              <FiPhoneCall />
            </>
          }
          Title="Today Calls"
          Value="56,562"
          Percentage="+40%"
          Decrease={false}
          Duration="month"
        />
        <ArcWidget
          ColorType="2"
          Icon={
            <>
              <FiPhoneCall />
            </>
          }
          Title="Overdue Calls"
          Value="56,562"
          Percentage="+40%"
          Decrease={false}
          Duration="month"
        />
        <ArcWidget
          ColorType="1"
          Icon={
            <>
              <FaUsers />
            </>
          }
          Title="Today Meetings"
          Value="562"
          Percentage="-12%"
          Decrease={true}
          Duration="month"
        />
        <ArcWidget
          ColorType="2"
          Icon={
            <>
              <FaUsers />
            </>
          }
          Title="Overdue Meetings"
          Value="562"
          Percentage="-12%"
          Decrease={true}
          Duration="month"
        />
        <ArcWidget
          ColorType="3"
          Icon={
            <>
              <SlWallet />
            </>
          }
          Title="By Revenue"
          Value="$56,562"
          Percentage="-12%"
          Decrease={true}
          Duration="month"
        />
        <Leads />
        <CallsTab />
        <MeetingTab />
        <Opportunity />
      </div>
    </>
  );
};

export default WidgetGroup;

const CallsTab = () => {
  const [key, setKey] = useState("Today Calls");
  return (
    <>
      <div className="arc-tab-content inside-widget">
        <div className="tab-title-div">
          <h3>Calls</h3>
          <span className="filter">
            <IoFilterSharp />
          </span>
          <span className="action">
            <BsThreeDotsVertical />
          </span>
        </div>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="inside-widget-tab"
          transition={false}
        >
          <Tab
            eventKey="Today Calls"
            title={
              <>
                Today Calls <span className="count">5</span>
              </>
            }
          >
            <>
              <div className="table-div">
                <LeadTable />
              </div>
            </>
          </Tab>
          <Tab
            eventKey="Overdue Call"
            title={
              <>
                Overdue Call <span className="count">3</span>
              </>
            }
          >
            <>
              <div className="table-div">
                <LeadTable />
              </div>
            </>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};
const Leads = () => {
  const [key, setKey] = useState("Total Leads");
  return (
    <>
      <div className="arc-tab-content inside-widget">
        <div className="tab-title-div">
          <h3>My Leads</h3>
          <span className="filter">
            <IoFilterSharp />
          </span>
          <span className="action">
            <BsThreeDotsVertical />
          </span>
        </div>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="inside-widget-tab"
          transition={false}
        >
          <Tab
            eventKey="Total Leads"
            title={
              <>
                Total Leads <span className="count">5</span>
              </>
            }
          >
            <>
              <div className="table-div">
                <LeadTable />
              </div>
            </>
          </Tab>
          <Tab
            eventKey="Active Leads"
            title={
              <>
                Active Leads <span className="count">3</span>
              </>
            }
          >
            <>
              <div className="table-div">
                <LeadTable />
              </div>
            </>
          </Tab>
          <Tab
            eventKey="Untouched Leads"
            title={
              <>
                Untouched Leads <span className="count">5</span>
              </>
            }
          >
            <>
              <div className="table-div">
                <LeadTable />
              </div>
            </>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};
const MeetingTab = () => {
  const [key, setKey] = useState("Today Meetings");
  return (
    <>
      <div className="arc-tab-content inside-widget">
        <div className="tab-title-div">
          <h3>Meetings</h3>
          <span className="filter">
            <IoFilterSharp />
          </span>
          <span className="action">
            <BsThreeDotsVertical />
          </span>
        </div>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="inside-widget-tab"
          transition={false}
        >
          <Tab
            eventKey="Today Meetings"
            title={
              <>
                Today Meetings <span className="count">5</span>
              </>
            }
          >
            <>
              <div className="table-div">
                <LeadTable />
              </div>
            </>
          </Tab>
          <Tab
            eventKey="Overdue Meetings"
            title={
              <>
                Overdue Meetings <span className="count">3</span>
              </>
            }
          >
            <>
              <div className="table-div">
                <LeadTable />
              </div>
            </>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};
const Opportunity = () => {
  const [key, setKey] = useState("By Revenue");
  return (
    <>
      <div className="arc-tab-content inside-widget">
        <div className="tab-title-div">
          <h3>Opportunity</h3>
          <span className="filter">
            <IoFilterSharp />
          </span>
          <span className="action">
            <BsThreeDotsVertical />
          </span>
        </div>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="inside-widget-tab"
          transition={false}
        >
          <Tab
            eventKey="By Revenue"
            title={
              <>
                By Revenue <span className="count">5</span>
              </>
            }
          >
            <>
              <div className="table-div">
                <LeadTable />
              </div>
            </>
          </Tab>
          <Tab
            eventKey="Today Activity"
            title={
              <>
                Today Activity <span className="count">3</span>
              </>
            }
          >
            <>
              <div className="table-div">
                <LeadTable />
              </div>
            </>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

function LeadTable() {
  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Lead Name</th>
          <th>Lead Stage</th>
          <th>Lead Source</th>
          <th>Lead Source</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mark Otto</td>
          <td>Converted</td>
          <td>Sales Honey</td>
          <td>Sales Honey</td>
        </tr>
        <tr>
          <td>Jacob Thornton</td>
          <td>New Lead</td>
          <td>Sales Honey</td>
          <td>Sales Honey</td>
        </tr>
        <tr>
          <td>Larry Bird</td>
          <td>Qualify</td>
          <td>Web</td>
          <td>Web</td>
        </tr>
        <tr>
          <td>Mark Otto</td>
          <td>Converted</td>
          <td>Sales Honey</td>
          <td>Sales Honey</td>
        </tr>
      </tbody>
    </Table>
  );
}

export const data = [
  ["Task", "Hours per Day"],
  ["New Lead", 11],
  ["Qualify", 2],
  ["Bad Contact Info", 2],
  ["Converted", 2],
  ["Existing Account", 7],
];

export const options = {
  is3D: true,
};

export function ArcChart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"250px"}
      className="arc-chart"
    />
  );
}
