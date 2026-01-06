import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import WijmoFlexgrid from "@/components/PlanComp/Wijmo/WijmoFlexgrid";
import WijmoPagination from "@/components/PlanComp/Wijmo/WijmoPagination";
import { PROTO_ENABLED } from "@/config/serverApiConfig";
import ArcDataNotFound from "@/components/arccomponents/ui-components/nodatafound/no-data-found";
import {
  masterDataInfo,
  listInfo,
  listDataInfo,
  dataForColumnInfo,
  totalColumnsInfo,
  currentPageInfo,
} from "@/redux/Plan/selector";
import { setPagination, setPagesize } from "@/redux/Plan/actions";
import WijmoGrid from "@/components/PlanComp/Wijmo/newWijmo";
// import { totalColumns } from "@/components/PlanComp/Wijmo/sortedColumns";
// import { Data } from "@/components/PlanComp/Wijmo/tableData";

const DataTable = ({ loading }) => {
  const dispatch = useDispatch();
  const masterData = useSelector(masterDataInfo);
  const list = useSelector(listInfo);
  const listData = useSelector(listDataInfo);
  const totalColumns = useSelector(totalColumnsInfo);
  const currentPage = useSelector(currentPageInfo);

  const { data, totalRecords } = listData || {};
  // const totalRecords = 37;

  const [pageSize, setPageSize] = useState(20);
  // const [currentPage, setCurrentPage] = useState(1);

  const paginationConfig = {
    pageSize,
    currentPage,
    totalLength: totalRecords || 0,
  };
  console.log(pageSize);
  console.log(currentPage);
  // console.log(data);
  console.log(totalColumns);

  const sortedColumn = totalColumns
    ?.filter((column) => column.ismapped)
    .sort((a, b) => a.seqno - b.seqno);
  const relevantColumns = ["D1", "D2", "D3", "D4", "D5", "D6", "D7"];
  //console.log(data);
  // const tableData = data?.map((item) => {
  //   return Object.keys(item).reduce((acc, key) => {
  //     acc[key.toLowerCase()] = item[key];
  //     return acc;
  //   }, {});
  // });
  const tableData = data?.map((item) => {
    return Object.keys(item).reduce((acc, key) => {
      const lowerCaseKey = key.toLowerCase();
      console.log(lowerCaseKey);
      if (relevantColumns.includes(key)) {
        acc[lowerCaseKey] = item[key] === "0" ? false : true;
      } else {
        acc[lowerCaseKey] = item[key];
      }
      if (
        lowerCaseKey === "utbl_workitem_column30" &&
        item[key] !== "" &&
        item[key] !== null
      ) {
        acc[lowerCaseKey] = formatDate(item[key]);
        console.log((acc[lowerCaseKey] = formatDate(item[key])));
      }
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
      {/* <WijmoFlexgrid
        loading={loading}
        tableData={dataSource}
        sortedColumns={sortedColumn}
      /> */}
      <WijmoGrid
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

function formatDate(dateString) {
  const dateParts = dateString.split(" ")[0].split("/");
  const month = dateParts[0].padStart(2, "0");
  const day = dateParts[1].padStart(2, "0");
  const year = dateParts[2];
  return `${month}/${day}/${year}`;
}
