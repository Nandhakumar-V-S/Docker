/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect } from "react";
//? Assets
import { useDispatch, useSelector } from "react-redux";
import { Chart } from "react-google-charts";
import ProgressBar from "react-bootstrap/ProgressBar";
import { WeekFilterV2 } from "@/components/arccomponents/ui-components/ArcYearWeekPicker/ArcYearWeekPicker";
import {
  BarChart,
  Bar,
  Rectangle,
  Cell,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
//? Components
import ArcWidget from "@/components/arccomponents/widget/arcwidget";
import { WidgetHeader } from "@/components/arccomponents/widget/widgetHeader";
import {
  GetWorkWeekProgress,
  SetSelectedWeekYear,
} from "@/redux/Home/PlanProgress/GetPlanProgressWeek";
import { GetResourcePlan } from "@/redux/Home/PlanProgress/GetResourcePlan";
import ResourcePlanPopup from "./resourceplan";
//? CSS

//? Images

//? JSON File

//? Icons
// *******~ Import ~******** //

export default function ArcPieChart({ ChartData }) {
  const options = {
    is3D: true,
  };

  return (
    <React.Fragment>
      <ArcWidget className="arc-pie-chart">
        <WidgetHeader Title={"Total Leads"} />
        <Chart
          chartType="PieChart"
          data={ChartData}
          options={options}
          width={"100%"}
          height={"100%"}
          className="arc-chart"
        />
      </ArcWidget>
    </React.Fragment>
  );
}

export const ArcBarChart = () => {
  const dispatch = useDispatch();

  const WorkWeekProgressState = useSelector(
    (state) => state.WorkWeekProgressState?.response
  );
  const WorkWeekProgressStateWeek = useSelector(
    (state) => state.WorkWeekProgressState?.selectweek
  );
  const WorkWeekProgressStateYear = useSelector(
    (state) => state.WorkWeekProgressState?.selectyear
  );
  console.log(WorkWeekProgressState);
  console.log(WorkWeekProgressStateWeek, WorkWeekProgressStateYear);

  // ! Week Filter start
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((firstDayOfYear.getDay() + pastDaysOfYear) / 7);
  };
  const currentYear = new Date().getFullYear();
  const currentWeek = getWeekNumber(new Date());
  const [selectedYear, setSelectedYear] = useState(
    WorkWeekProgressStateYear || currentYear
  );
  const [selectedWeek, setSelectedWeek] = useState(
    WorkWeekProgressStateWeek || currentWeek
  );
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  const HandleWeekChange = (index) => {
    setSelectedWeek(index + 1);
    const week = index + 1;
    const RequestData = {
      entityid: "",
      listid: "",
      loggeduserid: loggedUserId,
      sessionid: "",
      filterparams: [
        {
          filterid: "",
          apiname: "Workweek",
          filtervalue: `${week}$${selectedYear}`,
          condition: "datetime",
        },
      ],
    };
    dispatch(GetWorkWeekProgress(RequestData));
    dispatch(SetSelectedWeekYear({ week, year: selectedYear }));
  };
  // ! Week Filter start
  useEffect(() => {
    // if (WorkWeekProgressState?.length === 0) {
    const RequestData = {
      entityid: "",
      listid: "",
      loggeduserid: loggedUserId,
      sessionid: "",
      filterparams: [
        {
          filterid: "",
          apiname: "Workweek",
          filtervalue: `${selectedWeek}$${selectedYear}`,
          condition: "datetime",
        },
      ],
    };
    dispatch(GetWorkWeekProgress(RequestData));
    // }
  }, [dispatch]);

  const ChartData = WorkWeekProgressState.result?.data;
  const transformedData = ChartData?.map((item) => ({
    name: item.Resources,
    Plan: Number(item.PlannedTask),
    Actual: Number(item.completedTask),
    Resourceid: item.Resourceid,
  }));

  return (
    <React.Fragment>
      <ArcWidget className="arc-bar-chart">
        <div className="widget-header">
          <h4>Team - Plan vs Actual</h4>
          <div className="actions">
            <div className="action-week-filter">
              <WeekFilterV2
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                selectedWeek={selectedWeek}
                setSelectedWeek={setSelectedWeek}
                HandleWeekChange={HandleWeekChange}
              />
            </div>
          </div>
        </div>
        <div className="chart-progress overflow-chart-main">
          <BarChartTemplate
            data={transformedData}
            selectedYear={selectedYear}
            selectedWeek={selectedWeek}
          />
        </div>
      </ArcWidget>
    </React.Fragment>
  );
};

