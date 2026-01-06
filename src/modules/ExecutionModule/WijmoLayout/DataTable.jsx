import { useState, useEffect, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import WijmoFlexgrid from "@/components/ExecutionComp/Wijmo/WijmoFlexgrid";
import WijmoPagination from "@/components/ExecutionComp/Wijmo/WijmoPagination";
import { PROTO_ENABLED } from "@/config/serverApiConfig";
import { ArcButtonWithIconType4 } from "@/components/arccomponents/ui-components/ArcButtons/ArcButtons";
// import ArcDataNotFound from "@/components/arccomponents/ui-components/nodatafound/no-data-found";
import {
  masterDataInfo,
  listInfo,
  listDataInfo,
  dataForColumnInfo,
  totalColumnsInfo,
  currentPageInfo,
} from "@/redux/Execution/selector";
import { setPagination, setPagesize } from "@/redux/Execution/actions";
import { Player } from "@lottiefiles/react-lottie-player";
import DataNotFoundJson from "@/style/images/not-found.json";
import AddTask from "@/components/arccomponents/DynamicInputs/AddTask/addtask";
import { IoMdAdd } from "react-icons/io";
import { TbFilterSearch } from "react-icons/tb";
import { fetchAddTaskFormFields } from "@/redux/AddTask/AddTaskFormFields";
import { CustomFilters } from "@/components/ExecutionComp/Filters/CustomFilters";
import { ListContext } from "../index";
const DataTable = ({ loading }) => {
  const dispatch = useDispatch();
  const masterData = useSelector(masterDataInfo);
  const list = useSelector(listInfo);
  const listData = useSelector(listDataInfo);
  const totalColumns = useSelector(totalColumnsInfo);
  const currentPage = useSelector(currentPageInfo);

  const { data, totalRecords } = listData || {};

  const [pageSize, setPageSize] = useState(20);
  // const [currentPage, setCurrentPage] = useState(1);

  const paginationConfig = {
    pageSize,
    currentPage,
    totalLength: totalRecords || 0,
  };
  console.log(pageSize);
  console.log(currentPage);
  console.log(data);
  console.log(totalColumns);

  const sortedColumn = totalColumns
    ?.filter((column) => column.ismapped)
    .sort((a, b) => a.seqno - b.seqno);
  const tableData = data?.map((item) => {
    return Object.keys(item).reduce((acc, key) => {
      const lowerCaseKey = key.toLowerCase();
      console.log(lowerCaseKey);
      const spendHoursValue = item["utbl_Assignment_column3"] || "-";
      if (lowerCaseKey === "utbl_assignment_column3") {
        acc[lowerCaseKey] = spendHoursValue;
      } else {
        acc[lowerCaseKey] = item[key];
      }
      // acc[key.toLowerCase()] = item[key];
      return acc;
    }, {});
  });
  console.log(tableData);
  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;
  console.log(firstPageIndex);
  console.log(lastPageIndex);

  useEffect(() => {
    dispatch(setPagination(firstPageIndex, pageSize));
  }, [firstPageIndex]);

  useEffect(() => {
    dispatch(setPagesize(pageSize));
  }, [pageSize]);
  useEffect(() => {
    sessionStorage.setItem("360Pagename", "Plan");
  }, []);

  let dataSource;
  if (PROTO_ENABLED) {
    dataSource = tableData?.slice(firstPageIndex, lastPageIndex);
  } else {
    dataSource = (tableData && tableData) || [];
  }
  // console.log(dataSource);
  // console.log(loading);
  return (
    <>
      {/* <p>{loading ? "true" : "false"}</p> */}
      <WijmoFlexgrid
        loading={loading}
        tableData={dataSource}
        sortedColumns={sortedColumn}
      />

      <WijmoPagination
        loading={loading}
        paginationConfig={paginationConfig}
        // onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
      {dataSource?.length === 0 && !loading ? <ArcDataNotFound /> : null}
    </>
  );
};

export default DataTable;

const ArcDataNotFound = () => {
  const { AddTaskShow, setAddTaskShow } = useContext(ListContext);
  const dispatch = useDispatch();
  // const [AddTaskShow, setAddTaskShow] = useState(false);
  const [CustomFilterPopup, setCustomFilterPopup] = useState(false);
  const GetAddForm = () => {
    dispatch(fetchAddTaskFormFields());
  };
  return (
    <>
      <div className="arc-data-not-found">
        <div className="lottie-animation">
          <Player autoplay loop src={DataNotFoundJson}></Player>
        </div>
        <p className="not-found-text">No Matches for the current filters.</p>
        <div className="filter-btn-group">
          <ArcButtonWithIconType4
            OnClick={() => {
              setAddTaskShow(true);
              GetAddForm();
            }}
            ClassName=""
            BtnText="Add Task"
            Icon={
              <>
                <IoMdAdd />
              </>
            }
          />
          <ArcButtonWithIconType4
            OnClick={() => {
              setCustomFilterPopup(true);
            }}
            ClassName=""
            BtnText="Clear Filter"
            Icon={
              <>
                <TbFilterSearch />
              </>
            }
          />
          {/* <AddTask show={AddTaskShow} setShow={setAddTaskShow} /> */}
          <CustomFilters
            ArcOffCanvaShow={CustomFilterPopup}
            setArcOffCanvaShow={setCustomFilterPopup}
          />
        </div>
      </div>
    </>
  );
};
