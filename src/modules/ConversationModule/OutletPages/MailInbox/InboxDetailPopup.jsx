/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets
import Offcanvas from "react-bootstrap/Offcanvas";

//? Components
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";

//? CSS

//? Images

//? JSON File

//? Icons
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import Img1 from "@/style/arcstyle/images/mail-profile/1.jpg";
import { TbArrowForwardUpDouble } from "react-icons/tb";
import { TbArrowForwardUp } from "react-icons/tb";
// import { InboxDetail } from "./InboxDetail";
// *******~ Import ~******** //

export default function InboxDetailPopup({
  ArcOffCanvaShow,
  setArcOffCanvaShow,
}) {
  //   const [ArcOffCanvaShow, setArcOffCanvaShow] = useState(false);
  const handleArcOffCanvaClose = () => setArcOffCanvaShow(false);
  const [content, setContent] = useState("");
  return (
    <React.Fragment>
      <Offcanvas
        show={ArcOffCanvaShow}
        onHide={handleArcOffCanvaClose}
        className={`arc-off-canva-default inbox-detail`}
        placement={"end"}
        backdrop="static"
      >
        <Offcanvas.Body>
          <div className="off-canva-body-content">
            <div className="off-canva-header">
              <div className="profile">
                <img src={Img1} alt="" />
                <div className="info">
                  <p>Jane Sampleton</p>
                  <span>janesampleton@gmail.com</span>
                </div>
              </div>
              <span className="action actions">
                <HiDotsVertical />
              </span>
              <ArcToolTip
                className="close-btn actions"
                HoverText="Close"
                BtnName={<MdOutlineCancel />}
                Placement="left"
                onClick={handleArcOffCanvaClose}
                as="span"
              />
            </div>
            <div className="off-canva-main">
              {/* <InboxDetail content={content} setContent={setContent} /> */}
            </div>
            <div className="off-canva-footer">
              <button className="cancel" onClick={handleArcOffCanvaClose}>
                <TbArrowForwardUp /> Forward
              </button>
              <button>
                <TbArrowForwardUpDouble /> Replay
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
}
