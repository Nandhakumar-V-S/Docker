import ArcNumberFormatting from "@/components/arccomponents/ui-components/ArcNumFormat/ArcNumFormat";
import moment from "moment";
import React, { useState, useContext } from "react";
//? Assets
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { IoIosArrowDown } from "react-icons/io";
import AccordionContext from "react-bootstrap/AccordionContext";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { ArcIconComponents360 } from "@/components/arccomponents/ArcIcon";
import { IoPricetagOutline } from "react-icons/io5";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { FaRegEdit } from "react-icons/fa";
import { AttachFile } from "./DetailsForm";
import ArcSingleSelect from "@/components/arccomponents/ui-components/ArcSingleSelect/ArcSingleSelect";
import ArcTagAdd from "@/components/arccomponents/ui-components/ArcCustomTag/ArcTagAdd";
export const PeopleDetails = () => {
  const [selectedItem, setSelectedItem] = useState("David Brown");
  // const items = [
  //   "Emily Johnson",
  //   "Michael Smith",
  //   "Jessica Williams",
  //   "David Brown",
  //   "Amanda Davis",
  //   "Joshua Miller",
  //   "Ashley Wilson",
  // ];
  const items = [
    { value: "Emily Johnson", label: "Emily Johnson" },
    { value: "Michael Smith", label: "Michael Smith" },
    { value: "Jessica Williams", label: "Jessica Williams" },
    { value: "David Brown", label: "David Brown" },
    { value: "Amanda Davis", label: "Amanda Davis" },
    { value: "Joshua Miller", label: "Joshua Miller" },
  ];
  const handleSelect = (item) => {
    setSelectedItem(item);
  };
  return (
    <React.Fragment>
      <div className="information">
        <Accordion defaultActiveKey="0">
          <CustomToggle eventKey="0">
            <h4>People</h4>
            <span>
              <IoIosArrowDown />
            </span>
          </CustomToggle>
          <Accordion.Collapse eventKey="0">
            <div className="info-table ">
              <ul className="basic-info detail_v4">
                {/* {[
                  {
                    fieldlabeltext: "Assigned to",
                    fieldapiname: "2 Days",
                    field_icon: "user",
                  },
                  {
                    fieldlabeltext: "Re-Assigned to",
                    fieldapiname: "5 Days",
                    field_icon: "user",
                  },
                ].map((fields, index) => (
                  <li key={index}>
                    <>
                      <span className={`icon ${fields.field_icon}`}>
                        <IconLabel item={fields?.field_icon} />
                      </span>
                      <p className="info">
                        <span>{fields?.fieldlabeltext}</span>
                        {formatValue(fields?.fieldapiname, fields?.field_icon)}
                      </p>
                    </>
                  </li>
                ))} */}
                <li>
                  <span className="icon user">
                    <IconLabel item="user" />
                  </span>
                  <p className="info">
                    <span className="owner-details">Assigned to</span>{" "}
                    {/* <DropdownButton
                      id="dropdown-item-button"
                      title={selectedItem}
                    >
                      <div className="item-div">
                        {items.map((data, index) => (
                          <Dropdown.Item
                            key={index}
                            as="button"
                            className={selectedItem === data ? "active" : ""}
                            onClick={() => handleSelect(data)}
                          >
                            {data}
                          </Dropdown.Item>
                        ))}
                      </div>
                    </DropdownButton> */}
                    <ArcSingleSelect options={items}
                    defaultValue={{
                      value: "Emily Johnson",
                      label: "Emily Johnson",
                    }}
                     />
                  </p>
                </li>
                <li>
                  <span className="icon user">
                    <IconLabel item="user" />
                  </span>
                  <p className="info">
                    <span className="owner-details">Approver</span>{" "}
                    <ArcSingleSelect
                      options={items}
                      // Label="Select a Name"
                      PlaceHolder="Choose..."
                      defaultValue={{
                        value: "Michael Smith",
                        label: "Michael Smith",
                      }} // Default selected option
                    />
                    {/* <span></span> */}
                  </p>
                </li>
                <li>
                  <span className="icon user">
                    <IconLabel item="user" />
                  </span>
                  <p className="info">
                    <span className="owner-details">Observers</span>{" "}
                    <ArcSingleSelect options={items}
                    defaultValue={{
                      value: "David Brown",
                      label: "David Brown",
                    }} 
                    />
                    {/* <span><ArcSingleSelect /></span> */}
                  </p>
                </li>
              </ul>
            </div>
          </Accordion.Collapse>
        </Accordion>
      </div>
    </React.Fragment>
  );
};
export const OwnerDetails = () => {
  const [selectedItem, setSelectedItem] = useState("David Brown");
  const items = [
    "Emily Johnson",
    "Michael Smith",
    "Jessica Williams",
    "David Brown",
    "Amanda Davis",
    "Joshua Miller",
    "Ashley Wilson",
  ];
  const handleSelect = (item) => {
    setSelectedItem(item);
  };
  return (
    <React.Fragment>
      <div className="information">
        <Accordion defaultActiveKey="0">
          <CustomToggle eventKey="0">
            <h4>Ticket Details</h4>
            <span>
              <IoIosArrowDown />
            </span>
          </CustomToggle>
          <Accordion.Collapse eventKey="0">
            <div className="info-table ">
            <ul className="basic-info detail_v4">
                {[
                  {
                    fieldlabeltext: "Ticket Owner -",
                    fieldapiname: "Annamalai V",
                    field_icon: "user",
                  },
                  {
                    fieldlabeltext: "Email -",
                    fieldapiname: "vannamalai@innospire.com",
                    field_icon: "mail",
                  },
                  {
                    fieldlabeltext: "Contact No -",
                    fieldapiname: "+91 00000 00000",
                    field_icon: "phone",
                  },
                ].map((fields, index) => (
                  <li key={index}>
                    <>
                      <span className={`icon ${fields.field_icon}`}>
                        <IconLabel item={fields?.field_icon} />
                      </span>
                      <p className="info">
                        <span>{fields?.fieldlabeltext}</span>
                        {formatValue(fields?.fieldapiname, fields?.field_icon)}
                      </p>
                    </>
                  </li>
                ))}
              </ul>
            </div>
          </Accordion.Collapse>
        </Accordion>
      </div>
    </React.Fragment>
  );
};

