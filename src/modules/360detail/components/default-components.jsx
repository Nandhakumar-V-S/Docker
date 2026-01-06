// *******~ Import ~******** //
//? React
import { useState } from "react";
//? Assets
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Flip } from "react-toastify";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons
import { MdOutlineCancel } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
// *******~ Import ~******** //

export const Components = () => {
  const Success = () => toast.success(<Notification />);
  const Error = () => toast.error(<Notification />);
  return (
    <>
      <div className="tab-main-content ">
        <div className="default-components">
          <div className="toastify-compoenents compoenents-box">
            <h5>Toastify</h5>
            <div className="group-buttons">
              <button onClick={Success}>
                <FaRegBell /> Success
              </button>
              <button onClick={Error}>
                <FaRegBell /> Error
              </button>
            </div>

            <ToastContainer
              position="top-right"
              autoClose={2000}
              newestOnTop={false}
              transition={Flip}
              icon={true}
              className="default-notifi"
              draggable={true}
            />
          </div>
          <div className="compoenents-box">
            <h5>Popup</h5>
            <div className="group-buttons">
              <Popup1 />
              <Popup2 place="start" name="Popup 2" />
              <Popup2 place="end" name="Popup 3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Notification = () => {
  return (
    <>
      <div className="default-notifi-content">
        <p>Success!</p>
        <span>Contact updated.</span>
      </div>
    </>
  );
};

function Popup1() {
  const [Popup1show, setPopup1show] = useState(false);

  const handlePopup1Close = () => setPopup1show(false);
  const handlePopup1Show = () => setPopup1show(true);

  return (
    <>
      <button onClick={handlePopup1Show}>Popup 1</button>

      <Modal
        show={Popup1show}
        onHide={handlePopup1Close}
        className="popup-type1 popup-default"
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

function Popup2(props) {
  const [Popup2show, setPopup2show] = useState(false);

  const handlePopup2Close = () => setPopup2show(false);
  const handlePopup2Show = () => setPopup2show(true);

  return (
    <>
      <button onClick={handlePopup2Show}>{props.name}</button>

      <Offcanvas
        show={Popup2show}
        onHide={handlePopup2Close}
        className="off-canva-default off-canva-type1"
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
