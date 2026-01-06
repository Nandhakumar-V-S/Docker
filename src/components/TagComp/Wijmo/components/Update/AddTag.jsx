// /* eslint-disable react/prop-types */
// // *******~ Import ~******** //
// //? React
// import React, { useState, useEffect } from "react";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
// //? Assets
// import { userobjInfo } from "@/redux/Execution/selector";
// import {
//   ArcSuccess,
//   ArcFaild,
// } from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";
// import { TagGridLoading } from "@/modules/loading-skeleton/listpage-table-loading";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import { MdDeleteOutline, MdOutlineCancel } from "react-icons/md";
// import { ImTree } from "react-icons/im";
// import "react-datepicker/dist/react-datepicker.css";
// import Table from "react-bootstrap/Table";
// import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
// import ArcHourInput from "@/components/arccomponents/ui-components/ArcHourInput/ArcHourInput";
// import { useDispatch, useSelector } from "react-redux";
// import { AddSubTaskPlanData } from "@/redux/Execution/addSubTask/AddSubTaskData";
// import { UpdateSubTask } from "@/redux/Execution/addSubTask/UpdateSubTask";
// import { MdOutlinePostAdd } from "react-icons/md";
// import ArcToggle from "@/components/arccomponents/ui-components/ArcToggle/arctoggle";
// import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
// import { GetSubTask } from "@/redux/Execution/addSubTask/GetSubTask";
// import { resetstatus } from "@/redux/Execution/addSubTask/UpdateSubTask";
// import { AddTag } from "@/redux/Tag/AddTag/AddTag";
// import { setLoading } from "@/redux/Tag/actions";
// import colors from "./colorOptions.json";
// import ArcSingleSelect from "@/components/arccomponents/ui-components/ArcSingleSelect/ArcSingleSelect";
// // *******~ Import ~******** //

// function HeaderContent({
//   GroupForm,
//   setGroupForm,
//   setKey,
//   handleCancelButtonClick,
//   SelectedRow,
// }) {
//   return (
//     <div className="header-content">
//       <h3>
//         {SelectedRow ? `${SelectedRow?.utbl_taggroup_column16}` : "Add Tag"}
//       </h3>
//       <div className="view-option">
//         <button
//           className={GroupForm ? "active" : null}
//           onClick={() => {
//             setGroupForm((prevGroupForm) => !prevGroupForm);
//             setKey([0]);
//           }}
//         >
//           <ImTree /> Group
//         </button>
//       </div>
//       <ArcToolTip
//         HoverText="Close"
//         BtnName={<MdOutlineCancel />}
//         Placement="left"
//         onClick={handleCancelButtonClick}
//         as="span"
//         className="close-btn"
//       />
//     </div>
//   );
// }

// function FooterContent({
//   subTasks,
//   handleCancelButtonClick,
//   handleSaveButtonClick,
// }) {
//   return (
//     <div className="footer-content">
//       <button className="cancel" onClick={handleCancelButtonClick}>
//         Cancel
//       </button>
//       <button onClick={handleSaveButtonClick}>Add</button>
//     </div>
//   );
// }

// export default function UpdateStatus({ show, setShow, SelectedRow }) {
//   // const [show, setShow] = useState(false);
//   let globalId = sessionStorage.getItem("Globalid");
//   const [key, setKey] = useState([0]);
//   const [GroupForm, setGroupForm] = useState(true);
//   const [subTasks, setSubTasks] = useState([]);
//   const [colorValue, setColorValue] = useState(1);
//   const [previousTagValue, setPreviousTagValue] = useState([]);
//   // const [,setColor]

//   // console.log(SelectedRow);

//   const [formData, setFormData] = useState({
//     column16: "",
//     column1: 1,
//   });
//   console.log(subTasks);
//   useEffect(() => {
//     setFormData({
//       ...formData,
//       // column4: globalId,
//     });
//   }, [show]);
//   // const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);
//   // ! API Function
//   const dispatch = useDispatch();
//   const AddSubTaskPlanState = useSelector(
//     (state) => state.AddSubTaskPlanState.Status
//   );
//   const SubTaskLists = useSelector(
//     (state) => state.GetSubTaskState.SubTaskLists
//   );
//   let TransactionId = SelectedRow?.lbl_gen_id;

