/* eslint-disable react/prop-types */
// *******~ Import ~******** //
//? React
import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
//? Assets
import { userobjInfo } from "@/redux/Execution/selector";
import {
  ArcSuccess,
  ArcFaild,
} from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";
import { SubTaskGridLoading } from "@/modules/loading-skeleton/listpage-table-loading";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdOutlineCancel } from "react-icons/md";
import { ImTree } from "react-icons/im";
import "react-datepicker/dist/react-datepicker.css";
import Table from "react-bootstrap/Table";
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import ArcHourInput from "@/components/arccomponents/ui-components/ArcHourInput/ArcHourInput";
import { useDispatch, useSelector } from "react-redux";
import { AddSubTaskPlanData } from "@/redux/Execution/addSubTask/AddSubTaskData";
import { UpdateSubTask } from "@/redux/Execution/addSubTask/UpdateSubTask";
import { MdOutlinePostAdd } from "react-icons/md";
import ArcToggle from "@/components/arccomponents/ui-components/ArcToggle/arctoggle";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { GetSubTask } from "@/redux/Execution/addSubTask/GetSubTask";
import { resetstatus } from "@/redux/Execution/addSubTask/UpdateSubTask";
// *******~ Import ~******** //

function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
}) {
  return (
    <div className="header-content">
      <h3>Sub Task</h3>
      <div className="view-option">
        <button
          className={GroupForm ? "active" : null}
          onClick={() => {
            setGroupForm((prevGroupForm) => !prevGroupForm);
            setKey([0]);
          }}
        >
          <ImTree /> Group
        </button>
      </div>
      <ArcToolTip
        HoverText="Close"
        BtnName={<MdOutlineCancel />}
        Placement="left"
        onClick={handleCancelButtonClick}
        as="span"
        className="close-btn"
      />
    </div>
  );
}

function FooterContent({
  subTasks,
  handleCancelButtonClick,
  handleSaveButtonClick,
}) {
  return (
    <div className="footer-content">
      <button className="cancel" onClick={handleCancelButtonClick}>
        Cancel
      </button>
      <button onClick={handleSaveButtonClick}>Add</button>
    </div>
  );
}

