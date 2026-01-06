//export const API_BASE_URL =
//    import.meta.env.VITE_PROD || import.meta.env.VITE_DEV_REMOTE == 'remote'
//        ? import.meta.env.VITE_BACKEND_SERVER + 'api/'
//        : 'https://localhost:44382/api/';
 
// export const API_BASE_URL =
//     import.meta.env.VITE_PROD === 'true'
//         ? import.meta.env.VITE_BACKEND_SERVER + 'api/'
//         : 'https://localhost:44382/api/';
 
// export const API_BASE_URL = import.meta.env.VITE_BACKEND_SERVER;
//export const API_BASE_URL = "https://uiframework.archarina.com/apiv2/api/";
export const API_BASE_URL = "https://localhost:44365/api/";
 
//export const LOCAL_URL = "http://192.168.5.45:3010"
 
// !-------------------------------------------------! //
 
// ! start
// ! Demo API URL
// export const API_TEST_URL =
//   "https://uiframework.archarina.com/PlannerApiDemo/api/v1";
// ! Dev API URL
// export const API_TEST_URL =
//   "https://uiframework.archarina.com/plannerapi/api/v1";
// ! QA API URL
// export const API_TEST_URL =
//   "https://uiframework.archarina.com/plannerApiqa/api/v1";
 
// !stagging QA API URL
//export const API_TEST_URL =
//  "https://iscgs-qaapi.archarina.com/plannerapi/api/v1";
 
// export const API_TEST_URL =
//   "https://iscgs-stagingapi.archarina.com/PlannerApi/api/v1";
// // ! Local  API URL
// export const API_TEST_URL = "https://localhost:44365/api/v1";
export const API_TEST_URL = "https://arcactivitytracker.archarina.com/activitytracker-API/api/v1";
// ! Plannerv11 Login API URL
// export const API_TEST_URL = "https://iscgsplannerapi.archarina.com/api/v1";
//! PlannerV11 API URL
// export const API_TEST_URL = "https://iscgsplannerapi.archarina.com/api/v1";
// ! end
// !-------------------------------------------------! //
 
// ! start
// ! Demo Login API URL
// export const API_BASE_URLV4 =
//   "https://uiframework.archarina.com/PlannerApiDemo/api/";
// ! Dev Login API URL
// export const API_BASE_URLV4 =
//   "https://uiframework.archarina.com/plannerapi/api/";
// ! QA Login API URL
// export const API_BASE_URLV4 =
//   "https://uiframework.archarina.com/plannerApiQA/api/";
// ! staggingQA Login API URL
//export const API_BASE_URLV4 =
//  "https://iscgs-qaapi.archarina.com/plannerapi/api/";
 
// // ! QA Login API URL
// export const API_BASE_URLV4 =
//   "https://iscgs-stagingapi.archarina.com/PlannerApi/api/";
// ! Local Login API URL
//export const API_BASE_URLV4 = "https://localhost:44365/api/";
// ! Plannerv11 Login API URL
// export const API_BASE_URLV4 = "https://iscgsplannerapi.archarina.com/api/";
export const API_BASE_URLV4 = "https://arcactivitytracker.archarina.com/activitytracker-API/api/";
// ! end
 
// !-------------------------------------------------! //p
 
export const BASE_URL =
  import.meta.env.VITE_PROD || import.meta.env.VITE_DEV_REMOTE
    ? import.meta.env.VITE_BACKEND_SERVER
    : "http://localhost:8888/";
export const DOWNLOAD_BASE_URL =
  import.meta.env.VITE_PROD || import.meta.env.VITE_DEV_REMOTE
    ? import.meta.env.VITE_BACKEND_SERVER + "download/"
    : "http://localhost:8888/download/";
 
export const ACCESS_TOKEN_NAME = "x-auth-token";
// export const SSO_ENABLED = import.meta.env.VITE_SSO_ENABLED;
export const SSO_ENABLED = false;
export const solarsearch = true;
 
export const APPLY_BUTTON_ENABLED = "false";
 
export const CONSOLE_LOG_DISABLED = false;
export const PROTO_ENABLED = false;
//  console.log(
//    '🚀 Welcome to IDURAR ERP CRM! Did you know that we also offer commercial customization services? Contact us at hello@idurarapp.com for more information.'
//  );
 
//DEV_AUTHENTICATE_SOLRrrrrrr
 
// export const AUTHENTICATE_SOLR = {
//   username: "5eb484c0-cdee-4f8c-b81e-f1ee4be9cfa7",
//   password: "Password@123",
// };
 
//QA_AUTHENTICATE_SOLR
export const LOCAL_URL = "http://localhost:3010";
 
export const AUTHENTICATE_SOLR = {
  username: "0fe9eaeb-c971-407d-9034-aabe2ed935c3",
  password: "Password@123",
};