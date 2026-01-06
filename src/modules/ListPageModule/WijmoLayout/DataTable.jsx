import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import WijmoFlexgrid from "@/components/Wijmo/WijmoFlexgrid";
import WijmoPagination from "@/components/Wijmo/WijmoPagination";
import { PROTO_ENABLED } from "@/config/serverApiConfig";
import ArcDataNotFound from "@/components/arccomponents/ui-components/nodatafound/no-data-found";
import {
  masterDataInfo,
  listInfo,
  listDataInfo,
  dataForColumnInfo,
  totalColumnsInfo,
} from "@/redux/listpage/selector";
import { setPagination } from "@/redux/listpage/actions";

const DataTable = ({ loading }) => {
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
  console.log(paginationConfig);

  const sortedColumn = totalColumns?.filter((column) => column.ismapped);
  const tableData = data?.map((item) => {
    return Object.keys(item).reduce((acc, key) => {
      acc[key.toLowerCase()] = item[key];
      return acc;
    }, {});
  });
  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;
  console.log(firstPageIndex);
  console.log(lastPageIndex);

  useEffect(() => {
    dispatch(setPagination(firstPageIndex, pageSize));
  }, [firstPageIndex, pageSize]);

  console.log(tableData);
  let dataSource;
  if (PROTO_ENABLED) {
    dataSource = tableData?.slice(firstPageIndex, lastPageIndex);
  } else {
    dataSource = (tableData && tableData) || [];
  }
  // console.log(dataSource);

  return (
    <div>
      <WijmoFlexgrid
        loading={loading}
        tableData={dataSource}
        sortedColumns={sortedColumn}
      />

      <WijmoPagination
        loading={loading}
        paginationConfig={paginationConfig}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
      {dataSource?.length === 0 && !loading ? <ArcDataNotFound /> : null}
    </div>
  );
};

export default DataTable;
