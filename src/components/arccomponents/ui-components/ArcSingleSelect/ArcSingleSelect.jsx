// *******~ Import ~******** //
//? React

//? Assets
import Form from "react-bootstrap/Form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //
const animatedComponents = makeAnimated();
const ArcSingleSelect = ({
  options,
  Label,
  PlaceHolder,
  ClassName,
  Id,
  onChange,
  Value,
  Required,
  defaultValue,
  isClearable,
  disabled,
  ReadOnly,
  // isvisible,
}) => {
  console.log(disabled);
  return (
    <>
      <div
        className={`arc-input-control arc-singleselect ${ClassName} ${
          Required ? "mandatory-field" : null
        } 
  `}
      >
        {Label && (
          <Form.Label>
            {Label} {Required && <sup>*</sup>}
          </Form.Label>
        )}
        <div className="select-div">
          <Select
            components={animatedComponents}
            options={options}
            isClearable={isClearable}
            classNamePrefix={`add-contact-select`}
            placeholder={PlaceHolder}
            id={Id}
            onChange={onChange}
            value={Value}
            defaultValue={defaultValue}
            isDisabled={ReadOnly || disabled}
            // menuIsOpen={true}
            // defaultMenuIsOpen={true}
            // closeMenuOnSelect={true}
          />
        </div>
      </div>
    </>
  );
};

export default ArcSingleSelect;
