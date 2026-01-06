import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { SSO_ENABLED } from "@/config/serverApiConfig";
import { keycloak } from "@/config/keycloakconfig";
import { PROTO_ENABLED } from "@/config/serverApiConfig";
import ProtoApi from "@/request/API/protoApi";
import ExecutionApi from "@/request/API/ExecutionApi";
import FollowupApi from "@/request/API/FollowupApi";
import ReportApi from "@/request/API/ReportApi";
import PlanApi from "@/request/API/PlanApi";
import TaskApi from "@/request/API/TaskApi";
import JourneyApi from "@/request/API/JourneyApi";
import ProjectApi from "@/request/API/ProjectApi";
import AdminSettingApi from "@/request/API/AdminSettingApi";
import ImportHistoryApi from "@/request/API/ImportHistory";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import ThemeContext from "@/context/themeContext/themecontexts";
import ColorSwitch from "@/components/color-switch/color-switch";
import Logo from "@/style/arcstyle/images/logo.png";
import { MdOutlineCancel } from "react-icons/md";
import { FiHome } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import { LiaAddressCardSolid } from "react-icons/lia";
import { TbLayersSubtract } from "react-icons/tb";
import { GoPlusCircle } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { MdSwitchAccount } from "react-icons/md";
import MenuBtn from "@/apps/Navigation/Menubutton";
import ArcPopover from "@/components/arccomponents/ui-components/ArcPopover/ArcPopover";
//import { Avatar, Dropdown, Layout } from 'antd';
import Offcanvas from "react-bootstrap/Offcanvas";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// import Notifications from '@/components/Notification';
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
//import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import PageSetup from "@/context/GlobalContext/PageSetup.json";
import { checkImage } from "@/request";
import { getUsername, resetDatefilters } from "@/redux/Execution/actions";
import { getplanUsername } from "@/redux/Plan/actions";
import { getRepUsername } from "@/redux/Report/actions";
import { getTaskUsermail, getTaskUsername } from "@/redux/Task/actions";
import { getUsernamefollow } from "@/redux/Followup/actions";
import { getUsernameadmin } from "@/redux/AdminSetting/actions";
import { getUsernameproject } from "@/redux/Project/actions";
import { selectCurrentAdmin, selectAuth } from "@/redux/auth/selectors";

import { useNavigate } from "react-router-dom";
import ArcOffCanva from "@/components/arccomponents/ui-components/ArcOffCanva/ArcOffCanva";
import ArcSingleSelect from "@/components/arccomponents/ui-components/ArcSingleSelect/ArcSingleSelect";
import { BASE_URL } from "@/config/serverApiConfig";

import useLanguage from "@/locale/useLanguage";
import Form from "react-bootstrap/Form";
import SelectLanguage from "@/components/SelectLanguage";
import { Player } from "@lottiefiles/react-lottie-player";
import Navigation from "@/apps/Navigation/NavigationContainer";

//import UpgradeButton from './UpgradeButton';
import DataNotFound from "@/style/images/datanotfound.json";
import { logout as logoutAction } from "@/redux/auth/actions";

import { PiCurrencyCircleDollarBold } from "react-icons/pi";
import SearchComponent from "./filter";
import ThemeSetter1 from "@/context/themeContext/themeshetter1";
import ThemeSetter2 from "@/context/themeContext/themeshetter2";

// Icon

