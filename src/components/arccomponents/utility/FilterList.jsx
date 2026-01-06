/* eslint-disable react/prop-types */
import React from "react";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
import { MdClear } from "react-icons/md";
import { TbFilterDown } from "react-icons/tb";
import { TbFilterUp } from "react-icons/tb";

export const FilterListHeader = ({
  FilterDropdownShow,
  selectedFiltersLength,
  matchedLookup,
  textFilter,
  setFilterDropdownShow,
  weekFilter,
  planWeekFilter,
  monthFilter,
  planMonthFilter,
  datePickerFilter,
}) => {
  return (
    <React.Fragment>
      {/* Filter List */}
      {FilterDropdownShow && selectedFiltersLength === 0 ? null : (
        <div
          className={`selected-filter-values type-2 ${
            FilterDropdownShow ? "active" : "inactive"
          }`}
        >
          <ul>
            <li>
              <p className="applied-filters">Applied filters:</p>
            </li>
            {Object.values(matchedLookup).map((filter) => {
              const { name, mastervalues } = filter;

              // Filter mastervalues with isChecked true
              const checkedValues = Array.isArray(mastervalues)
                ? mastervalues.filter((value) => value.isChecked)
                : [];

              if (checkedValues?.length === 0) return null;

              return (
                <li key={filter.id}>
                  <p className="filer-container">
                    {name}:{" "}
                    {checkedValues
                      ?.slice(0, 1)
                      .map((item, index) =>
                        checkedValues.length === 1 && 1 === index + 1 ? (
                          <span key={index}>{item.optionvalue} </span>
                        ) : (
                          <span key={index}>{item.optionvalue}, </span>
                        )
                      )}
                    {checkedValues.length >= 2 && (
                      <ArcToolTip
                        as="li"
                        Tooltipclass="addlookup with-selectedfilter"
                        className="selected-item"
                        HoverText={
                          <>
                            <ul>
                              {checkedValues.slice(1).map((item, index) => (
                                <li
                                  key={index}
                                  className="selected-item"
                                  title={item.optionvalue}
                                >
                                  <span className="value-span">
                                    {item.optionvalue}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </>
                        }
                        BtnName={
                          <span className="count">
                            +{checkedValues.length - 1}
                          </span>
                        }
                        Placement="bottom"
                      />
                    )}
                  </p>
                </li>
              );
            })}
            {Object.values(textFilter).map((filter) => {
              const { value, name } = filter;

              if (!value) return null;

              return (
                <li key={filter.id}>
                  <p className="filter-container">
                    {name}: <span>{value}</span>
                  </p>
                </li>
              );
            })}
            {weekFilter?.map((filter) => {
              const { id, name, week, year } = filter;
              return (
                <li key={id}>
                  <p className="filter-container">
                    {name}: {""}
                    <span>W{week}</span> of <span>{year}</span>
                  </p>
                </li>
              );
            })}
            {datePickerFilter &&
              datePickerFilter[0]?.date !== "" &&
              datePickerFilter?.map((filter) => {
                const { id, name, date } = filter;
                return (
                  <li key={id}>
                    <p className="filter-container">
                      {name}: {""}
                      <span>{date}</span>
                    </p>
                  </li>
                );
              })}
            {planWeekFilter &&
              planWeekFilter[0]?.week !== "" &&
              planWeekFilter?.map((filter) => {
                const { id, name, week, year } = filter;
                return (
                  <li key={id}>
                    {week != "" && (
                      <p className="filter-container">
                        {name}: {""}
                        <span>W{week}</span> of <span>{year}</span>
                      </p>
                    )}
                  </li>
                );
              })}
            {monthFilter &&
              monthFilter[0]?.month !== "" &&
              monthFilter?.map((filter) => {
                const { id, name, month, year } = filter;
                return (
                  <li key={id}>
                    {month !== "" && (
                      <p className="filter-container">
                        {name}: {""}
                        <span>M{month}</span> of <span>{year}</span>
                      </p>
                    )}
                  </li>
                );
              })}
            {planMonthFilter &&
              planMonthFilter[0]?.month !== "" &&
              planMonthFilter?.map((filter) => {
                const { id, name, month, year } = filter;
                return (
                  <li key={id}>
                    {month !== "" && (
                      <p className="filter-container">
                        {name}: {""}
                        <span>M{month}</span> of <span>{year}</span>
                      </p>
                    )}
                  </li>
                );
              })}
          </ul>
          <ArcToolTip
            HoverText={"Close"}
            BtnName={<MdClear />}
            Placement="left"
            onClick={() => {
              setFilterDropdownShow(false);
            }}
            as="span"
            className="clear-all-filter"
          />
        </div>
      )}
      {/* Filter List */}
    </React.Fragment>
  );
};
export const FilterListPagination = ({
  selectedFiltersLength,
  matchedLookup,
  textFilter,
  weekFilter,
  datePickerFilter,
  planWeekFilter,
  monthFilter,
  planMonthFilter,
}) => {
  if (selectedFiltersLength === 0) return null;

  const filterNames = [];

  // Collect names from matchedLookup
  Object.values(matchedLookup).forEach((filter) => {
    const checkedValues =
      filter.mastervalues?.filter((value) => value.isChecked) || [];
    if (checkedValues.length > 0) {
      filterNames.push(filter.name);
    }
  });

  // Collect names from textFilter
  Object.values(textFilter)?.forEach((filter) => {
    if (filter.value) {
      filterNames.push(filter.name);
    }
  });

  // Collect names from weekFilter
  weekFilter?.forEach((filter) => {
    filterNames.push(filter.name);
  });

  // Collect names from datePickerFilter
  datePickerFilter?.forEach((filter) => {
    if (filter.date) {
      filterNames.push(filter.name);
    }
  });

  // Collect names from planWeekFilter
  planWeekFilter?.forEach((filter) => {
    if (filter.week) {
      filterNames.push(filter.name);
    }
  });

  // Collect names from monthFilter
  monthFilter?.forEach((filter) => {
    if (filter.month) {
      filterNames.push(filter.name);
    }
  });

  // Collect names from planMonthFilter
  planMonthFilter?.forEach((filter) => {
    if (filter.month) {
      filterNames.push(filter.name);
    }
  });

  return (
    <p>
      Filter By{" "}
      {filterNames.map((name, index) => (
        <span key={name}>
          {name}
          {index < filterNames.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
};

export const HandleFilterList = ({
  FilterDropdownShow,
  setFilterDropdownShow,
  selectedFiltersLength,
}) => {
  return (
    <React.Fragment>
      {selectedFiltersLength > 0 && (
        <ArcToolTip
          HoverText={
            FilterDropdownShow ? "Hide Applied Filter" : "Show Applied Filter"
          }
          BtnName={!FilterDropdownShow ? <TbFilterDown /> : <TbFilterUp />}
          Placement="top"
          onClick={() => setFilterDropdownShow((prev) => !prev)}
          as="span"
          className="filter-dropdown-show"
        />
      )}
    </React.Fragment>
  );
};
