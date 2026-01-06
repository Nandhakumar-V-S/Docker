import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLanguage from "@/locale/useLanguage";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LuUser2 } from "react-icons/lu";
import { Dropdown, DropdownButton } from "react-bootstrap";

import { BsGrid } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import AddTask from "@/components/arccomponents/DynamicInputs/AddTask/addtask";

import { RiListSettingsFill } from "react-icons/ri";

import PageSetup from "@/context/GlobalContext/PageSetup.json";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ContextWidthProvider } from "@/context/widthContext/widthContext";
import {
  entitiesInfo,
  dataSetListInfo,
  masterDataInfo,
  useridInfo,
  planassignedtoInfo,
  planweekInfo,
} from "@/redux/Plan/selector";
import { setPlanweek, setPlanassignedto } from "@/redux/Plan/actions";
import { WeekFilterV2 } from "@/components/arccomponents/ui-components/ArcYearWeekPicker/ArcYearWeekPicker";
import { ArcIconComponents } from "@/components/arccomponents/ArcIcon";
import { SelectedRowContext } from "@/context/SelectedRow/SelectedRowContext";
import EditTask from "@/components/TaskComp/Wijmo/components/Update/EditTask";
import ArcFilterPopup from "@/components/arccomponents/ui-components/ArcTaskAutocompletesearch/ArcFilterPopup";

