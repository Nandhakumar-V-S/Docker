// *******~ Import ~******** //
//? React
import React, { useContext } from "react";

//? Assets
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { IoIosArrowDown } from "react-icons/io";
import AccordionContext from "react-bootstrap/AccordionContext";
import Table from "react-bootstrap/Table";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons
import { MdOutlineAddIcCall } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { IoCalendarClearOutline } from "react-icons/io5";

// *******~ Import ~******** //

const ContactDetails = () => {
  return (
    <>
      <div className="contact-details">
        <div className="contact-header">
          <div className="profile">
            <div className="img-data">AD</div>
            <div className="name-email">
              <p>Admin</p>
              <span>admin@demo.com</span>
            </div>
          </div>
          <div className="contact-icon">
            <button>
              <MdOutlineAddIcCall />
            </button>
            <button>
              <IoMailOutline />
            </button>
            <button>
              <IoCalendarClearOutline />
            </button>
          </div>
        </div>
        <div className="information">
          <Accordion defaultActiveKey="0">
            <CustomToggle eventKey="0">
              <h4>Contact Information</h4>
              <span>
                <IoIosArrowDown />
              </span>
            </CustomToggle>
            <Accordion.Collapse eventKey="0">
              <div className="info-table">
                <Table>
                  <tbody>
                    <tr>
                      <td>Account Name</td>
                      <td>Admin</td>
                    </tr>
                    <tr>
                      <td>Account Number</td>
                      <td>1234567890</td>
                    </tr>
                    <tr>
                      <td>Account Status</td>
                      <td>Active</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Accordion.Collapse>
          </Accordion>
          <Accordion defaultActiveKey="0">
            <CustomToggle eventKey="0">
              <h4>Account Information</h4>
              <span>
                <IoIosArrowDown />
              </span>
            </CustomToggle>
            <Accordion.Collapse eventKey="0">
              <div className="info-table">
                <Table>
                  <tbody>
                    <tr>
                      <td>Prepaid Hours</td>
                      <td>20 hrs</td>
                    </tr>
                    <tr>
                      <td>Project Hours</td>
                      <td>140 hrs</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Accordion.Collapse>
          </Accordion>
          <Accordion defaultActiveKey="0">
            <CustomToggle eventKey="0">
              <h4>Other Information</h4>
              <span>
                <IoIosArrowDown />
              </span>
            </CustomToggle>
            <Accordion.Collapse eventKey="0">
              <div className="info-table">
                <Table>
                  <tbody>
                    <tr>
                      <td>Work Number</td>
                      <td>1234567890</td>
                    </tr>
                    <tr>
                      <td>Mobile Number</td>
                      <td>0987654321</td>
                    </tr>
                    <tr>
                      <td>Sales Owner</td>
                      <td>Owner 1</td>
                    </tr>
                    <tr>
                      <td>Email </td>
                      <td>admin@demo.com</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Accordion.Collapse>
          </Accordion>
        </div>
      </div>
    </>
  );
};
export default ContactDetails;

function CustomToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      className={`info-title ${isCurrentEventKey && "active"}`}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}
