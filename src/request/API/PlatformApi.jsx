import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request } from "@/request/API/globalrequest";
import { API_TEST_URL } from "@/config/serverApiConfig";
import {
  getentitySuccess,
  getMasterDataSuccess,
  getlistfieldsSuccess,
  getDatasetSuccess,
  getListdataSuccess,
  setNewDatasetID,
} from "@/redux/listpage/actions";
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
} from "@/redux/listpage/selector";
import {
  ArcSuccess,
  ArcError,
} from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

const PlatformApi = () => {
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
  const prevEntityRef = useRef(null);
  console.log(dataSetList);
  console.log(deleteDatasetID);
  console.log({ newDataset });
  console.log(entityid);
  console.log(listid);

  useEffect(() => {
    async function getentityinfo() {
      const postData = {
        tenantappid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userid: userid,
      };
      const response = await request.post(
        API_TEST_URL,
        "arcconfiguration/getentityinfo",
        postData
      );
      dispatch(getentitySuccess(response));
    }
    getentityinfo();
  }, [dispatch]);

  useEffect(() => {
    if (entityid && entityid !== prevEntityRef.current) {
      async function getlookupdetails() {
        const postData = {
          entityId: entityid,
        };
        const response = await request.post(
          API_TEST_URL,
          "arcconfiguration/getlookupdetails",
          postData
        );
        dispatch(getMasterDataSuccess(response));
        prevEntityRef.current = entityid;
      }
      getlookupdetails();
    }
  }, [entityid]);

  useEffect(() => {
    if (entityid && listid && userid && entityid !== prevEntityRef.current) {
      async function getlistconfigbyid() {
        const data = await request.get(
          API_TEST_URL,
          `arclist/getlistconfigbyid?entityid=${entityid}&listid=${listid}&userid=${userid}`
        );
        dispatch(getlistfieldsSuccess(data));
      }

      getlistconfigbyid();
    }
  }, [entityid, listid]);

  useEffect(() => {
    if (dataSetID) {
      async function getDataset() {
        const data = await request.get(
          API_TEST_URL,
          `dataset/getdatasetfieldinfobyid?datasetid=${dataSetID}`
        );
        dispatch(getDatasetSuccess(data));
      }

      getDataset();
    }
  }, [dataSetID]);

  // useEffect(() => {
  //   if (entityid && listid && dataSetID) {
  //     async function getlistdetails() {
  //       const response = await request.post(
  //         API_TEST_URL,
  //         "arclist/getlistdetails",
  //         postRequest
  //       );
  //       dispatch(getListdataSuccess(response));
  //     }
  //     getlistdetails();
  //   }
  // }, [postRequest]);

  useEffect(() => {
    const createnewDataset = async () => {
      try {
        if (newDataset.datasetname) {
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

            // dispatch(createDataset({}));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    createnewDataset();
  }, [newDataset]);

  useEffect(() => {
    const updateDatasetInfo = async () => {
      try {
        if (updateDataSet.datasetname) {
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
            if(response?.result?.response==='Successfully deleted'){
              ArcSuccess({
                Message: "Dataset Deleted  Successfully",
                position: "top-center",
              });
                }
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
          "dataset/updatecolumnseq",
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

export default PlatformApi;
