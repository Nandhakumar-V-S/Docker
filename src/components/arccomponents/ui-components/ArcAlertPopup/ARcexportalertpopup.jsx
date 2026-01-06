/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import { useState } from "react";
//? Assets
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons
import { MdOutlineTaskAlt } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";

// *******~ Import ~******** //

export default function ARcexportalertpopup({
  Title,
  ArcPopupshow,
  setArcPopupshow,
  handleArcAlertPopup,
}) 
{
//    var [ArcPopupshow, setArcPopupshow] = useState(false);
const navigate = useNavigate();

  const handleArcPopupShow = () => {
    setArcPopupshow(true);
  };
  const handleArcPopupClose = () => {
    setArcPopupshow(false);
  };
  const navigateExportHistory = () => {
    console.log("navigateExportHistory");
    navigate("/exporthistory");
  };

  return (
    <>
      {/* <span title="Mark as Completed" onClick={handleArcPopupShow}>
        <MdOutlineTaskAlt />
      </span> */}

      <Modal
        show={ArcPopupshow}
        onHide={handleArcPopupClose}
        className={`arc-popup-default delete-dataset`}
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
              <p >Your Export is being prepared, you can view the progress  <span onClick={navigateExportHistory}>here</span></p>
            </div>
            <div className="popup-footer">
              {/* <button className="cancel" onClick={handleArcPopupClose}>
                No
              </button>
              <button onClick={handleArcAlertPopup}>Yes</button> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}


