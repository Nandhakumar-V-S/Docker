// *******~ Import ~******** //
//? React
import { useEffect, useState } from "react";
//? Assets
import Form from "react-bootstrap/Form";
//? Components
import ReactCustomMultiSelect from "./multiselect";
import { useSelector } from "react-redux";

//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

const ArcCustomMultiSelect = ({
  options,
  PlaceHolder,
  Label,
  ClassName,
  setEntityIds,
}) => {
  const { Entity } = useSelector((state) => state.GetAddEntityFields);
  const AlreadySelectedOption = options?.filter(
    (selected) => selected.isSelected === true
  );

  const selectedOption = AlreadySelectedOption || null;
  console.log(AlreadySelectedOption);
  const [optionSelected, setOptionSelected] = useState(selectedOption || null);

  console.log(optionSelected);

  const selectedEntity = optionSelected?.map((val) => val.value);
  // if (selectedEntity) {
  //
  // }

  useEffect(() => {
    setOptionSelected(selectedOption);
  }, [Entity]);

  useEffect(() => {
    setEntityIds(selectedEntity);
  }, [optionSelected]);

  return (
    <>
      <div className={`arc-input-control arc-custom-multiselect ${ClassName}`}>
        {Label && <Form.Label>{Label}</Form.Label>}
        <div className="select-div">
          <ReactCustomMultiSelect
            optionSelected={optionSelected}
            setOptionSelected={setOptionSelected}
            SelectOptions={options}
            placeholderName={PlaceHolder}
            classNamePrefix="arc-custom-multi-select"
            isMultySelect={true}
          />
        </div>
      </div>
    </>
  );
};
export const ArcCustomMultiSelect1 = ({
  options,
  PlaceHolder,
  Label,
  ClassName,
  optionSelected,
  setOptionSelected,
}) => {
  return (
    <>
      <div className={`arc-input-control arc-custom-multiselect ${ClassName}`}>
        {Label && <Form.Label>{Label}</Form.Label>}
        <div className="select-div">
          <ReactCustomMultiSelect
            optionSelected={optionSelected}
            setOptionSelected={setOptionSelected}
            SelectOptions={options}
            placeholderName={PlaceHolder}
            classNamePrefix="arc-custom-multi-select"
            isMultySelect={true}
            defaultMenuIsOpen={true}
            menuIsOpen={true}
            closeMenuOnSelect={false}
          />
        </div>
      </div>
    </>
  );
};

export default ArcCustomMultiSelect;
