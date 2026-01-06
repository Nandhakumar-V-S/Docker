import { useState, useEffect } from "react";

export const useGlobalUserId = () => {
  const [globalUserId, setGlobalUserId] = useState("");

  useEffect(() => {
    const loggedUserId = window.sessionStorage.getItem("Globalid");
    if (loggedUserId) {
      setGlobalUserId(loggedUserId);
    }
  }, []);

  return globalUserId;
};
