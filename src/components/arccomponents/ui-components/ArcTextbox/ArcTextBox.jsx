// *******~ Import ~******** //
//? React

//? Assets
import Form from "react-bootstrap/Form";
//? Components
//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

const ArcTextBox = ({
  Label,
  ClassName,
  Type,
  PlaceHolder,
  Name,
  Required,
  Value,
  onChange,
  DefaultValue,
  ReadOnly,
  Id,
  autoFocus,
}) => {
  return (
    <>
      <div
        className={`arc-input-control arc-textbox ${ClassName} ${
          Required ? "mandatory-field" : null
        } `}
      >
        {Label && (
          <Form.Label>
            {Label} {Required && <sup>*</sup>}
          </Form.Label>
        )}
        <Form.Control
          type={Type}
          placeholder={PlaceHolder}
          name={Name}
          value={Value}
          defaultValue={DefaultValue}
          onChange={onChange}
          required={Required}
          readOnly={ReadOnly}
          id={Id}
          autoFocus={autoFocus}
        />
      </div>
    </>
  );
};
export default ArcTextBox;
