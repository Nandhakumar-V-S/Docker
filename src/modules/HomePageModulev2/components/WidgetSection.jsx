/* eslint-disable no-inner-declarations */
// *******~ Import ~******** //
//? React
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request } from "@/request/API/globalrequest";
import { API_TEST_URL } from "@/config/serverApiConfig";
//? Assets
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//? Components
import KpiWidget, {
  KpiWidgetV2,
  KpiWidgetv3,
  KpiWidgetv4,
  KpiWidgetV5,
  WidgetGroup,
} from "@/components/arccomponents/widget/kpiWidget";

import TimelineWidget from "@/components/arccomponents/widget/timelineWidget";
import ArcPieChart, {
  ArcBarChart,
  ArcBarChartV2,
} from "@/components/arccomponents/widget/pieChartWidget";
import GridWidget from "@/components/arccomponents/widget/GridWidget";
import AddButtonWidget from "@/components/arccomponents/widget/addButtonWidget";
import ActivitesWidget, {
  ActivitesWidgetV2,
} from "@/components/arccomponents/widget/ActivitesWidget";
import ArcProgressBar from "@/components/arccomponents/widget/ProgressWidget";
import { fetchPlanSummeryKPI } from "@/redux/Home/PlanSummery/PlanSummeryKPI";
import { getMasterDataSuccess, changeEntityid } from "@/redux/Home/actions";
import { entityidInfo, masterDataInfo } from "@/redux/Home/selector";
import { login } from "@/auth";
//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

const WidgetSection = () => {
  const dispatch = useDispatch();
  const entityid = useSelector(entityidInfo);
  const masterData = useSelector(masterDataInfo);
  console.log(entityid);
  console.log(masterData);

  const PlanSummeryKPIState = useSelector(
    (state) => state.PlanSummeryKPIState.response
  );
  const AddFollowupStateStatus = useSelector(
    (state) => state.AddFollowupState.Status
  );
  useEffect(() => {
    // dispatch(fetchPlanSummeryKPI());
    // dispatch(changeEntityid("F48EF545-9995-4F8F-857D-DDDA2BC063CC"));
  }, [dispatch, AddFollowupStateStatus]);

  // useEffect(() => {
  //   if (entityid !== "") {
  //     async function getlookupdetails() {
  //       const postData = {
  //         entityId: entityid,
  //       };
  //       const response = await request.post(
  //         API_TEST_URL,
  //         "arcconfiguration/getlookupdatabyid",
  //         postData
  //       );
  //       dispatch(getMasterDataSuccess(response));
  //     }
  //     getlookupdetails();
  //   }
  // }, [entityid]);

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
  const WidgetData = [
    {
      IconType: "bill",
      Title: "Unsubmitted Bills",
      Value: "$5.7K",
      Count: "30",
      PreviousValue: "20",
      Duration: "Due this Week",
    },
    {
      IconType: "bill",
      Title: "Rejected Bills ",
      Value: "$3.1K",
      Count: "20",
      PreviousValue: "0",
      Duration: "New bills",
    },
    {
      IconType: "bill",
      Title: "Unapproved Bills",
      Value: "$15.7K",
      Count: "63",
      PreviousValue: "1",
      Duration: "Due this Week",
    },
    {
      IconType: "bill",
      Title: "Total Bills",
      Value: "$124.7K",
      Count: "264",
      PreviousValue: "645",
      Duration: "Due this Week",
    },
  ];
  const ActivitiesData = [
    {
      type: "call",
      details: {
        name: "Gonzalez Helen",
        owner: "Admin Manager",
        subject: "Time Tracking",
        number: "(907) 095-345-897",
        date: "10/06/2024",
        time: "10:00PM - 11:00PM",
        priority: "High",
        status: "Sheduled",
      },
    },
    {
      type: "event",
      details: {
        name: "Gonzalez Helen",
        owner: "Admin Manager",
        subject: "Meeting is held for online training",
        number: "",
        date: "10/06/2024",
        time: "10:00PM - 11:00PM",
        priority: "Low",
        status: "Cancelled",
      },
    },
    {
      type: "task",
      details: {
        name: "Gonzalez Helen",
        owner: "Admin Manager",
        subject: "Project demo sheduled on tomorrow",
        number: "",
        date: "10/06/2024",
        time: "10:00PM - 11:00PM",
        priority: "Medium",
        status: "Sheduled",
      },
    },
    {
      type: "call",
      details: {
        name: "Gonzalez Helen",
        owner: "Admin Manager",
        subject: "Outgoing call to Jared Roy",
        number: "",
        date: "10/06/2024",
        time: "10:00PM - 11:00PM",
        priority: "High",
        status: "Completed",
      },
    },
    {
      type: "task",
      details: {
        name: "Gonzalez Helen",
        owner: "Admin Manager",
        subject: "Due date is tomorrow for sending the project",
        number: "",
        date: "10/06/2024",
        time: "10:00PM - 11:00PM",
        priority: "Medium",
        status: "Sheduled",
      },
    },
  ];
  const ChartData = [
    ["Task", "Hours per Day"],
    ["New Lead", 11],
    ["Qualify", 6],
    ["Bad Contact Info", 7],
    ["Converted", 8],
    ["Existing Account", 5],
  ];
  return (
    <React.Fragment>
      <section className="home-page-widget">
        <Container fluid>
          <Row>
            <Col xxl={12} xl={12} md={12} lg={12}>
              {/* <pre>{JSON.stringify(PlanSummeryKPIState, null, 2)}</pre> */}
              <div className="home-page-widget-group">
                <WidgetGroup>
                  {WidgetData.map((data, index) => (
                    <React.Fragment key={index}>
                      <KpiWidgetV5 WidgetInfo={data} />
                    </React.Fragment>
                  ))}
                </WidgetGroup>
                <ArcBarChartV2 />
                <AddButtonWidget Title="Actions" />
                <ActivitesWidget
                  ActivitiesData={ActivitiesData}
                  Title={"Team Activites"}
                />
                <ActivitesWidgetV2 />
                <ArcBarChart />
                <ArcProgressBar />
                <GridWidget
                  PlanSummeryKPIState={PlanSummeryKPIState}
                  Title={"My Plan Summary"}
                />
                <ActivitesWidgetV2 />
                <TimelineWidget TimelineData={TimelineData} />
                <ArcPieChart ChartData={ChartData} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};
export default WidgetSection;
