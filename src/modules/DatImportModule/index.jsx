// *******~ Import ~******** //
//? React
import React, { useState } from "react";
//? Assets

//? Components

import DataImportHeader from "@/modules/DatImportModule/components/DataImportHeader";
import DataImportSection from "@/modules/DatImportModule/components/ImportSection";

//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

export default function DataImportModule() {
  const [sessionData, setSessionData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedValue, setSelectedValue] = useState("cr1");
  const [file, setFile] = useState(null);
  console.log("Data Import Module");
  return (
    <>
      <main className="data-import-main">
        <DataImportHeader sessionData={sessionData} currentStep={currentStep} setCurrentStep={setCurrentStep} file={file}
        setFile={setFile}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}/>
        <DataImportSection sessionData={sessionData} setSessionData={setSessionData} currentStep={currentStep} setCurrentStep={setCurrentStep} file={file}
        setFile={setFile}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}/>
      </main>
    </>
  );
}
