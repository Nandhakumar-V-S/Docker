/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect, useContext } from "react";
//? Assets
import Form from "react-bootstrap/Form";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
//? Components
import { ArcFaild } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";
//? CSS

//? Images

//? JSON File

//? Icons
import { RiListSettingsLine } from "react-icons/ri";
import { GrDrag } from "react-icons/gr";

// *******~ Import ~******** //

const QuickFilterSetting = ({
  mappedCheckboxes,
  setMappedCheckboxes,
  unmappedCheckboxes,
  setUnmappedCheckboxes,
  searchTerm,
  setSearchTerm,
  filterData,
  relevantFilters,
  handleArcOffCanvaClose,
  handleApplyButtonClick,
}) => {
  // ~ State to track true count in Quick Filter
  const [trueCount, setTrueCount] = useState(0);
  // Function to calculate true count
  useEffect(() => {
    const calculateTrueCount = () => {
      const mappedTrueCount =
        Object.values(mappedCheckboxes).filter(Boolean).length;
      const unmappedTrueCount =
        Object.values(unmappedCheckboxes).filter(Boolean).length;
      return mappedTrueCount + unmappedTrueCount;
    };

    setTrueCount(calculateTrueCount());
  }, [mappedCheckboxes, unmappedCheckboxes]); // Recalculate count when checkboxes change
  // ~ State to track true count in Quick Filter
  // ~ handleCheckboxChange Based on filter Count
  const handleCheckboxChange = (id, isChecked, SetCheckState) => {
    // alert(isChecked);
    SetCheckState((prevState) => {
      // Adjust count based on the incoming checkbox value
      const newTrueCount = isChecked ? trueCount + 1 : trueCount - 1;

      // Prevent state update if trueCount exceeds 5
      if (newTrueCount > 5 && isChecked) {
        // alert("You cannot select more than 5 checkboxes!");
        ArcFaild({
          Title: "Maximum Quick Filters Reached",
          Message: "Please deselect a Quick Filter to add a new one.",
          position: "top-right",
        });
        return prevState; // Return previous state unchanged
      }

      // Update state if trueCount is within the limit
      return {
        ...prevState,
        [id]: isChecked,
      };
    });
  };
  // ~ handleCheckboxChange Based on filter Count
  return (
    <React.Fragment>
      <div className="quickfilter with-setting">
        <div className="quickfilter-header">
          <h3>Quick Filter Setting</h3>
          <ContextAwareToggle eventKey="0">
            <RiListSettingsLine />
          </ContextAwareToggle>
        </div>
        <div className="quickfilter-content">
          {/* <Accordion.Collapse eventKey="0"> */}
          <>
            <div className="filter-header">
              <Form.Control
                className="search-contact"
                type="text"
                placeholder="Search fields"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="content quick-filter">
              {/* <pre>{JSON.stringify(filterData, null, 2)}</pre> */}
              {/* <pre>{JSON.stringify(mappedCheckboxes, null, 2)}</pre> */}
              {/* <pre>{JSON.stringify(unmappedCheckboxes, null, 2)}</pre> */}
              {/* <p>Total True Count: {trueCount}</p> */}
              <div className="checkbox-div visible-data">
                {filterData
                  .filter(
                    (item) =>
                      item.ismapped &&
                      item.isquickfilter &&
                      item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(
                    (item, index) =>
                      // Rendering displayname if ismapped is true
                      item.ismapped && (
                        <label key={index}>
                          <GrDrag />{" "}
                          <input
                            type="checkbox"
                            value={item.name}
                            onChange={(e) =>
                              handleCheckboxChange(
                                item.id,
                                e.target.checked,
                                setMappedCheckboxes
                              )
                            }
                            checked={mappedCheckboxes[item.id] ?? false}
                            disabled={relevantFilters.includes(item.api_name)}
                            style={{
                              cursor: relevantFilters.includes(item.api_name)
                                ? "not-allowed"
                                : "pointer",
                            }}
                          />
                          {item.name}
                        </label>
                      )
                  )}
                {/* <span>Below fields not shown in filter</span> */}
              </div>
              {/* <p>Fields not shown in table</p> */}
              <div className="checkbox-div not-visible-data">
                {filterData
                  .filter(
                    (item) =>
                      !item.ismapped &&
                      item.isquickfilter &&
                      item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(
                    (item, index) =>
                      // Rendering displayname if ismapped is false
                      !item.ismapped && (
                        <label key={index}>
                          <GrDrag />
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              handleCheckboxChange(
                                item.id,
                                e.target.checked,
                                setUnmappedCheckboxes
                              )
                            }
                            checked={unmappedCheckboxes[item.id] ?? false}
                            disabled={relevantFilters.includes(item.api_name)}
                            style={{
                              cursor: relevantFilters.includes(item.api_name)
                                ? "not-allowed"
                                : "pointer",
                            }}
                          />
                          {item.name}
                        </label>
                      )
                  )}
              </div>
            </div>
            <div className="footer-div">
              <button onClick={handleArcOffCanvaClose} className="cancel">
                Cancel
              </button>

              <button
                onClick={() => {
                  handleApplyButtonClick();
                }}
              >
                Apply Quick Filter
              </button>
            </div>{" "}
          </>
        </div>
      </div>
    </React.Fragment>
  );
};
export default QuickFilterSetting;

function ContextAwareToggle({ children, eventKey, callback, className }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      className={`${isCurrentEventKey ? "active" : null} ${className}`}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}
