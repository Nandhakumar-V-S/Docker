import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { request } from "@/request/API/globalrequest";
import { API_TEST_URL } from "@/config/serverApiConfig";
import { getListdataSuccess } from "@/redux/listpage/actions";
import {
  dataSetIDInfo,
  postDataInfo,
  entityidInfo,
  listidInfo,
} from "@/redux/listpage/selector";
import DataTable from "./DataTable";

const WijmoLayout = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const entityid = useSelector(entityidInfo);
  const listid = useSelector(listidInfo);
  const dataSetID = useSelector(dataSetIDInfo);
  const postRequest = useSelector(postDataInfo);

  useEffect(() => {
    if (entityid && listid && dataSetID) {
      setLoading(true);
      async function getlistdetails() {
        const response = await request.post(
          API_TEST_URL,
          "arclist/getlistdetails",
          postRequest
        );
        dispatch(getListdataSuccess(response));
        setLoading(false);
      }
      getlistdetails();
    }
  }, [postRequest]);

  return (
    <div>
      <DataTable loading={loading} />
    </div>
  );
};

export default WijmoLayout;
