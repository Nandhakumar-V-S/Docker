/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import { useState } from "react";
//? Assets
import Offcanvas from "react-bootstrap/Offcanvas";
//? Components
import ArcEmailEditor from "./EmailEditor";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import ArcTextarea from "@/components/arccomponents/ui-components/ArcTextarea/ArcTextarea";
import { AttachFile } from "./SendNewMail";
//? CSS

//? Images

//? JSON File

//? Icons

import { MdOutlineCancel } from "react-icons/md";
import InsertFields from "./InsertFields";
import ArcSingleSelect from "@/components/arccomponents/ui-components/ArcSingleSelect/ArcSingleSelect";
import Usetemplate from "./UseTemplate";

// *******~ Import ~******** //

export default function CreateMailTemplate() {
  const [ArcOffCanvaShow, setArcOffCanvaShow] = useState(false);
  const handleArcOffCanvaClose = () => setArcOffCanvaShow(false);
  const handleArcOffCanva2Show = () => setArcOffCanvaShow(true);
  const [FileAttachshow, setFileAttachshow] = useState(false);
  const [content, setContent] = useState("");
  // const options = ["Account", "Contact", "Lead", "Opportunity"];
  const options = [
    { value: "Full Name", label: "Full Name" },
    { value: "Email", label: "Email" },
    { value: "First Name", label: "First Name" },
    { value: "Last Name", label: "Last Name" },
    { value: "Account", label: "Account" },
  ];
  return (
    <>
      <button className="add-contact-btn" onClick={handleArcOffCanva2Show}>
        Create Template
      </button>

      <Offcanvas
        show={ArcOffCanvaShow}
        onHide={handleArcOffCanvaClose}
        className={`arc-off-canva-default create-mail-template`}
        placement={"end"}
        backdrop="static"
        enforceFocus={false}
      >
        <Offcanvas.Body>
          <div className="off-canva-body-content">
            <div className="off-canva-header">
              <h3>Create Template</h3>
              {/* <span className="close-btn" onClick={handleArcOffCanvaClose}>
                <MdOutlineCancel />
              </span> */}
              <ArcToolTip
                className="close-btn"
                HoverText="Close"
                BtnName={<MdOutlineCancel />}
                Placement="left"
                onClick={handleArcOffCanvaClose}
                as="span"
              />
            </div>
            <div className="off-canva-main">
              {/* <h4>Create Template</h4> */}
              <div className="create-input-fields">
                <ArcTextBox
                  Label="Name Your Template"
                  Type={"text"}
                  PlaceHolder={"Enter your template name"}
                />
                <ArcTextarea
                  Label={"Write a Subject Line"}
                  PlaceHolder={"Write your subject line"}
                />
                {/* <ArcSingleSelect
                  options={options}
                  Label="Insert Fields"
                  PlaceHolder="Select Insert Fields"
                  ClassName=""
                /> */}
                <div className="action-fields">
                  {/* <div className="field-item insert-fields">
                    <Usetemplate />
                  </div> */}
                  <div className="field-item  insert-template">
                    {/* <label className="insert-fields-label">Insert Fields</label> */}
                    <InsertFields />
                  </div>
                </div>

                {/* <Editor value={html} onChange={onChange} /> */}
                <ArcEmailEditor content={content} setContent={setContent} />
              </div>
            </div>
            <div className="off-canva-footer">
              {/* <button className="attach-btn">
                <GrAttachment /> Attach
              </button> */}
              <AttachFile
                ArcPopupshow={FileAttachshow}
                setArcPopupshow={setFileAttachshow}
              />
              <button className="cancel" onClick={handleArcOffCanvaClose}>
                Cancel
              </button>
              <button>Save and Apply</button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