import { GrPowerReset } from "react-icons/gr";
import { FaFilterCircleXmark } from "react-icons/fa6";
import Table from "react-bootstrap/Table";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { FiMinusCircle } from "react-icons/fi";
// ! Icons
import { VscColorMode } from "react-icons/vsc";
import { LiaBoxOpenSolid } from "react-icons/lia";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { BiTask } from "react-icons/bi";
import { TbCalendarTime } from "react-icons/tb";
import { TbPhoneCalling } from "react-icons/tb";
import { LiaSmsSolid } from "react-icons/lia";
import { TfiEmail } from "react-icons/tfi";
import { RiMailSendLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import TagApi from "@/request/API/TagApi";
import { getTagUsername } from "@/redux/Tag/actions";
import { getImpUsername } from "@/redux/ImportHistory/actions";

import ProjectVsStatusReportApi from "@/request/API/ProjectVsStatusReportApi";
import ResourceVsMonthWeekReportApi from "@/request/API/ResourceVsMonthWeekReportApi";
import { getProjectVsStatusReportUsername } from "@/redux/ProjectVsStatusReport/actions";
import { getResourceVsMonthWeekUsername } from "@/redux/ResourceVsMonthWeekReport/actions";
import { getExporthistoryUsername } from "@/redux/Exporthistory/actions";
import ExporthistoryApi from "@/request/API/ExporthistoryApi";
import { getFeaturesUsername } from "@/redux/Features/actions";
import { getJourneyUsername } from "@/redux/Journey/actions";
import { getTaskInfoUsername } from "@/redux/TaskInfo/actions";

import FeaturesApi from "@/request/API/FeaturesApi";

// ~ Matomo tracker
import { useMatomo } from "@datapunt/matomo-tracker-react";
import NotesApi from "@/request/API/NotesApi";
import { getNotesUsername } from "@/redux/Notes/actions";
// import { MatomoTracker } from "@/components/MatomoTracker/Matomotracer";
// ~ Matomo tracker
import { AuditlogDetails } from "@/redux/AuditLog/Auditlogdetails";
import { getUsernameactivitylog } from "@/redux/Activitylog/actions";
import ActivitylogApi from "@/request/API/ActivitylogApi";
//import PlanVsActualApi from "@/request/API/PlanVsActualApi";
//import { getPlanVsActualRepUsername } from "@/redux/PlanVsActualReport/actions";
// * Import
export default function HeaderContent() {
  // const { trackPageView, trackEvent } = useMatomo();
  const dispatch = useDispatch();
  const currentAdmin = useSelector(selectCurrentAdmin);
  const { isLoggedIn } = useSelector(selectAuth);
  //sso users
  const [shortName, setShortName] = useState("");
  const [username, setusername] = useState("");
  const [usermail, setusermail] = useState("");
  const [currentApi, setCurrentApi] = useState();
  // Set up Keycloak user details

  useEffect(() => {
    sessionStorage.setItem("pageCount", 0);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const tokenString = localStorage.getItem("token");
      console.log(tokenString);

      if (tokenString) {
        const tokenObject = JSON.parse(tokenString);
        console.log(tokenObject);
        const token = tokenObject.tokenString;
        console.log(token);

        if (token) {
          const parts = token.split(".");
          const encodedPayload = parts[1];
          // Decode the token
          const decodedToken = JSON.parse(atob(encodedPayload));
          console.log(decodedToken);

          if (decodedToken) {
            // sessionStorage.setItem("Globalid", decodedToken.Globalid);
            const sessionData = {
              fullName: decodedToken.fullName,
              Globalid: decodedToken?.Globalid,
            };
            sessionStorage.setItem("GlobalUser", JSON.stringify(sessionData));
            sessionStorage.setItem("Globalid", decodedToken.Globalid);
            setusername(decodedToken.firstname + " " + decodedToken.lastname);
            setusermail(decodedToken.email);
            window.localStorage.setItem(
              "Loggedinuseemailid",
              decodedToken.email
            );
            setShortName(
              decodedToken?.firstname?.charAt(0).toUpperCase() +
              "" +
              decodedToken?.lastname?.charAt(0).toUpperCase()
            );
            dispatch(
              getUsername(decodedToken.firstname, decodedToken.Globalid)
            );
            dispatch(
              getTaskInfoUsername(decodedToken.firstname, decodedToken.Globalid)
            );
            dispatch(
              getplanUsername(decodedToken.firstname, decodedToken.Globalid)
            );
            dispatch(
              getRepUsername(decodedToken.firstname, decodedToken.Globalid)
            );
            dispatch(
              getTaskUsername(decodedToken.firstname, decodedToken.Globalid)
            );
            dispatch(getTaskUsermail(decodedToken.email));
            dispatch(
              getUsernamefollow(decodedToken.firstname, decodedToken.Globalid)
            );
            dispatch(
              getUsernameadmin(decodedToken.firstname, decodedToken.Globalid)
            );
            dispatch(
              getUsernameproject(decodedToken.firstname, decodedToken.Globalid)
            );
            dispatch(
              getTagUsername(decodedToken.firstname, decodedToken.Globalid)
            );
            dispatch(
              getImpUsername(decodedToken.firstname, decodedToken.Globalid)
            );
            dispatch(
              getFeaturesUsername(decodedToken.firstname, decodedToken.Globalid)
            );
            dispatch(
              getJourneyUsername(decodedToken.firstname, decodedToken.Globalid)
            );
            dispatch(
              getNotesUsername(decodedToken.firstname, decodedToken.Globalid)
            );
            dispatch(
              getUsernameactivitylog(decodedToken.firstname, decodedToken.Globalid)
            );
            dispatch(
              getExporthistoryUsername(
                decodedToken.firstname,
                decodedToken.Globalid
              )
            );
            dispatch(
              getProjectVsStatusReportUsername(
                decodedToken.firstname,
                decodedToken.Globalid
              )
            );
            dispatch(
              getResourceVsMonthWeekUsername(
                decodedToken.firstname,
                decodedToken.Globalid
              )
            );
            // dispatch(
            //   getPlanVsActualRepUsername(
            //     decodedToken.firstname,
            //     decodedToken.Globalid
            //   )
            // );
          }
        }
      }
    }
  }, [isLoggedIn]);
  //sso users
  //const { Header } = Layout;
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);

  const translate = useLanguage();
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    // Add or remove the class on the body tag based on the theme
    document.body.classList.toggle("theme--dark", theme === "dark");
    document.body.classList.toggle("theme--light", theme === "light");
  }, [theme]);

  let location = useLocation();
  console.log(location);
  const currentPathName = location?.pathname;
  console.log(currentPathName);

  // ~ Matomo Tracker
  // useEffect(() => {
  //   console.log("track header container");
  //   trackPageView();
  // }, [location]);
  // ~ Matomo Tracker

  useEffect(() => {
    if (currentPathName) {
      setCurrentApi(currentPathName);
    }
  }, [currentPathName]);

  console.log(currentApi);
  const PageSetupHeader = PageSetup.Header;
  const loggedinusermailid = window.localStorage.getItem("Loggedinuseemailid");
  console.log("loggedinusermailid", loggedinusermailid);
  return (
    <>
      {/* <MatomoTracker /> */}
      {currentApi === "/execution" ? <ExecutionApi /> : null}
      {currentApi === "/journey" ? <JourneyApi /> : null}
      {currentApi === "/importhistory" ? <ImportHistoryApi /> : null}
      {currentApi === "/plan" ? <PlanApi /> : null}
      {currentApi === "/" ? <ActivitylogApi /> : null}
      {currentApi === "/followup" ? <FollowupApi /> : null}
      {currentApi === "/task" ? <TaskApi /> : null}
      {currentApi === "/adminsetting" ? <AdminSettingApi /> : null}
      {currentApi === "/settings/adminsetting" ? <AdminSettingApi /> : null}
      {currentApi === "/project" ? <ProjectApi /> : null}
      {currentApi === "/tag" ? <TagApi /> : null}
      {currentApi === "/features" ? <FeaturesApi /> : null}
      {currentApi === "/planvsactual" ? <ReportApi /> : null}
      {currentApi === "/notes" ? <NotesApi /> : null}
      {currentApi === "/ticket" ? <ActivitylogApi /> : null}
      {/* {currentApi === "/planvsactual2" ? <PlanVsActualApi /> : null} */}
      {currentApi === "/projectvsstatus" ? <ProjectVsStatusReportApi /> : null}
      {currentApi === "/exporthistory" ? <ExporthistoryApi /> : null}
      {currentApi === "/resourcevsmonthweek" ? (
        <ResourceVsMonthWeekReportApi />
      ) : null}

      <Navbar collapseOnSelect expand="md" sticky="top" className="main-header">
        <Container fluid>
          <div className="logo">
            <>
              <Nav.Link as={Link} to={"/"} eventKey={0}>
                <div className="logo-inside">
                  <img src={Logo} alt="" /> <p>{PageSetupHeader.Title}</p>
                </div>
              </Nav.Link>
            </>
          </div>
          {ScreenWidth > BreakpointSm ? <Navigation /> : null}
          <div className="btn-grp">
            {PageSetupHeader.QuickMenu.Add && (
              <>
                <AddBtn />
                <p>|</p>
              </>
            )}
            {PageSetupHeader.QuickMenu.Search && (
              <>
                <SearchComponent />
              </>
            )}
            {PageSetupHeader.QuickMenu.Setting && (
              <>
                <Link to="/adminsetting">
                  <button className="setting-btn">
                    <IoSettingsOutline />
                  </button>
                </Link>
              </>
            )}
            {PageSetupHeader.QuickMenu.Notification && (
              <>
                <NotificationPopup />
              </>
            )}
            {PageSetupHeader.QuickMenu.Profile && (
              <>
                {/* <p>|</p> */}
                <ProfileDropdown
                  username={username}
                  usermail={usermail}
                  shortName={shortName}
                />
              </>
            )}
          </div>
          <MenuBtn />
          {ScreenWidth > BreakpointSm ? null : <Navigation />}
        </Container>
      </Navbar>
    </>
  );
}

