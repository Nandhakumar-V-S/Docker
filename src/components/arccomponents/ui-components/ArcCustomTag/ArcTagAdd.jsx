/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useRef, useEffect } from "react";
//? Assets
import { useDispatch, useSelector } from "react-redux";
//? Components
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { getlookupdetails } from "@/redux/getlookupdetails/getlookupdetails";
import ArcAddCustomTag from "@/components/arccomponents/ui-components/ArcCustomTag/ArcAddCustomTag";
//? CSS

//? Images

//? JSON File

//? Icons
import { FaTags } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
// *******~ Import ~******** //

const ArcTagAdd = ({ selectedTagItem, setSelectedTagItem, Name }) => {
  const [showEditBox, setShowEditBox] = useState(false);
  const [searchBoxVisible, setSearchBoxVisible] = useState(false);
  // Fetch lookup details
  const dispatch = useDispatch();
  const fetchUpdateLookupDetails = () => {
    let query = "";
    let page = 1;
    let limit = 10;
    const requestData = {
      entityId: "26B84156-CC30-416E-99D5-B37409B4D0BD",
      lookupId: "18A0DE1A-86BC-4733-B4DE-129CC6C360EF",
      limit: limit.toString(),
      page: page.toString(),
      q: query,
    };
    dispatch(getlookupdetails(requestData));
  };

  const HandleEditBtnClick = () => {
    fetchUpdateLookupDetails();
    setSearchBoxVisible(true);
    setShowEditBox(true);
  };

  //   ~ Out Side Click
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowEditBox(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <React.Fragment>
      {!showEditBox && (
        <div className={`tag-list-box with-add`}>
          {/* <p className="title">Tag</p> */}
          <div className="text-input-box" onClick={HandleEditBtnClick}>
              <span>
                <FaTags /> Click to add tag
              </span>
            {/* {selectedTagItem?.length === 0 ? (
              
            ) : (
              <>{newFunction(selectedTagItem)}</>
            )} */}

            {/* <ArcToolTip
              HoverText="Edit"
              BtnName={<FaRegEdit />}
              Placement="left"
              onClick={HandleEditBtnClick}
              as="span"
              className="edit-btn"
            /> */}
          </div>
        </div>
      )}
      {/* <pre>{JSON.stringify(selectedTagItem, null, 2)}</pre> */}

      {showEditBox && (
        <div className="add-tag-div" ref={ref}>
          <ArcAddCustomTag
            // selectedItem={selectedTagItem}
            // setSelectedItem={setSelectedTagItem}
            Name={Name}
            searchBoxVisible={searchBoxVisible}
            setSearchBoxVisible={setSearchBoxVisible}
          />
        </div>
      )}
    </React.Fragment>
  );
  function newFunction(listdata) {
    return (
      <div className="tag-list">
        {listdata?.slice(0, 2).map((list, index) => (
          <p
            className={`tag tag-color-${list.color || list.colorcode}`}
            key={index}
          >
            {list.name || list.optionvalue || "-"}
          </p>
        ))}

        {listdata?.length > 2 && (
          <ArcToolTip
            HoverText={
              <>
                {/* <span className="title">Tag</span> */}
                {listdata?.slice(2).map((list, index) => (
                  <p
                    className={`tags tag-color-${list.color || list.colorcode}`}
                    key={index}
                  >
                    {list.name || list.optionvalue}
                  </p>
                ))}
              </>
            }
            Tooltipclass={"grid-tooltip withtag-tooltip"}
            BtnName={<span className="tag-count">+{listdata?.length - 2}</span>}
            Placement="top"
            as="span"
          />
        )}
      </div>
    );
  }
};
export default ArcTagAdd;
