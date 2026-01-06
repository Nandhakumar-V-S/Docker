import { createContext } from "react";
import ListTableModule from "@/modules/ListPageModule";
export const ArcPageContext = createContext({});
export default function ListTablePage() {
  console.log("List Table Module");
  return (
    <>
      <ArcPageContext.Provider value={{}}>
        <ListTableModule />
      </ArcPageContext.Provider>
    </>
  );
}
