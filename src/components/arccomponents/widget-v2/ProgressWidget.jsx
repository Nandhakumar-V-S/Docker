// *******~ Import ~******** //
//? React
// import React from "react";
//? Assets
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
//? Components
import ArcWidget from "@/components/arccomponents/widget-v2/arcwidget";
import {
  GetWorkDayProgress,
  SetSelectedDate,
} from "@/redux/Home/PlanProgress/GetPlanProgress";
import { ArcDateFilter } from "@/components/arccomponents/ui-components/ArcYearWeekPicker/ArcYearWeekPicker";
import ResourcePlanPopup from "./resourceplan";
import { GetResourcePlan } from "@/redux/Home/PlanProgress/GetResourcePlan";
//? CSS

//? Images

//? JSON File

//? Icons
// *******~ Import ~******** //

export const ArcProgressBar = () => {
  const dispatch = useDispatch();

  const WorkDayProgressState = useSelector(
    (state) => state.WorkDayProgressState?.response
  );
  const WorkDayProgressstartdate = useSelector(
    (state) => state.WorkDayProgressState?.selectdate
  );

  console.log(WorkDayProgressState);
  console.log(WorkDayProgressstartdate);
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  const [Resourceplanshow, setResourceplanshow] = useState(false);
  const [selectedResource, setselectedResource] = useState({});
  const [startDate, setStartDate] = useState(
    new Date(WorkDayProgressstartdate)
  ); // Initialize with Date object from string
  console.log("startDate", startDate);
  // const progressData = WorkDayProgressState?.result?.data;
  const progressData = [
    {
      Resourceid: "1016",
      Resources: "Annamalai V",
      PlannedTask: "100",
      completedTask: "100",
    },
    {
      Resourceid: "1009",
      Resources: "Gopinath Ganesan",
      PlannedTask: "16",
      completedTask: "10",
    },
    {
      Resourceid: "1011",
      Resources: "Ravishankar Sivanesan",
      PlannedTask: "50",
      completedTask: "36",
    },
    {
      Resourceid: "1011",
      Resources: "Kiran",
      PlannedTask: "50",
      completedTask: "60",
    },
    {
      Resourceid: "1011",
      Resources: "Aarthi R",
      PlannedTask: "300",
      completedTask: "640",
    },
    {
      Resourceid: "1011",
      Resources: "Chitra T",
      PlannedTask: "40",
      completedTask: "30",
    },
  ];

  useEffect(() => {
    // if (WorkDayProgressState?.length === 0) {
    const RequestData = {
      entityid: "",
      listid: "",
      loggeduserid: loggedUserId,
      sessionid: "",
      filterparams: [
        {
          filterid: "",
          apiname: "Workday",
          filtervalue: format(startDate, "MM/dd/yyyy"),
          condition: "datetime",
        },
      ],
    };
    // dispatch(GetWorkDayProgress(RequestData));
    // }
  }, [dispatch]);

  const GetDayProgress = (date) => {
    const formatDate = format(date, "MM/dd/yyyy");
    const RequestData = {
      entityid: "",
      listid: "",
      loggeduserid: loggedUserId,
      sessionid: "",
      filterparams: [
        {
          filterid: "",
          apiname: "Workday",
          filtervalue: formatDate,
          condition: "datetime",
        },
      ],
    };
    // dispatch(GetWorkDayProgress(RequestData));
    // dispatch(SetSelectedDate(formatDate));
  };

  const handleProgressClick = (item) => {
    const RequestData = {
      entityid: "F48EF545-9995-4F8F-857D-DDDA2BC063CC",
      listid: "B319C6B4-957F-49BC-B59B-5BE86FB3FA08",
      start: 0,
      skip: 100,
      orderby: "",
      orderbydir: "",
      loggeduserid: loggedUserId,
      sessionid: "",
      filterparams: [
        {
          filterid: "41c3afe9-5958-4f32-b09d-08a74233f776",
          apiname: "column1",
          filtervalue: item.Resourceid,
          condition: "AND",
        },
        {
          filterid: "faaec9b5-f213-410f-9f27-5c79d1c280e0",
          apiname: "workday",
          filtervalue: format(startDate, "MM/dd/yyyy"),
          condition: "AND",
        },
      ],
    };
    // console.log(`Bar clicked: ${item.Resourceid}`);
    setselectedResource({
      id: item.Resourceid,
      name: item.Resources,
    });
    // dispatch(GetResourcePlan(RequestData));
    setResourceplanshow(true);
  };
  return (
    <React.Fragment>
      <ResourcePlanPopup
        ArcOffCanvaShow={Resourceplanshow}
        setArcOffCanvaShow={setResourceplanshow}
        selectedResource={selectedResource}
        startDate={startDate}
        isProgress={true}
      />
      <ArcWidget className="arc-progress-chart">
        <div className="widget-header">
          <h4>Team - Progress</h4>
          <ArcDateFilter
            startDate={startDate}
            setStartDate={setStartDate}
            onChange={(date) => {
              setStartDate(date);
              GetDayProgress(date);
            }}
          />
        </div>
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
                  onClick={() => {
                    handleProgressClick(item);
                  }}
                >
                  <p>
                    {item.Resources} <span>{item.PlannedTask}</span>
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
      </ArcWidget>
    </React.Fragment>
  );
};
export default ArcProgressBar;