//   // console.log("TransactionId", TransactionId);
//   // console.log("globalId", globalId);
//   const UpdateSubTaskStateStatus = useSelector(
//     (state) => state.UpdateSubTaskState.status
//   );
//   useEffect(() => {
//     if (UpdateSubTaskStateStatus === "succeeded") {
//       dispatch(GetSubTask(TransactionId));
//       dispatch(resetstatus());
//     }
//   }, [UpdateSubTaskStateStatus]);
//   console.log(UpdateSubTaskStateStatus);
//   const handleSaveButtonClick = async () => {
//     console.log("Status ", AddSubTaskPlanState);
//     if (subTasks.length === 0) {
//       ArcFaild({
//         Title: "Required",
//         Message: "Add at least one tag.",
//         position: "top-right",
//       });
//     } else {
//       handleClose();
//       await dispatch(setLoading(true));
//       await dispatch(AddTag({ data: subTasks, transactionid: TransactionId }));
//       setSubTasks([]);
//       setFormData({
//         column16: "",
//         column1: 1,
//       });
//     }
//   };

//   const handleCancelButtonClick = () => {
//     handleClose();
//     setSubTasks([]);
//     setFormData({
//       column16: "",
//       column1: 1,
//     });
//   };
//   return (
//     <>
//       <Offcanvas
//         show={show}
//         onHide={handleCancelButtonClick}
//         placement="end"
//         backdrop="static"
//         className={`${
//           GroupForm ? "enable-group-tab" : null
//         } add-contact-form-canva add-lead-form-canva new-lead-form subtask-grid`}
//       >
//         <Offcanvas.Body>
//           <Tabs
//             id="controlled-tab-example"
//             activeKey={key}
//             onSelect={(k) => setKey(k)}
//             transition={false}
//           >
//             <Tab eventKey={0} title={<>Tag</>}>
//               <div className="add-contact-form add-lead-form">
//                 <HeaderContent
//                   GroupForm={GroupForm}
//                   setGroupForm={setGroupForm}
//                   handleCancelButtonClick={handleCancelButtonClick}
//                   setKey={setKey}
//                   keyData={key}
//                   SelectedRow={SelectedRow}
//                 ></HeaderContent>
//                 <div className="main-content">
//                   <div className="add-sub-task">
//                     <CreateTagForm
//                       subTasks={subTasks}
//                       setSubTasks={setSubTasks}
//                       formData={formData}
//                       setFormData={setFormData}
//                       globalId={globalId}
//                       SubTaskLists={SubTaskLists}
//                       TransactionId={TransactionId}
//                       colorValue={colorValue}
//                       setColorValue={setColorValue}
//                       previousTagValue={previousTagValue}
//                       setPreviousTagValue={setPreviousTagValue}
//                       isNew={false}
//                     />
//                   </div>
//                 </div>
//                 {/* <pre>{JSON.stringify(SelectedRow, null, 2)}</pre> */}
//                 <FooterContent
//                   handleCancelButtonClick={handleCancelButtonClick}
//                   handleSaveButtonClick={handleSaveButtonClick}
//                   subTasks={subTasks}
//                 ></FooterContent>
//               </div>
//             </Tab>
//           </Tabs>
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// }

// export const CreateTagForm = ({
//   subTasks,
//   setSubTasks,
//   formData,
//   setFormData,
//   globalId,
//   isNew,
//   colorValue,
//   setColorValue,
//   setPreviousTagValue,
//   previousTagValue,
// }) => {
//   const userobj = useSelector(userobjInfo);
//   console.log(userobj);
//   const [validationMessage, setValidationMessage] = useState("");

//   // const [TagData,set]

