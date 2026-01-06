/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { JourneyLoading } from "@/modules/loading-skeleton/listpage-table-loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savedDatasetidInfo as TaskSavedDatasetidInfo } from "@/redux/Task/selector";
import { savedDatasetidInfo as ProjectSavedDatasetidInfo } from "@/redux/Project/selector";
import { savedDatasetidInfo as PlanViewerSavedDatasetidInfo } from "@/redux/Execution/selector";
import { savedDatasetidInfo as planSavedDatasetidInfo } from "@/redux/Plan/selector";
import { savedDatasetidInfo as FollowupSavedDatasetidInfo } from "@/redux/Followup/selector";

import { setNewDatasetID as TaskSetNewDatasetID } from "@/redux/Task/actions";
import { setNewDatasetID as ProjectSetNewDatasetID } from "@/redux/Project/actions";
import { setNewDatasetID as PlanViewerSetNewDatasetID } from "@/redux/Execution/actions";
import { setNewDatasetID as planSetNewDatasetID } from "@/redux/Plan/actions";
import { setNewDatasetID as FollowupSetNewDatasetID } from "@/redux/Followup/actions";

// import { setNewDatasetID as leadSetNewDatasetID } from "@/redux/Lead/actions";
// import { setNewDatasetID as contactSetNewDatasetID } from "@/redux/Contact/actions";
// import { setNewDatasetID as opportunitySetNewDatasetID } from "@/redux/Opportunity/actions";
// import { setNewDatasetID as accountSetNewDatasetID } from "@/redux/Account/actions";

import { ArcDropDownControled } from "@/components/arccomponents/ui-components/ArcDropDown/ArcDropDown";

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
import { homescreenDataInfo } from "@/redux/Home/JourneyHome/selector";
import { fetchDashboardData } from "@/redux/Home/JourneyHome/actions";

import AddLead from "@/style/arcstyle/images/homepage/Demo.svg";