export const AssociateDetails = () => {
  const [selectedItem, setSelectedItem] = useState("David Brown");
  const items = [
    "Emily Johnson",
    "Michael Smith",
    "Jessica Williams",
    "David Brown",
    "Amanda Davis",
    "Joshua Miller",
    "Ashley Wilson",
  ];
  const handleSelect = (item) => {
    setSelectedItem(item);
  };
  return (
    <React.Fragment>
      <div className="information">
        <Accordion defaultActiveKey="0">
          <CustomToggle eventKey="0">
            <h4>Associate</h4>
            <span>
              <IoIosArrowDown />
            </span>
          </CustomToggle>
          <Accordion.Collapse eventKey="0">
            <div className="info-table ">
            <ul className="basic-info detail_v4">
                {[
                  {
                    fieldlabeltext: "Ticket Owner - ",
                    fieldapiname: "Annamalai V ",
                    field_icon: "user",
                  },
                  {
                    fieldlabeltext: "Email -",
                    fieldapiname: "vannamalai@innospire.com",
                    field_icon: "mail",
                  },
                  {
                    fieldlabeltext: "Contact No -",
                    fieldapiname: "+91 00000 00000",
                    field_icon: "phone",
                  },
                ].map((fields, index) => (
                  <li key={index}>
                    <>
                      {/* <span className={`icon ${fields.field_icon}`}>
                        <IconLabel item={fields?.field_icon} />
                      </span> */}
                      <p className="info">
                        <span>{fields?.fieldlabeltext}</span>
                        {formatValue(fields?.fieldapiname, fields?.field_icon)}
                      </p>
                    </>
                  </li>
                ))}
              </ul>
            </div>
          </Accordion.Collapse>
        </Accordion>
      </div>
    </React.Fragment>
  );
};

export const ActivitiesPanel = () => {
  const [selectedItem, setSelectedItem] = useState("Ticket 001");
  const items = ["Ticket 001", "Ticket 002", "Ticket 003", "Ticket 004", "Ticket 005"];
  const handleSelect = (item) => {
    setSelectedItem(item);
  };
  return (
    <React.Fragment>
      <div className="information">
        <Accordion defaultActiveKey="0">
          <CustomToggle eventKey="0">
            <h4>Activities</h4>
            <span>
              <IoIosArrowDown />
            </span>
          </CustomToggle>
          <Accordion.Collapse eventKey="0">
            <div className="info-table ">
              <ul className="basic-info detail_v4">
                {[
                  {
                    fieldlabeltext: "Created On",
                    fieldapiname: "12/01/2025",
                    field_icon: "date",
                  },
                  {
                    fieldlabeltext: "Assigned On",
                    fieldapiname: "24/01/2025",
                    field_icon: "date",
                  },
                  {
                    fieldlabeltext: "Re-Assigned On",
                    fieldapiname: "24/01/2025",
                    field_icon: "date",
                  },
                  {
                    fieldlabeltext: "Age",
                    fieldapiname: "1 Day",
                    field_icon: "times",
                  },
                  {
                    fieldlabeltext: "Overdue By",
                    fieldapiname: "19 Hrs",
                    field_icon: "times",
                  },
                ].map((fields, index) => (
                  <li key={index}>
                    <>
                      <span className={`icon ${fields.field_icon}`}>
                        <IconLabel item={fields?.field_icon} />
                      </span>
                      <p className="info">
                        <span>{fields?.fieldlabeltext}</span>
                        {formatValue(fields?.fieldapiname, fields?.field_icon)}
                      </p>
                    </>
                  </li>
                ))}
                <li>
                  <span className="icon">
                    <IconLabel item="ticket" />
                  </span>
                  <p className="info">
                    <span>Associated Ticket</span>{" "}
                    <DropdownButton
                      id="dropdown-item-button"
                      title={selectedItem}
                    >
                      <div className="item-div">
                        {items.map((data, index) => (
                          <Dropdown.Item
                            key={index}
                            as="button"
                            className={selectedItem === data ? "active" : ""}
                            onClick={() => handleSelect(data)}
                          >
                            {data}
                          </Dropdown.Item>
                        ))}
                      </div>
                    </DropdownButton>
                  </p>
                </li>
              </ul>
            </div>
          </Accordion.Collapse>
        </Accordion>
      </div>
    </React.Fragment>
  );
};
const formatValue = (value, apiName) => {
  if (!value || value.length === 0) {
    return "-";
  }

  if (apiName === "currency") {
    const arcFormattedNumber = ArcNumberFormatting({
      number: value,
      currency: "USD",
    });
    console.log(
      arcFormattedNumber,
      "arcFormattedNumber",
      typeof arcFormattedNumber
    );

    return arcFormattedNumber;
  } else if (apiName === "time") {
    return moment(value, "MM/DD/YYYY h:mm:ss A").format("h:mm:ss A");
  }

  return value;
};

