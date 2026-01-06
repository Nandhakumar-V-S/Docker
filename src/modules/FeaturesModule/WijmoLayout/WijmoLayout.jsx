import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadingInfo,
  postDataInfo,
  entityidInfo,
  listidInfo,
  dataSetIDInfo,
} from "@/redux/Features/selector";

import DataTable from "./DataTable";
import { request } from "@/request/API/globalrequest";
import { getListdataSuccess, setLoading } from "@/redux/Features/actions";
import { API_TEST_URL } from "@/config/serverApiConfig";

const WijmoLayout = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingInfo);
  const postRequest = useSelector(postDataInfo);
  const AddTagStatus = useSelector((state) => state.AddTag.Status);
  const EditTagStatus = useSelector((state) => state.EditTagGroupName.Status);
  const AddTagGroupStatus = useSelector(
    (state) => state.AddTagtoGroupEntity.Status
  );
  const NewGroupStatus = useSelector((state) => state.addGroup.Status);

  useEffect(() => {
    if (EditTagStatus == "successful") {
      async function getlistdetails() {
        const response = await request.post(
          API_TEST_URL,
          "arctag/gettaggrouplist",
          postRequest
        );
        await dispatch(getListdataSuccess(response));
        await dispatch(setLoading(false));
      }
      getlistdetails();
    }
    //   console.log("useEffectcalled---");
  }, [EditTagStatus]);
  useEffect(() => {
    if (AddTagStatus === "successful") {
      async function getlistdetails() {
        const response = await request.post(
          API_TEST_URL,
          "arctag/gettaggrouplist",
          postRequest
        );
        await dispatch(getListdataSuccess(response));
        await dispatch(setLoading(false));
      }
      getlistdetails();
    }
  }, [AddTagStatus]);
  useEffect(() => {
    if (AddTagGroupStatus == "successful") {
      async function getlistdetails() {
        const response = await request.post(
          API_TEST_URL,
          "arctag/gettaggrouplist",
          postRequest
        );
        await dispatch(getListdataSuccess(response));
        await dispatch(setLoading(false));
      }
      getlistdetails();
    }
  }, [AddTagGroupStatus]);
  useEffect(() => {
    if (NewGroupStatus == "successful") {
      async function getlistdetails() {
        const response = await request.post(
          API_TEST_URL,
          "arctag/gettaggrouplist",
          postRequest
        );
        await dispatch(getListdataSuccess(response));
        await dispatch(setLoading(false));
      }
      getlistdetails();
    }
    //   console.log("useEffectcalled---");
  }, [NewGroupStatus]);

  return (
    <>
      <DataTable loading={loading} />
    </>
  );
};

export default WijmoLayout;
