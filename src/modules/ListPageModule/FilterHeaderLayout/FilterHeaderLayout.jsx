import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PROTO_ENABLED } from "@/config/serverApiConfig";
import ProtoApi from "@/request/API/protoApi";
import PlatformApi from "@/request/API/PlatformApi";

import { dataSetIDInfo } from "@/redux/listpage/selector";

import FilterHeader from "./FilterHeader";

const FilterHeaderLayout = ({ Tableloading, setTableLoading }) => {
  const dataSetID = useSelector(dataSetIDInfo);
  console.log(dataSetID);
  const [loading, setLoading] = useState(false);
  console.log(PROTO_ENABLED);

  return (
    <div>
      {PROTO_ENABLED ? <ProtoApi /> : <PlatformApi />}
      <FilterHeader
        Tableloading={Tableloading}
        setTableLoading={setTableLoading}
      />
    </div>
  );
};

export default FilterHeaderLayout;
