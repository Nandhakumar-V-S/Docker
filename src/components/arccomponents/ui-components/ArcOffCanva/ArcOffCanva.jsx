// *******~ Import ~******** //
//? React
import { useState } from "react";
//? Assets

import Offcanvas from "react-bootstrap/Offcanvas";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons
import { MdOutlineCancel } from "react-icons/md";
// *******~ Import ~******** //

export default function ArcOffCanva({
  BtnClassName,
  CanvaClassName,
  Place,
  Title,
  children,
  ArcOffCanvaShow,
  setArcOffCanvaShow,
  Icon,
  BtnText,
}) {
  // const [ArcOffCanvaShow, setArcOffCanvaShow] = useState(false);

  const handleArcOffCanvaClose = () => setArcOffCanvaShow(false);
  const handleArcOffCanva2Show = () => setArcOffCanvaShow(true);

  return (
    <>
      <button className={BtnClassName} onClick={handleArcOffCanva2Show}>
        {Icon && <span>{Icon}</span>} {BtnText}
      </button>

      <Offcanvas
        show={ArcOffCanvaShow}
        onHide={handleArcOffCanvaClose}
        className={`arc-off-canva-default ${CanvaClassName}`}
        placement={Place}
        backdrop="static"
      >
        <Offcanvas.Body>
          <div className="off-canva-body-content">
            <div className="off-canva-header">
              <h3>{Title}</h3>
              <span className="close-btn" onClick={handleArcOffCanvaClose}>
                <MdOutlineCancel />
              </span>
            </div>
            <div className="off-canva-main">{children}</div>
            <div className="off-canva-footer">
              <button className="cancel" onClick={handleArcOffCanvaClose}>
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
