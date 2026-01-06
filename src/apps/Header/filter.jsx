// *******~ Import ~******** //
//? React
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
//? Assets
import { Player } from "@lottiefiles/react-lottie-player";
import DataNotFoundJson from "@/style/images/not-found.json";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { FaFilterCircleXmark } from "react-icons/fa6";
import Accordion from "react-bootstrap/Accordion";
//? Components
import { ArcButtonWithIconType4 } from "@/components/arccomponents/ui-components/ArcButtons/ArcButtons";
//? CSS

//? Images

//? constants

//? JSON File

import Offline_Filter from "./Search/Filter.json";
import openSearch from "./Search/openSearch.json";
import Result_JSON from "./result.json";

//? Icons
import { IoSearch } from "react-icons/io5";
import { IoMdCalendar } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import {
  MdKeyboardArrowLeft,
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { MdAssignment, MdOutlineCancel } from "react-icons/md";
import { TiContacts } from "react-icons/ti";
import { LuUserPlus } from "react-icons/lu";
import { PiUserCirclePlus } from "react-icons/pi";
import { TbFilterSearch } from "react-icons/tb";
import {
  GlobalSearchFields,
  GlobalSearchPagination,
  ResetFilter,
} from "@/redux/GlobalSearch/GlobalSearch";
import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import { useSelector } from "react-redux";
import DataTable from "./Search/DataTable";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { RiVipCrownLine } from "react-icons/ri";
import ListPageTableLoading, {
  FilterTableLoading,
} from "@/modules/loading-skeleton/listpage-table-loading";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { MySkeleton } from "@/modules/loading-skeleton/skeleton";
import { debounce } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { get360EntityInfo } from "@/redux/360Details/Get360EntityInfo";
import { getSearch360EntityInfo } from "@/redux/GlobalSearch/GetSearch360EntityInfo";

// *******~ Import ~******** //

const SearchComponent = () => {
  const [ArcOffCanvaShow, setArcOffCanvaShow] = useState(false);
  const [key, setKey] = useState("All Results");
  const [errormsg, setErrorMsg] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [searchedResult, setSearchedResult] = useState([]);
  const [showDefaultMsg, setshowDefaultMsg] = useState(true);
  const FilteredData = useSelector((state) => state.GlobalSearch.Data);
  const FilteredResults = useSelector(
    (state) => state.GlobalSearch.filteredResults
  );
  const FilteredStatus = useSelector((state) => state.GlobalSearch.status);
  const DataTableLoadingStatus = FilteredStatus === "loading...";
  const handleArcOffCanva2Show = () => {
    setArcOffCanvaShow(true);
    setKey("All Results");
    sessionStorage.setItem("pageCount", 0);
    setErrorMsg(false);
    setshowDefaultMsg(true);
    setSearchedResult([]);
    setSearchValue("");
    dispatch(ResetFilter());
  };
  const { setPreviousPathName } = useContext(ArcGlobalContextProvider);

  console.log(FilteredData);
  const navigate = useNavigate();
  //pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [recordValue, setrecordValue] = useState(10);
  const RecordsPerPage = recordValue;
  const LastIndex = currentPage * RecordsPerPage;
  const FirstIndex = LastIndex - RecordsPerPage;
  useEffect(() => {
    setSearchedResult(FilteredResults);
  }, [FilteredResults]);

  useEffect(() => {
    if (searchedResult.length > 0) {
      setshowDefaultMsg(false);
    } else {
      setshowDefaultMsg(true);
    }
  }, [searchedResult]);
  console.log(FilteredData);

  const handleNavigate = (TransactionID, key) => {
    console.log("navita");
    const pathName = key.toLowerCase();
    const previousPathName = `/${pathName}`;
    console.log("Current EntityID: " + TransactionID);
    console.log(previousPathName);
    setPreviousPathName(previousPathName);
    sessionStorage.setItem("Current_EntityID", TransactionID);
    sessionStorage.setItem("PreviousPath", previousPathName);

    setArcOffCanvaShow(false);
    if (pathName === "project") {
      dispatch(
        getSearch360EntityInfo({
          TransactionID: TransactionID,
          previousPathName: previousPathName,
        })
      );
      navigate("/project360");
    } else {
      dispatch(get360EntityInfo({ TransactionID, previousPathName }));
      navigate("/360detail_v4");
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    setErrorMsg(false);
    setshowDefaultMsg(false);
  };

  console.log(searchedResult);
  const handleArcOffCanvaClose = () => {
    setArcOffCanvaShow(false);
  };
  const ValidateFields = () => {
    let errors = {};
    if (searchValue === "") {
      setErrorMsg(true);
      errors = { search: "Error" };
    } else {
      setErrorMsg(false);
      errors = {};
    }
    return Object.keys(errors).length === 0;
  };

  const handleSearch = (data) => {
    const isValid = ValidateFields();
    if (isValid) {
      if (searchedResult.length > 0) {
        dispatch(ResetFilter());
        console.log(searchValue);
        const value = searchValue.toLowerCase();
        // dispatch(GlobalSearchFields({ searchData: value }));
        const RequestData = {
          pageNumberCount: 0,
          entityName: data,
          searchData: value,
        };
        dispatch(GlobalSearchPagination(RequestData));
        setshowDefaultMsg(false);
      } else {
        console.log(searchValue);
        const value = searchValue.toLowerCase();
        console.log(data);
        // dispatch(GlobalSearchFields({ searchData: value }));
        const RequestData = {
          pageNumberCount: 0,
          entityName: data,
          searchData: value,
        };
        dispatch(GlobalSearchPagination(RequestData));
        setshowDefaultMsg(false);
      }
    } else {
      console.log("error");
      setshowDefaultMsg(true);
    }
  };
  const handleEnterToSearch = (e) => {
    if (e.keyCode === 13) {
      handleSearch(key);
    }
  };
  const handleClearFilter = () => {
    // setKey("All Results");
    sessionStorage.setItem("pageCount", 0);
    setErrorMsg(false);
    setshowDefaultMsg(true);
    setSearchedResult([]);
    setSearchValue("");
    dispatch(ResetFilter());
  };
  let filteredResults;
  let overallResult;

  if (key === "All Results") {
    if (searchedResult?.length > 0) {
      overallResult = Object.groupBy(searchedResult, (e) => e.EntityName);
    }
  } else {
    filteredResults = searchedResult?.filter((data) => data.EntityName === key);
  }
  console.log(filteredResults);

  const RecordData = filteredResults?.slice(FirstIndex, LastIndex);
  const npage = Math.ceil(filteredResults?.length / RecordsPerPage);
  const totalDatas = filteredResults?.length;
  const numbers = [...Array(npage ? npage + 1 : 1).keys()].slice(1);

  console.log(npage);
  // const RecordValue = (e) => {
  //   setrecordValue(e.target.value);
  // };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changePage = (i) => {
    setCurrentPage(i);
  };

  console.log(filteredResults);
  const screenFields = Offline_Filter;
  const LeadFormAPI = screenFields?.result;

  console.log(overallResult);
  console.log(key);

  const handleDataSearch = () => {
    console.log("triggered");
  };
  const handleglobalsearchlink = () => {
    // const rediectlink = e.target.dataset.rediectlink;
    // console.log(rediectlink);
    // navigate(rediectlink);
    setArcOffCanvaShow(false);
  };

  // console.log(LeadFormAPI);
  return (
    <React.Fragment>
      <button
        className="arc-btn-primary search-btn"
        onClick={handleArcOffCanva2Show}
        title="Global Search"
      >
        <IoSearch />
      </button>
      <Offcanvas
        show={ArcOffCanvaShow}
        onHide={handleArcOffCanvaClose}
        className={`arc-off-canva-default search-filter`}
        placement="start"
        backdrop="static"
      >
        <Offcanvas.Body>
          <div className="off-canva-body-content">
            <div className="off-canva-header">
              <h3>Global Search</h3>
              <span
                className="close-btn"
                title="Close"
                onClick={handleArcOffCanvaClose}
              >
                <MdOutlineCancel />
              </span>
            </div>
            <div className="off-canva-main">
              <div className="search-input">
                <div className="search-input-filter">
                  <div
                    className={`search-input-filter-inside ${
                      errormsg ? "error" : ""
                    }`}
                  >
                    <span>
                      <IoSearch />
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="Search Planner"
                      value={searchValue}
                      onChange={handleChange}
                      onKeyDown={handleEnterToSearch}
                    />
                  </div>
                  <button
                    title="Search"
                    onClick={() => {
                      handleSearch(key);
                    }}
                  >
                    <TbFilterSearch />
                  </button>
                </div>
                {errormsg && <p className="error-msg">Search Value Required</p>}
              </div>
              <div className="arc-tab-content">
                <Tabs
                  activeKey={key}
                  onSelect={(k) => {
                    setKey(k);
                    {
                      searchValue !== "" && handleSearch(k);
                    }
                  }}
                  className=""
                  transition={false}
                >
                  {LeadFormAPI?.groups
                    ?.slice()
                    .sort((a, b) => a.seqno - b.seqno)
                    .map((sectionlist, index) => (
                      <Tab
                        key={index}
                        eventKey={sectionlist.name}
                        title={<>{sectionlist.name}</>}
                        onChange={handleDataSearch}
                      >
                        <div className="tab-main-content">
                          {DataTableLoadingStatus ? (
                            <>
                              <FilterTableLoading />
                            </>
                          ) : searchedResult?.length > 0 &&
                            (filteredResults != undefined ||
                              overallResult != undefined) &&
                            overallResult != {} ? (
                            key === "All Results" ? (
                              <>
                                <AllCollapseExample
                                  data={overallResult}
                                  value={searchValue.toLowerCase()}
                                  filteredDataCount={FilteredData?.numFound}
                                  searchedResult={searchedResult}
                                  setArcOffCanvaShow={setArcOffCanvaShow}
                                  handleNavigate={handleNavigate}
                                />
                                {/* <AllCollapseExample1 data={overallResult} /> */}
                                {/* <AllCollapseExampleDynamic
                                  data={overallResult}
                                /> */}
                                {/* <AccordionTemplate data={filteredResults} /> */}
                              </>
                            ) : (
                              filteredResults?.length > 0 && (
                                <>
                                  <SingleAccordionTabs
                                    data={filteredResults}
                                    crntKey={key}
                                    value={searchValue.toLowerCase()}
                                    filteredDataCount={FilteredData?.numFound}
                                    searchedResult={searchedResult}
                                    handleNavigate={handleNavigate}
                                  />
                                  {/* <DataTable
                                      GridData={filteredResults}
                                      value={searchValue.toLowerCase()}
                                    /> */}
                                  {/* <Pagination
                                    totalDatas={totalDatas}
                                    numbers={numbers}
                                    changePage={changePage}
                                    nextPage={nextPage}
                                    npage={npage}
                                    RecordValue={recordValue}
                                    currentPage={currentPage}
                                    setrecordValue={setrecordValue}
                                    setCurrentPage={setCurrentPage}
                                    prevPage={prevPage}
                                    loading={DataTableLoadingStatus}
                                  /> */}
                                </>
                              )
                            )
                          ) : (
                            showDefaultMsg &&
                            searchedResult?.length == 0 &&
                            !DataTableLoadingStatus && (
                              <DataNotFound
                                searchValue={searchValue}
                                setArcOffCanvaShow={setArcOffCanvaShow}
                                handleglobalsearchlink={handleglobalsearchlink}
                              />
                            )
                          )}
                        </div>

                        {/* <pre>{JSON.stringify(overallResult, null, 2)}</pre> */}
                        {/* <pre>{JSON.stringify(overallResult, null, 2)}</pre> */}
                      </Tab>
                    ))}
                </Tabs>
              </div>
            </div>
            <div className="off-canva-footer">
              <button onClick={handleClearFilter}>
                <GrPowerReset /> Reset to Default
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
};
export default SearchComponent;

console.log(openSearch);

export function AllCollapseExample({
  data,
  value,
  filteredDataCount,
  searchedResult,
  handleNavigate,
}) {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);

  const ProjectResult = Result_JSON.Project;
  const TaskResult = Result_JSON.Task;

  const FollowUpResult = Result_JSON.FollowUp;

  console.log(filteredDataCount);
  console.log(searchedResult?.length);

  // const [pageNumberCount, setPageNumberCount] = useState(0);

  // const layoutPages = document.querySelector(".srcoll-to-fetch");
  // const layoutPagesRef = useRef(null);

  // const handleScroll = debounce(() => {
  //   const layoutPages = layoutPagesRef.current;
  //   if (layoutPages) {
  //     const isAtBottom =
  //       layoutPages.scrollTop + layoutPages.clientHeight >=
  //       layoutPages.scrollHeight;
  //     if (isAtBottom) {
  //       if (filteredDataCount && filteredDataCount > searchedResult?.length) {
  //         const pageC = Number(sessionStorage.getItem("pageCount")) || 0;
  //         sessionStorage.setItem("pageCount", pageC + 1);

  //         dispatch(
  //           GlobalSearchPagination({
  //             pageNumberCount: pageC + 1,
  //             searchData: value,
  //           })
  //         );
  //       } else {
  //         console.log("Reached End");
  //       }
  //     }
  //   }
  // }, 400);

  // useEffect(() => {
  //   const layoutPages = layoutPagesRef.current;
  //   if (layoutPages) {
  //     layoutPages.addEventListener("scroll", handleScroll);

  //     return () => {
  //       layoutPages.removeEventListener("scroll", handleScroll);
  //     };
  //   }
  // }, [handleScroll]);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const customOrder = ["Task", "Project", "Follow Up"];
  const entries = Object.entries(data);

  const sortedEntries = entries.sort((a, b) => {
    const indexA = customOrder.indexOf(a[0]);
    const indexB = customOrder.indexOf(b[0]);
    return indexA - indexB;
  });

  const items = sortedEntries.map(([key, value], index) => (
    <Accordion.Item eventKey={index.toString()} key={index}>
      <Accordion.Header
        className={index === activeIndex ? "active" : ""}
        onClick={() => handleAccordionClick(index)}
      >
        {key} ({value.length}){" "}
        <span>
          <IoIosArrowDropdown />
        </span>
      </Accordion.Header>
      <Accordion.Body
        className="srcoll-to-fetch"
        // ref={layoutPagesRef}
      >
        <div className="result-box-group">
          {key === "Project"
            ? value.slice(0, 20).map((project) => {
                console.log(project);
                const ImgData = (fullName) => {
                  const words = fullName && fullName.split(" ");
                  const startWithLetter = words ? words[0].charAt(0) : "";
                  const endWithLetter =
                    words && words.length > 1
                      ? words[words.length - 1].charAt(0)
                      : "";

                  return startWithLetter + endWithLetter || "-";
                };
                return (
                  <>
                    <div className="result-box project">
                      <div className="left-info">
                        <span className="icon">
                          <span>
                            {ImgData(project[ProjectResult.Title.title] || "-")}
                          </span>
                        </span>
                        <div className="info">
                          <p
                            title={"Project Name"}
                            className="title"
                            onClick={() =>
                              handleNavigate(project.uniqueID, key)
                            }
                          >
                            {project[ProjectResult.Title.title] || "-"}
                          </p>
                          {/* <p className="date-asign">
                            <span>
                              <IoMdCalendar />{" "}
                              {project[TaskResult.DueDate.title] || "-"}
                            </span>
                            <span>
                              <FaRegUserCircle />
                              {project[TaskResult.Assignedto.title] || "-"}
                            </span>
                          </p> */}
                        </div>
                      </div>
                      <div className="right-info">
                        <div className="info">
                          <p title={ProjectResult.Createdby.tooltip}>
                            <RiVipCrownLine />
                            {project[ProjectResult.Createdby.title] || "-"}
                          </p>
                          <span title={ProjectResult.ModifiedOn.tooltip}>
                            {project[ProjectResult.ModifiedOn.title]
                              ? project[ProjectResult.ModifiedOn.title] == "0"
                                ? "-"
                                : project[ProjectResult.ModifiedOn.title]
                              : "-"}
                            {/* {project[ProjectResult.ModifiedOn.title] || "-"} */}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            : key === "Follow Up"
              ? value.slice(0, 20).map((followup) => (
                  <div className="result-box task" key={followup.id}>
                    <div className="left-info">
                      <span className="icon">
                        <MdAssignment />
                      </span>
                      <div className="info">
                        <p
                          className="title"
                          title={"Followup Name"}
                          // onClick={() =>
                          //   handleNavigate(followup.uniqueID, crntKey)
                          // }
                        >
                          {followup[FollowUpResult.Title.title] || "-"}
                        </p>
                        <p className="date-asign">
                          <span title={FollowUpResult.DueDate.tooltip}>
                            <IoMdCalendar />{" "}
                            {followup[FollowUpResult.DueDate.title] || "-"}
                          </span>
                          <span title={FollowUpResult.Assignedto.tooltip}>
                            <FaRegUserCircle />
                            {followup[FollowUpResult.Assignedto.title] || "-"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="right-info">
                      <div className="info">
                        <p title={FollowUpResult.Createdby.tooltip || "-"}>
                          <RiVipCrownLine />
                          {followup[FollowUpResult.Createdby.title] || "-"}
                        </p>
                        <span title={FollowUpResult.ModifiedOn.tooltip}>
                          {followup[FollowUpResult.ModifiedOn.title] || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              : value.slice(0, 20).map((result) => {
                  return (
                    <>
                      {console.log(value)}
                      <div className="result-box task">
                        <div className="left-info">
                          <span className="icon">
                            <MdAssignment />
                          </span>
                          <div className="info">
                            <p
                              className="title"
                              onClick={() =>
                                handleNavigate(result.uniqueID, key)
                              }
                              title={"Task Name"}
                            >
                              {result[TaskResult.Title.title] || "-"}
                            </p>
                            <p className="date-asign">
                              <span title={TaskResult.DueDate.tooltip}>
                                <IoMdCalendar />{" "}
                                {result[TaskResult.DueDate.title]
                                  ? result[TaskResult.DueDate.title] == "0"
                                    ? "-"
                                    : result[TaskResult.DueDate.title]
                                  : "-"}
                              </span>
                              <span title={TaskResult.Assignedto.tooltip}>
                                <FaRegUserCircle />
                                {result[TaskResult.Assignedto.title] || "-"}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="right-info">
                          <div className="info">
                            <p title={TaskResult.Owner.tooltip || "-"}>
                              <RiVipCrownLine />
                              {result[TaskResult.Owner.title] || "-"}
                            </p>
                            <span title={TaskResult.ModifiedOn.tooltip}>
                              {result[TaskResult.ModifiedOn.title]
                                ? result[TaskResult.ModifiedOn.title] == "0"
                                  ? "-"
                                  : result[TaskResult.ModifiedOn.title]
                                : "-"}
                              {/* {result[TaskResult.ModifiedOn.title] || "-"} */}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  ));

  return (
    <div className="arc-accordion-filter">
      <Accordion defaultActiveKey={"0"}>{items}</Accordion>
    </div>
  );
}

export function SingleAccordionTabs({
  data,
  value,
  crntKey,
  filteredDataCount,
  searchedResult,
  handleNavigate,
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const dispatch = useDispatch();
  const ProjectResult = Result_JSON.Project;
  const FollowUpResult = Result_JSON.FollowUp;
  const TaskResult = Result_JSON.Task;
  console.log(crntKey);

  const layoutPagesRef = useRef(null);

  const handleScroll = debounce(() => {
    const layoutPages = layoutPagesRef.current;
    if (layoutPages) {
      const isAtBottom =
        layoutPages.scrollTop + layoutPages.clientHeight >=
        layoutPages.scrollHeight;
      if (isAtBottom) {
        console.log(filteredDataCount);
        if (filteredDataCount && filteredDataCount > data?.length) {
          const pageC = Number(sessionStorage.getItem("pageCount")) || 0;
          sessionStorage.setItem("pageCount", pageC + 15);
          const RequestData = {
            pageNumberCount: pageC + 15,
            searchData: value,
            entityName: crntKey,
          };

          dispatch(GlobalSearchPagination(RequestData));
        } else {
          console.log("Reached End");
        }
      }
    }
  }, 400);

  useEffect(() => {
    const layoutPages = layoutPagesRef.current;
    if (layoutPages) {
      layoutPages.addEventListener("scroll", handleScroll);

      return () => {
        layoutPages.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="arc-accordion-filter">
      <Accordion defaultActiveKey={"0"}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            {crntKey} ({filteredDataCount}){" "}
            <span>
              {" "}
              <IoIosArrowDropdown />
            </span>
          </Accordion.Header>
          <Accordion.Body className="scroll-to-fetch" ref={layoutPagesRef} y>
            <div className="result-box-group">
              {crntKey === "Project"
                ? data.map((project) => {
                    const ImgData = (fullName) => {
                      const words = fullName && fullName.split(" ");
                      const startWithLetter = words ? words[0].charAt(0) : "";
                      const endWithLetter =
                        words && words.length > 1
                          ? words[words.length - 1].charAt(0)
                          : "";

                      return startWithLetter + endWithLetter || "-";
                    };
                    return (
                      <div className="result-box project" key={project.id}>
                        <div className="left-info">
                          <span className="icon">
                            <span>
                              {ImgData(
                                project[ProjectResult.Title.title] || "-"
                              )}
                            </span>
                          </span>
                          <div className="info">
                            <p
                              className="title"
                              title={"Project Name"}
                              onClick={() =>
                                handleNavigate(project.uniqueID, crntKey)
                              }
                            >
                              {project[ProjectResult.Title.title] || "-"}
                            </p>
                          </div>
                        </div>
                        <div className="right-info">
                          <div className="info">
                            <p title={ProjectResult.Createdby.tooltip}>
                              {/* <RiVipCrownLine /> */}a
                              {/* {project[ProjectResult.Createdby.title] || "-"} */}
                            </p>
                            <span title={ProjectResult.ModifiedOn.tooltip}>
                              {/* {project[ProjectResult.ModifiedOn.title]
                                ? project[ProjectResult.ModifiedOn.title] == "0"
                                  ? "-"
                                  : project[ProjectResult.ModifiedOn.title]
                                : "-"} */}
                              {/* {project[ProjectResult.ModifiedOn.title] || "-"} */}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : crntKey === "Follow Up"
                  ? data.map((followup) => (
                      <div className="result-box task" key={followup.id}>
                        <div className="left-info">
                          <span className="icon">
                            <MdAssignment />
                          </span>
                          <div className="info">
                            <p
                              className="title"
                              title={"Followup Name"}
                              // onClick={() =>
                              //   handleNavigate(followup.uniqueID, crntKey)
                              // }
                            >
                              {followup[FollowUpResult.Title.title] || "-"}
                            </p>
                            <p className="date-asign">
                              <span title={FollowUpResult.DueDate.tooltip}>
                                <IoMdCalendar />{" "}
                                {followup[FollowUpResult.DueDate.title] || "-"}
                              </span>
                              <span title={FollowUpResult.Assignedto.tooltip}>
                                <FaRegUserCircle />
                                {followup[FollowUpResult.Assignedto.title] ||
                                  "-"}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="right-info">
                          <div className="info">
                            <p title={FollowUpResult.Createdby.tooltip || "-"}>
                              <RiVipCrownLine />
                              {followup[FollowUpResult.Createdby.title] || "-"}
                            </p>
                            <span title={FollowUpResult.ModifiedOn.tooltip}>
                              {followup[FollowUpResult.ModifiedOn.title] || "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  : data.map((result) => (
                      <div className="result-box task" key={result.id}>
                        <div className="left-info">
                          <span className="icon">
                            <MdAssignment />
                          </span>
                          <div className="info">
                            <p
                              className="title"
                              title={"Task Name"}
                              onClick={() =>
                                handleNavigate(result.uniqueID, crntKey)
                              }
                            >
                              {result[TaskResult.Title.title] || "-"}
                            </p>
                            <p className="date-asign">
                              <span title={TaskResult.DueDate.tooltip}>
                                <IoMdCalendar />{" "}
                                {result[TaskResult.DueDate.title]
                                  ? result[TaskResult.DueDate.title] == "0"
                                    ? "-"
                                    : result[TaskResult.DueDate.title]
                                  : "-"}
                                {/* {result[TaskResult.DueDate.title] || "-"} */}
                              </span>
                              <span title={TaskResult.Assignedto.tooltip}>
                                <FaRegUserCircle />
                                {result[TaskResult.Assignedto.title] || "-"}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="right-info">
                          <div className="info">
                            <p title={TaskResult.Owner.tooltip || "-"}>
                              <RiVipCrownLine />
                              {result[TaskResult.Owner.title] || "-"}
                            </p>
                            <span title={TaskResult.ModifiedOn.tooltip}>
                              {result[TaskResult.ModifiedOn.title]
                                ? result[TaskResult.ModifiedOn.title] == "0"
                                  ? "-"
                                  : result[TaskResult.ModifiedOn.title]
                                : "-"}
                              {/* {result[TaskResult.ModifiedOn.title] || "-"} */}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

const LoadingBtn = () => {
  return <MySkeleton height={20} radius={0} width={20} clsnme="loading-btn" />;
};

const DataNotFound = ({ searchValue, handleglobalsearchlink }) => {
  const Navigations = [
    {
      name: "Task",
      url: "/task",
    },
    {
      name: "Project",
      url: "/project",
    },
    {
      name: "Follow Up",
      url: "/followup",
    },
    // {
    //   name: "Tag",
    //   url: "/tag",
    // },
  ];
  return (
    <>
      <div className="data-not-found">
        <div className="lottie-animation">
          <Player autoplay loop src={DataNotFoundJson}></Player>
        </div>
        {searchValue == "" ? (
          <p className="not-fount-text">Type to search Something</p>
        ) : (
          <p className="not-found-text">
            Your search for <span>“{searchValue}”</span> didn't return any
            result.
          </p>
        )}

        {/* <div className="filter-btn-group">
          <ArcButtonWithIconType4
            ClassName=""
            BtnText="Add Contact"
            Icon={
              <>
                <LuUserPlus />
              </>
            }
          />
          <ArcButtonWithIconType4
            ClassName=""
            BtnText="Add Account"
            Icon={
              <>
                <TiContacts />
              </>
            }
          />
          <ArcButtonWithIconType4
            ClassName=""
            BtnText="Add Lead"
            Icon={
              <>
                <PiUserCirclePlus />
              </>
            }
          />
        </div> */}
        <div className="filter-by">
          <h5>Browse By Module</h5>
          <hr />
          <ul>
            {Navigations.map((item, idx) => (
              <li key={idx} onClick={handleglobalsearchlink}>
                <Link to={item.url}> {item.name}</Link>
              </li>
            ))}
          </ul>
          {/* <ul>
            <li>Task</li>
            <li>Project</li>
            <li>Follow Up</li>
            <li>Tag</li>
            {/* <li>Contact</li>
            <li>Account</li>
            <li>Task</li>
            <li>Deals</li>
            <li>Meeting</li> */}
          {/* </ul> */}
        </div>
      </div>
    </>
  );
};

// export const Pagination = ({
//   totalDatas,
//   loading,
//   RecordValue,
//   prevPage,
//   currentPage,
//   numbers,
//   npage,
//   nextPage,
//   changePage,
//   setCurrentPage,
//   setrecordValue,
// }) => {
//   const handlePageSizeChange = (size) => {
//     setrecordValue(size);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const generatePageNumbers = () => {
//     const totalPages = npage; // Assuming npage is the total number of pages
//     const maxVisiblePages = 2; // Maximum number of visible page links

//     if (totalPages <= maxVisiblePages) {
//       // If total pages are less than or equal to maxVisiblePages, show all pages
//       return Array.from({ length: totalPages }, (_, index) => index + 1);
//     } else {
//       // Calculate the start and end of the visible page numbers
//       let startPage = Math.max(
//         1,
//         currentPage - Math.floor(maxVisiblePages / 2)
//       );
//       let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//       // Adjust startPage if endPage is at the maximum range and not touching the beginning
//       if (endPage === totalPages && endPage - maxVisiblePages + 1 > 1) {
//         startPage = endPage - maxVisiblePages + 1;
//       }

//       let pageNumbers = [];

//       // Add ellipses and first page if necessary
//       if (startPage > 1) {
//         pageNumbers.push(1);
//         if (startPage > 2) {
//           pageNumbers.push("...");
//         }
//       }

//       // Add visible page numbers
//       for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//       }

//       // Add ellipses and last page if necessary
//       if (endPage < totalPages) {
//         if (endPage < totalPages - 1) {
//           pageNumbers.push("...");
//         }
//         pageNumbers.push(totalPages);
//       }

//       return pageNumbers;
//     }
//   };

//   const dottedNumbers = generatePageNumbers();

//   return (
//     <div className="wijimo-pagination">
//       <div className="pagination-text">
//         Total Results : <span>{totalDatas}</span>
//       </div>
//       <DropdownButton
//         id="dropdown-item-button"
//         className={loading && "loading-time"}
//         drop="up"
//         title={` ${
//           RecordValue === 0 ? "No Paging" : RecordValue + " per page"
//         } `}
//       >
//         <div className="item-div">
//           {[5, 10, 20, 30, 50, 100].map((data, index) => (
//             <Dropdown.Item
//               eventKey={data}
//               as="button"
//               key={index}
//               onClick={() => handlePageSizeChange(data)}
//             >
//               {data === 0 ? "No Paging" : data} per page
//             </Dropdown.Item>
//           ))}
//         </div>
//       </DropdownButton>
//       {loading ? (
//         <>
//           <MySkeleton height={20} radius={0} width={50} clsnme="loading-btn" />
//           {[...Array(5)].map((data, index) => (
//             <React.Fragment key={index}>
//               <LoadingBtn />
//             </React.Fragment>
//           ))}
//           <MySkeleton height={20} radius={0} width={50} clsnme="loading-btn" />
//         </>
//       ) : (
//         <>
//           <div className="right-side-pagination">
//             <ul className="custom-pagination">
//               <li className="page-item">
//                 <a
//                   href="#"
//                   className={`page-link  ${
//                     currentPage !== 1 ? "" : "hide-button"
//                   }`}
//                   onClick={prevPage}
//                 >
//                   <span className="toggle-icon">
//                     {" "}
//                     <MdOutlineArrowBackIos />
//                   </span>
//                   Prev
//                 </a>
//               </li>
//               {dottedNumbers.map((i, ind) => (
//                 <li key={ind}>
//                   <a
//                     href="#"
//                     className={`page-link  ${
//                       currentPage == i ? "active" : ""
//                     } `}
//                     onClick={() => changePage(i)}
//                   >
//                     {i}
//                   </a>
//                 </li>
//               ))}
//               <li className="page-item">
//                 <a
//                   href="#"
//                   className={`page-link  ${
//                     currentPage !== npage ? "" : "hide-button"
//                   }`}
//                   onClick={nextPage}
//                 >
//                   Next
//                   <span className="toggle-icon">
//                     <MdOutlineArrowForwardIos />
//                   </span>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export function AllCollapseExample1({ data }) {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const handleAccordionClick = (index) => {
//     setActiveIndex(index === activeIndex ? null : index);
//   };

//   const renderItem = (item, structure) => {
//     return structure.map((field, idx) => {
//       const valueKey = Object.values(field)[0];
//       return valueKey && item[valueKey] ? (
//         <div className="field-item" key={idx}>
//           <span className="field-value" title={item[valueKey]}>
//             {item[valueKey]}
//           </span>
//         </div>
//       ) : null;
//     });
//   };

//   const items = Object.entries(data).map(([key, value], index) => (
//     <Accordion.Item eventKey={index.toString()} key={index}>
//       <Accordion.Header
//         className={index === activeIndex ? "active" : ""}
//         onClick={() => handleAccordionClick(index)}
//       >
//         {key} ({value.length}){" "}
//         <span>
//           {index === activeIndex ? (
//             <IoIosArrowDropup />
//           ) : (
//             <IoIosArrowDropdown />
//           )}
//         </span>
//       </Accordion.Header>
//       <Accordion.Body>
//         {value.map((item, idx) => (
//           <div className="child-data" key={idx}>
//             <div className="child-data-left">
//               {renderItem(item, openSearch[key] || [])}
//             </div>
//           </div>
//         ))}
//       </Accordion.Body>
//     </Accordion.Item>
//   ));

//   return (
//     <div className="arc-accordion-filter">
//       <Accordion>{items}</Accordion>
//     </div>
//   );
// }

//*********************************************//

{
  /* <div className={`streaming-swiper-div ${FooterHeight}`} onScroll={handleScroll}>
  {}
  <FeedVideos />
  <span className="loading-icon">
    <Spinner animation="border" />
  </span>
</div>; */
}

// export function AccordionTemplate({ data }) {
//   const [open, setOpen] = useState(null); // State to track open accordion item

//   const toggleAccordion = (idx) => {
//     setOpen(open === idx ? null : idx); // Toggle accordion open/close
//   };

//   return (
//     <div className="accardian">
//       {Object.entries(data).map(([key, value], idx) => (
//         <div className="accardian-container" key={idx}>
//           <div
//             className="accardian-header"
//             onClick={() => toggleAccordion(idx)}
//           >
//             <div className={open === idx ? "accardian-header-name" : ""}>
//               <span>
//                 {key} ({value.length})
//               </span>
//             </div>
//             <div className="drop-icon">
//               {open === idx ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}{" "}
//               {/* Example of drop-up/drop-down icon */}
//             </div>
//           </div>
//           <hr />
//           {key === "Project"
//             ? open === idx && (
//                 <div className="accardian-body">
//                   {value.map((singleData, index) => (
//                     <div className="child-data" key={index}>
//                       <div className="child-data-left project">
//                         <div className="common-icon project">S</div>
//                         <p className="project title">{singleData.TaskName}</p>
//                       </div>
//                       <div className="child-data-right">
//                         {singleData.Createdby ? (
//                           <p>
//                             <RiVipCrownLine /> {singleData.Createdby}
//                           </p>
//                         ) : null}
//                         <p>{singleData.ModifiedOn}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )
//             : open === idx && (
//                 <div className="accardian-body">
//                   {value.map((singleData, index) => (
//                     <div className="child-data" key={index}>
//                       <div className="child-data-left">
//                         <div className="common-icon task">
//                           <MdAssignment />
//                         </div>
//                         <div className="content">
//                           <p className="task title">{singleData.TaskName}</p>
//                           <p>{singleData.DueDate}</p>
//                         </div>
//                       </div>
//                       <div className="child-data-right">
//                         <p>
//                           {" "}
//                           <RiVipCrownLine />
//                           &nbsp;{singleData.AssignedTo}
//                         </p>
//                         <p>{singleData.ModifiedOn}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//         </div>
//       ))}
//     </div>
//   );
// }
