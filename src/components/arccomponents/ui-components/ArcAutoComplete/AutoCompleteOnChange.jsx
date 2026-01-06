/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React

import React, { useState, useRef, useEffect, useContext } from "react";
//? Assets
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
//? Components
import { addLookupDetail } from "@/redux/getlookupdetails/AddLookupDetails";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { IoSearch } from "react-icons/io5";
//? CSS

//? Images

//? JSON File

//? Icons
import { TbReload } from "react-icons/tb";
import { MdOutlineClear } from "react-icons/md";
import { SelectedRowContext } from "@/context/SelectedRow/SelectedRowContext";
import { useMutation } from "@tanstack/react-query";
import { checkForDuplicate } from "@/redux/AddTask/checkForDuplicate"; // Import the function
import { GetDefaultTaskInputs } from "@/redux/Task/AddTask/GetDefaultTaskInputs";
import {
  GetFormFields,
  resetFormFields,
} from "@/redux/GetFormFields/GetFormFields";
// *******~ Import ~******** //

const AutoCompleteOnChange = ({
  Label,
  ClassName,
  Type,
  PlaceHolder,
  Name,
  Required,
  DefaultValue,
  ReadOnly,
  Id,
  autoFocus,
  lookupId,
  selectedItem,
  setSelectedItem,
  istitlefiled,
  // setArcFilterPopupshow,
  handleAutoCompleteInputChange,
  // setTitleFieldValue,
  // titleFieldValue,
  setArcfilterPopupshow,
  Pagefrom,
  newValue,
}) => {
  console.log(selectedItem);

  const dispatch = useDispatch();
  // ! Autocomplete Start
  const [query, setQuery] = useState("");
  const inputQuery = useRef("");
  const [page, setPage] = useState(1);
  const Limit = 10;
  // const [selectedItem, setSelectedItem] = useState(null);
  const [mastervalues, setMastervalues] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [showAsNewTask, setShowAsNewTask] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [addnewtaskclicked, setaddnewtaskclicked] = useState(false);
  const containerRef = useRef(null);

  console.log(addnewtaskclicked);
  const {
    selectedRow1,
    setSelectedRow1,
    EditTaskShow,
    setTitleFieldValue,
    titleFieldValue,
  } = useContext(SelectedRowContext);
  const {
    ArcFilterPopupshow,
    setArcFilterPopupshow,
    setEditTaskShow,
    setAddTaskShow,
  } = useContext(SelectedRowContext);
  //~ Redux state
  const GetlookupdetailsData = useSelector(
    (state) => state.addLookupDetailState.response?.result?.data
  );
  const GetlookupdetailsLoading = useSelector(
    (state) => state.addLookupDetailState.loading
  );
  const GetlookupdetailCount = useSelector(
    (state) =>
      state.addLookupDetailState.response?.result?.data?.lookupvalues[0]
        ?.totalcount
  );
  console.log(GetlookupdetailsData, GetlookupdetailCount);
  //~ Redux state

  //   ! Set Master Values
  useEffect(() => {
    if (GetlookupdetailsData) {
      try {
        const parsedList = Array.isArray(
          GetlookupdetailsData.lookupvalues[0].mastervalues
        )
          ? GetlookupdetailsData.lookupvalues[0].mastervalues
          : JSON.parse(GetlookupdetailsData.lookupvalues[0].mastervalues);

        if (page === 1) {
          setMastervalues(parsedList);
        } else {
          // Combine existing mastervalues with new parsedList without duplicates
          setMastervalues((prev) => {
            const existingIds = prev.map((item) => item.optionid);
            const newValues = parsedList.filter(
              (item) => !existingIds.includes(item.optionid)
            );
            return [...prev, ...newValues];
          });
        }
      } catch (error) {
        console.error("Invalid JSON format:", error);
        setMastervalues([]);
      }
    }
  }, [page, GetlookupdetailsData]);

  useEffect(() => {
    setHasMore(GetlookupdetailCount > mastervalues.length);
  }, [mastervalues]);

  //   ! Set Master Values End

  //~ Add lookup details
  const FetchAddlookupdetails = (query, page) => {
    const RequestData = {
      lookupId: lookupId,
      limit: Limit.toString(),
      page: page.toString(),
      q: query,
    };
    dispatch(addLookupDetail(RequestData));
  };
  // const TaskValidationResponseStatus = useSelector(
  //   (state) => state.addTaskValidationState.response
  // );
  // const taskresponseresult = TaskValidationResponseStatus?.result;

  // Define the mutation
  const mutation = useMutation({
    mutationFn: checkForDuplicate,
    onSuccess: (data) => {
      console.log("Response data:", data);
      if (data?.result?.response === "Task Already Exists.") {
        setShowAsNewTask(false);
      } else if (data?.result?.response === "Task Not Exists.") {
        setShowAsNewTask(true);
      }
    },
    onError: (error) => {
      console.error(
        "Error occurred:",
        error.message || "An error occurred during the request"
      );
    },
  });
  //~ Handle input change
  // const handleInputChange = (e) => {
  //   const newQuery = e.target.value;
  //   setQuery(newQuery);
  //   inputQuery.current = e.target.value;
  //   setIsFocused(newQuery !== "");
  //   handleAutoCompleteInputChange(newQuery);
  //   FetchAddlookupdetails(query, 1);

  //   const DuplicatecheckpostRequest = [
  //     {
  //       id: "81dc071c-363a-4a42-bde9-f8663c06e95a",
  //       tablename: "utbl_Workitem",
  //       apiname: "column16",
  //       value: newQuery,
  //       columntype: "text",
  //     },
  //   ];

  //   const requestData = {
  //     entityid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //     userid: window.sessionStorage.getItem("Globalid"),
  //     data: DuplicatecheckpostRequest,
  //   };
  //   console.log(requestData);

  //   // Trigger the mutation
  //   mutation.mutate(requestData);
  // };
  const typingTimeoutRef = useRef(null); // Ref to store timeout
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    inputQuery.current = newQuery;

    // Clear the previous timeout
    clearTimeout(typingTimeoutRef.current);

    // Set a new timeout to trigger after 2 seconds
    typingTimeoutRef.current = setTimeout(() => {
      handleAutoCompleteInputChange(newQuery);
      FetchAddlookupdetails(newQuery, 1); // Assuming this is a function you have

      const DuplicatecheckpostRequest = [
        {
          id: "81dc071c-363a-4a42-bde9-f8663c06e95a",
          tablename: "utbl_Workitem",
          apiname: "column16",
          value: newQuery,
          columntype: "text",
        },
      ];

      const requestData = {
        entityid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userid: window.sessionStorage.getItem("Globalid"),
        data: DuplicatecheckpostRequest,
      };

      console.log(requestData);
      // Trigger the mutation
      mutation.mutate(requestData);
      setIsFocused(true);
    }, 1000); // Delay of 2 seconds
  };

  console.log(inputQuery);

  // const handleInputChange = (e) => {
  //   const newQuery = e.target.value;
  //   setQuery(newQuery);
  //   newQuery != "" ? setIsFocused(true) : setIsFocused(false);

  //   const DuplicatecheckpostRequest = [];
  //   DuplicatecheckpostRequest.push({
  //     id: "81dc071c-363a-4a42-bde9-f8663c06e95a",
  //     tablename: "utbl_Workitem",
  //     apiname: "column16",
  //     value: newQuery,
  //     columntype: "text",
  //   });
  //   // const requestData = {
  //   //   entityid: "26B84156-CC30-416E-99D5-B37409B4D0BD",
  //   //   // transactionid: "26B84156-CC30-416E-99D5-B37409B4D0BD",
  //   //   userid: sessionStorage.getItem("Globalid"),
  //   //   data: DuplicatecheckpostRequest,
  //   // };
  //   const frompage = "taskautocomplete";
  //   try {
  //     let loggedUserId = window.sessionStorage.getItem("Globalid");
  //     const requestData = {
  //       entityid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //       userid: loggedUserId,
  //       data: data,
  //     };
  //     const response = await fetch(
  //       API_TEST_URL + "/planexecution/getduplicatecheckresult",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Access-Control-Allow-Origin": "*",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(requestData),
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorResponse = await response.json();
  //       throw new Error(
  //         `HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`
  //       );
  //     }

  //     const responseData = await response.json();
  //     if (responseData?.result?.response === "Task Already Exists.") {
  //       if (frompage != "taskautocomplete") {
  //         ArcFaild({
  //           Title: "Failed",
  //           Message: responseData?.result?.response,
  //           position: "top-right",
  //         });
  //       }
  //     }

  //     console.log(responseData);
  //     return responseData;
  //   } catch (error) {
  //     throw error.message || "An error occurred during the request";
  //   }

  //   if (taskresponseresult) {
  //     if (taskresponseresult?.response === "Task Not Exists.") {
  //       setShowAsNewTask(true);
  //     }
  //   }
  //   // setPage(1);
  //   // FetchAddlookupdetails(newQuery, 1);
  // };

  //~ Handle input focus
  const handleInputFocus = () => {
    if (!isFocused) {
      setPage(1);
    }
  };

  // ~ handle Checkbox Change
  const handleCheckboxChange = (mastervalue) => {
    if (selectedItem && selectedItem.optionid === mastervalue.optionid) {
      setSelectedItem(null); // Deselect if the same item is clicked again
    } else {
      setSelectedItem(mastervalue); // Set the selected item
      setIsFocused(false);
      setMastervalues([]);
      setPage(1);
      setQuery("");
    }
  };

  //~ Load more data
  // const loadMoreData = () => {
  //   istitlefiled === 1 ? (
  //   const newPage = page + 1,
  //   setPage(newPage),
  //   FetchAddlookupdetails(query, newPage)):(

  //       setArcFilterPopupshow(true);
  //       console.log("test");

  //   )
  // };

  const loadMoreData = () => {
    istitlefiled !== 1
      ? (() => {
          const newPage = page + 1;
          setPage(newPage);
          FetchAddlookupdetails(query, newPage);
        })()
      : (() => {
          setArcFilterPopupshow(true);
          const postRequest = [
            {
              filterid: "bb7f219e-d5aa-4aa3-ba78-2b942f6aed03",
              apiname: "column16",
              filtervalue: query,
              controltype: "textbox",
              condition: "OR",
            },
          ];

          setTitleFieldValue(postRequest);
          console.log("test");
        })();
  };
  const GetAddForm = (formid) => {
    // dispatch(resetFormFields());
    dispatch(GetFormFields(formid));
  };
  //~ Handle click outside
  const handleedittransChange = (mastervalue) => {
    console.log(mastervalue);
    var selrow = [];
    selrow.push(mastervalue);
    setSelectedRow1(selrow);
    setAddTaskShow(false);
    setEditTaskShow(true);
    const formid = "8EC23FBD-FB89-437E-8629-62E5EC2613E9";

    GetAddForm(formid);
    // Prepare the data object in the required format
    const requestData = {
      transactionid: mastervalue.optionid,
      formid: formid,
    };
    dispatch(GetDefaultTaskInputs(requestData));
    // alert("handleedittransChange");
  };
  console.log(query);

  const handleClickOutside = (event) => {
    setaddnewtaskclicked(true);
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      console.log(isFocused);
      if (isFocused === true) {
        handleAutoCompleteInputChange(query);
      }

      setIsFocused(false);

      setMastervalues([]);
      setPage(1);
      console.log(addnewtaskclicked);

      addnewtaskclicked
        ? setQuery(inputQuery.current)
        : setQuery(inputQuery.current);

      // setQuery("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="arc-input-control-lookup-details add-lookup"
        ref={containerRef}
      >
        <div
          className={`arc-input-control arc-textbox ${ClassName} ${
            Required ? "mandatory-field" : null
          }`}
        >
          {Label && (
            <Form.Label>
              {Label} {Required && <sup>*</sup>}
            </Form.Label>
          )}

          <div className="input-control-inside" onClick={handleInputFocus}>
            {
              <Form.Control
                type={Type}
                placeholder={PlaceHolder}
                name={Name}
                defaultValue={DefaultValue}
                // value={query || newValue}
                value={query}
                onChange={handleInputChange}
                required={Required}
                // onBlur={handleAutoCompleteInputChange(query)} // Handle focus out
                readOnly={ReadOnly}
                id={Id}
                autoFocus={autoFocus}
                autoComplete="off"
              />
            }

            {isFocused && (
              <>
                <ArcToolTip
                  as="span"
                  className="clear-btn"
                  HoverText="Search"
                  BtnName={<IoSearch />}
                  Placement="left"
                  onClick={() => {
                    // setSelectedItem(null);
                    loadMoreData();
                    // const postRequest = [
                    //   {
                    //     filterid: "bb7f219e-d5aa-4aa3-ba78-2b942f6aed03",
                    //     apiname: "column16",
                    //     filtervalue: query,
                    //     controltype: "textbox",
                    //     condition: "OR",
                    //   },
                    // ];
                    // setTitleFieldValue(postRequest);
                    // setIsFocused(false);
                    // setArcFilterPopupshow(true);
                    // setMastervalues([]);

                    // setPage(1);
                  }}
                />
              </>
            )}
          </div>
        </div>
        {isFocused && (
          <>
            <div className="search-inputs">
              <ul className={`suggestions-list ${hasMore ? "" : "ishasmore"}`}>
                <li
                  className="suggestion-item not-found-item"
                  onClick={() => {
                    setIsFocused(false);
                    handleAutoCompleteInputChange(query);
                  }}
                >
                  {showAsNewTask && "add new Task-  " + query}
                </li>
                <>
                  {mastervalues.map((mastervalue, subIndex) => (
                    <React.Fragment key={subIndex}>
                      {MasterList(mastervalue)}
                    </React.Fragment>
                  ))}
                </>
                {
                  <>
                    <li className="suggestion-item not-found-item">
                      <div className="load-more-container">
                        <span onClick={loadMoreData}>
                          {/* <TbReload />  */}
                          <TbReload />
                          {istitlefiled !== 1 ? "Load More" : "Search More...."}
                        </span>
                      </div>
                    </li>
                  </>
                }

                {GetlookupdetailsLoading && (
                  <li className="suggestion-item not-found-item">Loading...</li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );

  function MasterList(mastervalue) {
    return (
      <li
        className="suggestion-item no-inputs single-select"
        onClick={() => handleedittransChange(mastervalue)}
      >
        <label
          htmlFor={mastervalue.optionid}
          className={
            selectedItem?.optionid === mastervalue.optionid ? "active" : null
          }
        >
          <input
            className="default"
            type="radio"
            name="lookup"
            checked={selectedItem?.optionid === mastervalue.optionid}
            onChange={() => handleCheckboxChange(mastervalue)}
            id={mastervalue.optionid}
          />
          {mastervalue.optionvalue}
        </label>
      </li>
    );
  }
};

export default AutoCompleteOnChange;
