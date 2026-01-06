// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//? Components
import { ArcDateFilter } from "@/components/arccomponents/ui-components/ArcYearWeekPicker/ArcYearWeekPicker";

// ~ Dataset Features
import { setNewDatasetID as setNewTaskDatasetID } from "@/redux/Task/actions";
import { savedDatasetidInfo as TaskSavedDatasetidInfo } from "@/redux/Task/selector";
import { setNewDatasetID as setNewExecutionDatasetID } from "@/redux/Execution/actions";
import { savedDatasetidInfo as ExecutionSavedDatasetidInfo } from "@/redux/Execution/selector";
import { setNewDatasetID as setNewPlanDatasetID } from "@/redux/Plan/actions";
import { savedDatasetidInfo as PlanSavedDatasetidInfo } from "@/redux/Plan/selector";
import { setNewDatasetID as setNewProjectDatasetID } from "@/redux/Project/actions";
import { savedDatasetidInfo as ProjectSavedDatasetidInfo } from "@/redux/Project/selector";
import { setNewDatasetID as setNewFollowupDatasetID } from "@/redux/Followup/actions";
import { savedDatasetidInfo as FollowupSavedDatasetidInfo } from "@/redux/Followup/selector";
import { setNewDatasetID as setNewReportDatasetID } from "@/redux/Report/actions";
import { savedDatasetidInfo as ReportSavedDatasetidInfo } from "@/redux/Report/selector";
import { setNewDatasetID as setNewTagDatasetID } from "@/redux/Tag/actions";
import { savedDatasetidInfo as TagSavedDatasetidInfo } from "@/redux/Tag/selector";

// ~ Dataset Features
//? CSS

//? Images
import AddContactIcon from "@/style/arcstyle/images/homepage/Profile.svg";
import OpportunityIcon from "@/style/arcstyle/images/homepage/Opportunity.svg";
import MeetingsIcon from "@/style/arcstyle/images/homepage/Meetings.svg";
import CallsIcon from "@/style/arcstyle/images/homepage/Calls.svg";
import TaskIcon from "@/style/arcstyle/images/homepage/Task.svg";
import WebsiteIcon from "@/style/arcstyle/images/homepage/Website.svg";
import LinkedinIcon from "@/style/arcstyle/images/homepage/Linkedin.svg";
import EmailIcon from "@/style/arcstyle/images/homepage/Email.svg";
import ArrowIcon from "@/style/arcstyle/images/homepage/Arrow.png";
import QualifiedIcon from "@/style/arcstyle/images/homepage/Qualified.svg";
import DemoIcon from "@/style/arcstyle/images/homepage/Demo.svg";
import ContractSignIcon from "@/style/arcstyle/images/homepage/ContractSign.svg";
import OnboardingIcon from "@/style/arcstyle/images/homepage/Onboarding.svg";
import MostEngagedIcon from "@/style/arcstyle/images/homepage/MostEngaged.svg";
import HighValueIcon from "@/style/arcstyle/images/homepage/HighValue.svg";
import HighProbablityIcon from "@/style/arcstyle/images/homepage/HighProbablity.svg";
import ResponseIcon from "@/style/arcstyle/images/homepage/Response.svg";
//? JSON File

//? Icons
// *******~ Import ~******** //

