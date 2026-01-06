import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { selectAppSettings } from "@/redux/settings/selectors";
import { useDispatch, useSelector } from "react-redux";

//import { Layout } from 'antd';

import { useAppContext } from "@/context/appContext";

import Navigation from "@/apps/Navigation/NavigationContainer";
import HeaderContent from "@/apps/Header/HeaderContainer";

import { settingsAction } from "@/redux/settings/actions";
import { translateAction } from "@/redux/translate/actions";

import AppRouter from "@/router/AppRouter";

import useResponsive from "@/hooks/useResponsive";

import storePersist from "@/redux/storePersist";

//Custom
import ThemeSetter from "@/context/themeContext/themeshetter";
import ThemeProvider from "@/context/themeContext/themeprovider";
import { ResizeWidthContext } from "@/context/widthContext/widthContext";
import { ArcGlobalContext } from "@/context/GlobalContext/GlobalContext";
import { SelectedRowContextProvider } from "@/context/SelectedRow/SelectedRowContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import MatomoTracker from "@/components/MatomoTracker/Matomotracer";

// ~ Matomo tracker
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
import instance from "@/components/arccomponents/utility/MatomoTracker/InstanceSetup";
// ~ Matomo tracker
const queryClient = new QueryClient();
export default function PlatformApp() {
  console.log("PlatformApp");

  //const { Content } = Layout;

  const { state: stateApp } = useAppContext();
  const { isNavMenuClose } = stateApp;

  const { isMobile } = useResponsive();

  const dispatch = useDispatch();
  const loggedinusermailid = window.localStorage.getItem("Loggedinuseemailid");
  console.log("loggedinusermailid", loggedinusermailid);

  //useLayoutEffect(() => {
  //    dispatch(settingsAction.list({ entity: 'setting' }));
  //}, []);

  //const defaultLang = useSelector(selectAppSettings);

  const defaultLang = "en_us";

  useEffect(() => {
    const { idurar_app_language } = defaultLang;
    const { loadDefaultLang } = storePersist.get("firstLogin");

    console.log("after firstLogin");

    if (idurar_app_language && !loadDefaultLang) {
      dispatch(translateAction.translate(idurar_app_language));
      window.localStorage.setItem(
        "firstLogin",
        JSON.stringify({ loadDefaultLang: true })
      );
    }
  }, [defaultLang]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ArcGlobalContext>
          <ResizeWidthContext>
            <ThemeProvider>
              <SelectedRowContextProvider>
                {/* <MatomoProvider value={instance}> */}
                {/* <ThemeSetter /> */}
                <HeaderContent />
                <AppRouter />
                {/* </MatomoProvider> */}
              </SelectedRowContextProvider>
            </ThemeProvider>
          </ResizeWidthContext>
        </ArcGlobalContext>
      </QueryClientProvider>
    </>
  );

  //return (
  //    <div>
  //        <div className="isc-app-nav-container">
  //            <header className="p-1 fixed-top  nav-top bg-dark">
  //                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
  //                    <div className="container-fluid">
  //                        <div id="sidebarCollapse" className="navbar-btn">
  //                            <img src="src/UIThemeEngine/image/icon.png" />
  //                        </div>
  //                        <div className="navbar-brand ms-3" href="#">
  //                            <div className="col-md-2 mb-2 mb-md-0">
  //                                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
  //                                    <h4 className="my-1">T500</h4>
  //                                </a>
  //                            </div>
  //                        </div>
  //                        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar" aria-expanded="false">
  //                            <span className="navbar-toggler-icon"></span>
  //                        </button>
  //                        <div className="navbar-collapse collapse" id="mynavbar">
  //                            <Navigation />
  //                        </div>
  //                    </div>
  //                </nav>
  //            </header>
  //        </div>

  //        <div className="container-fluid px-0 isc-app-screen-container">
  //            <main className="col-2 nav-right">
  //                <div className="d-flex flex-column flex-shrink-0 bg-light">

  //                    <nav className="isc-screen-sidebar card py-2 mb-4 ">
  //                        <ul className="nav flex-column" id="nav_accordion">
  //                            <li className="nav-item" id="isc-nav-sec"><a className="nav-link"><i className="fa fa-arrow-left me-1" aria-hidden="true"></i><span className="nav-link-text">Collapse</span> </a></li>
  //                            <hr></hr>
  //                            <li className="nav-item">
  //                                <a className="nav-link" href="#"><i className="fa fa-home me-1"></i><span className="nav-link-text">Home</span></a>
  //                            </li>
  //                            <li className="nav-item has-submenu">
  //                                <a className="nav-link" href="#"><i className="fa fa-pie-chart me-1"></i><span className="nav-link-text">Dashboard </span></a>
  //                                <ul className="submenu collapse">
  //                                    <li><a className="nav-link" href="#">Dashboard 1 </a></li>
  //                                    <li><a className="nav-link" href="#">Dashboard 2 </a></li>
  //                                    <li><a className="nav-link" href="#">Dashboard 3 </a></li>
  //                                </ul>
  //                            </li>
  //                            <li className="nav-item has-submenu">
  //                                <a className="nav-link" href="#"><i className="fa fa-life-ring me-1"></i><span className="nav-link-text">Modules</span></a>
  //                                <ul className="submenu collapse">
  //                                    <li><a className="nav-link" href="#">Forms </a></li>
  //                                    <li><a className="nav-link" href="#">Icon</a></li>
  //                                    <li><a className="nav-link" href="#">Tables </a></li>
  //                                    <li><a className="nav-link" href="#">Chart</a></li>
  //                                </ul>
  //                            </li>
  //                            <li className="nav-item">
  //                                <a className="nav-link" href="#"><i className="fa fa-navicon me-1"></i><span className="nav-link-text">Component</span> </a>
  //                            </li>

  //                        </ul>
  //                    </nav>
  //                </div>
  //            </main>

  //            <AppRouter />
  //        </div>
  //    </div>
  //);

  //return (
  //  <Layout hasSider>
  //    <Navigation />

  //    {isMobile ? (
  //      <Layout style={{ marginLeft: 0 }}>
  //        <HeaderContent />
  //        <Content
  //          style={{
  //            margin: '40px auto 30px',
  //            overflow: 'initial',
  //            width: '100%',
  //            padding: '0 25px',
  //            maxWidth: 'none',
  //          }}
  //        >
  //          <AppRouter />
  //        </Content>
  //      </Layout>
  //    ) : (
  //      <Layout style={{ marginLeft: isNavMenuClose ? 100 : 220 }}>
  //        <HeaderContent />
  //        <Content
  //          style={{
  //            margin: '40px auto 30px',
  //            overflow: 'initial',
  //            width: '100%',
  //            padding: '0 25px',
  //            maxWidth: isNavMenuClose ? 1200 : 1100,
  //          }}
  //        >
  //          <AppRouter />
  //        </Content>
  //      </Layout>
  //    )}
  //  </Layout>
  //);
}
