import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import WijmoFlexgrid from "@/components/TaskComp/Wijmo/WijmoFlexgrid";
import WijmoPagination from "@/components/TaskComp/Wijmo/WijmoPagination";
import { PROTO_ENABLED } from "@/config/serverApiConfig";
import ArcDataNotFound from "@/components/arccomponents/ui-components/nodatafound/no-data-found";
import {
  masterDataInfo,
  listInfo,
  listDataInfo,
  dataForColumnInfo,
  totalColumnsInfo,
} from "@/redux/Task/selector";
import { setPagination, setPagesize } from "@/redux/Task/actions";

const TaskDataTable = ({ loading }) => {
  const dispatch = useDispatch();
  const masterData = useSelector(masterDataInfo);
  const list = useSelector(listInfo);
  const listData = useSelector(listDataInfo);
  const totalColumns = useSelector(totalColumnsInfo);

  const { data, totalRecords } = listData || {};

  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

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
      const spendHoursValue = item["Effort"] || "-";
      if (lowerCaseKey === "column4") {
        acc[lowerCaseKey] = spendHoursValue;
      } else {
        acc[lowerCaseKey] = item[key];
      }
      // acc[key.toLowerCase()] = item[key];
      return acc;
    }, {});
  });
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
      <WijmoFlexgrid
        loading={loading}
        tableData={dataSource}
        sortedColumns={sortedColumn}
      />

      {dataSource?.length === 0 && !loading ? <ArcDataNotFound /> : null}
    </>
  );
};

export default TaskDataTable;
