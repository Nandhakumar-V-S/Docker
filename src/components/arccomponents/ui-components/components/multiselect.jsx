import React, { useState } from "react";
import makeAnimated from "react-select/animated";
import { components } from "react-select";
import PropTypes from "prop-types";
import ReactSelect from "react-select";

const Option = (props) => (
  <div>
    <components.Option {...props}>
      <input type="checkbox" checked={props.isSelected} onChange={() => null} />
      <label>{props.label}</label>
    </components.Option>
  </div>
);

const allOption = { label: "Select all", value: "*" };

const ValueContainer = ({ children, ...props }) => {
  const currentValues = props.getValue();
  let toBeRendered = children;

  if (currentValues.some((val) => val.value === allOption.value)) {
    toBeRendered = [[children[0][0]], children[1]];
  }

  return (
    <components.ValueContainer {...props}>
      {toBeRendered}
    </components.ValueContainer>
  );
};

const MultiValue = (props) => {
  let labelToBeDisplayed =
    props.data.value === allOption.value
      ? "All is selected"
      : `${props.data.label}, `;

  return (
    <components.MultiValue {...props}>
      <span>{labelToBeDisplayed}</span>
    </components.MultiValue>
  );
};

const animatedComponents = makeAnimated();

const MySelect = (props) => {
  if (props.allowSelectAll) {
    return (
      <ReactSelect
        {...props}
        classNamePrefix="arc-custom-multi-select"
        // defaultMenuIsOpen
        placeholder={props.placeholderName}
        // openMenuOnClick={false}
        // menuIsOpen
        options={[props.allOption, ...props.options]}
        onChange={(selected, event) => {
          if (selected !== null && selected.length > 0) {
            if (selected[selected.length - 1].value === props.allOption.value) {
              return props.onChange([props.allOption, ...props.options]);
            }

            let result = [];
            if (selected.length === props.options.length) {
              if (selected.includes(props.allOption)) {
                result = selected.filter(
                  (option) => option.value !== props.allOption.value
                );
              } else if (event.action === "select-option") {
                result = [props.allOption, ...props.options];
              }
              return props.onChange(result);
            }
          }

          return props.onChange(selected);
        }}
      />
    );
  }

  return <ReactSelect {...props} />;
};

MySelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
};

MySelect.defaultProps = {
  allOption: {
    label: "Select all",
    value: "*",
  },
};

const ReactCustomMultiSelect = ({
  optionSelected,
  setOptionSelected,
  SelectOptions,
  ...props
}) => {
  const handleChange = (selected) => {
    setOptionSelected(selected);
  };

  return (
    <MySelect
      options={SelectOptions}
      isMulti={props.isMultySelect}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{
        Option,
        MultiValue,
        ValueContainer,
        animatedComponents,
      }}
      //   onChange={props.OnchangeSelect}
      onChange={handleChange}
      allowSelectAll={true}
      value={optionSelected}
      placeholderName={props.placeholderName}
    />
  );
};

export default ReactCustomMultiSelect;
