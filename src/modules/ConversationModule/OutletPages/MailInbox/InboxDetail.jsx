/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets

//? Components

//? CSS

//? Images
//? JSON File

//? Icons

import MailDetail from "../../components/MailDetail";
// *******~ Import ~******** //

export default function InboxDetailPage() {
  const [content, setContent] = useState("");
  const [IsReplay, setIsReplay] = useState(false);
  // const [content, setContent] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const HandleReplay = () => {
    setIsReplay(true);
    // setIsReplay((preIsReplay) => ({
    //   ...preIsReplay, // Preserve previous state
    //   [index]: !preIsReplay[index], // Toggle value
    // }));
  };
  return (
    <React.Fragment>
      <div className="inboxdetail-mail-screen">
        <MailDetail
          content={content}
          setContent={setContent}
          IsReplay={IsReplay}
          setIsReplay={setIsReplay}
          showCc={showCc}
          setShowCc={setShowCc}
          showBcc={showBcc}
          setShowBcc={setShowBcc}
          HandleReplay={HandleReplay}
          headerShow={true}
          pagekey="inboxdetail"
        />
      </div>
    </React.Fragment>
  );
}