const Journey = () => {
  const navigate = useNavigate();

  const Actions = [
    {
      Label: "Add Lead",
      Img: AddContactIcon,
    },
    {
      Label: "Add Contact",
      Img: AddContactIcon,
    },
    {
      Label: "Add Opportunity",
      Img: OpportunityIcon,
    },
    {
      Label: "Add Account",
      Img: OpportunityIcon,
    },
    {
      Label: "Add Meeting",
      Img: MeetingsIcon,
    },
    {
      Label: "Add Call",
      Img: CallsIcon,
    },
    {
      Label: "Add Task",
      Img: TaskIcon,
    },
  ];
  const Journey = [
    {
      Title: "Task",
      Options: [
        {
          Label: "SLTUSBUTasks",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "9fc2d540-2c69-42cf-99ef-2cfa95523a96",
          entityname: "Task",
        },
        {
          Label: "My Current Week Task",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "14d4fac0-cd6b-4f6a-9bf5-ee07fc873d5b",
          entityname: "Task",
        },
        {
          Label: "Task View",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "268d97c1-e1da-487d-9c26-c445fde9a747",
          entityname: "Task",
        },
        {
          Label: "Approval",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "0fc08408-e669-47ba-bf79-10ed525b81a6",
          entityname: "Task",
        },
        {
          Label: "Input",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "613bf2d8-383e-49e7-8390-4057c97d7f00",
          entityname: "Task",
        },
        {
          Label: "Week View",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "947ffbcd-e69f-4166-90eb-e46ad2fd9da6",
          entityname: "Task",
        },
      ],
    },
    {
      Title: "Plan",
      Options: [
        {
          Label: "Input",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "613bf2d8-383e-49e7-8390-4057c97d7f00",
          entityname: "Plan",
        },
        {
          Label: "Week View",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "947ffbcd-e69f-4166-90eb-e46ad2fd9da6",
          entityname: "Plan",
        },
      ],
    },

    {
      Title: "Plan Viewer",
      Options: [
        {
          Label: "My Current Week Task",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "14d4fac0-cd6b-4f6a-9bf5-ee07fc873d5b",
          entityname: "Execution",
        },
        {
          Label: "Task View",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "268d97c1-e1da-487d-9c26-c445fde9a747",
          entityname: "Execution",
        },
      ],
    },
    {
      Title: "Project",
      Options: [
        {
          Label: "My Current Week Task",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "14d4fac0-cd6b-4f6a-9bf5-ee07fc873d5b",
          entityname: "Project",
        },
        {
          Label: "Task View",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "268d97c1-e1da-487d-9c26-c445fde9a747",
          entityname: "Project",
        },
        {
          Label: "Approval",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "0fc08408-e669-47ba-bf79-10ed525b81a6",
          entityname: "Project",
        },
      ],
    },
    {
      Title: "Report",
      Options: [
        {
          Label: "Task View",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "268d97c1-e1da-487d-9c26-c445fde9a747",
          entityname: "Report",
        },
        {
          Label: "Approval",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "0fc08408-e669-47ba-bf79-10ed525b81a6",
          entityname: "Report",
        },
        {
          Label: "Input",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "613bf2d8-383e-49e7-8390-4057c97d7f00",
          entityname: "Report",
        },
        {
          Label: "Week View",
          Img: DemoIcon,
          Count: "",
          journey: true,
          Path: "/task",
          datasetid: "947ffbcd-e69f-4166-90eb-e46ad2fd9da6",
          entityname: "Report",
        },
      ],
    },
  ];
  const dispatch = useDispatch();
  // ~ Dataset Features
  const TasksavedDatasetid = useSelector(TaskSavedDatasetidInfo);
  const ExecutionsavedDatasetid = useSelector(ExecutionSavedDatasetidInfo);
  const PlansavedDatasetid = useSelector(PlanSavedDatasetidInfo);
  const ProjectsavedDatasetid = useSelector(ProjectSavedDatasetidInfo);
  const FollowupsavedDatasetid = useSelector(FollowupSavedDatasetidInfo);
  const ReportsavedDatasetid = useSelector(ReportSavedDatasetidInfo);
  const TagsavedDatasetid = useSelector(TagSavedDatasetidInfo);
  // ~ Dataset Features

  //  ~ Redirect with Dataset
  const entityMapping = {
    Task: {
      SavedId: TasksavedDatasetid,
      navigatepath: "/task",
      setNewID: setNewTaskDatasetID,
    },
    PlanViewer: {
      SavedId: ExecutionsavedDatasetid,
      navigatepath: "/execution",
      setNewID: setNewExecutionDatasetID,
    },
    Plan: {
      SavedId: PlansavedDatasetid,
      navigatepath: "/plan",
      setNewID: setNewPlanDatasetID,
    },
    Project: {
      SavedId: ProjectsavedDatasetid,
      navigatepath: "/project",
      setNewID: setNewProjectDatasetID,
    },
    Followup: {
      SavedId: FollowupsavedDatasetid,
      navigatepath: "/followup",
      setNewID: setNewFollowupDatasetID,
    },
    Report: {
      SavedId: ReportsavedDatasetid,
      navigatepath: "/report",
      setNewID: setNewReportDatasetID,
    },
    Tag: {
      SavedId: TagsavedDatasetid,
      navigatepath: "/tag",
      setNewID: setNewTagDatasetID,
    },
  };

  const RedirectwithDataset = (datasetId, path) => {
    const { SavedId, navigatepath, setNewID } =
      entityMapping[path === "Plan Viewer" ? "PlanViewer" : path] || {};
    console.log(SavedId, navigatepath, setNewID);

    if (datasetId && path) {
      if (datasetId === SavedId) {
        console.log("Same dataSetID received, exiting");
        navigate(navigatepath);
      }

      dispatch(setNewID(datasetId));
      navigate(navigatepath); // Navigate to the correct path
    } else {
      console.log("Invalid datasetId or path");
    }
  };

  //  ~ Redirect with Dataset
  //   const [startDate, setStartDate] = useState(new Date());
  //   const NavigatePage = (path) => {
  //     navigate(path);
  //   };

  return (
    <React.Fragment>
      <section className="home-page-journey">
        <Row>
          <Col xxl={12} xl={12} md={12} lg={12}>
            {/* <div className="action-section">
                <div className="action-container">
                  <h3 className="title">Actions</h3>
                  <ul>
                    {Actions.map((data, index) => (
                      <li key={index} title={data.Label}>
                        <div className="option-img">
                          <img src={data.Img} alt={data.Label} />
                        </div>
                        <p title={data.Label}>{data.Label}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}
            <div className="journey-section">
              {/* <div className="journey-header">
                <h3 className="title">Journey</h3>
                <ArcDateFilter
                  startDate={startDate}
                  setStartDate={setStartDate}
                  onChange={(date) => {
                    setStartDate(date);
                  }}
                />
              </div> */}
              {console.log(Journey, "Journey")}
              {Journey.map((data, Parentindex) => (
                <div className="journey-container" key={Parentindex}>
                  <h4 className="title">{data.Title}</h4>
                  <ul>
                    {data.Options.map((data, index) => (
                      <li
                        key={index}
                        title={data.Label}
                        className={data.journey && "journey"}
                        onClick={() => {
                          RedirectwithDataset(data.datasetid, data.entityname);
                        }}
                      >
                        <div className="option-img">
                          <img src={data.Img} alt={data.Label} />
                          {data.Count && (
                            <span className="count">{data.Count}</span>
                          )}
                        </div>
                        <p title={data.Label}>{data.Label}</p>
                        <img
                          className="arrow"
                          src={ArrowIcon}
                          alt={data.Label}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </section>
    </React.Fragment>
  );
};
export default Journey;
