/* eslint-disable react/prop-types */
/* eslint-disable no-inner-declarations */
// *******~ Import ~******** //
//? React
import React, { useEffect } from "react";
//? Assets

import { parseISO, format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate,
} from "@grapecity/wijmo.react.grid";
import "@grapecity/wijmo.styles/wijmo.css";
//? Components
import ListPageTableLoading from "@/modules/loading-skeleton/listpage-table-loading";
import ArcDataNotFound from "@/components/arccomponents/ui-components/nodatafound/no-data-found";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
//? CSS

//? Images

//? JSON File

//? Icons
import { CiWarning } from "react-icons/ci";
import { PiInfoBold } from "react-icons/pi";
// *******~ Import ~******** //

const getColumns = (data) => {
  if (data?.length === 0) return [];

  return Object.keys(data[0]).reduce((columns, key) => {
    if (key !== "TableName" && key !== "Row no" && key !== "ErrorCount") {
      columns.push({
        binding: key.replace(/ /g, "").toLowerCase(), // generate a unique binding key without spaces
        header: key,
        minWidth:
          key == "Warning Description" || key == "ErrorDescription" ? 350 : 150,
        width:
          key == "Warning Description" || key == "ErrorDescription" ? 350 : 150,
        allowResizing: true,
        allowSorting: true,
      });
    }
    return columns;
  }, []);
};

const mapData = (data) => {
  return data.map((row) => {
    const newRow = {};
    Object.keys(row).forEach((key) => {
      if (key != "TableName" && key != "Row no" && key !== "ErrorCount") {
        newRow[key.replace(/ /g, "").toLowerCase()] = row[key]; // ensure keys match the bindings
      }
    });
    return newRow;
  });
};
const DataTable = ({ GridData }) => {
  useEffect(() => {
    removeWijimoLicense();
  }, []);

  function removeWijimoLicense() {
    const removeEvaluationText = () => {
      const bodyElements = document.body.children;
      for (let i = bodyElements.length - 1; i >= 0; i--) {
        const body = bodyElements[i];
        if (
          body.innerText.includes("Wijmo Evaluation") ||
          body.innerText.includes("Wijmo license")
        ) {
          body.remove();
        }
      }
    };
    removeEvaluationText();
  }
  const DataTableLoading = useSelector(
    (state) => state.GetImportDataByIdState.status
  );
  const DataTableLoadingStatus = DataTableLoading === "loading...";
  console.log(GridData);
  console.log("GridData");
  const columns = getColumns(GridData);
  console.log(columns);
  const dataSource = mapData(GridData);
  console.log(dataSource);

  return (
    <React.Fragment>
      {!DataTableLoadingStatus && dataSource.length === 0 ? (
        <ArcDataNotFound Title={"Data not found"} />
      ) : null}

      {DataTableLoadingStatus ? (
        <ListPageTableLoading />
      ) : (
        <FlexGrid
          autoRowHeights={true}
          deferResizing={true}
          frozenColumns={1}
          itemsSource={dataSource}
          allowSorting={true}
          className="list-data-table with-360-page"
          headersVisibility="Column"
        >
          {columns.map((col, index) => (
            <FlexGridColumn
              key={index}
              allowDragging={false}
              allowResizing={col.allowResizing}
              binding={col.binding}
              header={col.header}
              minWidth={col.minWidth}
              width={col.width}
              isReadOnly={col.isReadOnly || true}
              fixed={col.fixed || false}
            >
              <FlexGridCellTemplate
                cellType="Cell"
                template={(ctx) => {
                  const RowValue = ctx.item[col.binding];

                  const splitAndNewLine = (str) => {
                    if (str && str.trim() !== "") {
                      const delimiter = ";";
                      return str.split(delimiter);
                    }
                    return [];
                  };

                  const waringValue = splitAndNewLine(ctx.item[col.binding]);

                  return (
                    <>
                      {(col.header === "Warning Description" ||
                        col.header === "ErrorDescription") &&
                      waringValue != "" ? (
                        <>
                          <GridTemplate waringValue={waringValue} />
                        </>
                      ) : (
                        RowValue || "-"
                      )}
                    </>
                  );
                }}
              />
            </FlexGridColumn>
          ))}
        </FlexGrid>
      )}
    </React.Fragment>
  );
};

export default DataTable;

const GridTemplate = ({ waringValue }) => {
  return (
    <>
      <span className={`wjgridcelltext-d`}>
        {waringValue.length}
        {["", "-"].includes(waringValue) ? null : (
          <ArcToolTip
            HoverText={
              <>
                {waringValue.map((data, index) => (
                  <p className="title" key={index}>
                    {" "}
                    <span>
                      <CiWarning />
                    </span>{" "}
                    {data}
                  </p>
                ))}
              </>
            }
            Tooltipclass={"grid-tooltip with-warning"}
            BtnName={<PiInfoBold />}
            Placement="left"
            as="i"
          />
        )}
      </span>
    </>
  );
};
