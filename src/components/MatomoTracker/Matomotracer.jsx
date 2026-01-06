export const MatomoTracker = () => {
  const _paq = (window._paq = window._paq || []);
  const u = "//arcsiteanalytics.archarina.com/";

  // Initialize Matomo tracker if it's not already done
  if (_paq.length === 0) {
    _paq.push(["setTrackerUrl", u + "matomo.php"]);
    _paq.push(["setSiteId", "35"]);
    _paq.push(["setUserId", window.localStorage.getItem("Loggedinuseemailid")]);

    const d = document;
    const g = d.createElement("script");
    const s = d.getElementsByTagName("script")[0];

    g.async = true;
    g.src = u + "matomo.js";
    s.parentNode.insertBefore(g, s);
  }
};
