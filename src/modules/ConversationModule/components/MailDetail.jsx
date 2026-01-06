/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useContext } from "react";
//? Assets
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
//? Components
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
//? CSS

//? Images
//? JSON File

//? Icons
import { GrAttachment } from "react-icons/gr";
import { RiDownloadLine } from "react-icons/ri";
import { FiFileText } from "react-icons/fi";
import { TbArrowForwardUpDouble } from "react-icons/tb";
import ArcEmailEditor from "./EmailEditor";
import { TbArrowForwardUp } from "react-icons/tb";
import InsertFields from "./InsertFields";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { InboxMailList } from "../OutletPages/MailInbox/MailInbox";
import Usetemplate from "./UseTemplate";
import { TbArrowBackUp } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
// *******~ Import ~******** //

const MailDetail = ({
  setIsReplay,
  HandleReplay,
  IsReplay,
  showCc,
  setShowCc,
  showBcc,
  setShowBcc,
  content,
  setContent,
  pagekey,
  headerShow,
}) => {
  return (
    <React.Fragment>
      <div className="mail-info-body">
        {headerShow && (
          <div className="mail-info-header">
            <h4>Strategic Insights Webinar: Navigating Future Trends.</h4>
            <span>
              <HiOutlineDotsVertical />
            </span>
          </div>
        )}

        <div className="mail-box">
          <Accordion defaultActiveKey={[0]} alwaysOpen>
            {InboxMailList.map((mail, index) => (
              <div className="mail-list" key={index}>
                <div className="sender-info">
                  <ContextAwareToggle eventKey={index}>
                    <div className="profile">
                      <img src={mail.img} alt="" />
                      <div className="info">
                        <p>
                          {pagekey === "sentdetail" && "To:"} {mail.to}{" "}
                          <span>{"<" + mail.email + ">"}</span>
                          {/* <span className="info-arrow">
                            <IoMdArrowDropdown />
                          </span> */}
                          <ArcToolTip
                            HoverText={
                              <>
                                <ul className="mail-id-info-list">
                                  <li>
                                    <p>
                                      {pagekey === "sentdetail"
                                        ? "To:"
                                        : "From:"}
                                      <span className="from-to-address">
                                        {mail.to} {"<" + mail.email + ">"}
                                      </span>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      {pagekey === "sentdetail"
                                        ? "From:"
                                        : "To:"}
                                      <span>{mail.email}</span>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      Cc:
                                      <span>
                                        janesampleton@gmail.com,
                                        alistaspector@gmail.com
                                      </span>
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      Bcc:
                                      <span>
                                        janesampleton@gmail.com,
                                        alistaspector@gmail.com,
                                        sender@gmail.com
                                        janesamplethon@gmail.com,
                                      </span>
                                    </p>
                                  </li>
                                </ul>
                              </>
                            }
                            BtnName={<IoMdArrowDropdown />}
                            Placement="auto"
                            Tooltipclass="mail-info-arrow"
                            // onClick={}
                            as="span"
                            className="info-arrow"
                          />
                        </p>
                        <span>
                          {" "}
                          {pagekey === "sentdetail" ? "from:" : "to:"}{" "}
                          janesampleton@gmail.com
                        </span>
                      </div>
                    </div>
                  </ContextAwareToggle>
                  <div className="mail-action">
                    <ArcToolTip
                      HoverText="Forward"
                      BtnName={<TbArrowBackUp />}
                      Placement="top"
                      // onClick={}
                      as="span"
                      className="replay-btn"
                    />
                    <ArcToolTip
                      HoverText="Reply"
                      BtnName={<TbArrowForwardUpDouble />}
                      Placement="top"
                      onClick={() => {
                        setIsReplay(true);
                      }}
                      as="span"
                      className="replay-btn"
                    />

                    <span className="date-time">Oct-22-2024, 03:05PM</span>
                  </div>
                </div>

                <Accordion.Collapse eventKey={index}>
                  <div className="mail-list-info">
                    <div className="main-mail-container">
                      <div className="mail-content">
                        <p className="greeting-text">Greetings Mr Jack!</p>
                        <p className="paragraph">
                          We&apos;re excited to invite you to our upcoming
                          webinar, &quot;Navigating Future Trends,&quot; where
                          industry experts will share strategic insights to help
                          you stay ahead in an ever-evolving landscape. Join us
                          on [Date] at [Time] for an engaging session that
                          promises to provide actionable knowledge and valuable
                          perspectives.
                        </p>
                        <p className="paragraph">Key Highlights :</p>
                        <ul className="highlight-list">
                          <li>Expert analysis of emerging trends</li>
                          <li>Practical strategies for staying competitive</li>
                          <li>Q&amp;A session for personalized insights</li>
                        </ul>
                        <p className="paragraph">
                          Earth has a diameter of roughly 8,000 miles (13,000
                          kilometers) and is mostly round because gravity
                          generally pulls matter into a ball. But the spin of
                          our home planet causes it to be squashed at its poles
                          and swollen at the equator, making the true shape of
                          the Earth an &quot;oblate spheroid.&quot;.
                        </p>
                        <div className="attachements">
                          <div className="attachements-header">
                            <h5>
                              <span>
                                <GrAttachment />
                              </span>
                              Attachments (5.8KB):
                            </h5>
                            <button>
                              <RiDownloadLine /> Download All
                            </button>
                          </div>

                          <ul className="attachement-list">
                            <li>
                              <span className="icon-file">
                                <FiFileText />
                              </span>
                              <div className="file-info">
                                <p>Instructions_file.pdf</p>
                                <span>2.1KB</span>
                              </div>
                              <span className="download">
                                <RiDownloadLine />
                              </span>
                            </li>
                            <li>
                              <span className="icon-file">
                                <FiFileText />
                              </span>
                              <div className="file-info">
                                <p>Complete_Folder.doc</p>
                                <span>1.5KB</span>
                              </div>
                              <span className="download">
                                <RiDownloadLine />
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="regards">
                          <p>Best Regards,</p>
                          <p>Jane Sampleton</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion.Collapse>
              </div>
            ))}
          </Accordion>
          <div className="replay-mail-container">
            {!IsReplay && (
              <div className="action-button replay-action">
                <button className="forward">
                  <TbArrowForwardUp /> Forward
                </button>
                <button className="replay" onClick={() => HandleReplay()}>
                  <TbArrowForwardUpDouble /> Reply
                </button>
              </div>
            )}

            {IsReplay && (
              <div className="replay-mail">
                <h5>
                  <TbArrowForwardUpDouble /> Reply:
                </h5>
                <div className="create-input-fields with-inbox-details">
                  <div className="mail-to-div">
                    <ArcTextBox
                      Label="Reply To"
                      Type={"text"}
                      PlaceHolder={"Enter Recipients"}
                      Value="janesampleton@gmail.com"
                    />
                    <p>
                      From:
                      <span
                        className={showCc ? "active" : ""}
                        onClick={() => setShowCc((prev) => !prev)}
                      >
                        Cc
                      </span>
                      <span
                        className={showBcc ? "active" : ""}
                        onClick={() => setShowBcc((prev) => !prev)}
                      >
                        Bcc
                      </span>
                    </p>
                  </div>
                  {showCc && (
                    <ArcTextBox
                      Label="Cc"
                      Type={"text"}
                      PlaceHolder={"Enter Recipients"}
                    />
                  )}
                  {showBcc && (
                    <ArcTextBox
                      Label="Bcc"
                      Type={"text"}
                      PlaceHolder={"Enter Recipients"}
                    />
                  )}

                  <div className="action-fields">
                    <div className="field-item insert-fields">
                      <Usetemplate />
                    </div>
                    <div className="field-item  insert-template">
                      {/* <label className="insert-fields-label">Insert Fields</label> */}
                      <InsertFields />
                    </div>
                  </div>

                  <ArcEmailEditor content={content} setContent={setContent} />
                </div>
                {/* <ArcEmailEditor content={content} setContent={setContent} /> */}
                <div className="action-button send-action">
                  <button
                    className="forward"
                    onClick={() => setIsReplay(false)}
                  >
                    Cancel
                  </button>
                  <button className="replay">Send</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default MailDetail;

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey.includes(eventKey);

  return (
    <button
      type="button"
      className={`profile-button ${isCurrentEventKey ? "active" : null} `}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}
