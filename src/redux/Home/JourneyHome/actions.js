import { API_TEST_URL } from "@/config/serverApiConfig";
import * as types from "./types";

export const fetchDashboardDataSuccess = (data) => ({
  type: types.JOURNEY_HOME_FETCH_MASTER_DATA_SUCCESS,
  payload: data,
});

export const updateFieldStatusSuccess = (fieldId, isActive) => ({
  type: types.UPDATE_FIELD_STATUS_SUCCESS,
  payload: { fieldId, isActive },
});

// To fetch dashboard data
export const fetchDashboardData = () => async (dispatch) => {
  try {
    const response = await fetch(`${API_TEST_URL}/home/gethomepageinfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        homescreenid: "92C606D0-AE9D-431A-B680-CEE9B3A9E027",
        userid: 1016,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Fetched data: ", data);
    dispatch(fetchDashboardDataSuccess(data));
  } catch (error) {
    console.error("Error fetching dashboard data: ", error);
  }
};

// To update field status
export const updateFieldStatus = (fieldId, isActive) => async (dispatch) => {
  try {
    const response = await fetch(`${API_TEST_URL}/home/updatejourneyhome`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        homescreenid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        userid: 0,
        data: [
          {
            // section_id: sectionId,
            sec_isactive: true,
            sec_sequence: 0,
            field_sequence: 0,
            field_id: fieldId,
            field_isactive: isActive,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update field status");
    }

    dispatch(updateFieldStatusSuccess(fieldId, isActive));
  } catch (error) {
    console.error("Error updating field status: ", error);
  }
};
