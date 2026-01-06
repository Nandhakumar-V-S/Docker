/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaFolder } from "react-icons/fa";
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";

const nodes = [
  {
    value: "12334",
    label: "Permission List",
    icon: "folder",
    children: [
      {
        value: "125e4567-e89b-12d353-a456-426614174016",
        label: "View Home",
        ParentpermissionID: "null",
        AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f20033",
        IsActive: false,
        controlType: "checkbox",
      },
      {
        value: "da456-426614174017",
        label: "View Dashboard",
        ParentpermissionID: "null",
        AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f20022",
        IsActive: false,
        controlType: "textbox",
      },
    ],
  },
  {
    value: "67890",
    label: "Role List",
    icon: "user",
    children: [
      {
        value: "125e454367-e89b-12d453-a456-426614174018",
        label: "Admin Access",
        ParentpermissionID: "null",
        AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f2003",
        IsActive: true,
        controlType: "checkbox",
      },
      {
        value: "da456-426614174019",
        label: "User Access",
        ParentpermissionID: "null",
        AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f2004",
        IsActive: false,
        controlType: "textbox",
      },
    ],
  },
  {
    value: "34567e",
    label: "Module Access",
    icon: "folder",
    children: [
      {
        value: "125e4567-e89b-12d3-a456-426614174022",
        label: "Edit Settings",
        ParentpermissionID: "null",
        AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f2007",
        IsActive: true,
        controlType: "checkbox",
      },
      {
        value: "da456-426614174023",
        label: "View Reports",
        ParentpermissionID: "null",
        AppModuleAccessID: "eae87393-23a2-428a-bd65-8bbfea1f2008",
        IsActive: false,
        controlType: "checkbox",
      },
    ],
  },
];

export default function ArcTreeViewV2({ checkboxState, setCheckboxState }) {
  // const [checkboxState, setCheckboxState] = useState([]);

  useEffect(() => {
    const initialState = [];
    nodes.forEach((parent) => {
      parent.children.forEach((child) => {
        if (child.controlType === "checkbox" && child.IsActive) {
          initialState.push({ ...child });
        }
        if (child.children) {
          child.children.forEach((grandchild) => {
            if (grandchild.controlType === "checkbox" && grandchild.IsActive) {
              initialState.push({ ...grandchild });
            }
          });
        }
      });
    });
    setCheckboxState(initialState);
  }, []);

  const handleTextBoxChange = (event, child) => {
    const { value } = event.target;
    setCheckboxState((prevState) => {
      const itemIndex = prevState.findIndex(
        (item) => item.value === child.value
      );

      if (itemIndex !== -1) {
        if (value.trim() === "") {
          // Remove the item if value is empty
          return prevState.filter((item, index) => index !== itemIndex);
        } else {
          // Update the item if value is not empty
          return prevState.map((item, index) =>
            index === itemIndex ? { ...item, textValue: value } : item
          );
        }
      } else {
        // Add the item if it doesn't exist and value is not empty
        if (value.trim() !== "") {
          return [...prevState, { ...child, textValue: value }];
        }
        return prevState; // Return previous state if value is empty and item doesn't exist
      }
    });
  };

  const handleCheckboxChange = (child) => {
    setCheckboxState((prevState) => {
      // Check if the item already exists in the state
      const itemIndex = prevState.findIndex(
        (item) => item.value === child.value
      );

      if (itemIndex !== -1) {
        // If it exists, remove it
        return prevState.filter((item) => item.value !== child.value);
      } else {
        // If it doesn't exist, add it with the new state
        return [...prevState, { ...child, IsActive: true }];
      }
    });
  };
  const defaultActiveKeys = nodes.map((_, index) => index);
  return (
    <React.Fragment>
      <section className="arc-treeview-checkbox-v2">
        <Accordion defaultActiveKey={defaultActiveKeys} alwaysOpen>
          {nodes.map((parent, index) => (
            <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header className="parent-title">
                <i>
                  <IoIosArrowDown />
                </i>
                {ParentTitle(parent)}
              </Accordion.Header>
              <Accordion.Body>
                {parent.children.map((child, index) =>
                  child.controlType === "textbox" ? (
                    <ArcTextBox
                      key={index}
                      Label={child.label}
                      ClassName=""
                      PlaceHolder={"Enter your " + child.label}
                      Name={child.label}
                      Value={
                        checkboxState.find((item) => item.value === child.value)
                          ?.textValue || ""
                      }
                      onChange={(event) => handleTextBoxChange(event, child)}
                    />
                  ) : (
                    <div
                      className={`arc-input-control arc-radiobtn`}
                      key={index}
                    >
                      <div className="radio-check-div">
                        <label>
                          <input
                            type="checkbox"
                            name={child.value}
                            checked={checkboxState.some(
                              (item) =>
                                item.value === child.value && item.IsActive
                            )}
                            onChange={() => {
                              handleCheckboxChange(child);
                            }}
                          />
                          {child.label}
                        </label>
                      </div>
                    </div>
                  )
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        <pre>{JSON.stringify(checkboxState, null, 2)}</pre>
      </section>
    </React.Fragment>
  );
}

const ParentTitle = (value) => {
  return (
    <span className="custom-tag">
      {value.icon === "folder" ? (
        <FaFolder />
      ) : value.icon === "user" ? (
        <FaUserAlt />
      ) : (
        <FaFolder />
      )}
      {value.label}
    </span>
  );
};
