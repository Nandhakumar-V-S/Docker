// *******~ Import ~******** //
//? React
import { useState, useEffect } from "react";
//? Assets
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
//? Components

//! Updated

import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import ArcTextBox from "@/components/arccomponents/ui-components/ArcTextbox/ArcTextBox";
import ArcSingleSelect from "@/components/arccomponents/ui-components/ArcSingleSelect/ArcSingleSelect";
import ArcMultiSelect from "@/components/arccomponents/ui-components/ArcMultiSelect/ArcMultiSelect";
import ArcCustomMultiSelect from "@/components/arccomponents/ui-components/ArcCustomMultiSelect/ArcCustomMultiSelect";
import { ArcCustomMultiSelect1 } from "@/components/arccomponents/ui-components/ArcCustomMultiSelect/ArcCustomMultiSelect";
import MultiCreatableSelect from "@/components/arccomponents/ui-components/MultiCreatableSelect/MultiCreatableSelect";
import ArcTextarea from "@/components/arccomponents/ui-components/ArcTextarea/ArcTextarea";
import ArcFileSelect from "@/components/arccomponents/ui-components/ArcFileSelect/ArcFileSelect";
import ArcDatepicker from "@/components/arccomponents/ui-components/ArcDatepicker/ArcDatepicker";
import ArcRadioBtn from "@/components/arccomponents/ui-components/ArcRadioBtn/ArcRadioBtn";
import ArcCheckBoxBtn from "@/components/arccomponents/ui-components/ArcCheckBoxBtn/ArcCheckBoxBtn";
import ArcPopover from "@/components/arccomponents/ui-components/ArcPopover/ArcPopover";
import ArcToggle from "@/components/arccomponents/ui-components/ArcToggle/arctoggle";
import ArcAutocomplete from "@/components/arccomponents/ui-components/ArcAutoComplete/ArcAutoComplete";
import ArcTagInput from "@/components/arccomponents/ui-components/ArcTagInput/ArcTagInput";
import ArcTagInputV2 from "@/components/arccomponents/ui-components/ArcTagInput/ArcTagInputv2";
import ArcTagInputV3 from "@/components/arccomponents/ui-components/ArcTagInput/ArcTagInputv3";
import { TimeInput } from "@/components/arccomponents/ui-components/ArcHourInput/ArcHourInput";
import {
  ArcSuccess,
  ArcError,
} from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";
import ArcPopup from "@/components/arccomponents/ui-components/ArcPopup/ArcPopup";
import ArcCustomTag from "@/components/arccomponents/ui-components/ArcCustomTag/ArcCustomTag";
import ArcAddCustomTag from "@/components/arccomponents/ui-components/ArcCustomTag/ArcAddCustomTag";
import ArcTagFilter from "@/components/arccomponents/ui-components/ArcCustomTag/ArcTagFilter";
import ArcOffCanva from "@/components/arccomponents/ui-components/ArcOffCanva/ArcOffCanva";
import ArcTreeView from "@/components/arccomponents/ui-components/ArcTreeview/ArcTreeView";
import ArcTreeViewV2 from "@/components/arccomponents/ui-components/ArcTreeview/ArcTreeViewV2";
import {
  ArcButtonPrimary,
  ArcButtonSecondary,
  ArcButtonWithIcon,
  ArcButtonWithIconType1,
  ArcButtonWithIconType2,
  ArcButtonWithIconType3,
} from "@/components/arccomponents/ui-components/ArcButtons/ArcButtons";
import {
  ArcDropDownDefault,
  ArcDropDownControled,
  ArcDropDownControledSearchIcon,
} from "@/components/arccomponents/ui-components/ArcDropDown/ArcDropDown";
import NavigationComponent from "@/components/arccomponents/ui-components/ArcNavigate/ArcNavigate";
import ArcProgressRangeInput from "@/components/arccomponents/ui-components/ArcRangeInput/ArcRangeInput";
import { getlookupdetails } from "@/redux/getlookupdetails/getlookupdetails";
import { getupdatelookupdetails } from "@/redux/getlookupdetails/getUpdateLookupDetails";
import ArcAddLookupDetails from "@/components/arccomponents/ui-components/ArcAutoComplete/ArcAddLookupDetails";
import ArcUpdateLookupDetails from "@/components/arccomponents/ui-components/ArcAutoComplete/ArcUpdateLookupDetails";
import ArcFilterAutoComplete from "@/components/arccomponents/ui-components/ArcAutoComplete/ArcFilterAutoComplete";
import ArcAddLookupSingleSelect from "@/components/arccomponents/ui-components/ArcAutoComplete/ArcAddLookupSingleSelect";
import ArcUpdateLookupSingleSelect from "@/components/arccomponents/ui-components/ArcAutoComplete/ArcUpdateLookupSingleSelect";
//? CSS

