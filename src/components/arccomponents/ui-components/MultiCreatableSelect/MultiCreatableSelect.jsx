// *******~ Import ~******** //
//? React

//? Assets
import Form from "react-bootstrap/Form";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
//? Components

//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

const MultiCreatableSelect = ({ Label, PlaceHolder, Name, ClassName }) => {
  // const [selectedOption, setSelectedOption] = useState(null);
  // const options = [
  //   { value: "Add any 2 values", label: "Add any 2 values", isDisabled: true },
  //   { value: "Add any 2 values", label: "Add any 2 values", isDisabled: true },
  // ];
  const animatedComponents = makeAnimated();
  const DropdownIndicator = () => null;
  const formatCreateLabel = (inputValue) => `Add: "${inputValue}"`;
  const customStyles = {
    indicatorSeparator: () => ({ display: "none" }),
  };
  const customNoOptionsMessage = () => "Please enter 2 or more characters";
  return (
    <>
      <div className={`arc-input-control arc-multiselect-create ${ClassName}`}>
        {Label && <Form.Label>{Label}</Form.Label>}
        <div className="select-div">
          <CreatableSelect
            isMulti
            components={{ DropdownIndicator, animatedComponents }}
            formatCreateLabel={formatCreateLabel}
            classNamePrefix="multi-select"
            styles={customStyles}
            placeholder={PlaceHolder}
            noOptionsMessage={customNoOptionsMessage}
          />
        </div>
      </div>
    </>
  );
};

export default MultiCreatableSelect;
