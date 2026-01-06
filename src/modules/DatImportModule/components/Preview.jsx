/* eslint-disable react/prop-types */
/* eslint-disable no-inner-declarations */
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "./DataTable";
import CorrectedRows from "./CorrectedRows";
import {
  GetImportDataById,
  resetstatus,
} from "@/redux/DataImport/getimportdata";
import { API_TEST_URL } from "../../../config/serverApiConfig";
import { HiOutlineDownload } from "react-icons/hi";
import { TbFileImport } from "react-icons/tb";

const Preview = ({
  currentStep,
  sessionData,
  selectedValue,
  setSelectedValue,
  setSessionData,
}) => {
  const dispatch = useDispatch();
  console.log(sessionData);
  const PreviewResponse = useSelector(
    (state) => state.GetImportDataByIdState.response
  );
  const Previewstatus = useSelector(
    (state) => state.GetImportDataByIdState.status
  );
  const PostImportDataStateResponse = useSelector(
    (state) => state.PostImportDataState.response
  );
  // ! Count
  const { CreatedCount, UpdateCount, SkipCount } =
    PreviewResponse?.result?.CountList[0] || [];
  console.log(CreatedCount, UpdateCount, SkipCount);
  // ! Count
  // const ImportDataTable = PreviewResponse?.result?.Table;
  const ImportData = PreviewResponse?.result?.ImportData || [];
  const Importversionid =PostImportDataStateResponse?.importdataversionid || sessionData?.Importversionid;
  const Impotdataid =    PostImportDataStateResponse?.importdataid || sessionData?.Impotdataid;
  console.log(Impotdataid, Importversionid);
  const [key, setKey] = useState(sessionData?.key || "Created");
  const [CorrectedRowsshow, setCorrectedRowsshow] = useState(false);
  const [CorrectedRowfile, setCorrectedRowFile] = useState(null);
  const [AutoUpdate, setAutoUpdate] = useState(true);


  const Autoshift=sessionStorage.getItem('Autotabshift');
  // // ! Auto Update key
  // useEffect(() => {
   

  //   if (Previewstatus === "successful" && Autoshift==="1" ) {
  //     if (PreviewResponse?.result?.ImportData?.length === 0) {
  //       if (key === "Created") {
  //         setKey("Updated");
  //       } else if (key === "Updated") {
  //         setKey("Error");
  //       }
  //     }
  //     //dispatch(resetstatus());
  //     //setAutoUpdate(false)
  //     sessionStorage.setItem('Autotabshift', JSON.stringify(0));
  //   }
  // }, [Previewstatus, PreviewResponse]);
  // // ! Auto Update key

  useEffect(() => {
    const UpdatedState = {
      key: key,
      currentStep: currentStep,
      Importversionid: Importversionid,
      Impotdataid: Impotdataid,
      summarykey: "Created",
    };
    sessionStorage.setItem("dataimport", JSON.stringify(UpdatedState));
  }, [
    dispatch,
    key,
    currentStep,
    Importversionid,
    Impotdataid,
    PreviewResponse,
  ]);
  console.log(sessionData);
  useEffect(() => {
    // Retrieve data from session storage

    const storedData = sessionStorage.getItem("dataimport");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setSessionData(parsedData);
      } catch (error) {
        console.error("Error parsing JSON from session storage:", error);
      }
    }
  }, [dispatch, key, Importversionid, Impotdataid]);
  useEffect(() => {
    const Autoshift=sessionStorage.getItem('Autotabshift');

if(Autoshift==="1")
{
    let keyname="Created";
if(CreatedCount>0){
   keyname="Created";
}else if(UpdateCount>0){
   keyname="Updated";
}
else if(SkipCount>0){
   keyname="Error";
}
if (sessionData) {
  sessionData.summarykey = keyname; // Replace with the new summary key value
  sessionStorage.setItem('dataimport', JSON.stringify(sessionData));
  console.log(keyname);
  sessionStorage.setItem('Autotabshift', JSON.stringify(0));
  setKey(keyname);
}

        //   if (CreatedCount !== 0) {
           
        //     if (sessionData) {
        //       sessionData.summarykey = "Created"; // Replace with the new summary key value
        //       sessionStorage.setItem('dataimport', JSON.stringify(sessionData));
        //       setKey('Created');
        //     } else {
        //       console.error('No data found in session storage with key "dataimport"');
        //     }
        //     console.log('Created');
        //   } else if (UpdateCount !== 0) {
          
        //     if (sessionData) {
        //       sessionData.summarykey = "Updated"; // Replace with the new summary key value
        //       sessionStorage.setItem('dataimport', JSON.stringify(sessionData));
        //       setKey('Updated');
        //     } else {
        //       console.log('No data found in session storage with key "dataimport"');
        //     }
        //     console.log('Updated');
        //   } else if (SkipCount !== 0) {
         
        //     if (sessionData) {
             
        //       sessionData.summarykey = "Error"; // Replace with the new summary key value
        //       sessionStorage.setItem('dataimport', JSON.stringify(sessionData));
        //       setKey('Error');
        //     } else {
        //       console.log('No data found in session storage with key "dataimport"');
        //     }
        //     console.log('Error');
        //   } else {
        //     setKey('Created');
        //     if (sessionData) {
        //       sessionData.summarykey = "Created"; // Replace with the new summary key value
        //       sessionStorage.setItem('dataimport', JSON.stringify(sessionData));
        //     } else {
        //       console.log('No data found in session storage with key "dataimport"');
        //     }
        //   }
        // }
        // sessionStorage.setItem('Autotabshift', JSON.stringify(0));
 }
},
   [PreviewResponse]);
  useEffect(() => {
    if (Importversionid && Impotdataid) {
      const RequestData = {
        Importversionid: Importversionid,
        Impotdataid: Impotdataid,
        start: "0",
        skip: "20",
        type: key,
      };

      dispatch(GetImportDataById(RequestData));
    }
  }, [
    Importversionid,
    Impotdataid,
    dispatch,
    key,
    PostImportDataStateResponse,
  ]);

  const handleDownloadErrorTemplate = async () => {
    const postData = {
      Importversionid: Importversionid,
      Impotdataid: Impotdataid,
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
      <CorrectedRows
        ArcPopupshow={CorrectedRowsshow}
        setArcPopupshow={setCorrectedRowsshow}
        file={CorrectedRowfile}
        setFile={setCorrectedRowFile}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        sessionData={sessionData}
      />
      <section className="preview-section grid-table">
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="inside-widget-tab"
          transition={false}
        >
          <Tab
            eventKey="Created"
            title={
              <>
                <span className="title-span">
                  Total item to be created
                  <span className="count">{CreatedCount || 0}</span>
                </span>
              </>
            }
          >
            <div className="table-div">
              <DataTable GridData={ImportData} />
            </div>
          </Tab>
          <Tab
            eventKey="Updated"
            title={
              <>
                <span className="title-span">
                  Total item to be updated
                  <span className="count">{UpdateCount || 0}</span>
                </span>
              </>
            }
          >
            <div className="table-div">
              <DataTable GridData={ImportData} />
            </div>
          </Tab>
          <Tab
            eventKey="Error"
            title={
              <>
                <span className="title-span">
                  No. of records skipped
                  <span className="count">{SkipCount || 0}</span>
                </span>
              </>
            }
          >
            <div className="table-div">
              <DataTable GridData={ImportData} />
            </div>
          </Tab>
          {SkipCount !== 0 && (
            <Tab
              title={
                <>
                  <span
                    className="title-btn warning"
                    onClick={handleDownloadErrorTemplate}
                  >
                    <HiOutlineDownload /> Download Skipped Rows
                  </span>
                </>
              }
            />
          )}
          <Tab
            title={
              <>
                <span
                  className="title-btn warning"
                  onClick={() => setCorrectedRowsshow(true)}
                >
                  <TbFileImport /> Import Corrected Rows
                </span>
              </>
            }
          />
        </Tabs>
      </section>
    </>
  );
};

export default Preview;