const BarChartTemplate = ({ data, selectedYear, selectedWeek }) => {
  const dispatch = useDispatch();
  let loggedUserId = window.sessionStorage.getItem("Globalid");
  const [Resourceplanshow, setResourceplanshow] = useState(false);
  const [selectedResource, setselectedResource] = useState({});
  const dollarFormatter = (value) => `${value.toLocaleString()}`;
  // State to manage visibility of each bar
  const [activeBars, setActiveBars] = useState({
    Plan: true,
    Actual: true,
  });

  // Function to toggle visibility when legend is clicked
  const handleLegendClick = (e) => {
    const { dataKey } = e;
    setActiveBars((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey], // Toggle the visibility of the corresponding bar
    }));
  };
  const GetResourcePlanState = useSelector(
    (state) => state.GetResourcePlanState?.response
  );
  console.log(GetResourcePlanState);
  const handleBarClick = (dataKey, event) => {
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
          filtervalue: event.Resourceid,
          condition: "AND",
        },
        {
          filterid: "faaec9b5-f213-410f-9f27-5c79d1c280e0",
          apiname: "workweek",
          filtervalue: `${selectedWeek}$${selectedYear}`,
          condition: "AND",
        },
      ],
    };
    console.log(`Bar clicked: ${event.Resourceid}`);
    setselectedResource({
      id: event.Resourceid,
      name: event.name,
    });
    dispatch(GetResourcePlan(RequestData));
    setResourceplanshow(true);
  };
  return (
    <React.Fragment>
      <ResourcePlanPopup
        ArcOffCanvaShow={Resourceplanshow}
        setArcOffCanvaShow={setResourceplanshow}
        selectedResource={selectedResource}
        selectedYear={selectedYear}
        selectedWeek={selectedWeek}
      />
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          // width={500}
          // height={300}
          barGap={5}
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={dollarFormatter} />
          <Tooltip formatter={dollarFormatter} />
          <Legend
            onClick={handleLegendClick}
            verticalAlign="bottom"
            align="center"
            iconType="circle"
          />

          <Bar
            name="Plan"
            dataKey="Plan"
            fill="#26a7dd"
            barSize={activeBars.Plan ? 25 : 0}
            onClick={(event) => handleBarClick("Plan", event)}
          >
            {" "}
            {activeBars.Plan && <LabelList fill="#000" position="top" />}
          </Bar>

          <Bar
            name="Actual"
            dataKey="Actual"
            fill="#57d0b5"
            barSize={activeBars.Actual ? 25 : 0}
            onClick={(event) => handleBarClick("Actual", event)}
          >
            {activeBars.Actual && <LabelList fill="#000" position="top" />}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export const ArcBarChartV2 = () => {
  const data = [
    {
      name: "Current",
      AP: 4000,
    },
    {
      name: "0-30 Days",
      AP: 3000,
    },
    {
      name: "31-60 Days",
      AP: 2000,
    },
    {
      name: "61-90 Days",
      AP: 2780,
    },
    {
      name: "90+ Days",
      AP: 1890,
    },
  ];
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
  //! ArcDropDownControledData State
  const ArcDropDownControledData = [
    { id: 1, value: "this Week" },
    { id: 2, value: "this Month" },
    { id: 3, value: "this Year" },
  ];
  return (
    <React.Fragment>
      <ArcWidget className="arc-bar-chart arc-bar-chart-v2">
        <WidgetHeader
          Title={"AP Aging Summary"}
          ArcDropDownControledData={ArcDropDownControledData}
        />
        <div className="chart-progress">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="0" /> */}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="AP" fill="#4473c5" barSize={50}>
                <LabelList fill="#fff" position="center" />
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ArcWidget>
    </React.Fragment>
  );
};
