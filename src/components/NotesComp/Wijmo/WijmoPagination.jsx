import React, { useEffect, useState, useContext, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { MySkeleton } from "@/modules/loading-skeleton/skeleton";

import { Dropdown, DropdownButton } from "react-bootstrap";

import Pagination from "@/components/TaskComp/Pagination/Pagination";
// ~ Filter
import { FilterListPagination } from "@/components/arccomponents/utility/FilterList";
import {
  selectedFiltersInfo,
  matchedLookupInfo,
  textFilterInfo,
  datePickerFilterInfo,
  weekFilterInfo,
} from "@/redux/Notes/selector";
import { setCurrentPage } from "@/redux/Notes/actions";
// ~ Filter
const WijmoPagination = ({
  loading,
  paginationConfig,
  onPageChange,
  onPageSizeChange,
}) => {
  const dispatch = useDispatch();
  const { totalLength, pageSize, currentPage } = paginationConfig;
  // ~ Filter
  const matchedLookup = useSelector(matchedLookupInfo);
  const selectedFilters = useSelector(selectedFiltersInfo);
  const selectedFiltersLength = selectedFilters.length;
  const textFilter = useSelector(textFilterInfo);
  const datePickerFilter = useSelector(datePickerFilterInfo);
  const weekFilter = useSelector(weekFilterInfo);
  // ~ Filter
  const handlePageSizeChange = (size) => {
    onPageSizeChange(size);
    // onPageChange(1);
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (page) => {
    // onPageChange(page);
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="wijimo-pagination">
      <button className="pagination-text">
        Total Records: <span>{loading ? "----" : totalLength}</span>
        <FilterListPagination
          selectedFiltersLength={selectedFiltersLength}
          matchedLookup={matchedLookup}
          textFilter={textFilter}
          datePickerFilter={datePickerFilter}
          weekFilter={weekFilter}
        />
        {/* Total Records: <span>{totalLength}</span> */}
      </button>

      <DropdownButton
        id="dropdown-item-button"
        className={loading && "loading-time"}
        title={` ${pageSize === 0 ? "No Paging" : pageSize + " per page"} `}
      >
        <div className="item-div">
          {[5, 10, 20, 30, 50, 100].map((data, index) => (
            <Dropdown.Item
              eventKey={data}
              as="button"
              key={index}
              onClick={() => handlePageSizeChange(data)}
            >
              {data === 0 ? "No Paging" : data} per page
            </Dropdown.Item>
          ))}
        </div>
      </DropdownButton>
      {loading ? (
        <>
          <MySkeleton height={20} radius={0} width={50} clsnme="loading-btn" />
          {[...Array(5)].map((data, index) => (
            <React.Fragment key={index}>
              <LoadingBtn />
            </React.Fragment>
          ))}
          <MySkeleton height={20} radius={0} width={50} clsnme="loading-btn" />
        </>
      ) : (
        <>
          {paginationConfig.totalLength ? (
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={totalLength}
              pageSize={pageSize}
              siblingCount={1}
              onPageChange={(page) => handlePageChange(page)}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default WijmoPagination;

const LoadingBtn = () => {
  return <MySkeleton height={20} radius={0} width={20} clsnme="loading-btn" />;
};