export default function ListHeader({
  DataSetPopupShow,
  setDataSetPopupShow,
  DataSetButton,
  DATASET_API,
}) {
  const translate = useLanguage();
  const dispatch = useDispatch();
  console.log("Inside ListPage ListHeader");
  const { ScreenWidth, BreakpointSm } = useContext(ContextWidthProvider);
  const [UpdateselectedTagItemEdit, setUpdateselectedTagItemEdit] = useState(
    []
  );
  const [istageditedEditTask, setistageditedEditTask] = useState(false);
  // const [AddTaskShow, setAddTaskShow] = useState(false);
  const { addTaskShow, setAddTaskShow } = useContext(SelectedRowContext);
  // const [titleFieldValue, setTitleFieldValue] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const {
    selectedRow1,
    EditTaskShow,
    ArcFilterPopupshow,
    setArcFilterPopupshow,
    titleFieldValue,
    setTitleFieldValue,
  } = useContext(SelectedRowContext);
  const [isOpen, setIsOpen] = useState(false);
  const entities = useSelector(entitiesInfo);
  console.log(entities);
  const userid = useSelector(useridInfo);
  console.log(userid);
  const planweek = useSelector(planweekInfo);
  const planassignedto = useSelector(planassignedtoInfo);
  const dataSetList = useSelector(dataSetListInfo);
  const masterData = useSelector(masterDataInfo);
  console.log(masterData);

  // ! Week Filter start
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((firstDayOfYear.getDay() + pastDaysOfYear) / 7);
  };
  const currentYear = new Date().getFullYear();
  // const [editTaskShow, setEditTaskShow] = useState(false);
  const [editTaskShow, setEditTaskShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const currentWeek = getWeekNumber(new Date());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const masterUser = masterData?.filter(
    (user) => user.masterid === "E66E5177-DFD2-48A5-BBDE-C8891C37F943"
  );
  const mastervalues = masterUser[0]?.mastervalues;
  console.log(mastervalues);
  useEffect(() => {
    if (planassignedto === "") {
      if (mastervalues?.length > 0 && userid) {
        const loggedUser = mastervalues.filter(
          (filter) => filter.optionid === userid
        );
        console.log(loggedUser);
        if (loggedUser.length > 0) {
          setSelectedOption(loggedUser[0].optionvalue);
        }
      }
    } else {
      if (mastervalues?.length > 0 && userid) {
        const assignedUser = mastervalues.filter(
          (filter) => filter.optionid === planassignedto
        );
        console.log(assignedUser.length > 0);
        if (assignedUser) {
          setSelectedOption(assignedUser[0].optionvalue);
        }
      }
    }

    if (planweek !== "") {
      const [week, year] = planweek.split("$");
      setSelectedWeek(week);
      setSelectedYear(year);
    }
  }, [mastervalues, userid]);

  const handleOptionClick = (optionvalue) => {
    setSelectedOption(optionvalue);
    setIsOpen(false);
  };
  const ModuleHeader = PageSetup.Pages.ListPage.Header;

  const HandleWeekChange = (index) => {
    setSelectedWeek(index + 1);
    const week = index + 1;
    dispatch(setPlanweek(week, selectedYear));
  };
  // ! Week Filter start

  return (
    <React.Fragment>
      <ArcFilterPopup
        Title="Arc Filter Popup"
        // ArcPopupshow={ArcFilterPopupshow}
        // setArcPopupshow={setArcFilterPopupshow}
        BtnClassName="arc-btn-primary"
        PopupClassName=""
        centered={true}
        setEditShow={setEditTaskShow}
        setSelectedRow={setSelectedRow}
        selectedRow={selectedRow}
        setAddTaskShow={setAddTaskShow}
        // titleFieldValue={titleFieldValue}
        // setTitleFieldValue={setTitleFieldValue}
      ></ArcFilterPopup>
      {ModuleHeader.Visibility && (
        <section className="list-header">
          <Container fluid>
            <Row>
              <Col xxl={12}>
                <div className="list-header-inside">
                  <div className="filter-dropdown">
                    {ModuleHeader.DataSetIcon && (
                      <span
                        ref={DataSetButton}
                        className={`icon ${
                          DataSetPopupShow ? "true" : "false"
                        }`}
                        onClick={() =>
                          setDataSetPopupShow(
                            (prevDataSetPopupShow) => !prevDataSetPopupShow
                          )
                        }
                      >
                        <BsGrid />
                      </span>
                    )}

                    <div className="drop-down">
                      <div className="select-div">
                        <p>Plan</p>
                      </div>
                      {dataSetList?.map((data, index) => (
                        <span key={index}>{data.isselected && data.title}</span>
                      ))}
                    </div>
                  </div>
                  <div className="action-week-filter">
                    {/* <p>{selectedWeek}</p> */}
                    <WeekFilterV2
                      selectedYear={selectedYear}
                      setSelectedYear={setSelectedYear}
                      selectedWeek={selectedWeek}
                      setSelectedWeek={setSelectedWeek}
                      HandleWeekChange={HandleWeekChange}
                    />
                  </div>
                  <div className="action-add">
                    <div className="user-dropdown-v1">
                      <button
                        className="dropdown-button"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {selectedOption}
                        <span>
                          <MdKeyboardArrowDown />
                        </span>
                      </button>
                      {isOpen && (
                        <div className="dropdown-content">
                          {mastervalues?.map((item) => (
                            <a
                              className={
                                selectedOption === item.optionvalue
                                  ? "active"
                                  : ""
                              }
                              key={item.optionid}
                              href="#"
                              onClick={() => {
                                handleOptionClick(item.optionvalue);
                                dispatch(setPlanassignedto(item.optionid));
                              }}
                            >
                              <LuUser2 />
                              {item.optionvalue}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    <AddTask
                      setArcFilterPopupshow={setArcFilterPopupshow}
                      show={addTaskShow}
                      setShow={setAddTaskShow}
                      // setTitleFieldValue={setTitleFieldValue}
                      // titleFieldValue={titleFieldValue}
                    />
                    <EditTask
                      show={EditTaskShow}
                      setShow={setEditTaskShow}
                      SelectedRow={selectedRow}
                      UpdateselectedTagItem={UpdateselectedTagItemEdit}
                      setUpdateselectedTagItem={setUpdateselectedTagItemEdit}
                      istagedited={istageditedEditTask}
                      setistagedited={setistageditedEditTask}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </React.Fragment>
  );
}
