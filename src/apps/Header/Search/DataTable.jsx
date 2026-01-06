/* eslint-disable react/prop-types */
/* eslint-disable no-inner-declarations */
// *******~ Import ~******** //
//? React
import React, { useEffect, useRef, useState } from "react";
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
import { GlobalSearchPagination } from "@/redux/GlobalSearch/GlobalSearch";
// *******~ Import ~******** //

const getColumns = (data) => {
  if (data?.length === 0) return [];

  // Assuming "taskname" is a key in the data object
  const columns = Object.keys(data[0]).reduce((columns, key) => {
    if (key !== "id" && key !== "ID" && key !== "_version_") {
      columns.push({
        binding: key.replace(/ /g, "").toLowerCase(),
        header: key,
        minWidth:
          key === "Warning Description" || key === "ErrorDescription"
            ? 350
            : 150,
        width:
          key === "Warning Description" || key === "ErrorDescription"
            ? 350
            : 150,
        allowResizing: true,
        allowSorting: true,
      });
    }
    return columns;
  }, []);
  // console.log(columns.findIndex((col) => col.binding === "title"));
  // console.log(columns);

  // Ensure "taskname" is the first column
  const tasknameColumnIndex = columns.findIndex(
    // console.log(col),
    (col) => col.binding === "title"
  );
  if (tasknameColumnIndex !== -1 && tasknameColumnIndex !== 0) {
    const tasknameColumn = columns.splice(tasknameColumnIndex, 1)[0];
    columns.unshift(tasknameColumn);
  }
  console.log(columns);

  return columns;
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
const DataTable = ({ GridData, value }) => {
  // const [rowCount, setRowCount] = useState("");
  // const [cellCount, setCellCount] = useState("");
  // const [pageNumberCount, setPageNumberCount] = useState(0);
  // const dispatch = useDispatch();
  console.log(GridData);
  // const flexInitialized = useEvent((flexgrid) => {
  //   setRowCount(flexgrid.rows.length.toString());
  //   setCellCount(
  //     flexgrid.hostElement.querySelectorAll(".wj-cell").length.toString()
  //   );
  //   flexgrid.updatedView.addHandler(() => {
  //     setRowCount(flexgrid.rows.length.toString());
  //     setCellCount(
  //       flexgrid.hostElement.querySelectorAll(".wj-cell").length.toString()
  //     );
  //   });
  //   flexgrid.scrollPositionChanged.addHandler((s) => {
  //     // if we're close to the bottom, add 20 items
  //     if (s.viewRange.bottomRow >= s.rows.length - 1) {
  //       console.log("ENd Reached");
  //       let view = s.collectionView;
  //       let index = view.currentPosition; // keep position in case the view is sorted
  //       // addData(data, 20);
  //       loadNextPage();
  //       // view.refresh();
  //       // view.currentPosition = index;
  //     }
  //   });
  // });

  // const loadNextPage = () => {
  //   const UpdatePageCount = pageNumberCount + 1;
  //   setPageNumberCount(UpdatePageCount);
  //   dispatch(
  //     GlobalSearchPagination({
  //       pageNumberCount: UpdatePageCount,
  //       searchData: value,
  //     })
  //   );
  // };

  // console.log(rowCount);
  // console.log(cellCount);

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
  const DataTableLoading = useSelector((state) => state.GlobalSearch.status);
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
          // initialized={flexInitialized}
          autoRowHeights={true}
          deferResizing={true}
          frozenColumns={1}
          itemsSource={dataSource}
          allowSorting={true}
          className="list-data-table with-filter fetch-scrolled-data"
          headersVisibility="Column"
        >
          {columns.map((col, index) =>
            col.header === "Title" ? (
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
                    console.log(RowValue);
                    return (
                      <>
                        {<p className="title grid-value">{RowValue || "-"}</p>}
                      </>
                    );
                  }}
                />
              </FlexGridColumn>
            ) : (
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
                    console.log(RowValue);

                    return (
                      <>{<p className="grid-value">{RowValue || "-"}</p>}</>
                    );
                  }}
                />
              </FlexGridColumn>
            )
          )}
        </FlexGrid>
      )}
    </React.Fragment>
  );
};

export default DataTable;

// useEffect(() => {
//   const layoutPages = document.querySelector(".fetch-scrolled-data");

//   if (layoutPages) {
//     const handleScroll = () => {
//       // Check if scroll bottom is reached
//       if (
//         layoutPages.scrollTop + layoutPages.clientHeight ===
//         layoutPages.scrollHeight
//       ) {
//         setPageNumber((prev) => prev + 1);
//         console.log(pageNumber);
//         // Dispatch the action if scroll bottom is reached
//         // dispatch(fetchFeeds(pageNumber));
//         // Optional: Scroll to the top if needed
//         // layoutPages.scrollTop = 0;
//       }
//     };

//     // Assuming you are using an event listener for the scroll event
//     layoutPages.addEventListener("scroll", handleScroll);

//     return () => {
//       // Cleanup the event listener on component unmount
//       layoutPages.removeEventListener("scroll", handleScroll);
//     };
//   }
// }, [dispatch, pageNumber]);
