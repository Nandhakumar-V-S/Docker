import { createContext, useState } from "react";

// Create the context
export const SelectedRowContext = createContext([]);

// Create the provider component
export const SelectedRowContextProvider = ({ children }) => {
  const [selectedRow1, setSelectedRow1] = useState([]);
  const [EditTaskShow, setEditTaskShow] = useState(false);
  const [addTaskShow, setAddTaskShow] = useState(false);
  const [ArcFilterPopupshow, setArcFilterPopupshow] = useState(false);
  const [titleFieldValue, setTitleFieldValue] = useState([]);
  const [bulkupdatevalues, setBulkupdatevalues] = useState([]);
  const [dropdownVisible, setdropdownVisible] = useState(false);
  const [notesupdateVisible, setnotesupdateVisible] = useState(true);
  const [selectedcheckboxValues, setSelectedcheckboxValues] = useState([]);
  const [selectedcheckboxId, setSelectedcheckboxId] = useState({});
  const [checkboxRowValues, setcheckboxRowValues] = useState([]);

  console.log(selectedRow1);

  return (
    <SelectedRowContext.Provider
      value={{
        selectedRow1,
        setSelectedRow1,
        EditTaskShow,
        setEditTaskShow,
        addTaskShow,
        setAddTaskShow,
        ArcFilterPopupshow,
        setArcFilterPopupshow,
        titleFieldValue,
        setTitleFieldValue,
        bulkupdatevalues,
        setBulkupdatevalues,
        dropdownVisible,
        setdropdownVisible,
        notesupdateVisible,
        setnotesupdateVisible,
        setSelectedcheckboxValues,
        selectedcheckboxValues,
        selectedcheckboxId,
        setSelectedcheckboxId,
        checkboxRowValues,
        setcheckboxRowValues,
      }}
    >
      {children}
    </SelectedRowContext.Provider>
  );
};
