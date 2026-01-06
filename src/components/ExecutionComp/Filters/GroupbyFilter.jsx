// import React, { useState, useEffect } from "react";

// import { MdOutlineCancel } from "react-icons/md";

// import Select from "react-select";

// import { useDispatch, useSelector } from "react-redux";

// import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";

// import {
//   listInfo,
//   groupMasterDataInfo,
//   newgroupbydataInfo,
//   masterDataInfo,
//   newDatasetIDInfo,
//   GroupByhorizontalInfo,
// } from "@/redux/Execution/selector";

// import { createGroupByData } from "@/redux/Execution/actions";

// export const GroupByFilter = ({
//   GroupFilterPopup,
//   setGroupFilterPopup,
//   GroupFilterButtonRef,
// }) => {
//   const dispatch = useDispatch();
//   //const groupByData = useSelector(selectgroupbydata);
//   const groupByData = useSelector(newgroupbydataInfo);
//   console.log(groupByData);
//   const horizontalGroupBy = useSelector(GroupByhorizontalInfo);
//   console.log(horizontalGroupBy);
//   // const lookUpDetails = useSelector(selectlookupInfo);
//   const DataSetID = useSelector(newDatasetIDInfo);

//   const lookUpDetails = useSelector(masterDataInfo);
//   console.log(lookUpDetails);

//   const handleGroupFilterPopup = () => {
//     setGroupFilterPopup(false);
//   };
//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       const buttonClicked =
//         GroupFilterButtonRef.current &&
//         GroupFilterButtonRef.current.contains(event.target);
//       const clearButtonClicked = event.target.closest(
//         ".add-contact-select__indicator.add-contact-select__clear-indicator"
//       );

//       if (
//         GroupFilterPopup &&
//         !buttonClicked &&
//         !clearButtonClicked &&
//         event.target.closest(".custom-filtered-div.group-by-filter") === null &&
//         event.target.closest(".add-contact-select__control") === null
//       ) {
//         setGroupFilterPopup(false);
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, [GroupFilterPopup, setGroupFilterPopup, GroupFilterButtonRef]);

//   const [HorizontalDir, setHorizontalDir] = useState("asc");
//   const [VerticalDir, setVerticalDir] = useState("asc");
//   const [selectedValues, setSelectedValues] = useState([]);

//   useEffect(() => {
//     setSelectedValues([]);
//     setVerticalDir("asc");
//     setHorizontalDir("asc");
//   }, [DataSetID]);

//   useEffect(() => {
//     // Find and set direction for vertical and horizontal group by
//     groupByData.forEach((item) => {
//       if (item.defaultvalue !== "") {
//         if (item.type === "Vertical") {
//           setVerticalDir(item.direction);
//           setSelectedValues([
//             ...selectedValues,
//             {
//               id: item.id,
//               type: item.type,
//               dir: item.direction, // Use HorizontalDir for direction
//             },
//           ]);
//         } else if (item.type === "Horizontal") {
//           setHorizontalDir(item.direction);
//           setSelectedValues([
//             ...selectedValues,
//             {
//               id: item.id,
//               type: item.type,
//               dir: item.direction, // Use HorizontalDir for direction
//             },
//           ]);
//         }
//       }
//     });
//   }, [groupByData]);
//   //workday_Group
//   useEffect(() => {
//     if (
//       lookUpDetails?.length > 0 &&
//       groupByData.length > 0 &&
//       groupByData[0].api_name === "workweek_Group" &&
//       horizontalGroupBy.length === 0
//     ) {
//       const mappedItems = groupByData.filter(
//         (item) =>
//           item.type === "Horizontal" && item.api_name === "workweek_Group"
//       ); // Filter items where ismapped is true
//       const updatedSelectedValues = mappedItems.map((item) => {
//         // Create the object in the required format for selectedValues array
//         const lookupDetail = lookUpDetails?.find(
//           (detail) => detail.masterid === item.masterid
//         );
//         const groupByMastervalues = lookupDetail?.mastervalues || "";
//         console.log(groupByMastervalues);
//         const sortedMastervalues = [...groupByMastervalues].sort((a, b) => {
//           if (item.direction === "asc") {
//             return a.optionvalue.localeCompare(b.optionvalue);
//           } else {
//             return b.optionvalue.localeCompare(a.optionvalue);
//           }
//         });
//         console.log(sortedMastervalues);

//         if (item.defaultvalue === "") {
//           const today = new Date();
//           console.log(today);
//           const formattedToday = today.toLocaleDateString("en-US", {
//             month: "2-digit",
//             day: "2-digit",
//             year: "numeric",
//           });

