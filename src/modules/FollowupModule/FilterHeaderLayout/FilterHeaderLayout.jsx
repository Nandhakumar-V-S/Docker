import React, { useState, useEffect } from "react";

import FilterHeader from "./FilterHeader";

const FilterHeaderLayout = ({ Tableloading, setTableLoading }) => {
  return (
    <>
      {/* {PROTO_ENABLED ? <ProtoApi /> : <FollowupApi />} */}
      <FilterHeader
        Tableloading={Tableloading}
        setTableLoading={setTableLoading}
      />
    </>
  );
};

export default FilterHeaderLayout;
