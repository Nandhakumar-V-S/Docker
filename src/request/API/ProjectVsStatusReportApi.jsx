import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request } from "@/request/API/globalrequest";
import { API_TEST_URL } from "@/config/serverApiConfig";
import {
  getMasterDataSuccess,
  getlistfieldsSuccess,
  getDatasetSuccess,
  setLoading,
  getListdataSuccess,
  createDataset,
  updateDataset,
  incrementRenderCount,
  setdataSetID,
} from "@/redux/ProjectVsStatusReport/actions";
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
} from "@/redux/ProjectVsStatusReport/selector";
import {
  ArcSuccess,
  ArcError,
} from "@/components/arccomponents/ui-components/ArcToastify/ArcToastify";

const ProjectVsStatusReportApi = () => {
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
  console.log(columnSequence);
  console.log(dataSetList);
  console.log(deleteDatasetID);
  console.log({ newDataset });
  console.log(entityid);
  console.log(listid);

  useEffect(() => {
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
        if (response) {
          const data = await request.get(
            API_TEST_URL,
            `arclist/getlistconfigbyid?entityid=${entityid}&listid=${listid}&userid=${userid}`
          );
          dispatch(getlistfieldsSuccess(data));
          dispatch(incrementRenderCount());
        }
      }
      getlookupdetails();
    }
  }, [dispatch, entityid, listid, userid]);

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
  }, [dataSetID, userid]);

  useEffect(() => {
    if (
      entityid &&
      listid &&
      dataSetID
      //postRequest.filterparams.length > 0
    ) {
      dispatch(setLoading(true));
      async function getlistdetails() {
        const response = await request.post(
          API_TEST_URL,
          "report/getprojectvsstatusdetails",
          postRequest
        );
        dispatch(getListdataSuccess(response));
        dispatch(setLoading(false));
      }
      getlistdetails();
    }
  }, [postRequest]);

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
            dispatch(setLoading(false));
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

export default ProjectVsStatusReportApi;
