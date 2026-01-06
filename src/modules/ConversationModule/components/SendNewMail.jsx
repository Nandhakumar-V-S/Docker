/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets
import Offcanvas from "react-bootstrap/Offcanvas";
import Editor from "react-simple-wysiwyg";
import { FileUploader } from "react-drag-drop-files";
//? Components
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import ArcTextarea from "@/components/arccomponents/ui-components/ArcTextarea/ArcTextarea";
import ArcSingleSelect from "@/components/arccomponents/ui-components/ArcSingleSelect/ArcSingleSelect";
//? CSS

//? Images

//? JSON File

//? Icons
import { GrAttachment } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { IoDocumentAttachOutline } from "react-icons/io5";
import ArcEmailEditor from "./EmailEditor";
import InsertFields from "./InsertFields";
import Usetemplate from "./UseTemplate";
// *******~ Import ~******** //

export default function SendNewMail({
  ArcOffCanvaShow,
  setArcOffCanvaShow,
  buttonVisible,
  footerBtnName,
}) {
  // const [ArcOffCanvaShow, setArcOffCanvaShow] = useState(false);
  const handleArcOffCanvaClose = () => setArcOffCanvaShow(false);
  const handleArcOffCanva2Show = () => setArcOffCanvaShow(true);
  const [FileAttachshow, setFileAttachshow] = useState(false);

  return (
    <>
      {buttonVisible && (
        <button className="add-contact-btn" onClick={handleArcOffCanva2Show}>
          Send New Mail
        </button>
      )}

      <Offcanvas
        show={ArcOffCanvaShow}
        onHide={handleArcOffCanvaClose}
        className={`arc-off-canva-default create-mail-template send-new-mail`}
        placement={"end"}
        backdrop="static"
        enforceFocus={false}
      >
        <Offcanvas.Body>
          <div className="off-canva-body-content">
            <div className="off-canva-header">
              <h3>Quick Recap of Our Meeting and Next Steps</h3>

              <ArcToolTip
                className="close-btn"
                HoverText="Close"
                BtnName={<MdOutlineCancel />}
                Placement="left"
                onClick={handleArcOffCanvaClose}
                as="span"
              />
            </div>
            <div className="off-canva-main">
              {/* <h4>Create Template</h4> */}
              <NewMailInput />
            </div>
            <div className="off-canva-footer">
              <AttachFile
                ArcPopupshow={FileAttachshow}
                setArcPopupshow={setFileAttachshow}
              />
              <button className="cancel" onClick={handleArcOffCanvaClose}>
                Cancel
              </button>
              <button>{footerBtnName}</button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export function AttachFile({ ArcPopupshow, setArcPopupshow }) {
  const handleArcPopupShow = () => setArcPopupshow(true);
  const handleArcPopupClose = () => setArcPopupshow(false);

  //   ~ Upload File
  const [file, setFile] = useState(null);
  const [Error, setError] = useState();
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const fileTypes = ["XLSX", "XLS", "JPG", "PNG", "GIF", "PDF"];
  const acceptedFileTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
    "application/vnd.ms-excel", // XLS
    "image/jpeg", // JPG
    "image/png", // PNG
    "image/gif", // GIF
    "application/pdf", // PDF
  ];
  const ResetFiles = () => {
    setFile(null);
    setUploadDisabled(false);
  };
  const handleChange = (file) => {
    if (file && acceptedFileTypes.includes(file.type)) {
      setFile(file);
      setError(null); // Clear any previous errors
    } else {
      setError("Invalid file type. Please upload an XLSX or XLS file.");
      setFile(null);
    }
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
  //   ~ Upload File
  return (
    <>
      <button className="attach-btn" onClick={handleArcPopupShow}>
        <GrAttachment /> Attach
      </button>
      <Modal
        show={ArcPopupshow}
        onHide={handleArcPopupClose}
        className={`arc-popup-default attachfile-popup`}
        centered={true}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="popup-body-content">
            <div className="popup-header">
              <h3>Attach Document</h3>
              {/* <span className="close-btn" onClick={handleArcPopupClose}>
                <MdOutlineCancel />
              </span> */}
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
              {" "}
              <div className="attached-file">
                <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                  classes={`create-template-drop-label ${
                    Error && "invalid-file"
                  }`}
                  onTypeError={handleTypeError}
                  maxSize={10}
                  disabled={uploadDisabled}
                >
                  <div className="upload-box">
                    {/* <img className="xls-img" src={XLSImg} alt="" /> */}
                    <span className="upload-img-icon">
                      <IoDocumentAttachOutline />
                    </span>

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
                      (Supported formats .csv, .xlsx, .jpg, .png, .gif, .pdf;
                      max file size 10 MB)
                    </p>
                    {Error && <span className="error-format">{Error}</span>}
                  </div>
                </FileUploader>
              </div>
            </div>
            <div className="popup-footer">
              <button className="cancel" onClick={handleArcPopupClose}>
                Cancel
              </button>
              <button>Add</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export const NewMailInput = () => {
  const options = [
    { value: "Full Name", label: "Full Name" },
    { value: "Email", label: "Email" },
    { value: "First Name", label: "First Name" },
    { value: "Last Name", label: "Last Name" },
    { value: "Account", label: "Account" },
  ];
  const [content, setContent] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  return (
    <React.Fragment>
      <div className="create-input-fields">
        <ArcTextBox Label="From" Type={"text"} PlaceHolder={"From Mail"} />
        <ArcTextBox Label="Reply To" Type={"text"} PlaceHolder={"Reply To"} />
        <div className="mail-to-div">
          <ArcTextBox
            Label="To"
            Type={"text"}
            PlaceHolder={"Enter Recipients"}
          />
          <p>
            From:
            <span
              className={showCc ? "active" : ""}
              onClick={() => setShowCc((prev) => !prev)}
            >
              Cc
            </span>
            <span
              className={showBcc ? "active" : ""}
              onClick={() => setShowBcc((prev) => !prev)}
            >
              Bcc
            </span>
          </p>
        </div>
        {showCc && (
          <ArcTextBox
            Label="Cc"
            Type={"text"}
            PlaceHolder={"Enter Recipients"}
          />
        )}
        {showBcc && (
          <ArcTextBox
            Label="Bcc"
            Type={"text"}
            PlaceHolder={"Enter Recipients"}
          />
        )}
        {/* <ArcSingleSelect
          options={options}
          Label="Insert Fields"
          PlaceHolder="Select Insert Fields"
          ClassName=""
        /> */}
        <div className="action-fields">
          <div className="field-item insert-fields">
            <Usetemplate />
          </div>
          <div className="field-item  insert-template">
            {/* <label className="insert-fields-label">Insert Fields</label> */}
            <InsertFields />
          </div>
        </div>

        <ArcEmailEditor content={content} setContent={setContent} />
      </div>
    </React.Fragment>
  );
};