//           var todayValue = sortedMastervalues.find((item) => {
//             const itemDate = item.value;
//             return itemDate === formattedToday;
//           });
//           if (!todayValue) {
//             todayValue = sortedMastervalues[0];
//           }
//           console.log(todayValue);
//         } else {
//           var defValue = sortedMastervalues.find((sorteditem) => {
//             const itemDate = sorteditem.value;
//             return itemDate === item.defaultvalue;
//           });
//           if (!defValue) {
//             defValue = sortedMastervalues[0];
//           }
//           console.log(defValue);
//         }

//         return {
//           id: item.id,
//           type: item.type,
//           api_name: item.api_name,
//           masterid: item.masterid,
//           mastervalues: sortedMastervalues, // Initialize mastervalues as an empty array
//           value: todayValue ? todayValue?.optionid : defValue?.optionid, // Use defaultvalue as value
//           dir: item.direction, // Use direction as dir
//           grpbyDate: todayValue ? todayValue?.value : item.defaultvalue,
//         };
//       });
//       console.log(updatedSelectedValues);
//       if (
//         updatedSelectedValues.length > 0 &&
//         updatedSelectedValues[0].grpbyDate !== undefined
//       ) {
//         console.log(updatedSelectedValues);
//         dispatch(createGroupByData(updatedSelectedValues));
//       }
//       // Update selectedValues state with the new items
//       setSelectedValues(updatedSelectedValues);
//     }
//   }, [groupByData, lookUpDetails]);

//   useEffect(() => {
//     if (
//       lookUpDetails?.length > 0 &&
//       groupByData.length > 0 &&
//       groupByData[0].api_name === "workday_Group" &&
//       horizontalGroupBy.length === 0
//     ) {
//       const mappedItems = groupByData.filter(
//         (item) =>
//           item.type === "Horizontal" && item.api_name === "workday_Group"
//       ); // Filter items where ismapped is true
//       const updatedSelectedValues = mappedItems.map((item) => {
//         // Create the object in the required format for selectedValues array
//         const lookupDetail = lookUpDetails?.find(
//           (detail) => detail.masterid === item.masterid
//         );
//         const groupByMastervalues = lookupDetail?.mastervalues || "";
//         console.log(groupByMastervalues);
//         const sortedMastervalues = [...groupByMastervalues].sort((a, b) => {
//           if (item.direction === "asc") {
//             return a.optionvalue.localeCompare(b.optionvalue);
//           } else {
//             return b.optionvalue.localeCompare(a.optionvalue);
//           }
//         });
//         console.log(sortedMastervalues);

//         return {
//           id: item.id,
//           type: item.type,
//           api_name: item.api_name,
//           masterid: item.masterid,
//           mastervalues: sortedMastervalues, // Initialize mastervalues as an empty array
//           value:
//             item.defaultvalue === ""
//               ? sortedMastervalues[0].optionid
//               : item.defaultvalue,
//           dir: item.direction, // Use direction as dir
//         };
//       });
//       console.log(updatedSelectedValues);
//       if (updatedSelectedValues.length > 0) {
//         dispatch(createGroupByData(updatedSelectedValues));
//       }
//       // Update selectedValues state with the new items
//       setSelectedValues(updatedSelectedValues);
//     }
//   }, [groupByData, lookUpDetails]);

//   // Click event handler for asc and desc buttons in horizontal group by
//   const handleHorizontalDirectionChange = (direction) => {
//     setHorizontalDir(direction);

//     // Find the index of the object with type "Horizontal" in selectedValues
//     const horizontalIndex = selectedValues.findIndex(
//       (item) => item.type === "Horizontal"
//     );

//     // If the object with type "Horizontal" exists in selectedValues, update its dir property
//     if (horizontalIndex !== -1) {
//       const lookupDetail = lookUpDetails.find(
//         (detail) => detail.masterid === selectedValues[horizontalIndex].masterid
//       );
//       const groupByMastervalues = lookupDetail?.mastervalues || [];

//       // Create a copy of groupByMastervalues array before sorting
//       const sortedMastervalues = [...groupByMastervalues].sort((a, b) => {
//         if (direction === "asc") {
//           return a.optionvalue.localeCompare(b.optionvalue);
//         } else {
//           return b.optionvalue.localeCompare(a.optionvalue);
//         }
//       });

//       // Get the optionid of the first element after sorting
//       const groupByOption = sortedMastervalues[0]?.optionid || "";

