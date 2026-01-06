// import Keycloak from "keycloak-js";
// import { login } from "@/redux/auth/actions";
// import { SSO_ENABLED } from "@/config/serverApiConfig";
// import { API_BASE_URLV4 } from "@/config/serverApiConfig";

// // import { useNavigate } from "react-router-dom";
// const url = import.meta.env.VITE_KEYCLOAK_URL;
// const realm = import.meta.env.VITE_KEYCLOAK_REALM;
// const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;

// const config = {
//   url,
//   realm,
//   clientId,
// };

// const keycloak = new Keycloak(config);
// let settings = "";

// const initializeKeycloak = (dispatch) => {
//   if (SSO_ENABLED) {
//     // const navigate = useNavigate();
//     keycloak
//       .init({ onLoad: "login-required", checkLoginIframe: false })
//       .then(async (authenticated) => {
//         console.log("User authenticated:", authenticated);
//         console.log(keycloak.tokenParsed.preferred_username);
//         const credentials = { email: keycloak.tokenParsed.email, password: "" };

//         try {
//           window.localStorage.setItem(
//             "Loggedinuseemailid",
//             keycloak.tokenParsed.email
//           );
//           const response = await fetch(
//             API_BASE_URLV4 + "v1/identity/tokens/ssotoken",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(credentials),
//             }
//           );

//           if (!response.ok) {
//             throw new Error("Network response was not ok");
//           }

//           const data = await response.json();
//           console.log(data.data);
//           if (data.data) {
//             const Result = data.data;
//             const tokenString = Result?.token;
//             const parts = Result?.token.split(".");
//             const encodedPayload = parts[1];
//             const decodedPayload = JSON.parse(atob(encodedPayload));
//             const auth_state = JSON.stringify({
//               current: decodedPayload,
//               isLoggedIn: true,
//               isLoading: false,
//               isSuccess: true,
//             });

//             settings =
//               '{"quote_settings":{"quote_show_product_tax":false,"quote_status":["draft","pendding","sent","negotiation","accepted","declined","cancelled"],"quote_pdf_footer":"Quote was created on a computer and is valid without the signature and seal","quote_load_default_client":false},"offer_settings":{"offer_show_product_tax":false,"offer_status":["draft","pendding","sent","negotiation","accepted","declined","cancelled"],"offer_load_default_client":false,"offer_pdf_footer":"Offer was created on a computer and is valid without the signature and seal"},"money_format_settings":{"currency":"usd","currency_position":"before","decimal_sep":".","thousand_sep":",","zero_format":false,"currency_symbol":"$","cent_precision":2},"lead_settings":{"lead_source":["self checking","sales lead","recomendation","facebook","instagram","tiktok","youtube","blog","linkedin","newsletter","website","twitter"],"offer_default_lead_type":"company","lead_type":["person","company"],"lead_status":["draft","new","reached","waiting","in negosation","won","loose"],"lead_category":["Corporate","person","startup","small company","services business","retails","cafe & restaurant"]},"invoice_settings":{"invoice_load_default_client":false,"invoice_pdf_footer":"Invoice was created on a computer and is valid without the signature and seal","invoice_status":["draft","pending","sent","received","refund","cancelled","on hold"],"invoice_show_product_tax":false},"finance_settings":{"last_payment_number":1,"quote_prefix":"qot-","last_quote_number":27,"offer_prefix":"ofr-","last_invoice_number":114,"last_offer_number":20,"invoice_prefix":"inv-","payment_prefix":"pym-","current_invoice_year":2023,"current_quote_year":2023,"current_offer_year":2023},"company_settings":{"company_has_mutli_branch":false,"company_logo":"public/uploads/setting/idurar-app-large-s5vg9.png","company_website":"www.idurarapp.com","company_tax_number":"91231255234","company_name":"IDURAR","company_state":"Oran","company_reg_number":"00001231421","company_icon":"https://www.idurarapp.com/Theme/idurar-no-code-app/assets/img/idurar-ai-no-code-app-logo.svg","company_address":"25 , Rue de G","company_country":"Algeria","company_vat_number":"91231255234","company_email":"support@idurarapp123.com","company_phone":"+1 345234654","company_cell":"+1 345234654"},"client_settings":{"client_type":["people","company"],"client_category":["Corporate","startup","small company","services business","retails","cafe & restaurant"],"quote_default_client_type":"company","pos_default_client_type":"people","client_status":["active","new","premium","unactive"],"client_source":["self checking","sales lead","recomendation","facebook","instagram","tiktok","youtube","blog","linkedin","newsletter","website","twitter"],"invoice_default_client_type":"company","pos_default_client":"609e0057246f2359b0c4c31f"},"app_settings":{"idurar_server_url":"https://erp-crm.idurarapp.com/","idurar_base_url":"https://demo-erp-crm.idurarapp.com/","idurar_app_logo":"https://www.idurarapp.com/Theme/idurar-no-code-app/assets/img/idurar-ai-no-code-app-logo.svg","idurar_app_v":false,"idurar_app_language":"en_us","idurar_app_name":"IDURAR ERP/CRM","idurar_app_email":"noreply123@idurarappp.com","idurar_app_icon":"https://www.idurarapp.com/Theme/idurar-no-code-app/assets/img/idurar-ai-no-code-app-logo.svg","idurar_app_t":"free_trial","idurar_registration_allowed":true,"idurar_app_d":"","idurar_app_date_format":"DD/MM/YYYY"},"email_settings":{"email_reply_to":"reply@idurarapp.com","email_domain":"idurarapp.com","email_from":"IDURAR ERP CRM"}}\r\n';
//             console.log(auth_state);
//             window.localStorage.setItem("auth", auth_state);
//             window.localStorage.setItem(
//               "token",
//               JSON.stringify({ tokenString })
//             );
//             window.localStorage.setItem("settings", settings);
//             window.localStorage.removeItem("isLogout");
//             dispatch(login({ loginData: true }));
//           } else {
//             keycloak.logout();
//             // navigate("/401")
//             // not validated show error message
//           }
//         } catch (error) {
//           keycloak.logout();
//           // navigate("/401");
//           console.error("Error:", error);
//         }
//       })
//       .catch((error) => {
//         keycloak.logout();
//         //navigate("/401");
//         console.error("Keycloak initialization error:", error);
//       });
//   }
// };

