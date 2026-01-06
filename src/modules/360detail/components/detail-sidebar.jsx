// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets

//? Components

//? CSS

//? Images

//? JSON File

//? Icons
import { VscSettings } from "react-icons/vsc";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { LiaAddressCardSolid } from "react-icons/lia";
// *******~ Import ~******** //

const DetailSidebar = () => {
  const [SettingPopup, setSettingPopup] = useState(false);
  const [NotificarionPopup, setNotificarionPopup] = useState(false);
  return (
    <>
      <section className="detail-sidebar">
        <div
          className={`sidebar-popup ${
            SettingPopup || NotificarionPopup ? "active" : null
          }`}
        >
          {SettingPopup && (
            <>
              <p>Setting</p>
            </>
          )}
          {NotificarionPopup && (
            <>
              <p>Notification</p>
            </>
          )}
        </div>

        <div className="group-btn">
          <button
            className={`${SettingPopup ? "active" : null}`}
            onClick={() => {
              setSettingPopup((prevSettingPopup) => !prevSettingPopup);
              setNotificarionPopup(false);
            }}
          >
            <VscSettings />
          </button>
          <button
            className={`${NotificarionPopup ? "active" : null}`}
            onClick={() => {
              {
                setNotificarionPopup(
                  (prevNotificarionPopup) => !prevNotificarionPopup
                );
                setSettingPopup(false);
              }
            }}
          >
            <IoNotificationsOutline />
          </button>
          <button>
            <IoFilterSharp />
          </button>
          <button>
            <LiaAddressCardSolid />
          </button>
        </div>
      </section>
    </>
  );
};
export default DetailSidebar;
