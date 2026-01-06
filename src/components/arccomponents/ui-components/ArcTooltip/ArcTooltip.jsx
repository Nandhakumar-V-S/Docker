/* eslint-disable react/prop-types */
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Button } from "react-bootstrap";
export default function ArcToolTip({
  HoverText,
  BtnName,
  Placement,
  className,
  onClick,
  as,
  onMouseLeave,
  onMouseEnter,
  Tooltipclass,
}) {
  return (
    <>
      <OverlayTrigger
        placement={Placement}
        // delay={{ hide: 100000 }}
        overlay={
          <Tooltip className={`arc-tooltip ${Tooltipclass}`}>
            {HoverText}
          </Tooltip>
        }
      >
        <Button
          as={as}
          className={`${className} arc-tooltip-btn`}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {BtnName}
        </Button>
      </OverlayTrigger>
    </>
  );
}
