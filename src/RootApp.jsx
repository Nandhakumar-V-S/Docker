import "./style/app.scss";

import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/redux/store";
import PageLoader from "@/components/PageLoader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const PlatformOS = lazy(() => import("./apps/PlatformOS"));
import { CONSOLE_LOG_DISABLED } from "@/config/serverApiConfig";
export default function RoutApp() {
  const env = import.meta.env.VITE_PROD;
  const subdir = "/" + import.meta.env.VITE_SUBDIR_NAME;

  if (CONSOLE_LOG_DISABLED) {
    console.log = function () { };
  }
  console.log("RoutApp");
  console.log(env);
  return (
    <>
      {env === "true" && (
        <BrowserRouter basename={subdir}>
          <Provider store={store}>
            <Suspense fallback={<PageLoader />}>
              <PlatformOS />
            </Suspense>
          </Provider>
        </BrowserRouter>
      )}

      {env === "false" && (
        <BrowserRouter>
          <Provider store={store}>
            <Suspense fallback={<PageLoader />}>
              <PlatformOS />
            </Suspense>
          </Provider>
        </BrowserRouter>
      )}
      <ToastContainer />
    </>
  );
  //return (
  //    <BrowserRouter basename={ env ? "/t500v2": ''}>
  //        <Provider store={store}>
  //            <Suspense fallback={<PageLoader />}>
  //                <PlatformOS />
  //            </Suspense>
  //        </Provider>
  //    </BrowserRouter>
  //);
}
