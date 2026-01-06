// *******~ Import ~******** //
//? React
import React from "react";
//? Assets

//? Components
import OutletHeader from "../outletHeader";
import AdminSettingPage from "@/pages/AdminSetting";
//? CSS

//? Images

//? JSON File

//? Icons
// *******~ Import ~******** //

const AdminSettings = () => {
  return (
    <React.Fragment>
      <OutletHeader
        title="Admin Settings"
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi soluta
          facilis dignissimos dicta qui rerum perspiciatis nesciunt asperiores
          dolor, neque omnis minus fuga quaerat tempora! Quam atque animi sequi
          molestias!"
      />
      <AdminSettingPage />
    </React.Fragment>
  );
};
export default AdminSettings;
