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
import moment from "moment-timezone";
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
  const UTCtoLocalTime = (input) => {
    // const input = "2024-06-18T06:58:48.780";
    // const input = null;

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Parse the input date string
    const utc = moment.utc(input, "YYYY-MM-DD HH:mm:ss.SSS");

    // Convert to the user's timezone
    const local = utc.clone().tz(userTimezone);

    // Format the date to the desired format
    const formattedDate = local.format("hh:mm A");
    return formattedDate;
  };

  // utils/convertLocalToUtc.js

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

  const format_Time = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);

    if (hours > 0 && remainingMinutes > 0) {
      return `${hours}h ${remainingMinutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (remainingMinutes > 0) {
      return `${remainingMinutes}m`;
    } else {
      return "0m"; // or any other default value you prefer
    }
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

    // const formattedOldValue = isValidDate(oldvalue)
    //   ? formatDate(oldvalue)
    //   : fieldname === "Progress Percentage"
    //     ? oldvalue + "%" : fieldname === "Spent Hour"? (oldvalue/60).ToString("F2") + "h"
    //     //fieldname === "Spent Hour"?oldvalue/60 + "h"
    //     : oldvalue;

    // const formattedNewValue =
    //   fieldname === "Progress Percentage" ? newvalue + "%" :fieldname === "Spent Hour"?(newvalue/60).ToString("F2") + "h" : newvalue;
    const formattedOldValue = isValidDate(oldvalue)
      ? formatDate(oldvalue)
      : fieldname === "Progress Percentage"
        ? (oldvalue || 0) + "%"
        : fieldname === "Daily Progress"
          ? (oldvalue || 0) + "%"
          : fieldname === "Task Progress"
            ? (oldvalue || 0) + "%"
            : fieldname === "Spent Hour"
              ? oldvalue % 60 === 0
                ? format_Time(oldvalue)
                : format_Time(oldvalue)
              : fieldname === "Effort"
                ? oldvalue % 60 === 0
                  ? format_Time(oldvalue)
                  : format_Time(oldvalue)
                : oldvalue;

    const formattedNewValue =
      fieldname === "Progress Percentage"
        ? (newvalue || 0) + "%"
        : fieldname === "Daily Progress"
          ? (newvalue || 0) + "%"
          : fieldname === "Task Progress"
            ? (newvalue || 0) + "%"
            : fieldname === "Spent Hour"
              ? newvalue % 60 === 0
                ? format_Time(newvalue)
                : format_Time(newvalue)
              : fieldname === "Effort"
                ? newvalue % 60 === 0
                  ? format_Time(newvalue)
                  : format_Time(newvalue)
                : newvalue;
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
                          {UTCtoLocalTime(activites.createdOnString)}
                          {/* <TimezoneConverter
                            input={activites.createdOnString}
                          /> */}
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
                              "Plan Deleted",
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
