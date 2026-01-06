import React, { useEffect, useState, useContext, useRef } from "react";

import { useDispatch } from "react-redux";

import { MySkeleton } from "@/modules/loading-skeleton/skeleton";

import { Dropdown, DropdownButton } from "react-bootstrap";

import Pagination from "@/components/ExportHistoryComp/Pagination/Pagination";

const WijmoPagination = ({
  loading,
  paginationConfig,
  onPageChange,
  onPageSizeChange,
}) => {
  const dispatch = useDispatch();
  const { totalLength, pageSize, currentPage } = paginationConfig;

  const handlePageSizeChange = (size) => {
    onPageSizeChange(size);
    onPageChange(1);
  };

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div className="wijimo-pagination">
      <button className="pagination-text">
        Total Records: <span>{loading ? "----" : totalLength}</span>
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
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalLength}
            pageSize={pageSize}
            siblingCount={1}
            onPageChange={(page) => handlePageChange(page)}
          />
        </>
      )}
    </div>
  );
};

export default WijmoPagination;

const LoadingBtn = () => {
  return <MySkeleton height={20} radius={0} width={20} clsnme="loading-btn" />;
};
