import React, { useContext, useState, useEffect, useRef } from "react";

import Form from "react-bootstrap/Form";

import { MdOutlineCancel } from "react-icons/md";
import { GrDrag } from "react-icons/gr";

import { toggleColumnMapping } from "@/redux/Report/actions";

import { useDispatch, useSelector } from "react-redux";

import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { totalColumnsInfo } from "@/redux/Report/selector";

export const CustomizeTable = ({
  CustomTabelPopup,
  setCustomTabelPopup,
  CustomeTablebuttonRef,
}) => {
  const dispatch = useDispatch();
  // const MappedColumns = useSelector(dataForColumnInfo);
  // const unMappedColumns = useSelector(unMappedColumnsInfo);
  const totalColumns = useSelector(totalColumnsInfo);
  const MappedColumns = totalColumns?.filter(
    (item) => item.ismapped && item.visible
  );
  const unMappedColumns = totalColumns?.filter(
    (item) => !item.ismapped && item.visible
  );

  console.log(MappedColumns);
  console.log(unMappedColumns);
  const [searchTerm, setSearchTerm] = useState("");
  const [mappedCheckboxes, setMappedCheckboxes] = useState({});
  const [unmappedCheckboxes, setUnmappedCheckboxes] = useState({});

  console.log(totalColumns);

  const handleCustomTabelPopup = () => {
    setCustomTabelPopup(false);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const buttonClicked =
        CustomeTablebuttonRef.current &&
        CustomeTablebuttonRef.current.contains(event.target);

      if (
        CustomTabelPopup &&
        !buttonClicked &&
        event.target.closest(".custom-filtered-div.filtered-table-div") === null
      ) {
        setCustomTabelPopup(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [CustomTabelPopup, setCustomTabelPopup, CustomeTablebuttonRef]);

  //const MappedColumns = useSelector(selectMappedColumns);
  // console.log(MappedColumns);
  //const sortedColumns = MappedColumns.sort((a, b) => a.seq - b.seq);
  // console.log(sortedColumns);
  // const unMappedColumns = useSelector(selectUnMappedColumns);
  //  console.log(unMappedColumns);
  const mappedColumnsLength = MappedColumns?.length;

  const unMappedColumnslength = unMappedColumns?.length;

  // Initialize mappedCheckboxes and unmappedCheckboxes
  useEffect(() => {
    const initialMappedCheckboxes = {};
    const initialUnmappedCheckboxes = {};

    MappedColumns.forEach((item) => {
      initialMappedCheckboxes[item.id] = item.ismapped;
    });

    unMappedColumns.forEach((item) => {
      initialUnmappedCheckboxes[item.id] = item.ismapped;
    });

    setMappedCheckboxes(initialMappedCheckboxes);
    setUnmappedCheckboxes(initialUnmappedCheckboxes);
  }, [CustomTabelPopup, totalColumns]);
  console.log(mappedCheckboxes);
  console.log(unmappedCheckboxes);

  const handleCheckboxChangeMapped = (id, isChecked) => {
    console.log(id);
    setMappedCheckboxes((prevState) => ({
      ...prevState,
      [id]: isChecked,
    }));
  };

  const handleCheckboxChangeUnmapped = (id, isChecked) => {
    console.log(id);
    setUnmappedCheckboxes((prevState) => ({
      ...prevState,
      [id]: isChecked,
    }));
  };

  const handleApplyButtonClick = () => {
    const updatedColumns = [];

    // Update mapped columns
    MappedColumns.forEach((item) => {
      if (mappedCheckboxes[item.id] !== item.ismapped) {
        updatedColumns.push({
          ...item,
          ismapped: mappedCheckboxes[item.id],
        });
      }
    });

    // Update unmapped columns
    unMappedColumns.forEach((item) => {
      if (unmappedCheckboxes[item.id] !== item.ismapped) {
        updatedColumns.push({
          ...item,
          ismapped: unmappedCheckboxes[item.id],
        });
      }
    });

    // Extract the attribute IDs of the updated columns
    const selectedAttributes = updatedColumns.map((column) => column.id);

    console.log(selectedAttributes);
    // Dispatch the action with the selected attributes
    dispatch(toggleColumnMapping(selectedAttributes));
  };
  const relevantColumns = ["D1", "D2", "D3", "D4", "D5", "D6"];
  return (
    <>
      <div
        className={`custom-filtered-div filtered-table-div ${
          CustomTabelPopup && "active"
        }`}
      >
        <div className="header-div">
          <div className="header">
            <p>Customize table</p>
            {/* <span onClick={handleCustomTabelPopup}>
                <MdOutlineCancel />
              </span> */}
            <ArcToolTip
              HoverText="Close"
              BtnName={<MdOutlineCancel />}
              Placement="left"
              onClick={handleCustomTabelPopup}
              as="span"
            />
          </div>
          <Form.Control
            className="search-contact"
            type="text"
            placeholder="Search fields"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="main-div">
          <div className="content quick-filter">
            <p>
              Fields visible in table{" "}
              <span>
                {" "}
                {mappedColumnsLength}/
                {mappedColumnsLength + unMappedColumnslength}
              </span>
            </p>
            <div className="checkbox-div mapped visible-data">
              {MappedColumns.filter((item) =>
                item.name?.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((item, index) => (
                // Rendering displayname if ismapped is true
                <label key={index}>
                  <GrDrag />{" "}
                  <input
                    type="checkbox"
                    // defaultChecked={true}
                    onChange={(e) =>
                      handleCheckboxChangeMapped(item.id, e.target.checked)
                    }
                    checked={mappedCheckboxes[item.id] ?? false}
                    disabled={
                      relevantColumns.includes(item.api_name) ||
                      item.istitle === true
                    }
                  />
                  {item.name}
                </label>
              ))}
            </div>
            <p>Fields not shown in table</p>
            <div className="checkbox-div unmapped not-visible-data">
              {unMappedColumns
                .filter((item) =>
                  item.name?.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item, index) => (
                  // Rendering displayname if ismapped is false

                  <label key={index}>
                    <GrDrag />{" "}
                    <input
                      type="checkbox"
                      checked={unmappedCheckboxes[item.id] ?? false}
                      onChange={(e) =>
                        handleCheckboxChangeUnmapped(item.id, e.target.checked)
                      }
                    />
                    {item.name}
                  </label>
                ))}
            </div>
          </div>
        </div>
        <div className="footer-div">
          {/* <button className="reset">Reset to default</button> */}
          <button onClick={handleCustomTabelPopup} className="cancel">
            Cancel
          </button>
          <button
            onClick={() => {
              handleApplyButtonClick();
              handleCustomTabelPopup();
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};
