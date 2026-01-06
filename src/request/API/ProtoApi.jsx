import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jsonrequest } from "@/request/API/protoRequest";
import {
  getMasterDataSuccess,
  getlistfieldsSuccess,
  getListdataSuccess,
  getDatasetSuccess,
} from "@/redux/listpage/actions";

const ProtoApi = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getMasterDataResponse = await jsonrequest.getMasterdata();
        dispatch(getMasterDataSuccess(getMasterDataResponse));

        const getlistfieldsResponse = await jsonrequest.getlistfields();
        dispatch(getlistfieldsSuccess(getlistfieldsResponse));

        const getListdataResponse = await jsonrequest.getListdata();
        dispatch(getListdataSuccess(getListdataResponse));

        const getDatasetResponse = await jsonrequest.getDataset();
        dispatch(getDatasetSuccess(getDatasetResponse));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return null; // or any JSX you want to render
};

export default ProtoApi;
