// *******~ Import ~******** //
//? React
// import React from "react";
//? Assets
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons
import { TbMailForward } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { ImPriceTag } from "react-icons/im";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdCall } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { IoIosCalendar } from "react-icons/io";
import { BiMessageDetail } from "react-icons/bi";
// *******~ Import ~******** //

const Header360V2 = () => {
  return (
    <>
      <section className="page-360-header-v2">
        <Container fluid>
          <Row>
            <Col xxl={12} xl={12} md={12} lg={12}>
              <div className="header-inside">
                <div className="profile-div">
                  <span className="back-btn">
                    <TfiArrowCircleLeft />
                  </span>
                  <div className="image-data">AD</div>
                  <div className="name-data">
                    <h4>
                      Admin (Sample)
                      <span> - King (Sample)</span>
                    </h4>
                    <p>
                      <span>
                        <MdCall />
                      </span>
                      <span>
                        <IoMailOutline />
                      </span>
                      <span>
                        <IoIosCalendar />
                      </span>
                      <span>
                        <BiMessageDetail />
                      </span>
                    </p>
                  </div>
                </div>
                <div className="action-btn">
                  <button className="sendmail">
                    <TbMailForward /> Send Email
                  </button>
                  <button className="edit">
                    <BiSolidEditAlt /> Edit
                  </button>
                  <button className="more-action">
                    <BsThreeDots />
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Header360V2;
