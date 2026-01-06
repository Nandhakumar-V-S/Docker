// *******~ Import ~******** //
//? React
import { useState } from "react";
//? Assets
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons
import { MdOutlineCancel } from "react-icons/md";
// *******~ Import ~******** //
export function Popup1() {
  const [Popup1show, setPopup1show] = useState(false);

  const handlePopup1Close = () => setPopup1show(false);
  const handlePopup1Show = () => setPopup1show(true);

  return (
    <>
      <button onClick={handlePopup1Show}>Popup 1</button>

      <Modal
        show={Popup1show}
        onHide={handlePopup1Close}
        className="popup-type1 arc-popup-default"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="popup-body-content">
            <div className="popup-header">
              <h3>Popup 1 Title</h3>
              <span className="close-btn" onClick={handlePopup1Close}>
                <MdOutlineCancel />
              </span>
            </div>
            <div className="popup-main"></div>
            <div className="popup-footer">
              <button className="cancel" onClick={handlePopup1Close}>
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

export function Popup2(props) {
  const [Popup2show, setPopup2show] = useState(false);

  const handlePopup2Close = () => setPopup2show(false);
  const handlePopup2Show = () => setPopup2show(true);

  return (
    <>
      <button onClick={handlePopup2Show}>{props.name}</button>

      <Offcanvas
        show={Popup2show}
        onHide={handlePopup2Close}
        className="arc-off-canva-default off-canva-type1"
        placement={props.place}
        backdrop="static"
      >
        <Offcanvas.Body>
          <div className="off-canva-body-content">
            <div className="off-canva-header">
              <h3>off-canva 1 Title</h3>
              <span className="close-btn" onClick={handlePopup2Close}>
                <MdOutlineCancel />
              </span>
            </div>
            <div className="off-canva-main"></div>
            <div className="off-canva-footer">
              <button className="cancel" onClick={handlePopup2Close}>
                Cancel
              </button>
              <button>Save</button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
