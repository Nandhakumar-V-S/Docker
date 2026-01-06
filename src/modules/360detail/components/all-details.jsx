// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

//? Components
import DetailSidebar from "./detail-sidebar";
import { Components } from "./default-components";
//? CSS

//? Images

//? JSON File

//? Icons

import { CiEdit } from "react-icons/ci";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BiTagAlt } from "react-icons/bi";
// *******~ Import ~******** //

const AllDetails = () => {
  const [key, setKey] = useState("overview");
  return (
    <>
      <div className="all-details-main">
        <div className="all-details">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className=""
          >
            <Tab
              eventKey="overview"
              title={
                <>
                  Overview <HiOutlineDotsVertical />
                </>
              }
            >
              <Overview />
            </Tab>
            <Tab
              eventKey="notes"
              title={
                <>
                  Notes <HiOutlineDotsVertical />
                </>
              }
            >
              <Notes />
            </Tab>
            <Tab
              eventKey="activities"
              title={
                <>
                  Activities
                  <HiOutlineDotsVertical />
                </>
              }
            >
              <Activities />
            </Tab>
            <Tab
              eventKey="Components"
              title={
                <>
                  Components
                  <HiOutlineDotsVertical />
                </>
              }
            >
              <Components />
            </Tab>
            <Tab
              title={
                <>
                  <DropdownButton id="dropdown-item-button" title="+5 More">
                    <Form.Control
                      className="search-contact"
                      type="text"
                      placeholder="Search text"
                      autoFocus={true}
                    />
                    <div className="item-div">
                      {[
                        "Contact in Future",
                        "Junk Lead",
                        "Lost Lead",
                        "Pre-Qualified",
                        "Not Interested",
                      ].map((data, index) => (
                        <>
                          <Dropdown.Item
                            eventKey={data}
                            as="button"
                            key={index}
                          >
                            {data}
                          </Dropdown.Item>
                        </>
                      ))}
                    </div>
                  </DropdownButton>
                </>
              }
            ></Tab>
          </Tabs>
        </div>
        <DetailSidebar />
      </div>
    </>
  );
};
export default AllDetails;

export const Overview = () => {
  const [Status, setStatus] = useState(4);
  return (
    <>
      <div className="tab-main-content overview">
        <div className="tab-header">
          {/* <h4>Overview</h4> */}
          <div className="status">
            <h5>Status</h5>
            <div className="status-group">
              {["New", "Contacted", "Interested", "Qualified", "Won"].map(
                (data, index) => (
                  <>
                    <button
                      className={Status > index ? "active" : ""}
                      key={index}
                      onClick={() => setStatus(index + 1)}
                    >
                      {data}
                    </button>
                  </>
                )
              )}
            </div>
          </div>
        </div>
        <div className="info-box">
          <ul>
            <>
              <li>
                <div className="data">
                  <span>Location</span>
                  <p>2158 Mount Tabor, Westbury, New York, USA, 11590</p>
                </div>
                <div className="action">
                  <button>
                    <CiEdit />
                  </button>
                </div>
              </li>
              <li>
                <div className="data">
                  <span>Account</span>
                  <p>Techcave (sample)</p>
                </div>
                <div className="action">
                  <button>
                    <CiEdit />
                  </button>
                </div>
              </li>
              <li>
                <div className="data">
                  <span>Email</span>
                  <p>spectorcalista@gmail.com</p>
                </div>
                <div className="action">
                  <button>
                    <CiEdit />
                  </button>
                </div>
              </li>
              <li>
                <div className="data">
                  <span>Mobile</span>
                  <p>1234567890</p>
                </div>
                <div className="action">
                  <button>
                    <CiEdit />
                  </button>
                </div>
              </li>
              <li>
                <div className="data">
                  <span>Sales owner</span>
                  <p>Admin</p>
                </div>
                <div className="action">
                  <button>
                    <CiEdit />
                  </button>
                </div>
              </li>
              <li>
                <div className="data">
                  <span>Created at</span>
                  <p>3 months ago</p>
                </div>
                <div className="action">
                  <button>
                    <CiEdit />
                  </button>
                </div>
              </li>
            </>
          </ul>
        </div>
      </div>
    </>
  );
};

const Notes = () => {
  return (
    <>
      <div className="tab-main-content notes">
        <div className="input-control">
          <Form.Label>Add Notes</Form.Label>
          <Form.Control as="textarea" placeholder="Add a note..." rows={3} />
          <div className="group-btn">
            <button>Save</button>
            <button className="cancel">Cancel</button>
          </div>
        </div>
        <ul className="notes-list">
          <li>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia,
              officiis laudantium.
            </p>
            <p className="name-time">
              <span>Admin</span>
              <span>in 3 minutes</span>
            </p>
          </li>
          <li>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia,
              officiis laudantium. dolor sit amet consectetur.
            </p>
            <p className="name-time">
              <span>Admin</span>
              <span>5 hours ago</span>
            </p>
          </li>
          <li>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <p className="name-time">
              <span>Admin</span>
              <span>2 months ago</span>
            </p>
          </li>
          <li>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <p className="name-time">
              <span>Admin</span>
              <span>2 months ago</span>
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

const Activities = () => {
  const ActivitiesData = [
    {
      Date: "Today, February 01, 2024",
      List: [
        { Name: "Admin", Time: "1 months ago", Lead: "New" },
        { Name: "Admin 2", Time: "2 months ago", Lead: "Contacted" },
        { Name: "Admin 3", Time: "2 months ago", Lead: "Contacted" },
        { Name: "Admin 4", Time: "2 months ago", Lead: "Contacted" },
      ],
    },
    {
      Date: "Yesterday, February 02, 2024",
      List: [
        { Name: "Admin", Time: "5 months ago", Lead: "Contacted" },
        { Name: "Admin", Time: "6 months ago", Lead: "Contacted" },
      ],
    },
    {
      Date: "January 03, 2024",
      List: [{ Name: "Admin", Time: "5 months ago", Lead: "Contacted" }],
    },
  ];
  return (
    <>
      <div className="tab-main-content activities">
        <div className="activities-list">
          {ActivitiesData.map((data, index) => (
            <>
              <ul key={index}>
                <h5>{data.Date}</h5>
                {data.List.map((datalist, index) => (
                  <>
                    <li key={index}>
                      <span className="tag-icon">
                        <BiTagAlt />
                      </span>
                      <div className="activities-box">
                        <p>
                          Contact Status Updated
                          <span>
                            <CiEdit /> {datalist.Name}
                          </span>
                          <span>{datalist.Time}</span>
                        </p>
                        <span>Updated to Lead : {datalist.Lead}</span>
                      </div>
                    </li>
                  </>
                ))}
              </ul>
            </>
          ))}
        </div>
      </div>
    </>
  );
};
