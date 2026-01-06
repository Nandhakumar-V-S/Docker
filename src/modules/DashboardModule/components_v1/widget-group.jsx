// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets
import Table from "react-bootstrap/Table";
import { Chart } from "react-google-charts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
//? Components

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

        <ArcTable TableTitle="Leads - Total Leads" />
        <ArcTable TableTitle="My Leads - Active Leads" />
        <ArcTable TableTitle="My Leads - Untouched Leads" />

        <ArcTable TableTitle="Calls -  Overdue Calls" />
        <LeadOpen />
        <Meeting />
        <Opportunity />
        {/* <LeadOpen /> */}
      </div>
    </>
  );
};

export default WidgetGroup;
const LeadOpen = () => {
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
              <div className="child-tab">
                <div className="table-div">
                  <LeadTable />
                </div>
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
              {/* <div className=" child-tab">
                <ArcChart />
              </div> */}
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
const Meeting = () => {
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
              <div className="child-tab">
                <div className="table-div">
                  <LeadTable />
                </div>
              </div>
            </>
          </Tab>
          <Tab
            eventKey="Overdue Meetings"
            title={
              <>
                Overdue Meetings <span className="count">4</span>
              </>
            }
          >
            <>
              {/* <div className=" child-tab">
                <ArcChart />
              </div> */}
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
  const [key, setKey] = useState("Today Activity");
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
            eventKey="Today Activity"
            title={
              <>
                Today Activity <span className="count">5</span>
              </>
            }
          >
            <>
              <div className=" child-tab">
                <ArcChart />
              </div>
            </>
          </Tab>
          <Tab
            eventKey="Overdue Meetings"
            title={
              <>
                Overdue Meetings <span className="count">4</span>
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
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mark Otto</td>
          <td>Converted</td>
          <td>Sales Honey</td>
        </tr>
        <tr>
          <td>Jacob Thornton</td>
          <td>New Lead</td>
          <td>Sales Honey</td>
        </tr>
        <tr>
          <td>Larry Bird</td>
          <td>Qualify</td>
          <td>Web</td>
        </tr>
        <tr>
          <td>Mark Otto</td>
          <td>Converted</td>
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

const ArcTable = (props) => {
  return (
    <>
      <div className="arc-table-data">
        <div className="table-title-div">
          <h3>{props.TableTitle}</h3>
          <span className="filter">
            <IoFilterSharp />
          </span>
          <span className="action">
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className="table-div">
          <LeadTable />
        </div>
      </div>
    </>
  );
};
