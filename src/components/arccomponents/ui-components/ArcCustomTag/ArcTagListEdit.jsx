/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useRef, useEffect } from "react";
//? Assets
import { useDispatch, useSelector } from "react-redux";
//? Components
import ArcCustomTag from "@/components/arccomponents/ui-components/ArcCustomTag/ArcCustomTag";
import { getupdatelookupdetails } from "@/redux/getlookupdetails/getUpdateLookupDetails";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { getlookupdetails } from "@/redux/getlookupdetails/getlookupdetails";
//? CSS

//? Images

//? JSON File

//? Icons
import { FaRegEdit } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
// *******~ Import ~******** //

const ArcTagListEdit = ({
  RowId,
  UpdateselectedTagItem,
  setUpdateselectedTagItem,
  setistagedited,
}) => {
  const dispatch = useDispatch();
  const [TagListdata, setTagListdata] = useState([]);
  const [showEditBox, setShowEditBox] = useState(false);
  const HandleEditClick = () => {
    setShowEditBox(true);
    // setistagedited(false);
    // setUpdateselectedTagItem([]);
    let query = "";
    let page = 1;
    let limit = 10;
    let transactionId = RowId;
    let IsDefault = true;
    fetchUpdateLookupDetailsData(query, page, limit, transactionId, IsDefault);
  };

  // useEffect(() => {
  //   setUpdateselectedTagItem([]);
  //   let query = "";
  //   let page = 1;
  //   let limit = 10;
  //   let transactionId = RowId;
  //   let IsDefault = true;
  //   fetchUpdateLookupDetailsData(query, page, limit, transactionId, IsDefault);
  // }, [dispatch]);

  // ! Tag Values start
  // * Default Value
  const getUpdatetagData = useSelector(
    (state) => state.getupdatelookupdetailsState.response?.result?.data
  );
  const TaskDefaultInputs = useSelector(
    (state) => state.GetDefaultTaskInputState.DefaultFormValues
  );
  const defaultValTagValue = TaskDefaultInputs?.result?.find(
    (item) => item.id === "0eae1cf7-e7d0-4d65-a26c-7badd91c353f"
  );
  console.log(defaultValTagValue);
  //   useEffect(() => {
  //     setUpdateselectedTagItem([]);
  //   }, [defaultValTagValue]);

  //   let TagValues = getUpdatetagData?.lookupvalues[0]?.mastervalues || [];

  useEffect(() => {
    // Ensure TagValues is an array
    const TagValues = defaultValTagValue?.displayname || [];
    console.log(TagValues);
    // Parse the JSON string if necessary
    const parsedData = Array.isArray(TagValues)
      ? TagValues
      : JSON.parse(TagValues);

    // Extract the name values
    const tagList = parsedData.map((item) => ({
      name: item.name,
      color: item.colorcode,
    }));

    console.log(tagList);
    setTagListdata(tagList);
    setUpdateselectedTagItem([]);
  }, [defaultValTagValue]);

  useEffect(() => {
    if (UpdateselectedTagItem.length > 0) {
      setTagListdata([]);
    }
  }, [UpdateselectedTagItem]);

  // ! Tag Values End
  // ! Autocomplete Tag Update start
  //   const [UpdateselectedTagItem, setUpdateselectedTagItem] = useState([]);
  // Fetch lookup details
  const fetchUpdateLookupDetailsData = (
    query,
    page,
    limit,
    transactionId,
    IsDefault
  ) => {
    const requestData = {
      entityId: "26B84156-CC30-416E-99D5-B37409B4D0BD",
      lookupId: "18A0DE1A-86BC-4733-B4DE-129CC6C360EF",
      transactionId: transactionId,
      IsDefaultValueNeeded: IsDefault,
      limit: limit.toString(),
      page: page.toString(),
      q: query,
    };
    dispatch(getupdatelookupdetails(requestData));
  };

  // ! Autocomplete Tag Update End
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
      <>
        {getUpdatetagData?.length !== 0 && (
          <div
            ref={ref}
            className={`tag-list-box-input ${showEditBox ? "active" : ""}`}
          >
            <ArcCustomTag
              selectedItem={UpdateselectedTagItem}
              setSelectedItem={setUpdateselectedTagItem}
              fetchUpdateLookupDetails={fetchUpdateLookupDetailsData}
              getUpdateLookupDetailsData={getUpdatetagData}
              transactionId={RowId}
              Name={"Tag"}
              setistagedited={setistagedited}
            />
          </div>
        )}
      </>
      {/* <pre>{JSON.stringify(TagListdata, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(UpdateselectedTagItem, null, 2)}</pre> */}
      {!showEditBox && (
        <div className={`tag-list-box with-add`}>
          <p className="title">Tag</p>
          <div className="text-input-box">
            {TagListdata.length === 0 && UpdateselectedTagItem.length === 0 ? (
              <span onClick={HandleEditClick}>
                <FaTags /> Click to add tag
              </span>
            ) : (
              <>
                {" "}
                {UpdateselectedTagItem.length === 0 ? (
                  <>{newFunction(TagListdata)}</>
                ) : (
                  <>{newFunction(UpdateselectedTagItem)}</>
                )}
              </>
            )}

            <ArcToolTip
              HoverText="Edit"
              BtnName={<FaRegEdit />}
              Placement="left"
              onClick={HandleEditClick}
              as="span"
              className="edit-btn"
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );

  function newFunction(listdata) {
    return (
      <div className="tag-list">
        {listdata.slice(0, 2).map((list, index) => (
          <p
            className={`tag tag-color-${list.color || list.colorcode}`}
            key={index}
          >
            {list.name || list.optionvalue || "-"}
          </p>
        ))}

        {listdata.length > 2 && (
          <ArcToolTip
            HoverText={
              <>
                {/* <span className="title">Tag</span> */}
                {listdata.slice(2).map((list, index) => (
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
            BtnName={<span className="tag-count">+{listdata.length - 2}</span>}
            Placement="top"
            as="span"
          />
        )}
      </div>
    );
  }
};
export default ArcTagListEdit;
