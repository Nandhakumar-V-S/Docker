// *******~ Import ~******** //
//? React
// import { useState } from "react";
//? Assets
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
//? Components
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
//? CSS

//? Images

//? JSON File

//? Icons
import { MdKeyboardArrowDown } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
// *******~ Import ~******** //

const ArcPopover = ({
  children,
  showPopover,
  setShowPopover,
  Title,
  ClassName,
  BtnName,
  HandleApply,
}) => {
  //   const [showPopover, setShowPopover] = useState(false);
  const handlePopoverClose = () => {
    setShowPopover(false);
  };
  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="auto"
        rootClose
        show={showPopover}
        onToggle={(show) => setShowPopover(show)}
        overlay={
          <Popover className={`arc-popover ${ClassName}`}>
            <Popover.Body>
              <div className="arc-popover-body">
                <div className="arc-popover-header">
                  <h5>{Title}</h5>
                  <ArcToolTip
                    onClick={handlePopoverClose}
                    HoverText="Close"
                    BtnName={<ImCancelCircle />}
                    Placement="left"
                  />
                </div>
                <div className="arc-popover-main">{children}</div>
                <div className="arc-popover-footer">
                  <button className="cancel" onClick={handlePopoverClose}>
                    Cancel
                  </button>
                  <button onClick={HandleApply}>Apply</button>
                </div>
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <button
          className={`arc-popover-button ${showPopover ? "active" : null}`}
        >
          {BtnName}
          <span>
            <MdKeyboardArrowDown />
          </span>
        </button>
      </OverlayTrigger>
    </>
  );
};

export default ArcPopover;