// export { keycloak, initializeKeycloak };

import Keycloak from "keycloak-js";
import { login } from "@/redux/auth/actions";
import { SSO_ENABLED } from "@/config/serverApiConfig";
import { API_BASE_URLV4 } from "@/config/serverApiConfig";
import { AuditlogDetails } from "@/redux/AuditLog/Auditlogdetails";
import { GetIPDetails } from "@/redux/AuditLog/ipaddress";

// import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_KEYCLOAK_URL;
const realm = import.meta.env.VITE_KEYCLOAK_REALM;
const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;

const config = {
  url,
  realm,
  clientId,
};

const keycloak = new Keycloak(config);
let settings = "";
const getAccountCreationUrl = () => {
  return keycloak.createAccountUrl();
};
const getReferrerUri = (queryString) => {
  const params = new URLSearchParams(queryString);
  return params.get("referrer_uri");
};

const initializeKeycloak = (dispatch) => {
  if (SSO_ENABLED) {
    // const navigate = useNavigate();
    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then(async (authenticated) => {
        console.log("User authenticated:", authenticated);
        console.log(keycloak.tokenParsed.preferred_username);
        const credentials = { email: keycloak.tokenParsed.email, password: "" };

        var islogintrue = sessionStorage.getItem("user_id");
        if (islogintrue) {
        } else {
          sessionStorage.setItem("auditlogemail", "");
        }
        try {
          window.localStorage.setItem(
            "Loggedinuseemailid",
            keycloak.tokenParsed.email
          );
          const response = await fetch(
            API_BASE_URLV4 + "v1/identity/tokens/ssotoken",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          console.log(data.data);
          if (data.data) {
            const Result = data.data;
            const tokenString = Result?.token;
            const parts = Result?.token.split(".");
            const encodedPayload = parts[1];
            const decodedPayload = JSON.parse(atob(encodedPayload));
            const auth_state = JSON.stringify({
              current: decodedPayload,
              isLoggedIn: true,
              isLoading: false,
              isSuccess: true,
            });
            const userid = decodedPayload.userid;
            settings =
              '{"quote_settings":{"quote_show_product_tax":false,"quote_status":["draft","pendding","sent","negotiation","accepted","declined","cancelled"],"quote_pdf_footer":"Quote was created on a computer and is valid without the signature and seal","quote_load_default_client":false},"offer_settings":{"offer_show_product_tax":false,"offer_status":["draft","pendding","sent","negotiation","accepted","declined","cancelled"],"offer_load_default_client":false,"offer_pdf_footer":"Offer was created on a computer and is valid without the signature and seal"},"money_format_settings":{"currency":"usd","currency_position":"before","decimal_sep":".","thousand_sep":",","zero_format":false,"currency_symbol":"$","cent_precision":2},"lead_settings":{"lead_source":["self checking","sales lead","recomendation","facebook","instagram","tiktok","youtube","blog","linkedin","newsletter","website","twitter"],"offer_default_lead_type":"company","lead_type":["person","company"],"lead_status":["draft","new","reached","waiting","in negosation","won","loose"],"lead_category":["Corporate","person","startup","small company","services business","retails","cafe & restaurant"]},"invoice_settings":{"invoice_load_default_client":false,"invoice_pdf_footer":"Invoice was created on a computer and is valid without the signature and seal","invoice_status":["draft","pending","sent","received","refund","cancelled","on hold"],"invoice_show_product_tax":false},"finance_settings":{"last_payment_number":1,"quote_prefix":"qot-","last_quote_number":27,"offer_prefix":"ofr-","last_invoice_number":114,"last_offer_number":20,"invoice_prefix":"inv-","payment_prefix":"pym-","current_invoice_year":2023,"current_quote_year":2023,"current_offer_year":2023},"company_settings":{"company_has_mutli_branch":false,"company_logo":"public/uploads/setting/idurar-app-large-s5vg9.png","company_website":"www.idurarapp.com","company_tax_number":"91231255234","company_name":"IDURAR","company_state":"Oran","company_reg_number":"00001231421","company_icon":"https://www.idurarapp.com/Theme/idurar-no-code-app/assets/img/idurar-ai-no-code-app-logo.svg","company_address":"25 , Rue de G","company_country":"Algeria","company_vat_number":"91231255234","company_email":"support@idurarapp123.com","company_phone":"+1 345234654","company_cell":"+1 345234654"},"client_settings":{"client_type":["people","company"],"client_category":["Corporate","startup","small company","services business","retails","cafe & restaurant"],"quote_default_client_type":"company","pos_default_client_type":"people","client_status":["active","new","premium","unactive"],"client_source":["self checking","sales lead","recomendation","facebook","instagram","tiktok","youtube","blog","linkedin","newsletter","website","twitter"],"invoice_default_client_type":"company","pos_default_client":"609e0057246f2359b0c4c31f"},"app_settings":{"idurar_server_url":"https://erp-crm.idurarapp.com/","idurar_base_url":"https://demo-erp-crm.idurarapp.com/","idurar_app_logo":"https://www.idurarapp.com/Theme/idurar-no-code-app/assets/img/idurar-ai-no-code-app-logo.svg","idurar_app_v":false,"idurar_app_language":"en_us","idurar_app_name":"IDURAR ERP/CRM","idurar_app_email":"noreply123@idurarappp.com","idurar_app_icon":"https://www.idurarapp.com/Theme/idurar-no-code-app/assets/img/idurar-ai-no-code-app-logo.svg","idurar_app_t":"free_trial","idurar_registration_allowed":true,"idurar_app_d":"","idurar_app_date_format":"DD/MM/YYYY"},"email_settings":{"email_reply_to":"reply@idurarapp.com","email_domain":"idurarapp.com","email_from":"IDURAR ERP CRM"}}\r\n';
            console.log(auth_state);
            window.localStorage.setItem("auth", auth_state);
            window.localStorage.setItem(
              "token",
              JSON.stringify({ tokenString })
            );
            window.localStorage.setItem("settings", settings);
            window.localStorage.removeItem("isLogout");
            dispatch(login({ loginData: true }));
            // DynamicconfigURL="admin";
            // dispatch(GetUserRoles({ DynamicconfigURL, userid }));
            // sessionStorage.setItem("tenantidentifier", DynamicconfigURL);
            sessionStorage.setItem("user_id", userid);
            sessionStorage.setItem("email", keycloak.tokenParsed.email);

            const resetauditlog = sessionStorage.getItem("auditlogemail");

            // dispatch(DynamicMenuBind());
            const ipaddress = sessionStorage.getItem("ipAddress");
            if (ipaddress) {
            } else {
              dispatch(GetIPDetails());
            }

            if (resetauditlog === "" && ipaddress) {
              const obj = {
                emailID: keycloak.tokenParsed.email,
                tenantappid: "00000000-0000-0000-0000-000000000000",
                tenant: "00000000-0000-0000-0000-000000000000",
                loginType: "Login",
                loginStatus: "Success",
                ip: sessionStorage.getItem("ipAddress"),
                URL: window.location.href,
                Globalid: sessionStorage.getItem("Globalid"),
              };
              dispatch(AuditlogDetails(obj));
              sessionStorage.setItem(
                "auditlogemail",
                keycloak.tokenParsed.email
              );
              // if (DynamicconfigURL === "admin") {
              //   sessionStorage.setItem("GlobalUserRole", "SUPERADMIN");
              // } else {
              //   sessionStorage.setItem("GlobalUserRole", "TENANTADMIN");
              // }
            }
          } else {
            const obj = {
              emailID: keycloak.tokenParsed.email,
              tenantappid: "00000000-0000-0000-0000-000000000000",
              tenant: "00000000-0000-0000-0000-000000000000",
              loginType: "Login",
              loginStatus: "Unauthorized",
              ip: sessionStorage.getItem("ipAddress"),
            };
            dispatch(AuditlogDetails(obj));

            dispatch(login({ loginData: false }));
            keycloak.logout();
            // navigate("/401")
            // not validated show error message
          }
        } catch (error) {
          // keycloak.logout();
          // navigate("/401");
          const obj = {
            emailID: keycloak.tokenParsed.email,
            tenantappid: "00000000-0000-0000-0000-000000000000",
            tenant: "00000000-0000-0000-0000-000000000000",
            loginType: "Login",
            loginStatus: "Unauthorized",
            ip: sessionStorage.getItem("ipAddress"),
          };

          dispatch(AuditlogDetails(obj));
          dispatch(login({ loginData: false }));
          console.error("Error:", error);
        }
      })
      .catch((error) => {
        keycloak.logout();
        //navigate("/401");
        console.error("Keycloak initialization error:", error);
      });
  }
};

export { keycloak, initializeKeycloak };
