import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { BiEdit, BiTask } from "react-icons/bi";
import { FaCircleDot, FaRegCircleUser } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbClock } from "react-icons/tb";
import { Form } from "react-bootstrap";
import { MdOutlinePhoneCallback } from "react-icons/md";
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuClock3, LuUser2 } from "react-icons/lu";

function ActivitiesTab() {
  const [key, setKey] = useState("Comments");

  return (
    <Tabs
      className="activities-tab"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="Comments" title="Comments">
        <Comments />
      </Tab>
      <Tab eventKey="Logs" title="Logs">
        <Timeline />
      </Tab>
      <Tab eventKey="Associated Tickets" title="Associated Tickets">
        Associated Tickets
      </Tab>
    </Tabs>
  );
}

export default ActivitiesTab;

const Comments = () => {
  const NotesData = [
    {
      id: 1,
      user: "Admin",
      date: "3 hours ago",
      des: "We're excited to invite you to our upcoming webinar, 'Navigating Future Trends,' where industry experts will share.",
    },
    {
      id: 2,
      user: "Super Admin",
      date: "5 hours ago",
      des: "Strategic insights to help you stay ahead in an ever-evolving landscape.",
    },
    {
      id: 3,
      user: "Guest User",
      date: "2 hours ago",
      des: "Join us for an interactive session on best practices in digital transformation.",
    },
    {
      id: 4,
      user: "Manager",
      date: "1 hour ago",
      des: "Exciting updates on our latest product enhancements are coming your way!",
    },
    {
      id: 5,
      user: "Moderator",
      date: "30 minutes ago",
      des: "Don't miss our Q&A session where we answer all your questions live.",
    },
    {
      id: 6,
      user: "Editor",
      date: "10 minutes ago",
      des: "Stay tuned for upcoming changes in our content strategy and engagement plans.",
    },
  ];
  return (
    <React.Fragment>
      <div className="comment-section">
        <Form.Group className="notes-box">
          {/* <Form.Label>Add Comments</Form.Label> */}
          <Form.Control
            placeholder={`Add your comments`}
            as="textarea"
            rows={3}
          />
          <div className="action-btn">
            <button className="cancel">Cancel</button>
            <button>Add</button>
          </div>
        </Form.Group>
        <ul className="notes-list">
          {NotesData.map((item, index) => (
            <li key={index}>
              <div className="note-footer">
                <div className="info">
                  <p className="user">
                    <FaRegCircleUser />
                    {item.user}
                  </p>
                  <p className="date">
                    <TbClock /> {item.date}
                  </p>
                </div>
                {/* <div className="action">
                  <span title="Edit">
                    <BiEdit />
                  </span>
                  <span title="Delete">
                    <RiDeleteBin6Line />
                  </span>
                </div> */}
              </div>
              <p className="notes">{item.des}</p>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export function Timeline() {
  const TimelineData = [
    {
      Title: "Updated Lead Details Successfully",
      DateTime: "Today, 09:00 AM",
      Time: "10:00 PM",
      Name: "John Doe",
      Status: 0,
      Type: "call",
    },
    {
      Title: "Document Collection form the Customer",
      DateTime: "Febuary 16, 09:00 ",
      Time: "02:33 PM",
      Name: "Gonzalez Helen",
      Status: 1,
      Type: "task",
    },
    {
      Title: "Project Demo Sheduled on tomorrow",
      DateTime: "Tomorrow, 11:00 AM",
      Time: "07:00 PM",
      Name: "Gonzalez Helen",
      Status: 2,
      Type: "event",
    },
    {
      Title: "Outgoing call to Jared Roy",
      DateTime: "Today, 09:00 AM",
      Time: "05:35 PM",
      Name: "Brenda Lee",
      Status: 0,
      Type: "call",
    },
  ];
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