const ProfileDropdown = ({ username, usermail, shortName }) => {
  const navigate = useNavigate();
  // const [ThemeSettingpopover, setThemeSettingpopover] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  //const { setLoginAccess } = useContext(AuthContext);
  const handleLoginClick = () => {
    window.localStorage.removeItem("auth");
    window.localStorage.removeItem("settings");
    window.localStorage.setItem("isLogout", JSON.stringify({ isLogout: true }));

    // setLoginAccess(false);
    // Store in sessionStorage
    // sessionStorage.setItem("LoginAccess", JSON.stringify(true));
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    // Dispatch the logoutUser action when the logout button is clicked
    const obj = {
      emailID: sessionStorage.getItem("email"),
      tenantappid: "00000000-0000-0000-0000-000000000000",
      tenant: "00000000-0000-0000-0000-000000000000",
      loginType: "Logout",
      loginStatus: "Success",
      ip: sessionStorage.getItem("ipAddress"),
      URL: window.location.href,
      Globalid: sessionStorage.getItem("Globalid"),
    };

    dispatch(AuditlogDetails(obj));
    dispatch(logoutAction());
    dispatch(resetDatefilters());
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("auditlogemail");
    if (SSO_ENABLED) {
      keycloak.logout();
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        rootClose={!showPopover}
        overlay={
          <Popover
            id={`popover-positioned-bottom-end`}
            className={`profile-dropdown  `}
          >
            <Popover.Body>
              <button className="profile">
                <span>{shortName}</span>
                <div className="name-email">
                  <p>{username}</p>
                  <p>{usermail}</p>
                </div>
              </button>
              <div className="link-div">
                <Link to="/">
                  <IoSettingsOutline />
                  Profile Settings
                </Link>
              </div>
              <ThemeSetting
                showPopover={showPopover}
                setShowPopover={setShowPopover}
              />
              <button className="logout" onClick={handleLogout}>
                <AiOutlineLogout /> Logout
              </button>
            </Popover.Body>
          </Popover>
        }
      >
        <button className="profile-btn">{shortName}</button>
      </OverlayTrigger>
    </>
  );
};
const ThemeSetting = ({ showPopover, setShowPopover }) => {
  // const [showPopover, setShowPopover] = useState(false);

  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="left-start"
        rootClose
        show={showPopover}
        onToggle={(show) => setShowPopover(show)}
        overlay={
          <Popover className="themesetting-popover">
            <Popover.Body>
              <div className="themesetting-popover-body">
                <p className="setting-title">Modes</p>
                <ThemeSetter2 />
                <div className="themecolor-option">
                  <p className="setting-title">Color</p>
                  <div className="color-option-group">
                    <ColorSwitch />
                  </div>
                </div>
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <button
          className={`themesetting-popover-btn ${showPopover ? "active" : null
            }`}
        >
          <VscColorMode /> Theme
          <span className="theme-arrow">
            <MdKeyboardArrowRight />
          </span>
        </button>
      </OverlayTrigger>
    </>
  );
};

//const ProfileDropdown = () => {
//  const navigate = useNavigate();
//  return (
//    <div className="profileDropdown" onClick={() => navigate('/profile')}>
//      <Avatar
//        size="large"
//        className="last"
//        src={hasPhotoprofile ? BASE_URL + currentAdmin?.photo : null}
//        style={{ color: '#f56a00', backgroundColor: !hasPhotoprofile ? '#fde3cf' : '#f9fafc' }}
//      >
//        {currentAdmin?.name?.charAt(0)?.toUpperCase()}
//      </Avatar>
//      <div className="profileDropdownInfo">
//        <p>
//          {currentAdmin?.name} {currentAdmin?.surname}
//        </p>
//        <p>{currentAdmin?.email}</p>
//      </div>
//    </div>
//  );
//};

//const DropdownMenu = ({ text }) => {
//  return <span style={{}}>{text}</span>;
//};

//const items = [
//  {
//    label: <ProfileDropdown className="headerDropDownMenu" />,
//    key: 'ProfileDropdown',
//  },
//  {
//    type: 'divider',
//  },
//  {
//    icon: <SettingOutlined />,
//    key: 'settingProfile',
//    label: (
//      <Link to={'/profile'}>
//        <DropdownMenu text={translate('profile_settings')} />
//      </Link>
//    ),
//  },
//  {
//    icon: <SettingOutlined />,
//    key: 'settingApp',
//    label: <Link to={'/settings'}>{translate('app_settings')}</Link>,
//  },

//  {
//    type: 'divider',
//  },

//  {
//    icon: <LogoutOutlined />,
//    key: 'logout',
//    label: <Link to={'/logout'}>{translate('logout')}</Link>,
//  },
//];

//return (
//  <Header
//    style={{
//      padding: '20px',
//      background: '#f9fafc',
//      display: ' flex',
//      flexDirection: ' row-reverse',
//      justifyContent: ' flex-start',
//      gap: ' 15px',
//    }}
//  >
//    <Dropdown
//      menu={{
//        items,
//      }}
//      trigger={['click']}
//      placement="bottomRight"
//      stye={{ width: '280px', float: 'right' }}
//    >
//      {/* <Badge dot> */}
//      <Avatar
//        className="last"
//        src={hasPhotoprofile ? BASE_URL + currentAdmin?.photo : null}
//        style={{
//          color: '#f56a00',
//          backgroundColor: !hasPhotoprofile ? '#fde3cf' : '#f9fafc',
//          float: 'right',
//          cursor: 'pointer',
//        }}
//        size="large"
//      >
//        {currentAdmin?.name?.charAt(0)?.toUpperCase()}
//      </Avatar>
//      {/* </Badge> */}
//    </Dropdown>

//    <UpgradeButton />

//    <SelectLanguage />
//  </Header>
//);
// }

//  console.log(
//    '🚀 Welcome to IDURAR ERP CRM! Did you know that we also offer commercial customization services? Contact us at hello@idurarapp.com for more information.'
//  );

// const SearchComponent = () => {
//   const [ArcOffCanvaShow, setArcOffCanvaShow] = useState(false);
//   const handleArcOffCanvaClose = () => setArcOffCanvaShow(false);
//   const handleArcOffCanva2Show = () => setArcOffCanvaShow(true);
//   const options = [
//     { value: "Work 1", label: "Work 1" },
//     { value: "Work 2", label: "Work 2" },
//     { value: "Work 3", label: "Work 3" },
//   ];
//   const [key, setKey] = useState("All");
//   return (
//     <>
//       <button
//         className="arc-btn-primary search-btn"
//         onClick={handleArcOffCanva2Show}
//       >
//         <IoSearch />
//       </button>
//       <Offcanvas
//         show={ArcOffCanvaShow}
//         onHide={handleArcOffCanvaClose}
//         className={`arc-off-canva-default search-filter`}
//         placement="start"
// backdrop="static"
//       >
//         <Offcanvas.Body>
//           <div className="off-canva-body-content">
//             <div className="off-canva-header">
//               <h3>Filter</h3>
//               <span className="close-btn" onClick={handleArcOffCanvaClose}>
//                 <MdOutlineCancel />
//               </span>
//             </div>
//             <div className="off-canva-main">
//               <div className="search-input-filter">
//                 <span>
//                   <IoSearch />
//                 </span>
//                 <Form.Control type="text" placeholder="Search..." />
//               </div>
//               <div className="select-input-filter">
//                 <ArcSingleSelect
//                   options={options}
//                   Label="Sales Owner"
//                   PlaceHolder="Select Option"
//                   ClassName=""
//                 />
//                 <ArcSingleSelect
//                   options={options}
//                   Label="Created at"
//                   PlaceHolder="Select Option"
//                   ClassName=""
//                 />
//                 <ArcSingleSelect
//                   options={options}
//                   Label="Updated at"
//                   PlaceHolder="Select Option"
//                   ClassName=""
//                 />
//               </div>
//               <div className="arc-tab-content">
//                 <Tabs
//                   activeKey={key}
//                   onSelect={(k) => setKey(k)}
//                   className=""
//                   transition={false}
//                 >
//                   <Tab eventKey="All" title={<>All results</>}>
//                     <>
//                       <div className="tab-main-content">
//                         <div className="lottie-animation">
//                           {/* <Player autoplay loop src={DataNotFound}></Player> */}
//                           <p>Data Not Found</p>
//                         </div>
//                       </div>
//                     </>
//                   </Tab>
//                   <Tab eventKey="Contacts" title={<>Contacts</>}>
//                     <>
//                       <div className="tab-main-content">
//                         <div className="filter-data-table">
//                           <Table bordered>
//                             <thead>
//                               <tr>
//                                 <th>#</th>
//                                 <th>First Name</th>
//                                 <th>Last Name</th>
//                                 <th>Username</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               <tr>
//                                 <td>1</td>
//                                 <td>Mark</td>
//                                 <td>Otto</td>
//                                 <td>@mdo</td>
//                               </tr>
//                               <tr>
//                                 <td>2</td>
//                                 <td>Jacob</td>
//                                 <td>Thornton</td>
//                                 <td>@fat</td>
//                               </tr>
//                               <tr>
//                                 <td>3</td>
//                                 <td>Larry the Bird</td>
//                                 <td>Larry the Bird</td>
//                                 <td>@twitter</td>
//                               </tr>
//                             </tbody>
//                           </Table>
//                         </div>
//                       </div>
//                     </>
//                   </Tab>
//                   <Tab eventKey="Accounts" title={<>Accounts</>}>
//                     <>
//                       <div className="tab-main-content">
//                         <p>Accounts</p>
//                       </div>
//                     </>
//                   </Tab>
//                   <Tab eventKey="Deals" title={<>Deals</>}>
//                     <>
//                       <div className="tab-main-content">
//                         <p>Deals</p>
//                       </div>
//                     </>
//                   </Tab>
//                   <Tab eventKey="Tasks" title={<>Tasks</>}>
//                     <>
//                       <div className="tab-main-content">
//                         <p>Tasks</p>
//                       </div>
//                     </>
//                   </Tab>
//                   <Tab eventKey="Meetings" title={<>Meetings</>}>
//                     <>
//                       <div className="tab-main-content">
//                         <p>Meetings</p>
//                       </div>
//                     </>
//                   </Tab>
//                 </Tabs>
//               </div>
//             </div>
//             <div className="off-canva-footer">
//               {/* <button className="reset-btn">Rest to Default</button> */}
//               <button className="cancel" onClick={handleArcOffCanvaClose}>
//                 <FaFilterCircleXmark /> Clear Filter
//               </button>
//               <button onClick={handleArcOffCanvaClose}>
//                 <GrPowerReset /> Rest to Default
//               </button>
//             </div>
//           </div>
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// };

const AddBtn = () => {
  const [showPopover, setShowPopover] = useState(false);
  const handlePopoverClose = () => {
    setShowPopover(false);
  };
  // Initialize state variable to hold checked values
  const [checkedItems, setCheckedItems] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      // If checkbox is checked, add its name to the array
      setCheckedItems((prevItems) => [...prevItems, name]);
    } else {
      // If checkbox is unchecked, remove its name from the array
      setCheckedItems((prevItems) => prevItems.filter((item) => item !== name));
    }
  };

  const AddDataList = [
    {
      title: "Record",
      list: [
        {
          name: "Add Contact",
          icon: <MdOutlineAccountCircle />,
        },
        {
          name: "Add Account",
          icon: <MdSwitchAccount />,
        },
        {
          name: "Add Deal",
          icon: <PiCurrencyCircleDollarBold />,
        },
        {
          name: "Add Product",
          icon: <LiaBoxOpenSolid />,
        },
        {
          name: "Add Quote",
          icon: <HiOutlineDocumentText />,
        },
      ],
    },
    {
      title: "Sales Activites",
      list: [
        {
          name: "Add Task",
          icon: <BiTask />,
        },
        {
          name: "Add Meeting",
          icon: <TbCalendarTime />,
        },
        {
          name: "Add Call log",
          icon: <TbPhoneCalling />,
        },
        {
          name: "Send SMS",
          icon: <LiaSmsSolid />,
        },
      ],
    },
    {
      title: "Email",
      list: [
        {
          name: "Send Mail",
          icon: <TfiEmail />,
        },
        {
          name: "Create Template",
          icon: <RiMailSendLine />,
        },
        {
          name: "Create Sales",
          icon: <BiMoneyWithdraw />,
        },
      ],
    },
  ];
  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="auto"
        rootClose
        show={showPopover}
        onToggle={(show) => setShowPopover(show)}
        overlay={
          <Popover className={`arc-popover header-add-popup`}>
            <Popover.Body>
              <div className="arc-popover-body">
                {/* <div className="arc-popover-header">
                  <h5>Title</h5>
                  <ArcToolTip
                    onClick={handlePopoverClose}
                    HoverText="Close"
                    BtnName={<ImCancelCircle />}
                    Placement="left"
                    as="span"
                  />
                </div> */}
                <div className="arc-popover-main">
                  <div className="add-content-main">
                    {AddDataList.map((data, index) => (
                      <React.Fragment key={index}>
                        <div className="add-content-box">
                          <div className="add-title">{data.title}</div>
                          <ul>
                            {data.list.map((data, index) => (
                              <li
                                key={index}
                                className={
                                  checkedItems.includes(data.name)
                                    ? "selected"
                                    : null
                                }
                              >
                                <input
                                  type="checkbox"
                                  id={
                                    data.name
                                      .replace(/\s+/g, "")
                                      .toLowerCase() + "-add"
                                  }
                                  checked={checkedItems.includes(data.name)}
                                  onChange={handleCheckboxChange}
                                  name={data.name}
                                />
                                <label
                                  className="icon-box"
                                  htmlFor={
                                    data.name
                                      .replace(/\s+/g, "")
                                      .toLowerCase() + "-add"
                                  }
                                >
                                  <span>{data.icon}</span>
                                  <p>{data.name}</p>
                                </label>

                                <label
                                  className="cancel-btn"
                                  htmlFor={
                                    data.name
                                      .replace(/\s+/g, "")
                                      .toLowerCase() + "-add"
                                  }
                                >
                                  {checkedItems.includes(data.name) ? (
                                    <FiMinusCircle />
                                  ) : (
                                    <GoPlusCircle />
                                  )}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <button className={`add-btn ${showPopover ? "active" : null}`}>
          <FaPlus />
        </button>
      </OverlayTrigger>
    </>
  );
};

const NotificationPopup = () => {
  const [showPopover, setShowPopover] = useState(false);
  const handlePopoverClose = () => {
    setShowPopover(false);
  };

  const NotificationContent = [
    {
      name: "QU",
      title: "QA User commented on an issu",
      time: "21 hours ago",
      disc: "Test Case Description | Test Steps | Expected Result actual Result Status (Pass/Fail/NA)| |Verify Whether the Respondant is...",
    },
    {
      name: "QU",
      title: "QA User updated an issue",
      time: "1 day ago",
      disc: "The tabs are not redirected to the respective tab after completing an Update import action, please confirm...",
    },
    {
      name: "QU",
      title: "QA User updated an issue",
      time: "1 day ago",
      disc: "Where duplicate leads are being displayed on the Lead screen when updating leads in Import...",
    },
    {
      name: "QU",
      title: "QA User updated an issue",
      time: "1 day ago",
      disc: "Import > When user tries to Import the Leads with Update & Create with error lead data, and download the skipped rows...",
    },
    {
      name: "QA",
      title: "QA User updated an issue",
      time: "1 day ago",
      disc: "Import Customer > to be Skipped tab > While importing the same data which are in  to be updated  tab, Latest updated...",
    },
  ];
  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="auto"
        rootClose
        show={showPopover}
        onToggle={(show) => setShowPopover(show)}
        overlay={
          <Popover className={`arc-popover notification-popover`}>
            <Popover.Body>
              <div className="arc-popover-body">
                <div className="arc-popover-header">
                  <h5>Notifications</h5>
                  <div className="unread-switch">
                    <div className="checkbox-wrapper-64">
                      <label htmlFor="unread-switch" className="unread-text">
                        Only show unread
                      </label>
                      <label className="switch">
                        <input type="checkbox" id="unread-switch" />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                  <ArcToolTip
                    onClick={handlePopoverClose}
                    HoverText="Close"
                    BtnName={<ImCancelCircle />}
                    Placement="left"
                    className="close-btn"
                    as={"span"}
                  />
                </div>
                <div className="arc-popover-main">
                  <div className="notification-list">
                    <div className="notifi-header">
                      <span>Today</span> <button>Mark all as read</button>
                    </div>
                    <ul>
                      {NotificationContent.map((data, index) => (
                        <li key={index}>
                          <span className="name">{data.name}</span>
                          <div className="content">
                            <div className="title-header">
                              <h4>{data.title}</h4>
                              <span className="time">{data.time}</span>
                            </div>
                            <p>{data.disc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <button className={`notify-btn ${showPopover ? "active" : null}`}>
          <IoMdNotificationsOutline />
          <span>2</span>
        </button>
      </OverlayTrigger>
    </>
  );
};
