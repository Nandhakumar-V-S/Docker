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
import { RiMailSettingsLine } from "react-icons/ri";
// *******~ Import ~******** //
const FieldOption = [
  "Template 1",
  "Template 2",
  "Template 3",
  "Template 4",
  "Template 5",
];

const Usetemplate = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedFieldOption, setSelectedFieldOption] = useState("");
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOptions = FieldOption.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <RiMailSettingsLine /> Use Template
          <span>
            <MdKeyboardArrowDown />
          </span>
        </button>
      </OverlayTrigger>
    </>
  );
};

export default Usetemplate;
