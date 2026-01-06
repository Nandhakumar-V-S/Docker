import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHorizontalGroupBy } from "@/redux/Notes/actions";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { MySkeleton } from "@/modules/loading-skeleton/listpage-table-loading";

export const HorizontalGrouping = ({
  data,
  masterid,
  optionid,
  Tableloading,
  id,
}) => {
  const dispatch = useDispatch();
  const prevDataRef = useRef(data[0]);
  const [activeOptionId, setActiveOptionId] = useState(optionid);
  const [selectedValue, setSelectedValue] = useState({
    optionid: "",
    optionvalue: "",
  });
  const [showMore, setShowMore] = useState(false);
  console.log(data[0]);
  useEffect(() => {
    if (
      data &&
      data[0] &&
      prevDataRef.current.length > 0 &&
      data[0] !== prevDataRef.current
    ) {
      console.log("different mastervalues");
      setActiveOptionId(optionid);
      setShowMore(false);
      setSelectedValue({
        optionid: "",
        optionvalue: "",
      });
      prevDataRef.current = data[0];
    }
  }, [data]);

  const handleClick = (optionid) => {
    setActiveOptionId(optionid);
    console.log(optionid);
    dispatch(setHorizontalGroupBy(id, optionid));
  };

  const handleMoreButtonClick = (optionid) => {
    setActiveOptionId(optionid);
    console.log(optionid);
    dispatch(setHorizontalGroupBy(id, optionid));
    setShowMore(false);
  };

  const handleSelect = (eventKey, event) => {
    const selectedItem =
      data &&
      data[0] &&
      data[0].slice(4).find((item) => item.optionid === eventKey);
    setActiveOptionId(eventKey);
    console.log(eventKey);
    dispatch(setHorizontalGroupBy(id, eventKey));
    if (selectedItem) {
      setSelectedValue({
        optionid: selectedItem.optionid,
        optionvalue: selectedItem.optionvalue,
      });
    }
  };
  const selectedItem = data?.[0]
    ?.slice(5)
    .find((item) => item.optionid === activeOptionId);

  const truncateText = (text) => {
    return text && text.length > 13 ? text.slice(0, 13) + "..." : text;
  };
  <pre>{JSON.stringify(data, null, 2)}</pre>;
  return (
    <>
      <div className="grouping-tabs">
        {data &&
          data[0] &&
          data[0].slice(0, 5).map((item, index) => (
            <button
              key={item.optionid}
              title={item.optionvalue}
              className={`${
                item.optionid === activeOptionId ? "active" : ""
              } grouping-btn  ${Tableloading ? "is-loading" : null}`}
              onClick={() => handleClick(item.optionid)}
            >
              {Tableloading ? (
                <LoadingBtn />
              ) : item.optionvalue?.length > 15 ? (
                item.optionvalue?.slice(0, 15) + "..."
              ) : (
                item.optionvalue
              )}
            </button>
          ))}

        {data && data[0] && data[0].length > 5 && (
          <>
            {!Tableloading && (
              <DropdownButton
                id="dropdown-item-button"
                title={
                  <span
                    title={
                      selectedValue.optionvalue ||
                      selectedItem?.optionvalue ||
                      (data?.[0]?.[5]?.optionvalue && data[0][5].optionvalue)
                    }
                  >
                    {truncateText(
                      selectedValue.optionvalue ||
                        selectedItem?.optionvalue ||
                        data?.[0]?.[5]?.optionvalue
                    )}
                    <BsThreeDotsVertical />
                  </span>
                }
                onSelect={handleSelect}
                className={`${
                  selectedValue.optionid === activeOptionId ||
                  selectedItem?.optionvalue
                    ? "active"
                    : ""
                }`}
              >
                <div className="item-div">
                  {data?.[0]?.slice(5).map((item, index) => (
                    <Dropdown.Item
                      eventKey={item.optionid}
                      as="button"
                      className={`${
                        item.optionid === activeOptionId ? "active" : ""
                      }`}
                      key={index}
                    >
                      {item.optionvalue}
                    </Dropdown.Item>
                  ))}
                </div>
              </DropdownButton>
            )}
          </>
          // <div className="dropdown">
          //   <button className="dropbtn" onClick={() => setShowMore(!showMore)}>
          //     More
          //   </button>
          //   {showMore && (
          //     <div className="dropdown-content">
          //       {data[0].slice(5).map((item, index) => (
          //         <button
          //           key={item.optionid}
          //           className={item.optionid === activeOptionId ? "active" : ""}
          //           onClick={() => handleMoreButtonClick(item.optionid)}
          //         >
          //           {item.optionvalue}
          //         </button>
          //       ))}
          //     </div>
          //   )}
          // </div>
        )}
      </div>
    </>
  );
};

//export default HorizontalGrouping;

function GroupingTabAction() {
  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        rootClose={true}
        overlay={
          <Popover className="header-tab-action">
            <Popover.Body>
              <div className="action-btn-group">
                <button>
                  <MdDeleteOutline /> Remove
                </button>
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <i>
          <BsThreeDotsVertical />
        </i>
      </OverlayTrigger>
    </>
  );
}

const LoadingBtn = () => {
  return <MySkeleton height={15} radius={2} width={100} clsnme="loading-btn" />;
};
