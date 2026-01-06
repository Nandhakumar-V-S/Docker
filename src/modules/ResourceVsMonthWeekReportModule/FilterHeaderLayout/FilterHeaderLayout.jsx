import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PROTO_ENABLED } from "@/config/serverApiConfig";
import ProtoApi from "@/request/API/protoApi";
import ReportApi from "@/request/API/ReportApi";

import { dataSetIDInfo } from "@/redux/ResourceVsMonthWeekReport/selector";

import FilterHeader from "./FilterHeader";

const FilterHeaderLayout = ({ Tableloading, setTableLoading }) => {
  const dataSetID = useSelector(dataSetIDInfo);
  console.log(dataSetID);
  const [loading, setLoading] = useState(false);
  console.log(PROTO_ENABLED);

  return (
    <>
      {/* {PROTO_ENABLED ? <ProtoApi /> : <ReportApi />} */}
      <FilterHeader
        Tableloading={Tableloading}
        setTableLoading={setTableLoading}
      />
    </>
  );
};

export default FilterHeaderLayout;
