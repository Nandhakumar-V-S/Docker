/* eslint-disable no-inner-declarations */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request } from "@/request/API/globalrequest";
import { API_TEST_URL } from "@/config/serverApiConfig";

import { resetMasterTaskStatus } from "@/redux/Task/AddTask/UpdateMasterTask";
import {
  getMasterDataSuccess,
  getlistfieldsSuccess,
  getDatasetSuccess,
  setLoading,
  getListdataSuccess,
  incrementRenderCount,
  setdataSetID,
  createDataset,
  updateDataset,
} from "@/redux/AdminSetting/actions";
import {
  dataSetIDInfo,
  postDataInfo,
  newDatasetInfo,
  entityidInfo,
  listidInfo,
  newEntityInfo,
  newDatasetIDInfo,
  deleteDatasetIDInfo,
  dataSetListInfo,
  updateDataSetInfo,
  columnSequenceInfo,
  useridInfo,
  renderCountInfo,
  savedDatasetidInfo,
} from "@/redux/AdminSetting/selector";
import {
  ArcSuccess,
  ArcError,
} from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";
import {resetAddStatus} from "@/redux/AdminSetting/AddEntity/addEntityData";
const AdminSettingApi = () => {
  const dispatch = useDispatch();
  const dataSetID = useSelector(dataSetIDInfo);
  const postRequest = useSelector(postDataInfo);
  const newDataset = useSelector(newDatasetInfo);
  const entityid = useSelector(entityidInfo);
  const listid = useSelector(listidInfo);
  const newEntity = useSelector(newEntityInfo);
  const newDatasetID = useSelector(newDatasetIDInfo);
  const deleteDatasetID = useSelector(deleteDatasetIDInfo);
  const dataSetList = useSelector(dataSetListInfo);
  const updateDataSet = useSelector(updateDataSetInfo);
  const columnSequence = useSelector(columnSequenceInfo);
  const userid = useSelector(useridInfo);
  const renderCount = useSelector(renderCountInfo);
  const savedDatasetid = useSelector(savedDatasetidInfo);
  const AddEntityStatus = useSelector((state) => state.addEntityState.Addstatus);
  const EditEntityStatus = useSelector((state) => state.UpdateEntityState.Status);
  const UpdateMasterTaskStateStatus = useSelector(
    (state) => state.UpdateMasterTaskState.Status
  );
  console.log(columnSequence);
  console.log(dataSetList);
  console.log(deleteDatasetID);
  console.log({ newDataset });
  console.log(entityid);
  console.log(listid);

  useEffect(() => {
    console.log(userid)
    if (entityid && listid && userid && renderCount < 1) {
      async function getlookupdetails() {
        const postData = {
          entityId: entityid,
        };
        const response = await request.post(
          API_TEST_URL,
          "arcconfiguration/getlookupdatabyid",
          postData
        );
        dispatch(getMasterDataSuccess(response));
        dispatch(incrementRenderCount());
        if (response) {
          const data = await request.get(
            API_TEST_URL,
            `arclist/getlistconfigbyid?entityid=${entityid}&listid=${listid}&userid=${userid}`
          );
          dispatch(getlistfieldsSuccess(data));
        }
      }
      getlookupdetails();
    }
  }, [dispatch, entityid, listid, userid]);

  // useEffect(() => {
  //   if (entityid && listid && userid) {
  //     async function getlistconfigbyid() {
  //       const data = await request.get(
  //         API_TEST_URL,
  //         `arclist/getlistconfigbyid?entityid=${entityid}&listid=${listid}&userid=${userid}`
  //       );
  //       dispatch(getlistfieldsSuccess(data));
  //       if(data){
  //         const newdata = await request.get(
  //           API_TEST_URL,
  //           `dataset/getdatasetfieldinfobyid?datasetid=${dataSetID}&userid=${userid}`
  //         );
  //         dispatch(getDatasetSuccess(newdata));
  //       }
  //     }

  //     getlistconfigbyid();
  //   }
  // }, [entityid, listid]);

  useEffect(() => {
    if (dataSetID) {
      if (dataSetID === savedDatasetid) {
        console.log("Same dataSetID received, exiting");

        return;
      }
      async function getDataset() {
        const data = await request.get(
          API_TEST_URL,
          `dataset/getdatasetfieldinfobyid?datasetid=${dataSetID}&userid=${userid}`
        );
        dispatch(getDatasetSuccess(data));
        dispatch(setdataSetID(dataSetID));
      }

      getDataset();
    }
  }, [dataSetID]);

  useEffect(() => {
    if (entityid && listid && dataSetID) {
      console.log(AddEntityStatus);
      dispatch(setLoading(true));
      async function getlistdetails() {
        const response = await request.post(
          API_TEST_URL,
          "arclist/getlistdetails",
          postRequest
        );
        dispatch(getListdataSuccess(response));
        dispatch(setLoading(false));
      }
      getlistdetails();
    }
  }, [postRequest]);
  useEffect(() => {
    if (entityid && listid && dataSetID) {
      console.log(AddEntityStatus);
      console.log(UpdateMasterTaskStateStatus);
      if (
        AddEntityStatus === "succeeded" ||
        UpdateMasterTaskStateStatus === "successful" ||
        EditEntityStatus ==="successful"
      ) {
        dispatch(setLoading(true));
        async function getlistdetails() {
          const response = await request.post(
            API_TEST_URL,
            "arclist/getlistdetails",
            postRequest
          );
          dispatch(getListdataSuccess(response));
          dispatch(setLoading(false));
          dispatch(resetAddStatus());
          dispatch(resetMasterTaskStatus());
        }
        getlistdetails();
      }
    }
  }, [AddEntityStatus, UpdateMasterTaskStateStatus,EditEntityStatus]);

  useEffect(() => {
    const createnewDataset = async () => {
      try {
        if (newDataset.datasetname) {
          dispatch(setLoading(true));
          const response = await request.post(
            API_TEST_URL,
            "dataset/createdataset",
            newDataset
          );
          //dispatch(getDataSetSuccess(postDatasetInfoResponse));
          if (response) {
            // Show success message using Toastify
            ArcSuccess({
              Message: "New dataset created",
              position: "top-center",
            });
            console.log(response);

            const data = await request.get(
              API_TEST_URL,
              `arclist/getlistconfigbyid?entityid=${entityid}&listid=${listid}&userid=${userid}`
            );
            dispatch(getlistfieldsSuccess(data));

            dispatch(createDataset({}));
          }
        }
      } catch (error) {
        dispatch(setLoading(false));
        console.error("Error fetching data:", error);
      }
    };

    createnewDataset();
  }, [newDataset]);

  useEffect(() => {
    const updateDatasetInfo = async () => {
      try {
        if (updateDataSet.datasetid) {
          dispatch(setLoading(true));
          const response = await request.post(
            API_TEST_URL,
            "dataset/updatedataset",
            updateDataSet
          );

          if (response) {
            // Show success message using Toastify
            ArcSuccess({
              Message: "Dataset Updated",
              position: "top-center",
            });

            const data = await request.get(
              API_TEST_URL,
              `arclist/getlistconfigbyid?entityid=${entityid}&listid=${listid}&userid=${userid}`
            );
            dispatch(getlistfieldsSuccess(data));
            dispatch(updateDataset({}));
            dispatch(setLoading(false));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    updateDatasetInfo();
  }, [updateDataSet]);

  useEffect(() => {
    if (newEntity) {
      async function updateEntity() {
        const postData = {
          entityid: newEntity,
          createdby: userid,
        };
        const response = await request.post(
          API_TEST_URL,
          "arcconfiguration/updateselectedentity",
          postData
        );
        if (response) {
          // Show success message using Toastify
          ArcSuccess({
            Message: "Entity changed",
            position: "top-center",
          });
          console.log(response);
        }
      }
      updateEntity();
    }
  }, [newEntity]);

  useEffect(() => {
    if (newDatasetID) {
      dispatch(setLoading(true));
      async function updatedSelectedDS() {
        const postData = {
          datasetid: newDatasetID,
          listid: listid,
          createdby: userid,
        };
        const response = await request.post(
          API_TEST_URL,
          "dataset/updateselecteddataset",
          postData
        );
        if (response) {
          console.log(response);
          const data = await request.get(
            API_TEST_URL,
            `arclist/getlistconfigbyid?entityid=${entityid}&listid=${listid}&userid=${userid}`
          );
          dispatch(getlistfieldsSuccess(data));
        }
      }
      updatedSelectedDS();
    }
  }, [newDatasetID]);

  useEffect(() => {
    const deleteDataset = async () => {
      try {
        if (deleteDatasetID) {
          const postData = {
            datasetid: deleteDatasetID,
            createdby: userid,
          };
          const response = await request.post(
            API_TEST_URL,
            "dataset/deletedataset",
            postData
          );
          if (response) {
            const data = await request.get(
              API_TEST_URL,
              `arclist/getlistconfigbyid?entityid=${entityid}&listid=${listid}&userid=${userid}`
            );
            dispatch(getlistfieldsSuccess(data));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    deleteDataset();
  }, [deleteDatasetID]);

  useEffect(() => {
    if (columnSequence.length > 0) {
      async function updatecolumnSequence() {
        const postData = {
          datasetid: dataSetID,
          userid: userid,
          columnseqlist: columnSequence,
        };
        const response = await request.post(
          API_TEST_URL,
          "dataset/updatecolumnsequence",
          postData
        );
        if (response) {
          console.log(response);
        }
      }
      updatecolumnSequence();
    }
  }, [columnSequence]);

  return null; // or any JSX you want to render
};

export default AdminSettingApi;
