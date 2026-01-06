// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets

import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
//? Components

import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
//? CSS

//? Images

//? JSON File

//? Icons
import { MdOutlineClear } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PiUserSquare } from "react-icons/pi";
import { BsClipboardData } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
// *******~ Import ~******** //
// const MenuGroupsd = [];

const MenuGroups = [
  {
    title: "Preference",
    icon: <IoSettingsOutline />,
    menulist: [
      {
        label: "General",
        path: "general",
      },
      {
        label: "Notification",
        path: "notification",
      },
      {
        label: "Admin Setting",
        path: "adminsetting",
      },
      {
        label: "Components",
        path: "ui-components",
      },
    ],
  },
  {
    title: "Account Management",
    icon: <PiUserSquare />,
    menulist: [
      {
        label: "Audit Log",
        path: "auditlog",
      },
      {
        label: "Security",
        path: "security",
      },
    ],
  },
  {
    title: "Data Management",
    icon: <BsClipboardData />,
    menulist: [
      {
        label: "Entity",
        path: "entity",
      },
    ],
  },
];

export const Sidebar = () => {
  const [ShowSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMenuGroups = MenuGroups.map((group) => {
    const filteredMenuList = group.menulist.filter((item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...group, menulist: filteredMenuList };
  }).filter((group) => group.menulist.length > 0);
  return (
    <React.Fragment>
      <div className="setting-header">
        {ShowSearch ? (
          <div className="search-menu">
            <Form.Control
              autoFocus={true}
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <ArcToolTip
              as="span"
              className="clear-btn"
              HoverText="Close"
              BtnName={<MdOutlineClear />}
              Placement="left"
              onClick={() => {
                setShowSearch(false);
                setSearchTerm("");
              }}
            />
          </div>
        ) : (
          <>
            <h4>Settings</h4>
            <span
              onClick={() => {
                setShowSearch(true);
              }}
            >
              <IoSearchSharp />
            </span>
          </>
        )}
      </div>
      <ul className="menu-container">
        {filteredMenuGroups.map((MenuGroup, groupindex) => (
          <li key={groupindex} className="menu-group">
            <h5>
              <span>{MenuGroup.icon}</span> {MenuGroup.title}
            </h5>
            <ul>
              {MenuGroup.menulist.map((menu, index) => (
                <li key={index}>
                  <NavLink
                    to={menu.path}
                    className={({ isActive }) =>
                      isActive ? "active" : "inactive"
                    }
                  >
                    <span>
                      <MdOutlineKeyboardArrowRight />
                    </span>{" "}
                    {menu.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};
