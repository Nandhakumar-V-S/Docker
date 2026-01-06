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

const ArcWidget = ({ className, children, Borderbottom }) => {
  return (
    <React.Fragment>
      <div className={`arc-widget ${className}`}>
        {children}
        {Borderbottom && <BottomBorder />}
      </div>
    </React.Fragment>
  );
};
export default ArcWidget;

const BottomBorder = () => {
  return (
    <React.Fragment>
      <ul className="widget-bottom-border">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </React.Fragment>
  );
};
