/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React from "react";
//? Assets

//? Components

//? CSS

//? Images

//? JSON File

//? Icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
// *******~ Import ~******** //

const MailList = ({ MailListData, HandleMail, Title }) => {
  return (
    <React.Fragment>
      <div className="mail-header">
        <div className="mail-title">
          {/* <input type="checkbox" name="mail" /> */}
          <h4>{Title}</h4>
        </div>
        <div className="search">
          <input type="text" placeholder="Search Email" />
          <button>
            <IoMdSearch /> Search
          </button>
        </div>
      </div>
      <ul>
        {[...Array(3)].map((data, index) => (
          <React.Fragment key={index}>
            {MailListData?.map((email, index) => (
              <li key={index} onClick={() => HandleMail()}>
                <div className="mail-info">
                  {/* <div className="mail-checkbox">
                    <input type="checkbox" name="mail" />
                  </div> */}
                  <div className="to-info">
                    <div className="profile">
                      <img src={email.img} alt="" />
                    </div>
                  </div>
                  <div className="info-details">
                    <p className="to-address">
                      {Title === "Inbox" ? email.to : "To:"}
                      <span className="to-id">
                        {Title !== "Inbox" && email.to}&nbsp;
                        {"<" + email.email + ">"}
                      </span>
                      {email.draft && <span className="draft">[Draft]</span>}
                      {Title === "Inbox" && email.unread && (
                        <span className="unread">Unread</span>
                      )}
                    </p>
                    <div className="mail-subject">
                      <p className="subject">{email.subject}</p>
                      <p className="message">{email.message}</p>
                    </div>
                  </div>

                  <div className="mail-action">
                    <div className="day-action">
                      <span className="days-ago">{email.daysAgo}</span>
                      <span className="action">
                        <BsThreeDotsVertical />
                      </span>
                    </div>
                    <span
                      className={`star ${
                        email.starred ? "active" : "inactive"
                      }`}
                    >
                      <FaStar />
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
    </React.Fragment>
  );
};
export default MailList;
