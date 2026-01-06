import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

//json
import EntityData from "./entity.json";
import ProjectData from "./Project360.json";
import { MdOutlineSubtitles, MdOutlineSystemUpdateAlt } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

import { Accordion, useAccordionButton } from "react-bootstrap";
import AccordionContext from "react-bootstrap/AccordionContext";
import { IoCalendarClearOutline } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";

function ContactDetails() {
  const dispatch = useDispatch();
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  const [UpdateStatus360show, setUpdateStatus360show] = useState(false);
  const selectEntityDetails = (state) => state.searchEntity.entityDetails;
  const selectEntityStatus = (state) => state.searchEntity.entityDetails;

  const entityDetails = useSelector(selectEntityDetails);
  const entityStatus = useSelector(selectEntityStatus);

  const entityResults = entityDetails?.result?.data;
  const entityResultsData = entityResults && entityResults[0];
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

  let description;
  if (previousPathName === "/project") {
    description =
      entityResults && entityResults.length > 0
        ? entityResults[0][ProjectData.descriptionname_apiname]
          ? entityResults[0][ProjectData.descriptionname_apiname].length === 0
            ? "-"
            : entityResults[0][ProjectData.descriptionname_apiname]
          : "-"
        : "-";
  } else {
    description =
      entityResults && entityResults.length > 0
        ? entityResults[0][EntityData.descriptionname_apiname]
          ? entityResults[0][EntityData.descriptionname_apiname].length === 0
            ? "-"
            : entityResults[0][EntityData.descriptionname_apiname]
          : "-"
        : "-";
  }

  //   const description =
  //     entityResults && entityResults.length > 0
  //       ? entityResults[0][EntityData.descriptionname_apiname]
  //         ? entityResults[0][EntityData.descriptionname_apiname].length === 0
  //           ? "-"
  //           : entityResults[0][EntityData.descriptionname_apiname]
  //         : "-"
  //       : "-";

  const displayedDescription = showFullDescription
    ? description
    : description.substring(0, 100);
  console.log(entityResults);
  return (
    <>
      <div className="contact-details">
        <div className="contact-header">
          {/* <pre>{JSON.stringify(entityDetails, null, 2)}</pre> */}
          <div className="profile">
            <div className="img-data">
              {
                previousPathName === "/project"
                  ? entityResults && entityResults.length > 0
                    ? entityResults[0][ProjectData.primaryname_apiname]
                      ? entityResults[0][ProjectData.primaryname_apiname]
                          .length === 0
                        ? "-"
                        : entityResults[0][
                            ProjectData.primaryname_apiname
                          ].slice(0, 2) // If the length is not zero, return the value
                      : "-" // If the property doesn't exist, return "-"
                    : "-" // If entityResults is undefined or empty, return "-"
                  : entityResults && entityResults.length > 0
                    ? entityResults[0][EntityData.primaryname_apiname]
                      ? entityResults[0][EntityData.primaryname_apiname]
                          .length === 0
                        ? "-" // If the length is zero, return "-"
                        : entityResults[0][
                            EntityData.primaryname_apiname
                          ].slice(0, 2) // If the length is not zero, return the value
                      : "-" // If the property doesn't exist, return "-"
                    : "-" // If entityResults is undefined or empty, return "-"
              }
            </div>
            <div className="name-email">
              <p
                title={
                  previousPathName === "/project"
                    ? entityResults && entityResults.length > 0
                      ? entityResults[0][ProjectData.primaryname_apiname]
                        ? entityResults[0][ProjectData.primaryname_apiname]
                            .length === 0
                          ? "-" // If the length is zero, return "-"
                          : entityResults[0][ProjectData.primaryname_apiname] // If the length is not zero, return the value
                        : "-" // If the property doesn't exist, return "-"
                      : "-"
                    : entityResults && entityResults.length > 0
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
                  previousPathName === "/project"
                    ? entityResults && entityResults.length > 0
                      ? entityResults[0][ProjectData.primaryname_apiname]
                        ? entityResults[0][ProjectData.primaryname_apiname]
                            .length === 0
                          ? "-" // If the length is zero, return "-"
                          : entityResults[0][ProjectData.primaryname_apiname] // If the length is not zero, return the value
                        : "-" // If the property doesn't exist, return "-"
                      : "-" // If entityResults is undefined or empty, return "-"
                    : entityResults && entityResults.length > 0
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
                  previousPathName === "/project"
                    ? entityResults && entityResults.length > 0
                      ? entityResults[0][ProjectData.secondaryname_apiname]
                        ? entityResults[0][ProjectData.secondaryname_apiname]
                            .length === 0
                          ? "-" // If the length is zero, return "-"
                          : entityResults[0][ProjectData.secondaryname_apiname] // If the length is not zero, return the value
                        : "-" // If the property doesn't exist, return "-"
                      : "-" // If entityResults is undefined or empty, return "-"
                    : entityResults && entityResults.length > 0
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
              //   onClick={() => {
              //     setUpdateStatus360show(true);
              //     HandleGedDefaultInputs();
              //   }}
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
                  {(previousPathName === "/project"
                    ? ProjectData
                    : EntityData
                  )?.basicinfo.map((data, index) => (
                    <li
                      key={index}
                      title={
                        entityResult
                          ? data.api_name == "column10_text"
                            ? "Project Type"
                            : data.api_name == "column17"
                              ? "Project Name"
                              : "-"
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
                  {(previousPathName === "/project"
                    ? ProjectData
                    : EntityData
                  )?.additionalinfo.map((data, index) => (
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
}

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
