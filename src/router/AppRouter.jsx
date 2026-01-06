// import { MatomoTracker } from "@/components/MatomoTracker/Matomotracer";
// import CaseDetailEditModule from "@/modules/Case360DetailsEdit";
import Search360 from "@/pages/Search360";
import FeaturesApi from "@/request/API/FeaturesApi";
import NotesApi from "@/request/API/NotesApi";
import { lazy } from "react";

import { useRoutes } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Logout = lazy(() => import("@/pages/Logout.jsx"));
const NotFound = lazy(() => import("@/pages/NotFound.jsx"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const DashboardV1 = lazy(() => import("@/pages/Dashboardv1"));
const Plan = lazy(() => import("@/pages/Plan"));
const Execution = lazy(() => import("@/pages/Execution"));
const Followup = lazy(() => import("@/pages/Followup"));
const Report = lazy(() => import("@/pages/Report"));
const Task = lazy(() => import("@/pages/Task"));
const Notes = lazy(() => import("@/pages/Notes"));
const Detail360Page = lazy(() => import("@/pages/360detail"));
const Detail360PageV2 = lazy(() => import("@/pages/360detailV2"));
const Detail360PageV3 = lazy(() => import("@/pages/360detailV3"));
const Detail360PageV4 = lazy(() => import("@/pages/360detailV4"));
const Entity360Page = lazy(() => import("@/pages/Entity360Page"));
const ProjectPage = lazy(() => import("@/pages/Project"));
const UIComponentsPage = lazy(() => import("@/pages/ui-component-page"));
const AddLeadPage = lazy(() => import("@/pages/AddLead"));
const HomePage = lazy(() => import("@/pages/Home"));
const DataImportPage = lazy(() => import("@/pages/DataImport"));
const DataImportHistoryPage = lazy(() => import("@/pages/ImportHistory"));
const AdminSettingPage = lazy(() => import("@/pages/AdminSetting"));
const JourneyPage = lazy(() => import("@/pages/journeyHome"));

const ActivitylogPage = lazy(() => import("@/pages/activitylog"));

// ~ Setting Page
const SettingPage = lazy(() => import("@/pages/settings"));
const AdminSettings = lazy(
  () =>
    import("@/modules/settingsModule/outletPages/AdminSettings/AdminSettings")
);
const General = lazy(
  () => import("@/modules/settingsModule/outletPages/general/general")
);
const Notification = lazy(
  () => import("@/modules/settingsModule/outletPages/notification/notification")
);
// ~ Setting Page
const Tag = lazy(() => import("@/pages/Tag"));
//const PlanVsActual = lazy(() => import("@/pages/PlanVsActual"));
const ReportTabs = lazy(() => import("@/pages/ReportTabs"));
const ProjectVsStatusReport = lazy(
  () => import("@/pages/ProjectVsStatusReport")
);
const ResourceVsMonthWeekReport = lazy(
  () => import("@/pages/ResourceVsMonthWeekReport")
);
const ExportHistory = lazy(() => import("@/pages/ExportHistory"));
const ListTablePage = lazy(() => import("@/pages/ListTable"));
const Features = lazy(() => import("@/pages/Features"));
const HomePageV2 = lazy(() => import("@/pages/Homev2"));
const ProspectHomePage = lazy(() => import("@/pages/ProspectHome"));
const Case360DetailsPage = lazy(() => import("@/pages/Case360Details"))
const CaseDetailEditModule = lazy(() => import("@/pages/Case360DetailsEdit"))
// const loggedinusermailid = window.localStorage.getItem("Loggedinuseemailid");
// console.log("loggedinusermailid", loggedinusermailid);
// <MatomoTracker loggedInUserName={loggedinusermailid} />;
export default function AppRouter() {
  console.log("AppRouter");

  let element = useRoutes([
    {
      path: "/login",
      element: <Navigate to="/" />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    // {
    //   path: "/journey",
    //   element: <JourneyPage />,
    // },
    {
      path: "/prospecthome",
      element: <ProspectHomePage />,
    },
    {
      path: "/createTicket",
      element: <Case360DetailsPage />
    },
    {
      path: "/editticket",
      element: <CaseDetailEditModule />
    },
    {
      path: "/home",
      element: <HomePageV2 />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/dashboard_v1",
      element: <DashboardV1 />,
    },
    {
      path: "/plan",
      element: <Plan />,
    },
    {
      path: "/journeyhome",
      element: <HomePageV2 />,
    },
    {
      path: "/execution",
      element: <Execution />,
    },
    {
      path: "/followup",
      element: <Followup />,
    },
    {
      path: "/task",
      element: <Task />,
    },
    {
      path: "/notes",
      element: <Notes />,
    },
    {
      path: "/360detail",
      element: <Detail360Page />,
    },
    {
      path: "/360detail_v2",
      element: <Detail360PageV2 />,
    },
    {
      path: "/360detail_v3",
      element: <Detail360PageV3 />,
    },
    {
      path: "/360detail_v4",
      element: <Detail360PageV4 />,
    },

    {
      path: "/ui-components",
      element: <UIComponentsPage />,
    },
    {
      path: "/addlead",
      element: <AddLeadPage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/import",
      element: <DataImportPage />,
    },
    // {
    //   path: "/importhistory",
    //   element: <DataImportHistoryPage />,
    // },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/adminsetting",
      element: <AdminSettingPage />,
    },
    {
      path: "/settings",
      element: <SettingPage />,
      children: [
        {
          index: true,
          element: <General />,
        },
        {
          path: "adminsetting",
          element: <AdminSettings />,
        },
        {
          path: "general",
          element: <General />,
        },
        {
          path: "notification",
          element: <Notification />,
        },
        {
          path: "ui-components",
          element: <UIComponentsPage />,
        },
      ],
    },
    {
      path: "/entity360Page",
      element: <Entity360Page />,
    },
    {
      path: "/project",
      element: <ProjectPage />,
    },
    {
      path: "/ticket",
      element: <ActivitylogPage />,
    },
    {
      path: "/",
      element: <ActivitylogPage />,
    },
    // {
    //   path: "/FeaturesApi",
    //   element: <FeaturesApi />,
    // },
    // {
    //   path: "/tag",
    //   element: <Tag />,
    // },
    // {
    //   path: "/report",
    //   element: <ReportTabs />,
    // },
    // {
    //   path: "/projectvsstatus",
    //   element: <ProjectVsStatusReport />,
    // },
    // {
    //   path: "/planvsactual",
    //   element: <Report />,
    // },
    // {
    //   path: "/resourcevsmonthweek",
    //   element: <ResourceVsMonthWeekReport />,
    // },
    // {
    //   path: "/project360",
    //   element: <Search360 />,
    //   children: [
    //     {
    //       index: true,
    //       element: <Task />,
    //     },
    //     {
    //       index: true,
    //       element: <Features />,
    //     },
    //   ],
    // },
    // {
    //   path: "/exporthistory",
    //   element: <ExportHistory />,
    // },
    // {
    //   path: "/listtable",
    //   element: <ListTablePage />,
    // },
    // {
    //   path: "/features",
    //   element: <Features />,
    // },
  ]);

  return element;
}
