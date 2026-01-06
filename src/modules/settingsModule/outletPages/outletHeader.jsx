// *******~ Import ~******** //
//? React
import React from "react";
//? Assets

//? Components

//? CSS

//? Images

//? JSON File

//? Icons
// *******~ Import ~******** //

const OutletHeader = ({ title, description }) => {
  return (
    <React.Fragment>
      <section className="outlet-header">
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
    </React.Fragment>
  );
};
export default OutletHeader;
