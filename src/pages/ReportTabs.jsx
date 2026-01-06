import React from "react";
import { GoTasklist } from "react-icons/go";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function ReportTabs() {
  return (
    <div className="report-tabs-container">
      <RenderTabs />
    </div>
  );
}

export default ReportTabs;

const RenderTabs = () => {
  const navigate = useNavigate();
  const ReportNavigationTabs = [
    {
      name: "Plan Vs Actual",
      url: "/planvsactual",
    },
    {
      name: "Project Summary Report",
      url: "/projectvsstatus",
    },
    {
      name: "Resource Summary Report",
      url: "/resourcevsmonthweek",
    },
    // {
    //   name: "Plan Vs Actual2",
    //   url: "/planvsactual2",
    // },
  ];
  return (
    <div className="report-tabs">
      <p>
        <HiOutlineDocumentText />
        Report
      </p>
      <div className="nav-btns">
        {ReportNavigationTabs.map((item, idx) => (
          <button key={idx} onClick={() => navigate(`${item.url}`)}>
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};
