// *******~ Import ~******** //
//? React
import React from "react";
//? Assets

//? Components
import ArcWidget from "@/components/arccomponents/widget-v2/arcwidget";
//? CSS

//? Images

//? JSON File

//? Icons

import { LiaBoxOpenSolid } from "react-icons/lia";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { BiTask } from "react-icons/bi";
import { TbCalendarTime } from "react-icons/tb";
import { TbPhoneCalling } from "react-icons/tb";
import { LiaSmsSolid } from "react-icons/lia";
import { TfiEmail } from "react-icons/tfi";
import { RiMailSendLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdSwitchAccount } from "react-icons/md";
import { PiCurrencyCircleDollarBold } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
// *******~ Import ~******** //

const AddButtonWidget = ({ Borderbottom, Title }) => {
  const AddDataList = [
    {
      title: "Quick Actions",
      list: [
        {
          label: "Associate Ticket",
          icon: <MdOutlineAccountCircle />,
        },
        {
          label: "Service Cancellation",
          icon: <MdSwitchAccount />,
        },
        {
          label: "Payment Actions",
          icon: <PiCurrencyCircleDollarBold />,
        },
        {
          label: "Customer Query",
          icon: <LiaBoxOpenSolid />,
        },
        {
          label: "Add Quote",
          icon: <HiOutlineDocumentText />,
        },
      ],
    },
    {
      title: "Technical Actions",
      list: [
        {
          label: "Technical Support",
          icon: <BiTask />,
        },
        {
          label: "It Helpdesk Support",
          icon: <TbCalendarTime />,
        },
        {
          label: "Access for repository Dropbox",
          icon: <TbPhoneCalling />,
        },
        // {
        //   label: "Send SMS",
        //   icon: <LiaSmsSolid />,
        // },
      ],
    },
    {
      title: "Request Actions",
      list: [
        {
          label: "Feature Requests",
          icon: <TfiEmail />,
        },
        {
          label: "Create Template",
          icon: <RiMailSendLine />,
        },
        {
          label: "Leave Requests",
          icon: <BiMoneyWithdraw />,
        },
        {
          label: "File Access Requets",
          icon: <BiMoneyWithdraw />,
        },
      ],
    },
  ];
  return (
    <React.Fragment>
      <ArcWidget className={"add-btn-widget"} Borderbottom={Borderbottom}>
        <div className="widget-header">
          <h4>{Title}</h4>
          <div className="actions">
            <span className="action">
              <BsThreeDotsVertical />
            </span>
          </div>
        </div>
        <div className="action-group">
          {AddDataList.map((data, index) => (
            <React.Fragment key={index}>
              <ul>
                <h5>{data.title}</h5>
                {data.list.map((data, index) => (
                  <React.Fragment key={index}>
                    <li>
                      <button>
                        <span>{data.icon}</span>
                        <p title={data.label}>{data.label}</p>
                      </button>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </React.Fragment>
          ))}
        </div>
      </ArcWidget>
    </React.Fragment>
  );
};
export default AddButtonWidget;
