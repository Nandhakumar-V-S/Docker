// *******~ Import ~******** //
//? React
import { useState, useContext, useEffect, useMemo } from "react";
//? Assets
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { request } from "@/request";
import useFetch from "@/hooks/useFetch";
import { useDispatch } from "react-redux";
import useLanguage from "@/locale/useLanguage";
import { useNavigate } from "react-router-dom";
import { DOWNLOAD_BASE_URL } from "@/config/serverApiConfig";
import "@grapecity/wijmo.styles/wijmo.css";
import { CollectionView } from "@grapecity/wijmo";
import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate,
} from "@grapecity/wijmo.react.grid";
import { CollectionViewNavigator } from "@grapecity/wijmo.react.input";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons

import { API_BASE_URL } from "@/config/serverApiConfig";
import queryString from "query-string";
//import axios from 'axios';
//import errorHandler from '@/request/errorHandler';
//import successHandler from '@/request/successHandler';

import { FaCircleDot } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoCallSharp } from "react-icons/io5";
import { MdSms } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiCalendar } from "react-icons/ci";
import { MdOutlinePhoneCallback } from "react-icons/md";
import { MdOutlineSendToMobile } from "react-icons/md";
import { LiaClone } from "react-icons/lia";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
// *******~ Import ~******** //

import Pagination from "./Pagination/Pagination";

import { ListContext } from "@/modules/ListPageModule";

import ListPageTableLoading, {
  ListHeaderLoading,
} from "@/modules/loading-skeleton/listpage-table-loading";

