/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import { useState } from "react";
//? Assets
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { ArcRadioBtnv2 } from "@/components/arccomponents/ui-components/ArcRadioBtn/ArcRadioBtn";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons
import { MdOutlineTaskAlt } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { CreateNewExport } from "@/redux/Exporthistory/Createnewexport/createNewExport";
import { LuExternalLink } from "react-icons/lu";
// *******~ Import ~******** //

export default function Exporttypepopup({
  Title,
  ArcPopupshow,
  setArcPopupshow,
  setpopupshow,
  Postdata,
  setFormatpopupshow,
  useremail,
  exportfrom,
}) {
  //    var [ArcPopupshow, setArcPopupshow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("xlsx");

  const handleArcPopupClose = () => {
    setArcPopupshow(false);
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const RadioBtnData = [
    {
      Title: "XLSX",
      Value: "xlsx",
    },
    {
      Title: "CSV",
      Value: "csv",
    },
  ];

  const HandleExportAudit = () => {
    navigate("/exporthistory");
    setFormatpopupshow(false);
  };

  const handletaskexportdata = () => {
    const templateid =
      exportfrom == "Task"
        ? "DF07D7A1-C0D0-487C-A142-E975509904FC"
        : exportfrom == "Plan"
          ? "2F330527-894E-4D93-BD03-ACEC9BC796C2"
          : "DF07D7A1-C0D0-487C-A142-E975509904FC";
    console.log(Postdata ? Postdata : "no data");
    const updatedPostdata = {
      ...Postdata,
      Exportfiletype: selectedValue,
      Exportdatafrom: exportfrom,
    };

    const keyToRemove = "sessionid";
    const newKeyValue = { templateid: templateid, baseurl: getBaseUrl() };
    var UserId = window.sessionStorage.getItem("Globalid");
    // Removing the key-value pair and adding a new key-value pair to the object
    function getBaseUrl() {
      var baseUrl = location.href.substring(0, location.href.lastIndexOf("/"));
      return baseUrl;
    }
    const { [keyToRemove]: _, ...rest } = updatedPostdata;
    var updatedRequestData = {
      ...rest,
      loggeduserid: UserId,
      skip: 0,
      start: 0,
      ...newKeyValue,
    };
    console.log(updatedRequestData);
    dispatch(CreateNewExport({ requestData: updatedRequestData }));
    setpopupshow(true);
    setFormatpopupshow(false);
  };
  return (
    <>
      <Modal
        show={ArcPopupshow}
        onHide={handleArcPopupClose}
        className={`arc-popup-default exportfiletype`}
        centered={false}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="popup-body-content">
            <div className="popup-header">
              <h3>{Title}</h3>
              <ArcToolTip
                HoverText="Close"
                BtnName={<MdOutlineCancel />}
                Placement="left"
                onClick={handleArcPopupClose}
                as="span"
                className="close-btn"
              />
            </div>
            <div className="popup-main">
              <div className="send-to">
                <h5>Note:</h5>
                <p className="desc">
                  Mail notification will be emailed to{" "}
                  <strong>{useremail}</strong> once the export is completed.
                </p>
                <p>
                  View this and past exports in{" "}
                  <span onClick={HandleExportAudit} Title="Export History">
                    Export Audit.
                    <LuExternalLink />
                  </span>
                </p>
              </div>
              <div className="export-section">
                <p>Please select the Export file format.</p>
                <ArcRadioBtnv2
                  Required={true}
                  Name="account-type"
                  RadioBtnData={RadioBtnData}
                  ClassName=""
                  onChange={handleRadioChange}
                  selectedValue={selectedValue}
                />
              </div>
            </div>
            <div className="popup-footer">
              <button onClick={handletaskexportdata}>Export</button>
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
