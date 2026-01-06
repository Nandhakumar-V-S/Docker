// *******~ Import ~******** //
//? React
import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
//? Assets

import {
  GroupByhorizontalInfo,
  dataSetIDInfo,
} from "@/redux/listpage/selector";

//? Components

//? CSS

//? Images

//? JSON File

//? Icons
// *******~ Import ~******** //
export const ArcGlobalContextProvider = createContext({});
export const ArcGlobalContext = ({ children }) => {
  const horizontalGroupBy = useSelector(GroupByhorizontalInfo);
  const dataSetID = useSelector(dataSetIDInfo);

  const EntityHorizontalGroupBy = useSelector(
    (state) => state.execution.horizontalGroupBy
  );
  const ReportHorizontalGroupBy = useSelector(
    (state) => state.report.horizontalGroupBy
  );
  const FollowupHorizontalGroupBy = useSelector(
    (state) => state.followup.horizontalGroupBy
  );
  const planHorizontalGroupBy = useSelector(
    (state) => state.plan.horizontalGroupBy
  );
  const planHorizontalGroupByMaster = useSelector(
    (state) => state.plan.horizontalGroupByMaster
  );
  const taskHorizontalGroupBy = useSelector(
    (state) => state.task.horizontalGroupBy
  );
  const journeyHorizontalGroupBy = useSelector(
    (state) => state.journey.horizontalGroupBy
  );
  const notesHorizontalGroupBy = useSelector(
    (state) => state.notes.horizontalGroupBy
  );
  const tagHorizontalGroupBy = useSelector(
    (state) => state.tag.horizontalGroupBy
  );
  
  const impHisHorizontalGroupBy = useSelector(
    (state) => state.ImportHistory.horizontalGroupBy
  );
  const adminHorizontalGroupBy = useSelector(
    (state) => state.admin.horizontalGroupBy
  );
  const projectHorizontalGroupBy = useSelector(
    (state) => state.project.horizontalGroupBy
  );
  const projectVsStatusReportHorizontalGroupBy = useSelector(
    (state) => state.projectVsStatusReport.horizontalGroupBy
  );
  const ResourceVsMonthWeekReportHorizontalGroupBy = useSelector(
    (state) => state.resourceVsMonthWeekReport.horizontalGroupBy
  );

  const ActivitylogHorizontalGroupBy = useSelector(
    (state) => state.activitylog.horizontalGroupBy
  );

  const EntitydataSetID = useSelector((state) => state.execution.dataSetID);

  const [inputValues, setInputValues] = useState({});
  const [isGrouping, setisGrouping] = useState(false);
  const [entIsGrouping, setentIsGrouping] = useState(false);
  const [repIsGrouping, setrepIsGrouping] = useState(false);
  const [followIsGrouping, setfollowIsGrouping] = useState(false);
  const [planIsGrouping, setPlanIsGrouping] = useState(false);
  const [taskIsGrouping, setTaskIsGrouping] = useState(false);
  const [tagIsGrouping, setTagIsGrouping] = useState(false);
  const [impHisIsGrouping, setImpHisIsGrouping] = useState(false);
  const [adminIsGrouping, setAdminIsGrouping] = useState(false);
  const [projectIsGrouping, setProjectIsGrouping] = useState(false);
  const [JourneyIsGrouping, setJourneyIsGrouping] = useState(false);
  const [NotesIsGrouping, setNotesIsGrouping] = useState(false);
  const [task360followuptab, settask360followuptab] = useState(false);
  const [activitylogIsGrouping, setactivitylogIsGrouping] = useState(false);

  const [
    resourceVsMonthWeekReportIsGrouping,
    setResourceVsMonthWeekReportIsGrouping,
  ] = useState(false);
  const [projectVsStatusReportIsGrouping, setprojectVsStatusReportIsGrouping] =
    useState(false);
  const [selectedFilterItem, setselectedFilterItem] = useState([]);
  const LastPathName = sessionStorage.getItem("PreviousPath");
  const [previousPathName, setPreviousPathName] = useState(
    LastPathName || "/execution"
  );

  useEffect(() => {
    if (horizontalGroupBy.length > 0) {
      setisGrouping(true);
    } else {
      setisGrouping(false);
    }
  }, [horizontalGroupBy]);

  useEffect(() => {
    setisGrouping(false);
  }, [dataSetID]);

  useEffect(() => {
    if (EntityHorizontalGroupBy.length > 0) {
      setentIsGrouping(true);
    } else {
      setentIsGrouping(false);
    }
  }, [EntityHorizontalGroupBy]);

  useEffect(() => {
    if (ReportHorizontalGroupBy.length > 0) {
      setrepIsGrouping(true);
    } else {
      setrepIsGrouping(false);
    }
  }, [ReportHorizontalGroupBy]);

  useEffect(() => {
    if (FollowupHorizontalGroupBy.length > 0) {
      setfollowIsGrouping(true);
    } else {
      setfollowIsGrouping(false);
    }
  }, [FollowupHorizontalGroupBy]);

  useEffect(() => {
    if (planHorizontalGroupBy.length > 0) {
      setPlanIsGrouping(true);
    } else {
      setPlanIsGrouping(false);
    }
  }, [planHorizontalGroupBy, planHorizontalGroupByMaster]);

  useEffect(() => {
    if (taskHorizontalGroupBy.length > 0) {
      setTaskIsGrouping(true);
    } else {
      setTaskIsGrouping(false);
    }
  }, [taskHorizontalGroupBy]);
  useEffect(() => {
    if (journeyHorizontalGroupBy.length > 0) {
      setJourneyIsGrouping(true);
    } else {
      setJourneyIsGrouping(false);
    }
  }, [journeyHorizontalGroupBy]);
  useEffect(() => {
    if (notesHorizontalGroupBy.length > 0) {
      setNotesIsGrouping(true);
    } else {
      setNotesIsGrouping(false);
    }
  }, [notesHorizontalGroupBy]);

  useEffect(() => {
    if (tagHorizontalGroupBy.length > 0) {
      setTagIsGrouping(true);
    } else {
      setTagIsGrouping(false);
    }
  }, [tagHorizontalGroupBy]);


  useEffect(() => {
    if (impHisHorizontalGroupBy.length > 0) {
      setImpHisIsGrouping(true);
    } else {
      setImpHisIsGrouping(false);
    }
  }, [impHisHorizontalGroupBy]);

  useEffect(() => {
    if (adminHorizontalGroupBy.length > 0) {
      setAdminIsGrouping(true);
    } else {
      setAdminIsGrouping(false);
    }
  }, [adminHorizontalGroupBy]);

  useEffect(() => {
    if (projectHorizontalGroupBy.length > 0) {
      setProjectIsGrouping(true);
    } else {
      setProjectIsGrouping(false);
    }
  }, [projectHorizontalGroupBy]);

  useEffect(() => {
    if (projectVsStatusReportHorizontalGroupBy.length > 0) {
      setprojectVsStatusReportIsGrouping(true);
    } else {
      setprojectVsStatusReportIsGrouping(false);
    }
  }, [projectVsStatusReportHorizontalGroupBy]);
  useEffect(() => {
    if (ResourceVsMonthWeekReportHorizontalGroupBy.length > 0) {
      setResourceVsMonthWeekReportIsGrouping(true);
    } else {
      setResourceVsMonthWeekReportIsGrouping(false);
    }
  }, [ResourceVsMonthWeekReportHorizontalGroupBy]);

  useEffect(() => {
    if (ActivitylogHorizontalGroupBy.length > 0) {
      setactivitylogIsGrouping(true);
    } else {
      setactivitylogIsGrouping(false);
    }
  }, [ActivitylogHorizontalGroupBy]);

  useEffect(() => {
    setentIsGrouping(false);
  }, [EntitydataSetID]);

  //! Theme Color Switch Start
  const storedThemeColor = sessionStorage.getItem("themeColor");
  const defaultThemeColor = storedThemeColor || "#2f5fc9";

  const [themeColor, setThemeColor] = useState(defaultThemeColor);

  const handleThemeChange = (newColor) => {
    setThemeColor(newColor);
    document.documentElement.style.setProperty("--themecolor", newColor);
    // Store the selected theme color in sessionStorage
    sessionStorage.setItem("themeColor", newColor);
  };

  useEffect(() => {
    // Retrieve the theme color from sessionStorage
    const storedThemeColor = sessionStorage.getItem("themeColor");

    // Set the theme color if it exists in sessionStorage
    if (storedThemeColor) {
      setThemeColor(storedThemeColor);
      document.documentElement.style.setProperty(
        "--themecolor",
        storedThemeColor
      );
    }
  }, []);
  //! Theme Color Switch end

  return (
    <>
      <style type="text/css">{`
        :root {
            --themecolor:${themeColor}; 
          }
    `}</style>

      <ArcGlobalContextProvider.Provider
        value={{
          inputValues,
          setInputValues,
          themeColor,
          handleThemeChange,
          isGrouping,
          setisGrouping,
          entIsGrouping,
          setentIsGrouping,
          repIsGrouping,
          setrepIsGrouping,
          followIsGrouping,
          planIsGrouping,
          taskIsGrouping,
          tagIsGrouping,
          previousPathName,
          setPreviousPathName,
          impHisIsGrouping,
          selectedFilterItem,
          setselectedFilterItem,
          adminIsGrouping,
          projectIsGrouping,
          projectVsStatusReportIsGrouping,
          resourceVsMonthWeekReportIsGrouping,
          JourneyIsGrouping,
          NotesIsGrouping,
          task360followuptab,
          settask360followuptab,
          activitylogIsGrouping,
          setactivitylogIsGrouping,
        }}
      >
        {children}
      </ArcGlobalContextProvider.Provider>
    </>
  );
};
