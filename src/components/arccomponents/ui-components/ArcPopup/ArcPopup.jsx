// *******~ Import ~******** //
//? React
import { useState } from "react";
//? Assets
import Modal from "react-bootstrap/Modal";

//? Components
import { ArcButtonPrimary } from "@/components/arccomponents/ui-components/ArcButtons/ArcButtons";
//? CSS

//? Images

//? JSON File

//? Icons
import { MdOutlineCancel } from "react-icons/md";
// *******~ Import ~******** //
export default function ArcPopup({
  Title,
  ArcPopupshow,
  setArcPopupshow,
  children,
  BtnClassName,
  PopupClassName,
  centered,
}) {
  //   const [ArcPopupshow, setArcPopupshow] = useState(false);

  const handleArcPopupShow = () => setArcPopupshow(true);
  const handleArcPopupClose = () => setArcPopupshow(false);

  return (
    <>
      <ArcButtonPrimary
        ClassName=""
        BtnText="Arc Popup"
        OnClick={handleArcPopupShow}
      />

      <Modal
        show={ArcPopupshow}
        onHide={handleArcPopupClose}
        className={`arc-popup-default ${PopupClassName}`}
        centered={centered}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="popup-body-content">
            <div className="popup-header">
              <h3>{Title}</h3>
              <span className="close-btn" onClick={handleArcPopupClose}>
                <MdOutlineCancel />
              </span>
            </div>
            <div className="popup-main">{children}</div>
            <div className="popup-footer">
              <button className="cancel" onClick={handleArcPopupClose}>
                Cancel
              </button>
              <button>Save</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
