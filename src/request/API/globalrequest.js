const request = {
  get: async (url, endPoint) => {
    try {
      const response = await fetch(`${url}/${endPoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  },

  post: async (url, endPoint, body) => {
    try {
      const response = await fetch(`${url}/${endPoint}`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error posting data:", error);
      return null;
    }
  },
};

export { request };
