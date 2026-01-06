/* eslint-disable react/prop-types */
import React from "react";
import { LiaSortAlphaDownSolid } from "react-icons/lia";
import { LiaSortAlphaUpAltSolid } from "react-icons/lia";
const WijmoHeaderTemplate = ({ column, postDataInfoData }) => {
  return (
    <React.Fragment>
      <div
        className={`custom-header ${
          column.displayapiname.toLowerCase() ===
          postDataInfoData?.orderby.toLowerCase()
            ? postDataInfoData?.orderbydir === "asc"
              ? "asc"
              : "desc"
            : null
        }`}
      >
        {column.name}
        {column.displayapiname.toLowerCase() ===
        postDataInfoData?.orderby.toLowerCase() ? (
          postDataInfoData?.orderbydir === "asc" ? (
            <>
              <LiaSortAlphaDownSolid />
            </>
          ) : (
            <>
              <LiaSortAlphaUpAltSolid />
            </>
          )
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default WijmoHeaderTemplate;

export const WijmoHeaderTemplateCSR = ({ ctx, column }) => {
  // Determine sort direction: asc, dsc, or none
  const sortDirectionindex = ctx.col?.currentSortIndex;
  console.log(sortDirectionindex);
  const sortDirection = ctx.col?.currentSort === "+" ? "asc" : "desc" || ""; // "asc", "dsc", or undefined
  const className = sortDirection ? `sort-${sortDirection}` : "";
  console.log(ctx);
  return (
    <React.Fragment>
      <div className={`custom-header ${className}`}>
        {
          <>
            {column.name}
            {sortDirectionindex === 0 && (
              <>
                {sortDirection === "asc" ? (
                  <LiaSortAlphaDownSolid />
                ) : sortDirection === "desc" ? (
                  <LiaSortAlphaUpAltSolid />
                ) : null}
              </>
            )}
          </>
        }
      </div>
    </React.Fragment>
  );
};
