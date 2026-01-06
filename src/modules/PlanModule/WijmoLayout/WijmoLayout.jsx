import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadingInfo } from "@/redux/Plan/selector";

import DataTable from "./DataTable";

const WijmoLayout = () => {
  const loading = useSelector(loadingInfo);

  return (
    <>
      <DataTable loading={loading} />
    </>
  );
};

export default WijmoLayout;