//       const updatedSelectedValues = [...selectedValues];
//       updatedSelectedValues[horizontalIndex] = {
//         ...updatedSelectedValues[horizontalIndex], // Maintain other properties
//         dir: direction, // Update the dir property with the new direction
//         mastervalues: sortedMastervalues, // Update mastervalues with the sorted array
//         value: groupByOption, // Update the value with the optionid of the first element
//       };
//       setSelectedValues(updatedSelectedValues);
//     }
//   };

//   // Click event handler for asc and desc buttons in vertical group by
//   const handleVerticalDirectionChange = (direction) => {
//     setVerticalDir(direction);

//     // Find the index of the object with type "Horizontal" in selectedValues
//     const verticalIndex = selectedValues.findIndex(
//       (item) => item.type === "Vertical"
//     );

//     // If the object with type "Horizontal" exists in selectedValues, update its dir property
//     if (verticalIndex !== -1) {
//       const updatedSelectedValues = [...selectedValues];
//       updatedSelectedValues[verticalIndex] = {
//         ...updatedSelectedValues[verticalIndex], // Maintain other properties
//         dir: direction, // Update the dir property with the new direction
//       };
//       setSelectedValues(updatedSelectedValues);
//     }
//   };

//   const handleSelectVertical = (selectedOption) => {
//     const lookupDetail = lookUpDetails.find(
//       (detail) => detail.masterid === selectedOption.masterid
//     );
//     const groupByOption = lookupDetail?.mastervalues[0]?.optionid || "";
//     const groupByMastervalues = lookupDetail?.mastervalues || "";
//     // Check if selectedValues already contains an object with the same type
//     const existingIndex = selectedValues.findIndex(
//       (item) => item.type === selectedOption.type
//     );

//     // If the type is already present, update its screenfieldid and dir
//     if (existingIndex !== -1) {
//       const updatedSelectedValues = [...selectedValues];
//       updatedSelectedValues[existingIndex] = {
//         screenfieldid: selectedOption.screenfieldid,
//         type: selectedOption.type,
//         masterid: selectedOption.masterid,
//         mastervalues: groupByMastervalues,
//         api_name: selectedOption.api_name,
//         value: groupByOption,
//         dir: VerticalDir, // Update direction with HorizontalDir state
//       };
//       setSelectedValues(updatedSelectedValues);
//     } else {
//       // If the type is not present, add a new object to selectedValues
//       setSelectedValues([
//         ...selectedValues,
//         {
//           screenfieldid: selectedOption.screenfieldid,
//           type: selectedOption.type,
//           masterid: selectedOption.masterid,
//           api_name: selectedOption.api_name,
//           mastervalues: groupByMastervalues,
//           value: groupByOption,
//           dir: VerticalDir, // Use HorizontalDir for direction
//         },
//       ]);
//     }
//   };

//   const handleSelectHorizontal = (selectedOption) => {
//     console.log(selectedOption);
//     if (selectedOption === null) {
//       // Reset selectedValues array to empty
//       setSelectedValues([]);
//     } else {
//       const lookupDetail = lookUpDetails.find(
//         (detail) => detail.masterid === selectedOption.masterid
//       );
//       // const groupByOption = lookupDetail?.mastervalues[0]?.optionid || "";

//       const groupByMastervalues = lookupDetail?.mastervalues || [];

//       // Sort mastervalues based on optionvalue and HorizontalDir
//       const sortedMastervalues = [...groupByMastervalues].sort((a, b) => {
//         console.log(HorizontalDir);
//         if (HorizontalDir === "asc") {
//           return a.optionvalue.localeCompare(b.optionvalue);
//         } else {
//           return b.optionvalue.localeCompare(a.optionvalue);
//         }
//       });
//       console.log(sortedMastervalues);
//       //    Get the optionid of the first element after sorting
//       const groupByOption = sortedMastervalues[0]?.optionid || "";
//       console.log(groupByOption);
//       // Check if selectedValues already contains an object with the same type
//       const existingIndex = selectedValues.findIndex(
//         (item) => item.type === selectedOption.type
//       );

//       // If the type is already present, update its screenfieldid and dir
//       if (existingIndex !== -1) {
//         const updatedSelectedValues = [...selectedValues];
//         updatedSelectedValues[existingIndex] = {
//           id: selectedOption.value,
//           type: selectedOption.type,
//           masterid: selectedOption.masterid,
//           api_name: selectedOption.api_name,
//           mastervalues: sortedMastervalues,
//           value: groupByOption,
//           dir: HorizontalDir, // Update direction with HorizontalDir state
//         };
//         setSelectedValues(updatedSelectedValues);
//       } else {
//         // If the type is not present, add a new object to selectedValues
//         setSelectedValues([
//           ...selectedValues,
//           {
//             id: selectedOption.value,
//             type: selectedOption.type,
//             masterid: selectedOption.masterid,
//             api_name: selectedOption.api_name,
//             mastervalues: sortedMastervalues,
//             value: groupByOption,
//             dir: HorizontalDir, // Use HorizontalDir for direction
//           },
//         ]);
//       }
//     }
//   };

