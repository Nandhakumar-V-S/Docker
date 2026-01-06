import { API_BASE_URL } from "@/config/serverApiConfig";
import { OFFLINE_API_BASE_URL } from "@/Offline_API/Offline_API";
import { PROTO_ENABLED } from "@/config/serverApiConfig";

const jsonrequest = {
  getMasterdata: async () => {
    try {
      let response;
      if (PROTO_ENABLED) {
        response = await fetch(OFFLINE_API_BASE_URL + "Masterdata");
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
      // return errorHandler(error);
    }
  },
  getlistfields: async () => {
    try {
      let response;
      if (PROTO_ENABLED) {
        response = await fetch(OFFLINE_API_BASE_URL + "list");
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
      // return errorHandler(error);
    }
  },

  getListdata: async () => {
    try {
      let response = await fetch(OFFLINE_API_BASE_URL + "Listdata");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
      // return errorHandler(error);
    }
  },

  getDataset: async () => {
    try {
      let response;
      if (PROTO_ENABLED) {
        response = await fetch(OFFLINE_API_BASE_URL + "Dataset");
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
      // return errorHandler(error);
    }
  },
};
export { jsonrequest };