//   const handleChange = (e) => {
//     console.log(e);
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSelect = (e, tag_name) => {
//     console.log(e);
//     console.log(tag_name);
//     const SelectedTag = subTasks.filter((data) => data.column16 === tag_name);
//     console.log(previousTagValue);
//     const UpdateTag = previousTagValue?.filter(
//       (data) => data.column16 === tag_name
//     );
//     console.log(UpdateTag);
//     if (SelectedTag.length > 0) {
//       const ChangeColor = SelectedTag[0];
//       ChangeColor.column1 = Number(e);
//       console.log("Updated Color:", ChangeColor);
//     } else if (UpdateTag.length > 0) {
//       const ChangeColor = UpdateTag[0];
//       // ChangeColor.column1 = Number(e);
//       const UpdatedTag = {
//         ...ChangeColor,
//         column1: Number(e),
//       };
//       setPreviousTagValue((prev) => {
//         return prev.map((tag) =>
//           tag.column16 === tag_name ? UpdatedTag : tag
//         );
//       });

//       console.log("Updated task:", UpdatedTag);
//     } else {
//       console.log("No matching tag found");
//     }

//     setColorValue(e);
//     console.log(formData);
//   };
//   console.log(colorValue);
//   console.log(formData);

//   let loggedUserId = window.sessionStorage.getItem("Globalid");

//   const { DefaultTagValues, status } = useSelector(
//     (state) => state.GetDefaultTagValues
//   );

//   console.log(DefaultTagValues);
//   const tagValue = DefaultTagValues?.result;
//   useEffect(() => {
//     setPreviousTagValue(tagValue);
//   }, [status]);

//   console.log(previousTagValue);
//   // ! Update API Call Start
//   // ! Update API Call End
//   const validateFields = () => {
//     if (formData.column16.trim() === "") {
//       setValidationMessage("Tag Name is required.");
//       return false;
//     }
//     setValidationMessage("");
//     return true;
//   };
//   const deleteRow = (index) => {
//     const updatedTags = subTasks.filter((_, i) => i !== index); // Remove the row
//     setSubTasks(updatedTags);
//   };
//   const onAdd = () => {
//     if (validateFields()) {
//       const ValidateUserTyped = tagValue?.filter(
//         (val) => val.column16.toLowerCase() === formData.column16.toLowerCase()
//       );
//       const ValidateUserTyped2 = subTasks?.filter(
//         (tag) => tag.column16.toLowerCase() === formData.column16.toLowerCase()
//       );
//       console.log(ValidateUserTyped2);
//       if (
//         (!isNew && ValidateUserTyped?.length > 0) ||
//         ValidateUserTyped2.length > 0
//       ) {
//         ArcFaild({
//           Title: "Already Exists",
//           Message: " Tag Name Already Existed.",
//           position: "top-right",
//         });
//         // setFormData({
//         //   column16: "",
//         // });
//       } else {
//         console.log(ValidateUserTyped);
//         // if(formData.column16)
//         console.log(formData);
//         console.log(subTasks);
//         setSubTasks([...subTasks, formData]);
//         setFormData({
//           column16: "",
//           column1: 1,
//         });
//       }
//     }
//   };
//   console.log(globalId);
//   return (
//     <React.Fragment>
//       <div className="table-div create-bill-form">
//         <Table bordered>
//           <tbody>
//             <tr>
//               <td>
//                 <ArcTextBox
//                   PlaceHolder="Enter Tag Name"
//                   Name="column16"
//                   Label="Add a Tag"
//                   Value={
//                     formData.column16.length === 0 ? "" : formData.column16
//                   }
//                   onChange={handleChange}
//                 />
//               </td>
//               {/* <td>
//                 <ArcHourInput
//                   Label="Spent Hours"
//                   onChange={handleSpentHourChange}
//                   onBlur={handleSpentHourBlur}
//                   Value={input}
//                 />
//               </td> */}
//               <td>
//                 <div className="action-td">
//                   <span className="action-btn" onClick={onAdd}>
//                     <MdOutlinePostAdd /> Add
//                   </span>
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </Table>
//         {validationMessage && (
//           <span className="validation-message">{validationMessage}</span>
//         )}
//       </div>
//       <div className="table-div">
//         {status === "loading..." ? (
//           <TagGridLoading />
//         ) : (
//           <>
//             <Table bordered>
//               <thead>
//                 <tr>
//                   <th>Tag Name</th>
//                   <th>Color</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {subTasks?.map((tag, idx) => (
//                   <tr key={idx}>
//                     <td>{tag.column16}</td>
//                     <td>
//                       <DropdownItemTagsExample
//                         options={colors.Colors}
//                         onSelect={(e) => handleSelect(e, tag?.column16)}
//                         colorValue={tag.column1}
//                       />
//                     </td>
//                     <td>
//                       <div className="action-td">
//                         <span
//                           onClick={() => deleteRow(idx)}
//                           className="action-btn"
//                         >
//                           <MdDeleteOutline />
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 {!isNew &&
//                   previousTagValue?.length > 0 &&
//                   previousTagValue?.map((tag, idx) => (
//                     <tr key={idx}>
//                       <td>{tag.column16}</td>
//                       <td>
//                         {/* <ArcSingleSelect options={colors.Colors} /> */}
//                         <DropdownItemTagsExample
//                           options={colors.Colors}
//                           onSelect={(e) => handleSelect(e, tag?.column16)}
//                           colorValue={tag.column1}
//                         />
//                       </td>
//                       <td>
//                         <div className="action-td">
//                           <span
//                             // onClick={() => deleteRow(idx)}
//                             className="action-btn"
//                           >
//                             <MdDeleteOutline />
//                           </span>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 {tagValue?.length === 0 &&
//                   DefaultTagValues?.result?.length === 0 && (
//                     <tr>
//                       <td className="no-task-found" colSpan="4">
//                         No data found
//                       </td>
//                     </tr>
//                   )}
//               </tbody>
//             </Table>
//           </>
//         )}
//       </div>
//       {/* <pre>{JSON.stringify(userobj[0].optionvalue, null, 2)}</pre> */}
//       <pre>{JSON.stringify([...subTasks, ...previousTagValue], null, 2)}</pre>
//       {/* <pre>{JSON.stringify(previousTagValue, null, 2)}</pre> */}
//       {/* <pre>{JSON.stringify(SubTaskListData, null, 2)}</pre> */}
//     </React.Fragment>
//   );
// };

// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";

// export function DropdownItemTagsExample({ options, onSelect, colorValue }) {
//   return (
//     <DropdownButton
//       id="dropdown-item-button"
//       title={
//         colorValue ? (
//           <span className={`color tag-color-${colorValue}`}></span>
//         ) : (
//           <span className="default-title">color</span>
//         )
//       }
//       onSelect={onSelect}
//       placement="auto"
//     >
//       <Dropdown.ItemText>Tags Added</Dropdown.ItemText>
//       {options.map((data, idx) => (
//         <Dropdown.Item as="button" eventKey={data.value} key={idx}>
//           <span className={`color tag-color-${data.value}`}></span>
//           {data.label}
//         </Dropdown.Item>
//       ))}
//     </DropdownButton>
//   );
// }

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
import { TagGridLoading } from "@/modules/loading-skeleton/listpage-table-loading";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdDeleteOutline, MdOutlineCancel } from "react-icons/md";
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
import { AddTag } from "@/redux/Tag/AddTag/AddTag";
import { setLoading } from "@/redux/Tag/actions";
import colors from "./colorOptions.json";
import ArcSingleSelect from "@/components/arccomponents/ui-components/ArcSingleSelect/ArcSingleSelect";
// *******~ Import ~******** //

function HeaderContent({
  GroupForm,
  setGroupForm,
  setKey,
  handleCancelButtonClick,
  SelectedRow,
}) {
  console.log(SelectedRow);

  return (
    <div className="header-content">
      <h3>{SelectedRow ? `${SelectedRow?.column16}` : "Add Tag"}</h3>
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
  // const [previousTagValue, setPreviousTagValue] = useState([]);
  // const [,setColor]

  // console.log(SelectedRow);

  const [formData, setFormData] = useState({
    column16: "",
    column1: 1,
  });
  console.log(subTasks);
  useEffect(() => {
    setFormData({
      ...formData,
      // column4: globalId,
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
  console.log(SelectedRow);

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
  const handleSaveButtonClick = async () => {
    console.log("Status ", AddSubTaskPlanState);
    if (subTasks.length === 0) {
      ArcFaild({
        Title: "Required",
        Message: "Add at least one tag.",
        position: "top-right",
      });
    } else {
      handleClose();
      await dispatch(setLoading(true));
      await dispatch(AddTag({ data: subTasks, transactionid: TransactionId }));
      setSubTasks([]);
      setFormData({
        column16: "",
        column1: 1,
      });
    }
  };

  const handleCancelButtonClick = () => {
    handleClose();
    setSubTasks([]);
    setFormData({
      column16: "",
      column1: 1,
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
            <Tab eventKey={0} title={<>Tag</>}>
              <div className="add-contact-form add-lead-form">
                <HeaderContent
                  GroupForm={GroupForm}
                  setGroupForm={setGroupForm}
                  handleCancelButtonClick={handleCancelButtonClick}
                  setKey={setKey}
                  keyData={key}
                  SelectedRow={SelectedRow}
                ></HeaderContent>
                <div className="main-content">
                  <div className="add-sub-task">
                    <CreateTagForm
                      subTasks={subTasks}
                      setSubTasks={setSubTasks}
                      formData={formData}
                      setFormData={setFormData}
                      globalId={globalId}
                      SubTaskLists={SubTaskLists}
                      TransactionId={TransactionId}
                      // previousTagValue={previousTagValue}
                      // setPreviousTagValue={setPreviousTagValue}
                      isNew={false}
                    />
                  </div>
                </div>
                {/* <pre>{JSON.stringify(SelectedRow, null, 2)}</pre> */}
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

export const CreateTagForm = ({
  subTasks,
  setSubTasks,
  formData,
  setFormData,
  globalId,
  isNew,
  // setPreviousTagValue,
  // previousTagValue,
}) => {
  const userobj = useSelector(userobjInfo);
  console.log(userobj);
  const [validationMessage, setValidationMessage] = useState("");

  // const [TagData,set]

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelect = (e, tag_name) => {
    console.log(e);
    console.log(tag_name);
    const UpdateTag = subTasks.filter((data) => data.column16 === tag_name);
    // console.log(previousTagValue);
    // const UpdateTag = previousTagValue?.filter(
    //   (data) => data.column16 === tag_name
    // );
    // console.log(UpdateTag);
    // if (SelectedTag.length > 0) {
    //   const ChangeColor = SelectedTag[0];
    //   ChangeColor.column1 = Number(e);
    //   console.log("Updated Color:", ChangeColor);
    // }
    if (UpdateTag.length > 0) {
      const ChangeColor = UpdateTag[0];
      // ChangeColor.column1 = Number(e);
      const UpdatedTag = {
        ...ChangeColor,
        column1: Number(e),
      };
      setSubTasks((prev) => {
        return prev.map((tag) =>
          tag.column16 === tag_name ? UpdatedTag : tag
        );
      });

      console.log("Updated task:", UpdatedTag);
    } else {
      console.log("No matching tag found");
    }
    console.log(formData);
  };
  console.log(formData);

  let loggedUserId = window.sessionStorage.getItem("Globalid");

  const { DefaultTagValues, status } = useSelector(
    (state) => state.GetDefaultTagValues
  );

  console.log(DefaultTagValues);
  const tagValue = DefaultTagValues?.result;
  useEffect(() => {
    !isNew && setSubTasks(tagValue);
  }, [status]);

  // console.log(previousTagValue);
  // ! Update API Call Start
  // ! Update API Call End
  const validateFields = () => {
    if (formData.column16.trim() === "") {
      setValidationMessage("Tag Name is required.");
      return false;
    }
    setValidationMessage("");
    return true;
  };
  const deleteRow = (index) => {
    const updatedTags = subTasks.filter((_, i) => i !== index); // Remove the row
    setSubTasks(updatedTags);
  };
  const onAdd = () => {
    if (validateFields()) {
      // const ValidateUserTyped = tagValue?.filter(
      //   (val) => val.column16.toLowerCase() === formData.column16.toLowerCase()
      // );
      const ValidateUserTyped2 = subTasks?.filter(
        (tag) => tag.column16.toLowerCase() === formData.column16.toLowerCase()
      );
      console.log(ValidateUserTyped2);
      if (
        // (!isNew && ValidateUserTyped?.length > 0) ||
        !isNew &&
        ValidateUserTyped2.length > 0
      ) {
        ArcFaild({
          Title: "Already Exists",
          Message: " Tag Name Already Existed.",
          position: "top-right",
        });
        // setFormData({
        //   column16: "",
        // });
      } else {
        // console.log(ValidateUserTyped);
        // if(formData.column16)
        console.log(formData);
        console.log(subTasks);
        setSubTasks([formData, ...subTasks]);
        setFormData({
          column16: "",
          column1: 1,
        });
      }
    }
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
                  PlaceHolder="Enter Tag Name"
                  Name="column16"
                  Label="Add a Tag"
                  Value={
                    formData.column16.length === 0 ? "" : formData.column16
                  }
                  onChange={handleChange}
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
        {status === "loading..." ? (
          <TagGridLoading />
        ) : (
          <>
            <Table bordered>
              <thead>
                <tr>
                  <th>Tag Name</th>
                  <th>Color</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subTasks?.map((tag, idx) => (
                  <tr key={idx}>
                    <td>{tag.column16}</td>
                    <td>
                      <DropdownItemTagsExample
                        options={colors.Colors}
                        onSelect={(e) => handleSelect(e, tag?.column16)}
                        colorValue={tag.column1}
                      />
                    </td>
                    <td>
                      <div className="action-td">
                        <span
                          onClick={() => deleteRow(idx)}
                          className="action-btn"
                          title="Delete"
                        >
                          <MdDeleteOutline />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
                {subTasks?.length === 0 && (
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
      {/* <pre>{JSON.stringify(userobj[0].optionvalue, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(subTasks, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(previousTagValue, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(SubTaskListData, null, 2)}</pre> */}
    </React.Fragment>
  );
};

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export function DropdownItemTagsExample({ options, onSelect, colorValue }) {
  return (
    <DropdownButton
      id="dropdown-item-button"
      title={
        colorValue ? (
          <span className={`color tag-color-${colorValue}`}></span>
        ) : (
          <span className="color"></span>
        )
      }
      onSelect={onSelect}
      placement="auto"
    >
      <Dropdown.ItemText>Tags Added</Dropdown.ItemText>
      {options.map((data, idx) => (
        <Dropdown.Item as="button" eventKey={data.value} key={idx}>
          <span className={`color tag-color-${data.value}`}></span>
          {data.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}
