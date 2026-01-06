import React from "react";

import { AppContextProvider } from "@/context/appContext";

export default function ListPageLayout({ children }) {
  return <AppContextProvider>{children}</AppContextProvider>;
}