//   console.log(selectedValues);
//   return (
//     <>
//       <div
//         className={`custom-filtered-div group-by-filter ${
//           GroupFilterPopup && "active"
//         }`}
//       >
//         <div className="header-div">
//           <div className="header">
//             <p>Group by</p>
//             {/* <span onClick={handleGroupFilterPopup}>
//                 <MdOutlineCancel />
//               </span> */}
//             <ArcToolTip
//               HoverText="Close"
//               BtnName={<MdOutlineCancel />}
//               Placement="left"
//               onClick={handleGroupFilterPopup}
//               as="span"
//             />
//           </div>
//         </div>
//         <div className="main-div">
//           {/* <div className=" group-div  vertical">
//               <div className="title">
//                 <p>Vertical Group By</p>
//                 <span>
//                   <button
//                     className={VerticalDir === "asc" ? "active" : ""}
//                     onClick={() => handleVerticalDirectionChange("asc")}
//                   >
//                     asc
//                   </button>{" "}
//                   |{" "}
//                   <button
//                     className={VerticalDir === "desc" ? "active" : ""}
//                     onClick={() => handleVerticalDirectionChange("desc")}
//                   >
//                     desc
//                   </button>
//                 </span>
//               </div>
//               <GroupByDropDown
//                 type="Vertical"
//               />
//             </div> */}
//           <div className="group-div horizontal">
//             <div className="title">
//               <p>Horizontal Group By</p>
//               <span>
//                 <button
//                   className={HorizontalDir === "asc" ? "active" : ""}
//                   onClick={() => handleHorizontalDirectionChange("asc")}
//                 >
//                   asc
//                 </button>{" "}
//                 |{" "}
//                 <button
//                   className={HorizontalDir === "desc" ? "active" : ""}
//                   onClick={() => handleHorizontalDirectionChange("desc")}
//                 >
//                   desc
//                 </button>
//               </span>
//             </div>
//             <GroupByDropDown
//               type="Horizontal"
//               onSelect={handleSelectHorizontal}
//             />
//           </div>
//         </div>
//         <div className="footer-div">
//           {/* <button className="reset">Reset to default</button> */}
//           <button onClick={handleGroupFilterPopup} className="cancel">
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               handleGroupFilterPopup();
//               dispatch(createGroupByData(selectedValues));
//             }}
//           >
//             Apply
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// const GroupByDropDown = ({ type, onSelect }) => {
//   const [selectedValue, setSelectedValue] = useState(null);
//   const [options, setOptions] = useState([]);
//   //  const groupByData = useSelector(selectgroupbydata);

//   // const groupByData = useSelector(groupMasterDataInfo);
//   const groupByData = useSelector(newgroupbydataInfo);
//   console.log(groupByData);

//   useEffect(() => {
//     const newOptions = [];
//     let defaultOption = null;

//     groupByData?.forEach((item) => {
//       const option = {
//         value: item.id,
//         label: item.name,
//         // screenfieldid: item.screenfieldid,
//         type: type,
//         masterid: item.masterid,
//         api_name: item.api_name,
//       };

//       // Check if the item is mapped and matches the current type
//       if (item.defaultvalue !== "" && item.type === type) {
//         // Set defaultOption based on type
//         if (type === "Vertical") {
//           defaultOption = option;
//         } else if (type === "Horizontal") {
//           defaultOption = option;
//         }
//       } else {
//         // Add all other items as options
//         newOptions.push(option);
//       }
//     });
//     console.log(defaultOption);

//     // If there is a default option, set it as the first option
//     if (defaultOption) {
//       setOptions([defaultOption, ...newOptions]);
//       setSelectedValue(defaultOption);
//     } else {
//       // If there is no default option, set options to all items
//       setOptions(newOptions);
//       setSelectedValue(null);
//     }
//   }, [groupByData, type]);

//   const handleSelect = (selectedOption) => {
//     setSelectedValue(selectedOption);
//     onSelect(selectedOption);
//   };

//   return (
//     <div className="input-control">
//       <div className="select-div">
//         <Select
//           options={options}
//           value={selectedValue}
//           classNamePrefix="add-contact-select"
//           onChange={handleSelect}
//           isClearable
//         />
//       </div>
//     </div>
//   );
// };

// export default GroupByDropDown;
