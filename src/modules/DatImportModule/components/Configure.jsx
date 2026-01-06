/* eslint-disable react/prop-types */
/* eslint-disable no-inner-declarations */
// *******~ Import ~******** //
//? React
import { useState, useEffect } from "react";
//? Assets
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { FileUploader } from "react-drag-drop-files";
import { PageLoaderV1 } from "@/components/PageLoader/index";
//? Components
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { ArcRadioBtnv2 } from "@/components/arccomponents/ui-components/ArcRadioBtn/ArcRadioBtn";

import { PostImportData } from "@/redux/DataImport/PostImportData";
import { API_TEST_URL } from "../../../config/serverApiConfig";
import { PostAdditionalData } from "@/redux/DataImport/Importstagging";
import { entityidInfo } from "@/redux/Notes/selector";
import { entityidInfo as taskentity } from "@/redux/Task/selector";

import {
  ArcSuccess,
  ArcError,
} from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

//? CSS

//? Images
import XLSImg from "@/style/images/office365.png";
//? JSON File

//? Icons

import { MdOutlineCancel } from "react-icons/md";

// *******~ Import ~******** //

const Configure = ({
  currentStep,
  setCurrentStep,
  setImportJsonData,
  file,
  setFile,
  selectedValue,
  setSelectedValue,
  isnewimport,
  setisnewimport,
}) => {
  const PreviousStatus = useSelector(
    (state) => state.PostImportDataState.status
  );
  const [importdatafor, setimportdatafor] = useState("");
  useEffect(() => {
    //sessionStorage.setItem("Fromimportscreen", JSON.stringify(0));
    sessionStorage.setItem("Autotabshift", JSON.stringify(1));
    setimportdatafor(sessionStorage.getItem("dataimportfor"));
  }, []);
  const dispatch = useDispatch();
  //Ashwini Baskar
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const pathname = url.pathname;
  const segments = url.pathname.split("/");
  const basePath = segments[2];
  console.log(basePath, "basepath");
  const prevpath = sessionStorage.getItem("PreviousPath");
  let basePathtrue = prevpath == "/notes" ? true : false;

  //Ashwini Baskar
  //SET Entity
  const noteentityid = useSelector(entityidInfo);
  const taskentityid = useSelector(taskentity);

  const entityid = basePathtrue ? noteentityid : taskentityid;
  const templateId = basePathtrue
    ? "5E7F44E2-7EA5-41A6-969F-CFB76833C18A"
    : "60EDBA4B-77DA-46E5-88E6-48995BE66DD1";

  console.log(entityid, "entityid");

  const PostImportDataLoading = useSelector(
    (state) => state.PostImportDataState.loading
  );
  const PostAdditionalDataStateLoading = useSelector(
    (state) => state.PostAdditionalDataState.loading
  );
  const ValidatedimportdataStateLoading = useSelector(
    (state) => state.ValidatedimportdataState.loading
  );
  const fileTypes = ["XLSX", "XLS"];
  // const [file, setFile] = useState(null);
  const [Error, setError] = useState();
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const handleConvert = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        let json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        // Convert all keys to lowercase and remove spaces
        json = json.map((row) => {
          const newRow = {};
          for (let key in row) {
            const newKey = key.toLowerCase().replace(/\s+/g, "");
            newRow[newKey] = row[key];
          }
          return newRow;
        });

        setImportJsonData(JSON.stringify(json, null, 2));
      };
      reader.readAsBinaryString(file);
      NextBtn();
    }
  };
  // const handleChange = (file) => {
  //   setisnewimport(true);
  //   if (
  //     file &&
  //     (file.type ===
  //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
  //       file.type === "application/vnd.ms-excel")
  //   ) {
  //     setFile(file);
  //     setError(null); // Clear any previous errors
  //   } else {
  //     setError("Invalid file type. Please upload an XLSX or XLS file.");
  //     setFile(null);
  //   }
  // };

  const handleChange = async (file) => {
    setisnewimport(true);

    // Check for empty file
    if (!file || file.size === 0) {
      setError(
        "The uploaded file is empty. Please upload a valid XLSX or XLS file."
      );
      setFile(null);
      return;
    }

    // Check for file type
    if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel"
    ) {
      // Check for file size (10 MB = 10 * 1024 * 1024 bytes)
      console.log(file.size);
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        // Replace alert with your custom error handler
        ArcError({
          Message: "File size exceeds 10 MB. Please upload a smaller file.",
          position: "top-right",
        });
        setFile(null);
        setError(null); // Clear any previous errors
        return;
      }

      // Read the file content
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Get the first worksheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert the sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Check if there are more rows than just the header
        if (jsonData.length > 1) {
          setFile(file);
          setError(null); // Clear any previous errors
        } else {
          ArcError({
            Message: "Empty Excel File cannot be uploaded.",
            position: "top-right",
          });
          setFile(null);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      setError(null); // Clear any previous errors
      setError("Invalid file type. Please upload an XLSX or XLS file.");
      setFile(null);
    }
  };
  const ResetFiles = () => {
    setFile(null);
    setUploadDisabled(false);
  };
  const handleTypeError = (err) => {
    console.log(err);
    setError(err);
  };
  const getTruncatedFileName = (name) => {
    const maxLength = 20;
    if (name.length <= maxLength) {
      return name;
    }
    const start = name.slice(0, 15);
    const end = name.slice(-8);
    return `${start}...${end}`;
  };

  const NextBtn = () => {
    setCurrentStep(currentStep + 1);
    // currentStep === 1 ? setShow(true) : setShow(false);
  };
  //! Radio & Checkbox State
  // const [selectedValue, setSelectedValue] = useState("cr1");
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    setisnewimport(true);
  };

  const handledownloadtempalte = async () => {
    const postData = {
      entityId: entityid,
      templateId: templateId,
    };
    // Before
    //  const postData = {
    //   entityId:entityid, //,
    //   templateId:"5E7F44E2-7EA5-41A6-969F-CFB76833C18A",
    //    };

    try {
      const response = await fetch(
        `${API_TEST_URL}/arcimport/download_template`,
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
      console.log("downloadresponse", blob);
      //Ashwini Baskar

      //Ashwini Baskar
      const currentUrl = window.location.href;
      const urls = new URL(currentUrl);
      const pathname = urls.pathname;
      const segments = urls.pathname.split("/");
      const basePath = segments[2];
      console.log(basePath, "basepath");
      let basePathtrue = prevpath == "/notes" ? true : false;
      let excelfilename = basePathtrue
        ? "NotesImportData.xlsx"
        : "TaskImportData.xlsx";

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", excelfilename);
      document.body.appendChild(link);
      link.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading template:", error);
    }
  };

  const RadioBtnData = [
    {
      Title: `Create New ${importdatafor} Only`,
      Value: "cr1",
    },
    {
      Title: `Update Existing ${importdatafor} Only`,
      Value: "up1",
    },
    {
      Title: `Create and Update ${importdatafor}`,
      Value: "crup1",
    },
  ];
  const handleImportStaging = async (event) => {
    if (file) {
      try {
        const importtype = selectedValue;
        // alert(selectedValue)

        const formData = new FormData();
        formData.append("file", file);
        formData.append("userid", window.sessionStorage.getItem("Globalid"));
        formData.append("templateid", templateId);
        formData.append("importtype", importtype);
        formData.append("entityid", entityid);
        //alert(formData)
        const response = await dispatch(PostImportData(formData));

        if (response.type === "PostImportDataState/PostImportData/fulfilled") {
          console.log(response);
          const additionalData = response.payload;
          const requestdata = {
            userid: window.sessionStorage.getItem("Globalid"),
            insertcorrecteddata: 0,
            ...additionalData,
          };
          if (additionalData && additionalData.importdataid) {
            const additionalResponse = await dispatch(
              PostAdditionalData(requestdata)
            );
            console.log(requestdata);

            if (additionalResponse.payload != null) {
              //const validatedResponse = await dispatch(Validatedimportdata(additionalData));

              //if (validatedResponse.payload != null) {

              NextBtn();

              //}
            }
          } else {
            ArcError({
              Message: "Invalid excel format.",
              position: "top-right",
            });
          }
        }
      } catch (error) {
        console.error("Error during import staging process:", error);
      }
    }
  };
  return (
    <section className="configure-section">
      {PostImportDataLoading ||
      PostAdditionalDataStateLoading ||
      ValidatedimportdataStateLoading ? (
        <PageLoaderV1 Text="validating data..." className="" />
      ) : null}
      {/* <PageLoaderV1 Text="validating data..." className=""/>  */}

      {/* <h3 className="title">Upload Your File </h3> */}

      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        classes={`drop-label ${Error && "invalid-file"}`}
        onTypeError={handleTypeError}
        // maxSize={10}
        disabled={uploadDisabled}
      >
        <div className="upload-box">
          <img className="xls-img" src={XLSImg} alt="" />
          <div className="upload-btn-div">
            <button className={`upload-btn ${file && "is-file"}`}>
              {" "}
              {file ? getTruncatedFileName(file.name) : "Upload File"}{" "}
            </button>{" "}
            {file ? (
              <ArcToolTip
                className="reset-btn"
                HoverText="Clear"
                BtnName={<MdOutlineCancel />}
                Placement="right"
                onClick={ResetFiles}
                onMouseEnter={() => setUploadDisabled(true)}
                onMouseLeave={() => setUploadDisabled(false)}
                as="span"
              />
            ) : null}
          </div>

          <span className="drop-here">or drag and drop it here</span>
          <p className="formats">
            (Supported formats .csv, .xlsx; max file size 10 MB)
          </p>
          <p
            className="download-"
            onMouseEnter={() => setUploadDisabled(true)}
            onMouseLeave={() => setUploadDisabled(false)}
          >
            Download a{" "}
            <button onClick={handledownloadtempalte} className="download-btn">
              Sample CSV
            </button>
          </p>
          {Error && <span className="error-format">{Error}</span>}
        </div>
      </FileUploader>
      <p className="note">
        {" "}
        Note: Choose Your Import Type Preference. (Validation Will be Based on
        the Title Column Name)
      </p>
      <ArcRadioBtnv2
        Required={true}
        Name="account-type"
        RadioBtnData={RadioBtnData}
        ClassName=""
        onChange={handleRadioChange}
        selectedValue={selectedValue}
      />

      {/* <i>
        {selectedValue}
      
      </i> */}
      {/* {file ? (
          <button className="validate" onClick={handleConvert}>
            Validate
          </button>
        ) : null} */}
      {file && isnewimport ? (
        <button className="validate" onClick={handleImportStaging}>
          Validate
        </button>
      ) : null}
      {file && !isnewimport ? (
        <button className="validate" onClick={NextBtn}>
          Resume Import
        </button>
      ) : null}
    </section>
  );
};

export default Configure;
