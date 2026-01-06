// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets
import Pagination from "react-bootstrap/Pagination";
import { ArcDropDownControled } from "@/components/arccomponents/ui-components/ArcDropDown/ArcDropDown";
//? Components
import ArcWidget from "@/components/arccomponents/widget/arcwidget";

//? CSS

//? Images

//? JSON File

//? Icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdAddIcCall } from "react-icons/md";
import { LuClock3 } from "react-icons/lu";
import { FaRegCalendar } from "react-icons/fa6";
import { LuUser2 } from "react-icons/lu";
import { BiTask } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlinePhoneCallback } from "react-icons/md";

import { IoCalendarClearOutline } from "react-icons/io5";

// *******~ Import ~******** //

export default function ActivitesWidget({ ActivitiesData, Title }) {
  //! ArcDropDownControledData State
  const ArcDropDownControledData = [
    { id: 1, value: "this Week" },
    { id: 2, value: "this Month" },
    { id: 3, value: "this Year" },
  ];
  return (
    <React.Fragment>
      <ArcWidget className="arc-activites-widget">
        <WidgetHeader
          Title={Title}
          ArcDropDownControledData={ArcDropDownControledData}
        />
        <div className="activities-list">
          <ul>
            {ActivitiesData.map((Activitie, index) => (
              <li key={index}>
                <span className="icon">
                  {Activitie.type === "call" ? (
                    <>
                      <MdOutlinePhoneCallback />
                    </>
                  ) : Activitie.type === "event" ? (
                    <>
                      <IoCalendarClearOutline />
                    </>
                  ) : (
                    <>
                      <BiTask />
                    </>
                  )}
                </span>
                <div className="content">
                  <h5>
                    {Activitie.details.subject}{" "}
                    <span className={Activitie.details.priority.toLowerCase()}>
                      {Activitie.details.priority}
                    </span>
                  </h5>
                  <p className="date-time">
                    <div className="date">
                      <span>
                        <FaRegCalendar />
                      </span>
                      {Activitie.details.date}
                    </div>

                    <div className="time">
                      <span>
                        <LuClock3 />
                      </span>{" "}
                      {Activitie.details.time}
                    </div>
                  </p>
                  {Activitie.details.number && (
                    <p className="call">
                      <MdAddIcCall />
                      {Activitie.details.number}
                    </p>
                  )}
                  <p className="user-status">
                    <span>
                      <LuUser2 />
                      {Activitie.details.name}
                    </span>
                    <span className={Activitie.details.status.toLowerCase()}>
                      - {Activitie.details.status}
                    </span>
                  </p>
                </div>
                <span className="icon action-btn">
                  <BiEditAlt />
                </span>
                <span className="icon action-btn">
                  <RiDeleteBin6Line />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </ArcWidget>
    </React.Fragment>
  );
}

export const WidgetHeader = ({ Title }) => {
  //! ArcDropDownControledData State
  const ArcDropDownControledData = [
    { id: 1, value: "All Activites" },
    { id: 2, value: "Task" },
    { id: 3, value: "Call" },
    { id: 4, value: "Event" },
  ];
  const [SelectedValueState, setSelectedValueState] = useState(
    ArcDropDownControledData[1].value
  );
  return (
    <React.Fragment>
      <div className="widget-header">
        <h4>{Title}</h4>
        <div className="actions">
          <ArcDropDownControled
            ArcDropDownControledData={ArcDropDownControledData}
            SelectedValue={SelectedValueState}
            setSelectedValue={setSelectedValueState}
          />
          <span className="filter">
            <IoFilterSharp />
          </span>
          <span className="action">
            <BsThreeDotsVertical />
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export function ActivitesWidgetV2({ ActivitiesData }) {
  const ActivitesInfo = [
    {
      Date: "25",
      Day: "Mon",
      Duration: "12:00am - 03:30pm",
      Title: "Meeting for campaign with sales team",
    },
    {
      Date: "27",
      Day: "Wed",
      Duration: "02:00pm - 03:45pm",
      Title: "Adding a new event with attachments",
    },
    {
      Date: "17",
      Day: "Tue",
      Duration: "04:30pm - 07:15pm",
      Title: "Create new project Bundling Product",
    },
    {
      Date: "12",
      Day: "Fri",
      Duration: "10:30am - 01:15pm",
      Title: "Weekly closed sales won checking with sales team",
    },
    {
      Date: "27",
      Day: "Wed",
      Duration: "02:00pm - 03:45pm",
      Title: "Adding a new event with attachments",
    },
    {
      Date: "17",
      Day: "Tue",
      Duration: "04:30pm - 07:15pm",
      Title: "Create new project Bundling Product",
    },
  ];
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastContact = currentPage * itemsPerPage;
  const indexOfFirstContact = indexOfLastContact - itemsPerPage;
  const currentContacts = ActivitesInfo.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(ActivitesInfo.length / itemsPerPage);
  return (
    <React.Fragment>
      <ArcWidget className="arc-activites-widget arc-activites-widget-v2">
        <WidgetHeader Title={"Upcoming Activities"} />

        <div className="activities-list-v2">
          <ul>
            {currentContacts.map((Activitie, index) => (
              <li key={index}>
                <div className="date-day">
                  <span className="date">{Activitie.Date}</span>
                  <span className="day">{Activitie.Day}</span>
                </div>
                <div className="content">
                  <p className="duration">{Activitie.Duration}</p>
                  <h5>{Activitie.Title}</h5>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="activites-widget-pagination">
          <p className="total">
            <span>Total:</span> 72
          </p>
          <Pagination>
            <Pagination.First
              disabled={currentPage === 1}
              onClick={() => paginate(1)}
            />
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            />
            {Array.from({
              length: Math.ceil(ActivitesInfo.length / itemsPerPage),
            }).map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
            />
            <Pagination.Last
              disabled={currentPage === totalPages}
              onClick={() => paginate(totalPages)}
            />
          </Pagination>
        </div>
      </ArcWidget>
    </React.Fragment>
  );
}
