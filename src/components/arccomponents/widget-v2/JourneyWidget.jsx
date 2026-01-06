/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React from "react";
//? Assets
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//? Components
import ArcWidget from "@/components/arccomponents/widget-v2/arcwidget";
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
import { BsThreeDotsVertical } from "react-icons/bs";
// *******~ Import ~******** //

const JourneyWidget = ({ Title, Borderbottom, divWidth }) => {
  const Actions = [
    {
      Label: "Add Leads",
      Img: AddContactIcon,
    },
    {
      Label: "Add Contacts",
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
      Label: "Add Meetings",
      Img: MeetingsIcon,
    },
  ];
  const Journey = [
    {
      Title: "Prospect",
      Options: [
        {
          Label: "Website",
          Img: WebsiteIcon,
          Count: "3",
          journey: false,
        },
        {
          Label: "Email",
          Img: EmailIcon,
          Count: "",
          journey: false,
        },
        {
          Label: "LinkedIn",
          Img: LinkedinIcon,
          Count: "1",
          journey: false,
        },
      ],
    },
    {
      Title: "Qualifying Journey",
      Options: [
        {
          Label: "Untouched",
          Img: WebsiteIcon,
          Count: "3",
          journey: true,
        },
        {
          Label: "Qualifing",
          Img: EmailIcon,
          Count: "",
          journey: false,
        },
      ],
    },
  ];
  return (
    <React.Fragment>
      <ArcWidget
        className={`journey-widget div-${divWidth}`}
        Borderbottom={Borderbottom}
      >
        <div className="widget-header">
          <h4>{Title}</h4>
          <div className="actions">
            <span className="action">
              <BsThreeDotsVertical />
            </span>
          </div>
        </div>
        <div className="action-group">
          <div className="action-section">
            <div className="action-container">
              {/* <h3 className="title">Actions</h3> */}
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
          </div>
          {/* <div className="journey-section">
        
            {Journey.map((data, Parentindex) => (
              <div className="journey-container" key={Parentindex}>
                <h4 className="title">{data.Title}</h4>
                <ul>
                  {data.Options.map((data, index) => (
                    <li
                      key={index}
                      title={data.Label}
                      className={data.journey && "journey"}
                    >
                      <div className="option-img">
                        <img src={data.Img} alt={data.Label} />
                        {data.Count && (
                          <span className="count">{data.Count}</span>
                        )}
                      </div>
                      <p title={data.Label}>{data.Label}</p>
                    
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div> */}
        </div>
      </ArcWidget>
    </React.Fragment>
  );
};
export default JourneyWidget;
