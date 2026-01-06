// import { lazy, Suspense } from "react";
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { selectAuth } from "@/redux/auth/selectors";
// import { AppContextProvider } from "@/context/appContext";
// import PageLoader from "@/components/PageLoader";
// import AuthRouter from "@/router/AuthRouter";
// import { initializeKeycloak } from "../config/keycloakconfig";
// //sso
// import { SSO_ENABLED } from "@/config/serverApiConfig";
// //sso
// const PlatformApp = lazy(() => import("./PlatformApp"));
// const Localization = lazy(() => import("@/locale/Localization"));

// const DefaultApp = () => (
//   <Localization>
//     <AppContextProvider>
//       <Suspense fallback={<PageLoader />}>
//         <PlatformApp />
//       </Suspense>
//     </AppContextProvider>
//   </Localization>
// );

// export default function PlatformOS() {
//   const { isLoggedIn } = useSelector(selectAuth);
//   console.log(isLoggedIn);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     initializeKeycloak(dispatch);
//   }, [SSO_ENABLED]);
//   console.log("🚀 Welcome to Platform Web T500");

//   console.log(isLoggedIn);

//   //   if (!isLoggedIn)
//   //     return (
//   //       <Localization>
//   //         <AuthRouter />
//   //       </Localization>
//   //     );
//   //   else {
//   //     return <DefaultApp />;
//   //   }
//   if (SSO_ENABLED) {
//     return <DefaultApp />;
//   } else {
//     if (!isLoggedIn)
//       return (
//         <Localization>
//           <AuthRouter />
//         </Localization>
//       );
//     else {
//       return <DefaultApp />;
//     }
//   }
// }

import { lazy, Suspense } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "@/redux/auth/selectors";
import { selectAuthStatus } from "@/redux/auth/selectors";
import { AppContextProvider } from "@/context/appContext";
import PageLoader from "@/components/PageLoader";
import AuthRouter from "@/router/AuthRouter";
import { initializeKeycloak } from "../config/keycloakconfig";
import NotFound from "@/components/NotFound/index";
import NotFoundUnauth from "@/components/NotFound/Indexunauthorized";
//sso
//sso
import { SSO_ENABLED } from "@/config/serverApiConfig";
//sso
const PlatformApp = lazy(() => import("./PlatformApp"));
const Localization = lazy(() => import("@/locale/Localization"));

const DefaultApp = () => (
  <Localization>
    <AppContextProvider>
      <Suspense fallback={<PageLoader />}>
        <PlatformApp />
      </Suspense>
    </AppContextProvider>
  </Localization>
);

export default function PlatformOS() {
  //const { isLoggedIn } = useSelector(selectAuth);
  const { isLoggedIn, isLoading } = useSelector(selectAuth);
  const authStatus = useSelector(selectAuthStatus);
  const auth = useSelector(selectAuth);
  console.log(auth);

  console.log(authStatus);
  console.log("loading", isLoading);

  console.log(isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    initializeKeycloak(dispatch);
  }, [SSO_ENABLED]);
  console.log("🚀 Welcome to Platform Web T500");

  console.log(isLoggedIn);

  if (authStatus === "pending") {
    console.log(authStatus);

    return <PageLoader />; //||authStatus ==='idle' Show a loading indicator
  }

  if (authStatus === "error") {
    return <NotFoundUnauth />; // Show NotFound page for wrong credentials
  }

  if (SSO_ENABLED) {
    if (isLoggedIn && authStatus === "success") return <DefaultApp />;
    else {
      return <></>;
    }
  } else {
    if (!isLoggedIn)
      return (
        <Localization>
          <AuthRouter />
        </Localization>
      );
    else {
      return <DefaultApp />;
    }
  }
}
