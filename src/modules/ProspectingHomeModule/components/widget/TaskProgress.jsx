/* eslint-disable react/prop-types */
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
// *******~ Import ~******** //

const TaskProgress = ({ progressData, DataType }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <React.Fragment>
      <ProspectingWidget className={"task-progress"}>
        <div className="widget-header">
          {DataType === "Mine" ? (
            <div className="profile">
              <span className="short-name">JW</span>
              <div className="info">
                <p className="name">James William</p>
                <span className="desgination">Sales Representative</span>
              </div>
            </div>
          ) : (
            <h4>Team - Progress</h4>
          )}

          <div className="action">
            <ArcDateFilter
              startDate={startDate}
              setStartDate={setStartDate}
              onChange={(date) => {
                setStartDate(date);
              }}
            />

            {/* <button>Clocked Out</button> */}
          </div>
        </div>
        <div className="widget-body">
          <div className="progress-div">
            {/* <pre>{JSON.stringify(progressData, null, 2)}</pre> */}
            <ul>
              {progressData?.map((item, index) => {
                const percentage =
                  item.completedTask == 0
                    ? 0
                    : (item.completedTask / item.PlannedTask) * 100;
                return (
                  <li
                    key={index}
                    title={`${item.completedTask} Task Completed`}
                    // onClick={() => {
                    //   handleProgressClick(item);
                    // }}
                  >
                    <p>
                      {item.Label}{" "}
                      <span>
                        {item.completedTask} / {item.PlannedTask}
                      </span>
                    </p>
                    <ProgressBar
                      animated
                      now={percentage}
                      label={`${percentage.toFixed(0)}%`}
                      // title={`${item.completedTask} Task Completed`}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </ProspectingWidget>
      {/* <ProspectingWidget className={"task-progress"}></ProspectingWidget> */}
    </React.Fragment>
  );
};
export default TaskProgress;