//? Images

//? JSON File

//? Icons

import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { FaRegBell } from "react-icons/fa";
import RegistrationForm from "../ArcForms/arc-form-view";
// import { Link as ScrollLink } from "react-scroll";
// *******~ Import ~******** //

const UIComponents = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState();
  const [showPopover, setShowPopover] = useState(false);
  const [ArcPopupshow, setArcPopupshow] = useState(false);
  const [ArcOffCanvaShow, setArcOffCanvaShow] = useState(false);
  const [ArcTreeviewShow, setArcTreeviewShow] = useState(false);
  const [ArcOffCanvaShowRight, setArcOffCanvaShowRight] = useState(false);
  const [progressStatus, setprogressStatus] = useState(50);
  const [EntityIds, setEntityIds] = useState([]);
  const [SelectedTreeValues, setSelectedTreeValues] = useState([]);
  //! Selecte input State
  const options = [
    { value: "Work 1", label: "Work 1" },
    { value: "Work 2", label: "Work 2" },
    { value: "Work 3", label: "Work 3" },
    { value: "Work 4", label: "Work 4" },
    { value: "Work 5", label: "Work 5" },
    { value: "Work 6", label: "Work 6" },
    { value: "Work 7", label: "Work 7" },
    { value: "Work 8", label: "Work 8" },
  ];
  //! Radio & Checkbox State
  const RadioBtnData = [
    {
      Title: "Owner 1",
      Value: "Owner 1",
    },
    {
      Title: "Owner 2",
      Value: "Owner 2",
    },
    {
      Title: "Owner 3",
      Value: "Owner 3",
    },
    // {
    //   Title: "Owner 4",
    //   Value: "Owner 4",
    // },
  ];
  //! DropdownItemsWithURL State
  const DropdownItemsWithURL = [
    { Title: "Asign to", Icon: <FaRegUser />, Url: "/" },
    {
      Title: "Import Contact",
      Icon: <IoDocumentTextOutline />,
      Url: "/",
    },
    { Title: "Change Status", Icon: <LiaExchangeAltSolid />, Url: "/" },
    { Title: "Delete", Icon: <RiDeleteBinLine />, Url: "/" },
  ];
  //! ArcDropDownControledData State
  const ArcDropDownControledData = [
    { id: 1, value: "New", Icon: <FaRegUser /> },
    { id: 2, value: "Contacted", Icon: <FaRegUser /> },
    { id: 3, value: "Qualified", Icon: <FaRegUser /> },
    { id: 4, value: "Negotiation/Review", Icon: <FaRegUser /> },
    { id: 5, value: "Closed Lost", Icon: <FaRegUser /> },
    { id: 6, value: "Closed Won", Icon: <FaRegUser /> },
  ];
  const [SelectedValue, setSelectedValue] = useState(
    ArcDropDownControledData[1].value
  );
  const [SelectedValueState2, setSelectedValueState2] = useState(
    ArcDropDownControledData[1].value
  );
  const [optionSelected, setOptionSelected] = useState(null);
  const HandleApply = () => {
    console.log("Options selected:", optionSelected);
  };
  // const handleNavigation = NavigationComponent();
  // ! toggle btn
  const [isToggled, setIsToggled] = useState(false);

  const handleToggleChange = (event) => {
    setIsToggled(event.target.checked);
  };
  const handleRangeChange = (e) => {
    setprogressStatus(e.target.value);
  };

  // ! Time Input start
  const DefaultHour = "3h 10m"; // Example input

  // State hooks to initialize hours and minutes
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [TotalMinutes, setTotalMinutes] = useState(0);

  const onBlurMinutes = () => {
    const currentMinutes = hours * 60 + parseInt(minutes, 10);
    setTotalMinutes(currentMinutes);
  };

  const onBlurHour = () => {
    const currenthours = parseInt(hours, 10) * 60 + minutes;
    setTotalMinutes(currenthours);
  };

  // ! Time Input End

  // ! Autocomplete Start
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  // const Limit = 10;
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTagItems, setselectedTagItems] = useState([]);
  const GetlookupdetailsData = useSelector(
    (state) => state.getlookupdetailsState.response?.result?.data
  );
  // Fetch lookup details
  const Fetchlookupdetails = (query, page, Limit) => {
    const RequestData = {
      // entityId: "F48EF545-9995-4F8F-857D-DDDA2BC063CC",
      entityId: "26B84156-CC30-416E-99D5-B37409B4D0BD",
      lookupId: "18A0DE1A-86BC-4733-B4DE-129CC6C360EF",
      limit: Limit.toString(),
      page: page.toString(),
      q: query,
    };
    dispatch(getlookupdetails(RequestData));
  };
  // ! Autocomplete End
  // ! Autocomplete Tag Update start
  const [selectedItemstag, setSelectedItemstag] = useState([]);
  const [mastervalues, setMastervalues] = useState([]);
  const [groupedMastervalues, setGroupedMastervalues] = useState([]);
  const GetUpdatelookupdetailsData = useSelector(
    (state) => state.getupdatelookupdetailsState.response?.result?.data
  );
  // Fetch lookup details
  const FetchUpdatelookupdetails = (query, page, Limit, transactionId) => {
    const RequestData = {
      // entityId: "F48EF545-9995-4F8F-857D-DDDA2BC063CC",
      entityId: "26B84156-CC30-416E-99D5-B37409B4D0BD",
      lookupId: "18A0DE1A-86BC-4733-B4DE-129CC6C360EF",
      transactionId: transactionId,
      limit: Limit.toString(),
      page: page.toString(),
      q: query,
    };
    dispatch(getupdatelookupdetails(RequestData));
  };
  // ! Autocomplete Tag Update End
  const [selectedItem, setSelectedItem] = useState([]);
  const [UpdateselectedTagItem, setUpdateselectedTagItem] = useState([]);
  // Fetch lookup details
  const fetchUpdateLookupDetailsData = (
    query,
    page,
    limit,
    transactionId,
    IsDefault
  ) => {
    const requestData = {
      entityId: "26B84156-CC30-416E-99D5-B37409B4D0BD",
      lookupId: "18A0DE1A-86BC-4733-B4DE-129CC6C360EF",
      transactionId: transactionId,
      IsDefaultValueNeeded: IsDefault,
      limit: limit.toString(),
      page: page.toString(),
      q: query,
    };
    dispatch(getupdatelookupdetails(requestData));
  };
  const getUpdatetagData = useSelector(
    (state) => state.getupdatelookupdetailsState.response?.result?.data
  );

  // !Tag Fileter
  const [selectedFilterItem, setselectedFilterItem] = useState([]);
  const lookupId = "18A0DE1A-86BC-4733-B4DE-129CC6C360EF";
  const datasetId = "268d97c1-e1da-487d-9c26-c445fde9a747";
  const filterId = "a7f10efb-e203-4295-94d1-3d0a7718504b";
  const handleCheckboxTagfilter = (item) => {
    const isSelected = selectedFilterItem.some(
      (selected) => selected.optionid === item.optionid
    );

    if (isSelected) {
      setselectedFilterItem((prevSelectedItem) =>
        prevSelectedItem.filter(
          (selected) => selected.optionid !== item.optionid
        )
      );
    } else {
      setselectedFilterItem((prevSelectedItem) => [...prevSelectedItem, item]);
    }
  };
  // !Tag Fileter

  // ~ Arc  lookup  updated
  const [addlookupselectedItem, setaddlookupselectedItem] = useState(null);
  const [udatelookupselectedItem, setudatelookupselectedItem] = useState(null);
  // ~ Arc  lookup  updated
  const filter = {
    id: "57c91566-8c0c-4c75-9baf-a940c5592fb1",
    name: "Project",
    lablekey: "lbl-Workitem-projectid",
    seqno: 4,
    filtercontroltype: "multiselect",
    isquickfilter: true,
    api_name: "column41",
    islookup: true,
    masterid: "0462F02F-D350-4244-9B76-3CBC965207BB",
    apioutputskey: "id",
    apioutputvalue: "column17",
    defaultvalue: "4A44F9B0-5EA6-45D8-84AD-41A299041CA5",
    defaultvalall: "4A44F9B0-5EA6-45D8-84AD-41A299041CA5",
    ismapped: true,
    filtercategory: "quick",
  };
  return (
    <section className="ui-components">
      <Container fluid>
        {/* Updated  Form Start*/}
        {/* <Row>
          {[...Array(5)].map((data, index) => (
            <ScrollLink
              key={index}
              activeClass="active"
              to={"ash" + index}
              spy={true}
              offset={-60}
              smooth={true}
              delay={0}
              duration={0}
            >
              Ash{index}
            </ScrollLink>
          ))}
        </Row> */}

        <Row>
          {/* <button onClick={handleNavigation}>Navigate to List Page</button> */}
          <Col xxl={12} xl={12} lg={12} md={12}>
            <h3 className="custom-component-title">Form Components</h3>
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcTextBox
              Label="First Name"
              ClassName=""
              PlaceHolder="Enter Your Name"
              Name="name"
              Required={true}
              // Value=""
              // DefaultValue=""
              ReadOnly={false}
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcSingleSelect
              options={options}
              Label="Single Select"
              PlaceHolder="Select Option"
              ClassName=""
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcMultiSelect
              options={options}
              Label="Multi Select"
              PlaceHolder="Select Multiple Option"
              ClassName=""
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcCustomMultiSelect
              options={options}
              setEntityIds={setEntityIds}
              PlaceHolder="Select Multiple Options"
              Label="Multi Select With Checkbox"
              ClassName=""
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <MultiCreatableSelect
              Label="Multi Select Creatable"
              PlaceHolder="Create Multiple Option"
              ClassName=""
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcTextarea
              Label="Textarea Field"
              ClassName=""
              PlaceHolder="Enter the details..."
              Name="textarea"
              Required={false}
              // Value=""
              // DefaultValue=""
              ReadOnly={false}
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcFileSelect
              Label="Select File"
              Name="file"
              ClassName=""
              Required={false}
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcDatepicker
              Label="Datepicker"
              PlaceHolder="Select a Date"
              startDate={startDate}
              selected={startDate}
              // setStartDate={setStartDate}
              ClassName=""
              onChange={(date) => setStartDate(date)}
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcRadioBtn
              Label="Select Owner"
              Required={true}
              Name="owner"
              RadioBtnData={RadioBtnData}
              ClassName=""
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcCheckBoxBtn
              Label="Select Multi Owner"
              Required={true}
              Name="owner"
              CheckBtnData={RadioBtnData}
              ClassName=""
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcToggle
              onChange={handleToggleChange}
              Label="On/Off"
              Name="owner"
              ClassName=""
            />
            <p className="toggle-status">
              Toggle Status: {isToggled ? "On" : "Off"}
            </p>
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcProgressRangeInput
              className="arc-sample"
              value={progressStatus}
              setValue={setprogressStatus}
              ShowLabel={true}
              onChange={handleRangeChange}
              step={1}
              name={"Progress Input"}
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <TimeInput
              Label="Hours Input"
              hours={hours}
              setHours={setHours}
              minutes={minutes}
              setMinutes={setMinutes}
              onBlurHour={onBlurHour}
              onBlurMinutes={onBlurMinutes}
              spendhours={DefaultHour}
              TotalMinutes={TotalMinutes}
              setTotalMinutes={setTotalMinutes}
              onMouseLeaveMinutes={onBlurMinutes}
              onMouseLeaveHour={onBlurHour}
            />
            {/* <p>{TotalMinutes}</p> */}
            {/* <p>{hours}</p> */}
            {/* <p>{minutes}</p> */}
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcAutocomplete
              Label="Auto Complete"
              Required={true}
              PlaceHolder={"Search"}
              fetchURL="https://poc-json-server.vercel.app/suggestions"
              query={query}
              setQuery={setQuery}
              page={page}
              setPage={setPage}
              Limit={10}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              type="type-1"
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcAutocomplete
              Label="Auto Complete"
              Required={true}
              PlaceHolder={"Search"}
              fetchURL="https://poc-json-server.vercel.app/suggestions"
              query={query}
              setQuery={setQuery}
              page={page}
              setPage={setPage}
              Limit={10}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              type="type-2"
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcTagInput
              Label="ArcTagInput"
              Required={true}
              PlaceHolder={"Search"}
              query={query}
              setQuery={setQuery}
              page={page}
              setPage={setPage}
              Limit={10}
              selectedItems={selectedTagItems}
              setSelectedItems={setselectedTagItems}
              type="type-2"
              isGroup={true}
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcTagInputV2
              Label="ArcTagInput V2"
              Required={true}
              PlaceHolder={"Search"}
              Limit={10}
              type="type-2"
              isGroup={true}
              GetlookupdetailsData={GetlookupdetailsData}
              Fetchlookupdetails={Fetchlookupdetails}
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcTagInputV3
              Label="ArcTagInput V3"
              Required={true}
              PlaceHolder={"Search"}
              Limit={10}
              type="type-2"
              isGroup={true}
              GetlookupdetailsData={GetUpdatelookupdetailsData}
              Fetchlookupdetails={FetchUpdatelookupdetails}
              selectedItems={selectedItemstag}
              setSelectedItems={setSelectedItemstag}
              mastervalues={mastervalues}
              setMastervalues={setMastervalues}
              groupedMastervalues={groupedMastervalues}
              setGroupedMastervalues={setGroupedMastervalues}
              transactionId="01DF8C21-014F-44CA-8BD1-F69B8A916836"
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcCustomTag
              selectedItem={UpdateselectedTagItem}
              setSelectedItem={setUpdateselectedTagItem}
              fetchUpdateLookupDetails={fetchUpdateLookupDetailsData}
              getUpdateLookupDetailsData={getUpdatetagData}
              transactionId="6c4b1bc6-c788-4b8c-93cb-a9cce20318b1"
              Name={"Update Tag"}
            />
          </Col>

          <Col xxl={12} xl={12} lg={12} md={12}>
            <h3 className="custom-component-title">Lookup Input Multiselect</h3>
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcAddLookupDetails
              Label="Add Lookup Multiselect"
              ClassName=""
              PlaceHolder="Search"
              Name="addlookup"
              Required={true}
              ReadOnly={false}
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcUpdateLookupDetails
              Label="Update Lookup Multiselect"
              ClassName=""
              PlaceHolder="Search"
              Name="updatelookup"
              Required={true}
              ReadOnly={false}
            />
          </Col>

          <Col xxl={12} xl={12} lg={12} md={12}>
            <h3 className="custom-component-title">
              Lookup Input Single Select
            </h3>
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcAddLookupSingleSelect
              Label="Add Lookup Single Select"
              ClassName=""
              PlaceHolder="Search"
              Name="addlookup"
              Required={true}
              ReadOnly={false}
              lookupId="5CDC0F7A-0670-45A8-B87E-3B131390931C"
              selectedItem={addlookupselectedItem}
              setSelectedItem={setaddlookupselectedItem}
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcUpdateLookupSingleSelect
              Label="Update Lookup Single Select"
              ClassName=""
              PlaceHolder="Search"
              Name="updatelookup"
              Required={true}
              ReadOnly={false}
              lookupId="5CDC0F7A-0670-45A8-B87E-3B131390931C"
              selectedItem={udatelookupselectedItem}
              setSelectedItem={setudatelookupselectedItem}
              selectedValue="F48EF545-9995-4F8F-857D-DDDA2BC063CC"
            />
          </Col>
          {/* <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcUpdateLookupSingleSelect
              Label="Update Lookup Single Select"
              ClassName=""
              PlaceHolder="Search"
              Name="updatelookup"
              Required={true}
              ReadOnly={false}
              lookupId="5CDC0F7A-0670-45A8-B87E-3B1313909311"
              // selectedItem={addlookupselectedItem}
              // setSelectedItem={setaddlookupselectedItem}
            />
          </Col> */}
          <Col
            xxl={12}
            xl={12}
            lg={12}
            md={12}
            className="d-flex  align-items-end"
          >
            <ArcFilterAutoComplete
              PlaceHolder="Search"
              Name={filter.name}
              datasetId={"58606aed-f992-4c50-9dd4-9d646bf3fdf9"}
              lookupId={filter.masterid}
              filterType={filter.filtercategory}
              filter={filter}
            />
          </Col>
          {/* <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcAddCustomTag
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              Name={"Add Tag"}
            />
            <pre>{JSON.stringify(selectedFilterItem, null, 2)}</pre>
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <ArcTagFilter
              selectedItem={selectedFilterItem}
              setSelectedItem={setselectedFilterItem}
              lookupId={lookupId}
              datasetId={datasetId}
              filterId={filterId}
              Name={"Tag Filter"}
              ListDefault={false}
              handleCheckboxChange={handleCheckboxTagfilter}
            />
          </Col> */}
        </Row>
        <Row>
          <Col xxl={2} xl={3} lg={3} md={3}>
            <h3 className="custom-component-title">Popover</h3>
            {/* <ArcPopover
              showPopover={showPopover}
              setShowPopover={setShowPopover}
              Title="Popover"
              ClassName=""
              BtnName="Popover Default"
            >
   
              <ArcTextBox
                Label=""
                ClassName=""
                Type="text"
                PlaceHolder="Enter Your First Name"
                Name="firstname"
                Required={true}
                ReadOnly={false}
              />

            </ArcPopover> */}
            <ArcPopover
              showPopover={showPopover}
              setShowPopover={setShowPopover}
              Title="Popover"
              ClassName=""
              BtnName="Popover Default"
              HandleApply={HandleApply}
            >
              {/* Children section start */}
              <ArcCustomMultiSelect1
                options={options}
                PlaceHolder="Select Multiple Options"
                // Label="Multi Select With Checkbox"
                ClassName="relative-select"
                optionSelected={optionSelected}
                setOptionSelected={setOptionSelected}
              />
              {/* Children section End */}
            </ArcPopover>
          </Col>
        </Row>

        <Row>
          {/* <Col xxl={4} xl={4} lg={4} md={4}>
            <h3 className="custom-component-title">Tree View Input 1</h3>
            <ArcOffCanva
              Title="Arc OffCanva Left"
              ArcOffCanvaShow={ArcTreeviewShow}
              setArcOffCanvaShow={setArcTreeviewShow}
              BtnClassName="arc-btn-primary"
              CanvaClassName="arctree-cannva"
              Place="end"
              BtnText={"Tree View"}
            >
              <ArcTreeView />
            </ArcOffCanva>
          </Col> */}
          <Col xxl={4} xl={4} lg={4} md={4}>
            <h3 className="custom-component-title">Tree View Input 2</h3>
            <ArcOffCanva
              Title="Arc OffCanva Left"
              ArcOffCanvaShow={ArcTreeviewShow}
              setArcOffCanvaShow={setArcTreeviewShow}
              BtnClassName="arc-btn-primary"
              CanvaClassName="arctree-cannva"
              Place="end"
              BtnText={"Tree View"}
            >
              <ArcTreeViewV2
                checkboxState={SelectedTreeValues}
                setCheckboxState={setSelectedTreeValues}
              />
            </ArcOffCanva>
          </Col>
        </Row>

        <Row>
          <Col xxl={12} xl={12} lg={12} md={12}>
            <h3 className="custom-component-title">Toastify</h3>

            <div className="toastify-compoenents compoenents-box">
              <div className="group-buttons">
                <ArcButtonWithIconType3
                  ClassName=""
                  OnClick={() =>
                    ArcSuccess({
                      Message: "Content Was Updated",
                      position: "top-right",
                    })
                  }
                  BtnText="Success"
                  Icon={
                    <>
                      <FaRegBell />
                    </>
                  }
                />
                <ArcButtonWithIconType2
                  ClassName=""
                  OnClick={() =>
                    ArcError({
                      Message: "Content Not Updated",
                      position: "top-left",
                    })
                  }
                  BtnText="Error"
                  Icon={
                    <>
                      <FaRegBell />
                    </>
                  }
                />
                <ArcButtonWithIconType1
                  ClassName=""
                  OnClick={() =>
                    ArcSuccess({
                      Message: "Content Was Updated",
                      position: "top-center",
                    })
                  }
                  BtnText="Top Center"
                />
                <ArcButtonWithIconType3
                  ClassName=""
                  OnClick={() =>
                    ArcSuccess({
                      Message: "Content Was Updated",
                      position: "bottom-center",
                    })
                  }
                  BtnText=" Bottom Center"
                />
                <ArcButtonPrimary
                  OnClick={() =>
                    ArcSuccess({
                      Message: "Content Was Updated",
                      position: "bottom-left",
                    })
                  }
                  ClassName=""
                  BtnText="Bottom left"
                  //  OnClick={}
                />
                <ArcButtonPrimary
                  OnClick={() =>
                    ArcSuccess({
                      Message: "Content Was Updated",
                      position: "bottom-right",
                    })
                  }
                  ClassName=""
                  BtnText="Bottom Right"
                  //  OnClick={}
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <h3 className="custom-component-title">Popup</h3>
            <ArcPopup
              Title="Arc Popup"
              ArcPopupshow={ArcPopupshow}
              setArcPopupshow={setArcPopupshow}
              BtnClassName="arc-btn-primary"
              PopupClassName=""
              centered={false}
            >
              <TimeInput
                hours={hours}
                setHours={setHours}
                minutes={minutes}
                setMinutes={setMinutes}
                onBlurHour={onBlurHour}
                onBlurMinutes={onBlurMinutes}
                spendhours={DefaultHour}
                TotalMinutes={TotalMinutes}
                setTotalMinutes={setTotalMinutes}
                onMouseLeaveMinutes={onBlurMinutes}
                onMouseLeaveHour={onBlurHour}
              />
              {/* <p>{TotalMinutes}</p> */}
            </ArcPopup>
          </Col>
        </Row>
        <Row>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <h3 className="custom-component-title">OffCanva Left</h3>
            <ArcOffCanva
              Title="Arc OffCanva Left"
              ArcOffCanvaShow={ArcOffCanvaShow}
              setArcOffCanvaShow={setArcOffCanvaShow}
              BtnClassName="arc-btn-primary"
              CanvaClassName=""
              Place="end"
              BtnText={"Arc OffCanva Left"}
            >
              <ArcTreeView />
            </ArcOffCanva>
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <h3 className="custom-component-title">OffCanva Left</h3>
            <ArcOffCanva
              Title="Arc OffCanva Left"
              ArcOffCanvaShow={ArcOffCanvaShow}
              setArcOffCanvaShow={setArcOffCanvaShow}
              BtnClassName="arc-btn-primary"
              CanvaClassName=""
              Place="start"
              BtnText={"Arc OffCanva Left"}
            >
              <ArcTextBox
                Label="First Name"
                ClassName=""
                Type="text"
                PlaceHolder="Enter Your First Name"
                Name="firstname"
                Required={true}
                ReadOnly={false}
              />
            </ArcOffCanva>
          </Col>

          <Col xxl={4} xl={4} lg={4} md={4}>
            <h3 className="custom-component-title">OffCanva Right</h3>
            <ArcOffCanva
              Title="Arc OffCanva Right"
              ArcOffCanvaShow={ArcOffCanvaShowRight}
              setArcOffCanvaShow={setArcOffCanvaShowRight}
              BtnClassName="arc-btn-primary"
              CanvaClassName=""
              Place="end"
              BtnText={"Arc OffCanva Right"}
            >
              <ArcTextBox
                Label="First Name"
                ClassName=""
                Type="text"
                PlaceHolder="Enter Your First Name"
                Name="firstname"
                Required={true}
                ReadOnly={false}
              />
            </ArcOffCanva>
          </Col>
        </Row>

        <Row>
          <Col xxl={2} xl={3} lg={3} md={3}>
            <h3 className="custom-component-title">Button Primary</h3>
            <ArcButtonPrimary
              ClassName=""
              BtnText="Button Primary"
              //  OnClick={}
            />
          </Col>
          <Col xxl={2} xl={3} lg={3} md={3}>
            <h3 className="custom-component-title">Buttons Secondary</h3>
            <ArcButtonSecondary ClassName="" BtnText="Button Secondary" />
          </Col>
          <Col xxl={2} xl={3} lg={3} md={3}>
            <h3 className="custom-component-title">Button With Icon</h3>
            <ArcButtonWithIcon
              ClassName=""
              BtnText="Button With Icon"
              Icon={
                <>
                  <HiOutlineUserCircle />
                </>
              }
            />
          </Col>
          <Col xxl={2} xl={3} lg={3} md={3}>
            <h3 className="custom-component-title">
              Button With Border Radius
            </h3>
            <ArcButtonWithIconType1
              ClassName=""
              BtnText="Button Radius"
              Icon={
                <>
                  <HiOutlineUserCircle />
                </>
              }
            />
          </Col>
          <Col xxl={2} xl={3} lg={3} md={3}>
            <h3 className="custom-component-title">Buttons Type 2</h3>
            <ArcButtonWithIconType2
              ClassName=""
              BtnText="Button Type 2"
              Icon={
                <>
                  <HiOutlineUserCircle />
                </>
              }
            />
          </Col>
          <Col xxl={2} xl={3} lg={3} md={3}>
            <h3 className="custom-component-title">Buttons Type 3</h3>
            <ArcButtonWithIconType3
              ClassName=""
              BtnText="Button Type 3"
              Icon={
                <>
                  <HiOutlineUserCircle />
                </>
              }
            />
          </Col>
        </Row>

        {/* Updated En */}

        <Row>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <h3 className="custom-component-title">
              Dropdown Default with Link
            </h3>
            <ArcDropDownDefault
              Title="More Action"
              DropdownItems={DropdownItemsWithURL}
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <h3 className="custom-component-title">ArcDropDown Controled</h3>
            <ArcDropDownControled
              ArcDropDownControledData={ArcDropDownControledData}
              SelectedValue={SelectedValue}
              setSelectedValue={setSelectedValue}
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <h3 className="custom-component-title">With Search & Icon</h3>
            <ArcDropDownControledSearchIcon
              ArcDropDownControledData={ArcDropDownControledData}
              SelectedValue={SelectedValueState2}
              setSelectedValue={setSelectedValueState2}
            />
          </Col>
        </Row>

        <Row>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <h3 className="custom-component-title">Tab</h3>
            <ArcTabType1 />
          </Col>
        </Row>
        <Row>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <h3 className="custom-component-title">Accordion</h3>
            <ArcAccordion />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <h3 className="custom-component-title">Accordion Dynamic Header</h3>
            <ArcAccordionType2 />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <h3 className="custom-component-title">Accordion Always open</h3>
            <ArcAccordionType3 />
          </Col>
        </Row>
        {/* <Row>
          <Col xxl={4} xl={4} lg={4} md={4}>
            <h3 className="custom-component-title">Form Validation</h3>
            <RegistrationForm />
          </Col>
        </Row> */}
        <Row className="arc-tooltip-row">
          <Col xxl={12} xl={12} lg={12} md={12}>
            <h3 className="custom-component-title">Arc Tooltip</h3>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12}>
            <div className="arc-tooltip-row">
              <ArcToolTip HoverText="auto" BtnName="auto" Placement="auto" />
              <ArcToolTip HoverText="top" BtnName="top" Placement="top" />

              <ArcToolTip HoverText="right" BtnName="right" Placement="right" />

              <ArcToolTip
                HoverText="bottom"
                BtnName="bottom"
                Placement="bottom"
              />
              <ArcToolTip HoverText="left" BtnName="left" Placement="left" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default UIComponents;

