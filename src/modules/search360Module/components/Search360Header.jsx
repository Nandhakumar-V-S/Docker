import { ArcGlobalContextProvider } from "@/context/GlobalContext/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//* json
import PageSetup from "@/context/GlobalContext/PageSetup.json";

//
import { Container, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import { BsGrid } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import Add from "@/components/AddButton/Add";
import { masterDataInfo, postDataInfo } from "@/redux/Features/selector";
import { useDispatch, useSelector } from "react-redux";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { request } from "@/request/API/globalrequest";
import { getMasterDataSuccess } from "@/redux/Features/actions";

const PageSetupHeader = PageSetup.Pages.Page360.Header;
function Search360Header() {
  const { previousPathName } = useContext(ArcGlobalContextProvider);
  const [featuresShow, setFeaturesShow] = useState(false);
  const dispatch = useDispatch();
  const instanceId = sessionStorage.getItem("Current_EntityID");
  const entityId = "5C4C4FB1-8E96-473D-9E13-BD7372050D65";
  const masterData = useSelector(masterDataInfo);
  const [bindingName, setBindingName] = useState("");
  const selectEntityDetails = (state) => state.searchEntity.entityDetails;
  const entityDetails = useSelector(selectEntityDetails);
  useEffect(() => {
    const entityResults = entityDetails?.result?.data;
    const entityResult =
      entityResults && entityResults.length > 0 ? entityResults[0] : null;
    console.log(entityResult);
    setBindingName(entityResult?.column17);
  }, [entityDetails]);

  async function getlookupdetails() {
    const postData = {
      entityId: entityId,
    };
    const response = await request.post(
      API_TEST_URL,
      "arcconfiguration/getlookupdatabyid",
      postData
    );
    dispatch(getMasterDataSuccess(response));
  }

  useEffect(() => {
    if (masterData.length === 0) {
      getlookupdetails();
    }
  }, [masterData, featuresShow]);

  const addFeaturesPopup = {
    formId: "88B47387-09F4-4DAC-8938-DDDD03DEFC86",
    endpoint: "/arcform/transactioninsert",
    btnName: "Add Features",
    headerName: "Add Features",
    show: featuresShow,
    setShow: setFeaturesShow,
    entityId: entityId,
    instanceId: "",
    isFormattedValue: false,
    istag: false,
    masterData: masterData,
    pageDetails: {
      name: bindingName,
      instanceId: instanceId,
      disabled: true,
    },
  };

  const navigate = useNavigate();
  const NavigateToListPage = () => {
    navigate(previousPathName);
  };
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const headerTitle = previousPathName.split("/")[1];
  const headerToShow = capitalizeFirstLetter(headerTitle);
  console.log(headerTitle);
  return (
    <>
      {PageSetupHeader.Visibility && (
        <section className="list-header details360-header">
          <Container fluid>
            <Row>
              <Col xxl={12}>
                <div className="list-header-inside">
                  <div className="filter-dropdown">
                    <span className="icon">
                      <BsGrid />
                    </span>
                    <div className="drop-down">
                      {/* <p>{PageSetupHeader.HeaderTitle}</p> */}
                      <p>{`${headerToShow} Details`}</p>
                      <span
                        onClick={() => {
                          NavigateToListPage(previousPathName);
                        }}
                      >
                        <span className="back-icon">
                          <IoIosArrowBack />
                        </span>
                        Back to{" "}
                        {previousPathName === "/home"
                          ? "Home"
                          : previousPathName === "/task"
                            ? "Task"
                            : previousPathName === "/project"
                              ? "Project"
                              : previousPathName === "/execution"
                                ? "Plan Viewer"
                                : "Plan Viewer"}
                      </span>
                    </div>
                  </div>
                  <div className="action-add">
                    {/* {PageSetupHeader.HeaderButton.Call.Visibility && (
                      <button className="action-btn">
                        <span>
                          <MdOutlineAddIcCall />
                        </span>
                        Call
                      </button>
                    )}
                    {PageSetupHeader.HeaderButton.Meeting.Visibility && (
                      <button className="action-btn">
                        <span>
                          <IoCalendarClearOutline />
                        </span>
                        Meeting
                      </button>
                    )} */}
                    {PageSetupHeader.HeaderButton.MoreAction.Visibility && (
                      <DropdownButton
                        align="end"
                        id="dropdown-item-button"
                        title={
                          <>
                            More Action
                            <span>
                              <IoIosArrowDown />
                            </span>
                          </>
                        }
                      >
                        <div className="item-div">
                          {PageSetupHeader.HeaderButton.MoreAction.DropdownOptions.map(
                            (data, index) => (
                              <Dropdown.Item
                                eventKey={data}
                                as="button"
                                key={index}
                              >
                                {ArcIconComponents[data.Icon]}
                                {data.Label}
                              </Dropdown.Item>
                            )
                          )}
                        </div>
                      </DropdownButton>
                    )}
                    <Add popupDatas={addFeaturesPopup} />
                    {/* <AddSubTask360 /> */}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
}

export default Search360Header;
