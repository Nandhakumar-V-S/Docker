/* eslint-disable react/prop-types */
/* eslint-disable no-inner-declarations */
// *******~ Import ~******** //
//? React
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//? Assets

import Modal from "react-bootstrap/Modal";

//? Components
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";

//? CSS

//? Images

//? JSON File

//? Icons
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
// *******~ Import ~******** //

export default function Importstartalert({
  showImportAlert,
  setShowImportAlert,
}) {
  // const [showImportAlert, setShowImportAlert] = useState(true); // Set to true for first load

  const handleArcPopupClose = () => {
    setShowImportAlert(false);
  };

  return (
    <>
      <Modal
        show={showImportAlert} //
        onHide={handleArcPopupClose}
        className={`arc-popup-default corrected-rows-upload import-scheduled`}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="popup-body-content">
            <div className="popup-header">
              <h3>Import has been scheduled</h3>
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
              <p className="alert-text">
                It will take a few minutes to complete this import. You will be
                notified by email when the Import is complete.
              </p>
              {/* <p>Thank you.</p> */}
            </div>
            <div className="popup-footer">
              <button onClick={handleArcPopupClose}>OK</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
