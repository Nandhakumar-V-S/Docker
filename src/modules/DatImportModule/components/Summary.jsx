/* eslint-disable react/prop-types */
/* eslint-disable no-inner-declarations */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//? Assets
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
//? Components
import { Player } from "@lottiefiles/react-lottie-player";
import SummaryAnimation from "@/style/images/importanimation.json";
import DataTable from "./DataTable";
import { GetImportDataById } from "@/redux/DataImport/getimportdata";
//import { Importdatatotbl } from "@/redux/DataImport/Importdatatotbl";
//? Icons
import { RiRefreshLine } from "react-icons/ri";
import { AiOutlineFileDone } from "react-icons/ai";
import { HiOutlineDownload } from "react-icons/hi";
import { API_TEST_URL } from "../../../config/serverApiConfig";
import Importstartalert from "./Importstartalert";
import { ArcButtonWithIcon } from "@/components/arccomponents/ui-components/ArcButtons/ArcButtons";

// *******~ Import ~******** //

const Summary = ({
  sessionData,
  setSessionData,
  showImportAlert,
  setShowImportAlert,
}) => {
  const dispatch = useDispatch();
  const PreviewResponse = useSelector(
    (state) => state.GetImportDataByIdState.response
  );

  const [summarykey, setsummarykey] = useState(
    sessionData?.summarykey || "Created"
  );
  const [showSummaryData, setshowSummaryData] = useState(false);
  const [refreshclicked, setrefreshclicked] = useState(false);
  console.log(refreshclicked);
  // ! Count
  const { CreatedCount, UpdateCount, SkipCount } =
    PreviewResponse?.result?.CountList[0] || [];
  const CountListStatus = PreviewResponse?.result?.CountList[0]?.status || [];
  console.log(CreatedCount, UpdateCount, SkipCount);
  // ! Count
  const ImportData = PreviewResponse?.result?.ImportData || [];
  const Importversionid = sessionData?.Importversionid;
  const Impotdataid = sessionData?.Impotdataid;
  let Fromimportscreen = sessionStorage.getItem("Fromimportscreen");

  useEffect(() => {
    if (Fromimportscreen == "1") {
      console.log("setshowSummaryData");
      setshowSummaryData(true);
    }
    if (CreatedCount !== 0) {
      setsummarykey("Created");
      if (sessionData) {
        sessionData.summarykey = "Created"; // Replace with the new summary key value
        //sessionStorage.setItem('dataimport', JSON.stringify(sessionData));
      } else {
        console.error('No data found in session storage with key "dataimport"');
      }
      console.log("Created");
    } else if (UpdateCount !== 0) {
      setsummarykey("Updated");
      if (sessionData) {
        sessionData.summarykey = "Updated"; // Replace with the new summary key value
        //sessionStorage.setItem('dataimport', JSON.stringify(sessionData));
      } else {
        console.log('No data found in session storage with key "dataimport"');
      }
      console.log("Updated");
    } else if (SkipCount !== 0) {
      setsummarykey("Error");
      if (sessionData) {
        sessionData.summarykey = "Error"; // Replace with the new summary key value
        //sessionStorage.setItem('dataimport', JSON.stringify(sessionData));
      } else {
        console.log('No data found in session storage with key "dataimport"');
      }
      console.log("Error");
    } else {
      setsummarykey("Created");
      if (sessionData) {
        sessionData.summarykey = "Created"; // Replace with the new summary key value
        //sessionStorage.setItem('dataimport', JSON.stringify(sessionData));
      } else {
        console.log('No data found in session storage with key "dataimport"');
      }
    }
  }, []);

  console.log(Impotdataid, Importversionid);
  // * GetImportDataById
  useEffect(() => {
    if (Importversionid && Impotdataid) {
      console.log("refreshclicked");

      const RequestData = {
        Importversionid: Importversionid,
        Impotdataid: Impotdataid,
        start: "0",
        skip: "20",
        type: summarykey,
      };

      dispatch(GetImportDataById(RequestData));
    }

    // This function is a cleanup function
    return () => {
      // setrefreshclicked(false);
    };
  }, [summarykey, showImportAlert, refreshclicked]);

  // ! Update Summary key Start
  useEffect(() => {
    // Update session storage whenever key changes
    if (sessionData) {
      const updatedData = { ...sessionData, summarykey };
      sessionStorage.setItem("dataimport", JSON.stringify(updatedData));
      setSessionData(updatedData);
    }
  }, [summarykey]);

  // ! Update Summary key End
  // const handleSummaryData = () => {
  //   if () {
  //     setshowSummaryData(true);
  //   } else {
  //     setshowSummaryData(false);
  //   }
  // };
  // *handleDownloadErrorTemplate start
  const handleDownloadErrorTemplate = async () => {
    let dataimpotdtls = JSON.parse(sessionStorage.getItem("dataimport"));
    const savedImportversionid = dataimpotdtls.Importversionid;
    const savedImpotdataid = dataimpotdtls.Impotdataid;

    const postData = {
      Importversionid: savedImportversionid,
      Impotdataid: savedImpotdataid,
      start: "0",
      skip: "20",
      type: "",
    };

    try {
      const response = await fetch(
        `${API_TEST_URL}/arcimport/downloaderrortemplate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "TaskImportData.xlsx");
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading template:", error);
    }
  };

  return (
    <>
      {/* {Fromimportscreen !== "1" && ( */}
      <Importstartalert
        showImportAlert={showImportAlert}
        setShowImportAlert={setShowImportAlert}
      />
      {/* )} */}
      <section className="summary-section grid-table">
        {showSummaryData && (
          <>
            {19000510660 === CountListStatus ? (
              <p className="import-message import-success">
                <AiOutlineFileDone />
                Data Imported Successfully.
              </p>
            ) : 19000510663 === CountListStatus ? (
              <p className="import-message import-faild">
                <AiOutlineFileDone />
                Data Import Failed.
              </p>
            ) : null}
          </>
        )}

        {showSummaryData &&
        [19000510660, 19000510663].includes(CountListStatus) ? (
          <Tabs
            activeKey={summarykey}
            onSelect={(k) => setsummarykey(k)}
            className="inside-widget-tab"
            transition={false}
          >
            <Tab
              eventKey="Created"
              title={
                <>
                  <span className="title-span">
                    Total items created
                    <span className="count">{CreatedCount}</span>
                  </span>
                </>
              }
            >
              <div className="table-div">
                <DataTable
                  GridData={summarykey === "Created" ? ImportData : []}
                />
              </div>
            </Tab>
            <Tab
              eventKey="Updated"
              title={
                <>
                  <span className="title-span">
                    Total items updated
                    <span className="count">{UpdateCount}</span>
                  </span>
                </>
              }
            >
              <div className="table-div">
                <DataTable
                  GridData={summarykey === "Updated" ? ImportData : []}
                />
              </div>
            </Tab>
            <Tab
              eventKey="Error"
              title={
                <>
                  <span className="title-span">
                    No. of errors
                    <span className="count">{SkipCount}</span>
                  </span>
                </>
              }
            >
              <div className="table-div">
                <DataTable
                  GridData={summarykey === "Error" ? ImportData : []}
                />
              </div>
            </Tab>
            {SkipCount !== 0 && (
              <Tab
                title={
                  <>
                    <span
                      className="title-btn error"
                      onClick={handleDownloadErrorTemplate}
                    >
                      <HiOutlineDownload /> Download Errors
                    </span>
                  </>
                }
              />
            )}
          </Tabs>
        ) : (
          <React.Fragment>
            <SummaryLoading
              setshowSummaryData={setshowSummaryData}
              setrefreshclicked={setrefreshclicked}
            />
          </React.Fragment>
        )}
      </section>
    </>
  );
};

const SummaryLoading = ({ setshowSummaryData, setrefreshclicked }) => {
  return (
    <React.Fragment>
      <div className="summary-loading-section">
        <p className="import-message import-warning">Data import in Progress</p>
        <div className="lottie-animation">
          <Player autoplay loop src={SummaryAnimation}></Player>
        </div>

        <ArcButtonWithIcon
          ClassName=""
          BtnText="Refresh"
          OnClick={() => {
            setrefreshclicked((prev) => !prev);
            setshowSummaryData(true);
          }}
          Icon={
            <>
              <RiRefreshLine />
            </>
          }
        />
      </div>
    </React.Fragment>
  );
};
export default Summary;
