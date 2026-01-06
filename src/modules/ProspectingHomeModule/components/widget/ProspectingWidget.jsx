//? React
import React from "react";

export default function ProspectingWidget({ className, children }) {
  return (
    <React.Fragment>
      <div className={`prospecting-widget ${className}`}>{children}</div>
    </React.Fragment>
  );
}
