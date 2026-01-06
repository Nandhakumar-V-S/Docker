/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TimelineHistory from "./timeline.json";
import TimelineHistory2 from "./timeline2.json";
import { FaCircleDot } from "react-icons/fa6";
import { BiTask } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";
import { LuUser2 } from "react-icons/lu";
import { isValid, parse, format } from "date-fns";
import { parseISO } from "date-fns";
const TimeLine = () => {
  const [groupedData, setGroupedData] = useState([]);
  const GetTimelineState = useSelector(
    (state) => state.GetTimelineState.TimelineState
  );
  const TimelineData = GetTimelineState?.result?.data;
  //   const TimelineData = TimelineHistory2?.result?.data;

  useEffect(() => {
    const groupByFormattedDate = (TimelineData) => {
      return TimelineData?.reduce((acc, currentItem) => {
        const { FormattedDate } = currentItem;
        if (!acc[FormattedDate]) {
          acc[FormattedDate] = [];
        }
        acc[FormattedDate].push(currentItem);
        return acc;
      }, {});
    };

    const formatGroupedData = (groupedData) => {
      if (!groupedData) return [];
      return Object.entries(groupedData).map(([date, DateHistory]) => ({
        date,
        DateHistory,
      }));
    };

    const groupedDataByDate = groupByFormattedDate(TimelineData);
    const formattedData = formatGroupedData(groupedDataByDate);
    setGroupedData(formattedData);
  }, [GetTimelineState]);
  // ! UTC to Local Time Start
  const ConvertUtcToLocal = (utcDate) => {
    // Parse the ISO string to a Date object
    const parsedDate = parseISO(utcDate);

    // Format the date to the local time zone
    const formattedDate = format(parsedDate, "PPpp");

    return formattedDate;
  };
  // utils/convertLocalToUtc.js
  const convertLocalToUtc = (localDateString) => {
    // Create a new Date object from the local date string
    const localDate = new Date(localDateString);

    // Convert the local date to a UTC string
    const utcDate = localDate.toISOString();

    return ConvertUtcToLocal(utcDate);
  };
  // ! UTC to Local Time End
  //! Convert Time Foramt start
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      hour: "numeric",
      minute: "numeric",
      // second: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // Helper function to check if a value is a valid date
  const isValidDate = (date) => {
    const formats = [
      "M/d/yyyy h:mm:ss a", // Original format
      "MMM d yyyy h:mma", // New format
    ];

    return formats.some((dateFormat) => {
      const parsedDate = parse(date, dateFormat, new Date());
      return isValid(parsedDate);
    });
  };

  // Helper function to format the date to MM/DD/YYYY
  const formatDate = (date) => {
    const formats = [
      "M/d/yyyy h:mm:ss a", // Original format
      "MMM d yyyy h:mma", // New format
    ];

    let parsedDate;

    for (let dateFormat of formats) {
      parsedDate = parse(date, dateFormat, new Date());
      if (isValid(parsedDate)) {
        break;
      }
    }

    return format(parsedDate, "MM/dd/yyyy");
  };

  const ActivityDescription = ({ activities }) => {
    const { oldvalue, newvalue, MessageType, fieldname } = activities;

    const formattedOldValue = isValidDate(oldvalue)
      ? formatDate(oldvalue)
      : fieldname === "Progress Percentage"
        ? oldvalue + "%"
        : oldvalue;
    const formattedNewValue =
      fieldname === "Progress Percentage" ? newvalue + "%" : newvalue;

    return (
      <p className="description">
        {MessageType} - <strong>{fieldname}</strong> from{" "}
        <strong>{formattedOldValue || "-"}</strong> to{" "}
        <strong>{formattedNewValue}</strong>
      </p>
    );
  };
  return (
    <>
      <div className="tab-main-content timeline">
        <div className="tab-header">
          <div className="status">
            <h5>History</h5>
          </div>
        </div>
        {TimelineData?.length === 0 ? (
          <div className="timeline-not-found">
            <p>Timeline not found</p>
          </div>
        ) : (
          <div className="timeline-container">
            {groupedData.map((timeline, index) => (
              <React.Fragment key={index}>
                <div className="timeline-continue">
                  <div className="current-time">
                    <div className="circle">
                      <FaCircleDot />
                      <span>{timeline.date}</span>
                    </div>
                  </div>
                  {timeline.DateHistory.map((activites, index) => (
                    <div className="timeline-data even-div" key={index}>
                      <div className="left-div">
                        <p>
                          {formatTime(activites.createdOn)}{" "}
                          {/* {ConvertUtcToLocal(activites.createdOn)}{" "} */}
                          {/* {convertLocalToUtc(activites.createdOn)} */}
                        </p>
                      </div>
                      <div className="right-div">
                        <div className="history-box">
                          <span className="icon">
                            {activites.MessageType.endsWith("Added") ? (
                              <BiTask />
                            ) : activites.MessageType.endsWith("Deleted") ? (
                              <MdOutlineDeleteOutline />
                            ) : activites.MessageType.endsWith("Updated") ? (
                              <FaRegEdit />
                            ) : (
                              <BiTask />
                            )}
                          </span>
                          <div className="content">
                            <h5>
                              {activites.MessageType}{" "}
                              {/*-{" "}
                               <span>{activites.MessageType}</span> */}
                            </h5>

                            {[
                              "Sub Task Added",
                              "Task Added",
                              "Plan Added",
                              "FollowUp Inserted",
                              "FollowUp Added",
                            ].includes(activites.MessageType) ? null : (
                              <ActivityDescription activities={activites} />
                            )}

                            <p className="date-time">
                              <LuClock3 />
                              {activites.FormattedDate}
                            </p>
                            <p>
                              <span>
                                <LuUser2 />{" "}
                                {activites.changedby
                                  ? activites.changedby
                                  : "-"}
                              </span>
                              {activites.MessageType.endsWith("Added") ? (
                                <span className="tag completed">Added</span>
                              ) : activites.MessageType.endsWith("Deleted") ? (
                                <span className="tag cancelled">Deleted</span>
                              ) : activites.MessageType.endsWith("Updated") ? (
                                <span className="tag pending">Updated</span>
                              ) : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
      {/* <pre>{JSON.stringify(GetTimelineState, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(groupedData, null, 2)}</pre> */}
    </>
  );
};

export default TimeLine;
