/* eslint-disable react/prop-types */

import React, { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { ArcButtonPrimary } from "@/components/arccomponents/ui-components/ArcButtons/ArcButtons";
import { MdOutlineClear } from "react-icons/md";
import ArcToolTip from "@/components/arccomponents/ui-components/ArcTooltip/ArcTooltip";
const ArcAutocomplete = ({
  Label,
  Required,
  PlaceHolder,
  fetchURL,
  query,
  setQuery,
  page,
  setPage,
  Limit,
  selectedItems,
  setSelectedItems,
  type,
}) => {
  //   const [query, setQuery] = useState("");
  //   const [page, setPage] = useState(1);
  //   const Limit = 10;
  //   const [selectedItems, setSelectedItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);
  const fetchSuggestions = useCallback(async (query, page) => {
    try {
      const params = { q: query, _page: page, _limit: Limit };
      const { data } = await axios.get(fetchURL, { params });
      setSuggestions((prev) => (page === 1 ? data : [...prev, ...data]));
      setHasMore(data.length > 0);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }, []);
  const Type2 = type === "type-2";
  const handleInputFocus = () => {
    if (!isFocused) {
      setPage(1);
      fetchSuggestions(query, 1);
      setIsFocused(true);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setPage(1);
    fetchSuggestions(e.target.value, 1);
  };

  const handleCheckboxChange = (suggestion) => {
    if (selectedItems.includes(suggestion)) {
      setSelectedItems((prev) => prev.filter((item) => item !== suggestion));
    } else {
      setSelectedItems((prev) => [...prev, suggestion]);
    }
  };

  const loadMoreData = () => {
    fetchSuggestions(query, page + 1);
    setPage((prevPage) => prevPage + 1);
  };
  const removeSelectedItem = (item) => {
    setSelectedItems((prev) => prev.filter((i) => i !== item));
  };
  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className="arc-input-control-autocomplete-container"
      ref={containerRef}
    >
      <div className="arc-input-control arc-textbox with-autocomplete">
        {Label && (
          <Form.Label>
            {Label} {Required && <sup>*</sup>}
          </Form.Label>
        )}
        <div
          className={`input-control-inside ${type}`}
          onClick={handleInputFocus}
        >
          <ul className="selected-items">
            {(Type2 ? selectedItems.slice(0, 2) : selectedItems).map(
              (item, index) => (
                <li key={index} className="selected-item">
                  <span className="value-span">{item}</span>
                  <span
                    onClick={() => removeSelectedItem(item)}
                    className="remove-item"
                  >
                    <MdOutlineClear />
                  </span>
                </li>
              )
            )}
            {Type2 ? null : (
              <Form.Control
                type="text"
                placeholder={PlaceHolder}
                value={query}
                onChange={handleInputChange}
                // onFocus={handleInputFocus}
                className={`${
                  selectedItems.length === 0 ? "not-selected" : "selected"
                } form-control `}
              />
            )}
            {Type2 && selectedItems.length >= 3 && (
              <li className="selected-item">
                <span className="value-span with-other">
                  +<p>{selectedItems.length - 2}</p>
                </span>
              </li>
            )}
          </ul>
          {Type2 ? (
            <>
              <Form.Control
                type="text"
                placeholder={PlaceHolder}
                value={query}
                onChange={handleInputChange}
                // onFocus={handleInputFocus}
                className={`${
                  selectedItems.length === 0 ? "not-selected" : "selected"
                } form-control ${type}`}
              />
              {isFocused && (
                <ArcToolTip
                  as="span"
                  className="clear-btn"
                  HoverText="Clear"
                  BtnName={<MdOutlineClear />}
                  Placement="left"
                  onClick={() => {
                    setSelectedItems([]);
                    setIsFocused(false);
                  }}
                />
              )}
            </>
          ) : null}
        </div>
      </div>
      {isFocused && (
        <div className="suggestions-dropdown-main">
          <div className="suggestions-dropdown">
            <ul className={`suggestions-list ${hasMore ? null : "ishasmore"}`}>
              {suggestions.map((suggestion, index) => (
                <li key={index} className="suggestion-item">
                  <label htmlFor={suggestion + "-check"}>
                    {/* <div className="checkbox-wrapper-30">
                    <span className="checkbox">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(suggestion)}
                        onChange={() => handleCheckboxChange(suggestion)}
                        id={suggestion + "-check"}
                      />
                      <svg>
                        <use
                          xlinkHref="#checkbox-30"
                          className="checkbox"
                        ></use>
                      </svg>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ display: "none" }}
                    >
                      <symbol id="checkbox-30" viewBox="0 0 22 22">
                        <path
                          fill="none"
                          stroke="var(--themecolor)"
                          d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13 c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2"
                        />
                      </symbol>
                    </svg>
                  </div> */}
                    <input
                      className="default"
                      type="checkbox"
                      checked={selectedItems.includes(suggestion)}
                      onChange={() => handleCheckboxChange(suggestion)}
                      id={suggestion + "-check"}
                    />
                    {suggestion}
                  </label>
                </li>
              ))}
              {suggestions.length === 0 && (
                <li className="suggestion-item not-found-item">
                  no data found
                </li>
              )}
            </ul>
            {hasMore && (
              <div className="load-more-container">
                <ArcButtonPrimary
                  ClassName=""
                  BtnText="Load More"
                  OnClick={loadMoreData}
                />
              </div>
            )}
          </div>
          {/* <div className="footer-div">
            <button
              className="cancel"
              onClick={() => {
                setIsFocused(false);
              }}
            >
              Cancel
            </button>
            <button>Apply</button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ArcAutocomplete;
