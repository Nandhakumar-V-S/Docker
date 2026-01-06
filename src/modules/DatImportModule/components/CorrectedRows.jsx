/* eslint-disable react/prop-types */
/* eslint-disable no-inner-declarations */
// *******~ Import ~******** //
//? React
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//? Assets
import * as XLSX from "xlsx";
import { FileUploader } from "react-drag-drop-files";
import Modal from "react-bootstrap/Modal";
import { GetImportDataById } from "@/redux/DataImport/getimportdata";
import { PostAdditionalData } from "@/redux/DataImport/Importstagging";
import { PageLoaderV1 } from "@/components/PageLoader/index";
//? Components
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { PostCorrectedRows } from "@/redux/DataImport/uploadCorrectedRows";
//? CSS

//? Images
import XLSImg from "@/style/images/office365.png";
//? JSON File

//? Icons
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import {
  ArcSuccess,
  ArcError,
} from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

// *******~ Import ~******** //

export default function CorrectedRows({
  ArcPopupshow,
  setArcPopupshow,
  file,
  setFile,
  selectedValue,
  sessionData,
}) {
  //   const [ArcPopupshow, setArcPopupshow] = useState(false);
  const dispatch = useDispatch();
  const errordataresponse = useSelector((state) => state.GetImportDataByIdState.response);
  // const handleArcPopupShow = () => setArcPopupshow(true);
  const PostCorrectedRowsLoading = useSelector(
    (state) => state.PostCorrectedRowsState.loading
  );
  const PostAdditionalDataStateLoading = useSelector(
    (state) => state.PostAdditionalDataState.loading
  );
  const ValidatedimportdataStateLoading = useSelector(
    (state) => state.ValidatedimportdataState.loading
  );
  const handleArcPopupClose = () => {
    setArcPopupshow(false);
    setFile(null);
    setError(null);
  };
  const fileTypes = ["XLSX", "XLS"];
  // const [file, setFile] = useState(null);
  const [ImportJsonData, setImportJsonData] = useState();
  const [Error, setError] = useState();
  const [uploadDisabled, setUploadDisabled] = useState(false);
  console.log(sessionData);
  const Importversionid = sessionData?.Importversionid;
  const Impotdataid = sessionData?.Impotdataid;
  const key = sessionData?.key;
  console.log(Impotdataid, Importversionid);
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
    }
  };
  console.log(ImportJsonData);
  const handleChange = (file) => {
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel")
    ) {
      setFile(file);
      setError(null); // Clear any previous errors
    } else {
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
  // ! API Call
  const handleImportStaging = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userid", window.sessionStorage.getItem("Globalid"));
      formData.append("templateid", "60edba4b-77da-46e5-88e6-48995be66dd1");
      formData.append("importtype", selectedValue);
      formData.append("importdataid", Impotdataid);
      formData.append("importversionid", Importversionid);

      const response = await dispatch(PostCorrectedRows(formData));

      if (
        response.type === "PostCorrectedRowsState/PostCorrectedRows/fulfilled"
      ) {
        const additionalData = response.payload;
        if (additionalData?.importdataid) {
          const requestdata = {
            userid: window.sessionStorage.getItem("Globalid"),
            insertcorrecteddata: 1,
            ...additionalData,
          };
          if (additionalData && additionalData.importdataid) {
          const PostAdditional = await dispatch(
            PostAdditionalData(requestdata)
          );
          console.log(PostAdditional.payload);
          if (
            PostAdditional.type ===
            "PostImportDataState/PostAdditionalData/fulfilled"
          ) {
            const RequestData = {
              Importversionid: Importversionid,
              Impotdataid: Impotdataid,
              start: "0",
              skip: "20",
              type: key,
            };
            const GetImportData = await dispatch(
              GetImportDataById(RequestData)
            );
            if (
              GetImportData.type ===
              "GetImportDataByIdState/GetImportDataById/fulfilled"
            ) {
              setArcPopupshow(false);
              setFile(null);
            }
          }
        }

        else{

          ArcError({
            Message: "Invalid excel format.",
            position: "top-right",
          });

        }
        }
        else{

          ArcError({
            Message: "Invalid excel format.",
            position: "top-right",
          });

        }
      }
    } catch (error) {
      console.error("Error during import staging process:", error);
    }
  };
  // ! API Call

  return (
    <>
      <Modal
        show={ArcPopupshow}
        onHide={handleArcPopupClose}
        className={`arc-popup-default corrected-rows-upload`}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="popup-body-content">
            {PostCorrectedRowsLoading ||
            PostAdditionalDataStateLoading ||
            ValidatedimportdataStateLoading ? (
              <PageLoaderV1 Text="validating data..." className="" />
            ) : null}
            {/* <PageLoaderV1 Text="validating data..." className="" /> */}
            <div className="popup-header">
              <h3>Import Corrected Rows</h3>
              <ArcToolTip
                className="close-btn"
                HoverText="Close"
                BtnName={<MdOutlineCancel />}
                Placement="left"
                onClick={handleArcPopupClose}
                as="span"
              />
            </div>
            <div className="popup-main">
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                classes={`drop-label ${Error && "invalid-file"}`}
                onTypeError={handleTypeError}
                maxSize={10}
                disabled={uploadDisabled}
              >
                <div className="upload-box">
                  <img className="xls-img" src={XLSImg} alt="" />
                  <div className="upload-btn-div">
                    <button className={`upload-btn ${file && "is-file"}`}>
                      {" "}
                      {file
                        ? getTruncatedFileName(file.name)
                        : "Upload File"}{" "}
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
                  {/* <p
                    className="download-"
                    onMouseEnter={() => setUploadDisabled(true)}
                    onMouseLeave={() => setUploadDisabled(false)}
                  >
                    Download a{" "}
                    <button className="download-btn">Sample CSV</button>
                  </p> */}
                  {Error && <span className="error-format">{Error}</span>}
                </div>
              </FileUploader>
              <p className="info">
                <BsInfoCircle /> Download a sample file and compare it to your
                import file to ensure you have the file perfect for the import.
              </p>
            </div>
            <div className="popup-footer">
              <button disabled={!file} onClick={handleImportStaging}>
                Validate
              </button>
              <button className="cancel" onClick={handleArcPopupClose}>
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