const ArcTabType1 = () => {
  const [key, setKey] = useState("overview");
  return (
    <>
      <div className="arc-tab-content">
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="">
          <Tab eventKey="overview" title={<>Overview</>}>
            <>
              <div className="tab-main-content">
                <p>Tab 1</p>
              </div>
            </>
          </Tab>
          <Tab eventKey="notes" title={<>Notes</>}>
            <>
              <div className="tab-main-content">
                <p>Tab 2</p>
              </div>
            </>
          </Tab>
          <Tab eventKey="activities" title={<>Activities</>}>
            <>
              <div className="tab-main-content">
                <p>Tab 3</p>
              </div>
            </>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export const ArcAccordion = () => {
  const [activeKey, setActiveKey] = useState(0);
  const handleToggle = (eventKey) => {
    setActiveKey(eventKey === activeKey ? null : eventKey);
  };
  return (
    <>
      <div className="arc-accordion">
        <Accordion
          defaultActiveKey={activeKey}
          activeKey={activeKey}
          onSelect={handleToggle}
        >
          {[...Array(3)].map((count, index) => (
            <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header className={activeKey === index && "active"}>
                <span>
                  {activeKey === index ? (
                    <>
                      <BiMinus />
                    </>
                  ) : (
                    <>
                      <BiPlus />
                    </>
                  )}
                </span>
                Accordion {index + 1}
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat, esse dolor. Cumque numquam atque dolores quo dolore
                  eius ab incidunt hic voluptatem nobis. Voluptatum, rem cumque
                  illo maxime laborum mollitia!
                </p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export const ArcAccordionType2 = () => {
  const [activeKey, setActiveKey] = useState(0);
  const handleToggle = (eventKey) => {
    setActiveKey(eventKey === activeKey ? null : eventKey);
  };
  return (
    <>
      <div className="arc-accordion">
        <Accordion
          defaultActiveKey={activeKey}
          activeKey={activeKey}
          onSelect={handleToggle}
        >
          {[...Array(3)].map((count, index) => (
            <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header className={activeKey === index && "active"}>
                {activeKey === index ? (
                  <>
                    <span>
                      <BiMinus />
                    </span>
                    Hide
                  </>
                ) : (
                  <>
                    <span>
                      <BiPlus />
                    </span>
                    Show
                  </>
                )}
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat, esse dolor. Cumque numquam atque dolores quo dolore
                  eius ab incidunt hic voluptatem nobis. Voluptatum, rem cumque
                  illo maxime laborum mollitia!
                </p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export const ArcAccordionType3 = () => {
  return (
    <>
      <div className="arc-accordion-always-open">
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Accordion Item 01
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
            </Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              Accordion Item 02
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
            </Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              Accordion Item 03
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
            </Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};
