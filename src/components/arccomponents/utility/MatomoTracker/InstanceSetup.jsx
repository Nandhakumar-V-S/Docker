import { createInstance } from "@datapunt/matomo-tracker-react";
// Function to get user email ID from local storage
const getUserEmailId = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("Loggedinuseemailid") || null;
  }
  return null;
};
const instance = createInstance({
  urlBase: "https://arcsiteanalytics.archarina.com/",
  siteId: 1000,
  trackerUrl: "https://arcsiteanalytics.archarina.com/matomo.php",
  srcUrl: "https://arcsiteanalytics.archarina.com/matomo.js",
  disabled: false,
  heartBeat: {
    active: true,
    seconds: 10,
  },
  linkTracking: true,
  configurations: {
    disableCookies: true,
    setSecureCookie: true,
    setRequestMethod: "POST",
    setUserId: getUserEmailId(), // Set the user email ID here
  },
});

export default instance;
// Function to update user ID dynamically
instance.updateUserId = () => {
  const emailId = getUserEmailId();
  if (emailId) {
    instance.pushInstruction("setUserId", emailId);
  }
};
