import React, { useState, useEffect } from "react";
import FilterHeader from "./FilterHeader";

const FilterHeaderLayout = ({ Tableloading, setTableLoading }) => {
  return (
    <>
      <FilterHeader
        Tableloading={Tableloading}
        setTableLoading={setTableLoading}
      />
    </>
  );
};

export default FilterHeaderLayout;