const IconLabel = ({ item }) => {
  const IconComponent =
    ArcIconComponents360[item.toLowerCase()] || ArcIconComponents360.default;
  return <React.Fragment>{IconComponent}</React.Fragment>;
};

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

export const TagSection = ({}) => {
  return (
    <>
      <ArcTagAdd />
    </>
  );
};
// export const TagSection = ({ Detail360Info, Panel }) => {
//   const TagFields = Panel?.fields[0];
//   console.log(Detail360Info, TagFields);
//   const TagValues = Detail360Info?.[TagFields?.fieldapiname] || [];
//   // Parse the JSON string
//   const parsedData = Array.isArray(TagValues)
//     ? TagValues
//     : JSON.parse(TagValues);
//   // Extract the name values
//   //   const nameValues = parsedData.map((item) => ({
//   //     name: item.name,
//   //     color: item.colorcode,
//   //   }));
//   const nameValues = [
//     { name: "test001", color: "1" },
//     { name: "test002", color: "2" },
//     { name: "test003", color: "3" },
//     { name: "test004", color: "4" },
//     { name: "test005", color: "5" },
//   ];
//   console.log(nameValues);
//   return (
//     <React.Fragment>
//       <div className="tag-container">
//         {/* <pre>{JSON.stringify(TagValues, null, 2)}</pre> */}
//         {/* <pre>{JSON.stringify(nameValues, null, 2)}</pre> */}
//         <p className="title">
//           <IoPricetagOutline />
//           Tag
//         </p>
//         <div className="tag-group">
//           {nameValues?.length === 0 ? (
//             <span className="tag">-</span>
//           ) : (
//             <>
//               {nameValues.slice(0, 2).map((data, index) => (
//                 <span className={`tag tag-color-${data.color}`} key={index}>
//                   {data.name}
//                 </span>
//               ))}

//               {nameValues.length > 2 && (
//                 <ArcToolTip
//                   HoverText={
//                     <>
//                       <p className="title detail360-leftpanel">
//                         {" "}
//                         <IoPricetagOutline /> Tag
//                       </p>
//                       {nameValues.slice(2).map((data, index) => (
//                         <p
//                           className={`tags detail360-leftpanel tag-color-${data.color}`}
//                           key={index}
//                         >
//                           {data.name}
//                         </p>
//                       ))}
//                     </>
//                   }
//                   Tooltipclass={"grid-tooltip withtag-tooltip"}
//                   BtnName={
//                     <span className="tag-count">+{nameValues.length - 2}</span>
//                   }
//                   Placement="bottom"
//                   as="span"
//                 />
//               )}
//             </>
//           )}

//           {/* <span className="tag tag-color-2">Contact</span>
//             <span className="tag tag-color-3">Hot</span> */}
//           <ArcToolTip
//             HoverText={"Edit Tag"}
//             BtnName={<FaRegEdit />}
//             Placement="left"
//             as="span"
//             className="edit"
//           />
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

export const AttachmentDetails = () => {
  return (
    <React.Fragment>
      <div className="information">
        <Accordion defaultActiveKey="0">
          <CustomToggle eventKey="0">
            <h4>Attachments</h4>
            <span>
              <IoIosArrowDown />
            </span>
          </CustomToggle>
          <Accordion.Collapse eventKey="0">
            <div className="info-table ">
              <AttachFile />
            </div>
          </Accordion.Collapse>
        </Accordion>
      </div>
    </React.Fragment>
  );
};
