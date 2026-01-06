import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadingInfo } from "@/redux/Exporthistory/selector";

import DataTable from "./DataTable";

const WijmoLayout = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingInfo);

  return (
    <>
      <DataTable loading={loading} />
    </>
  );
};

export default WijmoLayout;
