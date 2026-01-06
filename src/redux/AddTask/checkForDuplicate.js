// api.js or a similar file

import { API_TEST_URL } from "@/config/serverApiConfig";
export const checkForDuplicate = async (requestData) => {
  const response = await fetch(
    `${API_TEST_URL}/planexecution/getduplicatecheckresult`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(
      `HTTP error! Status: ${response.status}, Message: ${errorResponse.message}`
    );
  }

  return response.json();
};