const HomeJourney = ({ loading, dashboardData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const TaskSavedDatasetid = useSelector(TaskSavedDatasetidInfo);
  const PlanSavedDatasetid = useSelector(planSavedDatasetidInfo);
  const ProjectSavedDatasetid = useSelector(ProjectSavedDatasetidInfo);
  const PlanViewerSavedDatasetid = useSelector(PlanViewerSavedDatasetidInfo);
  const FollowupSavedDatasetid = useSelector(FollowupSavedDatasetidInfo);

  const [Type, setType] = useState("Show All");
  const Actions = [
    {
      Label: "Add Task",
      Img: AddLead,
      path: "/task",
    },
    {
      Label: "Add Plan",
      Img: AddContactIcon,
      path: "/plan",
    },
    {
      Label: "Add Project",
      Img: OnboardingIcon,
      path: "/project",
    },
    {
      Label: "Add Feature",
      Img: ContractSignIcon,
      path: "/features",
    },
    // {
    //   Label: "Add Meetings",
    //   Img: MeetingsIcon,
    // },
    // {
    //   Label: "Add Calls",
    //   Img: CallsIcon,
    // },
    // {
    //   Label: "Add Task",
    //   Img: TaskIcon,
    // },
  ];

  const IconMap = {
    WebsiteIcon: WebsiteIcon,
    EmailIcon: EmailIcon,
    LinkedinIcon: LinkedinIcon,
    QualifiedIcon: QualifiedIcon,
    DemoIcon: DemoIcon,
    ContractSignIcon: ContractSignIcon,
    OnboardingIcon: OnboardingIcon,
    MostEngagedIcon: MostEngagedIcon,
    HighValueIcon: HighValueIcon,
    HighProbabilityIcon: HighProbablityIcon,
    ResponseIcon: ResponseIcon,
  };
  // const ArcDropDownControledData = [
  //   { id: 1, value: "Contact" },
  //   { id: 2, value: "Account" },
  //   { id: 3, value: "Lead" },
  //   { id: 4, value: "Opportunity" },
  // ];
  // const [SelectedValueState, setSelectedValueState] = useState(
  //   ArcDropDownControledData[0].value
  // );
  const NavigatePage = (path) => {
    if (path.trim() !== "/[object Object]") {
      navigate(path, { state: { showAddTask: false } });
    }
  };

  const handleButtonClick = (path, datasetId) => {
    console.log(path, "task");
    console.log(PlanSavedDatasetid, "plan");
    console.log(PlanViewerSavedDatasetid, "planviewer");

    if (path === "task") {
      console.log("task", datasetId);

      dispatch(TaskSetNewDatasetID(datasetId));
    } else if (path.toLowerCase() === "plan".toLowerCase()) {
      if (datasetId === PlanSavedDatasetid) {
        console.log("Same dataSetID received, exiting");
        return;
      } else {
        dispatch(planSetNewDatasetID(datasetId));
      }
    } else if (path.toLowerCase() === "execution".toLowerCase()) {
      if (datasetId === PlanViewerSavedDatasetid) {
        console.log("Same dataSetID received, exiting");
        return;
      } else {
        dispatch(PlanViewerSetNewDatasetID(datasetId));
      }
    } else if (path.toLowerCase() === "Followup".toLowerCase()) {
      if (datasetId === FollowupSavedDatasetid) {
        console.log("Same dataSetID received, exiting");
        return;
      } else {
        dispatch(FollowupSetNewDatasetID(datasetId));
      }
    } else if (path.toLowerCase() === "execution".toLowerCase()) {
      if (datasetId === PlanViewerSavedDatasetid) {
        console.log("Same dataSetID received, exiting");
        return;
      } else {
        dispatch(PlanViewerSetNewDatasetID(datasetId));
      }
    } else if (path.toLowerCase() === "project".toLowerCase()) {
      if (datasetId === ProjectSavedDatasetid) {
        console.log("Same dataSetID received, exiting");
        return;
      } else {
        dispatch(ProjectSetNewDatasetID(datasetId));
      }
    }
  };

  const handleActionsClick = (path) => {
    if (
      path === "/task" ||
      path === "/plan" ||
      path === "/project" ||
      path === "/execution" ||
      path === "/followup" ||
      path === "/features"
    ) {
      navigate(path, { state: { showAddTask: true, renderCount: 1 } });
    } else {
      navigate(path);
    }
  };

  return (
    <React.Fragment>
      <section className="home-page-journey">
        <Container fluid>
          <Row>
            <Col xxl={12} xl={12} md={12} lg={12}>
              <div className="action-section">
                <div className="action-container">
                  <h3 className="title">Actions</h3>
                  <ul>
                    {Actions.map((data, index) => (
                      <li
                        key={index}
                        title={data.Label}
                        onClick={() => handleActionsClick(data.path)}
                      >
                        <div className="option-img">
                          <img src={data.Img} alt={data.Label} />
                        </div>
                        <p title={data.Label}>{data.Label}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="journey-section">
                <h3 className="title">Journey</h3>

                {!loading ? (
                  dashboardData?.sections
                    ?.filter((section) => section.section_checked)
                    .map((data, Parentindex) => (
                      <div className="journey-container" key={Parentindex}>
                        <h4 className="title">{data.section_displayname}</h4>
                        <ul>
                          {data.fields
                            ?.slice()
                            .sort((a, b) => a.field_sequence - b.field_sequence)
                            .filter((field) => field.field_isactive)
                            .map((option, index) => (
                              <li
                                key={index}
                                title={option.label}
                                className={option.journey && "journey"}
                                onClick={() => {
                                  NavigatePage(
                                    `/${option.field_path.toLowerCase()}`
                                  ),
                                    handleButtonClick(
                                      option.field_path.toLowerCase(),
                                      option.field_datasetid
                                    );
                                }}
                              >
                                <div className="option-img">
                                  <img
                                    src={IconMap[option.field_Img]}
                                    alt={option.label}
                                  />
                                  <span className="count">{option.count}</span>
                                </div>
                                <p title={option.field_Label}>
                                  {option.field_Label}
                                </p>
                                <img
                                  className="arrow"
                                  src={ArrowIcon}
                                  alt={option.Label}
                                />
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))
                ) : (
                  <JourneyLoading />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};
export default HomeJourney;
