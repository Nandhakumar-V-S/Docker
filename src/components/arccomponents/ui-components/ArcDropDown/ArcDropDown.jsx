// *******~ Import ~******** //
//? React
import { useState } from "react";
//? Assets
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons
import { IoIosArrowDown } from "react-icons/io";
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";

// *******~ Import ~******** //

export const ArcDropDownDefault = ({ Title, DropdownItems, className }) => {
  return (
    <>
      <div className={`arc-dropdown ${className}`}>
        <DropdownButton
          align="end"
          id="dropdown-item-button"
          title={
            <>
              {Title}
              <span>
                <IoIosArrowDown />
              </span>
            </>
          }
        >
          <div className="item-div">
            {DropdownItems.map((data, index) => (
              <>
                <Dropdown.Item
                  eventKey={data}
                  as={Link}
                  to={data.Url}
                  key={index}
                >
                  {data.Icon && <>{data.Icon}</>}
                  {data.Title}
                </Dropdown.Item>
              </>
            ))}
          </div>
        </DropdownButton>
      </div>
    </>
  );
};

export const ArcDropDownControled = ({
  ArcDropDownControledData,
  SelectedValue,
  setSelectedValue,
  className,
}) => {
  const handleSelect = (eventKey) => {
    setSelectedValue(eventKey);
  };
  return (
    <>
      <div className={`arc-dropdown-type-1 ${className}`}>
        <span className="status-color"></span>
        <DropdownButton
          id="dropdown-item-button"
          title={SelectedValue ? SelectedValue : "Select"}
          onSelect={handleSelect}
        >
          <div className="item-div">
            {ArcDropDownControledData &&
              ArcDropDownControledData.map((data, index) => (
                <Dropdown.Item eventKey={data.value} as="button" key={index}>
                  {data.value}
                </Dropdown.Item>
              ))}
          </div>
        </DropdownButton>
      </div>
    </>
  );
};

export const ArcDropDownControledSearchIcon = ({
  ArcDropDownControledData,
  SelectedValue,
  setSelectedValue,
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSelect = (eventKey) => {
    setSelectedValue(eventKey);
  };
  // Filter the dropdown data based on searchTerm
  const filteredData =
    ArcDropDownControledData &&
    ArcDropDownControledData.filter((data) =>
      data.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  return (
    <>
      <div className={`arc-dropdown ${className}`}>
        <DropdownButton
          title={
            <>
              {SelectedValue ? SelectedValue : "Select"}
              <span>
                <IoIosArrowDown />
              </span>
            </>
          }
          onSelect={handleSelect}
        >
          <div className="item-div">
            <ArcTextBox
              Label=""
              ClassName=""
              Type="text"
              PlaceHolder="Search"
              Name="firstname"
              Required={false}
              onChange={(e) => setSearchTerm(e.target.value)}
              ReadOnly={false}
              Value={searchTerm}
            />

            {filteredData.length === 0 ? (
              <p className="arc-not-found-text">Data Not Found</p>
            ) : (
              filteredData.map((data, index) => (
                <Dropdown.Item eventKey={data.value} as="button" key={index}>
                  {data.Icon && <>{data.Icon}</>} {data.value}
                </Dropdown.Item>
              ))
            )}
          </div>
        </DropdownButton>
      </div>
    </>
  );
};