export default function UpdateStatus({ show, setShow, SelectedRow }) {
  // const [show, setShow] = useState(false);
  let globalId = sessionStorage.getItem("Globalid");
  const [key, setKey] = useState([0]);
  const [GroupForm, setGroupForm] = useState(true);
  const [subTasks, setSubTasks] = useState([]);
  const [formData, setFormData] = useState({
    column16: "",
    column2: "",
    column4: globalId,
    column3: "2527",
  });
  useEffect(() => {
    setFormData({
      ...formData,
      column4: globalId,
    });
  }, [show]);
  // const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  // ! API Function
  const dispatch = useDispatch();
  const AddSubTaskPlanState = useSelector(
    (state) => state.AddSubTaskPlanState.Status
  );
  const SubTaskLists = useSelector(
    (state) => state.GetSubTaskState.SubTaskLists
  );
  let TransactionId = SelectedRow?.id;
  // console.log("TransactionId", TransactionId);
  // console.log("globalId", globalId);
  const UpdateSubTaskStateStatus = useSelector(
    (state) => state.UpdateSubTaskState.status
  );
  useEffect(() => {
    if (UpdateSubTaskStateStatus === "succeeded") {
      dispatch(GetSubTask(TransactionId));
      dispatch(resetstatus());
    }
  }, [UpdateSubTaskStateStatus]);
  console.log(UpdateSubTaskStateStatus);
  const handleSaveButtonClick = () => {
    console.log("Status ", AddSubTaskPlanState);
    if (subTasks.length === 0) {
      ArcFaild({
        Title: "Required",
        Message: "Add at least one task.",
        position: "top-right",
      });
    } else {
      dispatch(
        AddSubTaskPlanData({ data: subTasks, transactionid: TransactionId })
      );
      handleClose();
      setSubTasks([]);
      setFormData({
        column16: "",
        column2: "",
        column4: globalId,
        column3: "2527",
      });
    }
  };

  const handleCancelButtonClick = () => {
    handleClose();
    setSubTasks([]);
    setFormData({
      column16: "",
      column2: "",
      column4: globalId,
      column3: "2527",
    });
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleCancelButtonClick}
        placement="end"
        backdrop="static"
        className={`${
          GroupForm ? "enable-group-tab" : null
        } add-contact-form-canva add-lead-form-canva new-lead-form subtask-grid`}
      >
        <Offcanvas.Body>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            transition={false}
          >
            <Tab eventKey={0} title={<>SUB TASK</>}>
              <div className="add-contact-form add-lead-form">
                <HeaderContent
                  GroupForm={GroupForm}
                  setGroupForm={setGroupForm}
                  handleCancelButtonClick={handleCancelButtonClick}
                  setKey={setKey}
                  keyData={key}
                ></HeaderContent>
                <div className="main-content">
                  <div className="add-sub-task">
                    <CreateSubTaskForm
                      subTasks={subTasks}
                      setSubTasks={setSubTasks}
                      formData={formData}
                      setFormData={setFormData}
                      globalId={globalId}
                      SubTaskLists={SubTaskLists}
                      TransactionId={TransactionId}
                    />
                  </div>
                </div>
                <FooterContent
                  handleCancelButtonClick={handleCancelButtonClick}
                  handleSaveButtonClick={handleSaveButtonClick}
                  subTasks={subTasks}
                ></FooterContent>
              </div>
            </Tab>
          </Tabs>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export const CreateSubTaskForm = ({
  subTasks,
  setSubTasks,
  formData,
  setFormData,
  globalId,
  SubTaskLists,
  TransactionId,
}) => {
  const dispatch = useDispatch();
  const userobj = useSelector(userobjInfo);
  console.log(userobj);
  const [isToggled, setIsToggled] = useState(false);
  const [input, setInput] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [data, setData] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  let loggedUserId = window.sessionStorage.getItem("Globalid");

  const handleSpentHourChange = (e) => {
    setInput(e.target.value);
  };
  const SubTaskListsStatus = useSelector(
    (state) => state.GetSubTaskState.status
  );
  const SubTaskListData = SubTaskLists?.result?.data;
  useEffect(() => {
    // Assuming jsonData is available and needs to be set as state
    setData(
      SubTaskListData?.map((item) => ({
        id: item.id,
        column16: item.column16,
        column2: item.column2.toString(),
        column3: item.column3.toString(),
        column4: item.column4.toString(),
        column4_id: item.column4_id,
      }))
    );
  }, [SubTaskListData]);
  const convertToHours = (inputValue) => {
    if (inputValue.trim() === "") {
      return "0";
    }

    const regex = /^(\d*\.?\d*)([hwdm]?)$/;
    const match = inputValue.match(regex);
    if (!match) {
      return "0";
    }
    const value = parseFloat(match[1]);
    const unit = match[2];

    let convertedHours;
    switch (unit) {
      case "d":
        convertedHours = value * 8;
        break;
      case "w":
        convertedHours = value * 5 * 8;
        break;
      case "m":
        convertedHours = value / 60;
        break;
      default:
        convertedHours = value;
    }

    if (isNaN(convertedHours)) {
      return "0h";
    }

    return Number.isInteger(convertedHours)
      ? convertedHours.toString()
      : convertedHours.toFixed(2);
  };

  const handleSpentHourBlur = () => {
    const convertedHours = convertToHours(input);
    setInput(convertedHours + "h");
    let ConvertMinutes = (convertedHours * 60).toString();
    setFormData({
      ...formData,
      column2: ConvertMinutes,
    });
  };
  const format_Time = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);
    return `${hours}h ${remainingMinutes}m`;
  };

  const handleToggleChange = (event) => {
    setIsToggled(event.target.checked);
  };

  const handleCheckboxChange = (index) => (event) => {
    const updatedSubTasks = subTasks.map((subTask, i) => {
      if (i === index) {
        return {
          ...subTask,
          column3: event.target.checked ? "2529" : "2527",
        };
      }
      return subTask;
    });
    setSubTasks(updatedSubTasks);
  };
  // ! Update API Call Start
  const handleCheckboxChangeAPIData = (subTask) => (event) => {
    const updatedSubTasks = data.map((subTasklist) => {
      if (subTasklist.id === subTask.id) {
        return {
          ...subTasklist,
          column3: event.target.checked ? "2529" : "2527",
        };
      }
      return subTasklist;
    });
    setData(updatedSubTasks);
    const requestData = {
      entityid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      transactionid: TransactionId,
      userid: loggedUserId,
      data: [
        {
          id: subTask.id,
          tablename: "Utbl_Subworkitem",
          apiname: "column4",
          value: subTask.column3 == "2527" ? "2529" : "2527",
          columntype: "numeric",
        },
      ],
    };
    dispatch(UpdateSubTask(requestData));
  };
  // ! Update API Call End
  const validateFields = () => {
    if (formData.column16.trim() === "") {
      setValidationMessage("Task Name is required.");
      return false;
    }
    if (formData.column2.trim() === "") {
      setValidationMessage("Spent Hours is required.");
      return false;
    }

    setValidationMessage("");
    return true;
  };

  const onAdd = () => {
    if (validateFields()) {
      setSubTasks([...subTasks, formData]);
      setFormData({
        column16: "",
        column2: "",
        column4: globalId,
        column3: "2527",
      });
      setInput("");
    }
  };
  const calculateTotalHours = () => {
    const NewtotalMinutes = subTasks.reduce(
      (acc, subTask) => acc + parseFloat(subTask.column2),
      0
    );
    const GettotalMinutes = data?.reduce(
      (acc, subTask) => acc + parseFloat(subTask.column2),
      0
    );
    const LoggedUserTotalMinutes = data?.reduce((acc, subTask) => {
      if (subTask.column4_id === loggedUserId) {
        return acc + parseFloat(subTask.column2);
      }
      return acc;
    }, 0);
    const totalHoursAll = (NewtotalMinutes + GettotalMinutes) / 60;
    const totalHoursLogged = (NewtotalMinutes + LoggedUserTotalMinutes) / 60;
    return isToggled
      ? totalHoursAll.toFixed(2) + "h"
      : totalHoursLogged.toFixed(2) + "h";
  };
  console.log(globalId);
  return (
    <React.Fragment>
      <div className="table-div create-bill-form">
        <Table bordered>
          <tbody>
            <tr>
              <td>
                <ArcTextBox
                  PlaceHolder="Enter Sub Task Name"
                  Name="column16"
                  Label="Sub Task Name"
                  Value={
                    formData.column16.length === 0 ? "" : formData.column16
                  }
                  onChange={handleChange}
                />
              </td>
              <td>
                <ArcHourInput
                  Label="Spent Hours"
                  onChange={handleSpentHourChange}
                  onBlur={handleSpentHourBlur}
                  Value={input}
                />
              </td>
              <td>
                <div className="action-td">
                  <span className="action-btn" onClick={onAdd}>
                    <MdOutlinePostAdd /> Add
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
        {validationMessage && (
          <span className="validation-message">{validationMessage}</span>
        )}
      </div>
      <div className="table-div">
        {SubTaskListsStatus === "loading..." ? (
          <SubTaskGridLoading />
        ) : (
          <>
            <ArcToggle
              onChange={handleToggleChange}
              Label="Show Team Sub Task"
            />
            <Table bordered>
              <thead>
                <tr>
                  <th>Sub Task Name</th>
                  <th>Resource</th>
                  <th>Spent Hours</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((subTask, index) => (
                  <React.Fragment key={index}>
                    {subTask.column4_id == globalId ? (
                      <>
                        <tr>
                          <td>{subTask.column16}</td>
                          <td>
                            {subTask.column4_id == globalId
                              ? "Me"
                              : subTask.column4}
                          </td>
                          <td>{format_Time(subTask.column2)}</td>
                          <td>
                            <div className="arc-input-control arc-radiobtn">
                              <div className="radio-check-div">
                                <label>
                                  <input
                                    type="checkbox"
                                    value=""
                                    checked={subTask.column3 == "2529"}
                                    onChange={handleCheckboxChangeAPIData(
                                      subTask
                                    )}
                                  />
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    ) : (
                      isToggled && (
                        <tr>
                          <td>{subTask.column16}</td>
                          <td>
                            {subTask.column4 == globalId
                              ? "Me"
                              : subTask.column4}
                          </td>
                          <td>{format_Time(subTask.column2)}</td>
                          <td>
                            <div className="arc-input-control arc-radiobtn">
                              <div className="radio-check-div">
                                <label>
                                  <input
                                    type="checkbox"
                                    value=""
                                    checked={subTask.column3 == "2529"}
                                    onChange={handleCheckboxChangeAPIData(
                                      subTask
                                    )}
                                  />
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </React.Fragment>
                ))}

                {subTasks.map((subTask, index) => (
                  <tr key={index}>
                    <td>{subTask.column16}</td>
                    <td>
                      {subTask.column4 === globalId ? "Me" : subTask.column4}
                    </td>
                    <td>{format_Time(subTask.column2)}</td>
                    <td>
                      <div className="arc-input-control arc-radiobtn">
                        <div className="radio-check-div">
                          <label>
                            <input
                              type="checkbox"
                              value=""
                              checked={subTask.column3 === "2529"}
                              onChange={handleCheckboxChange(index)}
                            />
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {subTasks.length === 0 &&
                  SubTaskLists?.result?.data?.length === 0 && (
                    <tr>
                      <td className="no-task-found" colSpan="4">
                        No data found
                      </td>
                    </tr>
                  )}
              </tbody>
            </Table>
          </>
        )}
      </div>
      <div className="total-values">
        <h5>Total: {calculateTotalHours()}</h5>
      </div>
      {/* <pre>{JSON.stringify(userobj[0].optionvalue, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(subTasks, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(SubTaskListData, null, 2)}</pre> */}
    </React.Fragment>
  );
};
