/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import { useState } from "react";
//? Assets
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";
//? Components
import ArcSingleSelect from "@/components/arccomponents/ui-components/ArcSingleSelect/ArcSingleSelect";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
//? CSS

//? Images

//? JSON File

//? Icons
import { MdKeyboardArrowDown } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { RiBracesFill } from "react-icons/ri";
// *******~ Import ~******** //
const FieldList = ["Account", "Contact", "Lead", "Opportunity"];
const FieldOption = [
  "First Name",
  "Last Name",
  "Full Name",
  "Email",
  "Account",
];

const InsertFields = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState(FieldList[0]);
  const [selectedFieldOption, setSelectedFieldOption] = useState("");
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOptions = FieldOption.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSelectField = (field) => {
    setSelectedField(field);
  };
  const handleSelectOption = (option) => {
    if (option) {
      setSelectedFieldOption(option);
      setShowPopover(false);
    }
  };
  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom-start"
        rootClose
        show={showPopover}
        onToggle={(show) => setShowPopover(show)}
        // enforceFocus={false}
        overlay={
          <Popover className={`arc-popover mail-insert-fields`}>
            <Popover.Body>
              <div className="arc-popover-body">
                <div className="arc-popover-main">
                  <ul className="field-list">
                    {FieldList.map((list, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelectField(list)}
                        className={selectedField === list ? "active" : ""}
                      >
                        {list}
                      </li>
                    ))}
                  </ul>
                  <div className="field-list-options">
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                    <ul className="field-option">
                      {filteredOptions.length === 0 ? (
                        <li>Not found</li>
                      ) : (
                        filteredOptions.map((option, index) => (
                          <li
                            key={index}
                            onClick={() => handleSelectOption(option)}
                            className={
                              selectedFieldOption === option ? "active" : ""
                            }
                          >
                            {option}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <button
          className={`arc-popover-button ${showPopover ? "active" : null}`}
        >
          <RiBracesFill /> Insert Fields
          <span>
            <MdKeyboardArrowDown />
          </span>
        </button>
      </OverlayTrigger>
    </>
  );
};

export default InsertFields;
