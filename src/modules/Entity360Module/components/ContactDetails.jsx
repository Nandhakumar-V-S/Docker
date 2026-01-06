// *******~ Import ~******** //
//? React
import React, { useState, useContext } from "react";

//? Assets
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { IoIosArrowDown } from "react-icons/io";
import AccordionContext from "react-bootstrap/AccordionContext";
import { format } from "date-fns";
import { HiOutlineUserCircle } from "react-icons/hi";
//? Components
import { StatusDropdown } from "./progressbar/progressbar";
import { useSelector, useDispatch } from "react-redux";
//? CSS

//? Images

//? JSON File

//? Icons
import moment from "moment";
import { GrNotes } from "react-icons/gr";
import { RiEdit2Line } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import { MdOutlineAddIcCall } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineSubtitles } from "react-icons/md";
import EntityData from "./entity.json";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import UpdateStatus360 from "./updatestatus360new";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import { GetDefaultFormValues } from "@/redux/Execution/UpdateStatus/GetDefaultValues";
// *******~ Import ~******** //

const ContactDetails = () => {
  const dispatch = useDispatch();
  // Example selector to get entity details and status
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  const [UpdateStatus360show, setUpdateStatus360show] = useState(false);
  const selectEntityDetails = (state) => state.attribute.entityDetails;
  const selectEntityStatus = (state) => state.attribute.status;
  const selectEntityError = (state) => state.attribute.error;
  // Use the selectors to access the Redux state
  const entityDetails = useSelector(selectEntityDetails);
  const entityStatus = useSelector(selectEntityStatus);
  const entityError = useSelector(selectEntityError);
  const entityResults = entityDetails?.result?.data;
  console.log(entityResults);
  const entityResultsData = entityResults && entityResults[0];
  // const TransactionID = entityResultsData?.id;
  // console.log("TransactionId", TransactionID);
  const TransactionID = sessionStorage.getItem("Current_EntityID");
  console.log(TransactionID);
  console.log(previousPathName);
  const HandleGedDefaultInputs = () => {
    dispatch(
      GetDefaultFormValues({
        TransactionId: TransactionID,
        previousPathName: previousPathName,
      })
    );
  };
  const entityResult =
    entityResults && entityResults.length > 0 ? entityResults[0] : null;
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const description =
    entityResults && entityResults.length > 0
      ? entityResults[0][EntityData.descriptionname_apiname]
        ? entityResults[0][EntityData.descriptionname_apiname].length === 0
          ? "-"
          : entityResults[0][EntityData.descriptionname_apiname]
        : "-"
      : "-";
  // const descriptions =
  //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi modi qui accusamus quibusdam dolorum est fuga ipsam tempora, earum rerum voluptatum ullam, vel impedit voluptas quo laudantium labore pariatur possimus.";
  const displayedDescription = showFullDescription
    ? description
    : description.substring(0, 100);
  return (
    <>     
      <div className="contact-details">
        <div className="contact-header">
          {/* <pre>{JSON.stringify(entityDetails, null, 2)}</pre> */}
          <div className="profile">
            <div className="img-data">
              {
                entityResults && entityResults.length > 0
                  ? entityResults[0][EntityData.primaryname_apiname]
                    ? entityResults[0][EntityData.primaryname_apiname]
                        .length === 0
                      ? "-" // If the length is zero, return "-"
                      : entityResults[0][EntityData.primaryname_apiname].slice(
                          0,
                          2
                        ) // If the length is not zero, return the value
                    : "-" // If the property doesn't exist, return "-"
                  : "-" // If entityResults is undefined or empty, return "-"
              }
            </div>
            <div className="name-email">
              <p
                title={
                  entityResults && entityResults.length > 0
                    ? entityResults[0][EntityData.primaryname_apiname]
                      ? entityResults[0][EntityData.primaryname_apiname]
                          .length === 0
                        ? "-" // If the length is zero, return "-"
                        : entityResults[0][EntityData.primaryname_apiname] // If the length is not zero, return the value
                      : "-" // If the property doesn't exist, return "-"
                    : "-" // If entityResults is undefined or empty, return "-"
                }
              >
                {/* {entityResults.slice(0, 1).id} */}
                {
                  entityResults && entityResults.length > 0
                    ? entityResults[0][EntityData.primaryname_apiname]
                      ? entityResults[0][EntityData.primaryname_apiname]
                          .length === 0
                        ? "-" // If the length is zero, return "-"
                        : entityResults[0][EntityData.primaryname_apiname] // If the length is not zero, return the value
                      : "-" // If the property doesn't exist, return "-"
                    : "-" // If entityResults is undefined or empty, return "-"
                }
              </p>
              <span>
                {
                  entityResults && entityResults.length > 0
                    ? entityResults[0][EntityData.secondaryname_apiname]
                      ? entityResults[0][EntityData.secondaryname_apiname]
                          .length === 0
                        ? "-" // If the length is zero, return "-"
                        : entityResults[0][EntityData.secondaryname_apiname] // If the length is not zero, return the value
                      : "-" // If the property doesn't exist, return "-"
                    : "-" // If entityResults is undefined or empty, return "-"
                }
              </span>
            </div>
          </div>

          <div className="contact-icon">
            {/* <button
              title="Update Status"
              onClick={() => {
                setUpdateStatus360show(true);
                HandleGedDefaultInputs();
              }}
            >
              <MdOutlineSystemUpdateAlt />
            </button> */}

            {/* <button>
              <IoMailOutline />
            </button>
            <button>
              <IoCalendarClearOutline />
            </button> */}
          </div>
        </div>
        <div className="information">
          <Accordion defaultActiveKey="0">
            <CustomToggle eventKey="0">
              <h4>Basic Information</h4>
              <span>
                <IoIosArrowDown />
              </span>
            </CustomToggle>
            <Accordion.Collapse eventKey="0">
              <div className="info-table ">
                <ul className="basic-info">
                  {EntityData?.basicinfo.map((data, index) => (
                    <li
                      key={index}
                      title={
                        entityResult
                          ? formatValue(
                              entityResult[data.api_name],
                              data.api_name
                            )
                          : "-"
                      }
                    >
                      <>
                        <span>
                          {["text", "description"].includes(data.icontype) ? (
                            <MdOutlineSubtitles />
                          ) : (
                            <IoCalendarClearOutline />
                          )}
                        </span>
                        {entityResult
                          ? formatValue(
                              entityResult[data.api_name],
                              data.api_name
                            )
                          : "-"}
                      </>
                    </li>
                  ))}
                </ul>
              </div>
            </Accordion.Collapse>
          </Accordion>
          <div className="description-div">
            <div className="description-box">
              <div className="des-header">
                <h4>
                  <GrNotes />
                  Description
                </h4>
                {/* <button>
                  <RiEdit2Line />
                </button> */}
              </div>

              <p>{displayedDescription}</p>
              {description.length >= 100 && (
                <span
                  onClick={handleToggleDescription}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  {showFullDescription ? "Show Less" : "Show More..."}
                </span>
              )}
            </div>
          </div>
          <Accordion defaultActiveKey="0">
            <CustomToggle eventKey="0">
              <h4>Additional Information</h4>
              <span>
                <IoIosArrowDown />
              </span>
            </CustomToggle>
            <Accordion.Collapse eventKey="0">
              <div className="info-table">
                <ul className="adition-info">
                  {EntityData?.additionalinfo.map((data, index) => (
                    <li key={index}>
                      <p>{data.labeltext}</p>
                      <span
                        title={
                          entityResult
                            ? formatValue(
                                entityResult[data.api_name],
                                data.api_name
                              )
                            : "-"
                        }
                      >
                        {entityResult
                          ? formatValue(
                              entityResult[data.api_name],
                              data.api_name
                            )
                          : "-"}
                      </span>
                    </li>
                  ))}
                </ul>
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

const formatValue = (value, apiName) => {
  if (!value || value.length === 0) {
    return "-";
  }

  if (apiName === "utbl_Workitem_column30") {
    return moment(value, "MM/DD/YYYY h:mm:ss A").format("MM/DD/YYYY");
  }

  return value;
};
