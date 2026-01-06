/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useEffect, useState, useContext, useRef } from "react";
import Form from "react-bootstrap/Form";
// import { useDispatch, useSelector } from "react-redux";
//? Assets
import { format } from "date-fns";
//? Components
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import ArcTextarea from "@/components/arccomponents/ui-components/ArcTextarea/ArcTextarea";
import ArcDatepicker from "@/components/arccomponents/ui-components/ArcDatepicker/ArcDatepicker";
import ArcSingleSelect from "@/components/arccomponents/ui-components/ArcSingleSelect/ArcSingleSelect";
import ArcHourInput from "@/components/arccomponents/ui-components/ArcHourInput/ArcHourInput";
import ArcProgressRangeInput from "@/components/arccomponents/ui-components/ArcRangeInput/ArcRangeInput";
import { TimeInput } from "@/components/arccomponents/ui-components/ArcHourInput/ArcHourInput";
import ArcTagInput from "@/components/arccomponents/ui-components/ArcTagInput/ArcTagInput";
import ArcTagInputV2 from "@/components/arccomponents/ui-components/ArcTagInput/ArcTagInputv2";
import ArcTagInputV3 from "@/components/arccomponents/ui-components/ArcTagInput/ArcTagInputv3";
import ArcCustomTag from "@/components/arccomponents/ui-components/ArcCustomTag/ArcCustomTag";

//? CSS

//? Images

//? JSON File

//? Icons
import { FaRegEdit } from "react-icons/fa";
// *******~ Import ~******** //

