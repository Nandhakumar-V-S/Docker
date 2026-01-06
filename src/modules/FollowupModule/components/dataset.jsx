import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import AccordionContext from "react-bootstrap/AccordionContext";

import Modal from "react-bootstrap/Modal";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";

import { MdOutlineCancel } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { IoMdArrowDropup } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
// *******~ Import ~******** //

import {
  createDataset,
  setNewDatasetID,
  deleteDataset,
  updateDataset,
} from "@/redux/Followup/actions";

import {
  dataSetListInfo,
  totalColumnsInfo,
  quickFilterDataInfo,
  matchedLookupInfo,
  textFilterInfo,
  additionalFiltersInfo,
  createGroupByDataInfo,
  listidInfo,
  newLayoutInfo,
  useridInfo,
  savedDatasetidInfo,
} from "@/redux/Followup/selector";

const DataSetPopup = ({
  DataSetPopupShow,
  setDataSetPopupShow,
  DataSetButton,
  DATASET_API,
}) => {
  const dispatch = useDispatch();
  const dataSetList = useSelector(dataSetListInfo);
  console.log("dataSetList", dataSetList);
  const savedDatasetid = useSelector(savedDatasetidInfo);
  //const { entityData } = EntityDataset;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const buttonClicked =
        DataSetButton.current && DataSetButton.current.contains(event.target);

      if (
        DataSetPopupShow &&
        !buttonClicked &&
        event.target.closest(".dataset-popup") === null
      ) {
        setDataSetPopupShow(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [DataSetPopupShow, setDataSetPopupShow, DataSetButton]);
  const [selectedDatasetId, setSelectedDatasetId] = useState("");
  const [selectedEditDatasetId, setSelectedEditDatasetId] = useState("");
  const [selectedDatasetTitle, setSelectedDatasetTitle] = useState("");
  const handleButtonClick = (e, datasetId) => {
    console.log(e);
    if (e.target.tagName === "BUTTON") {
      if (datasetId === savedDatasetid) {
        console.log("Same dataSetID received, exiting");
        setDataSetPopupShow(false);
        return;
      } else {
        dispatch(setNewDatasetID(datasetId));
        setDataSetPopupShow(false);
      }
    }
  };

  const handleDeleteDataset = (e, datasetId) => {
    e.stopPropagation();
    dispatch(deleteDataset(datasetId));
    setDataSetPopupShow(false);
  };
  console.log(selectedDatasetId);
  return (
    <section className={`dataset-popup ${DataSetPopupShow && "show"}`}>
      <div className="dataset-header">
        <h4>
          Entity&nbsp;<span>- Dataset</span>
        </h4>
        <CreateData
          setDataSetPopupShow={setDataSetPopupShow}
          Editable={false}
        />
      </div>
      <div className="dataset-content">
        <Accordion defaultActiveKey="0">
          <CustomToggle eventKey="0">
            <h4>My Dataset</h4>
            <span>
              <IoMdArrowDropup />
            </span>
          </CustomToggle>
          <Accordion.Collapse eventKey="0">
            <div className="dataset-list">
              <ul>
                {dataSetList?.map(
                  (data, index) =>
                    !data.isdefault && (
                      <li key={data.datasetid}>
                        <button
                          className={data.isselected && "active"}
                          onClick={(e) => handleButtonClick(e, data.datasetid)}
                        >
                          {data.title.length > 25
                            ? data.title.slice(0, 25) + "..."
                            : data.title}

                          <div className="action">
                            {/* <span
                                onClick={(e) =>
                                  handleEditDataset(e, data.datasetid)
                                }
                              >
                                <BiSolidEditAlt />
                              </span> */}
                            {/* <CreateData
                                setDataSetPopupShow={setDataSetPopupShow}
                                Editable={true}
                                data={data}
                                handleDeleteDataset={handleDeleteDataset}
                              />
                              <DataSetDelet data={data} /> */}
                            {data.isselected && ( // Conditionally render CreateData component
                              <>
                                <CreateData
                                  setDataSetPopupShow={setDataSetPopupShow}
                                  Editable={true}
                                  data={data}
                                  handleDeleteDataset={handleDeleteDataset}
                                />
                                <DataSetDelet data={data} />
                              </>
                            )}
                          </div>
                        </button>
                      </li>
                    )
                )}
              </ul>
            </div>
          </Accordion.Collapse>
        </Accordion>
        <Accordion defaultActiveKey="0">
          <CustomToggle eventKey="0">
            <h4>Application Dataset</h4>
            <span>
              <IoMdArrowDropup />
            </span>
          </CustomToggle>
          <Accordion.Collapse eventKey="0">
            <>
              <div className="dataset-list">
                <ul>
                  {dataSetList?.map(
                    (data, index) =>
                      data.isdefault && (
                        <li key={data.datasetid}>
                          <button
                            className={data.isselected && "active"}
                            onClick={(e) =>
                              handleButtonClick(e, data.datasetid)
                            }
                          >
                            {data.title}
                          </button>
                        </li>
                      )
                  )}
                </ul>
              </div>
            </>
          </Accordion.Collapse>
        </Accordion>
      </div>
    </section>
  );
};
export default DataSetPopup;

function CustomToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      className={`dataset-title ${isCurrentEventKey && "active"}`}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

function CreateData({
  setDataSetPopupShow,
  Editable,
  selectedDatasetTitle,
  data,
}) {
  const dispatch = useDispatch();
  const newlistid = useSelector(listidInfo);
  const userid = useSelector(useridInfo);

  const [CreateDatashow, setCreateDatashow] = useState(false);
  const CreateDatashowClose = (e) => {
    if (e) {
      console.log(e);
      e.stopPropagation();
    }
    setCreateDatashow(false);
    setValidationError("");
    setDatasetResult((prevState) => ({
      ...prevState,
      datasetname: "", // Reset datasetname to initial state
    }));
  };
  const CreateDatashowShow = () => {
    setCreateDatashow(true);
    setDataSetPopupShow(false);
    setValidationError("");
  };
  const matchedLookup = useSelector(matchedLookupInfo);
  const textFilter = useSelector(textFilterInfo);
  console.log(matchedLookup);
  console.log(textFilter);
  const dataSetList = useSelector(dataSetListInfo);
  // const { entityData } = EntityDataset;
  const [datasetName, setDatasetName] = useState("");
  const [validationError, setValidationError] = useState("");
  // const MappedColumns = useSelector(selectMappedColumns);
  const totalColumns = useSelector(totalColumnsInfo);
  const newLayout = useSelector(newLayoutInfo);
  console.log(" newLayout,", newLayout);
  const createGroupByData = useSelector(createGroupByDataInfo);
  console.log("createGroupByData", createGroupByData);
  const filterData = useSelector(quickFilterDataInfo);
  console.log(filterData);

  const additionalFilters = useSelector(additionalFiltersInfo);
  console.log(additionalFilters);

  //const sortedColumns = MappedColumns?.sort((a, b) => a.seq - b.seq);
  const sortedColumn = totalColumns?.filter((column) => column.ismapped);
  console.log(sortedColumn);

  // const selectedColumns = sortedColumns?.map((column, index) => ({
  //   screenfieldid: column.screenfieldid,
  //   sequence: index + 1,
  //   columnwidth: column.columnwidth,
  // }));

  let selectedColumns;

  if (newLayout && newLayout.length > 0) {
    // If columnSequence has elements, use it as selectedColumns
    selectedColumns = newLayout.map((column) => ({
      id: column.listfieldid,
      sequence: column.columnsequence,
      columnwidth: column.columnwidth,
    }));
  }

  // if (sortedColumn && sortedColumn.length > 0) {
  //   // If columnSequence has elements, use it as selectedColumns
  //   selectedColumns = sortedColumn.map((column) => ({
  //     id: column.id,
  //     sequence: column.seqno,
  //     columnwidth: column.columnwidth,
  //   }));
  // }
  // else {
  //   // If columnSequence is empty or undefined, use sortedColumns
  //   selectedColumns = sortedColumns?.map((column, index) => ({
  //     screenfieldid: column.screenfieldid,
  //     sequence: index + 1,
  //     columnwidth: column.columnwidth,
  //   }));
  // }
  console.log(selectedColumns);

  const selectedgroupbydata = createGroupByData?.map((item) => {
    // Destructure the item object and create a new object without the masterid property
    const { masterid, mastervalues, api_name, ...newItem } = item;
    return newItem;
  });
  console.log(selectedgroupbydata);

  // const selectedgroupbydata = groupByData
  //   .filter((item) => item.ismapped)
  //   .map((item) => ({
  //     screenfieldid: item.screenfieldid,
  //     type: item.type,
  //     dir: item.direction,
  //   }));

  let newFilterData = [];

  filterData?.forEach((filter) => {
    if (filter.ismapped) {
      console.log(filter);
      const matchedFilter = matchedLookup[filter.masterid];
      console.log(matchedFilter);
      const textFilterValue = textFilter[filter.id] || { value: "" };
      console.log(textFilterValue);
      const filterValue = getFilterValue(filter, matchedFilter);
      console.log(filterValue);

      const newFilter = {
        filtertype: filter.filtercontroltype,
        id: filter.id,
        filtervalue: filterValue
          ? filterValue
          : "" || textFilterValue.value || "",
        filterelement: filter.api_name,
        filtercategory: "quick",
      };

      newFilterData.push(newFilter);
    }
  });

  function getFilterValue(filter, matchedFilter) {
    let filterValue = "";
    if (matchedFilter) {
      if (matchedFilter.filtercontroltype === "multiselect") {
        const selectedOptions = matchedFilter?.mastervalues?.filter(
          (option) => option.isChecked
        );
        filterValue = selectedOptions
          ?.map((option) => option.optionid)
          ?.join(",");
      } else if (matchedFilter.filtercontroltype === "dropdown") {
        const selectedOptions = matchedFilter?.mastervalues?.filter(
          (option) => option.isChecked
        );
        const optionIds = selectedOptions?.map((option) => option.optionid); // Extract optionid from selectedOptions
        filterValue = optionIds?.join(","); // Join optionids into a string
      }else if (matchedFilter.filtercontroltype === "onclickloadmultiselect") {
        const selectedOptions = matchedFilter?.mastervalues?.filter(
          (option) => option.isChecked
        );
        const optionIds = selectedOptions?.map((option) => option.optionid); // Extract optionid from selectedOptions
        filterValue = optionIds?.join(","); // Join optionids into a string
      }
    }
    return filterValue;
  }

  // Iterate through advancedFilters array
  additionalFilters?.forEach((advancedFilter) => {
    if (advancedFilter.filtercontroltype !== "textbox") {
      console.log(advancedFilter);
      // If filterId doesn't match, push advancedFilter as it is
      const selectedFilterValue = Array.isArray(advancedFilter.filtervalue)
        ? advancedFilter.filtervalue.join(",")
        : advancedFilter.filtervalue;
      console.log(selectedFilterValue);
      if (selectedFilterValue) {
        newFilterData.push({
          filtertype: advancedFilter.filtercontroltype,
          filtervalue: selectedFilterValue,
          id: advancedFilter.filterid,
          filterelement: advancedFilter.apiname,
          filtercategory: "additional",
        });
      }
    }
    if (advancedFilter.filtercontroltype === "textbox") {
      newFilterData.push({
        filtertype: advancedFilter.filtercontroltype,
        filtervalue: advancedFilter.filtervalue,
        id: advancedFilter.filterid,
        filterelement: advancedFilter.apiname,
        filtercategory: "additional",
      });
    }
  });

  // console.log("combinedFilters", combinedFilters);
  console.log("newFilterData", newFilterData);
  // console.log("uniqueFilterData", uniqueFilterData);
  const options = [
    { value: "can view", label: "can view" },
    { value: "can view and edit", label: "can view and edit" },
  ];
  const groupedOptions = [
    {
      label: "Users",
      options: [
        { value: "user1", label: "User 1" },
        { value: "user2", label: "User 2" },
        // Add more user options as needed
      ],
    },
  ];

  const [datasetResult, setDatasetResult] = useState({
    //datasetid: "2001", // default value
    datasetname: "",
    //isdefault: "false",
    // isselected: "true",
    // sharetype: { type: "Just me", actions: null, users: null },
    sharetype: "Just me",
    shareto: userid, // default value
    restrictshare: true,
    listid: newlistid,

    createcolumndata: selectedColumns,
    createfilterdata: newFilterData,
    creategroupbydata: selectedgroupbydata,
  });
  console.log(datasetResult);
  const dataSetId = data ? data.datasetid : null;
  // console.log(dataSetId);
  const updatedataSetName = data ? data.title : null;
  //  console.log(updatedataSetName);

  const [updateDatasetResult, setUpdateDatasetResult] = useState({
    datasetid: dataSetId,
    datasetname: updatedataSetName,
    sharetype: "Just me",
    shareto: userid, // default value
    restrictshare: true,
    listid: newlistid,
    createcolumndata: selectedColumns,
    createfilterdata: newFilterData,
    creategroupbydata: selectedgroupbydata,
  });

  //console.log("updateDatasetResult", updateDatasetResult);
  // useEffect(() => {
  //   setDatasetResult((prevDatasetResult) => ({
  //     ...prevDatasetResult,
  //     createcolumndata: selectedColumns,
  //     createfilterdata: newFilterData,
  //     creategroupbydata: selectedgroupbydata,
  //   }));
  // }, [selectedColumns, newFilterData, selectedgroupbydata]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValidationError("");
    setDatasetResult((prevDatasetResult) => ({
      ...prevDatasetResult,
      [name]: value,
    }));

    setUpdateDatasetResult((prevUpdateDatasetResult) => ({
      ...prevUpdateDatasetResult,
      [name]: value,
    }));

    const isNameExists = dataSetList.some(
      (data) => data.title.toLowerCase() === value.trim().toLowerCase()
    );
    if (isNameExists) {
      setValidationError("View name already exists.");
    }
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    if (value === "Just me") {
      setDatasetResult((prevDatasetResult) => ({
        ...prevDatasetResult,
        sharetype: "Just me",
      }));
    }
  };

  // const handleRadioChange = (e) => {
  //   const { value } = e.target;
  //   setDatasetResult((prevDatasetResult) => {
  //     const updatedShareType = {
  //       ...prevDatasetResult.sharetype,
  //       type: value,
  //     };

  //     // Check if the updated type is "Just me" and set actions and users to null
  //     if (updatedShareType.type === "Just me") {
  //       updatedShareType.actions = null;
  //       updatedShareType.users = null;
  //     } else if (
  //       updatedShareType.type === "Everyone" ||
  //       updatedShareType.type === "Selected user"
  //     ) {
  //       // Set actions to "can view" and users to null when type is "Everyone"
  //       updatedShareType.actions = "can view";
  //       updatedShareType.users = null;
  //     }

  //     return {
  //       ...prevDatasetResult,
  //       sharetype: updatedShareType,
  //     };
  //   });
  // };

  const handleSelectChange = (selectedOption) => {
    setDatasetResult((prevDatasetResult) => ({
      ...prevDatasetResult,
      sharetype: {
        ...prevDatasetResult.sharetype,
        actions: selectedOption.value,
      },
    }));
  };
  const handleMultiSelectChange = (selectedOptions) => {
    const selectedUsers = selectedOptions.map((option) => option.value);
    setDatasetResult((prevDatasetResult) => ({
      ...prevDatasetResult,
      sharetype: {
        ...prevDatasetResult.sharetype,
        users: selectedUsers,
      },
    }));
  };

  const handleSave = () => {
    if (datasetResult.datasetname.trim() === "") {
      setValidationError("Please enter a view name.");
    } else if (validationError === "") {
      // setValidationError("");

      console.log(datasetResult);
      dispatch(
        createDataset({
          ...datasetResult,
          shareto: userid,
          listid: newlistid,
          createcolumndata: selectedColumns,
          createfilterdata: newFilterData,
          creategroupbydata: selectedgroupbydata,
        })
      );

      setDatasetResult((prevState) => ({
        ...prevState,
        datasetname: "",
      }));
      CreateDatashowClose();
    }
  };

  const handleUpdate = (e) => {
    console.log(e);
    e.stopPropagation();
    if (updateDatasetResult.datasetname.trim() === "") {
      setValidationError("Please enter a view name.");
    } else if (validationError === "") {
      // setValidationError("");

      console.log(updateDatasetResult);
      dispatch(
        updateDataset({
          ...updateDatasetResult,
          shareto: userid,
          listid: newlistid,
          createcolumndata: selectedColumns,
          createfilterdata: newFilterData,
          creategroupbydata: selectedgroupbydata,
        })
      );

      setUpdateDatasetResult((prevState) => ({
        ...prevState,
        datasetid: "",
        datasetname: "",
      }));
      CreateDatashowClose();
    }
  };

  return (
    <>
      {Editable ? (
        <span title="Edit"
          onClick={(e) => {
            e.stopPropagation();
            setCreateDatashow(true);
            setDataSetPopupShow(false);
          }}
        >
          <BiSolidEditAlt />
        </span>
      ) : (
        <>
          <button onClick={CreateDatashowShow}>
            <FiPlus /> Create Dataset
          </button>
        </>
      )}

      <Offcanvas
        show={CreateDatashow}
        onHide={CreateDatashowClose}
        className="off-canva-default create-dataset"
        placement="end"
        backdrop="static"
      >
        <Offcanvas.Body>
          <div className="off-canva-body-content">
            <div className="off-canva-header">
              {Editable ? <h3>EDIT DATASET</h3> : <h3>CREATE VIEW</h3>}
              {/* <span className="close-btn" onClick={CreateDatashowClose}>
                <MdOutlineCancel />
              </span> */}
              <ArcToolTip
                HoverText="Close"
                BtnName={<MdOutlineCancel />}
                Placement="left"
                onClick={CreateDatashowClose}
                as="span"
                className="close-btn"
              />
            </div>
            <div className="off-canva-main">
              {Editable ? (
                <div className="input-control">
                  <Form.Label>
                    Name of view <sup>*</sup>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name of view"
                    name="datasetname"
                    defaultValue={data.title}
                    // value={data.datasetid}
                    onChange={handleInputChange}
                  />
                  {/* <p>{data.datasetid}</p> */}
                  {validationError && (
                    <p style={{ color: "red" }}>{validationError}</p>
                  )}
                </div>
              ) : (
                <div className="input-control">
                  <Form.Label>
                    Name of view <sup>*</sup>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name of view"
                    name="datasetname"
                    value={datasetResult.datasetname}
                    onChange={handleInputChange}
                  />
                  {validationError && (
                    <p style={{ color: "red" }}>{validationError}</p>
                  )}
                </div>
              )}

              <div className="input-control">
                <Form.Label>Share with</Form.Label>
                <div className="radio-check-div">
                  <div className="radio-list">
                    <label>
                      <input
                        type="radio"
                        value="Just me"
                        name="visible-type"
                        onChange={handleRadioChange}
                        checked={datasetResult.sharetype === "Just me"}
                      />
                      Just me
                    </label>
                  </div>
                  <div className="radio-list">
                    <label>
                      <input
                        disabled
                        type="radio"
                        value="Everyone"
                        name="visible-type"
                        onChange={handleRadioChange}
                        checked={datasetResult.sharetype.type === "Everyone"}
                      />
                      Everyone
                    </label>
                    {datasetResult.sharetype.type === "Everyone" && (
                      <div className="select-div">
                        <Select
                          options={options}
                          classNamePrefix="add-contact-select"
                          placeholder="Select Field"
                          defaultValue={options[0]}
                          onChange={handleSelectChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="radio-list">
                    <label>
                      <input
                        disabled
                        type="radio"
                        value="Selected user"
                        name="visible-type"
                        onChange={handleRadioChange}
                        checked={
                          datasetResult.sharetype.type === "Selected user"
                        }
                      />
                      Selected user, teams and territories
                    </label>
                    {datasetResult.sharetype.type === "Selected user" && (
                      <>
                        <div className="select-div">
                          <Select
                            options={options}
                            classNamePrefix="add-contact-select"
                            placeholder="Select"
                            defaultValue={options[0]}
                            onChange={handleSelectChange}
                          />
                        </div>
                        <div className="select-div selected-user">
                          <Select
                            options={groupedOptions}
                            classNamePrefix="add-contact-select"
                            isMulti
                            placeholder="Select users, teams, and territories"
                            onChange={handleMultiSelectChange}
                          />

                          <p>
                            <span>Users (0)</span>
                            <span>Teams (0)</span>
                            <span>Territories (0)</span>
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="input-control">
                <Form.Label>Select Customer</Form.Label>
                <div className="radio-check-div">
                  <label>
                    <input type="checkbox" defaultChecked name="customer" />
                    Prevent recipients from sharing this view with others
                  </label>
                </div>
              </div>
            </div>
            <div className="off-canva-footer">
              <button
                className="cancel"
                onClick={(e) => CreateDatashowClose(e)}
              >
                Cancel
              </button>
              {Editable ? (
                <button onClick={(e) => handleUpdate(e)}>Update</button>
              ) : (
                <button onClick={handleSave}>Save</button>
              )}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function DataSetDelet({ data, handleDeleteDataset }) {
  const [ArcPopupshow, setArcPopupshow] = useState(false);
  const dispatch = useDispatch();
  const handleArcPopupShow = (e) => {
    e.stopPropagation();
    setArcPopupshow(true);
  };
  const handleArcPopupClose = (e) => {
    e.stopPropagation();
    setArcPopupshow(false);
  };
  const HandleDeletDataset = (e, DatasetId) => {
    e.stopPropagation();
    dispatch(deleteDataset(DatasetId));
    setArcPopupshow(false);
  };

  return (
    <>
      <span onClick={handleArcPopupShow} 
      title="Delete">
        <RiDeleteBin6Line />
      </span>

      <Modal
        show={ArcPopupshow}
        onHide={handleArcPopupClose}
        className={`arc-popup-default delete-dataset`}
        centered={false}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="popup-body-content">
            <div className="popup-header">
              <h3>Delete Dataset</h3>
              {/* <span className="close-btn" onClick={handleArcPopupClose}>
                <MdOutlineCancel />
              </span> */}
              <ArcToolTip
                HoverText="Close"
                BtnName={<MdOutlineCancel />}
                Placement="left"
                onClick={handleArcPopupClose}
                as="span"
                className="close-btn"
              />
            </div>
            <div className="popup-main">
              {/* {data.datasetid} */}
              <p>
                Are you sure you want to delete this dataset{" "}
                <strong>{data.title}</strong>.
              </p>
            </div>
            <div className="popup-footer">
              <button className="cancel" onClick={handleArcPopupClose}>
                Cancel
              </button>
              <button onClick={(e) => HandleDeletDataset(e, data.datasetid)}>
                Delete
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
