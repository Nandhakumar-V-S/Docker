import React, { useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { BsGrid } from "react-icons/bs";
import { CaseDetailContext } from "../index";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { IoIosArrowBack } from "react-icons/io";
export default function ArcPageHeader(ClassName) {
  const { PostConfigurationMeta, ResetState } = useContext(CaseDetailContext);
  const [CurrentAccount, setCurrentAccount] = useState(1);
  const previousAccount = () => {
    if (CurrentAccount > 1) {
      setCurrentAccount(CurrentAccount - 1);
    }
  };
  const nextAccount = () => {
    if (CurrentAccount < 7) {
      setCurrentAccount(CurrentAccount + 1);
    }
  };
  const [ticketId, setTicketId] = useState(
    localStorage.getItem("Ticketid") || ""
  );
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <section className="arc-list-header border-header">
        <Container fluid>
          <Row>
            <Col xxl={12}>
              <div className="arc-list-header-inside">
                <div className="filter-dropdown">
                  <span className="icon  false">
                    <BsGrid />
                  </span>
                  <div className="drop-down">
                    <div className="select-div">
                      <p style={{display:"flex", justifyContent:"center",alignItems:"center",gap:"5px"}}>
                        Edit Ticket
                        <span>(Ticket Id - {ticketId})</span>
                      </p>
                    </div>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate("/ticket");
                      }}
                    >
                      <span>
                        <IoIosArrowBack />
                      </span>
                      Back to ticket list
                    </span>
                  </div>
                </div>
                <div className="action-add">
                <button
                    onClick={PostConfigurationMeta}
                    className="add-contact-btn cancel"
                  >
                    Comment & Resolve
                  </button>
                  <button
                    onClick={PostConfigurationMeta}
                    className="add-contact-btn cancel"
                  >
                    Save as draft
                  </button>
                  <button
                    className="add-contact-btn cancel"
                    onClick={ResetState}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={PostConfigurationMeta}
                    className="add-contact-btn"
                  >
                    Update
                  </button>
                  {/* <div className="back-div">
                    <div className="back-btn">
                      <ArcToolTip
                        HoverText={"Prev"}
                        BtnName={<RiArrowLeftSLine />}
                        Placement="top"
                        as="button"
                        onClick={previousAccount}
                        // className={}
                      />
                      <span>{CurrentAccount} / 7</span>
                      <ArcToolTip
                        HoverText={"Next"}
                        BtnName={<RiArrowRightSLine />}
                        Placement="top"
                        as="button"
                        onClick={nextAccount}
                        // className={}
                      />
                    </div>
                  </div> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
