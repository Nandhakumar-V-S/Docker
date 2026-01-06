// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets

import Accordion from "react-bootstrap/Accordion";
import { NavLink } from "react-router-dom";
//? Components

import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
//? CSS

//? Images

//? JSON File

//? Icons

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PiUserSquare } from "react-icons/pi";
import { BsClipboardData } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { RiMailSendLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuMails } from "react-icons/lu";
import { TbMailShare } from "react-icons/tb";
import { MdSettingsPhone } from "react-icons/md";
import { TbMessageDots } from "react-icons/tb";
import { TbDeviceMobileMessage } from "react-icons/tb";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { IoAddCircleOutline } from "react-icons/io5";
import { LuMail } from "react-icons/lu";
import { SlArrowDown } from "react-icons/sl";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { RiMailAddLine } from "react-icons/ri";
import { HiMiniInboxArrowDown } from "react-icons/hi2";
import { RiDraftLine } from "react-icons/ri";
import { TbCalendarTime } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi";
import { RiSpamLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa6";
// *******~ Import ~******** //

const MenuGroups = [
  {
    title: "Mail",
    icon: <RiMailSendLine />,
    menulist: [
      {
        label: "All Mail",
        path: "sentmailsd",
        count: "2,122",
        icon: <LuMails />,
      },
      {
        label: "Inbox",
        path: "inbox",
        count: "27",
        icon: <HiMiniInboxArrowDown />,
      },
      {
        label: "Sent",
        path: "sentmail",
        icon: <FiSend />,
        count: "34",
      },
      {
        label: "Drafts",
        path: "/",
        icon: <RiDraftLine />,
      },
      {
        label: "Scheduled",
        path: "/",
        icon: <TbCalendarTime />,
      },
      {
        label: "Trash",
        path: "/",
        icon: <HiOutlineTrash />,
      },
      {
        label: "Spam",
        path: "/",
        icon: <RiSpamLine />,
      },
      {
        label: "Starred",
        path: "/",
        icon: <FaRegStar />,
      },
    ],
  },
  {
    title: "Bulk Email",
    icon: <LuMails />,
    menulist: [
      {
        label: "Default",
        path: "/",
        icon: <RiDraftLine />,
      },
    ],
  },
  {
    title: "Email Tracking",
    icon: <TbMailShare />,
    menulist: [
      {
        label: "Default",
        path: "/",
        icon: <RiDraftLine />,
      },
    ],
  },
];

export const Sidebar = () => {
  return (
    <React.Fragment>
      <div className="compose-mail">
        <button>
          <RiMailAddLine /> Compose Mail
        </button>
      </div>
      <Accordion defaultActiveKey={[0]} alwaysOpen>
        {MenuGroups.map((MenuGroup, groupindex) => (
          <Accordion.Item eventKey={groupindex} key={groupindex}>
            <Accordion.Header>
              {/* <span className="icon-title">{MenuGroup.icon}</span> */}
              {MenuGroup.title}
              <span className="arrow-icon">
                <IoMdArrowDropdown />
              </span>
            </Accordion.Header>
            <Accordion.Body>
              <ul className="menu-list">
                {MenuGroup.menulist.map((menu, index) => (
                  <li key={index}>
                    <NavLink
                      to={menu.path}
                      className={({ isActive }) =>
                        isActive ? "active" : "inactive"
                      }
                    >
                      {menu.icon}
                      {menu.label}
                      {menu.count && (
                        <span className="count">{menu.count}</span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </React.Fragment>
  );
};