// ! June Release / Ashok
export const EditCell = ({
  value,
  Title,
  controltype,
  masterid,
  row_data,
  col_data,
  masterdata,
  handleSave,
  handleSaveTag,
  setIsScrollDisabled,
  UpdateselectedTagItem,
  setUpdateselectedTagItem,
  fetchUpdateLookupDetailsData,
  getUpdatetagData,
  setistagedited,
}) => {
  // const masterData = useSelector(masterDataInfo);
  // console.log("masterData", masterData);

  const [input, setInput] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [DefaultDropdownValue, setDefaultDropdownValue] = useState({});
  const [startDate, setStartDate] = useState();

  console.log(controltype);
  console.log(masterid);
  console.log(row_data);
  console.log(col_data);
  console.log(masterdata);

  const getOptions = () => {
    const priorityObject = masterdata?.find(
      (item) => item.masterid === masterid
    );
    if (priorityObject) {
      return priorityObject.mastervalues.map((option) => ({
        value: option.optionid,
        label: option.optionvalue,
      }));
    }
    return [];
  };

  const handleRangeChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const handleDropdown = (newvalue) => {
    console.log(newvalue);
    setSelectedValue(newvalue.value);
    setDefaultDropdownValue({
      value: newvalue.value,
      label: newvalue.label,
    });
  };
  const handleText = (e) => {
    console.log(e.target.value);
    setSelectedValue(e.target.value);
  };
  const handleDateInputChange = (date) => {
    console.log(date);
    setStartDate(date);
    setSelectedValue(format(date, "MM/dd/yyyy"));
  };

  // ! Get Tag Data Start
  // ! Update Tag Values
  useEffect(() => {
    if (controltype == "groupdropdown") {
      const newTagItems = UpdateselectedTagItem.map((tag) => ({
        isnewtag: tag.isnewtag || false,
        tagid: tag.tagid || tag.optionid,
        tagname: tag.optionvalue,
      }));
      setSelectedValue(newTagItems);
    }
  }, [UpdateselectedTagItem]);
  // ! Update Tag Values

  // ! Get Tag Data End

  // ! Time Input start
  // const DefaultHour = "3h 10m"; // Example input

  // State hooks to initialize hours and minutes
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [TotalMinutes, setTotalMinutes] = useState(0);

  const onBlurMinutes = () => {
    const currentMinutes = hours * 60 + parseInt(minutes, 10);
    setTotalMinutes(currentMinutes);
    setSelectedValue(currentMinutes.toString());
  };

  const onBlurHour = () => {
    const currenthours = parseInt(hours, 10) * 60 + minutes;
    setTotalMinutes(currenthours);
    setSelectedValue(currenthours.toString());
  };

  // ! Time Input End
  // ! Spent Hours Start
  const handleSpentHourChange = (e) => {
    let value = e.target.value;

    // Remove invalid characters
    value = value.replace(/[^0-9.hdwm]/g, "");

    // Check if there are multiple letters and remove all but the last one
    const letters = value.match(/[hdwm]/g);
    if (letters && letters.length > 1) {
      value = value.replace(/[hdwm]/g, ""); // Remove all letters
      value += letters[letters.length - 1]; // Append only the last letter
    }

    setInput(value);
    setSelectedValue(value);
  };

  const convertToHours = (inputValue) => {
    if (inputValue.trim() === "") {
      return "0"; // Return "0h" if input is empty
    }

    const regex = /^(\d*\.?\d*)([hwdm]?)$/; // Regular expression to match numerical value and unit
    const match = inputValue.match(regex);
    if (!match) {
      return "0"; // Return "0h" if input is invalid
    }
    const value = parseFloat(match[1]);
    const unit = match[2];

    let convertedHours;
    switch (unit) {
      case "d":
        // Convert days to working hours (8 hours per day)
        convertedHours = value * 8;
        break;
      case "w":
        // Convert weeks to working hours (5 days per week, 8 hours per day)
        convertedHours = value * 5 * 8;
        break;
      case "m":
        // Convert minutes to hours
        convertedHours = value / 60;
        break;
      default:
        // Assume input is already in hours
        convertedHours = value;
    }

    // Check if convertedHours is NaN
    if (isNaN(convertedHours)) {
      return "0"; // Return "0h" if conversion result is NaN
    }

    return Number.isInteger(convertedHours)
      ? convertedHours.toString()
      : convertedHours.toFixed(2);
  };

  const handleSpentHourBlur = (e) => {
    const convertedHours = convertToHours(e.target.value);
    const newInputValues = convertedHours + "h";
    let ConvertMinutes = (convertedHours * 60).toString();
    setInput(newInputValues);
    setSelectedValue(ConvertMinutes);
  };
  // ! Spent Hours End

  // ! popup state & Functions
  const [showEditBox, setShowEditBox] = useState(false);
  const [currentParentDiv, setCurrentParentDiv] = useState(null);
  const editBoxRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownvalue = () => {
    if (value === "") {
      setDefaultDropdownValue(""); // Set to an empty string if value is empty
    } else {
      setDefaultDropdownValue({
        value: value,
        label: value,
      });
    }
  };

  // useEffect(() => {
  //   if (controltype == "groupdropdown") {
  //     setistagedited(true);
  //   }
  // }, [UpdateselectedTagItem]);
  const handleEditClick = (event) => {
    if (controltype == "groupdropdown") {
      setistagedited(false);
      setUpdateselectedTagItem([]);
      let query = "";
      let page = 1;
      let limit = 10;
      let transactionId = row_data?.id;
      let IsDefault = true;
      fetchUpdateLookupDetailsData(
        query,
        page,
        limit,
        transactionId,
        IsDefault
      );
    } else {
      null;
    }

    setSelectedValue(
      controltype === "progressbar"
        ? ["", "-"].includes(value)
          ? "0"
          : value
        : value
    );
    setInput("");
    setStartDate(new Date(value) || new Date());

    // Call the function to see the result
    dropdownvalue();

    // Reset the z-index of the previously active parent div
    if (currentParentDiv) {
      currentParentDiv.style.zIndex = "0";
      currentParentDiv.style.overflow = "hidden";
    }
    const RootparentDiv = event.target.closest('[wj-part="root"]');
    if (RootparentDiv && !showEditBox) {
      RootparentDiv.style.overflow = "hidden";
      RootparentDiv.style.height = "100%";
    }
    // Toggle the edit box visibility
    setShowEditBox((prevShowEditBox) => !prevShowEditBox);

    // Find the closest parent div with the class 'wj-cell'
    const parentDiv = event.target.closest(".wj-cell");
    if (parentDiv && !showEditBox) {
      parentDiv.style.zIndex = "999"; // Change the z-index
      parentDiv.style.overflow = "visible";
      setCurrentParentDiv(parentDiv); // Set the current parent div
    } else if (parentDiv) {
      parentDiv.style.zIndex = "0";
      parentDiv.style.overflow = "hidden";
      setCurrentParentDiv(null); // Clear the current parent div
    }
  };

  const handleEditCancelClick = (event) => {
    setShowEditBox(false);
    setDefaultDropdownValue({ value: value, label: value });
    if (currentParentDiv) {
      currentParentDiv.style.zIndex = "0"; // Reset the z-index
      currentParentDiv.style.overflow = "hidden";
      setCurrentParentDiv(null); // Clear the current parent div
    }

    const RootparentDiv = event.target.closest('[wj-part="root"]');
    if (RootparentDiv) {
      RootparentDiv.style.overflow = "auto";
      RootparentDiv.style.height = "100%";
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const RootparentDiv = event.target.closest('[wj-part="root"]');
      if (
        editBoxRef.current &&
        !editBoxRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowEditBox(false);
        if (currentParentDiv) {
          currentParentDiv.style.zIndex = "0"; // Reset the z-index
          currentParentDiv.style.overflow = "hidden";
          setCurrentParentDiv(null); // Clear the current parent div
        }
        if (RootparentDiv) {
          RootparentDiv.style.overflow = "auto";
          RootparentDiv.style.height = "100%";
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentParentDiv]);
  // ! popup state & Functions

  const renderControl = () => {
    switch (controltype) {
      case "textbox":
        return (
          <ArcTextBox
            ClassName=""
            PlaceHolder={`Enter Your ${Title}`}
            Name="name"
            Required={false}
            DefaultValue={value}
          />
        );
      case "textarea":
        return (
          <ArcTextarea
            ClassName=""
            PlaceHolder="Enter the details..."
            Name="textarea"
            Required={false}
            DefaultValue={value}
            ReadOnly={false}
            onChange={handleText}
          />
        );
      case "date":
        return (
          <ArcDatepicker
            dateFormat="MM/dd/yyyy"
            PlaceHolder="Select a Date"
            startDate={startDate}
            selected={startDate}
            ClassName=""
            onChange={(date) => handleDateInputChange(date)}
          />
        );
      case "dropdown":
        return (
          <ArcSingleSelect
            options={getOptions()}
            isClearable={false}
            PlaceHolder={`Select ${Title}`}
            ClassName=""
            onChange={handleDropdown}
            Value={DefaultDropdownValue}
          />
        );
      case "multiselect":
        return (
          <ArcSingleSelect
            options={getOptions()}
            isClearable={false}
            PlaceHolder={`Select ${Title}`}
            ClassName=""
            onChange={handleDropdown}
            Value={DefaultDropdownValue}
          />
        );
      case "progressbar":
        return (
          <ArcProgressRangeInput
            className="celledit"
            value={selectedValue}
            setValue={setSelectedValue}
            ShowLabel={false}
            step={10}
            onChange={handleRangeChange}
            name={Title}
          />
        );
      case "groupdropdown":
        return (
          <ArcCustomTag
            selectedItem={UpdateselectedTagItem}
            setSelectedItem={setUpdateselectedTagItem}
            fetchUpdateLookupDetails={fetchUpdateLookupDetailsData}
            getUpdateLookupDetailsData={getUpdatetagData}
            transactionId={row_data?.id}
            setistagedited={setistagedited}
            // Name={"Update Tag"}
          />
        );

      case "textbox_time":
        console.log(row_data.spendhourminutes);

        return (
          <ArcHourInput
            onChange={handleSpentHourChange}
            onBlur={handleSpentHourBlur}
            Value={input || undefined}
            DefaultValue={
              (row_data.spendhourminutes &&
                (row_data.spendhourminutes >= 60
                  ? (row_data.spendhourminutes / 60).toFixed(2) + "h"
                  : row_data.spendhourminutes + "m")) ||
              undefined
            }
            Required={false}
          />
          // <TimeInput
          //   hours={hours}
          //   setHours={setHours}
          //   minutes={minutes}
          //   setMinutes={setMinutes}
          //   onBlurHour={onBlurHour}
          //   onBlurMinutes={onBlurMinutes}
          //   spendhours={value}
          //   TotalMinutes={TotalMinutes}
          //   setTotalMinutes={setTotalMinutes}
          //   onMouseLeaveMinutes={onBlurMinutes}
          //   onMouseLeaveHour={onBlurHour}
          // />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {showEditBox && (
        <>
          <div ref={editBoxRef} className="edit-box-wj">
            {/* small-width*/}
            <div className="header-content">
              {/* <pre>{JSON.stringify(selectedItemstag, null, 2)}</pre> */}
              {/* {controltype} */}
              {controltype === "progressbar" ? (
                <p>
                  {Title.replace("%", "")}: <span>{selectedValue}%</span>
                </p>
              ) : (
                <p>{Title}</p>
              )}
            </div>
            <div className="body-content">
              {renderControl()}
              {/* <pre>{JSON.stringify(row_data, null, 2)}</pre> */}
              {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
              {/* <pre>{JSON.stringify(selectedValue, null, 2)}</pre> */}
              {/* <pre>{JSON.stringify(DefaultDropdownValue, null, 2)}</pre> */}
              {/* <pre>{JSON.stringify(UpdateselectedTagItem, null, 2)}</pre> */}
            </div>
            <div className="footer-content">
              <button className="cancel" onClick={handleEditCancelClick}>
                Cancel
              </button>

              {controltype == "groupdropdown" ? (
                <button
                  // disabled={selectedValue === value}
                  className="apply"
                  onClick={() => {
                    handleSaveTag(row_data, col_data, selectedValue);
                    setShowEditBox(false);
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  disabled={selectedValue === value}
                  className="apply"
                  onClick={() => {
                    handleSave(row_data, col_data, selectedValue);
                    setShowEditBox(false);
                  }}
                >
                  Save
                </button>
              )}
            </div>
          </div>
          {/* <div className="celledit-backdrop"></div> */}
        </>
      )}
      <button className="edit-btn" ref={buttonRef} onClick={handleEditClick}>
        <FaRegEdit />
      </button>
    </>
  );
};

export const CellEditV2 = ({
  showEditBox,
  showEditBoxPosition,
  setShowEditBox,
  InlineEditControl,
  masterdata,
  handleSave,
  handleSaveTag,
  UpdateselectedTagItem,
  setUpdateselectedTagItem,
  fetchUpdateLookupDetailsData,
  getUpdatetagData,
  setistagedited,
}) => {
  console.log(showEditBoxPosition);
  const UpdatedLeft = showEditBoxPosition.XRight - showEditBoxPosition.XLeft;
  console.log(UpdatedLeft);
  console.log(showEditBoxPosition.XLeft - UpdatedLeft);
  const { value, Title, controltype, masterid, row_data, col_data } =
    InlineEditControl;
  console.log(InlineEditControl);
  console.log(controltype);
  const [input, setInput] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [DefaultDropdownValue, setDefaultDropdownValue] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  console.log(controltype);
  console.log(masterid);
  console.log(row_data);
  console.log(col_data);
  console.log(masterdata);

  const getOptions = () => {
    const priorityObject = masterdata?.find(
      (item) => item.masterid === masterid
    );
    if (priorityObject) {
      return priorityObject.mastervalues.map((option) => ({
        value: option.optionid,
        label: option.optionvalue,
      }));
    }
    return [];
  };

  const handleRangeChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const handleDropdown = (newvalue) => {
    console.log(newvalue);
    setSelectedValue(newvalue.value);
    setDefaultDropdownValue({
      value: newvalue.value,
      label: newvalue.label,
    });
  };
  const handleText = (e) => {
    console.log(e.target.value);
    setSelectedValue(e.target.value);
  };
  const handleDateInputChange = (date) => {
    console.log(date);
    setStartDate(date);
    setSelectedValue(format(date, "MM/dd/yyyy"));
  };

  // ! Get Tag Data Start
  // ! Update Tag Values
  useEffect(() => {
    if (controltype == "groupdropdown") {
      const newTagItems = UpdateselectedTagItem.map((tag) => ({
        isnewtag: tag.isnewtag || false,
        tagid: tag.tagid || tag.optionid,
        tagname: tag.optionvalue,
      }));
      setSelectedValue(newTagItems);
    }
  }, [UpdateselectedTagItem]);
  // ! Update Tag Values

  // ! Get Tag Data End

  // ! Spent Hours Start
  const handleSpentHourChange = (e) => {
    let value = e.target.value;

    // Remove invalid characters
    value = value.replace(/[^0-9.hdwm]/g, "");

    // Check if there are multiple letters and remove all but the last one
    const letters = value.match(/[hdwm]/g);
    if (letters && letters.length > 1) {
      value = value.replace(/[hdwm]/g, ""); // Remove all letters
      value += letters[letters.length - 1]; // Append only the last letter
    }

    setInput(value);
    setSelectedValue(value);
  };

  const convertToHours = (inputValue) => {
    if (inputValue.trim() === "") {
      return "0"; // Return "0h" if input is empty
    }

    const regex = /^(\d*\.?\d*)([hwdm]?)$/; // Regular expression to match numerical value and unit
    const match = inputValue.match(regex);
    if (!match) {
      return "0"; // Return "0h" if input is invalid
    }
    const value = parseFloat(match[1]);
    const unit = match[2];

    let convertedHours;
    switch (unit) {
      case "d":
        // Convert days to working hours (8 hours per day)
        convertedHours = value * 8;
        break;
      case "w":
        // Convert weeks to working hours (5 days per week, 8 hours per day)
        convertedHours = value * 5 * 8;
        break;
      case "m":
        // Convert minutes to hours
        convertedHours = value / 60;
        break;
      default:
        // Assume input is already in hours
        convertedHours = value;
    }

    // Check if convertedHours is NaN
    if (isNaN(convertedHours)) {
      return "0"; // Return "0h" if conversion result is NaN
    }

    return Number.isInteger(convertedHours)
      ? convertedHours.toString()
      : convertedHours.toFixed(2);
  };

  const handleSpentHourBlur = (e) => {
    const convertedHours = convertToHours(e.target.value);
    const newInputValues = convertedHours + "h";
    let ConvertMinutes = (convertedHours * 60).toString();
    setInput(newInputValues);
    setSelectedValue(ConvertMinutes);
  };
  // ! Spent Hours End

  // ! popup state & Functions
  // const [showEditBox, setShowEditBox] = useState(false);

  const dropdownvalue = () => {
    if (value === "") {
      setDefaultDropdownValue(""); // Set to an empty string if value is empty
    } else {
      setDefaultDropdownValue({
        value: value,
        label: value,
      });
    }
  };

  const handleEditClick = () => {
    if (controltype == "groupdropdown") {
      setUpdateselectedTagItem([]);
    }

    setSelectedValue(
      controltype === "progressbar"
        ? ["", "-"].includes(value)
          ? "0"
          : value
        : value
    );
    setInput("");
    setStartDate(value ? new Date(value) : new Date());
    // Call the function to see the result
    dropdownvalue();
    // Toggle the edit box visibility
    // setShowEditBox((prevShowEditBox) => !prevShowEditBox);
  };
  useEffect(() => {
    handleEditClick();
    if (controltype == "groupdropdown") {
      setUpdateselectedTagItem([]);
    }
  }, [showEditBoxPosition]);
  const handleEditCancelClick = () => {
    setShowEditBox(false);
    if (controltype == "groupdropdown") {
      setUpdateselectedTagItem([]);
    }
    setDefaultDropdownValue({ value: value, label: value });
  };

  // ! popup state & Functions
  //   ~ Out Side Click
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowEditBox(false);
      if (controltype == "groupdropdown") {
        setUpdateselectedTagItem([]);
        console.log("test");
      }
      // setUpdateselectedTagItem([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(UpdateselectedTagItem);

  const renderControl = () => {
    switch (controltype) {
      case "textbox":
        return (
          <ArcTextBox
            ClassName=""
            PlaceHolder={`Enter Your ${Title}`}
            Name="name"
            Required={false}
            DefaultValue={value}
          />
        );
      case "textarea":
        return (
          <ArcTextarea
            ClassName=""
            PlaceHolder="Enter the details..."
            Name="textarea"
            Required={false}
            DefaultValue={value}
            ReadOnly={false}
            onChange={handleText}
          />
        );
      case "date":
        return (
          <ArcDatepicker
            dateFormat="MM/dd/yyyy"
            PlaceHolder="Select a Date"
            startDate={startDate}
            selected={startDate}
            ClassName=""
            onChange={(date) => handleDateInputChange(date)}
          />
        );
      case "dropdown":
        return (
          <ArcSingleSelect
            options={getOptions()}
            isClearable={false}
            PlaceHolder={`Select ${Title}`}
            ClassName=""
            onChange={handleDropdown}
            Value={DefaultDropdownValue}
          />
        );
      case "multiselect":
        return (
          <ArcSingleSelect
            options={getOptions()}
            isClearable={false}
            PlaceHolder={`Select ${Title}`}
            ClassName=""
            onChange={handleDropdown}
            Value={DefaultDropdownValue}
          />
        );
      case "progressbar":
        return (
          <ArcProgressRangeInput
            className="celledit"
            value={selectedValue}
            setValue={setSelectedValue}
            ShowLabel={false}
            step={10}
            onChange={handleRangeChange}
            name={Title}
          />
        );
      case "groupdropdown":
        return (
          <ArcCustomTag
            selectedItem={UpdateselectedTagItem}
            setSelectedItem={setUpdateselectedTagItem}
            fetchUpdateLookupDetails={fetchUpdateLookupDetailsData}
            getUpdateLookupDetailsData={getUpdatetagData}
            transactionId={row_data?.id}
            setistagedited={setistagedited}
            // Name={"Update Tag"}
          />
        );

      case "textbox_time":
        console.log(row_data.spendhourminutes);

        return (
          <ArcHourInput
            onChange={handleSpentHourChange}
            onBlur={handleSpentHourBlur}
            Value={input || undefined}
            DefaultValue={
              (row_data.spendhourminutes &&
                (row_data.spendhourminutes >= 60
                  ? (row_data.spendhourminutes / 60).toFixed(2) + "h"
                  : row_data.spendhourminutes + "m")) ||
              undefined
            }
            Required={false}
          />
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      {showEditBox && (
        <section
          ref={ref}
          className={`celledit-v2 ${showEditBoxPosition.ClassName}`}
          style={{
            top: `${showEditBoxPosition.YTop}px`,
            left: `${
              [
                "defaultHeight enlargedWidth",
                "enlargedHeight enlargedWidth",
              ].includes(showEditBoxPosition.ClassName)
                ? showEditBoxPosition.XLeft - (280 - UpdatedLeft)
                : showEditBoxPosition.XLeft
            }px`,
            bottom: `calc(100vh - ${showEditBoxPosition.YBottom}px)`,
            // right: `${showEditBoxPosition.XRight}px`,
            maxHeight: `calc(100vh - ${showEditBoxPosition.YTop + 10}px)`,
            position: "fixed",
          }}
        >
          <div className="header-content">
            {controltype === "progressbar" ? (
              <p>
                {Title.replace("%", "")}: <span>{selectedValue}%</span>
              </p>
            ) : (
              <p>{Title}</p>
            )}
          </div>
          <div className="body-content">
            {renderControl()}
            {/* <pre>{JSON.stringify(row_data, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(selectedValue, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(DefaultDropdownValue, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(UpdateselectedTagItem, null, 2)}</pre> */}
          </div>
          <div className="footer-content">
            <button className="cancel" onClick={handleEditCancelClick}>
              Cancel
            </button>

            {controltype == "groupdropdown" ? (
              <button
                // disabled={selectedValue === value}
                className="apply"
                onClick={() => {
                  handleSaveTag(row_data, col_data, selectedValue);
                  setShowEditBox(false);
                }}
              >
                Save
              </button>
            ) : (
              <button
                disabled={selectedValue === value}
                className="apply"
                onClick={() => {
                  handleSave(row_data, col_data, selectedValue);
                  setShowEditBox(false);
                }}
              >
                Save
              </button>
            )}
          </div>
        </section>
      )}
    </React.Fragment>
  );
};
