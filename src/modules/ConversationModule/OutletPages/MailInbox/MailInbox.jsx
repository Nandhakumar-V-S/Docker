import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import InboxDetailPopup from "./InboxDetailPopup";
// ~ Images

import Img1 from "@/style/arcstyle/images/mail-profile/1.jpg";
import Img2 from "@/style/arcstyle/images/mail-profile/2.jpg";
import Img3 from "@/style/arcstyle/images/mail-profile/3.jpg";
import Img4 from "@/style/arcstyle/images/mail-profile/4.jpg";

import MailList from "../../components/MailList";

// import Img5 from "@/style/arcstyle/images/mail-profile/5.jpg";
const MailInbox = () => {
  const [ShowInbox, setShowInbox] = useState(false);
  const navigate = useNavigate();
  const HandleInbox = () => {
    // setShowInbox(true);
    navigate("/conversation/inboxdetail");
  };
  return (
    <React.Fragment>
      {/* <InboxDetailPopup
        ArcOffCanvaShow={ShowInbox}
        setArcOffCanvaShow={setShowInbox}
      /> */}
      <section className="inbox-mail-screen">
        <MailList
          MailListData={InboxMailList}
          HandleMail={HandleInbox}
          Title={"Inbox"}
        />
      </section>
    </React.Fragment>
  );
};
export default MailInbox;

export const InboxMailList = [
  {
    to: "Jane Sampleton",
    email: "janesampleton@gmail.com",
    daysAgo: "3 minutes ago",
    subject: "Final discussion about the deal (2)",
    opened: true,
    clicked: true,
    starred: true,
    draft: false,
    unread: true,
    img: Img1,
    message:
      "Hello Jane, That’s good to know. Would the Hilton hotel work for you? Looking forward to the meeting. Ann...",
  },
  {
    to: "Spector Calista",
    email: "spectoralista@gmail.com",
    daysAgo: "9 days ago",
    subject: "Want to see how CRM Gold can help you meet your sales goals? (5)",
    opened: true,
    clicked: true,
    starred: false,
    draft: true,
    unread: false,
    img: Img2,
    message:
      "Hi Spector, Here is the contract with the details. Regards, Annamalai",
  },
  {
    to: "Jane Sampleton",
    email: "janesampleton@gmail.com",
    daysAgo: "11 days ago",
    subject: "Welcome!",
    opened: true,
    clicked: true,
    starred: false,
    draft: false,
    unread: false,
    img: Img3,
    message:
      "Hello Jane, We’re thrilled to have you on board and we look forward to delivering an awesome experience. A...",
  },
  {
    to: "Jay Patel",
    email: "jaypatelsample@gmail.com",
    daysAgo: "14 days ago",
    subject: "Want to see how CRM Gold can help you meet your sales goals?",
    opened: true,
    clicked: true,
    starred: true,
    draft: true,
    unread: true,
    img: Img4,
    message:
      "Hello Jay, Thanks for your interest in the CRM Gold plan. Let me know if you would like a demo of the produ...",
  },
];
