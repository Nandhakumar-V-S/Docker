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
const ArcMultiSelect = ({
  options,
  Label,
  PlaceHolder,
  ClassName,
  onChange,
  Value,
  Required,
}) => {
  return (
    <>
      <div
        className={`arc-input-control arc-singleselect ${ClassName} ${
          Required ? "mandatory-field" : null
        }`}
      >
        {Label && (
          <Form.Label>
            {Label} {Required && <sup>*</sup>}
          </Form.Label>
        )}
        <div className="select-div">
          <Select
            components={animatedComponents}
            isMulti
            options={options}
            isClearable
            closeMenuOnSelect={false}
            classNamePrefix="add-contact-select"
            placeholder={PlaceHolder}
            onChange={onChange}
            value={Value}
          />
        </div>
      </div>
    </>
  );
};

export default ArcMultiSelect;
