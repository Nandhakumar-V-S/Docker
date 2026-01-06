import React, { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ArcDropDownControled } from "@/components/arccomponents/ui-components/ArcDropDown/ArcDropDown";
export const WidgetHeader = ({ Title, ArcDropDownControledData }) => {
  const [SelectedValueState, setSelectedValueState] = useState(
    ArcDropDownControledData[0].value
  );
  return (
    <React.Fragment>
      <div className="widget-header">
        <h4>{Title}</h4>
        <div className="actions">
          <ArcDropDownControled
            ArcDropDownControledData={ArcDropDownControledData}
            SelectedValue={SelectedValueState}
            setSelectedValue={setSelectedValueState}
          />
          {/* <span className="filter">
            <IoFilterSharp />
          </span>
          <span className="action">
            <BsThreeDotsVertical />
          </span> */}
        </div>
      </div>
    </React.Fragment>
  );
};
