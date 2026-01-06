// *******~ Import ~******** //
//? React
import React, { createContext, useState } from "react";
//? Assets
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//? Components
import PageHeader from "./components/ArcPageHeader";
import DetailsForm, { AttachFile } from "./components/DetailsForm";
import { useLocation } from "react-router-dom";
//? CSS

//? Images

//? JSON File
import FormAPI from "./components/form.json";
import {
  ActivitiesPanel,
  AssociateDetails,
  AttachmentDetails,
  OwnerDetails,
  PeopleDetails,
  TagSection,
} from "./components/sidepanel";

//? Icons
// *******~ Import ~******** //
export const CaseDetailContext = createContext();
const CaseDetailEditModule = () => {
  const [first, setfirst] = useState(false);
  const [show, setShow] = useState(false);

  let location = useLocation();
  const currentPathName = location.pathname;
  return (
    <React.Fragment>
      <CaseDetailContext.Provider value={{ first, setfirst }}>
        <main className="case-detail-module">
          <PageHeader />
          <section
            className={`case-detail-page ${
              currentPathName === "/case360detailsv1" ? "flex-row-reverse" : ""
            }`}
          >
            <section className="contact-info-section">
              <AssociateDetails />
              <PeopleDetails />
              <TagSection />
              <OwnerDetails />
              <AttachmentDetails />
              <ActivitiesPanel />
            </section>
            <section className="detail-section">
              <DetailsForm
                show={show}
                setShow={setShow}
                FormAPI={FormAPI}
                Title={"Add Case"}
                BtnName={"Add Case"}
              />
            </section>
          </section>
        </main>
      </CaseDetailContext.Provider>
    </React.Fragment>
  );
};
export default CaseDetailEditModule;