export default function WijimoTable({ ...props }) {
  //   const translate = useLanguage();

  const [itemslist, setItemsList] = useState([]);
  const [pageSize, setPageSize] = useState(50);
  const [pageIndex, setpageIndex] = useState(1);
  const [totalLength, settotalLength] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const { LeadStageValues, setLeadStageValues } = useContext(ListContext);

  const [loading, setLoading] = useState(false);

  //const currentTableData = useMemo(() => {
  //    const firstPageIndex = (currentPage - 1) * pageSize;
  //    const lastPageIndex = firstPageIndex + pageSize;
  //    return itemslist.slice(firstPageIndex, lastPageIndex);
  //}, [currentPage]);

  //useEffect is predefined Hook invokes the  callback after initial rendering
  useEffect(() => {
    setLoading(true);
    removeWijimoLicense();

    loadlistdata();

    return () => {};
  }, [pageSize, currentPage, LeadStageValues]);

  //const currentTableData = useMemo(() => {

  //    fetchData();

  //}, [currentPage]);

  //const result = new CollectionView(lstGridData, {
  //    pageSize: pageSize,
  //});
  //setItemsList(result);

  //API CALL
  function fetchData() {
    //const result = new CollectionView(lstGridData, {
    //    pageSize: pageSize,
    //});
    //setItemsList(result);
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    console.log(firstPageIndex);
    console.log(lastPageIndex);

    const objlead = {
      Start: firstPageIndex,
      Skip: lastPageIndex == 0 ? 99999 : lastPageIndex,
      UserID: 30109,
      OrderBy: "LeadModifiedOn desc",
      clientid: 20001,
      Stage: LeadStageValues.length > 0 ? LeadStageValues.toString() : "",

      //"Stage": "3179,3243",
      Source: "",
      Status: "",
      Type: "",
      Owner: "",
      LeadDeal: "",
      Name: "",
      StartDate: "01/01/2023",
      EndDate: "01/31/2024",
      DateFilterType: "0",
      LeadList: 0,
      CampaignName: "",

    };

    ////const response = await axios.get(API_BASE_URL + `/Tenant/Getleadlist`, objlead,
    ////    {
    ////        headers: {
    ////            'Access-Control-Allow-Origin': 'true',
    ////            'Content-Type': 'application/json',

    ////        },
    ////    });

    //const getCategories = () => {
    //    return fetch(API_BASE_URL + '/Tenant/Getleadlist', {
    //        method: "POST",
    //        headers: {
    //            "Access-Control-Allow-Origin": "*",
    //            "Content-Type": "application/json"
    //        },
    //        body: JSON.stringify(objlead)
    //    })
    //        .then(response => {
    //            return response.json();

    //        }).then((result) => {

    //            if (result !== null) {

    //                const objData = JSON.parse(result.result).result;

    //                console.log(objData);

    //                const wijimojson = {};
    //                wijimojson.data = objData['LeadList'];
    //                wijimojson.recordsTotal = objData['AllCount'][0]["Count"];
    //                wijimojson.recordsFiltered = objData['AllCount'][0]["Count"];

    //                // currentPagerecordCount = json.data.length;
    //                console.log(wijimojson.data);
    //                // const jresult = new CollectionView(wijimojson.data, {
    //                //  pageSize: pageSize,
    //                // });
    //                setItemsList(wijimojson.data);
    //                return wijimojson.data;

    //            }
    //            //console.log(result);
    //        })
    //        .catch(err => console.log(err));

    //};
    //console.log(2);

    //console.log(getCategories);

    //setItemsList(getCategories);

    return fetch(API_BASE_URL + "Tenant/Getleadlist", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objlead),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //Fetch Grid Data
  //fetchData();

  const loadlistdata = () => {
    fetchData().then((data) => {
      setLoading(false);

      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        const objData = JSON.parse(data.result).result;

        console.log(1);
        console.log(objData["LeadList"]);

        const wijimojson = {};

        if (
          objData["LeadList"] != undefined &&
          objData["LeadList"].length > 0
        ) {
          wijimojson.data = objData["LeadList"];
          wijimojson.recordsTotal = objData["AllCount"][0]["Count"];
          wijimojson.recordsFiltered = objData["AllCount"][0]["Count"];
        } else {
          //wijimojson.data = [
          //    { LeadName: 'No Data Available' }];
          wijimojson.data = [];
          wijimojson.recordsTotal = 0;
          wijimojson.recordsFiltered = 0;
        }

        const result = new CollectionView(wijimojson.data, {
          pageSize: pageSize,
          pageChanging: function (s, e) {
            setpageIndex(e.newPageIndex);
          },
        });

        setItemsList(result);
        settotalLength(wijimojson.recordsTotal);
        console.log(wijimojson.recordsTotal);
      }
    });
  };

  function removeWijimoLicense() {
    const removeEvaluationText = () => {
      const bodyElements = document.body.children;
      for (let i = bodyElements.length - 1; i >= 0; i--) {
        const body = bodyElements[i];
        if (
          body.innerText.includes("Wijmo Evaluation") ||
          body.innerText.includes("Wijmo license")
        ) {
          body.remove();
        }
      }
    };
    removeEvaluationText();
  }

  //const PageIndex = 1;
  //const page = PageIndex;
  //const show_per_page = pageSize;
  //const number_of_items = totalLength;
  //const number_of_pages = Math.ceil(number_of_items / show_per_page);
  //const number_of_pages_todisplay = 5;

  return (
    <>
      {loading ? (
        <ListPageTableLoading />
      ) : (
        <FlexGrid
          itemsSource={itemslist}
          headersVisibility="Column"
          alternatingRowStep={0}
          className="list-data-table"
          autoGenerateColumns={false}
          initialized={(s) => s.autoSizeColumns()}
          loadedRows={(s) => s.autoSizeColumns()}
          rowEditEnded={(s) => s.autoSizeColumns()}
          cellEditEnded={(s, e) => s.autoSizeColumn(e.col)}
        >
          <FlexGridColumn
            binding="LeadName"
            header="Lead Name"
            minWidth={350}
            isReadOnly={true}
          >
            <FlexGridCellTemplate
              cellType="Cell"
              template={(ctx) => {
                const fullName = ctx.item.LeadName;
                const words = fullName.split(" ");
                const startWithLetter = words[0] ? words[0].charAt(0) : "";
                const endWithLetter =
                  words.length > 1 ? words[words.length - 1].charAt(0) : "";

                return (
                  <>
                    <div className="name-td">
                      <div className="name-detail">
                        <span>
                          {startWithLetter}
                          {endWithLetter}
                        </span>
                        <p>{fullName.slice(0, 20)}</p>
                      </div>
                      <div className="action">
                        <span>
                          <MdSms />
                        </span>
                        <span>
                          <IoCallSharp />
                        </span>
                        <span>
                          <BiSolidEditAlt />
                        </span>
                        <span>
                          <RiDeleteBin6Line />
                        </span>
                        <DataMenuBtn />
                      </div>
                    </div>
                  </>
                );
              }}
            />
          </FlexGridColumn>
          {/* <FlexGridColumn
            minWidth={100}
            width={"*"}
            binding="LeadStageName"
            header="Lead Stage Name"
          />
          <FlexGridColumn
            minWidth={100}
            width={"*"}
            binding="AccountName"
            header="Account Name"
          />
          <FlexGridColumn
            minWidth={100}
            width={"*"}
            binding="SourceName"
            header="Lead Source"
          />
          <FlexGridColumn
            minWidth={100}
            width={"*"}
            binding="AssignedToName"
            header="Lead Owner"
          />
          <FlexGridColumn
            minWidth={100}
            width={"*"}
            binding="CellNumber"
            header="Office Phone"
          />
          <FlexGridColumn
            binding="Website"
            header="Website"
            minWidth={100}
            width={"*"}
          />
          <FlexGridColumn
            binding="LeadCreatedOn"
            header="Create Date"
            minWidth={100}
            width={"*"}
          /> */}
        </FlexGrid>
      )}

      <div className="wijimo-pagination">
        <DropdownButton
          id="dropdown-item-button"
          title={`Page Size: ${pageSize === 0 ? "No Paging" : pageSize}`}
        >
          <div className="item-div">
            {[0, 10, 20, 30, 50, 100].map((data, index) => (
              <Dropdown.Item
                eventKey={data}
                as="button"
                key={index}
                onClick={() => setPageSize(data)}
              >
                {data === 0 ? "No Paging" : data}
              </Dropdown.Item>
            ))}
          </div>
        </DropdownButton>

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={totalLength}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}

const DataMenuBtn = () => {
  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="auto-end"
        rootClose={true}
        overlay={
          <Popover className="data-menu-option">
            <Popover.Body>
              <div className="option-div">
                {[
                  { Label: "Edit all fields", Icon: <BiSolidEditAlt /> },
                  { Label: "Add meeting", Icon: <CiCalendar /> },
                  { Label: "Add call log", Icon: <MdOutlinePhoneCallback /> },
                  {
                    Label: "Send SMS to mobile",
                    Icon: <MdOutlineSendToMobile />,
                  },
                  {
                    Label: "Send SMS to work",
                    Icon: <MdOutlineSendToMobile />,
                  },
                  { Label: "Clone", Icon: <LiaClone /> },
                  { Label: "Delete", Icon: <RiDeleteBin6Line /> },
                  { Label: "Unsubscribe", Icon: <MdOutlineUnsubscribe /> },
                  { Label: "Forget", Icon: <RiDeleteBin2Line /> },
                ].map((data, index) => (
                  <>
                    <button key={index}>
                      {data.Icon} {data.Label}
                    </button>
                  </>
                ))}
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <span>
          <HiOutlineDotsVertical />
        </span>
      </OverlayTrigger>
    </>
  );
};
const lstGridData = [
  {
    Name: "John Wick",
    Email: "john@gmail.com",
    Work: "Sales Manager",
    Company: "John Industries",
    Status: "Active",
    Owner: "John David",
  },
  {
    Name: "Redin Kinsley",
    Email: "Redin@gmail.com",
    Work: "HR Manager",
    Company: "Fabric Industries",
    Status: "Inactive",
    Owner: "Germy",
  },
  {
    Name: "Mathew Thomas",
    Email: "mathew@gmail.com",
    Work: "HR Manager",
    Company: "David Industries",
    Status: "Active",
    Owner: "David",
  },
  {
    Name: "James Wan",
    Email: "james@gmail.com",
    Work: "Product Manager",
    Company: "Jhony Industries",
    Status: "Inactive",
    Owner: "David",
  },
  {
    Name: "Christopher Johnson",
    Email: "jhonson@gmail.com",
    Work: "HR Manager",
    Company: "Fabric Industries",
    Status: "Active",
    Owner: "Germy",
  },
  {
    Name: "Jhon Mckensay",
    Email: "jhon@gmail.com",
    Work: "Technical Manager",
    Company: "David Industries",
    Status: "Inactive",
    Owner: "David",
  },
  {
    Name: "Redin Kinsley",
    Email: "kinsley@gmail.com",
    Work: "Sales Manager",
    Company: "John Industries",
    Status: "Active",
    Owner: "John David",
  },
  {
    Name: "Mathew Thomas",
    Email: "mathew29@gmail.com",
    Work: "HR Manager",
    Company: "Fabric Industries",
    Status: "Active",
    Owner: "Germy",
  },
  {
    Name: "James wan",
    Email: "james@gmail.com",
    Work: "Sales Manager",
    Company: "David Industries",
    Status: "Inactive",
    Owner: "David",
  },
  {
    Name: "Christopher Jhonson",
    Email: "christ@gmail.com",
    Work: "Technical Manager",
    Company: "Jhony Industries",
    Status: "Active",
    Owner: "David",
  },
  {
    Name: "John Wick",
    Email: "john@gmail.com",
    Work: "Sales Manager",
    Company: "John Industries",
    Status: "Active",
    Owner: "John David",
  },
  {
    Name: "Redin Kinsley",
    Email: "Redin@gmail.com",
    Work: "Marketing Manager",
    Company: "Fabric Industries",
    Status: "Active",
    Owner: "Germy",
  },
  {
    Name: "Mathew Thomas",
    Email: "mathew@gmail.com",
    Work: "Product Manager",
    Company: "David Industries",
    Status: "Inactive",
    Owner: "David",
  },
  {
    Name: "James Wan",
    Email: "james@gmail.com",
    Work: "Marketing Manager",
    Company: "Jhony Industries",
    Status: "Active",
    Owner: "David",
  },
  {
    Name: "Christopher Johnson",
    Email: "jhonson@gmail.com",
    Work: "Sales Manager",
    Company: "Fabric Industries",
    Status: "Active",
    Owner: "Germy",
  },
  {
    Name: "Jhon Mckensay",
    Email: "jhon@gmail.com",
    Work: "Product Manager",
    Company: "David Industries",
    Status: "Inactive",
    Owner: "David",
  },
  {
    Name: "Redin Kinsley",
    Email: "kinsley@gmail.com",
    Work: "Marketing Manager",
    Company: "John Industries",
    Status: "Active",
    Owner: "John David",
  },
  {
    Name: "Mathew Thomas",
    Email: "mathew29@gmail.com",
    Work: "Technical Manager",
    Company: "Fabric Industries",
    Status: "Active",
    Owner: "Germy",
  },
  {
    Name: "James wan",
    Email: "james@gmail.com",
    Work: "Sales Manager",
    Company: "David Industries",
    Status: "Active",
    Owner: "David",
  },
  {
    Name: "Christopher Jhonson",
    Email: "christ@gmail.com",
    Work: "HR Manager",
    Company: "Jhony Industries",
    Status: "Active",
    Owner: "David",
  },
];

//<CollectionViewNavigator
//                  className="list-data-table-pagination"
//                  headerFormat="Page {currentPage:n0} of {pageCount:n0}"
//                  byPage={true}
//                  cv={itemslist}
//                  initialized="initPager"
//              />

//              <Pagination
//                  className="pagination-bar"
//                  currentPage={currentPage1}
//                  totalCount={totalLength}
//                  pageSize={PageSize}
//                  onPageChange={page => setCurrentPage1(page)}
//              />
